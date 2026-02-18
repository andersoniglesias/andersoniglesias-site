type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function ToolLayout({ title, subtitle, children }: Props) {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* CONTEÚDO */}
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            {subtitle ? <p className="mt-3 text-gray-600">{subtitle}</p> : null}
            <div className="mt-8">{children}</div>
          </div>

          {/* SIDEBAR (ADS) */}
          <aside className="space-y-4">
            <div className="rounded-xl border bg-white p-4">
              <div className="text-xs text-gray-500">Espaço de anúncio</div>
              <div className="mt-2 h-60 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                300 x 250
              </div>
            </div>

            <div className="rounded-xl border bg-white p-4">
              <div className="text-xs text-gray-500">Dica</div>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                Quer sugerir uma ferramenta? Me chama no Instagram ou LinkedIn.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}