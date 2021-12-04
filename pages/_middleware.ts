import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"
import { NextRequestwithUserID } from "../interfaces_and_types"

export default function middleware(req: NextRequestwithUserID) {
    function ErrorResponse (msg: string, statusCode: number) {
        return new Response("user not authenticated", {
            status: 401
        })
    }

    if(req.nextUrl.pathname.split('/')[1] != "auth") {
        try {
            const decoded = jwt.verify(req.cookies.user_token, process.env["JWT_SECRET"]);
            req.userId = decoded.id;

            return NextResponse.next();  // to move to next subsequent api route
        } catch (error) {
            if((error as Error).message === "JsonWebTokenError") {
                return ErrorResponse("User not authenticated", 401)  // returns back with error
            } else {
                return ErrorResponse("Internal Server Error", 500)
            }
        }
    }
    return NextResponse.next();
}


