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
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-8">
            Por Que Você
            <span className="block bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] bg-clip-text text-transparent">
              Não Consegue Dormir?
            </span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-4xl mx-auto leading-relaxed mb-4">
            <strong className="text-[var(--text-primary)]">Entenda as principais causas</strong> que estão roubando seu sono e como resolver
          </p>
          <div className="flex justify-center items-center space-x-8 text-base text-[var(--text-muted)]">
            <div className="flex items-center">
              <TrendingDown className="h-4 w-4 text-[var(--warm-accent)] mr-2" />
              <span className="font-medium">9 em cada 10 pessoas</span>
            </div>
            <div className="flex items-center">
              <Activity className="h-4 w-4 text-[var(--accent-blue)] mr-2" />
              <span className="font-medium">Soluções eficazes</span>
            </div>
          </div>
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
