import { User } from "@prisma/client";
import { prismaClient } from "..";
import { ErrorCode, SuccessCode } from "../exceptions/generic";
import { SuccessReponse, UserResponse } from "../helpers/response";
import { Request, Response } from "express";
import { NotFound } from "../exceptions/request";
import { UserErrorMessage } from "../helpers/error-messages";
import { CountQuery, pagination, PaginationQuery } from "../helpers/common";

/**
 * Method to get all the users from the database
 * @param req request parameter
 * @param res response parameter
 * @returns JSON Object
 */
export const GetAllUsers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.size as string) || 25;
  const keywords = (req.query.keywords as string) || "";
  const offset = (page - 1) * pageSize;
  const users = await prismaClient.user.findMany(
    PaginationQuery(keywords, "name", offset, pageSize, "id", "asc")
  );
  const totalPages = await prismaClient.user.count(
    CountQuery(keywords, "name")
  );
  const userResponse = users.map((item: User) => new UserResponse(item));
  const paginate = pagination(page, pageSize, totalPages, userResponse);
  return res.json(new SuccessReponse(paginate, SuccessCode.OK, true));
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
  const { name, email } = req.body;
  const updatedUser = await prismaClient.user.update({
    where: { id },
    data: { name, email },
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
