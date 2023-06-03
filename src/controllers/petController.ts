import { Request, Response } from "express";
import { tutors } from "../database/db";
import { Pet } from "../models/models";
import { IPet } from "../models/interfaces/IPet";
import { validatePetSchema } from "../utils/petValidator";

async function createPet(req: Request, res: Response) {
    try {
        const { tutorId } = req.params;
        const { id, name, species, carry, weight, date_of_birth } = req.body;
        const desiredID: number = Number(tutorId);
        const desiredTutor = tutors.find((entity) => {
            return entity.id === desiredID;
        });
        if (!desiredTutor) {
            return res
                .status(404)
                .json({ msg: `There is no tutor with ID ${tutorId}` });
        }
        const createdPet: IPet = new Pet(
            Number(id),
            name,
            species,
            carry,
            Number(weight),
            date_of_birth
        );
        await validatePetSchema(createdPet);
        const validateId = desiredTutor.pets.find(
            (pet) => pet.id === createdPet.id
        );

        if (validateId) {
            throw new Error(
                `Specified ID (${createdPet.id}) already being used. Please, try another number.`
            );
        }

        desiredTutor.pets.push(createdPet);

        res.status(201).json({ msg: "Pet has been created" });
    } catch (error) {
        res.status(400).json({ msg: `${error}` });
    }
}

async function updatePet(req: Request, res: Response) {
    try {
        const { petId, tutorId } = req.params;
        const { id, name, species, carry, weight, date_of_birth } = req.body;

        const desiredTutorID: number = Number(tutorId);
        const desiredPetID: number = Number(petId);

        const desiredTutor = tutors.find((entity) => {
            return entity.id === desiredTutorID;
        });

        if (!desiredTutor) {
            return res.status(404).json({ msg: "Fail" });
        }

        let desiredPet = desiredTutor.pets?.find((entity) => {
            return entity.id === desiredPetID;
        });

        if (!desiredPet) {
            return res.status(404).json({ msg: "Fail" });
        }

        const updatedPet: IPet = new Pet(
            id,
            name,
            species,
            carry,
            weight,
            date_of_birth
        );

        await validatePetSchema(updatedPet);

        const desiredPetIndex: number = desiredTutor.pets.indexOf(desiredPet);
        desiredTutor.pets[desiredPetIndex] = updatedPet;

        res.status(200).json({ msg: "Pet has been updated" });
    } catch (error) {
        res.status(400).json({ msg: `${(error as Error).message}` });
    }
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
            .status(404)
            .json({ msg: `There is no tutor with ID: ${desiredTutorID}` });
    }

    let desiredPet = desiredTutor.pets?.find((entity) => {
        return entity.id === desiredPetID;
    });

    if (!desiredPet) {
        return res
            .status(404)
            .json({ msg: `There is no pet with ID: ${desiredPetID}` });
    }

    const desiredPetIndex: number = desiredTutor.pets.indexOf(desiredPet);
    desiredTutor.pets.splice(desiredPetIndex, 1);
    res.status(200).json({ msg: "Pet has been successfully deleted" });
}

export { createPet, updatePet, deletePet };
