export class HttpException extends Error {
  message: string;
  erroCode: ErrorCode;
  statusCode: number;
  errors: any;

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: any,
    errors: any
  ) {
    super(message);
    this.message = message;
    this.erroCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErrorCode {
  NOT_FOUND = 1001,
  NOT_EXIST = 1002,
  INCORRECT_CREDENTIALS = 1003,
  UNAUTHORIZE = 1004,
  EXISTING = 1005,
  SERVER_ERROR = 1009,
  UNPROCESSABLE_ENTITY = 1010,
  BAD_REQUEST = 1012,
}

export enum SuccessCode {
  OK = 200,
  CREATED = 201,
  UPDATED = 202,
  NO_CONTENT = 204,
}
