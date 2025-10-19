import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { NextFunction, Request, Response } from "express";

export const authMiddle=(req: Request,res: Response,next:NextFunction)=>{
    const headers=req.headers["authorization"] ?? "" ;

    const decoded=jwt.verify(headers,JWT_SECRET);
    if(!decoded){
        res.json({
            message:"login first"
        })
    }else{
        //@ts-ignore
        req.userId=decoded.userId;
        next();
    }
}