import { Request,Response,NextFunction } from "express";

const notFoundMiddleware = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        throw Error("404 Not Found");
    }
    catch(error){
        next(error);
    }
}

export default notFoundMiddleware;