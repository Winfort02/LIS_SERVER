import { User } from "@prisma/client";
import { SignOptions } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../secret";

export const generateSignToken = (user: User) => {
  const _user = {
    id: user.id,
    email: user.email,
  };
  const options: SignOptions = { expiresIn: "8h" };

  return { _user, key: JWT_SECRET_KEY, options };
};
