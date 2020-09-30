import express, { Router } from "express";
import morgan from "morgan";
import { errorHandler } from "./middleware";
import api from "./api";
import { PORT } from "../config";

const startServer = (router: Router, onStart?: () => void) => {
  const server = express();
  server.use(morgan("common"));
  server.use(express.json());

  server.use(router);

  server.use("/api", api);
  server.use(errorHandler);

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

    if (onStart) onStart();
  });
};

export default startServer;
