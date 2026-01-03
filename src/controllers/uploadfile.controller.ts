import { Request, Response } from "express";

async function uploadImage(req: Request, res: Response) {
   
    console.log(req.file?.path)
    res.json("hello")
}

export default uploadImage;
