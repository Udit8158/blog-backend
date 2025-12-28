import { z } from "zod";
import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

interface PayloadType extends JwtPayload {
  userId: ObjectId,
  role: "user" | "admin"
}

declare global {
  namespace Express {
    interface Request {
      validatedBody: {name: string, email: string, password: string}; // or a specific type
      payload: PayloadType
    }
  }
}
