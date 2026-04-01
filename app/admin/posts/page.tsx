import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Admin • Posts | Anderson Iglesias",
  description: "Painel de administração de posts.",
};

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      category: true,
      author: true,
    },
    take: 50,
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Administração de Posts</h1>
          <p className="mt-2 text-gray-600">
            Gerencie artigos de política, viagens e outras categorias.
          </p>
        </div>

        <Link
          href="/admin/posts/novo"
          className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-90"
        >
          Novo post
        </Link>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Autor</th>
              <th className="px-4 py-3">Atualizado</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>

          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Nenhum post encontrado.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{post.title}</td>
                  <td className="px-4 py-3">{post.category.name}</td>
                  <td className="px-4 py-3">
                    {post.status === "PUBLISHED" ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                            Publicado
                        </span>
                        ) : (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                            Rascunho
                        </span>
                        )}
                  </td>
                  <td className="px-4 py-3">{post.author?.name || post.author?.email}</td>
                  <td className="px-4 py-3">
                    {new Date(post.updatedAt).toLocaleString("pt-BR")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                        href={`/admin/posts/${post.id}`}
                        className="rounded-lg border px-3 py-1 text-xs hover:bg-gray-50"
                        >
                        Editar
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}