// File: backend/src/resolvers/index.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";
import prisma from "../config/prismaConfig.js"
// import { v4 as uuidv4 } from "uuid";


const resolvers = {
  Query: {
    hello: () => "Hello World! 🌍",
  },
  Mutation: {
    // Mutation is like a router for GraphQL
    signup: async (bananananan, { name, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {name, email, password: hashedPassword}
      })
      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);
      return {
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          created_at: newUser.createdAt
        },
      };
    },
    login: async (bananananan, { email, password }) => {
      const reqUser = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (!reqUser) throw new Error("User not found");

      const valid = await bcrypt.compare(password, reqUser.password);
      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign({ userId: reqUser.id }, process.env.JWT_SECRET);
      return {
        token,
        user: {
          id: reqUser.id,
          name: reqUser.name,
          email: reqUser.email,
          created_at: reqUser.createdAt,
        },
      };
    },
  },
};

export default resolvers;
