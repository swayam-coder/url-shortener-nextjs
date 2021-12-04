import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export interface UserInput extends UrlMetaData {
    url: string
}

export type NextApiRequestwithUserId = NextApiRequest & {
    userId?: string
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

export interface NextRequestwithUserID extends NextRequest {
    userId?: string
}