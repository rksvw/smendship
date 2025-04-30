// File: backend/src/index.js
import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import cors from "cors";
import { useServer } from "graphql-ws/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import http from "http";

import typeDefs from "./schema/typeDefs.js";
import resolvers from "./resolvers/index.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
app.use(cors());

connectDB();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : "";
    return { token };
  },
});

await server.start();
server.applyMiddleware({ app });

const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

useServer({ schema }, wsServer);

httpServer.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
});
