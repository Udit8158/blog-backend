import multer from "multer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { responseJsonHandler } from "../utils/response.utils.js";

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define upload directory
const uploadDir = path.join(__dirname, "../../temp");

// configuring multer
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    await fs.mkdir(uploadDir, { recursive: true }); // creating the temp folder if not existed
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExt = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExt);
  },
});

const upload = multer({ storage: storage });

export default upload;
