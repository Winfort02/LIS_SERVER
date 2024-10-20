import { User } from "@prisma/client";
import { prismaClient } from "..";
import { ServerError } from "../exceptions/request";
import { CountQuery, pagination, PaginationQuery } from "../helpers/common";
import { UserResponse } from "../helpers/response";
import { Request } from "express";

export const GetUserByEmailAsync = async (email: string) => {
  try {
    return await prismaClient.user.findFirst({ where: { email } });
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetUserByIdAsync = async (id: number) => {
  try {
    return await prismaClient.user.findUnique({ where: { id } });
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetUserListAsync = async (
  keywords: string,
  page: number,
  offset: number,
  pageSize: number
) => {
  try {
    const users = await prismaClient.user.findMany(
      PaginationQuery(keywords, "name", offset, pageSize, "id", "asc")
    );
    const totalPages = await prismaClient.user.count(
      CountQuery(keywords, "name")
    );
    const userResponse = users.map((item: User) => new UserResponse(item));
    return pagination(page, pageSize, totalPages, userResponse);
  } catch (error) {
    throw new ServerError(error);
  }
};

export const UpdateUserAsync = async (id: number, request: Request) => {
  try {
    const { name, email } = request.body;
    return await prismaClient.user.update({
      where: { id },
      data: { name, email },
    });
  } catch (error) {
    throw new ServerError(error);
  }
};

export const DeleteUserAsync = async (id: number) => {
  try {
    await prismaClient.user.delete({ where: { id } });
  } catch (error) {}
};
