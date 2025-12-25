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

export { createBlog };
