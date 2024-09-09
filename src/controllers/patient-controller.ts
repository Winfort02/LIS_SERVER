import { Request, Response } from "express";
import { prismaClient } from "..";
import { PatientRequest } from "../helpers/request";
import { SuccessReponse } from "../helpers/response";
import { ErrorCode, SuccessCode } from "../exceptions/generic";
import { patientSchema } from "../schema/schema";
import { NotFound } from "../exceptions/request";
import { PatientErrorMessage } from "../helpers/error-messages";
import { CountQuery, pagination, PaginationQuery } from "../helpers/common";

/**
 * Method to create patient record and insert into database
 * @param req
 * @param res
 * @returns JSON Response Object
 */
export const CreatePatient = async (req: Request, res: Response) => {
  patientSchema.parse(req.body);
  const request = PatientRequest(req);
  const patient = await prismaClient.patient.create({
    data: request,
  });
  return res.json(new SuccessReponse(patient, SuccessCode.CREATED, true));
};

/**
 * Method to update patient records in database
 * @param req
 * @param res
 * @returns JSON Response Object
 */
export const UpdatePatient = async (req: Request, res: Response) => {
  patientSchema.parse(req.body);
  const id = parseInt(req.params.id);
  const request = PatientRequest(req);
  const patient = await prismaClient.patient.update({
    where: { id },
    data: request,
  });
  return res.json(new SuccessReponse(patient, SuccessCode.UPDATED, true));
};

/**
 * Method to delete patient records in database
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const DeletePatient = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await prismaClient.patient.delete({ where: { id } });
  return res.json(new SuccessReponse(null, SuccessCode.NO_CONTENT, true));
};

/**
 * Method to get all patients records in database
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const GetAllPatients = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.size as string) || 25;
  const keywords = (req.query.keywords as string) || "";
  const offset = (page - 1) * pageSize;
  const patients = await prismaClient.patient.findMany(
    PaginationQuery(keywords, "last_name", offset, pageSize, "id", "asc")
  );
  const totalPages = await prismaClient.patient.count(
    CountQuery(keywords, "last_name")
  );
  const paginate = pagination(page, pageSize, totalPages, patients);
  return res.json(new SuccessReponse(paginate, SuccessCode.OK, true));
};

/**
 * Method to get patient detail in database
 * @param req
 * @param res
 * @returns JSON Response object
 */
export const GetPatientDetail = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const patient = await prismaClient.patient.findUnique({ where: { id } });
  if (!patient) {
    throw new NotFound(PatientErrorMessage.notFound, ErrorCode.NOT_FOUND);
  }
  return res.json(new SuccessReponse(patient, SuccessCode.OK, true));
};

/**
 * Method to get all patients
 * @param req
 * @param res
 * @returns JSON Response Object
 */
export const GetPatients = async (req: Request, res: Response) => {
  const patients = await prismaClient.patient.findMany();
  return res.json(new SuccessReponse(patients, SuccessCode.OK, true));
};
