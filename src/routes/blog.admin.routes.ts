// These will be for dashboard for admin

import { Router, Request, Response } from "express";
import Blog from "../models/blog.schema.js";
import validateAdmin from "../middleware/validateAdmin.js";
import {
  createBlog,
  deleteBlogByAdmin,
  getBlogsForAdmin,
  publishBlogByAdmin,
  updateBlog,
} from "../controllers/blog.admin.controller.js";
import checkBlogIdInUrl from "../middleware/checkBlogIdInUrl.js";
import findBlogFirst from "../middleware/findBlogFirst.js";

const adminBlogRouter = Router();

adminBlogRouter.get("/", validateAdmin, getBlogsForAdmin);

adminBlogRouter.post("/", validateAdmin, createBlog);

adminBlogRouter.put(
  "/:blogId",
  checkBlogIdInUrl,
  validateAdmin,
  findBlogFirst,
  updateBlog
);

adminBlogRouter.delete(
  "/:blogId",
  checkBlogIdInUrl,
  validateAdmin,
  findBlogFirst,
  deleteBlogByAdmin
);

adminBlogRouter.patch(
  "/publish/:blogId",
  checkBlogIdInUrl,
  validateAdmin,
  findBlogFirst,
  publishBlogByAdmin
);

export default adminBlogRouter;
