import express from "express";
import { router } from "./routes/router";

require("dotenv").config();
const app = express();

// middlewares
app.use(express.json());
app.use("/api/v1", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
