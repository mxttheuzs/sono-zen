import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Wind, Moon, Home, Headphones, CheckCircle, Brain, Clock, Shield, Target, Star, Heart } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";

const ebookContents = [
  {
    icon: Brain,
    title: "Os 5 Segredos do Sono Oriental",
    description: "Descubra as técnicas milenares usadas por mestres orientais para adormecer em minutos. Aprenda sobre os pontos de pressão, a respiração 4-7-8 e como ativar seu sistema nervoso parassimpático naturalmente.",
    highlight: "Métodos ancestrais",
    stats: "Funciona em 15 min",
    details: ["Técnica de respiração 4-7-8", "Pontos de acupressão para relaxamento", "Postura corporal ideal", "Mantras e visualizações"]
  },
  {
    icon: Clock,
    title: "Cronograma Dia-a-Dia das 7 Noites",
    description: "Um plano detalhado com horários exatos do que fazer a cada dia. Desde preparação mental às 18h até rituais específicos antes de deitar. Cada noite tem um foco diferente para reprogramar seu sono.",
    highlight: "Plano estruturado",
    stats: "Resultados desde a 1ª noite",
    details: ["Horários específicos para cada atividade", "Rituais personalizados por noite", "Progressão gradual de técnicas", "Checklist diário de acompanhamento"]
  },
  {
    icon: Shield,
    title: "Protocolo Anti-Ansiedade Noturna",
    description: "Elimine completamente os pensamentos acelerados na hora de dormir. Técnicas específicas para acalmar a mente hiperativa, incluindo o método '5-4-3-2-1' e exercícios de mindfulness especializados.",
    highlight: "Mente tranquila",
    stats: "Reduz ansiedade em 80%",
    details: ["Método 5-4-3-2-1 para ansiedade", "Técnicas de mindfulness noturno", "Como parar pensamentos em loop", "Exercícios de relaxamento muscular"]
  },
  {
    icon: Target,
    title: "Transformação Completa do Quarto",
    description: "O guia definitivo para criar o santuário perfeito do sono. Temperatura ideal (16-19°C), iluminação adequada, aromaterapia com óleos específicos e como eliminar todos os distúrbios do ambiente.",
    highlight: "Ambiente otimizado",
    stats: "Melhora qualidade em 90%",
    details: ["Configuração ideal de temperatura", "Guia de aromaterapia para sono", "Eliminação de ruídos e luzes", "Escolha de travesseiro e colchão"]
  },
  {
    icon: Headphones,
    title: "Frequências Sonoras Terapêuticas",
    description: "Acesso exclusivo a áudios com frequências específicas (432Hz, binaural beats) que sincronizam suas ondas cerebrais para o sono profundo. Inclui sons da natureza e mantras orientais.",
    highlight: "Sons curativos",
    stats: "Acelera sono em 70%",
    details: ["Frequências 432Hz e binaural beats", "Sons da natureza personalizados", "Mantras orientais autênticos", "Playlist de 60 minutos"]
  },
  {
    icon: Heart,
    title: "Nutrição e Suplementação Natural",
    description: "Descubra quais alimentos e chás potencializam seu sono naturalmente. Lista completa de suplementos naturais, horários ideais para cada um e receitas de bebidas relaxantes orientais.",
    highlight: "Nutrição para o sono",
    stats: "Melhora em 85%",
    details: ["Lista de alimentos que induzem sono", "Receitas de chás relaxantes", "Suplementos naturais seguros", "Horários ideais para cada nutriente"]
  }
];



export function EbookContentSection() {
  return (
    <section id="conteudo-ebook" className="py-20 bg-black relative overflow-hidden">
      <FloatingClouds />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {ebookContents.map((content, index) => (
            <div key={index} className="group relative backdrop-blur-sm bg-transparent border-2 border-[var(--accent-blue)]/20 hover:border-[var(--accent-blue)]/40 rounded-3xl p-6 sm:p-8 animate-scale-in hover:shadow-xl hover:shadow-[var(--accent-blue)]/10 transition-all duration-300 animate-magnetic-hover" style={{animationDelay: `${index * 0.15}s`}}>
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-2xl bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20 flex-shrink-0 backdrop-blur-sm" style={{animationDelay: `${index * 0.2 + 0.3}s`}}>
                    <content.icon className="h-8 w-8 text-[var(--accent-blue)]" />
                  </div>
                  <div className="space-y-3 flex-1">
                    <h3 className="font-heading font-semibold text-xl text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors mb-3 animate-text-focus">
                      {content.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed mb-3 animate-fade-in-up" style={{animationDelay: `${index * 0.1 + 0.4}s`}}>
                      {content.description}
                    </p>
                    <div className="flex items-center justify-between mt-4 animate-scale-in" style={{animationDelay: `${index * 0.1 + 0.6}s`}}>
                      <span className="text-sm font-semibold text-[var(--accent-blue)] bg-[var(--accent-blue)]/10 px-4 py-2 rounded-xl border border-[var(--accent-blue)]/20 backdrop-blur-sm animate-shimmer">
                        {content.highlight}
                      </span>
                      <span className="text-xs text-[var(--accent-blue)] font-medium bg-[var(--accent-blue)]/10 px-3 py-1 rounded-lg backdrop-blur-sm animate-float-on-hover">
                        {content.stats}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Detailed Content List */}
                <div className="space-y-3 mt-6 pt-6 border-t border-[var(--accent-blue)]/20">
                  <h4 className="text-sm font-semibold text-[var(--warm-accent)] mb-3">✨ O que você vai descobrir:</h4>
                  <div className="space-y-2">
                    {content.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-3 animate-fade-in-up" style={{animationDelay: `${index * 0.1 + detailIndex * 0.1 + 0.8}s`}}>
                        <div className="w-2 h-2 bg-[var(--success-green)] rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-[var(--text-secondary)] leading-relaxed">{detail}</span>
                      </div>
                    ))}
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