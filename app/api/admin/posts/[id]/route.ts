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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const postAtual = await prisma.post.findUnique({
      where: { id },
    });

    if (!postAtual) {
      return NextResponse.json(
        { error: "Post não encontrado." },
        { status: 404 }
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

    while (true) {
      const existente = await prisma.post.findUnique({
        where: { slug },
      });

      if (!existente || existente.id === id) break;

      count++;
      slug = `${baseSlug}-${count}`;
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        contentMd,
        categoryId: category.id,
        status,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao atualizar post." },
      { status: 500 }
    );
  }
}