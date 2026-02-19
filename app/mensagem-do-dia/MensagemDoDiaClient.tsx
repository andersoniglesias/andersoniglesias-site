"use client";

import { useMemo, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { MENSAGENS } from "@/lib/messages";

function startOfYear(date: Date) {
  return new Date(date.getFullYear(), 0, 1);
}

function dayOfYear(date: Date) {
  const start = startOfYear(date);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1; // 1..366
}

export default function MensagemDoDiaClient() {
  const today = new Date();
  const diaAno = dayOfYear(today);

  const [overrideDay, setOverrideDay] = useState<number | null>(null);
  const diaAtual = overrideDay ?? diaAno;

  const mensagem = useMemo(() => {
    const idx = (diaAtual - 1) % MENSAGENS.length;
    return MENSAGENS[idx];
  }, [diaAtual]);

  const textoParaCopiar = `Dia ${mensagem.day}\n${mensagem.l1}\n${mensagem.l2}\n${mensagem.l3}\n\n${mensagem.body}\n\n— Anderson Iglesias`;

  async function copiar() {
    try {
      await navigator.clipboard.writeText(textoParaCopiar);
      alert("Copiado! ✅");
    } catch {
      alert("Não consegui copiar. Selecione e copie manualmente.");
    }
  }

  return (
    <ToolLayout
      title="Mensagem do Dia"
      subtitle="Impacto. Reflexão. Ação. — Ecossistema Anderson Iglesias"
    >
      <div className="rounded-xl border bg-white p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm text-gray-500">
              Hoje (dia do ano): <strong>{diaAno}</strong>
              {overrideDay ? (
                <span className="ml-2 text-xs text-amber-600">
                  (modo teste: dia {overrideDay})
                </span>
              ) : null}
            </div>
            <h1 className="mt-2 text-2xl font-bold">Dia {mensagem.day}</h1>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                setOverrideDay((prev) => (prev ? Math.max(1, prev - 1) : diaAno - 1))
              }
              className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => setOverrideDay((prev) => (prev ? prev + 1 : diaAno + 1))}
              className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Próxima
            </button>
            <button
              type="button"
              onClick={() => setOverrideDay(null)}
              className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Voltar p/ hoje
            </button>
            <button
              type="button"
              onClick={copiar}
              className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-90"
            >
              Copiar
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-gray-50 p-6">
          {/* ✅ 3 linhas “coladas” e em negrito */}
          <div className="space-y-1 text-lg font-bold leading-snug text-gray-900">
            <p>{mensagem.l1}</p>
            <p>{mensagem.l2}</p>
            <p>{mensagem.l3}</p>
          </div>

          {/* Texto reflexivo */}
          <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-gray-700">
            {mensagem.body}
          </p>

          <div className="mt-6 text-sm text-gray-500">— Anderson Iglesias</div>
        </div>

        <div className="mt-6 rounded-xl border p-5">
          <div className="text-sm font-semibold">Receber por e-mail (em breve)</div>
          <p className="mt-2 text-sm text-gray-600">
            Em breve você poderá cadastrar seu e-mail aqui para receber a mensagem automaticamente.
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Seu e-mail (em breve)"
              disabled
            />
            <button
              className="rounded-xl bg-gray-300 px-4 py-3 text-sm text-gray-700"
              disabled
            >
              Quero receber
            </button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}