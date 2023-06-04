import express from "express";
import { router } from "./routes/router";
import { resourceNotFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import fs from "fs";
import yaml from "yaml";
import swaggerUi from "swagger-ui-express";
import path from "path";

require("dotenv").config();
const app = express();
const filePath = path.resolve(__dirname, "../");
const file = fs.readFileSync(`${filePath}/swagger.yaml`, "utf-8");
const swaggerDocs = yaml.parse(file);

// middlewares
app.use(express.json());
app.use("/api/v1", router);
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(resourceNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
