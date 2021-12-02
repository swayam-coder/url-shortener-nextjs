import { PrismaClient } from "@prisma/client"
import { links } from "../data/links"

const prisma = new PrismaClient()

async function Main() {
    await prisma.user.create({
        data: {
            email: "sample@email.com",
            role: "ADMIN"
        }
    })

    await prisma.link.createMany({
        data: links
    })
}

Main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });