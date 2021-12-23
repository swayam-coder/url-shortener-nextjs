import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../lib/cookie-middleware";
import { setUrl } from "../../lib/url-helper" 
import prisma from "../../lib/prisma";
import { UserInput, NextApiRequestwithUserId } from "../../interfaces_and_types";

async function handler(req: NextApiRequestwithUserId, res: NextApiResponse) {
    if(req.method === "GET") {
        
        const results = req.prisma.user.findFirst({
            where: {
                id: req.userId
            }
        }).bookmarks
    }
}

// export default auth(handler);  // As we are handling jwt verification through _middleware, we dont need to use api middleware 
export default handler

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}