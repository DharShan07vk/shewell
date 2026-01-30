import { PrismaClient } from '@repo/database';

import { env } from '@/env';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const db =
    globalForPrisma.prisma ??
    new PrismaClient({
         log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

// Only cache Prisma client in development to prevent connection pool issues
if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
