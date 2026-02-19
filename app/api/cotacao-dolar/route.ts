import { NextResponse } from "next/server";

export const revalidate = 60; // cache por 60s no server

export async function GET() {
  try {
    // API pública simples (PT-BR) – retorna USD->BRL
    const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL", {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Falha ao buscar cotação");

    const data = await res.json();
    const usdbrl = data?.USDBRL;

    // campos comuns: bid, ask, high, low, varBid, pctChange, timestamp, create_date
    return NextResponse.json({
      source: "awesomeapi",
      bid: Number(usdbrl?.bid),
      ask: Number(usdbrl?.ask),
      timestamp: usdbrl?.timestamp ? Number(usdbrl.timestamp) : null,
      updatedAt: usdbrl?.create_date ?? null,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Não foi possível obter a cotação agora." },
      { status: 500 }
    );
  }
}