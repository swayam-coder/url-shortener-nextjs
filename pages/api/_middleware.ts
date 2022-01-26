import jose from "jose"
import { NextResponse } from "next/server"
import { NextRequestwithUserID } from "../../interfaces_and_types"
import { HttpError } from "http-errors-enhanced"
import { returnPublicKeyJWK } from "../../config/keys"
import { claimSet } from "../../config/jwt-claims-set"
import { PrismaClient } from "@prisma/client"

export default async function middleware(req: NextRequestwithUserID) {
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

    if(!(["auth"].includes(req.nextUrl.pathname.split('/')[1]))) {
        try {
            const publicKey = await returnPublicKeyJWK();

            const userToken = req.cookies.user_token ?? "";
            
            const { payload, protectedHeader } = await jose.jwtVerify(userToken, publicKey, {...claimSet, subject: req.cookies.user_id})
            req.userId = (payload.id as string);

            return NextResponse.next();  // to move to next subsequent api route
        } catch (error) {
            if((error as Error).message === "JsonWebTokenError") {
                if(req.nextUrl.pathname.split('/')[1] == "") {
                    return NextResponse.next();
                }
                return new HttpError(401, "User not authenticated")  // returns back with error
            } else {
                return new HttpError(500, "Internal Server Error")
            }
        }
    }
    return NextResponse.next();
}