"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./routes/router");
require("dotenv").config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/", router_1.router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
//# sourceMappingURL=app.js.map