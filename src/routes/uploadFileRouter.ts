import { NextFunction, Request, Response, Router } from "express";
import uploadImage from "../controllers/uploadfile.controller.js";
import upload from "../middleware/uploadfile.middleware.js";


const uploadFileRouter = Router();

uploadFileRouter.post("/upload-image", upload.single("image"), uploadImage);

export default uploadFileRouter;
