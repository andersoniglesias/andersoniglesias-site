import type { Metadata } from "next";
import SimuladorCDIClient from "./SimuladorCDIClient";

export const metadata: Metadata = {
  title: "Simulador CDI Profissional | Anderson Iglesias",
  description:
    "Simule rendimento de investimentos atrelados ao CDI com imposto regressivo e aportes mensais.",
};

export default function Page() {
  return <SimuladorCDIClient />;
}