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

            {/* Transformação - Versão Ultra Humanizada */}
            <div className="text-center bg-gradient-to-br from-[var(--success-green)]/10 to-[var(--accent-blue)]/10 border border-[var(--success-green)]/30 rounded-2xl p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4">
                💤 O Que Vai Acontecer Com Você
              </h3>
              <p className="text-[var(--text-muted)] mb-8 text-sm">
                (Baseado no que nossos clientes mais relatam)
              </p>
              
              <div className="max-w-3xl mx-auto space-y-6 text-[var(--text-secondary)]">
                <div className="bg-[var(--celestial-blue)]/10 border border-[var(--celestial-blue)]/30 rounded-xl p-4 text-left">
                  <p className="text-lg leading-relaxed">
                    <strong className="text-[var(--celestial-blue)]">Primeira noite:</strong> "Nossa, consegui relaxar mesmo! Minha mente parou de acelerar na hora de dormir. Foi como se alguém tivesse baixado o volume dos meus pensamentos."
                  </p>
                </div>
                
                <div className="bg-[var(--sky-blue)]/10 border border-[var(--sky-blue)]/30 rounded-xl p-4 text-left">
                  <p className="text-lg leading-relaxed">
                    <strong className="text-[var(--sky-blue)]">Terceira noite:</strong> "Gente, eu dormi! Pela primeira vez em MESES eu não fiquei rolando na cama. Foi tão gostoso sentir meu corpo 'derretendo' no colchão."
                  </p>
                </div>
                
                <div className="bg-[var(--mint-green)]/10 border border-[var(--mint-green)]/30 rounded-xl p-4 text-left">
                  <p className="text-lg leading-relaxed">
                    <strong className="text-[var(--mint-green)]">Sétima noite:</strong> "Isso virou automático! Meu corpo já 'sabe' quando é hora de dormir. É como se eu tivesse encontrado meu ritual sagrado. Durmo como criança agora."
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-[var(--mint-green)]/15 to-[var(--celestial-blue)]/15 rounded-xl border border-[var(--celestial-blue)]/40">
                <p className="text-xl font-semibold text-[var(--cloud-white)] mb-3">
                  🤗 E sabe o melhor de tudo?
                </p>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                  Você vai acordar descansado de verdade. Aquela sensação gostosa de "dormi que nem um bebê". Seus dias vão ficar mais leves, sua paciência vai voltar, e as pessoas vão até comentar que você está com uma cara melhor.
                </p>
                <p className="text-[var(--celestial-blue)] font-medium mt-4 text-sm">
                  Mais de 12.000 pessoas já viveram essa transformação. Sua vez chegou! 💙
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}