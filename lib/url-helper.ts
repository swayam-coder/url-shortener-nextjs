import { HttpError } from "http-errors-enhanced";
import prisma from "./prisma";

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

export async function getUrl(shortUrl: string) {
    const response = await prisma.link.findFirst({
        where: {
            shortenedUrlPath: shortUrl
        }
    })

    if(response != null) {
        return response.url
    }
    
    return null
}