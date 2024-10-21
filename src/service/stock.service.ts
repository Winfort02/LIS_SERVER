import { Stock, StockIn, StockOut } from "@prisma/client";
import { prismaClient } from "..";
import { ServerError } from "../exceptions/request";
import { UpdateApparatusQuantity } from "./apparatus.service";
import {
  CountSingleRelationQuery,
  pagination,
  PaginationWithSingleRelation,
} from "../helpers/common";
import { UserResponse } from "../helpers/response";

export const CreateStock = async (data: Stock) => {
  try {
    return await prismaClient.stock.create({ data });
  } catch (error) {
    throw new ServerError(error);
  }
};

export const CreateStockIn = async (data: StockIn[]) => {
  try {
    if (data?.length) {
      data.forEach(
        async (item: StockIn) =>
          await UpdateApparatusQuantity(item.apparatus_id, item.quantity)
      );
      return await prismaClient.stockIn.createMany({
        data,
        skipDuplicates: true,
      });
    }
    return null;
  } catch (error) {
    throw new ServerError(error);
  }
};

export const CreateStockOut = async (data: StockOut[]) => {
  try {
    if (data?.length) {
      data.forEach(
        async (item: StockOut) =>
          await UpdateApparatusQuantity(item.apparatus_id, item.quantity, false)
      );
      return await prismaClient.stockOut.createMany({
        data,
        skipDuplicates: true,
      });
    }
    return null;
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetStockPaginate = async (
  keywords: string,
  page: number,
  offset: number,
  pageSize: number
) => {
  try {
    const stockIn = await prismaClient.stock.findMany({
      ...PaginationWithSingleRelation({
        keywords,
        relation: "user",
        searchProperty: "name",
        skip: offset,
        take: pageSize,
        orderByProperty: "id",
        orderBy: "asc",
      }),
      include: {
        stock_in: {
          include: {
            apparatus: true,
          },
        },
        stock_out: {
          include: {
            apparatus: true,
          },
        },
        user: true,
      },
    });

    const totalPages = await prismaClient.stock.count(
      CountSingleRelationQuery(keywords, "user", "name")
    );

    const data = stockIn.map((item) => ({
      ...item,
      user: item?.user ? new UserResponse(item.user) : null,
    }));
    return pagination(page, pageSize, totalPages, data);
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetStockInPaginate = async (
  keywords: string,
  page: number,
  offset: number,
  pageSize: number
) => {
  try {
    const stockIn = await prismaClient.stockIn.findMany({
      ...PaginationWithSingleRelation({
        keywords,
        relation: "apparatus",
        searchProperty: "apparatus_name",
        skip: offset,
        take: pageSize,
        orderByProperty: "id",
        orderBy: "asc",
      }),
      include: {
        apparatus: true,
        stock: {
          include: {
            user: true,
          },
        },
      },
    });

    const totalPages = await prismaClient.stockIn.count(
      CountSingleRelationQuery(keywords, "apparatus", "apparatus_name")
    );
    return pagination(page, pageSize, totalPages, stockIn);
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetStockOutPaginate = async (
  keywords: string,
  page: number,
  offset: number,
  pageSize: number
) => {
  try {
    const stockIn = await prismaClient.stockOut.findMany({
      ...PaginationWithSingleRelation({
        keywords,
        relation: "apparatus",
        searchProperty: "apparatus_name",
        skip: offset,
        take: pageSize,
        orderByProperty: "id",
        orderBy: "asc",
      }),
      include: {
        test: true,
        apparatus: true,
      },
    });

    const totalPages = await prismaClient.stockOut.count(
      CountSingleRelationQuery(keywords, "apparatus", "apparatus_name")
    );
    return pagination(page, pageSize, totalPages, stockIn);
  } catch (error) {
    throw new ServerError(error);
  }
};
