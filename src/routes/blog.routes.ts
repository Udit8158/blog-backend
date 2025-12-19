import { Router, Request, Response } from "express";

const blogRouter = Router();

blogRouter.get("/", (req: Request, res: Response) => {
    res.send("All posts")
});

blogRouter.get("/:slug", (req: Request, res: Response) => {
    res.send("Single post")
});

export default blogRouter