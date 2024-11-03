import { Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { BadRequest, UnAuthorize } from "../exceptions/request";
import { ErrorCode, SuccessCode } from "../exceptions/generic";
import { signUpSchema } from "../schema/schema";
import { LoginErrorMessage } from "../helpers/error-messages";
import { SuccessReponse, UserResponse } from "../helpers/response";
import { User } from "@prisma/client";
import { generateSignToken } from "../helpers/sign-token";

const { userNotFound, invalidCredential, emailExist } = LoginErrorMessage;
const { NOT_EXIST, INCORRECT_CREDENTIALS, EXISTING } = ErrorCode;

/**
 * Method to validate user login credential
 * @param req request parameter
 * @param res response parameter
 * @returns JSON Object
 */
export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw new BadRequest(userNotFound, NOT_EXIST);
  }

  const isAuthenticated = compareSync(password, user.password);
  if (!isAuthenticated) {
    throw new BadRequest(invalidCredential, INCORRECT_CREDENTIALS);
  }
  const { key, _user, options } = generateSignToken(user);
  const token = jwt.sign(_user, key, options);
  const userResponse = new UserResponse(user);
  return res.json(
    new SuccessReponse({ userResponse, token }, SuccessCode.OK, true)
  );
};

/**
 * Method to create a user
 * @param req request parameter
 * @param res response parameter
 * @returns JSON Object
 */
export const SignUp = async (req: Request, res: Response) => {
  signUpSchema.parse(req.body);
  const { email, name, password } = req.body;

  const user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    throw new BadRequest(emailExist, EXISTING);
  }

  const createdUser = await prismaClient.user.create({
    data: { name, email, password: hashSync(password, 12) },
  });
  const userResponse = new UserResponse(createdUser);
  return res.json(new SuccessReponse(userResponse, SuccessCode.CREATED, true));
};

export const ChangePassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  if (!req.user) {
    throw new UnAuthorize("Unauthorized");
  }
  const id = req.user.id;
  const newPassword = hashSync(password, 12);
  const user = await prismaClient.user.update({
    where: { id },
    data: { password: newPassword },
  });
  return res.json(
    new SuccessReponse(new UserResponse(user), SuccessCode.NO_CONTENT, true)
  );
};

export const ResetPassword = async (req: Request, res: Response) => {
  const { password, email } = req.body;
  const newPassword = hashSync(password, 12);
  const user = await prismaClient.user.update({
    where: { email },
    data: { password: newPassword },
  });
  return res.json(
    new SuccessReponse(new UserResponse(user), SuccessCode.NO_CONTENT, true)
  );
};

/**
 * Method to get the current login details base in the token
 * @param req request parameter
 * @param res response parameter
 * @returns JSON Object
 */
export const GetUserFromToken = async (req: Request, res: Response) => {
  res.json(new UserResponse(req.user as User));
};
