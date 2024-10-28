import { Router } from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import patientRouter from "./patient";
import hematologyRouter from "./hematology";
import reportRouter from "./report";
import urinalysisRouter from "./urinalysis";
import testRouter from "./test";
import chemistryRouter from "./chemistry";
import apparatusRouter from "./apparatus";
import stockRouter from "./stock";
import expiredStockRouter from "./expired-stock";
import dashboardRouter from "./dashboard";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/users", userRoutes);
rootRouter.use("/patients", patientRouter);
rootRouter.use("/hematology", hematologyRouter);
rootRouter.use("/report", reportRouter);
rootRouter.use("/urinalysis", urinalysisRouter);
rootRouter.use("/tests", testRouter);
rootRouter.use("/chemistry", chemistryRouter);
rootRouter.use("/apparatus", apparatusRouter);
rootRouter.use("/stock", stockRouter);
rootRouter.use("/stock-expired", expiredStockRouter);
rootRouter.use("/dashboard", dashboardRouter);

export default rootRouter;
