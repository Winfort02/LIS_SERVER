import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";

const prismaClient = new PrismaClient();

async function main() {
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
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
