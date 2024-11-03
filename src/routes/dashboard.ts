import { Router } from "express";
import { AuthenticationMiddleWare } from "../middlewares/authentication";
import { ControllerHandler } from "../helpers/controller-handler";
import {
  GenerateLaboratoryChartAsync,
  GenerateStockChartAsync,
  GetLatestTransactionAsync,
  GetLowQuantityApparatusAsync,
  GetStatsAsync,
} from "../controllers/dashboard-controller";
import { GetLowQuantityApparatus } from "../service/dashboard.service";

const dashboardRouter = Router();

dashboardRouter.get(
  "/",
  [AuthenticationMiddleWare],
  ControllerHandler(GetStatsAsync)
);
dashboardRouter.get(
  "/laboratory-chart-data",
  [AuthenticationMiddleWare],
  ControllerHandler(GenerateLaboratoryChartAsync)
);

dashboardRouter.get(
  "/stock-chart-data",
  [AuthenticationMiddleWare],
  ControllerHandler(GenerateStockChartAsync)
);

dashboardRouter.get(
  "/latest-transaction",
  [AuthenticationMiddleWare],
  ControllerHandler(GetLatestTransactionAsync)
);

dashboardRouter.get(
  "/low-quanitity-apparatus",
  [AuthenticationMiddleWare],
  ControllerHandler(GetLowQuantityApparatusAsync)
);

export default dashboardRouter;
