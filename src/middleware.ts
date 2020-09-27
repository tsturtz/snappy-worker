import { NextFunction, Request, Response } from "express";
import { RequestError } from "./types";

export const logErrors = (
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  next(err);
};

export const errorHandler = (
  err: RequestError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { status = 500, message = "Server Error" } = err;

  return res.status(status).json({ message });
};
