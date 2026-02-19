import type { Metadata } from "next";
import Link from "next/link";
import { MENSAGENS } from "@/lib/messages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ day: string }>;
}): Promise<Metadata> {
  const { day } = await params;
  const dayNum = Number(day);
  const msg = MENSAGENS.find((m) => m.day === dayNum);

  if (!msg) return { title: "Mensagem do Dia | Anderson Iglesias" };

  return {
    title: `Mensagem do Dia ${dayNum} | Anderson Iglesias`,
    description: `${msg.l1} ${msg.l2} ${msg.l3} ${msg.body}`.slice(0, 160),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = await params;
  const dayNum = Number(day);
  const msg = MENSAGENS.find((m) => m.day === dayNum);

  if (!msg) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="text-2xl font-bold">Dia não encontrado</h1>
        <p className="mt-3 text-gray-700">Esse dia ainda não está disponível.</p>
        <Link className="mt-6 inline-block underline" href="/mensagem-do-dia">
          Voltar para Mensagem do Dia
        </Link>
      </div>
    );
  }

  const prev = dayNum > 1 ? dayNum - 1 : null;
  const next = dayNum < MENSAGENS.length ? dayNum + 1 : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <div className="flex items-center justify-between gap-3">
        <Link className="underline" href="/mensagem-do-dia">
          ← Hoje
        </Link>

        <div className="flex gap-3">
          {prev ? (
            <Link className="underline" href={`/mensagem-do-dia/dia/${prev}`}>
              Anterior
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="underline" href={`/mensagem-do-dia/dia/${next}`}>
              Próxima
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>

      <h1 className="mt-6 text-3xl font-bold">Dia {msg.day}</h1>

      <div className="mt-6 rounded-2xl bg-gray-50 p-6">
        {/* 3 linhas mais “coladas” e todas em negrito */}
        <div className="space-y-1 text-xl font-bold leading-snug tracking-tight text-gray-900">
          <p>{msg.l1}</p>
          <p>{msg.l2}</p>
          <p>{msg.l3}</p>
        </div>

        {/* Texto reflexivo */}
        <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-gray-700">
          {msg.body}
        </p>

        <div className="mt-6 text-sm text-gray-500">— Anderson Iglesias</div>
      </div>

      <p className="mt-6 text-xs text-gray-500">
        Ecossistema Anderson Iglesias • Mensagem diária em 3 linhas.
      </p>
    </div>
  );
}