import express, { Request, Response } from "express";
import validateAuthInput from "../middleware/validateAuthInput.js";
import { signin, signout, signup } from "../controllers/auth.controllers.js";

const authrouter = express.Router();

authrouter.post("/register", validateAuthInput, signup);

authrouter.post("/login", validateAuthInput, signin);

authrouter.post("/logout", signout);

authrouter.get("/me", (req: Request, res: Response) => {
  res.send("Me");
});

export default authrouter;
