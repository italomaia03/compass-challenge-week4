"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTutors = void 0;
const db_1 = require("../database/db");
const models_1 = require("../models/models");
function getAllTutors(_req, res) {
    const testPet = new models_1.Pet(1, "Shiro", "Dog", "P", 5, "2020-09-10");
    const testTutor = new models_1.Tutor(1, "Joe", "88998877654", "joe@joe.com", "2000-11-01 12:00", "4500000", [testPet]);
    db_1.tutors.push(testTutor);
    res.status(200).json(db_1.tutors);
}
exports.getAllTutors = getAllTutors;
//# sourceMappingURL=tutorController.js.map