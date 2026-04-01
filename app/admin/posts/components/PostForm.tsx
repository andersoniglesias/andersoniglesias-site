"use client";

import { useState } from "react";

type PostFormProps = {
  mode?: "create" | "edit";
  postId?: string;
  initialTitle?: string;
  initialExcerpt?: string;
  initialContentMd?: string;
  initialCategorySlug?: string;
  initialStatus?: "DRAFT" | "PUBLISHED";
};

export default function PostForm({
  mode = "create",
  postId,
  initialTitle = "",
  initialExcerpt = "",
  initialContentMd = "",
  initialCategorySlug = "",
  initialStatus = "DRAFT",
}: PostFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [contentMd, setContentMd] = useState(initialContentMd);
  const [categoryId, setCategoryId] = useState(initialCategorySlug);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(
    initialStatus || "DRAFT"
);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url =
        mode === "edit" && postId
          ? `/api/admin/posts/${postId}`
          : "/api/admin/posts";

      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          excerpt,
          contentMd,
          categoryId,
          status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Erro ao salvar post.");
        setLoading(false);
        return;
      }

      setMessage(
        mode === "edit"
          ? "Post atualizado com sucesso! ✅"
          : "Post salvo com sucesso! ✅"
      );

      if (mode === "create") {
        setTitle("");
        setExcerpt("");
        setContentMd("");
        setCategoryId("");
      }
    } catch (error) {
      setMessage("Erro inesperado ao salvar post.");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border bg-white p-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Título
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 w-full rounded-xl border px-4 py-3"
          placeholder="Digite o título do artigo"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Resumo
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="mt-2 w-full rounded-xl border px-4 py-3"
          rows={3}
          placeholder="Resumo curto do artigo"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Categoria
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="mt-2 w-full rounded-xl border px-4 py-3"
        >
          <option value="">Selecione uma categoria</option>
          <option value="politica">Política</option>
          <option value="viagens">Viagens</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "DRAFT" | "PUBLISHED")
          }
          className="mt-2 w-full rounded-xl border px-4 py-3"
        >
          <option value="DRAFT">Rascunho</option>
          <option value="PUBLISHED">Publicado</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Conteúdo (Markdown)
        </label>
        <textarea
          value={contentMd}
          onChange={(e) => setContentMd(e.target.value)}
          className="mt-2 min-h-[300px] w-full rounded-xl border px-4 py-3 font-mono text-sm"
          placeholder="Escreva aqui seu artigo em Markdown..."
        />
      </div>

      {message ? (
        <div className="rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-700">
          {message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-black px-5 py-3 text-sm text-white hover:opacity-90 disabled:opacity-50"
      >
        {loading
          ? mode === "edit"
            ? "Atualizando..."
            : "Salvando..."
          : mode === "edit"
          ? "Atualizar post"
          : "Salvar post"}
      </button>
    </form>
  );
}