import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from 'zod';

export const validateRequest = (schema: ZodSchema, validationType: ('body' | 'params' | 'query')) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (validationType != 'query') {
                req[validationType] = schema.parse(req[validationType])
            }

            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                /* console.log(error.issues)
                res.status(400).json({
                    errors: error.issues.map(e => ({
                        field: e.path.join('.'),
                        message: e.message
                    }))
                });
                return; */
                const formattedErrors = error.issues.reduce((acc, issue) => {
                    const fieldName = issue.path.join('.');
                    acc[fieldName] = issue.message;
                    return acc;
                }, {} as Record<string, string>);

                return res.status(400).json({ errors: formattedErrors });
            }
            next(error);
        }
    }
}