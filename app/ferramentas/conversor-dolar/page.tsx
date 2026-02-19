import type { Metadata } from "next";
import ConversorDolarClient from "./ConversorDolarClient";

export const metadata: Metadata = {
  title: "Conversor Dólar para Real | Anderson Iglesias",
  description:
    "Converta dólar para real e real para dólar com cotação personalizada e spread opcional.",
};

export default function Page() {
  return <ConversorDolarClient />;
}