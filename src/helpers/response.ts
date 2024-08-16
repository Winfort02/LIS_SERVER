import { $Enums, User } from "@prisma/client";

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

export class UserResponse {
  id!: number;
  name!: string;
  email!: string;
  role!: $Enums.Role;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
