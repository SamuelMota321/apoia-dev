import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import ws from 'ws'
import dotenv from 'dotenv'
import { PrismaClient } from '@/generated/prisma/client'

dotenv.config() 
neonConfig.webSocketConstructor = ws

const connectionString = process.env.DATABASE_URL

console.log("Status da Conexão:", connectionString ? "URL Encontrada" : "URL NÃO ENCONTRADA")

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool as any)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma