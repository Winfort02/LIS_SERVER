import { Router } from "express";
import { AuthenticationMiddleWare } from "../middlewares/authentication";
import { ControllerHandler } from "../helpers/controller-handler";
import {
  CreateExpiredStockAsync,
  DeleteExpiredItemAsync,
  GetExpiredItemsAsync,
  UpdateExpiredItemAsync,
} from "../controllers/expire-stock-controller";

const expiredStockRouter: Router = Router();

expiredStockRouter.post(
  "/",
  [AuthenticationMiddleWare],
  ControllerHandler(CreateExpiredStockAsync)
);

expiredStockRouter.get(
  "/",
  [AuthenticationMiddleWare],
  ControllerHandler(GetExpiredItemsAsync)
);

expiredStockRouter.put(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(UpdateExpiredItemAsync)
);

expiredStockRouter.delete(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(DeleteExpiredItemAsync)
);

export default expiredStockRouter;
