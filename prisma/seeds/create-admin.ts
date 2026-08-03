import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../../src/lib/prisma.ts";

const EMAIL = "alex.roventa94@gmail.com";
const PASSWORD = "Admin@1234"; // schimbă după prima logare

async function main() {
  const hashed = await bcrypt.hash(PASSWORD, 10);
  const existing = await prisma.user.findUnique({ where: { email: EMAIL } });
  if (existing) {
    await prisma.user.update({
      where: { email: EMAIL },
      data: { role: "ADMIN", isVerified: true, password: hashed },
    });
    console.log(`User ${EMAIL} updated → ADMIN, parolă resetată`);
    return;
  }
  await prisma.user.create({
    data: {
      name: "Alexandru Roventa",
      email: EMAIL,
      password: hashed,
      role: "ADMIN",
      isVerified: true,
    },
  });
  console.log(`Admin user created: ${EMAIL} / ${PASSWORD}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
