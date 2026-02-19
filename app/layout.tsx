import "./globals.css";
import Link from "next/link";

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
            
            <Link href="/" className="font-bold text-lg">
              Anderson Iglesias
            </Link>

            <nav className="flex gap-6 text-sm">
              <Link href="/" className="hover:text-black text-gray-600">
                Home
              </Link>

               <Link href="/sobre-mim" className="hover:text-black text-gray-600">
                Sobre mim
              </Link>

              <Link href="/mensagem-do-dia" className="hover:text-black text-gray-600">
                Mensagem do Dia
              </Link>

              <Link href="/ferramentas" className="hover:text-black text-gray-600">
                Ferramentas
              </Link>

              <Link href="/cursos" className="hover:text-black text-gray-600">
                Cursos
              </Link>

              <Link href="/projetos" className="hover:text-black text-gray-600">
                Projetos
              </Link>
            </nav>

          </div>
        </header>

        {children}

      </body>
    </html>
  );
}