import { Request, Response } from "express";
import {
  PaginationRequest,
  stockInRequest,
  stockOutRequest,
} from "../helpers/request";
import {
  CreateStock,
  CreateStockIn,
  CreateStockOut,
  GetStockInPaginate,
  GetStockOutPaginate,
  GetStockPaginate,
} from "../service/stock.service";
import { SuccessReponse } from "../helpers/response";
import { ErrorCode, SuccessCode } from "../exceptions/generic";
import { StockIn, StockOut } from "@prisma/client";
import { BadRequest } from "../exceptions/request";

/**
 * Method to create stockin and update the apparatus quantity
 * @param req
 * @param res
 * @returns Object type of stock in
 */
export const CreateStockInAsync = async (req: Request, res: Response) => {
  const { stock, stockIn } = stockInRequest(req);
  if (!stockIn.length)
    throw new BadRequest("No Items found", ErrorCode.BAD_REQUEST);
  const createStockIn = await CreateStock(stock);
  if (createStockIn) {
    const items = stockIn.map((item: StockIn) => ({
      ...item,
      stock_id: createStockIn.id,
    }));
    await CreateStockIn(items);
  }
  return res.json(new SuccessReponse(createStockIn, SuccessCode.OK, true));
};

export const CreateStockOutAsync = async (req: Request, res: Response) => {
  const { stock, stockOut } = stockOutRequest(req);
  if (!stockOut.length)
    throw new BadRequest("No Items found", ErrorCode.BAD_REQUEST);
  const createStockOut = await CreateStock(stock);
  if (createStockOut) {
    const items = stockOut.map((item: StockOut) => ({
      ...item,
      stock_id: createStockOut.id,
    }));
    await CreateStockOut(items);
  }
  return res.json(new SuccessReponse(createStockOut, SuccessCode.OK, true));
};

/**
 * Method to get all stocks
 * @param req
 * @param res
 * @returns List of Stock
 */
export const GetStockPaginateAsync = async (req: Request, res: Response) => {
  const { page, pageSize, keywords, offset } = PaginationRequest(req);
  const stockIn = await GetStockPaginate(keywords, page, offset, pageSize);
  return res.json(new SuccessReponse(stockIn, SuccessCode.OK, true));
};

/**
 * Method to get all stocks
 * @param req
 * @param res
 * @returns List of Stock
 */
export const GetStockInPaginateAsync = async (req: Request, res: Response) => {
  const { page, pageSize, keywords, offset } = PaginationRequest(req);
  const stockIn = await GetStockInPaginate(keywords, page, offset, pageSize);
  return res.json(new SuccessReponse(stockIn, SuccessCode.OK, true));
};

/**
 * Method to get all stocks
 * @param req
 * @param res
 * @returns List of Stock
 */
export const GetStockOutPaginateAsync = async (req: Request, res: Response) => {
  const { page, pageSize, keywords, offset } = PaginationRequest(req);
  const stockIn = await GetStockOutPaginate(keywords, page, offset, pageSize);
  return res.json(new SuccessReponse(stockIn, SuccessCode.OK, true));
};
