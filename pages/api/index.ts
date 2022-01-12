import { NextApiResponse } from "next";
// import { auth } from "../../lib/cookie-middleware";
import { getShortPath } from "../../lib/url-helper" 
import { UserInput, NextApiRequestwithUserId } from "../../interfaces_and_types";

async function handler(req: NextApiRequestwithUserId, res: NextApiResponse) {
    try {
        if(req.method == "POST") {
            const userInput: UserInput = req.body

            const shortUrlpath = getShortPath();

            if(req.userId) {
                const userId = req.userId
                
                await req.prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        bookmarks: { 
                            create: [{
                                userId,
                                url: userInput.url,
                                shortenedUrlPath: shortUrlpath,
                                title: userInput.title,
                                description: userInput.description ?? null,
                                category: userInput.category ?? null
                            }]
                        }
                    }
                }) 
            } else {
                await req.prisma.link.create({
                    data: {
                        url: userInput.url,
                        shortenedUrlPath: shortUrlpath,
                        title: userInput.title,
                        description: userInput.description ?? null,
                        category: userInput.category ?? null
                    }
                })
            }

            res.json({ shortenedUrlpath: shortUrlpath })
        } else {
            throw new Error("Bad Request")
        }
    } catch(err) {
        res.status(500).json({ error: "Server Error", status: (err as Error).message })
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