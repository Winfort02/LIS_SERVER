import { Router } from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import patientRouter from "./patient";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/users", userRoutes);
rootRouter.use("/patient", patientRouter);

export default rootRouter;
