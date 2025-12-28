// These will be for dashboard for admin

import { Router, Request, Response } from "express";
import Blog from "../models/blog.schema.js";
import validateAdmin from "../middleware/validateAdmin.js";
import {
  createBlog,
  getBlogsForAdmin,
  updateBlog,
} from "../controllers/blog.admin.controller.js";

const adminBlogRouter = Router();

adminBlogRouter.get("/", validateAdmin, getBlogsForAdmin);

adminBlogRouter.post("/", validateAdmin, createBlog);

adminBlogRouter.put("/:blogId", validateAdmin, updateBlog);

adminBlogRouter.delete("/:blogId", (req: Request, res: Response) => {
  res.send("Delete post");
});

adminBlogRouter.patch("/:id/publish", (req: Request, res: Response) => {
  res.send("Publish post");
});

export default adminBlogRouter;
