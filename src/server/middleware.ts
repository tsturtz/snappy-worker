import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { status = 500, message = "Server Error", error } = err;
  console.error(error.stack);

  return res.status(status).json({ message });
};
