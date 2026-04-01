import { prisma } from "@/lib/prisma";
import PostForm from "../components/PostForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditarPostPage({ params }: PageProps) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      category: true,
      author: true,
    },
  });

  if (!post) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-14">
        <h1 className="text-3xl font-bold">Post não encontrado</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="text-3xl font-bold">Editar Post</h1>
      <p className="mt-2 text-gray-600">
        Atualize o conteúdo do artigo abaixo.
      </p>

      <div className="mt-8">
        <PostForm
          mode="edit"
          postId={post.id}
          initialTitle={post.title}
          initialExcerpt={post.excerpt || ""}
          initialContentMd={post.contentMd}
          initialCategorySlug={post.category.slug}
        />
      </div>
    </main>
  );
}