import { StockExpired } from "@prisma/client";
import { prismaClient } from "..";
import { BadRequest, NotFound, ServerError } from "../exceptions/request";
import {
  GetApparatusDetail,
  UpdateApparatusQuantity,
} from "./apparatus.service";
import { ErrorCode } from "../exceptions/generic";
import {
  CountSingleRelationQuery,
  pagination,
  PaginationWithSingleRelation,
} from "../helpers/common";

export const CreateExpiredStock = async (data: StockExpired) => {
  try {
    const apparatus = await GetApparatusDetail(data.apparatus_id);
    if (apparatus && apparatus.quantity > data.quantity) {
      await UpdateApparatusQuantity(apparatus.id, data.quantity, false);
    } else {
      throw new BadRequest(
        "Unable to reduce quantity more than current quantity",
        ErrorCode.BAD_REQUEST
      );
    }
    return await prismaClient.stockExpired.create({ data });
  } catch (error) {
    throw new ServerError(error);
  }
};

export const UpdatedExpiredItem = async (id: number, data: StockExpired) => {
  try {
    const currentExpiredItem = await prismaClient.stockExpired.findUnique({
      where: { id },
    });
    if (currentExpiredItem) {
      await UpdateApparatusQuantity(
        currentExpiredItem.apparatus_id,
        currentExpiredItem.quantity
      );
      const apparatus = await GetApparatusDetail(data.apparatus_id);
      if (apparatus && apparatus.quantity > data.quantity) {
        await UpdateApparatusQuantity(apparatus.id, data.quantity, false);
      } else {
        throw new BadRequest(
          "Unable to reduce quantity more than current quantity",
          ErrorCode.BAD_REQUEST
        );
      }
    } else {
      throw new NotFound(
        "Expired item not found please try again!",
        ErrorCode.NOT_FOUND
      );
    }
    return await prismaClient.stockExpired.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetAllExpiredItems = async (
  keywords: string,
  page: number,
  offset: number,
  pageSize: number
) => {
  try {
    const test = await prismaClient.stockExpired.findMany({
      ...PaginationWithSingleRelation({
        keywords,
        relation: "apparatus",
        searchProperty: "apparatus_name",
        skip: offset,
        take: pageSize,
        orderByProperty: "id",
        orderBy: "desc",
      }),
      include: {
        user: true,
        apparatus: true,
      },
    });
    const totalPages = await prismaClient.stockExpired.count(
      CountSingleRelationQuery(keywords, "apparatus", "apparatus_name")
    );
    return pagination(page, pageSize, totalPages, test);
  } catch (error) {
    throw new ServerError(error);
  }
};

export const DeleteExpireStock = async (id: number) => {
  try {
    const currentExpiredItem = await prismaClient.stockExpired.findUnique({
      where: { id },
    });
    if (currentExpiredItem) {
      await UpdateApparatusQuantity(
        currentExpiredItem.apparatus_id,
        currentExpiredItem.quantity
      );
    } else {
      throw new NotFound("Expired item not found", ErrorCode.BAD_REQUEST);
    }
    return await prismaClient.stockExpired.delete({ where: { id } });
  } catch (error) {
    throw new ServerError(error);
  }
};
