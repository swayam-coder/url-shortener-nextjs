import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"
import { NextRequestwithUserID } from "../../interfaces_and_types"
import { HttpError } from "http-errors-enhanced"

export default function middleware(req: NextRequestwithUserID) {
    if(!(["auth"].includes(req.nextUrl.pathname.split('/')[1]))) {
        try {
            const decoded = jwt.verify(req.cookies.user_token, process.env["JWT_SECRET"]);
            req.userId = decoded.id;

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