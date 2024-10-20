import { Request, Response } from "express";
import { ApparatusSchema } from "../schema/schema";
import { PaginationRequest, productRequest } from "../helpers/request";
import {
  CreateApparatus,
  GetActiveApparatus,
  GetApparatusDetail,
  GetApparatusPaginate,
  UpdateApparatus,
} from "../service/apparatus.service";
import { SuccessReponse } from "../helpers/response";
import { ErrorCode, SuccessCode } from "../exceptions/generic";
import { NotFound } from "../exceptions/request";
import { ChemistryErrorMessage } from "../helpers/error-messages";

/**
 * Method to create new apparatus
 * @param req
 * @param res
 * @returns response Object type of apparatus
 */
export const CreateApparatusAsync = async (req: Request, res: Response) => {
  ApparatusSchema.parse(req.body);
  const data = productRequest(req);
  const appratus = await CreateApparatus(data);
  return res.json(new SuccessReponse(appratus, SuccessCode.CREATED, true));
};

/**
 * Method to update apparatus
 * @param req
 * @param res
 * @returns response Object type of apparatus
 */
export const UpdateApparatusAsync = async (req: Request, res: Response) => {
  ApparatusSchema.parse(req.body);
  const id = parseInt(req.params.id, 10);
  const data = productRequest(req);
  const appratus = await UpdateApparatus(id, data);
  return res.json(new SuccessReponse(appratus, SuccessCode.UPDATED, true));
};

/**
 * Method to get apparatus detail
 * @param req
 * @param res
 * @returns response Object type of apparatus
 */
export const GetApparatusDetailAsync = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const appratus = await GetApparatusDetail(id);
  if (!appratus) {
    throw new NotFound(ChemistryErrorMessage.NotFound, ErrorCode.NOT_FOUND);
  }
  return res.json(new SuccessReponse(appratus, SuccessCode.OK, true));
};

/**
 * Method to get apparatus list with pagination
 * @param req
 * @param res
 * @returns response array type of apparatus
 */
export const GetApparatusListPaginationAsync = async (
  req: Request,
  res: Response
) => {
  const { page, pageSize, keywords, offset } = PaginationRequest(req);
  const appratusList = await GetApparatusPaginate(
    keywords,
    page,
    offset,
    pageSize
  );
  return res.json(new SuccessReponse(appratusList, SuccessCode.OK, true));
};

/**
 * Method to get all active apparatus
 * @param req
 * @param res
 * @returns response Object type of apparatus
 */
export const GetApparatusListAsync = async (req: Request, res: Response) => {
  const appratus = await GetActiveApparatus();
  return res.json(new SuccessReponse(appratus, SuccessCode.OK, true));
};
