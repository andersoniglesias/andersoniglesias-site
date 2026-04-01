import PostForm from "../components/PostForm";

export const metadata = {
  title: "Novo Post | Admin",
  description: "Criar novo post no painel administrativo.",
};

export default function NovoPostPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="text-3xl font-bold">Novo Post</h1>
      <p className="mt-2 text-gray-600">
        Crie um artigo para Política ou Viagens.
      </p>

      <div className="mt-8">
        <PostForm />
      </div>
    </main>
  );
}