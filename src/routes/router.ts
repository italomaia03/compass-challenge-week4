import { Router } from "express";
import {
    getAllTutors,
    createTutor,
    deleteTutor,
} from "../controllers/tutorController";
import { createPet, updatePet } from "../controllers/petController";

export const router: Router = Router();

router.route("/tutors").get(getAllTutors);
router.route("/tutor").post(createTutor);
router.route("/tutor/:id").delete(deleteTutor);
router.route("/pet/:tutorId").post(createPet);
router.route("/pet/:petId/tutor/:tutorId").put(updatePet);
