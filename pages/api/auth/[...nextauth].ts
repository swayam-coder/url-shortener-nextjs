import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { useRouter } from "next/router"
import { NextRequest, NextResponse } from "next/server";

export default function handler(req: NextRequest, res: NextResponse) {
    NextAuth(req, res, {
        providers: [
          Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          }),
        ],
        debug: process.env.NODE_ENV === "development",
        secret: process.env.AUTH_SECRET,
        jwt: {
          secret: process.env.JWT_SECRET,
        },
        adapter: Adapters.Prisma.Adapter({ prisma }),
      });
}