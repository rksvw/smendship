// File: backend/src/schema/typeDefs.js
import { gql } from "apollo-server-express";

const typeDefs = gql`
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

  type Query {
    hello: String
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;

export default typeDefs;
