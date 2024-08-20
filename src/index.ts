import express, { Express } from "express";
import { PORT } from "./secret";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { ErrorMiddleWare } from "./middlewares/errors";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["info"],
});

app.use(ErrorMiddleWare);

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
