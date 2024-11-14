import { Response, Request } from "express";
import { urinalysisSchema } from "../schema/schema";
import { UrinalysisRequest } from "../helpers/request";
import { prismaClient } from "..";
import { Mapper, SuccessReponse } from "../helpers/response";
import { ErrorCode, SuccessCode } from "../exceptions/generic";
import { Urinalysis } from "@prisma/client";
import {
  CountSingleRelationQuery,
  pagination,
  PaginationWithSingleRelation,
} from "../helpers/common";
import { UrinalysisErrorMerssage } from "../helpers/error-messages";
import { NotFound } from "../exceptions/request";

const mapper = new Mapper();

/**
 * Method to create test order of the urinalysis
 * @param req
 * @param res
 * @returns JSON Response object
 */

export const CreateUrinalysis = async (req: Request, res: Response) => {
  urinalysisSchema.parse(req.body);
  const data = UrinalysisRequest(req);
  const urinalysis = await prismaClient.urinalysis.create({ data });
  const response = mapper.SingleUrinalysisResponse(urinalysis);
  return res.json(new SuccessReponse(response, SuccessCode.CREATED, true));
};

/**
 * Method to update urinalysis detail
 * @param req
 * @param res
 * @returns JSON Response Object
 */
export const UpdateUrinalysis = async (req: Request, res: Response) => {
  urinalysisSchema.parse(req.body);
  const id = parseInt(req.params.id, 10);
  const data = UrinalysisRequest(req);
  const urinalysis = await prismaClient.urinalysis.update({
    where: { id },
    data,
  });
  const response = mapper.SingleUrinalysisResponse(urinalysis);
  return res.json(new SuccessReponse(response, SuccessCode.UPDATED, true));
};

/**
 * Method to delete urinalysis
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const DeleteUrinalysis = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await prismaClient.urinalysis.delete({ where: { id } });
  return res.json(new SuccessReponse(null, SuccessCode.NO_CONTENT, true));
};

/**
 * Method to get all urinalysis with pagination
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const GetAllUrinalysis = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.size as string) || 25;
  const keywords = (req.query.keywords as string) || "";
  const offset = (page - 1) * pageSize;
  const urinalysis: Urinalysis[] = await prismaClient.urinalysis.findMany({
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
  const totalPages = await prismaClient.urinalysis.count(
    CountSingleRelationQuery(keywords, "test", "transaction_number")
  );
  const paginate = pagination(
    page,
    pageSize,
    totalPages,
    mapper.urinalysisResponse(urinalysis)
  );
  return res.json(new SuccessReponse(paginate, SuccessCode.OK, true));
};

/**
 * Method to get urinalysis detail
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const GetUrinalysisById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const urinalysis = await prismaClient.urinalysis.findUnique({
    where: { id },
    include: {
      test: true,
    },
  });

  if (!urinalysis) {
    throw new NotFound(UrinalysisErrorMerssage.NotFound, ErrorCode.NOT_FOUND);
  }

  const data = mapper.SingleUrinalysisResponse(urinalysis);
  return res.json(new SuccessReponse(data, SuccessCode.OK, true));
};
