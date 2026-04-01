const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

(async () => {
  const email = process.env.ADMIN_EMAIL || "andersoniglesias@gmail.com";
  const password = process.env.ADMIN_PASSWORD || "TroqueEssaSenha123!";
  const name = process.env.ADMIN_NAME || "Anderson Iglesias";

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { name, passwordHash, role: "ADMIN" },
    create: { email, name, passwordHash, role: "ADMIN" },
  });

  console.log("✅ Admin criado ou atualizado:", email);
  await prisma.$disconnect();
})().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});