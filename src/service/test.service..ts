import { Test } from "@prisma/client";
import { prismaClient } from "..";
import { ServerError } from "../exceptions/request";
import {
  CountQuery,
  CountSingleRelationQuery,
  IReportForm,
  pagination,
  PaginationQueryById,
  PaginationWithSingleRelation,
} from "../helpers/common";
import moment from "moment";

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
        urinalysis: true,
        chemistry: true,
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
    const chemistry = await prismaClient.chemistry.findUnique({
      where: { test_id: id },
    });
    switch (testType) {
      case "hematology":
      case "urinalysis":
      case "chemistry":
        if (hematology) return false;
        if (urinalysis) return false;
        if (chemistry) return false;
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
    const test = await prismaClient.test.findMany({
      ...PaginationWithSingleRelation({
        keywords,
        relation: "patient",
        searchProperty: "last_name",
        skip: offset,
        take: pageSize,
        orderByProperty: "id",
        orderBy: "desc",
      }),
      include: {
        patient: true,
        hematology: true,
        urinalysis: true,
        chemistry: true,
      },
    });
    const totalPages = await prismaClient.test.count(
      CountSingleRelationQuery(keywords, "patient", "last_name")
    );
    return pagination(page, pageSize, totalPages, test);
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetPatientTest = async (
  patient_id: number,
  keywords: string,
  page: number,
  offset: number,
  pageSize: number
) => {
  try {
    const test = await prismaClient.test.findMany({
      ...PaginationQueryById(
        keywords,
        "transaction_number",
        offset,
        pageSize,
        "transaction_number",
        "desc",
        "patient_id",
        patient_id
      ),
      include: {
        hematology: true,
        urinalysis: true,
      },
    });
    const totalPages = await prismaClient.test.count(
      CountQuery(keywords, "transaction_number")
    );
    return pagination(page, pageSize, totalPages, test);
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetAllTest = async () => {
  try {
    return await prismaClient.test.findMany({
      include: {
        patient: true,
      },
    });
  } catch (error) {
    throw new ServerError(error);
  }
};

const dateConvert = (d: Date) => {
  return moment(d).add(8, "hours").format("YYYY-MM-DD hh:mm:ss");
};

export const GenerateTestReport = async (request: IReportForm) => {
  try {
    let whereCondition = {
      createdAt: {
        gte: moment(dateConvert(request.dateFrom)).startOf("day").toDate(),
        lt: moment(dateConvert(request.dateTo)).endOf("day").toDate(),
      },
    } as any;

    if (request.patient_id && request.type !== "Select-all") {
      whereCondition = {
        ...whereCondition,
        patient_id: request.patient_id,
        type: request.type,
      };
    }

    if (!request.patient_id && request.type !== "Select-all") {
      whereCondition = {
        ...whereCondition,
        type: request.type,
      };
    }

    if (request.type === "Select-all" && request.patient_id) {
      whereCondition = {
        patient_id: request.patient_id,
        ...whereCondition,
      };
    }

    return await prismaClient.test.findMany({
      where: whereCondition,
      include: {
        patient: true,
      },
    });
  } catch (error) {
    throw new ServerError(error);
  }
};
