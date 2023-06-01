"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const tutorController_1 = require("../controllers/tutorController");
exports.router = (0, express_1.Router)();
exports.router.route("/tutors").get(tutorController_1.getAllTutors);
//# sourceMappingURL=router.js.map