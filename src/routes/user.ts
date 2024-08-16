import { Router } from "express";
import { AuthenticationMiddleWare } from "../middlewares/authentication";
import { ControllerHandler } from "../helpers/controller-handler";
import {
  DeleteUser,
  GetAllUsers,
  GetUserById,
  UpdateUser,
} from "../controllers/user-controller";

const userRoutes: Router = Router();

userRoutes.get("/", [AuthenticationMiddleWare], ControllerHandler(GetAllUsers));
userRoutes.get(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(GetUserById)
);
userRoutes.put(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(UpdateUser)
);
userRoutes.delete(
  "/:id",
  [AuthenticationMiddleWare],
  ControllerHandler(DeleteUser)
);

export default userRoutes;
