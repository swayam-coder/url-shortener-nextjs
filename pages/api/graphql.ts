import { ApolloServer } from "apollo-server-micro"
import { NextApiRequest, NextApiResponse } from "next"
import Cors from "micro-cors"
import schema from "../../src/schema";

const cors = Cors();

const server = new ApolloServer({ 
    schema
})

const startserver = server.start()

export default cors(async function handler(req: NextApiRequest, res: NextApiResponse) {   // cors is added because apolloserver now redirects us to apollo studio (which will run on a remote website instead of local host/api/graphql) instead of graphql playground, so as our queries will be made from remote client we need to enable cors  
    if (req.method === 'OPTIONS') {
        res.end();
        return false;
    }

    await startserver;

    await server.createHandler({
        path: '/api/graphql'
    })(req, res)
})

export const config = {
    api: {
        bodyParser: false
    }
}