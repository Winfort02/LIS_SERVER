import { ErrorCode, SuccessCode } from "../exceptions/generic";
import { SuccessReponse, UserResponse } from "../helpers/response";
import { Request, Response } from "express";
import { NotFound } from "../exceptions/request";
import { UserErrorMessage } from "../helpers/error-messages";
import { PaginationRequest } from "../helpers/request";
import {
  DeleteUserAsync,
  GetUserByIdAsync,
  GetUserListAsync,
  UpdateUserAsync,
} from "../service/user.service";

/**
 * Method to get all the users from the database
 * @param req request parameter
 * @param res response parameter
 * @returns JSON Object
 */
export const GetAllUsers = async (req: Request, res: Response) => {
  const { keywords, page, offset, pageSize } = PaginationRequest(req);
  const users = await GetUserListAsync(keywords, page, offset, pageSize);
  return res.json(new SuccessReponse(users, SuccessCode.OK, true));
};

/**
 * Method to get one user details base on the id supplied in the request params
 * @param req request parameter
 * @param res response parameter
 * @returns JSON Object
 */
export const GetUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const user = await GetUserByIdAsync(id);
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
  const updatedUser = await UpdateUserAsync(id, req);
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
  await DeleteUserAsync(id);
  return res.json(new SuccessReponse(null, SuccessCode.NO_CONTENT, true));
};
