import { enumType, objectType } from "nexus"
import { Link } from "./Link"

export const User = objectType({
    name: "User",
    definition(t) {
        t.string("id");
        t.string("email");
        t.string("photo", {
            extensions: {
                nullable: true
            }
        });
        t.date("createdAt");
        t.list.field("bookmarks", {
            type: Link,
            resolve: async (parent, _args, ctx) => {   // here parent will contain anything that the previous resolver returns
                return await ctx.prisma.user.findUnique({
                    where: {
                        id: parent.id   // here parent.id comes from the t.string above...basically parent contains all the field above the particular resolver if the y are typedefs and the results returned by them if they are resolvers
                    }
                }).bookmarks()
            }
        })  // what is the point of this resolve ?
    },
  });

// const role = enumType({

// })

// middlewares in nexus, simple graphql, typegraphql, nextjs
// parent from typedefs
/* middlewares, api routes, edge functions, new nextjs features, ssr, ssg, isg, css/sass, auth */