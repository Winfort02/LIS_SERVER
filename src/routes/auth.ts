import { Router } from "express";
import { login, signUp } from "../controllers/authentication";
import { ControllerHandler } from "../helpers/controller-handler";

const authRoutes: Router = Router();

authRoutes.post("/login", ControllerHandler(login));
authRoutes.post("/sign-up", ControllerHandler(signUp));

export default authRoutes;
