import { FloatingClouds } from "@/components/ui/floating-clouds";

export function ProblemSection() {
  return (
    <section id="problema" className="py-1 bg-black relative overflow-hidden">
      <FloatingClouds />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        
        <div className="text-center mb-12">
          <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Talvez Você Também Passe Por{" "}
            <span className="bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--celestial-blue)] bg-clip-text text-transparent">
              Essas Situações
            </span>...
          </h3>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            São coisas do dia a dia que, sem perceber, sabotam completamente nossa noite de sono:
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-gradient-to-r from-[var(--celestial-blue)]/10 to-[var(--sky-blue)]/5 border border-[var(--celestial-blue)]/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-2xl">🧠</div>
              <div>
                <h4 className="text-lg font-semibold text-[var(--cloud-white)] mb-2">
                  Você deita e sua mente não para
                </h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  "Será que esqueci de trancar a porta? E aquela reunião amanhã?" - Sua mente vira um campo de batalha na hora que deveria ser de paz.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[var(--sky-blue)]/10 to-[var(--accent-blue)]/5 border border-[var(--sky-blue)]/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-2xl">📱</div>
              <div>
                <h4 className="text-lg font-semibold text-[var(--cloud-white)] mb-2">
                  O celular rouba suas horas de sono
                </h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  "Só mais 5 minutinhos no Instagram..." e quando vê, já são 2h da manhã. Depois fica se revirando na cama pensando no que viu.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[var(--accent-blue)]/10 to-[var(--mint-green)]/5 border border-[var(--accent-blue)]/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-2xl">😰</div>
              <div>
                <h4 className="text-lg font-semibold text-[var(--cloud-white)] mb-2">
                  O estresse do dia grudou em você
                </h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Mesmo em casa, relaxando no sofá, aquela tensão não sai das suas costas. É como carregar o peso do dia todo até na cama.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[var(--mint-green)]/10 to-[var(--celestial-blue)]/5 border border-[var(--mint-green)]/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-2xl">🕰️</div>
              <div>
                <h4 className="text-lg font-semibold text-[var(--cloud-white)] mb-2">
                  Seus horários viraram uma bagunça
                </h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Hoje 1h, amanhã 3h, fim de semana meio-dia... Seu corpo não entende mais quando é hora de dormir. Virou uma loteria.
                </p>
              </div>
            </div>
          </div>
        </div>
        

      </div>
    </section>
  );
}