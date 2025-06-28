import { FloatingClouds } from "@/components/ui/floating-clouds";
import meditationImage from "@assets/image_1751154153197.png";

export function MethodSection() {
  return (
    <section id="metodo" className="py-20 bg-black relative overflow-hidden">
      {/* Floating clouds for peaceful atmosphere */}
      <FloatingClouds className="opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
                O Método Sono Zen: Dormir É
                <span className="block bg-gradient-to-r from-[var(--accent-blue)] to-[var(--warm-accent)] bg-clip-text text-transparent">
                  Um Ritual
                </span>
              </h2>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
                Você não precisa dormir melhor por sorte. Você pode dormir melhor <span className="text-[var(--accent-blue)] font-semibold">por escolha</span>.
              </p>
              <p className="text-base text-[var(--text-muted)]">
                Isso começa com uma mudança simples: Encarar o sono como um ritual, e não como uma obrigação.
              </p>
            </div>
            
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>Enquanto muita gente apenas "deita na cama e espera o sono vir", os orientais tratam o sono como algo sagrado — um momento de reconexão, equilíbrio e cura.</p>
              <p className="text-[var(--accent-blue)] font-medium">
                O Sono Zen é um método leve, natural e inspirado em práticas orientais milenares, baseado em rotinas simples que ajudam seu corpo a entender que chegou a hora de descansar de verdade.
              </p>
            </div>
          </div>
          
          {/* Right image - Meditation Image */}
          <div className="relative">
            <div className="card-modern p-0 animate-slide-up overflow-hidden">
              <img 
                src={meditationImage} 
                alt="Mulher meditando em posição de lótus" 
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
