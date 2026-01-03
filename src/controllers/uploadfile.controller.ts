import { Request, Response } from "express";
import { uploadImageInCloudinary } from "../utils/cloudinary.utils.js";
import { responseJsonHandler } from "../utils/response.utils.js";
import fs from "fs/promises";

async function uploadImage(req: Request, res: Response) {
  if (req.file) {
    try {
      const link = await uploadImageInCloudinary(req.file?.path);
    
      // delete the file from server
      await fs.unlink(req.file.path)

      return responseJsonHandler({
        success: true,
        statusCode: 200,
        data: { imageUrl: link },
        res,
        message: "Image uploaded successfully",
      });
    } catch (error) {
      console.log(error);
      return responseJsonHandler({
        success: false,
        statusCode: 500,
        data: null,
        res,
        message: "Error occured while uploading to cloudinary",
      });
    }
  } else {
    return responseJsonHandler({
      success: false,
      statusCode: 500,
      data: null,
      res,
      message: "File is not existed in req.file",
    });
  }
}

export default uploadImage;
