"use client";

import { useEffect, useMemo, useState } from "react";
import ToolLayout from "@/components/ToolLayout";

type Cotacao = {
  bid: number;
  ask: number;
  updatedAt?: string | null;
};

function toNumberBR(value: string) {
  // aceita "5,23" e "5.23" e também "1.234,56"
  const cleaned = value.replace(/\./g, "").replace(",", ".").trim();
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function formatBRL(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function ConversorDolarClient() {
  const [mode, setMode] = useState<"USD_BRL" | "BRL_USD">("USD_BRL");

  // inputs (strings para permitir vírgula)
  const [usdBrl, setUsdBrl] = useState<string>("5,00"); // cotação
  const [amount, setAmount] = useState<string>("100"); // valor a converter
  const [spreadPct, setSpreadPct] = useState<string>("0"); // % opcional
  const [feeBRL, setFeeBRL] = useState<string>("0"); // taxa fixa em BRL

  // cotação real
  const [cotacaoApi, setCotacaoApi] = useState<Cotacao | null>(null);
  const [carregandoCotacao, setCarregandoCotacao] = useState(false);
  const [erroCotacao, setErroCotacao] = useState<string | null>(null);

  async function carregarCotacao() {
    try {
      setCarregandoCotacao(true);
      setErroCotacao(null);

      const res = await fetch("/api/cotacao-dolar", { cache: "no-store" });
      if (!res.ok) throw new Error("Falha ao carregar cotação");

      const data = (await res.json()) as Cotacao;
      setCotacaoApi(data);

      const v = data.ask ?? data.bid;
      if (typeof v === "number" && Number.isFinite(v)) {
        setUsdBrl(v.toFixed(4).replace(".", ",")); // ex: 5,2271
      }
    } catch {
      setErroCotacao("Não foi possível obter a cotação agora.");
    } finally {
      setCarregandoCotacao(false);
    }
  }

  useEffect(() => {
    carregarCotacao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const interval = setInterval(() => {
    carregarCotacao();
     }, 60000); // 60 segundos

     return () => clearInterval(interval);
  }, []);

  const calc = useMemo(() => {
    const rate = toNumberBR(usdBrl); // R$ por US$
    const spread = toNumberBR(spreadPct) / 100;
    const fee = toNumberBR(feeBRL); // BRL
    const amt = toNumberBR(amount);

    const effectiveRate = rate * (1 + spread);

    let result = 0;

    if (mode === "USD_BRL") {
      // USD -> BRL: (usd * cotação efetiva) - taxa fixa (BRL)
      result = Math.max(0, amt * effectiveRate - fee);
    } else {
      // BRL -> USD: (brl - taxa fixa) / cotação efetiva
      result = effectiveRate > 0 ? Math.max(0, (amt - fee) / effectiveRate) : 0;
    }

    return { rate, spread, fee, amt, effectiveRate, result };
  }, [usdBrl, spreadPct, feeBRL, amount, mode]);

  return (
    <ToolLayout
      title="Conversor Dólar ↔ Real"
      subtitle="Cotação ao vivo + spread e taxa fixa (opcional). Ideal para cartão internacional, viagens e casas de câmbio."
    >
      <div className="rounded-xl border bg-white p-8">
        {/* Card cotação do dia */}
        <div className="rounded-2xl border bg-neutral-50 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-neutral-600">Cotação do dia (USD/BRL)</p>

              {carregandoCotacao && <p className="mt-1 text-sm">Carregando...</p>}

              {erroCotacao && <p className="mt-1 text-sm text-red-600">{erroCotacao}</p>}

              {cotacaoApi && !carregandoCotacao && (
                <div className="mt-1 text-sm">
                  <p>
                    <strong>Compra (bid):</strong>{" "}
                    R$ {cotacaoApi.bid.toLocaleString("pt-BR", { minimumFractionDigits: 4 })}
                  </p>
                  <p>
                    <strong>Venda (ask):</strong>{" "}
                    R$ {cotacaoApi.ask.toLocaleString("pt-BR", { minimumFractionDigits: 4 })}
                  </p>
                  {cotacaoApi.updatedAt && (
                    <p className="mt-1 text-xs text-neutral-500">
                      Atualizado em: {cotacaoApi.updatedAt}
                    </p>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={carregarCotacao}
              className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-90"
              type="button"
            >
              Atualizar
            </button>
          </div>
        </div>

        {/* Toggle */}
        <div className="mt-6 inline-flex overflow-hidden rounded-xl border">
          <button
            type="button"
            onClick={() => setMode("USD_BRL")}
            className={`px-4 py-2 text-sm ${
              mode === "USD_BRL" ? "bg-black text-white" : "bg-white"
            }`}
          >
            USD → BRL
          </button>
          <button
            type="button"
            onClick={() => setMode("BRL_USD")}
            className={`px-4 py-2 text-sm ${
              mode === "BRL_USD" ? "bg-black text-white" : "bg-white"
            }`}
          >
            BRL → USD
          </button>
        </div>

        {/* Inputs */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Cotação (R$ por US$)
            </label>
            <input
              value={usdBrl}
              onChange={(e) => setUsdBrl(e.target.value)}
              inputMode="decimal"
              className="mt-2 w-full rounded-xl border px-4 py-3"
              placeholder="Ex: 5,12"
            />
            <p className="mt-2 text-xs text-gray-500">
              Dica: aceite “5,00” ou “5.00”. Se a cotação ao vivo carregar, ela preenche aqui.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Valor a converter ({mode === "USD_BRL" ? "US$" : "R$"})
            </label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="decimal"
              className="mt-2 w-full rounded-xl border px-4 py-3"
              placeholder={mode === "USD_BRL" ? "Ex: 100" : "Ex: 500"}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Spread (%) (opcional)
            </label>
            <input
              value={spreadPct}
              onChange={(e) => setSpreadPct(e.target.value)}
              inputMode="decimal"
              className="mt-2 w-full rounded-xl border px-4 py-3"
              placeholder="Ex: 2,5"
            />
            <p className="mt-2 text-xs text-gray-500">
              Margem por cima da cotação (cartão/casa de câmbio).
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Taxa fixa em R$ (opcional)
            </label>
            <input
              value={feeBRL}
              onChange={(e) => setFeeBRL(e.target.value)}
              inputMode="decimal"
              className="mt-2 w-full rounded-xl border px-4 py-3"
              placeholder="Ex: 10"
            />
            <p className="mt-2 text-xs text-gray-500">
              Ex.: tarifa do cartão, taxa de operação, custo fixo.
            </p>
          </div>
        </div>

        {/* Resultado */}
        <div className="mt-6 rounded-2xl bg-neutral-50 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-neutral-600">Resultado</p>
              <p className="text-2xl font-bold">
                {mode === "USD_BRL" ? formatBRL(calc.result) : formatUSD(calc.result)}
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                Cotação efetiva: R${" "}
                {calc.effectiveRate.toLocaleString("pt-BR", { maximumFractionDigits: 6 })}
              </p>
            </div>

            <div className="grid gap-2 text-sm">
              <div className="flex justify-between gap-8">
                <span className="text-neutral-600">Spread</span>
                <strong>
                  {(calc.spread * 100).toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%
                </strong>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-neutral-600">Taxa fixa</span>
                <strong>{formatBRL(calc.fee)}</strong>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Observação: simulação educacional. Cotações, spreads e taxas variam por banco/cartão/casa de câmbio.
        </p>
      </div>

      {/* SEO / texto */}
      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold">Como usar o conversor dólar para real?</h2>
        <p className="text-gray-700 leading-relaxed">
          Informe a cotação do dólar (ou use a cotação ao vivo), escolha a direção (USD→BRL ou BRL→USD),
          e opcionalmente aplique spread e taxa fixa para aproximar valores de cartão internacional e turismo.
        </p>

        <h2 className="text-2xl font-bold">O que é spread no câmbio?</h2>
        <p className="text-gray-700 leading-relaxed">
          Spread é a margem aplicada sobre a cotação. Na prática, muitas operações de câmbio usam uma cotação
          “pior” que a cotação comercial de referência. Por isso, o spread ajuda a simular cenários reais.
        </p>
      </section>
    </ToolLayout>
  );
}