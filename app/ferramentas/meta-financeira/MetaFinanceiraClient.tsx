"use client";

import { useMemo, useState } from "react";
import ToolLayout from "@/components/ToolLayout";

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatPct(value: number) {
  return `${value.toFixed(2)}%`;
}

type Linha = {
  mes: number;
  saldo: number;
  totalInvestido: number;
};

export default function MetaFinanceiraClient() {
  const [meta, setMeta] = useState(100000);
  const [valorInicial, setValorInicial] = useState(5000);
  const [prazoMeses, setPrazoMeses] = useState(36);

  // taxa anual como input (mais comum pro usuário)
  const [taxaAnual, setTaxaAnual] = useState(12); // % a.a.

  const resultado = useMemo(() => {
    const rAnual = taxaAnual / 100;
    const i = Math.pow(1 + rAnual, 1 / 12) - 1; // mensal composto

    const n = Math.max(1, Math.floor(prazoMeses));
    const FV = meta;
    const PV = valorInicial;

    // Fórmula do aporte PMT para atingir FV com PV já aplicado:
    // FV = PV*(1+i)^n + PMT * [((1+i)^n - 1)/i]
    // PMT = (FV - PV*(1+i)^n) * i / ((1+i)^n - 1)
    const fator = Math.pow(1 + i, n);

    let pmt = 0;

    if (i === 0) {
      pmt = Math.max(0, (FV - PV) / n);
    } else {
      const numerador = (FV - PV * fator) * i;
      const denominador = fator - 1;
      pmt = numerador / denominador;
      if (!Number.isFinite(pmt)) pmt = 0;
      pmt = Math.max(0, pmt);
    }

    // Gera tabela mês a mês (com aporte no final do mês)
    let saldo = PV;
    let totalInvestido = PV;
    const linhas: Linha[] = [];

    for (let mes = 1; mes <= n; mes++) {
      saldo = saldo * (1 + i);
      saldo += pmt;
      totalInvestido += pmt;

      linhas.push({ mes, saldo, totalInvestido });
    }

    const ultimo = linhas[linhas.length - 1] ?? {
      mes: 0,
      saldo: PV,
      totalInvestido: PV,
    };

    const atingiu = ultimo.saldo >= FV;

    return {
      taxaMensalEfetiva: i * 100,
      aporteMensal: pmt,
      saldoFinal: ultimo.saldo,
      totalInvestido: ultimo.totalInvestido,
      ganhos: ultimo.saldo - ultimo.totalInvestido,
      atingiu,
      linhas,
    };
  }, [meta, valorInicial, prazoMeses, taxaAnual]);

  return (
    <ToolLayout
      title="Simulador de Meta Financeira"
      subtitle="Descubra quanto investir por mês para atingir uma meta em um prazo, com taxa de rendimento."
    >
      <div className="grid gap-6 rounded-xl border bg-white p-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm text-gray-600">Meta (R$)</label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg border px-4 py-2"
              value={meta}
              onChange={(e) => setMeta(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Valor inicial (R$)</label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg border px-4 py-2"
              value={valorInicial}
              onChange={(e) => setValorInicial(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Prazo (meses)</label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg border px-4 py-2"
              value={prazoMeses}
              onChange={(e) => setPrazoMeses(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Taxa de rendimento (% a.a.)</label>
            <input
              type="number"
              step="0.01"
              className="mt-1 w-full rounded-lg border px-4 py-2"
              value={taxaAnual}
              onChange={(e) => setTaxaAnual(Number(e.target.value))}
            />
            <p className="mt-1 text-xs text-gray-500">
              A conversão para taxa mensal é composta.
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <div className="text-xs text-gray-500">Taxa mensal efetiva</div>
            <div className="mt-1 text-lg font-semibold">
              {formatPct(resultado.taxaMensalEfetiva)}
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <div className="text-xs text-gray-500">Aporte mensal necessário</div>
            <div className="mt-1 text-lg font-semibold">
              {formatBRL(resultado.aporteMensal)}
            </div>
          </div>
        </div>

        <div className="mt-2 grid gap-3 rounded-lg bg-gray-50 p-6">
          <div className="flex justify-between">
            <span>Total investido</span>
            <strong>{formatBRL(resultado.totalInvestido)}</strong>
          </div>
          <div className="flex justify-between">
            <span>Ganhos (estimados)</span>
            <strong>{formatBRL(resultado.ganhos)}</strong>
          </div>
          <div className="flex justify-between text-lg">
            <span>Saldo final (estimado)</span>
            <strong>{formatBRL(resultado.saldoFinal)}</strong>
          </div>

          <div className="mt-2 text-sm">
            {resultado.atingiu ? (
              <span className="text-green-700">
                ✅ Com esses parâmetros, você atinge a meta no prazo.
              </span>
            ) : (
              <span className="text-red-700">
                ⚠️ Com esses parâmetros, você pode não atingir a meta (ajuste taxa/prazo/aporte).
              </span>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Evolução (primeiros 24 meses)</h2>
          <div className="mt-3 overflow-auto rounded-lg border">
            <table className="min-w-[780px] w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">Mês</th>
                  <th className="px-3 py-2 text-right">Total investido</th>
                  <th className="px-3 py-2 text-right">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {resultado.linhas.slice(0, 24).map((l) => (
                  <tr key={l.mes} className="border-t">
                    <td className="px-3 py-2">{l.mes}</td>
                    <td className="px-3 py-2 text-right">{formatBRL(l.totalInvestido)}</td>
                    <td className="px-3 py-2 text-right">{formatBRL(l.saldo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Observação: simulação educacional (não inclui taxas, impostos, inflação, risco de mercado).
          </p>
        </div>
      </div>

      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold">Como funciona o cálculo do aporte mensal?</h2>
        <p className="text-gray-700 leading-relaxed">
          O simulador usa capitalização composta e calcula o aporte mensal necessário para que o
          saldo final atinja a sua meta no prazo informado, considerando também um valor inicial já investido.
        </p>

        <h2 className="text-2xl font-bold">Dica prática</h2>
        <p className="text-gray-700 leading-relaxed">
          Se o aporte mensal ficou alto, você pode aumentar o prazo, melhorar a taxa de rendimento
          (com mais risco, geralmente) ou começar com um valor inicial maior.
        </p>
      </section>
    </ToolLayout>
  );
}