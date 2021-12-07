import { HttpError } from "http-errors-enhanced";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"
import { NextRequestwithUserID } from "../interfaces_and_types"
import { getUrl } from "../lib/url-helper";

export default async function middleware(req: NextRequestwithUserID) {
    const path = req.nextUrl.pathname.split('/')[1];  // we are using req.nextUrl.pathname.split('/')[1] index because always req.nextUrl.pathname.split('/')[0] = ''
    
    if(["favicon.ico", "api", ""].includes(path)) {
        return
    }

    const url = await getUrl(path);

    if(url === null){
        return new HttpError(500, "Some thing wrong happened")
    } else {
        NextResponse.redirect(url)
    }
}