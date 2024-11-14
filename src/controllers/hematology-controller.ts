import { Request, Response } from "express";
import { hemotologySchema } from "../schema/schema";
import { HematologyRequest, PaginationRequest } from "../helpers/request";
import { prismaClient } from "..";
import { Mapper, SuccessReponse } from "../helpers/response";
import { ErrorCode, SuccessCode } from "../exceptions/generic";
import {
  CountSingleRelationQuery,
  pagination,
  PaginationWithSingleRelation,
} from "../helpers/common";
import { NotFound } from "../exceptions/request";
import { HematologyErrorMessage } from "../helpers/error-messages";
import { Hematology } from "@prisma/client";

const mapper = new Mapper();

/**
 * Method to create test order of the hematology
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const CreateHematology = async (req: Request, res: Response) => {
  hemotologySchema.parse(req.body);
  const request = HematologyRequest(req);
  const hematology = await prismaClient.hematology.create({ data: request });
  const data = mapper.SingleHematologyResponse(hematology);
  return res.json(new SuccessReponse(data, SuccessCode.CREATED, true));
};

/**
 * Method to update hematology detail
 * @param req
 * @param res
 * @returns JSON Response Object
 */
export const UpdateHematology = async (req: Request, res: Response) => {
  hemotologySchema.parse(req.body);
  const id = parseInt(req.params.id);
  const request = HematologyRequest(req);
  const hematology = await prismaClient.hematology.update({
    where: { id },
    data: request,
  });
  const data = mapper.SingleHematologyResponse(hematology);
  return res.json(new SuccessReponse(data, SuccessCode.UPDATED, true));
};

/**
 * Method to delete hematology
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
  const { page, pageSize, keywords, offset } = PaginationRequest(req);
  const hemotology: Hematology[] = await prismaClient.hematology.findMany({
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
  const totalPages = await prismaClient.hematology.count(
    CountSingleRelationQuery(keywords, "test", "transaction_number")
  );
  const paginate = pagination(
    page,
    pageSize,
    totalPages,
    mapper.hemotologyResponse(hemotology)
  );
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
  const hematology = await prismaClient.hematology.findUnique({
    where: { id },
    include: {
      test: true,
    },
  });
  if (!hematology) {
    throw new NotFound(HematologyErrorMessage.notFound, ErrorCode.NOT_FOUND);
  }
  const data = mapper.SingleHematologyResponse(hematology);
  return res.json(new SuccessReponse(data, SuccessCode.OK, true));
};
