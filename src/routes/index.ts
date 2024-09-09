import { Router } from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import patientRouter from "./patient";
import hematologyRouter from "./hematology";
import reportRouter from "./report";
import urinalysisRouter from "./urinalysis";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/users", userRoutes);
rootRouter.use("/patients", patientRouter);
rootRouter.use("/hematology", hematologyRouter);
rootRouter.use("/report", reportRouter);
rootRouter.use("/urinalysis", urinalysisRouter);

export default rootRouter;
