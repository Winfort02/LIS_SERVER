import { Router } from "express";
import { AuthenticationMiddleWare } from "../middlewares/authentication";
import { ControllerHandler } from "../helpers/controller-handler";
import {
  GenerateChemistryPDF,
  GenerateHematologyPDF,
  GenerateTestReportAsync,
  GenerateUrinalysisPDF,
} from "../controllers/report-controller";

const reportRouter: Router = Router();

reportRouter.get(
  "/hematology/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(GenerateHematologyPDF)
);

reportRouter.get(
  "/urinalysis/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(GenerateUrinalysisPDF)
);

reportRouter.get(
  "/chemistry/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(GenerateChemistryPDF)
);

reportRouter.post(
  "/test-report",
  [AuthenticationMiddleWare],
  ControllerHandler(GenerateTestReportAsync)
);

export default reportRouter;
