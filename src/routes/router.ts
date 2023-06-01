import { Router } from "express";
import { getAllTutors, createTutor } from "../controllers/tutorController";

export const router: Router = Router();

router.route("/tutors").get(getAllTutors);
router.route("/tutor").post(createTutor);
