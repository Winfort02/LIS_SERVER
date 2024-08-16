import { User } from "@prisma/client";
import { prismaClient } from "..";
import { ErrorCode, SuccessCode } from "../exceptions/generic";
import { SuccessReponse, UserResponse } from "../helpers/response";
import { Request, Response } from "express";
import { NotFound } from "../exceptions/request";
import { UserErrorMessage } from "../helpers/error-messages";

/**
 * Method to get all the users from the database
 * @param req request parameter
 * @param res response parameter
 * @returns JSON Object
 */
export const GetAllUsers = async (req: Request, res: Response) => {
  const users = await prismaClient.user.findMany();
  const userResponse = users.map((item: User) => new UserResponse(item));
  return res.json(new SuccessReponse(userResponse, SuccessCode.OK, true));
};

/**
 * Method to get one user details base on the id supplied in the request params
 * @param req request parameter
 * @param res response parameter
 * @returns JSON Object
 */
export const GetUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const user = await prismaClient.user.findUnique({ where: { id } });
  if (!user) {
    throw new NotFound(UserErrorMessage.notFound, ErrorCode.NOT_FOUND);
  }
  return res.json(
    new SuccessReponse(new UserResponse(user), SuccessCode.OK, true)
  );
};

/**
 * Method to update the user details
 * @param req request parameter
 * @param res response parameter
 * @returns JSON Object
 */
export const UpdateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { name, email, role } = req.body;
  const updatedUser = await prismaClient.user.update({
    where: { id },
    data: { name, email, role },
  });
  return res.json(
    new SuccessReponse(new UserResponse(updatedUser), SuccessCode.UPDATED, true)
  );
};

/**
 * Method to delete a user
 * @param req request parameter
 * @param res response parameter
 * @returns JSON Object
 */
export const DeleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await prismaClient.user.delete({ where: { id } });
  return res.json(new SuccessReponse(null, SuccessCode.NO_CONTENT, true));
};
