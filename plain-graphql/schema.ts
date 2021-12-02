import { gql } from "apollo-server-micro"

export const Link = gql`
    type User {
        category: String!
        index: Number!
        imageUrl: String!
        title: String!
        url: String!
    }  # should i keep "!" here ?

    type Query {
        links(): [User!]!   # is the inner ! really required
        # in graphql here we are here strictly define the types of what goes to the server and what comes back from the server
    }
`;

// why codegen was'nt used
// Url type
// codefirst > schema first
   // no need to bounce between schema and resolvers to match types
   // nice auto completion
   // Better graphql type safety 
   // easy to combine distrubuted schema without use of different tools
   // overall lesser tools are used

// codefirst < schema first
   // more readable, so it is easy to mock the schema for testing and share to the frontend teams
   // provides better abstraction and less dependence following dependency inversion principle (DIP)