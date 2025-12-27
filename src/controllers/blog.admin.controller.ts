import { Request, Response } from "express";
import BlogUserInput from "../types/blogschema.zod.js";

import * as z from "zod";
import { responseJsonHandler } from "../utils/response.utils.js";
import createSlug from "../utils/createSlug.utils.js";
import Blog, { IBlog } from "../models/blog.schema.js";
import User from "../models/user.schema.js";
import mongoose from "mongoose";

async function createBlog(req: Request, res: Response) {
  // use session
  const session = await mongoose.startSession();
  session.startTransaction(); // starting the session

  try {
    // if not req.body then it will throw error in the catch block
    const { title, content } = req.body;

    // validating with zod schema for Blog
    BlogUserInput.parse({ title, content });

    // create suitable properties of blog to store db
    let slug = createSlug(title);

    //@ts-ignore TODO: will solve this later
    const { userId } = req.payload;

    // create a new blog
    const newBlog = new Blog({
      title,
      content,
      slug,
      author: userId,
    });
    await newBlog.save({ session });

    // update the user
    await User.findByIdAndUpdate(
      userId,
      { $push: { blogs: newBlog._id } },
      { session }
    );

    await session.commitTransaction(); // successful transaction

    return responseJsonHandler({
      statusCode: 201,
      success: true,
      data: newBlog,
      message: "Blog is created successfully 🎉",
      res,
    });
  } catch (error) {
    await session.abortTransaction(); // stop the session
    console.log(error);
    if (error instanceof z.ZodError)
      return responseJsonHandler({
        success: false,
        data: error.issues,
        statusCode: 400,
        res,
        message: "Zod Error in catch block inside createBlog controller",
      });
    else {
      return responseJsonHandler({
        success: false,
        data: error,
        statusCode: 500,
        res,
        message: "Inside catch block, createBlog controller",
      });
    }
  } finally {
    session.endSession(); // ending the session
  }
}

async function getBlogsForAdmin(req: Request, res: Response) {
  try {
    // handeling query params
    const { blogs } = req.query;
    if (!blogs) {
      return responseJsonHandler({
        success: false,
        statusCode: 400,
        res,
        message:
          "Please specify blogs like '?blog=10' to get that number of blogs",
        data: null,
      });
    }

    // get that many blogs from DB for the user
    // @ts-ignore TODO: Fix the payload type
    const { userId } = req.payload;

    // TODO: ig there can be better ways to do this
    const numberOfBlogsUserNeed = Number(blogs);
    console.log(numberOfBlogsUserNeed);

  
    // Getting the blogs
    const blogsOfUser = await Blog.find({ author: userId }).limit(
      numberOfBlogsUserNeed
    );

    return responseJsonHandler({
      statusCode: 200,
      res,
      success: true,
      message: "Successfully get all the blogs by Admin 🫡",
      data: blogsOfUser,
    });
  } catch (error) {
    return responseJsonHandler({
      statusCode: 500,
      res,
      success: false,
      message:
        "Error in catch blog inside getBlogForAdmin function in blog.admin.controller file",
      data: error,
    });
  }
}
export { createBlog, getBlogsForAdmin };
