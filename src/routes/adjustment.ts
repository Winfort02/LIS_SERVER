import { Router } from "express";
import { AuthenticationMiddleWare } from "../middlewares/authentication";
import { ControllerHandler } from "../helpers/controller-handler";
import {
  CreateAdjustmentAsync,
  DeleteAdjustmentAsync,
  GetAdjustmentAsync,
  UpdateAdjustmentAsync,
} from "../controllers/adjustment-controller";

const adjustmentRouter: Router = Router();

adjustmentRouter.post(
  "/",
  [AuthenticationMiddleWare],
  ControllerHandler(CreateAdjustmentAsync)
);

adjustmentRouter.put(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(UpdateAdjustmentAsync)
);

adjustmentRouter.get(
  "/",
  [AuthenticationMiddleWare],
  ControllerHandler(GetAdjustmentAsync)
);

adjustmentRouter.delete(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(DeleteAdjustmentAsync)
);

export default adjustmentRouter;
