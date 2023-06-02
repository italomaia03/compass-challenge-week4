import { Request, Response } from "express";
import { tutors } from "../database/db";
import { Tutor } from "../models/models";
import { ITutor } from "../models/interfaces/ITutor";
import { tutorSchema, validateTutorSchema } from "../utils/tutorValidator";
import { error } from "console";

function getAllTutors(_req: Request, res: Response) {
    res.status(200).json(tutors);
}

async function createTutor(req: Request, res: Response) {
    try {
        const { id, name, phone, email, date_of_birth, zip_code } = req.body;
        const createdTutor: ITutor = new Tutor(
            Number(id),
            name,
            phone,
            email,
            date_of_birth,
            zip_code
        );
        await validateTutorSchema(createdTutor);
        const validateId = tutors.find((tutor) => tutor.id === createdTutor.id);
        if (validateId) {
            throw new Error(
                `Specified ID (${createdTutor.id}) already being used. Please, try another number.`
            );
        }
        tutors.push(createdTutor);
        res.status(201).json({ msg: "Tutor has been successfully created" });
    } catch (error) {
        res.status(400).json({ msg: `${error}` });
    }
}

function deleteTutor(req: Request, res: Response) {
    const desiredID: number = Number(req.params.id);
    const desiredTutor = tutors.find((entity) => {
        return entity.id === desiredID;
    });
    if (!desiredTutor) {
        return res
            .status(404)
            .json({ msg: `Tutor with ID (${desiredID}) has not been found.` });
    }
    tutors.splice(tutors.indexOf(desiredTutor), 1);
    res.status(200).json({ msg: "Tutor has been deleted" });
}

export { getAllTutors, createTutor, deleteTutor };
