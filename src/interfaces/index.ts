export interface LinkInterface {
    id: string,
    description: string,
    url: string,
    imageUrl: string,
    category: string,
    createdAt: string,
    users: UserInterface[]
}

export interface UserInterface {
    id: string,
    email: string,
    photo: string | null,
    createdAt: string,
    bookmarks: LinkInterface[]
}