import { Request, Response } from "express";
import { tutors } from "../database/db";
import { Tutor } from "../models/models";
import { ITutor } from "../models/interfaces/ITutor";
import { validateTutorSchema } from "../utils/tutorValidator";

function getAllTutors(_req: Request, res: Response) {
    tutors.sort((a: ITutor, b: ITutor) => {
        return a.id - b.id;
    });
    res.status(200).json(tutors);
}

async function createTutor(req: Request, res: Response) {
    try {
        const { id, name, phone, email, date_of_birth, zip_code } =
            req.body as ITutor;
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
        res.status(400).json({ msg: `${(error as Error).message}` });
    }
}

async function updateTutor(req: Request, res: Response) {
    try {
        const desiredID: number = Number(req.params.id);
        const { id, name, phone, email, date_of_birth, zip_code } =
            req.body as ITutor;
        const desiredTutor = tutors.find((entity) => {
            return entity.id === desiredID;
        });
        if (!desiredTutor) {
            return res.status(404).json({
                msg: `Tutor with ID (${desiredID}) has not been found.`,
            });
        }
        const desiredTutorIndex = tutors.indexOf(desiredTutor);
        const priorTutorPets = desiredTutor.pets;
        const updatedTutor = new Tutor(
            id,
            name,
            phone,
            email,
            date_of_birth,
            zip_code,
            priorTutorPets
        );
        await validateTutorSchema(updatedTutor);
        const validateId: boolean = desiredID === updatedTutor.id;
        if (!validateId) {
            throw new Error(
                `Specified ID (${updatedTutor.id}) must not be different from the one passed in the URL parameters.`
            );
        }
        tutors[desiredTutorIndex] = updatedTutor;
        res.status(200).json({ msg: "Tutor has been successfully updated." });
    } catch (error) {
        res.status(400).json({ msg: `${(error as Error).message}` });
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

export { getAllTutors, createTutor, deleteTutor, updateTutor };
