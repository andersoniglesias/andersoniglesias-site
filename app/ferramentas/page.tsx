import { tools } from "@/lib/tools";

export default function Ferramentas() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-bold">Ferramentas e Simuladores</h1>
        <p className="mt-4 text-gray-600">
          Ferramentas inteligentes para decisões rápidas e precisas.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {tools.map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="rounded-xl border bg-white p-6 hover:shadow-md transition"
            >
              <div className="text-xs text-gray-500">{t.category}</div>
              <h2 className="mt-1 text-lg font-semibold">{t.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{t.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}