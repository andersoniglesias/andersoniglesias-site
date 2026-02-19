import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre Mim | Anderson Iglesias",
  description:
    "A história de Anderson Iglesias: tecnologia, viagens, valores e a construção de um ecossistema digital.",
};

export default function SobreMim() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <p className="text-sm font-semibold text-gray-500">Sobre mim</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Anderson Iglesias
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-gray-700">
          Eu sou alguém que gosta de construir. Construir sistemas, construir
          clareza, construir caminhos. E, talvez por isso, tecnologia e viagens
          sempre foram duas forças que me puxaram para frente: a primeira me dá
          método; a segunda me dá perspectiva.
        </p>

        <div className="mt-12 space-y-10">
          {/* BLOCO 1 */}
          <section>
            <h2 className="text-xl font-semibold">Tecnologia como ofício</h2>
            <div className="mt-4 space-y-5 text-lg leading-relaxed text-gray-700">
              <p>
                Minha história com TI começa cedo e ganhou forma com o tempo:
                aprender, testar, errar, melhorar. Eu sempre gostei do lado
                prático da tecnologia — o tipo de coisa que resolve de verdade
                e que as pessoas sentem no dia a dia.
              </p>
              <p>
                Com os anos, eu me aproximei cada vez mais de dois temas:
                <strong> governança</strong> e <strong>produto</strong>. Porque
                não basta “funcionar”: precisa ser sustentável, seguro, claro,
                replicável. Eu gosto de pensar em sistemas como ecossistemas —
                onde cada parte tem um propósito e onde o todo precisa fazer
                sentido.
              </p>
            </div>
          </section>

          {/* BLOCO 2 */}
          <section>
            <h2 className="text-xl font-semibold">Viagens como escola</h2>
            <div className="mt-4 space-y-5 text-lg leading-relaxed text-gray-700">
              <p>
                Viajar, para mim, não é só lazer. É um tipo de educação que
                reorganiza a cabeça: você muda de contexto, vê como pessoas
                vivem, trabalha a flexibilidade e volta com outra leitura do
                que realmente importa.
              </p>
              <p>
                Isso acabou virando parte do meu jeito de enxergar a vida e os
                projetos: <strong>planejamento</strong>, <strong>liberdade</strong>{" "}
                e <strong>responsabilidade</strong>. E também influenciou meu
                interesse em construir ferramentas que ajudem pessoas a
                organizarem decisões — especialmente envolvendo finanças e
                planejamento.
              </p>
            </div>
          </section>

          {/* BLOCO 3 */}
          <section>
            <h2 className="text-xl font-semibold">Valores que guiam</h2>
            <div className="mt-4 space-y-5 text-lg leading-relaxed text-gray-700">
              <p>
                Eu valorizo simplicidade, disciplina e consistência. Não do
                jeito “frio”, mas do jeito que dá paz: quando as coisas estão
                organizadas, a mente respira.
              </p>
              <p>
                Três ideias aparecem muito no que eu faço:
                <br />
                • <strong>Clareza antes de velocidade</strong>
                <br />
                • <strong>Constância antes de intensidade</strong>
                <br />
                • <strong>Construção antes de exposição</strong>
              </p>
              <p>
                Eu também acredito que a vida melhora quando você constrói algo
                útil — nem que seja pequeno — e repete isso todo dia.
              </p>
            </div>
          </section>

          {/* BLOCO 4 */}
          <section>
            <h2 className="text-xl font-semibold">
              Por que este site existe?
            </h2>
            <div className="mt-4 space-y-5 text-lg leading-relaxed text-gray-700">
              <p>
                Este site é um ponto de encontro das coisas que eu venho
                construindo: ferramentas, projetos e conteúdos. Algumas partes
                são utilidades diretas (simuladores, conversores), outras são
                mais “mentais” — como o módulo de mensagens diárias.
              </p>
              <p>
                A ideia é simples: <strong>menos ruído, mais utilidade</strong>.
                Um ecossistema que cresce por etapas, com consistência.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-14 h-px w-full bg-gray-200" />

        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <Link href="/ferramentas" className="font-semibold underline">
            Ver ferramentas →
          </Link>
          <Link href="/mensagem-do-dia" className="font-semibold underline">
            Mensagens diárias →
          </Link>
          <Link href="/projetos" className="font-semibold underline">
            Projetos →
          </Link>
        </div>

        <p className="mt-10 text-xs text-gray-500">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>
      </div>
    </main>
  );
}