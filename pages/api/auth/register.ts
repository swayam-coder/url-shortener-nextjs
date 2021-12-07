import jwt from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import cookie from "cookie"
import { HttpError } from "http-errors-enhanced"

dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {  // should we keep the try catch outside the i
        if(req.method === "POST") {
            const { email, password, confirmPassword } = req.body
    
            const checkEmail =  await prisma.user.findFirst({
                where: {
                    email
                }
            })
        
            if(checkEmail != null) {
                throw new HttpError('', "you are already registered")
            } 
            
            const hashedPasword = await bcrypt.hash(password, 10);  
            
            const user = await prisma.user.create({ 
                data: {
                    email,
                    password: hashedPasword
                }
            })

            if(!user) {
                throw new HttpError(500, "internal server error, couldn't register")
            }

            const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })

            res.setHeader("Set-Cookie", cookie.serialize("user_token", token, {
                httpOnly: true,
                secure: true,
                sameSite: true,
                maxAge: 60 * 60 * 24,  // always use maxAge instead of expires as expires is deprecated and most browsers ignore expires if both maxAge and expires are specified
                // domain: "",
                // path: "",
                // encode: 
            }))

            res.json({ userId: user.id })
        } else {
            throw new HttpError(500,"Internal server error");
        }
    } catch (err) {
        res.json(`${(err as Error).message}`)
    }
}