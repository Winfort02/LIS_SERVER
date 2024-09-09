import { Router } from "express";
import { AuthenticationMiddleWare } from "../middlewares/authentication";
import { ControllerHandler } from "../helpers/controller-handler";
import {
  CreateUrinalysis,
  DeleteUrinalysis,
  GetAllUrinalysis,
  GetUrinalysisById,
  UpdateUrinalysis,
} from "../controllers/urinalysis-controller";

const urinalysisRouter: Router = Router();

urinalysisRouter.get(
  "/",
  [AuthenticationMiddleWare],
  ControllerHandler(GetAllUrinalysis)
);

urinalysisRouter.get(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(GetUrinalysisById)
);

urinalysisRouter.post(
  "/",
  [AuthenticationMiddleWare],
  ControllerHandler(CreateUrinalysis)
);

urinalysisRouter.put(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(UpdateUrinalysis)
);

urinalysisRouter.delete(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(DeleteUrinalysis)
);

export default urinalysisRouter;
