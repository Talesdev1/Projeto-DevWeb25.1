import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/index.js";
import { ValidationError } from "sequelize";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    console.log(error.errors);
    error = new BaseError({
      type: error.errors[0].validatorKey || "bad_request",
      path: error.errors[0].path || undefined,
    });
  }

  if (!(error instanceof BaseError)) {
    error = new BaseError(error.type);
  }
  console.error("Error: ", error.message);
  return res.status(error.statusCode).json({ message: error.message });
};
