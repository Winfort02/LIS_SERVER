import { Router } from "express";
import {
  Login,
  SignUp,
  GetUserFromToken,
  ChangePassword,
} from "../controllers/authentication";
import { ControllerHandler } from "../helpers/controller-handler";
import { AuthenticationMiddleWare } from "../middlewares/authentication";

const authRoutes: Router = Router();

authRoutes.post("/login", ControllerHandler(Login));
authRoutes.post(
  "/sign-up",
  [AuthenticationMiddleWare],
  ControllerHandler(SignUp)
);
authRoutes.get(
  "/get-login-user",
  [AuthenticationMiddleWare],
  ControllerHandler(GetUserFromToken)
);
authRoutes.put(
  "/change-password",
  [AuthenticationMiddleWare],
  ControllerHandler(ChangePassword)
);

export default authRoutes;
