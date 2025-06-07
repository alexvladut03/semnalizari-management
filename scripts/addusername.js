import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("parola123", 10);

  const user = await prisma.user.create({
    data: {
      username: "admin",
      password: hashedPassword,
    },
  });

  console.log("User creat:", user);
}

main()
  .then(() => {
    console.log("Gata!");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
