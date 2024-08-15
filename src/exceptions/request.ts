import { ErrorCode, HttpException } from "./generic";

export class BadRequest extends HttpException {
  constructor(message: string, erroCode: ErrorCode, errors: any = null) {
    super(message, erroCode, 400, errors);
  }
}

export class UnAuthorize extends HttpException {
  constructor(errors: any = null) {
    super(
      "Unauthorize access. Please login again!",
      ErrorCode.UNAUTHORIZE,
      401,
      errors
    );
  }
}

export class ServerError extends HttpException {
  constructor(errors: any = null) {
    super("Something went wrong.", ErrorCode.SERVER_ERROR, 500, errors);
  }
}

export class UnProcessableEntity extends HttpException {
  constructor(errors: any) {
    super(
      "UnProcessable entity error.",
      ErrorCode.UNPROCESSABLE_ENTITY,
      422,
      errors
    );
  }
}
