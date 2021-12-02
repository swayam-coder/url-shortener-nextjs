import { objectType } from "nexus"
import { User } from "./User"

export const Link = objectType({
    name: "Link",
    definition(t) {
        t.string("id");
        t.string("title");
        t.string("description");
        t.string("url");
        t.string("imageUrl");
        t.string("category");
        t.date("createdAt");
        t.list.field("users", {
            type: User,
            resolve: async (parent, _args, ctx) => {   // here parent will contain anything that the previous resolver returns
                return await ctx.prisma.link.findUnique({
                    where: {
                        id: parent.id   // here parent.id comes from the t.string above...basically parent contains all the field above the particular resolver if the y are typedefs and the results returned by them if they are resolvers
                    }
                }).users()
            }  // what is the point of this resolve ?
        })
    },
});