import { prismaClient } from "..";
import { ServerError } from "../exceptions/request";

export const CountStats = async () => {
  try {
    const staff = await prismaClient.user.count({ where: { role: "USER" } });
    const patient = await prismaClient.patient.count();
    const apparatus = await prismaClient.apparatus.count({
      where: { status: true },
    });
    const test = await prismaClient.test.count();
    return { staff, patient, apparatus, test };
  } catch (error) {
    throw new ServerError(error);
  }
};
