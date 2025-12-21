import { Request, Response, NextFunction } from "express";

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function validateUserInput(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {
    if (req.body) {
      const { name, email, password } = req.body;

      if (name) {
        if (typeof name !== "string")
          return res.json({ error: "Name should be a string" });

        if (name.trim().length < 3 || name.trim().length > 20)
          return res.json({ error: "Name needs to be 3-20 charcater" });
      } else {
        return res.json({ error: "name can't be undefined" });
      }

      if (email) {
        if (typeof email !== "string")
          return res.json({ error: "Email should be a string" });

        if (!isValidEmail(email))
          return res.json({ error: "email format is invalid" });
      } else {
        return res.json({ error: "email can't be undefined" });
      }

      if (password) {
        if (typeof password !== "string")
          return res.json({ error: "Password should be a string" });

        if (password.trim().length < 6 || password.trim().length > 20)
          return res.json({
            error: "password should be 6 to 20 character long",
          });
      } else {
        return res.json({ error: "password can't be undefined" });
      }

      req.validatedBody = { name, email, password };
      next();
    } else {
      return res.json({ error: "No input provided in request body" });
    }
  } catch (error) {
    console.log(`This is the ERROR \n ${error}`);
    return res.json({ error });
  }
}
