import { FloatingClouds } from "@/components/ui/floating-clouds";
import { Clock, Heart, Smile, Sun, Battery, Shield } from "lucide-react";

const benefits = [
  { 
    icon: Clock, 
    title: "Adormecer em Minutos",
    description: "Técnicas simples que acalmam sua mente e preparam seu corpo para o sono profundo. Nada de ficar rolando na cama por horas."
  },
  { 
    icon: Heart, 
    title: "Sono Profundo e Contínuo",
    description: "Durma a noite toda sem interrupções. Acorde menos vezes durante a madrugada e sinta o verdadeiro descanso reparador."
  },
  { 
    icon: Sun, 
    title: "Despertar com Energia",
    description: "Acorde naturalmente revigorado, com disposição e clareza mental para enfrentar o dia com entusiasmo e produtividade."
  }
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-20 bg-black relative overflow-hidden">
      <FloatingClouds className="opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
                Como Seria Sua Vida
                <span className="block bg-gradient-to-r from-[var(--accent-blue)] to-[var(--warm-accent)] bg-clip-text text-transparent">
                  Dormindo Bem?
                </span>
              </h2>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
                Imagine acordar <span className="text-[var(--accent-blue)] font-semibold">realmente descansado</span>, com energia e disposição para viver seus dias.
              </p>
              <p className="text-base text-[var(--text-muted)]">
                Isso é o que acontece quando você finalmente resolve seus problemas de sono.
              </p>
            </div>
            
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>Em apenas 7 noites aplicando as técnicas do Sono Zen, você vai sentir a diferença. Não é mágica - é ciência oriental aplicada ao seu dia a dia.</p>
              <p className="text-[var(--accent-blue)] font-medium">
                O sono reparador que você merece está ao seu alcance. É só seguir o método certo.
              </p>
            </div>
          </div>
          
          {/* Right visual element */}
          <div className="relative">
            <div className="card-modern p-8 animate-slide-up">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-[var(--accent-blue)] to-[var(--warm-accent)] rounded-full flex items-center justify-center">
                  <Battery className="h-12 w-12 text-white" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-heading text-xl font-semibold text-[var(--text-primary)]">
                    Energia Renovada
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                    Quando você dorme bem, seu corpo se regenera completamente. É como carregar a bateria da sua vida todos os dias.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-12 mt-16">
          <h3 className="font-heading text-2xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--celestial-blue)] bg-clip-text text-transparent">
              O Que Você Vai Conquistar
            </span>
          </h3>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Estes são os resultados que as pessoas relatam após seguir o método:
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="card-modern p-6 group animate-slide-up hover:shadow-xl transition-all duration-300 animate-magnetic-hover" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[var(--accent-blue)] to-[var(--warm-accent)] flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-xl text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-blue)] transition-colors animate-text-focus">
                      {benefit.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto mt-12">
          <div className="card-modern p-8 bg-gradient-to-r from-[var(--ritual-blue)]/10 to-[var(--warm-accent)]/10 border border-[var(--ritual-blue)]/20">
            <div className="text-center space-y-4">
              <h4 className="font-heading text-xl font-semibold text-[var(--text-primary)]">
                A Transformação Começa Hoje
              </h4>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Dormir bem não é luxo - é necessidade. Quando você cuida do seu sono, você cuida de toda sua vida. Sua energia, seu humor, sua saúde e seus relacionamentos melhoram naturalmente.
              </p>
              <p className="text-[var(--text-muted)] text-sm">
                É hora de priorizar seu descanso e transformar suas noites.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}