import { PrismaClient } from '../../prisma/generated/client';
import { PrismaBunSqlite } from 'prisma-adapter-bun-sqlite';

// 1. Inisialisasi adapter untuk membaca file dev.db di root folder
const adapter = new PrismaBunSqlite({ url: 'file:./dev.db' });

// 2. Masukkan adapter ke dalam konstruktor Prisma 7
export const prisma = new PrismaClient({ 
    adapter,
    log: ['query', 'info', 'warn', 'error']
});