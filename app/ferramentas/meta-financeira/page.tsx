import type { Metadata } from "next";
import MetaFinanceiraClient from "./MetaFinanceiraClient";

export const metadata: Metadata = {
  title: "Simulador de Meta Financeira | Anderson Iglesias",
  description:
    "Descubra quanto investir por mês para atingir uma meta em um prazo, com taxa de rendimento.",
};

export default function Page() {
  return <MetaFinanceiraClient />;
}