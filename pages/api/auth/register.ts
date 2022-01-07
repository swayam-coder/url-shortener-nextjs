import { NextApiResponse } from "next"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import cookie from "cookie"
import { HttpError } from "http-errors-enhanced"
import { NextApiRequestwithUserId } from "../../../interfaces_and_types"
import jose from "jose";
import { returnPrivateKeyJWK } from "../../../config/keys"
import { cookieOptions } from "../../../config/cookie-options" 

dotenv.config();

export default async function handler(req: NextApiRequestwithUserId, res: NextApiResponse) {
    try {  // should we keep the try catch outside the i
        if(req.method === "POST") {
            const { email, password, confirmPassword } = req.body
    
            const checkEmail =  await req.prisma.user.findFirst({
                where: {
                    email
                }
            })
        
            if(checkEmail != null) {
                throw new HttpError('', "you are already registered")
            } 
            
            const hashedPasword = await bcrypt.hash(password, 10);  
            
            const user = await req.prisma.user.create({ 
                data: {
                    email,
                    password: hashedPasword
                }
            })

            if(!user) {
                throw new HttpError(500, "internal server error, couldn't register")
            }

            const privateKey = await returnPrivateKeyJWK()

            const token = await new jose.SignJWT({ email: user.email, id: user.id })
                .setProtectedHeader({ 'alg' : 'RS256' })
                .setIssuedAt()
                .setIssuer("Swayam's Url Shortener")
                .setAudience(`${process.env.VERCEL_URL}`)
                .setSubject(user.id)
                .setExpirationTime('1h')
                .sign(privateKey)

            res.setHeader("Set-Cookie", cookie.serialize("user_token", token, cookieOptions))
            // in expires you need to set the exact date when you want to expire the cookie whereas in maxAge you specify time interval

            res.setHeader("Set-Cookie", cookie.serialize("user_id", user.id, cookieOptions))

            res.json({ userId: user.id })
        } else {
            throw new HttpError(500,"Internal server error");
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