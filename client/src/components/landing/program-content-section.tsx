import { useState } from "react";
import { ChevronDown, ChevronRight, Moon, Sparkles, Heart, Flower2 } from "lucide-react";

const programPhases = [
  {
    id: 1,
    title: "FASE 1 - Preparação e Quebra de Hábitos",
    period: "Dias 1 a 7",
    icon: Moon,
    color: "from-blue-500/20 to-cyan-500/10",
    borderColor: "border-blue-400/30",
    iconColor: "text-blue-400",
    content: [
      {
        day: "Noite 1",
        title: "Corte o Ciclo",
        description: "Interromper os gatilhos que sabotam o sono. Evite Telas Digitais pelo menos 1 hora antes de dormir."
      },
      {
        day: "Noite 2",
        title: "Respiração Kōan",
        description: "Ativar o sistema parassimpático e reduzir a ansiedade. Técnica 4-7-8 para preparação para o sono."
      },
      {
        day: "Noite 3",
        title: "Banho de Energia",
        description: "Transforme seu banho em um ritual de relaxamento profundo para o sono com água quente e respiração consciente."
      },
      {
        day: "Noite 4",
        title: "O Silêncio Interno",
        description: "Cessar o ruído mental e criar um ambiente propício para a paz interior e o sono profundo."
      },
      {
        day: "Noite 5",
        title: "Técnica Yin-Yang",
        description: "Harmonizar corpo e mente para um sono profundo e restaurador, equilibrando a energia do dia."
      },
      {
        day: "Noite 6",
        title: "Mantra do Desapego",
        description: "Silenciar a mente por meio da repetição. Escolha um mantra significativo para liberar preocupações."
      },
      {
        day: "Noite 7",
        title: "Renascimento Matinal",
        description: "Consolidar o novo ciclo. Após seis noites de reeducação do seu sono, foque em como você começa o dia."
      }
    ]
  },
  {
    id: 2,
    title: "FASE 2 - Ritualização e Técnicas Corporais",
    period: "Dias 8 a 14",
    icon: Sparkles,
    color: "from-purple-500/20 to-violet-500/10",
    borderColor: "border-purple-400/30",
    iconColor: "text-purple-400",
    content: [
      {
        day: "Dia 8",
        title: "Aromaterapia Noturna",
        description: "Use aromaterapia para preparar sua mente e corpo para o sono. Adicione 4 a 6 gotas de óleo essencial."
      },
      {
        day: "Dia 9",
        title: "Chá Calmante",
        description: "Prepare um chá de camomila ou capim-limão 40 minutos antes de deitar para sinalizar ao seu corpo que é hora de relaxar."
      },
      {
        day: "Dia 10",
        title: "Escalda-pés Relaxante",
        description: "Prepare um escalda-pés com água morna para alívio imediato da tensão e preparação para o sono."
      },
      {
        day: "Dia 11",
        title: "Alongamento Yin",
        description: "Prática de alongamentos suaves antes de dormir para relaxar o corpo e a mente."
      },
      {
        day: "Dia 12",
        title: "Música 432Hz",
        description: "Coloque uma playlist de músicas na frequência 432Hz por 20 minutos antes de dormir para criar um ambiente harmonioso."
      },
      {
        day: "Dia 13",
        title: "Banho de Luz Suave",
        description: "Prepare seu quarto 30 minutos antes de dormir com luz suave para estimular a produção natural de melatonina."
      },
      {
        day: "Dia 14",
        title: "Gratidão Noturna",
        description: "Registro sincero antes de deitar. Escreva 3 coisas pelas quais você foi grato no dia."
      }
    ]
  },
  {
    id: 3,
    title: "FASE 3 - Respiração e Mindfulness",
    period: "Dias 15 a 21",
    icon: Heart,
    color: "from-emerald-500/20 to-green-500/10",
    borderColor: "border-emerald-400/30",
    iconColor: "text-emerald-400",
    content: [
      {
        day: "Dia 15",
        title: "Respiração Alternada (Nadi Shodhana)",
        description: "Técnica milenar de pranayama que acalma a mente, purifica os canais de energia e prepara o corpo para o descanso."
      },
      {
        day: "Dia 16",
        title: "Escaneamento Corporal",
        description: "Deite-se confortavelmente e feche os olhos. Encontre uma posição relaxada que permita que seu corpo se entregue."
      },
      {
        day: "Dia 17",
        title: "Mantra Pessoal",
        description: "Crie seu mantra. Formule uma frase curta e positiva que transmita calma e segurança."
      },
      {
        day: "Dia 18",
        title: "Diário da Noite",
        description: "Libere suas preocupações. Anote em um caderno todas as preocupações ou tarefas que ocupam sua mente."
      },
      {
        day: "Dia 19",
        title: "Técnica dos 5 Sentidos",
        description: "Prepare-se para o sono ancorando sua mente no presente com este exercício simples de mindfulness."
      },
      {
        day: "Dia 20",
        title: "Relaxamento Muscular Progressivo",
        description: "Prepare-se para relaxar. Deite-se confortavelmente em uma posição relaxada, permitindo que seu corpo se entregue."
      },
      {
        day: "Dia 21",
        title: "Visualização Guiada",
        description: "Crie seu cenário. Feche os olhos e imagine um lugar seguro e tranquilo, como uma praia ao pôr do sol."
      }
    ]
  },
  {
    id: 4,
    title: "FASE 4 - Consolidação e Ambiente Ideal",
    period: "Dias 22 a 30",
    icon: Flower2,
    color: "from-amber-500/20 to-orange-500/10",
    borderColor: "border-amber-400/30",
    iconColor: "text-amber-400",
    content: [
      {
        day: "Dia 22",
        title: "Caminhada Leve no Fim da Tarde",
        description: "Atividade física suave ao entardecer para reduzir o estresse acumulado e preparar o corpo para um sono reparador."
      },
      {
        day: "Dia 23",
        title: "Relaxamento Muscular Progressivo: Tensão Zero, Sono Total",
        description: "Liberar a tensão física por etapas, promovendo uma consciência profunda do seu corpo e um relaxamento completo."
      },
      {
        day: "Dia 24",
        title: "Sons da Natureza: O Embalar para o Sono Profundo",
        description: "Integre os sons relaxantes da natureza na sua rotina noturna para criar uma atmosfera que acalma a mente."
      },
      {
        day: "Dia 25",
        title: "Alimentação Amiga do Sono",
        description: "Certos nutrientes são fundamentais para a produção de hormônios como melatonina e serotonina, essenciais para induzir um sono reparador."
      },
      {
        day: "Dia 26",
        title: "O Poder da Luz Matinal para o Seu Sono",
        description: "A exposição solar pela manhã é uma ferramenta natural poderosa para sincronizar seu relógio biológico."
      },
      {
        day: "Dia 27",
        title: "Ritual Personalizado: Sua Fórmula Definitiva",
        description: "Agora que você experimentou diversas técnicas de relaxamento e preparação para o sono, é o momento de integrá-las."
      },
      {
        day: "Dia 30",
        title: "Seu Novo Sono Começa Agora!",
        description: "Você embarcou em uma jornada de 30 dias para transformar seu sono, e o resultado vai além de noites mais tranquilas."
      }
    ]
  }
];

