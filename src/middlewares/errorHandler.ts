import { NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";

function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (err instanceof ValidationError) {
        return res.status(res.statusCode).json({
            success: false,
            msg: err.message,
        });
    }
    return res.status(500).json({
        success: false,
        msg: "Something unexpected happened",
    });
}

export { errorHandler };
