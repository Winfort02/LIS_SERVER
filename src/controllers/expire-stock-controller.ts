import { Request, Response } from "express";
import {
  CreateExpiredStock,
  DeleteExpireStock,
  GetAllExpiredItems,
  UpdatedExpiredItem,
} from "../service/expire-item.service";
import { SuccessReponse } from "../helpers/response";
import { SuccessCode } from "../exceptions/generic";
import { expiredStockRequest, PaginationRequest } from "../helpers/request";

/**
 * Method to create expired items
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const CreateExpiredStockAsync = async (req: Request, res: Response) => {
  // hemotologySchema.parse(req.body);
  const request = expiredStockRequest(req);
  const expiredStock = await CreateExpiredStock(request);
  return res.json(new SuccessReponse(expiredStock, SuccessCode.CREATED, true));
};

/**
 * Method to get list of expired items
 * @param req
 * @param res
 * @returns JSON Response object - pagination
 */
export const GetExpiredItemsAsync = async (req: Request, res: Response) => {
  const { page, pageSize, keywords, offset } = PaginationRequest(req);
  const expiredItems = await GetAllExpiredItems(
    keywords,
    page,
    offset,
    pageSize
  );
  return res.json(new SuccessReponse(expiredItems, SuccessCode.OK, true));
};

/**
 * Method to update expired item
 * @param req
 * @param res
 * @returns JSON Response object - chemistry
 */
export const UpdateExpiredItemAsync = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const data = expiredStockRequest(req);
  const expiredItem = await UpdatedExpiredItem(id, data);
  return res.json(new SuccessReponse(expiredItem, SuccessCode.UPDATED, true));
};

/**
 * Method to delete expired item
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const DeleteExpiredItemAsync = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await DeleteExpireStock(id);
  return res.json(new SuccessReponse(null, SuccessCode.NO_CONTENT, true));
};
