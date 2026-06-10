// import { PrismaClient } from "../../generated/prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";

// const adapter = new PrismaPg({
//   connectionString: process.env.DATABSE_URL,
// });

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     adapter,
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client"; // သင့် Prisma output လမ်းကြောင်း

// ၁။ .env ထဲက DATABASE_URL ကို သုံးပြီး PostgreSQL Connection Pool ဆောက်ပါ
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ၂။ Prisma Driver Adapter ထဲသို့ Pool ကို ထည့်ပါ
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// ၃။ PrismaClient ထဲသို့ adapter ကို Pass လုပ်ပေးပါ
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
