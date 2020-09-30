import express, { Request, Response } from "express";
import morgan from "morgan";
import { errorHandler } from "./middleware";
import api from "./api";
import { PORT } from "../config";

type Route = {
  method: "get" | "post";
  path: string;
  handler: (req: Request, res: Response) => void;
};

const startServer = (routes: Route[]) => {
  const server = express();

  server.use(morgan("common"));
  server.use(express.json());

  routes.forEach((route) => {
    server[route.method](route.path, route.handler);
  });

  server.use("/api", api);
  server.use(errorHandler);

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

export default startServer;
