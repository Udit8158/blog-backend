import express from "express";
import authrouter from "./routes/auth.routes.js";
import { apiBaseUrl, port } from "./config/env.js";
import blogRouter from "./routes/blog.routes.js";
import adminBlogRouter from "./routes/blog.admin.routes.js";
import dbConnect from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import uploadFileRouter from "./routes/uploadFileRouter.js";

// connecting to db
if (process.env.NODE_ENV !== "test") {
  dbConnect().catch((error) => console.dir(error));
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(`${apiBaseUrl}/auth`, authrouter);
app.use(`${apiBaseUrl}/admin/blogs`, adminBlogRouter);
app.use(`${apiBaseUrl}/blogs`, blogRouter);
app.use(`${apiBaseUrl}/upload`, uploadFileRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Server is running on ${port}`));
}

export default app;
