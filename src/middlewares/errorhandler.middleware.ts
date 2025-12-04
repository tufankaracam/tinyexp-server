import { Request, Response, NextFunction } from "express";
import errorLogger from "../services/errorlogger.service";
import AppError from "../types/error.type";

const errorHandlerMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError && err.operational) {
        res.status(err.code).json({ success: false, message: err.message });
        errorLogger.error(err.message, {
            url: req.url,
            method: req.method,
            ip: req.ip,
            stack: err.stack
        });
        return;
    }

    errorLogger.error(err.message, {
        url: req.url,
        method: req.method,
        ip: req.ip,
        stack: err.stack
    });
    res.status(500).json({ success: false, message: "Internal server error" });
}
export default errorHandlerMiddleware;