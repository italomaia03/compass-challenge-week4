import { Request, Response } from "express";
import { tutors } from "../database/db";
import { Tutor } from "../models/models";
import { ITutor } from "../models/interfaces/ITutor";

function getAllTutors(_req: Request, res: Response) {
    res.status(200).json(tutors);
}

function createTutor(req: Request, res: Response) {
    const { id, name, phone, email, date_of_birth, zip_code } = req.body;
    const createdTutor: ITutor = new Tutor(
        id,
        name,
        phone,
        email,
        date_of_birth,
        zip_code
    );
    tutors.push(createdTutor);
    res.status(201).json({ msg: "Tutor successfully created" });
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
    res.status(200).json({ msg: "Tutor deleted" });
}

export { getAllTutors, createTutor, deleteTutor };
