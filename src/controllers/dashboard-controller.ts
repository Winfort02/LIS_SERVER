import { Request, Response } from "express";
import { SuccessCode } from "../exceptions/generic";
import { SuccessReponse } from "../helpers/response";
import { CountStats } from "../service/dashboard.service";

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
