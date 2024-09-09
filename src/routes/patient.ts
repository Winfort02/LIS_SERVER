import { Router } from "express";
import { AuthenticationMiddleWare } from "../middlewares/authentication";
import { ControllerHandler } from "../helpers/controller-handler";
import {
  CreatePatient,
  DeletePatient,
  GetAllPatients,
  GetPatientDetail,
  GetPatients,
  UpdatePatient,
} from "../controllers/patient-controller";

const patientRouter: Router = Router();

patientRouter.get(
  "/",
  [AuthenticationMiddleWare],
  ControllerHandler(GetAllPatients)
);

patientRouter.get(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(GetPatientDetail)
);

patientRouter.post(
  "/",
  [AuthenticationMiddleWare],
  ControllerHandler(CreatePatient)
);

patientRouter.put(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(UpdatePatient)
);

patientRouter.delete(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(DeletePatient)
);

patientRouter.get(
  "/all/patients",
  [AuthenticationMiddleWare],
  ControllerHandler(GetPatients)
);

export default patientRouter;
