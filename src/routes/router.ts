import { Router, Request, Response } from "express";

export const router: Router = Router();

router.route("/").get((_req: Request, res: Response) => {
    res.send("It is working...");
});
