import { HttpError } from "http-errors-enhanced";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"
import { NextRequestwithUserID } from "../interfaces_and_types"
import { getUrl } from "../lib/url-helper";
import { PrismaClient } from "@prisma/client";

export default async function middleware(req: NextRequestwithUserID) {
    const path = req.nextUrl.pathname.split('/')[1];  // we are using req.nextUrl.pathname.split('/')[1] index because always req.nextUrl.pathname.split('/')[0] = ''
    
    if(["favicon.ico", "api", "", "auth"].includes(path)) {  // " " is for homepage 
        if(path === "api") {
            // PrismaClient is attached to the `global` object in development to prevent
            // exhausting your database connection limit.
            // Learn more: https://pris.ly/d/help/next-js-best-practices
            
            if(typeof window === "undefined") {
                if (process.env.NODE_ENV === 'production') {   
                    req.prisma = global.prisma = new PrismaClient();
                } else {
                    if (!global.prisma) {    // global is a an object which is provided to us by node to store all the global variables or objects
                        global.prisma = new PrismaClient();
                    }
                    req.prisma = global.prisma;
                }
            }
        }
        return;  // Can we use NextResponse.next() here?
    }

    if(["history", "profile"].includes(path)) {
        if(!req.cookies.user_token) {
            NextResponse.redirect('/login');
        } else {
            NextResponse.next();
        }
    }

    if(global.prisma) {
        const url = await getUrl(path, global.prisma);
        if(url === null){
            return new HttpError(500, "Some thing wrong happened")
        } else {
            NextResponse.redirect(url)
        }
    } else {
        return new HttpError(500, "Some thing wrong happened");
    }
}