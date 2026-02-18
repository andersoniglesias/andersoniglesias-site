export const metadata = {
  title: "Cursos | Anderson Iglesias",
  description: "Cursos e treinamentos do ecossistema Anderson Iglesias.",
};

export default function Cursos() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-bold">Cursos</h1>
        <p className="mt-4 text-gray-600">
          Em breve, meus cursos e treinamentos estarão disponíveis aqui.
        </p>

        <div className="mt-10 rounded-xl border bg-white p-6">
          <p className="text-gray-700">
            Quer ser avisado quando eu lançar?
          </p>
          <p className="mt-2 text-sm text-gray-600">
            (Depois a gente coloca formulário e integrações.)
          </p>
        </div>
      </div>
    </main>
  );
}