// File: backend/src/resolvers/index.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

const resolvers = {
  Query: {
    hello: () => "Hello World! 🌍",
  },
  Mutation: {
    // Mutation is like a router for GraphQL
    signup: async (bananananan, { name, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const id = uuidv4();
      await pool.query(
        "INSERT INTO users(id, name, email, password) VALUES ($1, $2, $3, $4)",
        [id, name, email, hashedPassword]
      );
      const token = jwt.sign({ userId: id }, process.env.JWT_SECRET);
      return {
        token,
        user: { id, name, email },
      };
    },
    login: async (bananananan, { email, password }) => {
      const res = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      const user = res.rows[0];
      if (!user) throw new Error("User not found");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
        },
      };
    },
  },
};

export default resolvers;
