import express from "express";
import authrouter from "./routes/auth.routes.js";
import { apiBaseUrl, port } from "./config/env.js";
import blogRouter from "./routes/blog.routes.js";
import adminBlogRouter from "./routes/blog.admin.routes.js";
import dbConnect from "./config/db.js";
import cookieParser from "cookie-parser";

// connecting to db
dbConnect().catch(console.dir);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(`${apiBaseUrl}/auth`, authrouter);
app.use(`${apiBaseUrl}/admin/blogs`, adminBlogRouter);
app.use(`${apiBaseUrl}/blogs`, blogRouter);

app.listen(port, () => console.log(`Server is running on ${port}`));
