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
    post: Post!
  }

  type Message {
  message: String
  }

  type Query {
    hello: String!
    getpost(id: String!): PostPayload
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createpost(title: String!, content: String!, category: String!): PostPayload
    updatepost(
      id: String!
      title: String
      content: String
      category: String
    ): PostPayload
    deletepost(id: String!): Message
  }
`;

export default typeDefs;
