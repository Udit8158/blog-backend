import mongoose from "mongoose";
import { dbUri } from "./env.js";

async function dbConnect() {
  try {
    await mongoose.connect(dbUri);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection error", error);
    process.exit(1); // if connection fail then shut down the server.
  }
}

export default dbConnect;
