import { NextApiResponse } from "next"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
// import { } from "nookies"
import cookie from "cookie"
import jose from "jose";
import { HttpError } from "http-errors-enhanced"
import { NextApiRequestwithUserId } from "../../../interfaces_and_types"
import { returnPrivateKeyJWK } from "../../../config/keys"
import { cookieOptions } from "../../../config/cookie-options" 

dotenv.config();

export default async function handler(req: NextApiRequestwithUserId, res: NextApiResponse) {
    try {  // should we keep the try catch outside the if
        if(req.method === "POST") {
            const { email, password } = req.body
    
            const checkEmail =  await req.prisma.user.findFirst({
                where: {
                    email
                }
            })
        
            if(checkEmail === null) {
                // return res.json({ error: "you are not registered" })  // we can use this too
                throw new HttpError(401, "you are not registered")
            } 
            
            const checkPassword = await bcrypt.compare(password, checkEmail.password)  
            /* we cant use checkEmail!.password to tell the compiler that checkmail is not null, 
            by doing that we are forcefully telling the compiler to not give error even if there is chance that our checkEmail can be null
            so rather we can either return from the if block by writing return res.json("...") or throw an error for the catch block to handle */
    
            if(checkPassword === false) {        
                throw new HttpError(401, "either entered email or password were wrong")
            }

            const privateKey = await returnPrivateKeyJWK()

            const token = await new jose.SignJWT({ email: checkEmail.email, id: checkEmail.id })
                .setProtectedHeader({ 'alg' : 'RS256' })
                .setIssuedAt()
                .setIssuer("Swayam's Url Shortener")
                .setAudience(`${process.env.VERCEL_URL}`)
                .setSubject(checkEmail.id)
                .setExpirationTime('1h')
                .sign(privateKey)

            res.setHeader("Set-Cookie", cookie.serialize("user_token", token, cookieOptions))
            // in expires you need to set the exact date when you want to expire the cookie whereas in maxAge you specify time interval

            res.setHeader("Set-Cookie", cookie.serialize("user_id", checkEmail.id, cookieOptions))

            res.json({ userId: checkEmail.id })
        }
    } catch (err) {
        res.json(`${(err as Error).message}`)
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}