export type Tool = {
  title: string;
  desc: string;
  href: string;
  category: "Financeiro" | "Documentos" | "TI" | "Produtividade";
};

export const tools: Tool[] = [
  {
    title: "Calculadora de Juros Compostos",
    desc: "Simule o crescimento do patrimônio com aportes mensais.",
    href: "/ferramentas/juros-compostos",
    category: "Financeiro",
  },
  {
    title: "Calculadora Price (Financiamento)",
    desc: "Simule a Tabela Price: parcela fixa, juros e saldo devedor.",
    href: "/ferramentas/calculadora-price",
    category: "Financeiro",
  },
];