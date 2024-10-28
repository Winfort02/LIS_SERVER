import { Router } from "express";
import { AuthenticationMiddleWare } from "../middlewares/authentication";
import { ControllerHandler } from "../helpers/controller-handler";
import { GetStatsAsync } from "../controllers/dashboard-controller";

const dashboardRouter = Router();

dashboardRouter.get(
  "/",
  [AuthenticationMiddleWare],
  ControllerHandler(GetStatsAsync)
);

export default dashboardRouter;
