import express, { Request, Response } from "express";

const authrouter = express.Router();

type resBody = {
  data: string;
  error?: string;
};

authrouter.get("/", (req: Request, res: Response<resBody>) =>
  res.send({ data: "Hi there, it's a test" })
);

export default authrouter;
