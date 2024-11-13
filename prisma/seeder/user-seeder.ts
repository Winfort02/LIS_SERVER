import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";
import { ServerError } from "../../src/exceptions/request";
const prismaClient = new PrismaClient();

async function main() {
  try {
    const userCount = await prismaClient.user.count();
    if (userCount === 0) {
      await prismaClient.user.create({
        data: {
          name: "Administrator",
          email: "admin01@gmail.com",
          role: "ADMIN",
          password: hashSync("Admin123", 12),
        },
      });
    }
  } catch (error) {
    throw new ServerError(error);
  }
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
