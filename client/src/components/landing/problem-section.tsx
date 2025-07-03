import { Card, CardContent } from "@/components/ui/card";
import { Brain, Smartphone, AlertTriangle, Clock, TrendingDown, Activity } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";

const problems = [
  {
    icon: Brain,
    title: "Sua Mente Não Para de Pensar",
    description: "Você deita na cama e sua cabeça não para. Fica pensando no trabalho, nas contas, nos problemas... Parece que tem um filme passando na sua mente e não consegue desligar.",
    color: "text-red-400",
    stat: "87% das pessoas",
    impact: "Muito comum"
  },
  {
    icon: Smartphone,
    title: "Celular na Cama Atrapalha Tudo",
    description: "Você fica no celular até tarde e depois não consegue dormir. A luz da tela confunde seu cérebro, que acha que ainda é dia. Aí você fica rolando na cama até 2, 3 da manhã.",
    color: "text-blue-400",
    stat: "Atraso de 3h",
    impact: "Efeito comprovado"
  },
  {
    icon: AlertTriangle,
    title: "Estresse do Dia Todo que Não Sai",
    description: "Você passou o dia correndo, estressado, e quando chega a noite ainda está com aquela sensação de ansiedade. O corpo está cansado mas a mente ainda está agitada.",
    color: "text-orange-400",
    stat: "3x mais cortisol",
    impact: "Bloqueia o sono"
  },
  {
    icon: Clock,
    title: "Horários Completamente Desregulados",
    description: "Hoje dorme às 2h, amanhã às 11h, depois cochila de tarde... Seu corpo não sabe mais que horas deve dormir. Vira uma bagunça total e o sono fica cada vez pior.",
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
            Você Também Passa Por Isso?
          </h3>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Essas são as situações que mais atrapalham o sono das pessoas hoje em dia:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <div key={index} className="group relative backdrop-blur-sm bg-transparent border-2 border-[var(--accent-blue)]/20 hover:border-[var(--accent-blue)]/40 rounded-3xl p-6 sm:p-8 animate-scale-in hover:shadow-xl hover:shadow-[var(--accent-blue)]/10 transition-all duration-300 animate-magnetic-hover" style={{animationDelay: `${index * 0.15}s`}}>
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20 flex-shrink-0 backdrop-blur-sm" style={{animationDelay: `${index * 0.2 + 0.3}s`}}>
                  <problem.icon className="h-8 w-8 text-[var(--accent-blue)]" />
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="font-heading font-semibold text-lg sm:text-xl text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors mb-3 leading-tight animate-text-focus">
                      {problem.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed text-sm animate-fade-in-up" style={{animationDelay: `${index * 0.1 + 0.4}s`}}>
                      {problem.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--accent-blue)]/20 mt-4 animate-scale-in" style={{animationDelay: `${index * 0.1 + 0.6}s`}}>
                    <span className="text-sm font-semibold text-[var(--accent-blue)] bg-[var(--accent-blue)]/10 px-4 py-2 rounded-xl border border-[var(--accent-blue)]/20 backdrop-blur-sm animate-shimmer">
                      {problem.stat}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-medium bg-[var(--text-muted)]/10 px-3 py-1 rounded-lg backdrop-blur-sm animate-float-on-hover">
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