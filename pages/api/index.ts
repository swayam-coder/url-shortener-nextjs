import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../lib/cookie-middleware";
import { setUrl } from "../../lib/url-helper" 
import prisma from "../../lib/prisma";
import { UserInput, NextApiRequestwithUserId } from "../../interfaces-and-types";

async function handler(req: NextApiRequestwithUserId, res: NextApiResponse) {
    try {
        if(req.method == "POST") {
            const userInput: UserInput = req.body
            const userId = req.userId

            if(userId === undefined) {
                res.status(500).json({ error: "internal server error", status: 500 })
                return
            }
            
            const shortUrl = await setUrl(userInput.url);
        
            const result = await prisma.link.create({
                data: {
                    userId,
                    url: userInput.url,
                    shortenedUrlPath: shortUrl,
                    title: userInput.title,
                    description: userInput.description ?? null,
                    category: userInput.category ?? null
                }
            })

            res.json({ shortenedUrlpath: result.shortenedUrlPath })
        } else {
            throw new Error("Bad Requeat")
        }
    } catch(err) {
        res.status(400).json({ error: "Bad Request", status: (err as Error).message })
    }
}

export default auth(handler);