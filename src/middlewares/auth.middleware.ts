import { Request, Response, NextFunction } from "express";
import AppError from "../types/error.type";
import { verifyToken } from "../helpers/token.helper";
import asyncHandler from "./asynchandler.middleware";

const checkAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

        if (!token) {
            throw new AppError(401, 'You dont have permission.')
        }

        if (!token.includes("Bearer ")) {
            throw new AppError(401, 'Token format is not valid');
        }

        const signature = token.split(" ")[1];
        const decoded = verifyToken(signature);
        req.user = decoded;
        next();
});
export default checkAuth;