import { z } from "zod";

declare global {
  namespace Express {
    interface Request {
      validatedBody: {name: string, email: string, password: string}; // or a specific type
      payload: unknown
    }
  }
}
