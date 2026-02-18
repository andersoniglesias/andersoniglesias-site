"use client";

import { useMemo, useState } from "react";
import ToolLayout from "@/components/ToolLayout";

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

type Parcela = {
  n: number;
  parcela: number;
  juros: number;
  amortizacao: number;
  saldo: number;
};

export default function PriceClient() {
  const [valorFinanciado, setValorFinanciado] = useState(100000);
  const [taxaMensal, setTaxaMensal] = useState(1.2); // %
  const [meses, setMeses] = useState(360);

  const data = useMemo(() => {
    const i = taxaMensal / 100;

    // Parcela Price: P = PV * [ i(1+i)^n ] / [ (1+i)^n - 1 ]
    const fator = Math.pow(1 + i, meses);
    const parcela =
      i === 0 ? valorFinanciado / meses : valorFinanciado * (i * fator) / (fator - 1);

    let saldo = valorFinanciado;
    const tabela: Parcela[] = [];
    let jurosTotais = 0;

    for (let n = 1; n <= meses; n++) {
      const juros = saldo * i;
      const amortizacao = parcela - juros;
      saldo = Math.max(0, saldo - amortizacao);

      jurosTotais += juros;

      tabela.push({
        n,
        parcela,
        juros,
        amortizacao,
        saldo,
      });

      if (saldo <= 0) break;
    }

    return {
      parcela,
      jurosTotais,
      totalPago: parcela * meses,
      tabela,
    };
  }, [valorFinanciado, taxaMensal, meses]);

  return (
     <ToolLayout
        title="Calculadora Price (Financiamento)"
        subtitle="Simule a Tabela Price e veja parcela fixa, juros e saldo devedor mês a mês."
    >       
        <div className="mt-10 grid gap-6 rounded-xl border bg-white p-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm text-gray-600">Valor financiado (R$)</label>
              <input
                type="number"
                className="mt-1 w-full rounded-lg border px-4 py-2"
                value={valorFinanciado}
                onChange={(e) => setValorFinanciado(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Taxa mensal (%)</label>
              <input
                type="number"
                step="0.01"
                className="mt-1 w-full rounded-lg border px-4 py-2"
                value={taxaMensal}
                onChange={(e) => setTaxaMensal(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Prazo (meses)</label>
              <input
                type="number"
                className="mt-1 w-full rounded-lg border px-4 py-2"
                value={meses}
                onChange={(e) => setMeses(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="mt-6 grid gap-3 rounded-lg bg-gray-50 p-6">
            <div className="flex justify-between">
              <span>Parcela (aprox.)</span>
              <strong>{formatBRL(data.parcela)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Juros totais (aprox.)</span>
              <strong>{formatBRL(data.jurosTotais)}</strong>
            </div>
            <div className="flex justify-between text-lg">
              <span>Total pago (aprox.)</span>
              <strong>{formatBRL(data.totalPago)}</strong>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Tabela (primeiras 24 parcelas)</h2>
            <div className="mt-3 overflow-auto rounded-lg border">
              <table className="min-w-[900px] w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left">#</th>
                    <th className="px-3 py-2 text-right">Parcela</th>
                    <th className="px-3 py-2 text-right">Juros</th>
                    <th className="px-3 py-2 text-right">Amortização</th>
                    <th className="px-3 py-2 text-right">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {data.tabela.slice(0, 24).map((p) => (
                    <tr key={p.n} className="border-t">
                      <td className="px-3 py-2">{p.n}</td>
                      <td className="px-3 py-2 text-right">{formatBRL(p.parcela)}</td>
                      <td className="px-3 py-2 text-right">{formatBRL(p.juros)}</td>
                      <td className="px-3 py-2 text-right">{formatBRL(p.amortizacao)}</td>
                      <td className="px-3 py-2 text-right">{formatBRL(p.saldo)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Observação: valores aproximados (não inclui seguros, tarifas, CET, IOF etc.).
            </p>
          </div>
        </div>

        {/* TEXTO SEO */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">O que é Tabela Price?</h2>
          <p className="text-gray-700 leading-relaxed">
            A Tabela Price é um sistema de amortização com <strong>parcela fixa</strong>.
            No início, a maior parte da parcela é composta por juros. Com o tempo, a
            amortização aumenta e os juros diminuem.
          </p>

          <h2 className="text-2xl font-bold">FAQ</h2>
          <div className="space-y-3">
            <details className="rounded-xl border bg-white p-4">
              <summary className="cursor-pointer font-semibold">
                Price é melhor que SAC?
              </summary>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Depende. Price tem parcela inicial menor (fixa), mas geralmente paga
                mais juros ao longo do tempo. SAC começa com parcela maior e vai
                diminuindo, normalmente com menor custo total.
              </p>
            </details>
          </div>
        </section>
      </ToolLayout>
  );
}