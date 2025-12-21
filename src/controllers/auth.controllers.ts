import { Request, Response } from "express";
import User, { IUser } from "../models/user.schema.js";
import { responseJsonHandler } from "../utils/response.utils.js";
import { hashPassword } from "../utils/hashpassword.utils.js";

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
    };
    const newUser = await User.create(userData);

    return responseJsonHandler({
      statusCode: 201,
      data: newUser,
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

const signin = async (req: Request, res: Response) => {};

const signout = async (req: Request, res: Response) => {};

export { signup, signin, signout };
