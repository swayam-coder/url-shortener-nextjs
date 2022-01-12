import { PrismaClient } from ".prisma/client"

declare global {
    namespace
    var prisma : PrismaClient | undefined
}

