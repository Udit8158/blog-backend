import { config } from "dotenv";

config(); // loads .env file if present (it will be there in production with NODE_ENV=production)
console.log(`Node Env - ${process.env.NODE_ENV || "development"}`);

config({ path: `.env.${process.env.NODE_ENV || "development"}` });
const port = process.env.PORT;
const apiBaseUrl: string = process.env.API_BASE_URL || "/api/v2";
const dbUri: string = process.env.DB_URI || "";
const jwtSecret: string = process.env.JWT_SECRET || "test-its-not-same";

if (!process.env.JWT_SECRET || !process.env.DB_URI || !process.env.API_BASE_URL || !process.env.PORT) {
    throw new Error("Your ENV file is not setup properly, check env example file and setup according to that")
}

// PROBLEM: nodeEnv should be "development or production", but right now it's type is string only

export { port, apiBaseUrl, dbUri, jwtSecret };

// The Plan:
// in .env we will have NODE_ENV that is the mode production or development
// Acc to that, we surve .env.development or .env.production as env file
