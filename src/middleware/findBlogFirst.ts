import { Request, Response, NextFunction } from "express";
import { responseJsonHandler } from "../utils/response.utils.js";
import Blog from "../models/blog.schema.js";

export default async function findBlogFirst(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.payload;
    const blogId = req.blogId;

    // find the blog first
    const foundBlog = await Blog.findOne({ _id: blogId, author: userId }); // we can also directly search with blogId and userId

    if (!foundBlog)
      return responseJsonHandler({
        success: false,
        statusCode: 404,
        message: "No blog match found in your blogs collection",
        res,
        data: null,
      });

    req.foundBlog = foundBlog;
    next();
  } catch (error) {
    console.log(error);
    return responseJsonHandler({
      success: false,
      statusCode: 500,
      message: "Inside foundblogfirst middleware",
      res,
      data: error,
    });
  }
}
