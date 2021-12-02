import { PrismaClient } from ".prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {   // only in production, new instance of prisma client will be made.
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {    // global is a an object which is provided to us by node to store all the global variables
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}
export default prisma;