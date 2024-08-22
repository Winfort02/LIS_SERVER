import { Request, Response } from "express";
import { hemotologySchema } from "../schema/schema";
import { HematologyRequest } from "../helpers/request";
import { prismaClient } from "..";
import { SuccessReponse } from "../helpers/response";
import { ErrorCode, SuccessCode } from "../exceptions/generic";
import {
  CountSingleRelationQuery,
  pagination,
  PaginationWithSingleRelation,
} from "../helpers/common";
import { NotFound } from "../exceptions/request";
import { TestErrorMessage } from "../helpers/error-messages";
import { Hematology } from "@prisma/client";

/**
 * Method to create test order of the patient
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const CreateHematology = async (req: Request, res: Response) => {
  hemotologySchema.parse(req.body);
  const request = HematologyRequest(req);
  const testOrder = await prismaClient.hematology.create({
    data: request,
  });
  return res.json(new SuccessReponse(testOrder, SuccessCode.CREATED, true));
};

/**
 * Method to test order detail
 * @param req
 * @param res
 * @returns JSON Response Object
 */
export const UpdateHematology = async (req: Request, res: Response) => {
  hemotologySchema.parse(req.body);
  const id = parseInt(req.params.id);
  const request = HematologyRequest(req);
  const testOrder = await prismaClient.hematology.update({
    where: { id },
    data: request,
  });
  return res.json(new SuccessReponse(testOrder, SuccessCode.UPDATED, true));
};

/**
 * Method to delete test order
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const DeleteHematology = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await prismaClient.hematology.delete({ where: { id } });
  return res.json(new SuccessReponse(null, SuccessCode.NO_CONTENT, true));
};

/**
 * Method to get all patients records in database
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const GetAllHematology = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.size as string) || 25;
  const keywords = (req.query.keywords as string) || "";
  const offset = (page - 1) * pageSize;
  const testOrder: Hematology[] = await prismaClient.hematology.findMany(
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
  const totalPages = await prismaClient.hematology.count(
    CountSingleRelationQuery(keywords, "patient", "last_name")
  );
  const paginate = pagination(page, pageSize, totalPages, testOrder);
  return res.json(new SuccessReponse(paginate, SuccessCode.OK, true));
};

/**
 * Method to get patient detail in database
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const GetHematologyById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const testOrder = await prismaClient.hematology.findUnique({
    where: { id },
    include: {
      patient: true,
    },
  });
  if (!testOrder) {
    throw new NotFound(TestErrorMessage.notFound, ErrorCode.NOT_FOUND);
  }
  return res.json(new SuccessReponse(testOrder, SuccessCode.OK, true));
};
