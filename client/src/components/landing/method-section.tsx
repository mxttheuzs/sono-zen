import { FloatingClouds } from "@/components/ui/floating-clouds";
import relaxationImage from "@assets/image_1751507711872.png";

export function MethodSection() {
  return (
    <section id="metodo" className="py-5 bg-black relative overflow-hidden">
      {/* Floating clouds for peaceful atmosphere */}
      <FloatingClouds className="opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">


            <div className="space-y-6">
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)] leading-tight">
                Transforme Sua Noite em um
                <span className="block bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--celestial-blue)] bg-clip-text text-transparent">
                  Momento Sagrado
                </span>
              </h2>
              
              <div className="space-y-4">
                <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
                  🤔 <strong>Sabe por que você não consegue dormir?</strong> Porque você trata o sono como algo que "tem que acontecer", em vez de criar as condições certas para ele acontecer naturalmente.
                </p>
                <p className="text-base text-[var(--text-muted)]">
                  💡 Os mestres orientais descobriram isso há milênios: dormir bem não é sorte, é preparação.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-[var(--celestial-blue)]/10 border-l-4 border-[var(--celestial-blue)] rounded-r-xl p-4">
                <p className="text-[var(--text-secondary)] text-base leading-relaxed">
                  <strong className="text-[var(--celestial-blue)]">Imagine:</strong> Em vez de rolar na cama por horas, você faz uma sequência simples de 15 minutos que prepara seu corpo e mente. Quando você deita, seu cérebro já sabe: "agora é hora de descansar".
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-[var(--sky-blue)]/10 border border-[var(--sky-blue)]/30 rounded-xl p-4">
                  <p className="text-[var(--sky-blue)] font-semibold text-base mb-2">❌ Como a maioria faz:</p>
                  <p className="text-[var(--text-muted)] text-sm">
                    Deita na cama, fica no celular, pensa nos problemas, espera o sono "aparecer"
                  </p>
                </div>
                <div className="bg-[var(--mint-green)]/10 border border-[var(--mint-green)]/30 rounded-xl p-4">
                  <p className="text-[var(--mint-green)] font-semibold text-base mb-2">✅ Como você vai fazer:</p>
                  <p className="text-[var(--text-muted)] text-sm">
                    Ritual de 15 min → corpo relaxa → mente acalma → sono natural em minutos
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right image - Relaxation Image */}
          <div className="relative">
            <div className="card-modern p-0 animate-slide-up overflow-hidden">
              <img 
                src={relaxationImage} 
                alt="Mulher meditando em posição zen com roupas brancas em céu azul com nuvens" 
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
