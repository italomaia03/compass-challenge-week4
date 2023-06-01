import { Request, Response } from "express";
import { tutors } from "../database/db";
import { Tutor, Pet } from "../models/models";

function getAllTutors(_req: Request, res: Response) {
    res.status(200).json(tutors);
}

function createTutor(req: Request, res: Response) {
    const { id, name, phone, email, date_of_birth, zip_code } = req.body;
    const createdTutor = new Tutor(
        Number(id),
        name,
        phone,
        email,
        date_of_birth,
        zip_code
    );
    tutors.push(createdTutor);
    res.status(200).json({ msg: "Tutor successfully created" });
}

export { getAllTutors, createTutor };
