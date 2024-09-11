import { Router } from "express";
import { AuthenticationMiddleWare } from "../middlewares/authentication";
import { ControllerHandler } from "../helpers/controller-handler";
import {
  GenerateHematologyPDF,
  GenerateUrinalysisPDF,
} from "../controllers/report-controller";

const reportRouter: Router = Router();

reportRouter.get(
  "/hematogoly/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(GenerateHematologyPDF)
);

reportRouter.get(
  "/urinalysis/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(GenerateUrinalysisPDF)
);

export default reportRouter;
