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
  {
    title: "Simulador CDI Profissional",
    desc: "Rendimento atrelado ao CDI com aportes e IR regressivo (estimado).",
    href: "/ferramentas/simulador-cdi",
    category: "Financeiro",
  },
  {
    title: "Simulador de Meta Financeira",
    desc: "Descubra quanto investir por mês para atingir uma meta com taxa composta.",
    href: "/ferramentas/meta-financeira",
    category: "Financeiro",
  },
  {
  title: "Conversor Dólar ↔ Real",
  desc: "Converta USD para BRL e BRL para USD com spread opcional (ideal para cartão internacional).",
  href: "/ferramentas/conversor-dolar",
  category: "Financeiro",
},
];