// File: backend/src/schema/typeDefs.js
import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    category: String!
    authorId: String!
    createdAt: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type PostPayload {
  posts: Post!
  }

  type Query {
    hello: String!
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createpost(title: String!, content: String!): PostPayload
  }
`;

export default typeDefs;
