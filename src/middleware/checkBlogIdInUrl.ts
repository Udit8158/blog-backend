import {Request, Response, NextFunction } from "express";
import { responseJsonHandler } from "../utils/response.utils.js";

export default function checkBlogIdInUrl(req: Request, res: Response, next: NextFunction) {
    const { blogId } = req.params;

    if (!blogId) {
      return responseJsonHandler({
        statusCode: 400,
        res,
        message: "Add ?blogId in parameter",
        data: null,
        success: false,
      });
    }

    req.blogId = blogId
    next()
}