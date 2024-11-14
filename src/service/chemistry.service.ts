import { Chemistry } from "@prisma/client";
import { prismaClient } from "..";
import { ServerError } from "../exceptions/request";
import {
  CountSingleRelationQuery,
  pagination,
  PaginationWithSingleRelation,
} from "../helpers/common";

export const CreateChemistry = async (data: Chemistry) => {
  try {
    return await prismaClient.chemistry.create({ data });
  } catch (error) {
    throw new ServerError(error);
  }
};

export const UpdateChemistry = async (id: number, data: Chemistry) => {
  try {
    return await prismaClient.chemistry.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetChemistryDetail = async (
  id: number,
  includeTest: boolean = true
) => {
  try {
    const chemistry = await prismaClient.chemistry.findUnique({
      where: { id },
      include: {
        test: includeTest,
      },
    });
    if (!chemistry) return null;
    return chemistry;
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetChemistryPaginate = async (
  keywords: string,
  page: number,
  offset: number,
  pageSize: number
) => {
  try {
    const chemistryList = await prismaClient.chemistry.findMany({
      ...PaginationWithSingleRelation({
        keywords,
        relation: "test",
        searchProperty: "transaction_number",
        skip: offset,
        take: pageSize,
        orderByProperty: "id",
        orderBy: "asc",
      }),
      include: {
        test: {
          include: {
            patient: true,
          },
        },
      },
    });

    const totalPages = await prismaClient.chemistry.count(
      CountSingleRelationQuery(keywords, "test", "transaction_number")
    );
    return pagination(page, pageSize, totalPages, chemistryList);
  } catch (error) {
    throw new ServerError(error);
  }
};

export const DeleteChemistry = async (id: number) => {
  try {
    await prismaClient.chemistry.delete({ where: { id } });
  } catch (error) {
    throw new ServerError(error);
  }
};
