import { Request, Response, NextFunction } from "express";
import { responseJsonHandler } from "../utils/response.utils.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env.js";

// For protecting routes
export default function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies["access-token"];
    // checking for token exist or not
    if (!token)
      return responseJsonHandler({
        success: false,
        statusCode: 401,
        res,
        message: "You don't have valid access token",
        data: null,
      });

    // checking for valid token
    const payload = jwt.verify(token, jwtSecret);
    // TODO: Need to solve this later (should not have @tsignore)
    //@ts-ignore
    req.payload = payload;
    next();
  } catch (error) {
    responseJsonHandler({
      success: false,
      statusCode: 500,
      message: "Catch block in the validateUser middleware function",
      res,
      data: error,
    });
  }
}
