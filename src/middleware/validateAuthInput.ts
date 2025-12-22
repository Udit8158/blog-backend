import { Request, Response, NextFunction } from "express";
import { responseJsonHandler } from "../utils/response.utils.js";

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function validateAuthInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.body) {
      const { name, email, password } = req.body;

      // name checking
      if (req.url === "/register") {
        if (name) {
          if (typeof name !== "string")
            return responseJsonHandler({
              success: false,
              statusCode: 400,
              message: "Name should be a string",
              data: null,
              res,
            });

          if (name.trim().length < 3 || name.trim().length > 20)
            return responseJsonHandler({
              success: false,
              statusCode: 400,
              message: "Name needs to be 3-20 charcater",
              data: null,
              res,
            });
        } else {
          return responseJsonHandler({
            success: false,
            statusCode: 400,
            message: "name can't be undefined",
            data: null,
            res,
          });
        }
      }

      // email checking
      if (email) {
        if (typeof email !== "string")
          return responseJsonHandler({
            success: false,
            statusCode: 400,
            message: "Email should be a string",
            data: null,
            res,
          });

        if (!isValidEmail(email))
          return responseJsonHandler({
            success: false,
            statusCode: 400,
            message: "email format is invalid",
            data: null,
            res,
          });
      } else {
        return responseJsonHandler({
          success: false,
          statusCode: 400,
          message: "email can't be undefined",
          data: null,
          res,
        });
      }

      // password checking
      if (password) {
        if (typeof password !== "string")
          return responseJsonHandler({
            success: false,
            statusCode: 400,
            message: "Password should be a string",
            data: null,
            res,
          });

        if (password.trim().length < 6 || password.trim().length > 20)
          return responseJsonHandler({
            success: false,
            statusCode: 400,
            message: "password should be 6 to 20 character long",
            data: null,
            res,
          });
      } else {
        return responseJsonHandler({
          success: false,
          statusCode: 400,
          message: "password can't be undefined",
          data: null,
          res,
        });
      }

      // attaching validatedBody in req (@types/express.d.ts)
      req.validatedBody = { name, email, password };
      next();
    } else {
      return responseJsonHandler({
        success: false,
        statusCode: 400,
        message: "No input provided in request body",
        data: null,
        res,
      });
    }
  } catch (error) {
    console.log(`This is the ERROR \n ${error}`);
    return responseJsonHandler({
      success: false,
      statusCode: 500,
      message: "Error in validateAuthInput middleware catch block",
      data: error,
      res,
    });
  }
}
