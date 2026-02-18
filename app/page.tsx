export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-16">
        
        <h1 className="text-4xl font-bold text-gray-900">
          Anderson Iglesias
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Coordenador de TI • Estratégia • Tecnologia • Produtos Digitais
        </p>

        <p className="mt-6 text-gray-700 leading-relaxed">
          Bem-vindo ao meu ecossistema digital. Aqui você encontrará
          ferramentas inteligentes, simuladores financeiros, projetos
          tecnológicos e conteúdos estratégicos desenvolvidos por mim.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/ferramentas"
            className="rounded-xl bg-black px-6 py-3 text-white hover:bg-gray-800 transition"
          >
            Acessar Ferramentas
          </a>

          <a
            href="#"
            className="rounded-xl border border-gray-300 px-6 py-3 hover:bg-gray-100 transition"
          >
            Meus Cursos
          </a>

          <a
            href="#"
            className="rounded-xl border border-gray-300 px-6 py-3 hover:bg-gray-100 transition"
          >
            Projetos
          </a>
        </div>

      </div>
    </main>
  );
}