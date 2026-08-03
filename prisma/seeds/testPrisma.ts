import { PrismaClient } from "@prisma/client";

async function main() {
  try {
    const prisma = new PrismaClient();
    const result = await prisma.service.findMany();
    console.log(result);
    console.log("Postgres connection works!");
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

main();
