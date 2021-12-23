import { PrismaClient } from "@prisma/client";
import { HttpError } from "http-errors-enhanced";
import EventEmitter from "events";

function getPath(): string {
    const alpha = "abcdefghijklmnopqrstuvwxyz".split("");
    return [...new Array(8)]
      .map((_) => alpha[Math.floor(Math.random() * alpha.length)])
      .join("");
}

export async function setUrl(url: string) {
    const shortpath = getPath()
    return shortpath
}

export async function disableUrl (url: string, prisma: PrismaClient) {
    try {
        await prisma.link.update({
            where: {
                url
            },
            data: {
                enabled: false
            }
        })
    } catch (error) {
        return (error as Error).message;
    }
}

export async function getUrl(shortUrl: string, prisma: PrismaClient) {
    const response = await prisma.link.findFirst({
        where: {
            shortenedUrlPath: shortUrl
        }
    })

    if(response === null) {
        return null
    }

    
    // await prisma.link.updateMany({  // use pub-sub
    //     where: {
    //         shortenedUrlPath: shortUrl
    //     },
    //     data: {
    //         clicks: response.clicks + 1
    //     }
    // })

    if(response.enabled) {
        return response.url
    }
    
    return null;
}