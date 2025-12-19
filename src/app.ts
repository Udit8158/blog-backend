import express, { Application } from "express";
import authrouter from "./routes/auth.routes.js";
import { port } from "./config/env.js";

const app: Application = express();

app.use(express.json());

app.use("/auth", authrouter);

app.listen(port, () => console.log(`Server is running on ${port}`));
