import { Router } from "express";
import { AuthenticationMiddleWare } from "../middlewares/authentication";
import { ControllerHandler } from "../helpers/controller-handler";
import { GenerateHematologyPDF } from "../controllers/report-controller";

const reportRouter: Router = Router();

reportRouter.get(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(GenerateHematologyPDF)
);

export default reportRouter;
