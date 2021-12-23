import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

export interface UserInput extends UrlMetaData {
    url: string
}

export type NextApiRequestwithUserId = NextApiRequest & {
    userId?: string,
    prisma: PrismaClient
}

export interface UrlMetaData {
    title: string,
    description?: string
    category?: string
}

export interface AuthInfo {
    email: string,
    password: string,
    photo?: any
}

export interface IUserContext {
    userId: string | undefined,
    setUserId: React.Dispatch<React.SetStateAction<string | undefined>> | undefined
}

export interface NextRequestwithUserID extends NextRequest {
    userId?: string,
    prisma: PrismaClient
}