import jwt from "jsonwebtoken"
import { NextApiResponse } from "next"
import { NextApiRequestwithUserId } from "../interfaces-and-types"

// let userId: string;

export const auth = (fn: any) => async (req: NextApiRequestwithUserId, res: NextApiResponse) => {
    jwt.verify(req.cookies.user_token, process.env.JWT_SECRET, (err, decoded) => {
        if(!err && decoded) {
            req.userId = decoded.id
            return fn(req, res)
        }

        if(err?.message === "JsonWebTokenError")
            res.status(401).json({ error: "The user is not authenticated" })

        res.status(500).json({ err: "Internal Server Error" })
    })
}

// export function getUserId(): string | null {
//     return userId ?? null;
// }