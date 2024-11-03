import { adjusmentmentRequest, PaginationRequest } from "../helpers/request";
import { Request, Response } from "express";
import {
  CreateAdjustment,
  DeleteAdjustment,
  GetAllAdjustment,
  UpdateAdjustment,
} from "../service/adjustment.service";
import { SuccessReponse } from "../helpers/response";
import { SuccessCode } from "../exceptions/generic";

/**
 * Method to create adjusment
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const CreateAdjustmentAsync = async (req: Request, res: Response) => {
  const request = adjusmentmentRequest(req);
  const adjustment = await CreateAdjustment(request);
  return res.json(new SuccessReponse(adjustment, SuccessCode.CREATED, true));
};

/**
 * Method to update adjustment
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const UpdateAdjustmentAsync = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const data = adjusmentmentRequest(req);
  const adjustment = await UpdateAdjustment(id, data);
  return res.json(new SuccessReponse(adjustment, SuccessCode.UPDATED, true));
};

/**
 * Method to get list of stock adjustments
 * @param req
 * @param res
 * @returns JSON Response object - pagination
 */
export const GetAdjustmentAsync = async (req: Request, res: Response) => {
  const { page, pageSize, keywords, offset } = PaginationRequest(req);
  const adjusments = await GetAllAdjustment(keywords, page, offset, pageSize);
  return res.json(new SuccessReponse(adjusments, SuccessCode.OK, true));
};

/**
 * Method to delete adjustment
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const DeleteAdjustmentAsync = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await DeleteAdjustment(id);
  return res.json(new SuccessReponse(null, SuccessCode.NO_CONTENT, true));
};
