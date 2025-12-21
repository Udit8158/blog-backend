import express, { Request, Response } from "express";
import validateUserInput from "../middleware/validateUserInputBody.js";
import { signup } from "../controllers/auth.controllers.js";

const authrouter = express.Router();

authrouter.post("/register", validateUserInput, signup);

authrouter.post("/login", (req: Request, res: Response) => {
  res.send("Login");
});

authrouter.post("/logout", (req: Request, res: Response) => {
  res.send("Logout");
});

authrouter.get("/me", (req: Request, res: Response) => {
  res.send("Me");
});

export default authrouter;
