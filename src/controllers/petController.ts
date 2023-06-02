import { Request, Response } from "express";
import { tutors } from "../database/db";
import { Pet, Tutor } from "../models/models";
import { ITutor } from "../models/interfaces/ITutor";
import { IPet } from "../models/interfaces/IPet";

function createPet(req: Request, res: Response) {
    const { tutorId } = req.params;
    const { id, name, species, carry, weight, date_of_birth } = req.body;
    const desiredID: number = Number(tutorId);
    const desiredTutor = tutors.find((entity) => {
        return entity.id === desiredID;
    });
    if (!desiredTutor) {
        return res.status(500).json({ msg: "Fail" });
    }
    const newPet: IPet = new Pet(
        id,
        name,
        species,
        carry,
        weight,
        date_of_birth
    );
    desiredTutor.pets?.push(newPet);

    res.status(201).json({ msg: "Pet has been created" });
}

function updatePet(req: Request, res: Response) {
    const { petId, tutorId } = req.params;
    const { id, name, species, carry, weight, date_of_birth } = req.body;

    const desiredTutorID: number = Number(tutorId);
    const desiredPetID: number = Number(petId);

    const desiredTutor = tutors.find((entity) => {
        return entity.id === desiredTutorID;
    });

    if (!desiredTutor) {
        return res.status(500).json({ msg: "Fail" });
    }

    let desiredPet = desiredTutor.pets?.find((entity) => {
        return entity.id === desiredPetID;
    });

    if (!desiredPet) {
        return res.status(500).json({ msg: "Fail" });
    }

    const updatedPet: IPet = new Pet(
        id,
        name,
        species,
        carry,
        weight,
        date_of_birth
    );

    const desiredPetIndex: number = desiredTutor.pets.indexOf(desiredPet);
    desiredTutor.pets[desiredPetIndex] = updatedPet;

    res.status(200).json({ msg: "Pet has been updated" });
}

function deletePet(req: Request, res: Response) {
    const { petId, tutorId } = req.params;

    const desiredTutorID: number = Number(tutorId);
    const desiredPetID: number = Number(petId);

    const desiredTutor = tutors.find((entity) => {
        return entity.id === desiredTutorID;
    });

    if (!desiredTutor) {
        return res
            .status(500)
            .json({ msg: `There is no tutor with ID: ${desiredTutorID}` });
    }

    let desiredPet = desiredTutor.pets?.find((entity) => {
        return entity.id === desiredPetID;
    });

    if (!desiredPet) {
        return res
            .status(500)
            .json({ msg: `There is no pet with ID: ${desiredPetID}` });
    }

    const desiredPetIndex: number = desiredTutor.pets.indexOf(desiredPet);
    desiredTutor.pets.splice(desiredPetIndex, 1);
    res.status(200).json({ msg: "Pet has been successfully deleted" });
}

export { createPet, updatePet, deletePet };
