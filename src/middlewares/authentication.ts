import { NextFunction, Response, Request } from "express";
import { UnAuthorize } from "../exceptions/request";
import * as JWT from "jsonwebtoken";
import { prismaClient } from "..";
import { JWT_SECRET_KEY } from "../secret";
import { User } from "@prisma/client";

declare module "express" {
  export interface Request {
    user?: User;
  }
}

interface IToken {
  id: number;
  email: string;
}

export const AuthenticationMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token?.length) {
      throw new UnAuthorize();
    }
    const payload = JWT.verify(token, JWT_SECRET_KEY) as IToken;
    const user = await prismaClient.user.findFirst({
      where: { id: payload.id },
    });
    if (!user) {
      throw new UnAuthorize();
    }
    req.user = user;
    next();
  } catch (error) {
    next(new UnAuthorize(error));
  }
};
