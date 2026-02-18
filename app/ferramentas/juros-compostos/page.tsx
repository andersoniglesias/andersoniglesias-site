import type { Metadata } from "next";
import JurosCompostosClient from "./JurosCompostosClient";

export const metadata: Metadata = {
  title: "Calculadora de Juros Compostos | Anderson Iglesias",
  description:
    "Simule juros compostos com aporte mensal. Veja saldo final, total investido e juros ganhos em poucos segundos.",
};

export default function Page() {
  return <JurosCompostosClient />;
}