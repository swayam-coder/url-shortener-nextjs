import jose from "jose"
import { NextResponse } from "next/server"
import { NextRequestwithUserID } from "../../interfaces_and_types"
import { HttpError } from "http-errors-enhanced"
import { returnPublicKeyJWK } from "../../config/keys"
import { claimSet } from "../../config/jwt-claims-set"

export default async function middleware(req: NextRequestwithUserID) {
    if(!(["auth"].includes(req.nextUrl.pathname.split('/')[1]))) {
        try {
            const publicKey = await returnPublicKeyJWK();
            
            const { payload, protectedHeader } = await jose.jwtVerify((req.cookies.user_token), publicKey, {...claimSet, subject: req.cookies.user_id})
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