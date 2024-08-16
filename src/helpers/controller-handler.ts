import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/generic";
import { ServerError, UnProcessableEntity } from "../exceptions/request";

/**
 * Method to handle controller functions/ method
 * @param controller
 * @returns JSON Object specific to error exception
 */
export const ControllerHandler = (controller: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else if (
        error?.name == "PrismaClientValidationError" ||
        error?.issues?.length
      ) {
        exception = new UnProcessableEntity(error);
      } else {
        exception = new ServerError(error);
      }
      next(exception);
    }
  };
};
