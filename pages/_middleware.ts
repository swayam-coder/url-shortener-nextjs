import { HttpError } from "http-errors-enhanced";
import { NextResponse } from "next/server"
import { NextRequestwithUserID } from "../interfaces_and_types"
import { getUrl } from "../lib/url-helper";
import { PrismaClient } from "@prisma/client";

export default async function middleware(req: NextRequestwithUserID) {
    const path = req.nextUrl.pathname.split('/')[1];  // we are using req.nextUrl.pathname.split('/')[1] index because always req.nextUrl.pathname.split('/')[0] = ''
    
    if(["favicon.ico", "api", "", "auth"].includes(path)) {  // " " is for homepage 
        return NextResponse.next(); // Can we use NextResponse.next() here?
    }

    if(["history", "profile"].includes(path)) {
        if(!req.cookies.user_token) {
            return NextResponse.redirect('/login');
        } else {
            return NextResponse.next();
        }
    }

    if(global.prisma) {
        const url = await getUrl(path, global.prisma);
        if(url === null){
            return new HttpError(500, "Some thing wrong happened")
        } else {
            return NextResponse.redirect(url)
        }
    } else {
        return new HttpError(500, "Some thing wrong happened");
    }
}