import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const title = String(body.title || "").trim();
    const excerpt = String(body.excerpt || "").trim();
    const contentMd = String(body.contentMd || "").trim();
    const categorySlug = String(body.categoryId || "").trim();
    const status =  body.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";

    if (!title || !contentMd || !categorySlug) {
      return NextResponse.json(
        { error: "Título, categoria e conteúdo são obrigatórios." },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Categoria inválida." },
        { status: 400 }
      );
    }

    const baseSlug = slugify(title);

    let slug = baseSlug;
    let count = 1;

    while (await prisma.post.findUnique({ where: { slug } })) {
      count++;
      slug = `${baseSlug}-${count}`;
    }

    const author = await prisma.user.findFirst({
      where: { email: "andersoniglesias@gmail.com" },
    });

    if (!author) {
      return NextResponse.json(
        { error: "Autor admin não encontrado." },
        { status: 500 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        contentMd,
        status,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
        authorId: author.id,
        categoryId: category.id,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao salvar post." },
      { status: 500 }
    );
  }
}