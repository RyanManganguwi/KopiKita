import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { jwt } from '@elysiajs/jwt';
import { authRoutes } from './auth';

const app = new Elysia()
    .use(cors())
    .use(jwt({ name: 'jwt', secret: 'SUPER_SECRET' }))
    .group('/api', (api) => api.use(authRoutes))
    .listen(3000);

console.log(`🦊 KopiKita aktif di ${app.server?.port}`);