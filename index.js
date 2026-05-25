import cors from "cors";
import express from "express";
import morgan from "morgan";

import "./db.js";
import router from "./routes/index.js";
import { setupSwagger } from "./swagger.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

const PORT = process.env.PORT ?? 3001;
const isProduction = process.env.ENVIRONMENT === "production";

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

if (!isProduction) {
  app.use(morgan("dev"));
  setupSwagger(app, PORT);
}

app.use("/api", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  if (!isProduction) {
    console.log(`Swagger API docs: http://localhost:${PORT}/api-docs`);
  }
});