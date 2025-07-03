import { FloatingClouds } from "@/components/ui/floating-clouds";

export function EbookContentSection() {
  return (
    <section id="conteudo-ebook" className="py-20 bg-black relative overflow-hidden">
      <FloatingClouds />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Conteúdo Persuasivo Principal */}
        <div className="space-y-12">
          
          {/* Título Principal */}
          <div className="text-center space-y-6">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
              Por Que Este Método 
              <span className="block bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] bg-clip-text text-transparent">
                Funciona Mesmo?
              </span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              Não é mais um "método milagroso". É ciência milenar que funciona porque ataca a raiz do problema.
            </p>
          </div>

          {/* Seção Principal de Persuasão */}
          <div className="space-y-8">
            
            {/* Revelação 1 */}
            <div className="bg-gradient-to-r from-[var(--accent-blue)]/10 to-[var(--warm-accent)]/10 border-l-4 border-[var(--accent-blue)] rounded-r-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                🧠 A Verdade Que Ninguém Te Conta Sobre Insônia
              </h3>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-4">
                Você acha que não consegue dormir porque tem "insônia". <strong className="text-[var(--accent-blue)]">Mentira.</strong> Você não consegue dormir porque seu cérebro não sabe mais quando é hora de parar.
              </p>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Vivemos numa época que confunde completamente nosso corpo. Luz artificial até tarde, telas piscando, estresse constante, cafeína depois das 14h... Seu sistema nervoso está SEMPRE em modo "alerta".
              </p>
            </div>

            {/* Revelação 2 */}
            <div className="bg-gradient-to-r from-[var(--warm-accent)]/10 to-[var(--accent-blue)]/10 border-l-4 border-[var(--warm-accent)] rounded-r-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                ⚡ Como Este Método Resolve de Vez
              </h3>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-4">
                Os mestres orientais descobriram algo revolucionário há milênios: <strong className="text-[var(--warm-accent)]">dormir é uma habilidade que pode ser aprendida.</strong>
              </p>
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                Não é sobre "relaxar" ou "tentar dormir". É sobre ensinar seu corpo e mente a reconhecer os sinais corretos, na sequência certa, no momento certo.
              </p>
              <p className="text-[var(--accent-blue)] font-semibold">
                Em 7 noites, você reprograma completamente sua relação com o sono.
              </p>
            </div>

            {/* Transformação Completa */}
            <div className="relative">
              {/* Background com gradiente sutil */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--success-green)]/5 via-[var(--accent-blue)]/10 to-[var(--warm-accent)]/5 rounded-3xl blur-xl"></div>
              
              <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-[var(--success-green)]/30">
                {/* Header da seção */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--success-green)] to-[var(--accent-blue)] rounded-full mb-4">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-2">
                    O Que Muda na Sua Vida
                  </h3>
                  <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
                    Acompanhe sua jornada de transformação noite após noite
                  </p>
                </div>

                {/* Timeline de transformação */}
                <div className="space-y-6">
                  {/* Noite 1 */}
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[var(--accent-blue)]/10 to-transparent rounded-xl border border-[var(--accent-blue)]/20">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-blue)]/80 rounded-full flex items-center justify-center font-bold text-white">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                        Primeira Noite
                      </h4>
                      <p className="text-[var(--text-secondary)] text-lg">
                        Você percebe que consegue relaxar de verdade. Pela primeira vez em muito tempo, sua mente para de acelerar na hora de dormir.
                      </p>
                    </div>
                  </div>

                  {/* Noite 3 */}
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[var(--warm-accent)]/10 to-transparent rounded-xl border border-[var(--warm-accent)]/20">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[var(--warm-accent)] to-[var(--warm-accent)]/80 rounded-full flex items-center justify-center font-bold text-white">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                        Terceira Noite
                      </h4>
                      <p className="text-[var(--text-secondary)] text-lg">
                        Pela primeira vez em meses, você dorme sem rolar na cama. Seu corpo encontra naturalmente a posição de descanso.
                      </p>
                    </div>
                  </div>

                  {/* Noite 7 */}
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[var(--success-green)]/10 to-transparent rounded-xl border border-[var(--success-green)]/20">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[var(--success-green)] to-[var(--success-green)]/80 rounded-full flex items-center justify-center font-bold text-white">
                      7
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                        Sétima Noite
                      </h4>
                      <p className="text-[var(--text-secondary)] text-lg">
                        Seu corpo já sabe automaticamente quando é hora de dormir. Você criou um ritual sagrado que funciona como um interruptor natural.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Resultado final */}
                <div className="mt-8 p-6 bg-gradient-to-r from-[var(--success-green)]/20 to-[var(--accent-blue)]/20 rounded-2xl border border-[var(--success-green)]/30">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[var(--success-green)] to-[var(--accent-blue)] rounded-full mb-4">
                      <span className="text-xl">✨</span>
                    </div>
                    <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                      Resultado Final
                    </h4>
                    <p className="text-xl text-[var(--success-green)] font-semibold">
                      Você finalmente tem o sono que merece
                    </p>
                    <p className="text-[var(--text-muted)] mt-2">
                      Noites reparadoras, dias produtivos e uma nova qualidade de vida
                    </p>
                  </div>
                </div>

                {/* Indicador de continuidade */}
                <div className="text-center mt-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--accent-blue)]/20 to-[var(--warm-accent)]/20 rounded-full border border-[var(--accent-blue)]/30">
                    <div className="w-2 h-2 bg-[var(--accent-blue)] rounded-full animate-pulse"></div>
                    <span className="text-sm text-[var(--text-muted)] font-medium">
                      Transformação permanente em apenas 7 dias
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}