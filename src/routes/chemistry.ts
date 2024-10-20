import { Router } from "express";
import { AuthenticationMiddleWare } from "../middlewares/authentication";
import { ControllerHandler } from "../helpers/controller-handler";
import {
  CreateChemistryTest,
  GetChemistryTest,
  GetChemistryTestList,
  UpdateChemistryTest,
} from "../controllers/chemistry-controller";

const chemistryRouter: Router = Router();

chemistryRouter.get(
  "/",
  [AuthenticationMiddleWare],
  ControllerHandler(GetChemistryTestList)
);

chemistryRouter.get(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(GetChemistryTest)
);

chemistryRouter.post(
  "/",
  [AuthenticationMiddleWare],
  ControllerHandler(CreateChemistryTest)
);

chemistryRouter.put(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(UpdateChemistryTest)
);

export default chemistryRouter;
