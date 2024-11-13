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

export const CountLaboratoyTest = async (date: Date) => {
  try {
    const year = date.getFullYear();
    const tests = await prismaClient.test.groupBy({
      by: ["type", "createdAt"],
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01`), // Start of the year
          lt: new Date(`${year + 1}-01-01`), // Start of the next year
        },
      },
      _count: {
        id: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return generateChartData(tests);
  } catch (error) {
    throw new ServerError(error);
  }
};

export const SumStockQuantity = async () => {
  try {
    const incoming = (await GetTotalIncoming())._sum.quantity || 0;
    const outgoing = (await GetTotalOutgoing())._sum.quantity || 0;
    const expired = (await GetTotalExpired())._sum.quantity || 0;
    const adjustment = (await GetTotalAdjustment())._sum.quantity || 0;
    const overall = incoming + outgoing + expired + adjustment;

    return [
      getPercentage(incoming, overall),
      getPercentage(outgoing, overall),
      getPercentage(expired, overall),
      getPercentage(adjustment, overall),
    ];
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetLatestTransaction = async () => {
  try {
    return await prismaClient.test.findMany({
      take: 10,
      include: {
        patient: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    throw new ServerError(error);
  }
};

export const GetLowQuantityApparatus = async () => {
  try {
    return await prismaClient.apparatus.findMany({
      take: 10,
      where: {
        quantity: {
          lte: 10,
        },
      },
    });
  } catch (error) {
    throw new ServerError(error);
  }
};

const getPercentage = (count: number, total: number): number => {
  if (total === 0) {
    return 0; // Handle division by zero
  }

  const percentage = (count / total) * 100;
  const formattedPercentage = percentage.toFixed(2); // Limit to 2 decimal places

  return parseFloat(formattedPercentage) % 1 === 0
    ? Math.round(percentage) // Convert to whole number if .00
    : parseFloat(formattedPercentage); // Return formatted percentage
};

const GetTotalIncoming = async () =>
  await prismaClient.stockIn.aggregate({
    _sum: { quantity: true },
  });

const GetTotalOutgoing = async () =>
  await prismaClient.stockOut.aggregate({
    _sum: { quantity: true },
  });

const GetTotalExpired = async () =>
  await prismaClient.stockExpired.aggregate({
    _sum: { quantity: true },
  });

const GetTotalAdjustment = async () =>
  await prismaClient.stockAdjustment.aggregate({
    _sum: { quantity: true },
  });

const generateChartData = (result: any[]) => {
  const dataset: any[] = [];
  const count: any = {
    Chemistry: new Array(12).fill(0),
    Hematology: new Array(12).fill(0),
    Urinalysis: new Array(12).fill(0),
  };
  result.forEach((res) => {
    const month = new Date(res.createdAt).getMonth();
    const type = res.type;
    if (count[type]) {
      count[type][month] += res._count.id;
    }
  });

  for (const [label, data] of Object.entries(count)) {
    dataset.push({ label, data });
  }
  return dataset;
};
