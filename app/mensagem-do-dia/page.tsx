import type { Metadata } from "next";
import MensagemDoDiaClient from "./MensagemDoDiaClient";

export const metadata: Metadata = {
  title: "Mensagem do Dia | Anderson Iglesias",
  description:
    "Uma mensagem diária de clareza: impacto, reflexão e ação. Projeto do Ecossistema Anderson Iglesias.",
};

export default function Page() {
  return <MensagemDoDiaClient />;
}