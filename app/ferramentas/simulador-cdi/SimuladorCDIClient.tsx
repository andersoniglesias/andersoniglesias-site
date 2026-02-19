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

// IR regressivo (Brasil) para renda fixa:
// até 180 dias: 22,5%
// 181–360: 20%
// 361–720: 17,5%
// acima de 720: 15%
function aliquotaIR(dias: number) {
  if (dias <= 180) return 0.225;
  if (dias <= 360) return 0.20;
  if (dias <= 720) return 0.175;
  return 0.15;
}

type Linha = {
  mes: number;
  saldoBruto: number;
  totalInvestido: number;
  rendimentoBruto: number;
  irEstimado: number;
  saldoLiquido: number;
};

export default function SimuladorCDIClient() {
  // Entradas
  const [valorInicial, setValorInicial] = useState(10000);
  const [aporteMensal, setAporteMensal] = useState(500);
  const [percentualCDI, setPercentualCDI] = useState(100); // % do CDI
  const [cdiAnual, setCdiAnual] = useState(11.0); // % ao ano (editável)
  const [prazoMeses, setPrazoMeses] = useState(24);

  const resultado = useMemo(() => {
    // CDI anual -> mensal composto
    const taxaAnual = cdiAnual / 100;
    const taxaMensalCDI = Math.pow(1 + taxaAnual, 1 / 12) - 1;

    // aplica % do CDI
    const taxaMensal = taxaMensalCDI * (percentualCDI / 100);

    let saldo = valorInicial;
    let totalInvestido = valorInicial;

    const linhas: Linha[] = [];

    for (let mes = 1; mes <= prazoMeses; mes++) {
      // rendimento do mês
      saldo = saldo * (1 + taxaMensal);

      // aporte ao final do mês
      saldo += aporteMensal;
      totalInvestido += aporteMensal;

      const rendimentoBruto = Math.max(0, saldo - totalInvestido);

      // estimativa simples do IR: aplica alíquota sobre o ganho total
      // (não é um controle por lote/data de aplicação, mas é um bom "profissional e transparente" para simulador)
      const dias = mes * 30; // aproximação
      const aliq = aliquotaIR(dias);
      const irEstimado = rendimentoBruto * aliq;

      const saldoLiquido = saldo - irEstimado;

      linhas.push({
        mes,
        saldoBruto: saldo,
        totalInvestido,
        rendimentoBruto,
        irEstimado,
        saldoLiquido,
      });
    }

    const ultima = linhas[linhas.length - 1] ?? {
      mes: 0,
      saldoBruto: valorInicial,
      totalInvestido: valorInicial,
      rendimentoBruto: 0,
      irEstimado: 0,
      saldoLiquido: valorInicial,
    };

    const rentabBrutaPct =
      ultima.totalInvestido > 0
        ? (ultima.saldoBruto / ultima.totalInvestido - 1) * 100
        : 0;

    const rentabLiquidaPct =
      ultima.totalInvestido > 0
        ? (ultima.saldoLiquido / ultima.totalInvestido - 1) * 100
        : 0;

    return {
      taxaMensalEfetiva: taxaMensal * 100,
      linhas,
      resumo: {
        totalInvestido: ultima.totalInvestido,
        saldoBruto: ultima.saldoBruto,
        rendimentoBruto: ultima.rendimentoBruto,
        irEstimado: ultima.irEstimado,
        saldoLiquido: ultima.saldoLiquido,
        rentabBrutaPct,
        rentabLiquidaPct,
        aliqFinal: aliquotaIR(prazoMeses * 30) * 100,
      },
    };
  }, [valorInicial, aporteMensal, percentualCDI, cdiAnual, prazoMeses]);

  return (
    <ToolLayout
      title="Simulador CDI Profissional"
      subtitle="Simule rendimento atrelado ao CDI com aportes mensais e estimativa de imposto regressivo."
    >
      <div className="grid gap-6 rounded-xl border bg-white p-8">
        <div className="grid gap-4 md:grid-cols-3">
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
            <label className="text-sm text-gray-600">Aporte mensal (R$)</label>
            <input
              type="number"
              className="mt-1 w-full rounded-lg border px-4 py-2"
              value={aporteMensal}
              onChange={(e) => setAporteMensal(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">% do CDI</label>
            <input
              type="number"
              step="0.1"
              className="mt-1 w-full rounded-lg border px-4 py-2"
              value={percentualCDI}
              onChange={(e) => setPercentualCDI(Number(e.target.value))}
            />
            <p className="mt-1 text-xs text-gray-500">
              Ex.: 100 = 100% do CDI, 110 = 110% do CDI.
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-600">CDI anual (%)</label>
            <input
              type="number"
              step="0.01"
              className="mt-1 w-full rounded-lg border px-4 py-2"
              value={cdiAnual}
              onChange={(e) => setCdiAnual(Number(e.target.value))}
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

          <div className="rounded-lg bg-gray-50 p-4">
            <div className="text-xs text-gray-500">Taxa mensal efetiva</div>
            <div className="mt-1 text-lg font-semibold">
              {formatPct(resultado.taxaMensalEfetiva)}
            </div>
            <div className="mt-2 text-xs text-gray-500">
              (Conversão composta do CDI anual × % do CDI)
            </div>
          </div>
        </div>

        <div className="mt-2 grid gap-3 rounded-lg bg-gray-50 p-6">
          <div className="flex justify-between">
            <span>Total investido</span>
            <strong>{formatBRL(resultado.resumo.totalInvestido)}</strong>
          </div>
          <div className="flex justify-between">
            <span>Saldo bruto</span>
            <strong>{formatBRL(resultado.resumo.saldoBruto)}</strong>
          </div>
          <div className="flex justify-between">
            <span>Rendimento bruto</span>
            <strong>{formatBRL(resultado.resumo.rendimentoBruto)}</strong>
          </div>
          <div className="flex justify-between">
            <span>IR estimado (alíquota final {formatPct(resultado.resumo.aliqFinal)})</span>
            <strong>{formatBRL(resultado.resumo.irEstimado)}</strong>
          </div>
          <div className="flex justify-between text-lg">
            <span>Saldo líquido</span>
            <strong>{formatBRL(resultado.resumo.saldoLiquido)}</strong>
          </div>

          <div className="mt-2 grid gap-2 md:grid-cols-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Rentabilidade bruta</span>
              <strong>{formatPct(resultado.resumo.rentabBrutaPct)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Rentabilidade líquida</span>
              <strong>{formatPct(resultado.resumo.rentabLiquidaPct)}</strong>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Tabela (primeiros 24 meses)</h2>
          <div className="mt-3 overflow-auto rounded-lg border">
            <table className="min-w-[980px] w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">Mês</th>
                  <th className="px-3 py-2 text-right">Total investido</th>
                  <th className="px-3 py-2 text-right">Saldo bruto</th>
                  <th className="px-3 py-2 text-right">Rend. bruto</th>
                  <th className="px-3 py-2 text-right">IR estimado</th>
                  <th className="px-3 py-2 text-right">Saldo líquido</th>
                </tr>
              </thead>
              <tbody>
                {resultado.linhas.slice(0, 24).map((l) => (
                  <tr key={l.mes} className="border-t">
                    <td className="px-3 py-2">{l.mes}</td>
                    <td className="px-3 py-2 text-right">{formatBRL(l.totalInvestido)}</td>
                    <td className="px-3 py-2 text-right">{formatBRL(l.saldoBruto)}</td>
                    <td className="px-3 py-2 text-right">{formatBRL(l.rendimentoBruto)}</td>
                    <td className="px-3 py-2 text-right">{formatBRL(l.irEstimado)}</td>
                    <td className="px-3 py-2 text-right">{formatBRL(l.saldoLiquido)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Observação: simulação educacional. O IR é uma estimativa simples baseada no ganho total
            e na tabela regressiva por prazo. Produtos reais podem ter regras e incidências diferentes.
          </p>
        </div>
      </div>

      {/* SEO / explicação */}
      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold">Como funciona investimento atrelado ao CDI?</h2>
        <p className="text-gray-700 leading-relaxed">
          Muitos investimentos de renda fixa (como CDB, LCI/LCA, fundos e outros) usam o CDI como
          referência. Um produto “100% do CDI” busca acompanhar o CDI; “110% do CDI” busca render
          acima do CDI, e assim por diante.
        </p>

        <h2 className="text-2xl font-bold">Imposto de renda regressivo</h2>
        <p className="text-gray-700 leading-relaxed">
          Em vários investimentos tributáveis de renda fixa, a alíquota de IR diminui conforme o prazo:
          22,5% (até 180 dias), 20% (até 360), 17,5% (até 720) e 15% (acima de 720).
          Este simulador usa essa tabela para estimar o valor líquido ao final.
        </p>
      </section>
    </ToolLayout>
  );
}