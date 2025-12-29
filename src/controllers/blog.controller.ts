import { Request, Response } from "express";
import User, { IUser } from "../models/user.schema.js";
import { responseJsonHandler } from "../utils/response.utils.js";
import Blog from "../models/blog.schema.js";

async function getAllAdminBlogs(req: Request, res: Response) {
  // we will only show the one user blogs - which will be me (admin)
  try {
    // find the admin
    const admin = await User.findOne({ role: "admin" }).populate("blogs");

    if (!admin) {
      return responseJsonHandler({
        statusCode: 500,
        message:
          "Something is wrong - inside the blogcontroller file getalladminblogs function",
        success: false,
        res,
        data: null,
      });
    }

    const allBlogs = admin.blogs;
    const publishedBlogs = allBlogs.filter(
      // @ts-ignore TODO: Solve this
      (blog) => blog.status === "published"
    );

    return responseJsonHandler({
      success: true,
      statusCode: 200,
      res,
      message: "All the published blogs are here",
      data: publishedBlogs,
    });
  } catch (error) {
    return responseJsonHandler({
      statusCode: 500,
      message:
        "catch block - inside the blogcontroller file getalladminblogs function",
      success: false,
      res,
      data: null,
    });
  }
}

async function getSpecificBlog(req: Request, res: Response) {
  try {
    const { blogId } = req.params;

    const foundBlog = await Blog.findOne({
      _id: blogId,
      status: "published",
    }).populate("author");

    if (!foundBlog) {
      return responseJsonHandler({
        statusCode: 404,
        message: "No blog found",
        data: null,
        res,
        success: false,
      });
    }

    // @ts-ignore
    if (foundBlog.author.role !== "admin") {
      return responseJsonHandler({
        success: false,
        statusCode: 404,
        message: "This blog is not from admin",
        res,
        data: null,
      });
    }

    return responseJsonHandler({
      success: true,
      statusCode: 200,
      message: "Here is the blog",
      res,
      data: {
        blogId: foundBlog._id,
        title: foundBlog.title,
        content: foundBlog.content,
        slug: foundBlog.slug,
        // @ts-ignore
        author: foundBlog.author.name,
        publishedAt: foundBlog.publishedAt,
      },
    });
  } catch (error) {
    return responseJsonHandler({
      success: false,
      statusCode: 500,
      message: "Inside catch block in getaspecificblog function",
      res,
      data: null,
    });
  }
}
export { getAllAdminBlogs, getSpecificBlog };
