import express from "express";
import { router } from "./routes/router";
import { resourceNotFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";

require("dotenv").config();
const app = express();

// middlewares
app.use(express.json());
app.use("/api/v1", router);
app.use(resourceNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
