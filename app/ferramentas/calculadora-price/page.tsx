import type { Metadata } from "next";
import PriceClient from "./PriceClient";

export const metadata: Metadata = {
  title: "Calculadora Price | Simulador de Financiamento | Anderson Iglesias",
  description:
    "Simule financiamento pela Tabela Price. Veja valor da parcela, juros totais e saldo devedor mês a mês.",
};

export default function Page() {
  return <PriceClient />;
}