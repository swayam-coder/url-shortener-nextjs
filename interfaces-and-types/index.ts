import { NextApiRequest } from "next";

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