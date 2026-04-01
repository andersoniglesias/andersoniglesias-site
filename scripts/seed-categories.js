const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

(async () => {
  await prisma.category.upsert({
    where: { slug: "politica" },
    update: { name: "Política" },
    create: { slug: "politica", name: "Política" },
  });

  await prisma.category.upsert({
    where: { slug: "viagens" },
    update: { name: "Viagens" },
    create: { slug: "viagens", name: "Viagens" },
  });

  console.log("✅ Categorias criadas/atualizadas: política, viagens");
  await prisma.$disconnect();
})().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});