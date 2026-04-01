import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostViagensPage({ params }: PageProps) {
  const { slug } = await params;

  const post = await prisma.post.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
      category: {
        slug: "viagens",
      },
    },
    include: {
      category: true,
      author: true,
    },
  });

  if (!post) {
    return notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <div className="text-sm text-gray-500">
        Viagens
        {post.publishedAt
          ? ` • ${new Date(post.publishedAt).toLocaleDateString("pt-BR")}`
          : ""}
      </div>

      <h1 className="mt-3 text-4xl font-bold leading-tight">
        {post.title}
      </h1>

      {post.excerpt ? (
        <p className="mt-5 text-lg leading-relaxed text-gray-600">
          {post.excerpt}
        </p>
      ) : null}

      <article className="mt-10 whitespace-pre-wrap leading-8 text-gray-800">
        {post.contentMd}
      </article>

      <div className="mt-10 border-t pt-6 text-sm text-gray-500">
        Por {post.author.name || post.author.email}
      </div>
    </main>
  );
}