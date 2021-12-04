import { NextRequest } from "next/server"

export default function middleware(req: NextRequest) {
    if(req.nextUrl.pathname.split('/')[1] != "auth") {
        
    }
    return 
}
