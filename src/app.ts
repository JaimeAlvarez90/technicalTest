import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/index.js";
import errorHandler from "./middleware/error.js";
import logger from "./logger/index.js";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req,res,next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use("/api", router);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

app.use(errorHandler);
