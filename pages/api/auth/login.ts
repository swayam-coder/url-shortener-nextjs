import jwt from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
// import { } from "nookies"
import cookie from "cookie"

dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {  // should we keep the try catch outside the i
        if(req.method === "GET") {
            const { email, password } = req.body
    
            const checkEmail =  await prisma.user.findFirst({
                where: {
                    email
                }
            })
        
            if(checkEmail === null) {
                // return res.json({ error: "you are not registered" })  // we can use this too
                throw new Error("you are not registered")
            } 
            
            const checkPassword = await bcrypt.compare(password, checkEmail.password)  
            /* we cant use checkEmail!.password to tell the compiler that checkmail is not null, 
            by doing that we are forcefully telling the compiler to not give error even if there is chance that our checkEmail can be null
            so rather we can either return from the if block by writing return res.json("...") or throw an error for the catch block to handle */
    
            if(checkPassword === false) {        
                throw new Error("either entered email or password were wrong")
            }

            const token = jwt.sign({ email: checkEmail.email, id: checkEmail.id }, process.env.JWT_SECRET, { expiresIn: "1h" })

            res.setHeader("Set-Cookie", cookie.serialize("user_token", token, {
                httpOnly: true,
                secure: true,
                sameSite: true,
                maxAge: 60 * 60 * 24,  // always use maxAge instead of expires as expires is deprecated and most browsers ignore expires if both maxAge and expires are specified
                // domain: "",
                // path: "",
                // encode: 
            }))
            // in expires you need to set the exact date when you want to expire the cookie whereas in maxAge you specify time interval

            res.json({ authToken: jwt })
        }
    } catch (err) {
        res.json(`${(err as Error).message}`)
    }
}