import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt'; // <-- Tambahkan ini
import * as service from './service';
import * as schema from './schema';

export const authRoutes = new Elysia({ prefix: '/auth' })
    // Pindahkan konfigurasi JWT ke sini
    .use(jwt({ name: 'jwt', secret: 'KOPIKITA_SUPER_SECRET_KEY_2026' }))
    
    .post('/register', async ({ body, set }) => {
        const existing = await service.findUserByEmail(body.email);
        if (existing) { 
            set.status = 409; 
            return { message: 'Email terdaftar' }; 
        }
        
        const hashedPassword = await Bun.password.hash(body.password);
        return service.createUser({ ...body, password: hashedPassword });
    }, { body: schema.registerSchema })
    
    .post('/login', async ({ body, jwt, set }) => {
        const user = await service.findUserByEmail(body.email);
        const valid = user ? await Bun.password.verify(body.password, user.password) : false;
        
        if (!user || !valid) { 
            set.status = 401; 
            return { message: 'Gagal login' }; 
        }

        // --- PERBAIKAN DI SINI ---
        return { 
            status: 'success',
            message: 'Login berhasil',
            token: await jwt.sign({ id: user.id }),
            // Sertakan data user agar bisa dibaca oleh frontend
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    }, { body: schema.loginSchema });