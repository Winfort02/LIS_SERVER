import { Router } from "express";
import { AuthenticationMiddleWare } from "../middlewares/authentication";
import { ControllerHandler } from "../helpers/controller-handler";
import {
  CreateHematology,
  DeleteHematology,
  GetAllHematology,
  GetHematologyById,
  UpdateHematology,
} from "../controllers/hematology-controller";

const hematologyRouter: Router = Router();

hematologyRouter.get(
  "/",
  [AuthenticationMiddleWare],
  ControllerHandler(GetAllHematology)
);

hematologyRouter.get(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(GetHematologyById)
);

hematologyRouter.post(
  "/",
  [AuthenticationMiddleWare],
  ControllerHandler(CreateHematology)
);

hematologyRouter.put(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(UpdateHematology)
);

hematologyRouter.delete(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(DeleteHematology)
);

export default hematologyRouter;
