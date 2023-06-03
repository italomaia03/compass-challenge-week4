import { NextFunction, Request, Response } from "express";
import { tutors } from "../database/db";
import { Pet } from "../models/models";
import { IPet } from "../models/interfaces/IPet";
import { validatePetSchema } from "../utils/petValidator";
import { CustomValidationError } from "../errors/CustomValidationError";

async function createPet(req: Request, res: Response, next: NextFunction) {
    try {
        const { tutorId } = req.params;
        const { id, name, species, carry, weight, date_of_birth } = req.body;
        const desiredID: number = Number(tutorId);
        const desiredTutor = tutors.find((entity) => {
            return entity.id === desiredID;
        });
        if (!desiredTutor) {
            return next();
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
            return next(
                new CustomValidationError(
                    `Specified ID (${createdPet.id}) already being used. Please, try another number.`
                )
            );
        }

        desiredTutor.pets.push(createdPet);

        res.status(201).json({ msg: "Pet has been created" });
    } catch (error) {
        next(error);
    }
}

async function updatePet(req: Request, res: Response, next: NextFunction) {
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
        const validateId: boolean = desiredPetID === updatedPet.id;
        if (!validateId) {
            return next(
                new CustomValidationError(
                    `Specified ID (${updatedPet.id}) must not be different from the one passed in the URL parameters.`
                )
            );
        }

        const desiredPetIndex: number = desiredTutor.pets.indexOf(desiredPet);
        desiredTutor.pets[desiredPetIndex] = updatedPet;

        res.status(200).json({ msg: "Pet has been updated" });
    } catch (error) {
        next(error);
    }
}

function deletePet(req: Request, res: Response, next: NextFunction) {
    const { petId, tutorId } = req.params;

    const desiredTutorID: number = Number(tutorId);
    const desiredPetID: number = Number(petId);

    const desiredTutor = tutors.find((entity) => {
        return entity.id === desiredTutorID;
    });

    if (!desiredTutor) {
        return next();
    }

    let desiredPet = desiredTutor.pets?.find((entity) => {
        return entity.id === desiredPetID;
    });

    if (!desiredPet) {
        return next();
    }

    const desiredPetIndex: number = desiredTutor.pets.indexOf(desiredPet);
    desiredTutor.pets.splice(desiredPetIndex, 1);
    res.status(200).json({ msg: "Pet has been successfully deleted" });
}

export { createPet, updatePet, deletePet };
