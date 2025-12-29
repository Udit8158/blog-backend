import { Router, Request, Response } from "express";
import { getAllAdminBlogs, getSpecificBlog } from "../controllers/blog.controller.js";

const blogRouter = Router();

blogRouter.get("/", getAllAdminBlogs)
blogRouter.get("/:blogId", getSpecificBlog);

export default blogRouter