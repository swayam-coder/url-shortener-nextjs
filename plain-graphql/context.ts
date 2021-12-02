import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma"
import { PrismaClient } from "@prisma/client"

export type Context = { 
    prisma: PrismaClient 
}

export async function contexts(req: NextApiRequest, res: NextApiResponse): Promise<Context> {
    return {
        prisma,
    }
}