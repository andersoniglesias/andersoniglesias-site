export const metadata = {
  title: "Projetos | Anderson Iglesias",
  description: "Projetos, produtos e iniciativas do ecossistema Anderson Iglesias.",
};

export default function Projetos() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-bold">Projetos</h1>
        <p className="mt-4 text-gray-600">
          Aqui vou listar projetos, produtos e sistemas que eu desenvolvo.
        </p>

        <div className="mt-10 rounded-xl border bg-white p-6">
          <p className="text-gray-700">
            Em breve: portfólio completo com cases e resultados.
          </p>
        </div>
      </div>
    </main>
  );
}