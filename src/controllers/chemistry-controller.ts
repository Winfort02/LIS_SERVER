import { Request, Response } from "express";
import { ChemistryRequest, PaginationRequest } from "../helpers/request";
import {
  CreateChemistry,
  GetChemistryDetail,
  GetChemistryPaginate,
  UpdateChemistry,
} from "../service/chemistry.service";
import { SuccessReponse } from "../helpers/response";
import { ErrorCode, SuccessCode } from "../exceptions/generic";
import { NotFound } from "../exceptions/request";
import { ChemistryErrorMessage } from "../helpers/error-messages";
import { ChemistrySchema } from "../schema/schema";

/**
 * Method to get list of chemistry test
 * @param req
 * @param res
 * @returns JSON Response object - pagination
 */
export const GetChemistryTestList = async (req: Request, res: Response) => {
  const { page, pageSize, keywords, offset } = PaginationRequest(req);
  const chemistryList = await GetChemistryPaginate(
    keywords,
    page,
    offset,
    pageSize
  );
  return res.json(new SuccessReponse(chemistryList, SuccessCode.OK, true));
};

/**
 * Method to get chemistry details
 * @param req
 * @param res
 * @returns JSON Response object - chemistry
 */
export const GetChemistryTest = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const chemistry = await GetChemistryDetail(id);
  if (!chemistry) {
    throw new NotFound(ChemistryErrorMessage.NotFound, ErrorCode.NOT_FOUND);
  }
  return res.json(new SuccessReponse(chemistry, SuccessCode.OK, true));
};

/**
 * Method to create chemistry test
 * @param req
 * @param res
 * @returns JSON Response object - chemistry
 */
export const CreateChemistryTest = async (req: Request, res: Response) => {
  ChemistrySchema.parse(req.body);
  const data = ChemistryRequest(req);
  const chemistry = await CreateChemistry(data);
  return res.json(new SuccessReponse(chemistry, SuccessCode.CREATED, true));
};

/**
 * Method to update chemistry test
 * @param req
 * @param res
 * @returns JSON Response object - chemistry
 */
export const UpdateChemistryTest = async (req: Request, res: Response) => {
  ChemistrySchema.parse(req.body);
  const id = parseInt(req.params.id, 10);
  const data = ChemistryRequest(req);
  const chemistry = await UpdateChemistry(id, data);
  return res.json(new SuccessReponse(chemistry, SuccessCode.UPDATED, true));
};
