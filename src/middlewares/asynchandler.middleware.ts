import { Request, Response, NextFunction } from "express";

type asyncHandlerType = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const asyncHandler = (fn: asyncHandlerType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        }
        catch (error) {
            next(error);
        }
    }
}

export default asyncHandler;