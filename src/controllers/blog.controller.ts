import { Request, Response } from "express";
import User from "../models/user.schema.js";

async function getAllAdminBlogs(req: Request, res: Response) {
    // we will only show the one user blogs - which will be me (admin) 
    try {
        // find the admin
        const admin = await User.findOne({role: "user"}).populate("blogs")

        console.log(admin)
        
    } catch (error) {
        
    }
}

export {getAllAdminBlogs}