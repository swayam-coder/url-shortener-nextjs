import { GraphQLDate } from "graphql-scalars"
import { decorateType } from "nexus"

export const GQLDate = decorateType(GraphQLDate, {
    sourceType: "Date",
    asNexusMethod: "date"
})

export * from "./User"
export * from "./Link"