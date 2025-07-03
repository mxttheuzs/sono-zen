import { Card, CardContent } from "@/components/ui/card";
import { Brain, Smartphone, AlertTriangle, Clock, TrendingDown, Activity } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";

const problems = [
  {
    icon: Brain,
    title: "Você deita e sua mente dispara",
    description: "Sabe aquele momento? Você fecha os olhos e começa: 'Será que esqueci de trancar a porta? E aquela reunião amanhã? Preciso pagar a conta...' É como se a mente esperasse você deitar para despertar completamente.",
    color: "text-red-400",
    stat: "Maioria das pessoas",
    impact: "Super comum"
  },
  {
    icon: Smartphone,
    title: "O celular virou seu pior inimigo",
    description: "Você sabe que não deveria, mas ali está você: 'Só mais 5 minutinhos no Instagram'. Quando vê, já são 2h da manhã e você ainda está scrollando. Depois fica se revirando na cama...",
    color: "text-blue-400",
    stat: "Atrasa o sono em horas",
    impact: "Muito real"
  },
  {
    icon: AlertTriangle,
    title: "O estresse do dia grudou em você",
    description: "Mesmo depois de chegar em casa, relaxar no sofá, tomar banho... essa sensação de tensão não sai das suas costas. É como se você carregasse o peso do dia todo até na cama.",
    color: "text-orange-400",
    stat: "Corpo em alerta",
    impact: "Impede relaxamento"
  },
  {
    icon: Clock,
    title: "Seus horários viraram uma bagunça",
    description: "Cada dia você dorme num horário. Hoje 1h, amanhã 3h, fim de semana meio-dia... Seu corpo não entende mais quando é hora de dormir. Virou uma loteria.",
    color: "text-purple-400",
    stat: "Ritmo perdido",
    impact: "Confunde o corpo"
  }
];

export function ProblemSection() {
  return (
    <section id="problema" className="py-20 bg-black relative overflow-hidden">
      <FloatingClouds />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
                Eu Sei Como Você Se Sente...
              </h2>
              <div className="bg-gradient-to-br from-[var(--warm-accent)]/10 to-[var(--accent-blue)]/10 border border-[var(--warm-accent)]/30 rounded-2xl p-6 sm:p-8">
                <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-4">
                  É 2 da manhã e você está ali, deitado na cama, olhando para o teto... 
                </p>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-4">
                  Seu corpo está cansado, mas sua mente não para. Você fica pensando: <em className="text-[var(--warm-accent)]">"Por que eu não consigo simplesmente... dormir?"</em>
                </p>
                <p className="text-base text-[var(--text-muted)] leading-relaxed">
                  Não é culpa sua. Você não "esqueceu" como dormir. O mundo moderno meio que roubou isso de nós.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[var(--success-green)]/10 to-[var(--accent-blue)]/10 border border-[var(--success-green)]/30 rounded-xl p-6">
              <p className="text-[var(--text-secondary)] leading-relaxed">
                💙 Se você chegou até aqui, é porque está cansado de passar as noites em claro. E eu quero te ajudar a resolver isso de uma vez por todas.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-12">
          <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-4">
            Talvez Você Também Passe Por Essas Situações...
          </h3>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            São coisas do dia a dia que, sem perceber, sabotam completamente nossa noite de sono:
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
        
        {/* Mensagem de esperança */}
        <div className="text-center mt-16">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-[var(--success-green)]/10 to-[var(--accent-blue)]/10 border border-[var(--success-green)]/30 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              🤗 Se você se reconheceu em alguma dessas situações...
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Saiba que não há nada de errado com você. Esses são problemas do mundo moderno, não defeitos seus.
            </p>
            <p className="text-[var(--accent-blue)] font-medium">
              E o mais importante: tudo isso tem solução. É só você aprender a "reprogramar" seu sono com as técnicas certas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}