import express, { Application } from "express";
import authrouter from "./routes/auth.routes.js";
import { apiBaseUrl, port } from "./config/env.js";
import blogRouter from "./routes/blog.routes.js";
import adminBlogRouter from "./routes/blog.admin.routes.js";
import dbConnect from "./config/db.js";

// connecting to db
dbConnect().catch(console.dir);

const app: Application = express();

app.use(express.json());

app.use(`${apiBaseUrl}/auth`, authrouter);
app.use(`${apiBaseUrl}/admin/blogs`, adminBlogRouter);
app.use(`${apiBaseUrl}/blogs`, blogRouter);

app.listen(port, () => console.log(`Server is running on ${port}`));
