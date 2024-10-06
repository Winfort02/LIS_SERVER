import { Test } from "@prisma/client";
import { prismaClient } from "..";
import { ServerError } from "../exceptions/request";
import {
  CountSingleRelationQuery,
  pagination,
  PaginationWithSingleRelation,
} from "../helpers/common";

export const GenerateTransactionNo = async () => {
  try {
    const lastTranscationNo = await prismaClient.test.count();
    return `TN${String(lastTranscationNo + 1).padStart(8, "0")}`;
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetTransactionNoDetails = async (transactionNo: string) => {
  try {
    return await prismaClient.test.findUnique({
      where: { transaction_number: transactionNo },
      include: {
        patient: true,
        hematology: true,
      },
    });
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetTestDetail = async (id: number, include: string) => {
  try {
    return await prismaClient.test.findUnique({
      where: { id },
      include: {
        [include]: true,
      },
    });
  } catch (error) {
    throw new ServerError(error);
  }
};

export const CreateTestRecord = async (data: Test) => {
  try {
    return await prismaClient.test.create({ data });
  } catch (error) {
    throw new ServerError(error);
  }
};

export const UpdateTestRecord = async (id: number, data: Test) => {
  try {
    return await prismaClient.test.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw new ServerError(error);
  }
};

export const ValidateTestRecord = async (id: number, type: string) => {
  try {
    const testType = type.trim().toLowerCase();
    if (testType == null || !testType.length) return false;
    const hematology = await prismaClient.hematology.findUnique({
      where: { test_id: id },
    });
    const urinalysis = await prismaClient.urinalysis.findUnique({
      where: { test_id: id },
    });
    switch (testType) {
      case "hematology":
        if (hematology) return false;
        if (urinalysis) return false;
        return true;
      case "urinalysis":
        if (hematology) return false;
        if (urinalysis) return false;
        return true;
    }
    return false;
  } catch (error) {
    throw new ServerError(error);
  }
};

export const DeleteTestRecord = async (id: number) => {
  try {
    await prismaClient.test.delete({ where: { id } });
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetTestPaginate = async (
  keywords: string,
  page: number,
  offset: number,
  pageSize: number
) => {
  try {
    const test = await prismaClient.test.findMany(
      PaginationWithSingleRelation({
        keywords,
        relation: "patient",
        searchProperty: "last_name",
        skip: offset,
        take: pageSize,
        orderByProperty: "id",
        orderBy: "asc",
      })
    );
    const totalPages = await prismaClient.test.count(
      CountSingleRelationQuery(keywords, "patient", "last_name")
    );
    return pagination(page, pageSize, totalPages, test);
  } catch (error) {
    throw new ServerError(error);
  }
};