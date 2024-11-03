import { Request, Response } from "express";
import { SuccessCode } from "../exceptions/generic";
import { SuccessReponse } from "../helpers/response";
import {
  CountLaboratoyTest,
  CountStats,
  GetLatestTransaction,
  GetLowQuantityApparatus,
  SumStockQuantity,
} from "../service/dashboard.service";

/**
 * Method to count all users patients test and apparatus data
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const GetStatsAsync = async (req: Request, res: Response) => {
  const count = await CountStats();
  return res.json(new SuccessReponse(count, SuccessCode.OK, true));
};

/**
 * Method to generate laboratory chart data
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const GenerateLaboratoryChartAsync = async (
  req: Request,
  res: Response
) => {
  const date = new Date(req.query.currentDate as string);
  const response = await CountLaboratoyTest(date);
  return res.json(new SuccessReponse(response, SuccessCode.OK, true));
};

/**
 * Method to generate stock chart data
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const GenerateStockChartAsync = async (req: Request, res: Response) => {
  const response = await SumStockQuantity();
  return res.json(new SuccessReponse(response, SuccessCode.OK, true));
};

export const GetLatestTransactionAsync = async (
  req: Request,
  res: Response
) => {
  const response = await GetLatestTransaction();
  return res.json(new SuccessReponse(response, SuccessCode.OK, true));
};

export const GetLowQuantityApparatusAsync = async (
  req: Request,
  res: Response
) => {
  const response = await GetLowQuantityApparatus();
  return res.json(new SuccessReponse(response, SuccessCode.OK, true));
};
