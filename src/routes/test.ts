import { Router } from "express";
import { AuthenticationMiddleWare } from "../middlewares/authentication";
import { ControllerHandler } from "../helpers/controller-handler";
import {
  CreateTest,
  DeletteTest,
  GetPatientTestHistory,
  GetTestById,
  GetTestByTransactionNo,
  GetTestRecords,
  UpdateTest,
} from "../controllers/test-controller";

const testRouter: Router = Router();

testRouter.post("/", [AuthenticationMiddleWare], ControllerHandler(CreateTest));

testRouter.get(
  "/",
  [AuthenticationMiddleWare],
  ControllerHandler(GetTestRecords)
);

testRouter.get(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(GetTestById)
);

testRouter.get(
  "/transaction/:transaction_number",
  [AuthenticationMiddleWare],
  ControllerHandler(GetTestByTransactionNo)
);

testRouter.get(
  "/test-history/:patient_id",
  [AuthenticationMiddleWare],
  ControllerHandler(GetPatientTestHistory)
);

testRouter.put(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(UpdateTest)
);

testRouter.delete(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(DeletteTest)
);

export default testRouter;
