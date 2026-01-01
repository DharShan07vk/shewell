import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const main = async () => {
  const db = new PrismaClient();
  // const encrypted = await hash("12345678", 10);
  const password = await hash("12345678", 10);
  await db.adminUser.create({
    data: {
      name: "Admin",
      email: "admin@gmail.com",
      passwordHash: password,
      active: true,
    },
  });
};

main();
