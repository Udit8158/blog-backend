// These will be for dashboard for admin

import { Router, Request, Response } from "express";
import Blog from "../models/blog.schema.js";

const adminBlogRouter = Router();

adminBlogRouter.get("/", (req: Request, res: Response) => {
  res.send("All posts for admin");
});

adminBlogRouter.post("/", async (req: Request, res: Response) => {
  // testing
});

adminBlogRouter.put("/:id", (req: Request, res: Response) => {
  res.send("Update post");
});

adminBlogRouter.delete("/:id", (req: Request, res: Response) => {
  res.send("Delete post");
});

adminBlogRouter.patch("/:id/publish", (req: Request, res: Response) => {
  res.send("Publish post");
});

export default adminBlogRouter;
