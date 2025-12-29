import { Router, Request, Response } from "express";
import { getAllAdminBlogs } from "../controllers/blog.controller.js";

const blogRouter = Router();

blogRouter.get("/", getAllAdminBlogs)
blogRouter.get("/:slug", (req: Request, res: Response) => {
    res.send("Single post")
});

export default blogRouter