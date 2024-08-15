import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../secret";
import { BadRequest } from "../exceptions/request";
import { ErrorCode, SuccessCode } from "../exceptions/generic";
import { signUpSchema } from "../schema/users";
import { LoginErrorMessage } from "../helpers/error-messages";
import { SuccessReponse } from "../helpers/response";

const { userNotFound, invalidCredential, emailExist } = LoginErrorMessage;
const { NOT_EXIST, INCORRECT_CREDENTIALS, EXISTING } = ErrorCode;

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    return next(new BadRequest(userNotFound, NOT_EXIST));
  }

  const isAuthenticated = compareSync(password, user.password);
  if (!isAuthenticated) {
    return next(new BadRequest(invalidCredential, INCORRECT_CREDENTIALS));
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      username: user.name,
    },
    JWT_SECRET_KEY
  );
  return res.json(new SuccessReponse({ user, token }, SuccessCode.OK, true));
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  signUpSchema.parse(req.body);
  const { email, name, password } = req.body;

  const user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    return next(new BadRequest(emailExist, EXISTING));
  }

  const createdUser = await prismaClient.user.create({
    data: {
      name: name,
      email: email,
      password: hashSync(password, 12),
    },
  });
  return res.json(new SuccessReponse(createdUser, SuccessCode.CREATED, true));
};
