import { Request, Response } from "express";
import User, { IUser } from "../models/user.schema.js";
import { responseJsonHandler } from "../utils/response.utils.js";
import { hashPassword, isValidPassword } from "../utils/hashpassword.utils.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env.js";

const signup = async (req: Request, res: Response) => {
  try {
    const { validatedBody } = req;
    const { name, email, password } = validatedBody;

    // if user already exist
    const existedUser = await User.findOne({ email });
    if (existedUser)
      return responseJsonHandler({
        statusCode: 409,
        res,
        message: "User already exists",
        success: false,
        data: null,
      });
    // handing custom response to manage the response structure all over the place

    // If user not existed, creating a new user in db
    const hashedPasswordToStoreInDB = await hashPassword(password);
    const userData: IUser = {
      name,
      email,
      password: hashedPasswordToStoreInDB,
      role: "user",
      blogs: [],
    };
    const newUser = await User.create(userData);

    return responseJsonHandler({
      statusCode: 201,
      data: null, // I think we don't need to send anything
      message: "User created successfully",
      res,
      success: true,
    });
  } catch (error) {
    return responseJsonHandler({
      statusCode: 500,
      data: error,
      message: "Error from signup controller catch block",
      res,
      success: false,
    });
  }
};

const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.validatedBody;

    // find a user in db with the email
    const foundUser = await User.findOne({ email });

    if (!foundUser)
      return responseJsonHandler({
        success: false,
        statusCode: 404,
        message: "User Not Found 🙂‍↕️",
        data: null,
        res,
      });

    // if user found then let's check the password matching or not
    const passwordMatched = await isValidPassword(password, foundUser.password);
    if (!passwordMatched)
      return responseJsonHandler({
        success: false,
        statusCode: 401,
        message: "Password Not Matched 🥹",
        data: null,
        res,
      });

    // if everything is alright passing the access token in the cookie
    const token = jwt.sign(
      { userId: foundUser._id, role: foundUser.role },
      jwtSecret,
      {
        expiresIn: "24h",
      }
    );
    res.cookie("access-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24h in ms
    });

    return responseJsonHandler({
      success: true,
      statusCode: 200,
      message: "Signed In 🎉",
      data: null,
      res,
    });
  } catch (error) {
    return responseJsonHandler({
      success: false,
      statusCode: 500,
      message: "Inside catch block in signin function in authrouter controller",
      data: error,
      res,
    });
  }
};

const signout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("access-token");
    return responseJsonHandler({
      success: true,
      statusCode: 200,
      message: "Signed out successfully",
      res,
      data: null,
    });
  } catch (error) {
    return responseJsonHandler({
      success: true,
      statusCode: 500,
      message: "Error in catch block in signout handler",
      res,
      data: error,
    });
  }
};

export { signup, signin, signout };
