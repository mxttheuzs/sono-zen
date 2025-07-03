import { FloatingClouds } from "@/components/ui/floating-clouds";

export function EbookContentSection() {
  return (
    <section id="conteudo-ebook" className="py-8 bg-black relative overflow-hidden">
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



          </div>
        </div>
      </div>
    </section>
  );
}