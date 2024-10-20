import { Router } from "express";
import { AuthenticationMiddleWare } from "../middlewares/authentication";
import { ControllerHandler } from "../helpers/controller-handler";
import {
  CreateStockInAsync,
  CreateStockOutAsync,
  GetStockInPaginateAsync,
  GetStockOutPaginateAsync,
  GetStockPaginateAsync,
} from "../controllers/stock-controller";

const stockRouter = Router();

stockRouter.post(
  "/stock-in",
  [AuthenticationMiddleWare],
  ControllerHandler(CreateStockInAsync)
);

stockRouter.get(
  "/stock-in",
  [AuthenticationMiddleWare],
  ControllerHandler(GetStockPaginateAsync)
);

stockRouter.post(
  "/stock-out",
  [AuthenticationMiddleWare],
  ControllerHandler(CreateStockOutAsync)
);

stockRouter.get(
  "/stock-in/paginate",
  [AuthenticationMiddleWare],
  ControllerHandler(GetStockInPaginateAsync)
);

stockRouter.get(
  "/stock-out/paginate",
  [AuthenticationMiddleWare],
  ControllerHandler(GetStockOutPaginateAsync)
);

export default stockRouter;
