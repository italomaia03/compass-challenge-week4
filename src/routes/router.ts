import { Router } from "express";
import { getAllTutors } from "../controllers/tutorController";

export const router: Router = Router();

router.route("/tutors").get(getAllTutors);
