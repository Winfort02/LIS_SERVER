import { Apparatus } from "@prisma/client";
import { prismaClient } from "..";
import { ServerError } from "../exceptions/request";
import { CountQuery, pagination, PaginationQuery } from "../helpers/common";

export const CreateApparatus = async (data: Apparatus) => {
  try {
    return await prismaClient.apparatus.create({ data });
  } catch (error) {
    throw new ServerError(error);
  }
};

export const UpdateApparatus = async (id: number, data: Apparatus) => {
  try {
    return await prismaClient.apparatus.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetApparatusDetail = async (id: number) => {
  try {
    const appratus = await prismaClient.apparatus.findUnique({
      where: { id },
    });
    if (!appratus) return null;
    return appratus;
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetApparatusPaginate = async (
  keywords: string,
  page: number,
  offset: number,
  pageSize: number
) => {
  try {
    const appratus = await prismaClient.apparatus.findMany({
      ...PaginationQuery(
        keywords,
        "apparatus_name",
        offset,
        pageSize,
        "id",
        "asc"
      ),
    });

    const totalPages = await prismaClient.apparatus.count(
      CountQuery(keywords, "apparatus_name")
    );
    return pagination(page, pageSize, totalPages, appratus);
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetActiveApparatus = async () => {
  try {
    return await prismaClient.apparatus.findMany({
      where: { status: true },
    });
  } catch (error) {
    console.log(error);
    throw new ServerError(error);
  }
};

export const UpdateApparatusQuantity = async (
  id: number,
  quantity: number,
  isIncreament = true
) => {
  try {
    const mode = isIncreament ? "increment" : "decrement";
    return await prismaClient.apparatus.update({
      where: { id },
      data: {
        quantity: {
          [mode]: quantity,
        },
      },
    });
  } catch (error) {
    throw new ServerError(error);
  }
};
