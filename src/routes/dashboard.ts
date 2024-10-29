import { Router } from "express";
import { AuthenticationMiddleWare } from "../middlewares/authentication";
import { ControllerHandler } from "../helpers/controller-handler";
import {
  GenerateLaboratoryChartAsync,
  GenerateStockChartAsync,
  GetStatsAsync,
} from "../controllers/dashboard-controller";

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

export default dashboardRouter;
