import { Request, Response } from "express";
import { tutors } from "../database/db";
import { Tutor } from "../models/models";
import { ITutor } from "../models/interfaces/ITutor";
import { validateTutorSchema } from "../utils/tutorValidator";

function getAllTutors(_req: Request, res: Response) {
    res.status(200).json(tutors);
}

async function createTutor(req: Request, res: Response) {
    try {
        const { id, name, phone, email, date_of_birth, zip_code } = req.body;
        const createdTutor: ITutor = new Tutor(
            id,
            name,
            phone,
            email,
            date_of_birth,
            zip_code
        );
        await validateTutorSchema(createdTutor);
        tutors.push(createdTutor);
        res.status(201).json({ msg: "Tutor has been successfully created" });
    } catch (error) {
        res.status(500).json({ msg: `${error}` });
    }
}

function deleteTutor(req: Request, res: Response) {
    const desiredID: number = Number(req.params.id);
    const desiredTutor = tutors.find((entity) => {
        return entity.id === desiredID;
    });
    if (!desiredTutor) {
        return res.status(500).json({ msg: "Fail" });
    }
    tutors.splice(tutors.indexOf(desiredTutor), 1);
    res.status(200).json({ msg: "Tutor has been deleted" });
}

export { getAllTutors, createTutor, deleteTutor };
