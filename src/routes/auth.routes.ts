import express, { Request, Response } from "express";
import validateAuthInput from "../middleware/validateAuthInput.js";
import { signin, signout, signup, validateToken } from "../controllers/auth.controllers.js";
import rateLimit from "express-rate-limit";

const authrouter = express.Router();

// rate limiter (we have to apply it directly here, and use it in the router, as middleware, you can't use it inside a middleware function normally)

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1M in ms
  limit: 10, // how many requests can hit in each window
  message: `TOO Many Requests`,
});

authrouter.post("/register", limiter, validateAuthInput, signup);

authrouter.post("/login", limiter, validateAuthInput, signin);

authrouter.post("/logout", limiter, signout);

authrouter.get("/me", validateToken);

export default authrouter;
