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

            {/* Transformação - Versão Humanizada */}
            <div className="text-center bg-gradient-to-br from-[var(--success-green)]/10 to-[var(--accent-blue)]/10 border border-[var(--success-green)]/30 rounded-2xl p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-6">
                🌙 Sua Transformação em 7 Noites
              </h3>
              
              <div className="max-w-2xl mx-auto space-y-4 text-[var(--text-secondary)]">
                <p className="text-lg">
                  <strong className="text-[var(--accent-blue)]">Noite 1:</strong> Você percebe que consegue relaxar de verdade
                </p>
                <p className="text-lg">
                  <strong className="text-[var(--warm-accent)]">Noite 3:</strong> Pela primeira vez em meses, dorme sem rolar na cama
                </p>
                <p className="text-lg">
                  <strong className="text-[var(--success-green)]">Noite 7:</strong> Seu corpo já sabe automaticamente quando é hora de dormir
                </p>
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-[var(--success-green)]/20 to-[var(--accent-blue)]/20 rounded-xl border border-[var(--success-green)]/40">
                <p className="text-xl font-semibold text-[var(--text-primary)]">
                  ✨ Resultado: Você finalmente tem o sono que merece
                </p>
                <p className="text-[var(--text-muted)] mt-2">
                  É isso que milhares de pessoas já conseguiram. Agora é sua vez.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}