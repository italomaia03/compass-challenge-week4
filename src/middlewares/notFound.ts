import { Request, Response } from "express";

function resourceNotFound(req: Request, res: Response) {
    return res.status(404).json({
        success: false,
        msg: "Content not found.",
    });
}

export { resourceNotFound };
