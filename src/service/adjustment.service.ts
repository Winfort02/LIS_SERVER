import { AdjustmentType, Apparatus, StockAdjustment } from "@prisma/client";
import {
  GetApparatusDetail,
  UpdateApparatusQuantity,
} from "./apparatus.service";
import { BadRequest, NotFound, ServerError } from "../exceptions/request";
import { ErrorCode } from "../exceptions/generic";
import { prismaClient } from "..";
import {
  CountSingleRelationQuery,
  pagination,
  PaginationWithSingleRelation,
} from "../helpers/common";

const CheckCurrentAdjustment = async (id: number, data: StockAdjustment) => {
  const currentadjustment = await prismaClient.stockAdjustment.findUnique({
    where: { id },
  });
  if (currentadjustment) {
    if (currentadjustment.apparatus_id !== data.apparatus_id) {
      await UpdateApparatusQuantity(
        currentadjustment.apparatus_id,
        currentadjustment.quantity,
        currentadjustment.type === AdjustmentType.DECREASE
      );
    } else {
      if (data.type === AdjustmentType.INCREASE) {
        await UpdateApparatusQuantity(
          currentadjustment.apparatus_id,
          currentadjustment.quantity,
          false
        );
      }

      if (data.type === AdjustmentType.DECREASE) {
        await UpdateApparatusQuantity(
          currentadjustment.apparatus_id,
          currentadjustment.quantity
        );
      }
    }
    return true;
  } else {
    return false;
  }
};

const updateApparatus = async (apparatus: Apparatus, data: StockAdjustment) => {
  switch (data.type) {
    case AdjustmentType.DECREASE:
      if (apparatus && apparatus.quantity > data.quantity) {
        await UpdateApparatusQuantity(data.apparatus_id, data.quantity, false);
      } else {
        throw new BadRequest(
          "Unable to reduce quantity more than current quantity",
          ErrorCode.BAD_REQUEST
        );
      }
      break;
    case AdjustmentType.INCREASE:
      await UpdateApparatusQuantity(data.apparatus_id, data.quantity);
      break;
  }
};

export const CreateAdjustment = async (data: StockAdjustment) => {
  try {
    const apparatus = await GetApparatusDetail(data.apparatus_id);
    if (!apparatus) {
      throw new NotFound("Apparatus not found", ErrorCode.NOT_FOUND);
    }
    await updateApparatus(apparatus, data);
    return await prismaClient.stockAdjustment.create({ data });
  } catch (error) {
    throw new ServerError(error);
  }
};

export const UpdateAdjustment = async (id: number, data: StockAdjustment) => {
  try {
    const hasAdjusment = await CheckCurrentAdjustment(id, data);
    if (hasAdjusment) {
      const apparatus = await GetApparatusDetail(data.apparatus_id);
      if (!apparatus) {
        throw new NotFound("Apparatus not found", ErrorCode.NOT_FOUND);
      }
      await updateApparatus(apparatus, data);
    } else {
      throw new NotFound(
        "Adjustment item not found please try again!",
        ErrorCode.NOT_FOUND
      );
    }
    return await prismaClient.stockAdjustment.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetAllAdjustment = async (
  keywords: string,
  page: number,
  offset: number,
  pageSize: number
) => {
  try {
    const test = await prismaClient.stockAdjustment.findMany({
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
    const totalPages = await prismaClient.stockAdjustment.count(
      CountSingleRelationQuery(keywords, "apparatus", "apparatus_name")
    );
    return pagination(page, pageSize, totalPages, test);
  } catch (error) {
    throw new ServerError(error);
  }
};

export const DeleteAdjustment = async (id: number) => {
  try {
    const adjustment = await prismaClient.stockAdjustment.findUnique({
      where: { id },
    });
    if (adjustment) {
      await UpdateApparatusQuantity(
        adjustment.apparatus_id,
        adjustment.quantity,
        adjustment.type === AdjustmentType.DECREASE
      );
    } else {
      throw new NotFound("Adjustment item not found", ErrorCode.BAD_REQUEST);
    }
    return await prismaClient.stockAdjustment.delete({ where: { id } });
  } catch (error) {
    throw new ServerError(error);
  }
};
