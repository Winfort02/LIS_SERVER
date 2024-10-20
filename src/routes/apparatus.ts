import { Router } from "express";
import { AuthenticationMiddleWare } from "../middlewares/authentication";
import { ControllerHandler } from "../helpers/controller-handler";
import {
  CreateApparatusAsync,
  GetApparatusDetailAsync,
  GetApparatusListAsync,
  GetApparatusListPaginationAsync,
  UpdateApparatusAsync,
} from "../controllers/apparatus-controller";

const apparatusRouter: Router = Router();
apparatusRouter.get(
  "/",
  [AuthenticationMiddleWare],
  ControllerHandler(GetApparatusListPaginationAsync)
);
apparatusRouter.get(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(GetApparatusDetailAsync)
);
apparatusRouter.get(
  "/list/active",
  [AuthenticationMiddleWare],
  ControllerHandler(GetApparatusListAsync)
);
apparatusRouter.post(
  "/",
  [AuthenticationMiddleWare],
  ControllerHandler(CreateApparatusAsync)
);
apparatusRouter.put(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(UpdateApparatusAsync)
);

export default apparatusRouter;
