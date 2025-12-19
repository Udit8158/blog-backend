// These will be for dashboard for admin

import { Router, Request, Response } from "express";

const adminBlogRouter = Router();

adminBlogRouter.get("/", (req: Request, res: Response) => {
  res.send("All posts for admin");
});

adminBlogRouter.post("/", (req: Request, res: Response) => {
  res.send("New post");
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
