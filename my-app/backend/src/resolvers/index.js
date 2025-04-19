// File: backend/src/resolvers/index.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";
import {
  AuthenticationError,
  UserInputError,
  ValidationError,
} from "apollo-server-express";
import prisma from "../config/prismaConfig.js";
// import { v4 as uuidv4 } from "uuid";

const resolvers = {
  Query: {
    hello: () => "Hello World! 🌍",
  },
  Mutation: {
    // Mutation is like a router for GraphQL
    signup: async (_, { name, email, password }) => {
      if (
        !name ||
        !email ||
        !password ||
        name === "" ||
        email === "" ||
        password === ""
      ) {
        throw new UserInputError(
          "Invalid User Credentials! Please fill required Fields"
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        const newUser = await prisma.user.create({
          data: { name, email, password: hashedPassword },
        });

        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);

        return {
          token,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            createdAt: newUser.createdAt,
          },
        };
      } catch (err) {
        throw new ValidationError("User already Exists!");
      }
    },
    login: async (_, { email, password }) => {
      if (!email || !password || email === "" || password === "") {
        throw new UserInputError(
          "Invalid User Credentials! Please fill required Fields"
        );
      }

      try {
        const reqUser = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!reqUser) throw new ValidationError("Invalid User");

        const valid = await bcrypt.compare(password, reqUser.password);
        if (!valid) throw new ValidationError("Invalid Password");

        const token = jwt.sign({ userId: reqUser.id }, process.env.JWT_SECRET, {expiresIn: '7d'});
        if (!token) {
          throw new AuthenticationError("UnAuthentic Account");
        }
        return {
          token,
          user: {
            id: reqUser.id,
            name: reqUser.name,
            email: reqUser.email,
            createdAt: reqUser.createdAt,
          },
        };
      } catch (err) {
        throw new AuthenticationError("UnAuthorized Account");
      }
    },
    createpost: async (_, { title, content }, context) => {
      const userId = getUserIdFromToken(context);
      if (!userId) throw new AuthenticationError("Unauthorized");

      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId: userId,
        },
        include: {
          author: true,
        },
      });
      console.log(userId, title, content)
      return {
        posts: {
          id: userId,
          title,
          content
        }
      };
    },
  },
};

function getUserIdFromToken(context) {
  const token = context.token;
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    return verifiedToken.userId;
  } catch (err) {
    return null;
  }
}

export default resolvers;
