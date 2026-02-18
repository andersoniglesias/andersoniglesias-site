"use client";

import { useState, useMemo } from "react";
import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Calculadora de Juros Compostos | Anderson Iglesias",
  description:
    "Simule juros compostos com aporte mensal. Veja saldo final, total investido e juros ganhos em poucos segundos.",
};

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function JurosCompostos() {
  const [valorInicial, setValorInicial] = useState(1000);
  const [aporteMensal, setAporteMensal] = useState(200);
  const [taxaMensal, setTaxaMensal] = useState(1);
  const [meses, setMeses] = useState(24);

  const resultado = useMemo(() => {
    const i = taxaMensal / 100;
    let saldo = valorInicial;
    let totalAportado = valorInicial;

    for (let m = 1; m <= meses; m++) {
      saldo = saldo * (1 + i) + aporteMensal;
      totalAportado += aporteMensal;
    }

    return {
      saldoFinal: saldo,
      totalAportado,
      juros: saldo - totalAportado,
    };
  }, [valorInicial, aporteMensal, taxaMensal, meses]);

    return (
    <ToolLayout
      title="Calculadora de Juros Compostos"
      subtitle="Simule o crescimento do seu patrimônio com aportes mensais."
    >
      <div className="grid gap-6 rounded-xl border bg-white p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-gray-600">Valor Inicial (R$)</label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg border px-4 py-2"
              value={valorInicial}
              onChange={(e) => setValorInicial(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Aporte Mensal (R$)</label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg border px-4 py-2"
              value={aporteMensal}
              onChange={(e) => setAporteMensal(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Taxa Mensal (%)</label>
            <input
              type="number"
              step="0.01"
              className="mt-1 w-full rounded-lg border px-4 py-2"
              value={taxaMensal}
              onChange={(e) => setTaxaMensal(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Número de Meses</label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg border px-4 py-2"
              value={meses}
              onChange={(e) => setMeses(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="mt-2 space-y-3 rounded-lg bg-gray-50 p-6">
          <div className="flex justify-between">
            <span>Total Aportado:</span>
            <strong>{formatBRL(resultado.totalAportado)}</strong>
          </div>

          <div className="flex justify-between">
            <span>Juros Ganhos:</span>
            <strong>{formatBRL(resultado.juros)}</strong>
          </div>

          <div className="flex justify-between text-lg">
            <span>Saldo Final:</span>
            <strong>{formatBRL(resultado.saldoFinal)}</strong>
          </div>
        </div>
      </div>

      {/* TEXTO SEO */}
      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold">Como funciona juros compostos?</h2>
        <p className="text-gray-700 leading-relaxed">
          Juros compostos são os “juros sobre juros”. Em cada período, o rendimento
          incide sobre o valor inicial e também sobre os rendimentos acumulados.
          Isso faz o crescimento acelerar com o tempo, principalmente quando você
          faz aportes mensais.
        </p>

        <h3 className="text-xl font-semibold">Fórmula de juros compostos</h3>
        <p className="text-gray-700 leading-relaxed">
          A forma mais conhecida é: <strong>M = C × (1 + i)<sup>t</sup></strong>,
          onde <strong>C</strong> é o capital inicial, <strong>i</strong> é a taxa
          do período e <strong>t</strong> é o número de períodos. Quando existe
          aporte mensal, o cálculo é feito mês a mês.
        </p>

        <h3 className="text-xl font-semibold">Perguntas frequentes (FAQ)</h3>
        <div className="space-y-3">
          <details className="rounded-xl border bg-white p-4">
            <summary className="cursor-pointer font-semibold">
              Taxa mensal é a mesma coisa que taxa anual?
            </summary>
            <p className="mt-2 text-gray-700 leading-relaxed">
              Não. Para converter corretamente, use capitalização composta, não apenas
              dividir por 12.
            </p>
          </details>

          <details className="rounded-xl border bg-white p-4">
            <summary className="cursor-pointer font-semibold">
              Essa calculadora envia meus dados?
            </summary>
            <p className="mt-2 text-gray-700 leading-relaxed">
              Não. Tudo roda no seu navegador.
            </p>
          </details>
        </div>
      </section>
    </ToolLayout>
  );
}