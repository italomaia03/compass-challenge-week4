import { Request, Response } from "express";
import { tutors } from "../database/db";
import { Tutor, Pet } from "../models/models";

function getAllTutors(_req: Request, res: Response) {
    const testPet = new Pet(1, "Shiro", "Dog", "P", 5, "2020-09-10");
    const testTutor = new Tutor(
        1,
        "Joe",
        "88998877654",
        "joe@joe.com",
        "2000-11-01 12:00",
        "4500000",
        [testPet]
    );
    tutors.push(testTutor);
    res.status(200).json(tutors);
}

export { getAllTutors };
