import { makeSchema } from "nexus"
import * as types from "./types"
import path from "path"

const schema =  makeSchema({
    types: [types],
    outputs: {
        schema: path.join(process.cwd(), 'src', 'schema.graphql'),
        typegen: path.join(process.cwd(), 'node_modules', '@types', 'nexus-typegen', 'index.d.ts')
    },
    sourceTypes: {
        modules: [
            { module: path.join(process.cwd(), 'src', 'interfaces', 'index.ts'), alias: 'faces', typeMatch: (type) => new RegExp(`(${type}Interface)`) }
        ],
        mapping: {
            Date: "Date"
        },
        debug: process.env.NODE_ENV === "development"
    },
    contextType: {
        export: "Context",
        module: path.join(process.cwd(), 'src', 'context.ts')
    }
})

export default schema