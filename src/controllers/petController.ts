import { Request, Response } from "express";
import { tutors } from "../database/db";
import { Pet, Tutor } from "../models/models";

function createPet(req: Request, res: Response) {
    const { tutorid } = req.params;
    const { id, name, species, carry, weight, date_of_birth } = req.body;
    const desiredID = Number(tutorid);
    const desiredTutor = tutors.find((entity) => {
        return entity.id === desiredID;
    });
    if (!desiredTutor) {
        return res.status(500).json({ msg: "Fail" });
    }
    const newPet = new Pet(id, name, species, carry, weight, date_of_birth);
    desiredTutor.pets?.push(newPet);

    res.status(200).json({ msg: "Pet created" });
}

export { createPet };
