"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin",
      redirect: true,
    });

    // quando redirect true, o browser navega; esse trecho é só fallback
    setLoading(false);
    if ((res as any)?.error) setErr("Login inválido.");
  }

  return (
    <main className="mx-auto max-w-md px-6 py-14">
      <h1 className="text-2xl font-bold">Admin</h1>
      <p className="mt-2 text-sm text-gray-600">
        Acesso restrito para publicação de artigos.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-3 rounded-2xl border bg-white p-6">
        <input
          className="w-full rounded-xl border px-4 py-3"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          className="w-full rounded-xl border px-4 py-3"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />

        {err ? <div className="text-sm text-red-600">{err}</div> : null}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-black px-4 py-3 text-white hover:opacity-90 disabled:opacity-50"
          type="submit"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}