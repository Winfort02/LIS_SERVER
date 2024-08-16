import { GenericErrorMessage } from "../helpers/error-messages";
import { ErrorCode, ErrorStatusCode, HttpException } from "./generic";

/**
 *  Error Exception for bad request http request
 */
export class BadRequest extends HttpException {
  constructor(message: string, erroCode: ErrorCode, errors: any = null) {
    super(message, erroCode, ErrorStatusCode.BAD_REQUEST, errors);
  }
}

/**
 * Error Exception for not found http request
 */
export class NotFound extends HttpException {
  constructor(messge: string, errorCode: ErrorCode, errors: any = null) {
    super(messge, errorCode, ErrorStatusCode.NOT_FOUND, errors);
  }
}

/**
 * Error Exception for unauthorize access http request
 */
export class UnAuthorize extends HttpException {
  constructor(errors: any = null) {
    super(
      GenericErrorMessage.unAuthorizeAccess,
      ErrorCode.UNAUTHORIZE,
      ErrorStatusCode.UNAUTHORIZE,
      errors
    );
  }
}

/**
 * Error Exception for internal server error htpp request
 */
export class ServerError extends HttpException {
  constructor(errors: any = null) {
    super(
      GenericErrorMessage.serverError,
      ErrorCode.SERVER_ERROR,
      ErrorStatusCode.SERVER_ERROR,
      errors
    );
  }
}

/**
 * Error Exception for unprocessable entity http request
 */
export class UnProcessableEntity extends HttpException {
  constructor(errors: any) {
    super(
      GenericErrorMessage.unprocessableEntity,
      ErrorCode.UNPROCESSABLE_ENTITY,
      ErrorStatusCode.UNPROCESSABLE_ENITY,
      errors
    );
  }
}
