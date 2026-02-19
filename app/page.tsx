import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <section className="max-w-3xl">
          <p className="text-sm font-semibold text-gray-500">
            Ecossistema digital
          </p>

          <h1 className="mt-3 text-5xl font-bold tracking-tight">
            Anderson Iglesias
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            Coordenador de TI. Estratégia, tecnologia e produtos digitais.
            Aqui você encontra ferramentas práticas, projetos e conteúdos
            construídos com foco em clareza e execução.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/ferramentas"
              className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Ferramentas
            </Link>

            <Link
              href="/mensagem-do-dia"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold hover:bg-gray-100"
            >
              Mensagem do Dia
            </Link>

            <Link
              href="/projetos"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold hover:bg-gray-100"
            >
              Projetos
            </Link>

            <Link
              href="/cursos"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold hover:bg-gray-100"
            >
              Cursos
            </Link>
          </div>

          <div className="mt-14 h-px w-full bg-gray-200" />

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <div>
              <div className="text-sm font-semibold">Ferramentas</div>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Simuladores e calculadoras para decisões rápidas e objetivas.
              </p>
            </div>

            <div>
              <div className="text-sm font-semibold">Mentalidade</div>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Mensagens diárias em formato curto: impacto, reflexão e ação.
              </p>
            </div>

            <div>
              <div className="text-sm font-semibold">Produtos</div>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Projetos e conteúdos que evoluem com consistência.
              </p>
            </div>
          </div>

          <footer className="mt-16 text-xs text-gray-500">
            © {new Date().getFullYear()} Anderson Iglesias
          </footer>
        </section>
      </div>
    </main>
  );
}