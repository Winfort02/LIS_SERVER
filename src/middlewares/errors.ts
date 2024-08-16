import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/generic";
import { ErrorResponse } from "../helpers/response";

export const ErrorMiddleWare = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(error.statusCode)
    .json(new ErrorResponse(error, false, error.message));
};
