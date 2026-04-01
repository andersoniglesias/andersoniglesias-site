import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Política | Anderson Iglesias",
  description: "Textos e análises publicados por Anderson Iglesias.",
};

export default async function PoliticaPage() {
  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      category: { slug: "politica" },
    },
    orderBy: { publishedAt: "desc" },
    include: { category: true },
    take: 30,
  });

  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="text-3xl font-bold">Política</h1>
      <p className="mt-3 text-gray-600">
        Textos publicados por Anderson Iglesias.
      </p>

      <div className="mt-10 space-y-6">
        {posts.length === 0 ? (
          <div className="rounded-2xl border bg-white p-6 text-gray-600">
            Ainda não há posts publicados aqui.
          </div>
        ) : (
          posts.map((p) => (
            <article key={p.id} className="rounded-2xl border bg-white p-6">
              <div className="text-xs text-gray-500">
                {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("pt-BR") : ""}
              </div>
              <h2 className="mt-2 text-xl font-semibold">
                <Link className="underline" href={`/politica/${p.slug}`}>
                  {p.title}
                </Link>
              </h2>
              {p.excerpt ? (
                <p className="mt-3 text-gray-700 leading-relaxed">{p.excerpt}</p>
              ) : null}
            </article>
          ))
        )}
      </div>
    </main>
  );
}