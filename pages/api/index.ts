import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../lib/cookie-middleware";
import { setUrl } from "../../lib/url-helper" 
import prisma from "../../lib/prisma";
import { UserInput, NextApiRequestwithUserId } from "../../interfaces_and_types";

async function handler(req: NextApiRequestwithUserId, res: NextApiResponse) {
    try {
        if(req.method == "POST") {
            const userInput: UserInput = req.body
            const shortUrl = await setUrl(userInput.url);

            if(req.userId) {
                const userId = req.userId
                
                await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        bookmarks: { 
                            create: [{
                                userId,
                                url: userInput.url,
                                shortenedUrlPath: shortUrl,
                                title: userInput.title,
                                description: userInput.description ?? null,
                                category: userInput.category ?? null
                            }]
                        }
                    }
                }) 
            } else {
                await prisma.link.create({
                    data: {
                        url: userInput.url,
                        shortenedUrlPath: shortUrl,
                        title: userInput.title,
                        description: userInput.description ?? null,
                        category: userInput.category ?? null
                    }
                })
            }

            res.json({ shortenedUrlpath: shortUrl })
        } else {
            throw new Error("Bad Requeat")
        }
    } catch(err) {
        res.status(400).json({ error: "Bad Request", status: (err as Error).message })
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
// limitations of _middleware and how it works