// File: backend/src/index.js
import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema/typeDefs.js";
import resolvers from "./resolvers/index.js";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
app.use(cors());

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    return { token };
  },
});

await server.start();
server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
});
