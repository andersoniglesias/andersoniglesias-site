import "./globals.css";

export const metadata = {
  title: "Anderson Iglesias",
  description: "Ecossistema digital criado por Anderson Iglesias",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900">

        {/* NAVBAR */}
        <header className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            
            <a href="/" className="font-bold text-lg">
              Anderson Iglesias
            </a>

            <nav className="flex gap-6 text-sm">
              <a href="/" className="hover:text-black text-gray-600">Home</a>
              <a href="/ferramentas" className="hover:text-black text-gray-600">Ferramentas</a>
              <a href="/cursos" className="hover:text-black text-gray-600">Cursos</a>
              <a href="/projetos" className="hover:text-black text-gray-600">Projetos</a>
            </nav>

          </div>
        </header>

        {children}

      </body>
    </html>
  );
}