import { z } from "zod";
import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { IBlog } from "../models/blog.schema.ts";

interface PayloadType extends JwtPayload {
  userId: ObjectId,
  role: "user" | "admin"
}

declare global {
  namespace Express {
    interface Request {
      validatedBody: {name: string, email: string, password: string}; // or a specific type
      payload: PayloadType,
      blogId: string,
      foundBlog: Schema<IBlog>
    }
  }
}
