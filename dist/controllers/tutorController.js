"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTutor = exports.getAllTutors = void 0;
const db_1 = require("../database/db");
const models_1 = require("../models/models");
function getAllTutors(_req, res) {
    res.status(200).json(db_1.tutors);
}
exports.getAllTutors = getAllTutors;
function createTutor(req, res) {
    const { id, name, phone, email, date_of_birth, zip_code } = req.body;
    const createdTutor = new models_1.Tutor(Number(id), name, phone, email, date_of_birth, zip_code);
    db_1.tutors.push(createdTutor);
    res.status(200).json({ msg: "Tutor successfully created" });
}
exports.createTutor = createTutor;
//# sourceMappingURL=tutorController.js.map