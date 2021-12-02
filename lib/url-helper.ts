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