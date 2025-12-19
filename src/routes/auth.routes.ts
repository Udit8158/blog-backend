import express, { Request, Response } from "express";

const authrouter = express.Router();



authrouter.post("/register", (req: Request, res: Response) => {
  res.send("Register");
});

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
