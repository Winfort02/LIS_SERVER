import { Request, Response } from "express";
import { testSchema } from "../schema/schema";
import { TestRequest } from "../helpers/request";
import { Mapper, SuccessReponse } from "../helpers/response";
import { ErrorCode, SuccessCode } from "../exceptions/generic";
import { BadRequest, NotFound } from "../exceptions/request";
import { TestErrorMessage } from "../helpers/error-messages";
import {
  CreateTestRecord,
  DeleteTestRecord,
  GetTestDetail,
  GetTestPaginate,
  GetTransactionNoDetails,
  UpdateTestRecord,
  ValidateTestRecord,
} from "../service/test.service.";
import { Hematology, Test } from "@prisma/client";

const mapper = new Mapper();

/**
 * Method to create test
 * @param req
 * @param res
 * @returns JSON Response object - pagination
 */
export const GetTestRecords = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.size as string) || 25;
  const keywords = (req.query.keywords as string) || "";
  const offset = (page - 1) * pageSize;
  const tests = await GetTestPaginate(keywords, page, offset, pageSize);
  return res.json(new SuccessReponse(tests, SuccessCode.OK, true));
};

/**
 * Method to create test
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const CreateTest = async (req: Request, res: Response) => {
  testSchema.parse(req.body);
  const request = await TestRequest(req);
  const test = await CreateTestRecord(request);
  return res.json(new SuccessReponse(test, SuccessCode.CREATED, true));
};

/**
 * Method to get test record by id
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const GetTestById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const test = await GetTestDetail(id, "patient");
  if (!test) {
    throw new NotFound(TestErrorMessage.NotFound, ErrorCode.NOT_FOUND);
  }
  return res.json(new SuccessReponse(test, SuccessCode.OK, true));
};

/**
 * Method to get test record by transaction number
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const GetTestByTransactionNo = async (req: Request, res: Response) => {
  const transactionNo = req.params?.transaction_number || "";
  const test = await GetTransactionNoDetails(transactionNo);
  if (!test) {
    throw new NotFound(
      TestErrorMessage.InvalidTransactionNo,
      ErrorCode.NOT_FOUND
    );
  }
  const response = {
    ...test,
    hematology: mapper.SingleHematologyResponse(test?.hematology as Hematology),
  };
  return res.json(new SuccessReponse(response, SuccessCode.OK, true));
};

/**
 * Method to update test record
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const UpdateTest = async (req: Request, res: Response) => {
  testSchema.parse(req.body);
  const id = parseInt(req.params.id, 10);
  const request = {
    id: req.body.id,
    patient_id: req.body.patient_id,
    type: req.body.type,
  } as Test;
  const canUpdate = await ValidateTestRecord(id, request.type);
  if (!canUpdate) {
    throw new BadRequest(
      TestErrorMessage.NotAbleToUpdate,
      ErrorCode.BAD_REQUEST
    );
  }

  const updatedTest = await UpdateTestRecord(id, request);
  return res.json(new SuccessReponse(updatedTest, SuccessCode.UPDATED, true));
};

/**
 * Method to delete test record
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const DeletteTest = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await DeleteTestRecord(id);
  return res.json(new SuccessReponse(null, SuccessCode.NO_CONTENT, true));
};
