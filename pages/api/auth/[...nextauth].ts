import NextAuth from "next-auth";
import { useRouter } from "next/router"

export default function handler() {
    const { nextauth } = useRouter().query;

    return (
        
    )
}