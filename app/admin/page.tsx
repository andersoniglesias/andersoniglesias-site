import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function AdminHome() {
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
    include: { category: true },
    take: 30,
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Painel</h1>
          <p className="mt-1 text-sm text-gray-600">
            Área administrativa protegida.
          </p>
        </div>

        <Link
          href="/admin/posts/novo"
          className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-90"
        >
          Novo post
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border bg-white">
        <div className="grid grid-cols-12 gap-2 border-b px-4 py-3 text-xs font-semibold text-gray-600">
          <div className="col-span-5">Título</div>
          <div className="col-span-2">Categoria</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3 text-right">Ações</div>
        </div>

        {posts.map((p) => (
          <div key={p.id} className="grid grid-cols-12 gap-2 px-4 py-3 text-sm">
            <div className="col-span-5 font-medium">{p.title}</div>
            <div className="col-span-2 text-gray-600">{p.category.name}</div>
            <div className="col-span-2">
              <span className="rounded-full border px-2 py-1 text-xs">
                {p.status}
              </span>
            </div>
            <div className="col-span-3 text-right">
              <Link className="underline" href={`/admin/posts/${p.id}`}>
                Editar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}