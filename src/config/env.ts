import { config } from "dotenv";

config(); // loads .env file if present (it will be there in production with NODE_ENV=production)
console.log(`Node Env - ${process.env.NODE_ENV || "development"}`);

config({ path: `.env.${process.env.NODE_ENV || "development"}` });
const port = process.env.PORT;

export { port };
