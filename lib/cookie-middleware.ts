import jwt from "jsonwebtoken"
import { NextApiResponse } from "next"
import { NextApiRequestwithUserId } from "../interfaces_and_types"

// let userId: string;

export const auth = (fn: any) => async (req: NextApiRequestwithUserId, res: NextApiResponse) => {
    function ErrorResponse (msg: string, statusCode: number) {
        return new Response("user not authenticated", {
            status: 401
        })
    }
    
    try {
        const decoded = jwt.verify(req.cookies.user_token, process.env["JWT_SECRET"]);
        req.userId = decoded.id;
        return fn(req, res)
    } catch (error) {
        if((error as Error).message === "JsonWebTokenError") {
            return ErrorResponse("User not authenticated", 401)
        } else {
            return ErrorResponse("Internal Server Error", 500)
        }
    }
}

// export function getUserId(): string | null {
//     return userId ?? null;
// }