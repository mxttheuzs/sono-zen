import { Card, CardContent } from "@/components/ui/card";
import { Brain, Smartphone, AlertTriangle, Clock, TrendingDown, Activity } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";

const problems = [
  {
    icon: Brain,
    title: "Mente Acelerada que Não Desliga",
    description: "Trabalho, redes sociais, preocupações... Sua mente fica em ritmo acelerado o dia todo. Quando você deita, o corpo para mas a cabeça continua funcionando a mil por hora, impedindo o relaxamento.",
    color: "text-red-400",
    stat: "87% das pessoas",
    impact: "Muito comum"
  },
  {
    icon: Smartphone,
    title: "Celular Atrapalha a Produção do Sono",
    description: "A luz azul da tela do celular confunde seu cérebro, fazendo ele pensar que ainda é dia. Isso reduz muito a melatonina (hormônio do sono) e atrasa o sono em 2-3 horas.",
    color: "text-blue-400",
    stat: "Atraso de 3h",
    impact: "Efeito comprovado"
  },
  {
    icon: AlertTriangle,
    title: "Estresse Elevado Durante a Noite",
    description: "Quando você está estressado, seu corpo produz cortisol (hormônio do estresse) até de noite. Isso mantém você alerta quando deveria estar relaxando para dormir.",
    color: "text-orange-400",
    stat: "3x mais cortisol",
    impact: "Bloqueia o sono"
  },
  {
    icon: Clock,
    title: "Horários Bagunçados Confundem o Corpo",
    description: "Dormir e acordar em horários diferentes, comer tarde da noite e pouca luz natural durante o dia desregulam seu relógio interno, tornando o sono irregular.",
    color: "text-purple-400",
    stat: "Ciclo desregulado",
    impact: "Efeito duradouro"
  }
];

export function ProblemSection() {
  return (
    <section id="problema" className="py-20 bg-black relative overflow-hidden">
      <FloatingClouds />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
                Por Que Você Não Consegue
                <span className="block bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] bg-clip-text text-transparent">
                  Dormir Direito?
                </span>
              </h2>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
                Não é culpa sua. Vivemos numa época que <span className="text-[var(--accent-blue)] font-semibold">sabota nosso sono</span> de várias formas.
              </p>
              <p className="text-base text-[var(--text-muted)]">
                Entender as causas é o primeiro passo para resolver de vez seus problemas de sono.
              </p>
            </div>
            
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>Se você se reconhece em alguma dessas situações, você não está sozinho. Milhões de pessoas passam pelas mesmas dificuldades.</p>
              <p className="text-[var(--accent-blue)] font-medium">
                A boa notícia é que todos esses problemas têm solução quando você conhece as técnicas certas.
              </p>
            </div>
          </div>
          
          {/* Right visual element */}
          <div className="relative">
            <div className="card-modern p-8 animate-slide-up">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] rounded-full flex items-center justify-center">
                  <Brain className="h-12 w-12 text-white" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-heading text-xl font-semibold text-[var(--text-primary)]">
                    O Ciclo do Sono Ruim
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                    Cada noite mal dormida torna a próxima ainda mais difícil. É um ciclo que se repete até você quebrar com as técnicas certas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-12">
          <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-4">
            Veja se Você se Reconhece
          </h3>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Estes são os problemas mais comuns que impedem um sono reparador:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <div key={index} className="card-modern p-4 sm:p-8 group animate-slide-up hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-600/10 flex-shrink-0">
                  <problem.icon className={`h-8 w-8 ${problem.color}`} />
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="font-heading font-semibold text-lg sm:text-xl text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors mb-3 leading-tight">
                      {problem.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                      {problem.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)] mt-4">
                    <span className="text-base font-semibold text-[var(--warm-accent)] bg-[var(--warm-accent)]/10 px-4 py-2 rounded-lg border border-[var(--warm-accent)]/20">
                      {problem.stat}
                    </span>
                    <span className="text-sm text-[var(--text-muted)] font-medium bg-[var(--card-hover)] px-3 py-1 rounded-md">
                      {problem.impact}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}