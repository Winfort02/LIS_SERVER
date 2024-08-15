export class SuccessReponse {
  data!: any;
  statusCode!: number;
  success!: boolean;

  constructor(data: any, statuCode: number, success: boolean) {
    this.data = data;
    this.statusCode = statuCode;
    this.success = success;
  }
}

export class ErrorResponse {
  errors: any;
  success!: boolean;
  message: string = "";
  constructor(errors: any, success: boolean, message: string) {
    this.errors = errors;
    this.success = success;
    this.message = message;
  }
}