export function ProgramContentSection() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  const togglePhase = (phaseId: number) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--dark-bg)] via-[var(--card-bg)] to-[var(--dark-bg)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--accent-blue)]/30 to-[var(--celestial-blue)]/30 rounded-2xl mb-6 backdrop-blur-sm border border-[var(--accent-blue)]/20">
            <Moon className="w-8 h-8 text-[var(--accent-blue)]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            O que você vai encontrar no{" "}
            <span className="bg-gradient-to-r from-[var(--accent-blue)] via-[var(--celestial-blue)] to-[var(--accent-blue)] bg-clip-text text-transparent">
              Sono Zen
            </span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Um programa completo de 30 dias, dividido em 4 fases estruturadas para transformar 
            completamente sua qualidade de sono e bem-estar.
          </p>
        </div>

        {/* Program Phases */}
        <div className="space-y-6">
          {programPhases.map((phase) => {
            const Icon = phase.icon;
            const isExpanded = expandedPhase === phase.id;
            
            return (
              <div
                key={phase.id}
                className={`bg-gradient-to-br ${phase.color} rounded-3xl border ${phase.borderColor} backdrop-blur-lg overflow-hidden transition-all duration-500 hover:shadow-2xl`}
              >
                {/* Phase Header */}
                <div
                  className="p-6 sm:p-8 cursor-pointer"
                  onClick={() => togglePhase(phase.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${phase.color} rounded-xl flex items-center justify-center border ${phase.borderColor}`}>
                        <Icon className={`w-6 h-6 ${phase.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                          {phase.title}
                        </h3>
                        <p className={`text-sm ${phase.iconColor} font-medium`}>
                          {phase.period}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronDown className="w-6 h-6 text-white transition-transform duration-300" />
                      ) : (
                        <ChevronRight className="w-6 h-6 text-white transition-transform duration-300" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Phase Content */}
                {isExpanded && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <div className="border-t border-white/10 pt-6">
                      <div className="grid gap-4">
                        {phase.content.map((item, index) => (
                          <div
                            key={index}
                            className="bg-black/20 rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-black/30 transition-all duration-300"
                          >
                            <div className="flex items-start gap-4">
                              <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-br ${phase.color} rounded-lg flex items-center justify-center text-xs font-bold ${phase.iconColor} border ${phase.borderColor}`}>
                                {item.day.includes('Dia') ? item.day.replace('Dia ', '') : index + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-lg font-semibold text-white mb-2">
                                  {item.day}: {item.title}
                                </h4>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-[var(--accent-blue)]/10 via-[var(--warm-accent)]/5 to-[var(--accent-blue)]/8 rounded-3xl p-8 border border-[var(--accent-blue)]/30 backdrop-blur-lg">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Pronto para Transformar seu Sono?
            </h3>
            <p className="text-[var(--text-secondary)] text-lg mb-6 max-w-2xl mx-auto">
              Mais de 30 técnicas comprovadas, organizadas em um sistema passo a passo 
              para você dormir melhor a partir da primeira noite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                30 dias de conteúdo estruturado
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Técnicas baseadas em ciência
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                Resultados desde a primeira noite
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}