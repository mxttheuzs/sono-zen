import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Wind, Moon, Home, Headphones, CheckCircle, Brain, Clock, Shield, Target, Star, Heart } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";

const ebookContents = [
  {
    icon: Brain,
    title: "Como Funciona o Sono Oriental",
    description: "Aprenda como técnicas antigas ajudam seu cérebro a relaxar naturalmente. Sem remédios, apenas métodos que funcionam há milhares de anos.",
    highlight: "Método natural",
    stats: "94% de sucesso"
  },
  {
    icon: Clock,
    title: "Plano de 7 Noites",
    description: "Sistema simples que ensina seu corpo a dormir melhor. Pequenos passos todos os dias que transformam seu sono em uma semana.",
    highlight: "7 dias",
    stats: "Resultados rápidos"
  },
  {
    icon: Shield,
    title: "Técnicas para Relaxar",
    description: "Formas fáceis de respirar, posições do corpo e preparo da mente que fazem você relaxar de verdade e dormir profundamente.",
    highlight: "Fácil de fazer",
    stats: "3x mais eficaz"
  },
  {
    icon: Target,
    title: "Ambiente Perfeito para Dormir",
    description: "Como preparar seu quarto para o sono ideal: temperatura certa, luz adequada, aromas relaxantes e sons que ajudam você a dormir.",
    highlight: "Seu quarto ideal",
    stats: "Ambiente perfeito"
  }
];

const extras = [
  {
    title: "Guia Prático Completo",
    description: "Listas simples e calendário para seguir o método"
  },
  {
    title: "Receitas Naturais",
    description: "Chás, óleos e aromas que ajudam a relaxar"
  },
  {
    title: "Socorro para Noites Difíceis",
    description: "Técnicas rápidas quando não conseguir dormir"
  },
  {
    title: "Por Que Funciona",
    description: "Explicações simples sobre cada técnica"
  }
];

export function EbookContentSection() {
  return (
    <section id="conteudo-ebook" className="py-20 bg-black relative overflow-hidden">
      <FloatingClouds />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--accent-blue)]/20 to-[var(--warm-accent)]/20 border border-[var(--accent-blue)]/30 flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
            <BookOpen className="h-10 w-10 text-[var(--accent-blue)]" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-8">
            O Que Você Vai Aprender
            <span className="block bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] bg-clip-text text-transparent">
              no Sono Zen
            </span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-4xl mx-auto leading-relaxed mb-4">
            <strong className="text-[var(--text-primary)]">Sono Zen</strong> ensina métodos simples e naturais para você dormir melhor
          </p>
          <div className="flex justify-center items-center space-x-8 text-base text-[var(--text-secondary)]">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[var(--accent-blue)] rounded-full mr-3"></div>
              <span className="font-medium">Metodologia validada</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[var(--success-green)] rounded-full mr-3"></div>
              <span className="font-medium">Resultados em 7 dias</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {ebookContents.map((content, index) => (
            <div key={index} className="group relative backdrop-blur-sm bg-transparent border-2 border-[var(--accent-blue)]/20 hover:border-[var(--accent-blue)]/40 rounded-3xl p-6 sm:p-8 animate-scale-in hover:shadow-xl hover:shadow-[var(--accent-blue)]/10 transition-all duration-300 animate-magnetic-hover" style={{animationDelay: `${index * 0.15}s`}}>
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20 flex-shrink-0 backdrop-blur-sm animate-bounce-gentle animate-glow-pulse" style={{animationDelay: `${index * 0.2 + 0.3}s`}}>
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
            </div>
          ))}
        </div>

        {/* Extras Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--warm-accent)]/10 to-[var(--accent-blue)]/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-md border border-slate-700/40 rounded-3xl p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--warm-accent)]/20 to-[var(--accent-blue)]/20 border border-[var(--warm-accent)]/30 px-6 py-3 rounded-full mb-6">
                <div className="w-2 h-2 bg-[var(--warm-accent)] rounded-full"></div>
                <span className="text-[var(--warm-accent)] font-bold text-lg">Bônus Exclusivos</span>
                <div className="w-2 h-2 bg-[var(--warm-accent)] rounded-full"></div>
              </div>
              <h3 className="font-heading text-3xl font-bold text-white mb-4">
                Ganhe Mais Estes Materiais
                <span className="block text-xl text-[var(--accent-blue)] font-normal mt-2">
                  Tudo incluso sem custo extra
                </span>
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {extras.map((extra, index) => (
                <div key={index} className="group relative backdrop-blur-sm bg-transparent border-2 border-[var(--accent-blue)]/15 hover:border-[var(--accent-blue)]/30 rounded-2xl p-6 transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[var(--success-green)]/10 border border-[var(--success-green)]/20 backdrop-blur-sm animate-bounce-gentle" style={{animationDelay: `${index * 0.1 + 0.2}s`}}>
                      <CheckCircle className="h-6 w-6 text-[var(--success-green)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-2 group-hover:text-[var(--accent-blue)] transition-colors animate-text-focus">
                        {extra.title}
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {extra.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="mt-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-blue)]/10 to-[var(--warm-accent)]/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-md border border-slate-700/40 rounded-3xl p-10 max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--accent-blue)]/20 to-[var(--warm-accent)]/20 border border-[var(--accent-blue)]/30 px-6 py-3 rounded-full mb-6">
                  <Target className="h-5 w-5 text-[var(--accent-blue)]" />
                  <span className="text-[var(--accent-blue)] font-bold text-lg">Perfeito Para Você</span>
                </div>
                <h3 className="font-heading text-3xl font-bold text-white mb-4">
                  Este Método É Ideal Se Você:
                  <span className="block text-xl text-[var(--warm-accent)] font-normal mt-2">
                    Identifica-se com alguma dessas situações?
                  </span>
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="group relative backdrop-blur-sm bg-transparent border-2 border-[var(--success-green)]/15 hover:border-[var(--success-green)]/30 rounded-2xl p-6 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                    <div className="flex items-center gap-5">
                      <div className="p-3 rounded-xl bg-[var(--success-green)]/10 border border-[var(--success-green)]/20 flex-shrink-0 backdrop-blur-sm">
                        <CheckCircle className="h-6 w-6 text-[var(--success-green)]" />
                      </div>
                      <span className="text-white font-semibold text-lg leading-relaxed">Fica rolando na cama por horas sem conseguir dormir</span>
                    </div>
                  </div>
                  
                  <div className="group relative backdrop-blur-sm bg-transparent border-2 border-[var(--success-green)]/15 hover:border-[var(--success-green)]/30 rounded-2xl p-6 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    <div className="flex items-center gap-5">
                      <div className="p-3 rounded-xl bg-[var(--success-green)]/10 border border-[var(--success-green)]/20 flex-shrink-0 backdrop-blur-sm">
                        <CheckCircle className="h-6 w-6 text-[var(--success-green)]" />
                      </div>
                      <span className="text-white font-semibold text-lg leading-relaxed">Acorda cansado mesmo dormindo a noite toda</span>
                    </div>
                  </div>
                  
                  <div className="group relative backdrop-blur-sm bg-transparent border-2 border-[var(--success-green)]/15 hover:border-[var(--success-green)]/30 rounded-2xl p-6 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                    <div className="flex items-center gap-5">
                      <div className="p-3 rounded-xl bg-[var(--success-green)]/10 border border-[var(--success-green)]/20 flex-shrink-0 backdrop-blur-sm">
                        <CheckCircle className="h-6 w-6 text-[var(--success-green)]" />
                      </div>
                      <span className="text-white font-semibold text-lg leading-relaxed">Sente ansiedade na hora de dormir</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="group relative backdrop-blur-sm bg-transparent border-2 border-[var(--success-green)]/15 hover:border-[var(--success-green)]/30 rounded-2xl p-6 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                    <div className="flex items-center gap-5">
                      <div className="p-3 rounded-xl bg-[var(--success-green)]/10 border border-[var(--success-green)]/20 flex-shrink-0 backdrop-blur-sm">
                        <CheckCircle className="h-6 w-6 text-[var(--success-green)]" />
                      </div>
                      <span className="text-white font-semibold text-lg leading-relaxed">Quer parar de depender de remédios para dormir</span>
                    </div>
                  </div>
                  
                  <div className="group relative backdrop-blur-sm bg-transparent border-2 border-[var(--success-green)]/15 hover:border-[var(--success-green)]/30 rounded-2xl p-6 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                    <div className="flex items-center gap-5">
                      <div className="p-3 rounded-xl bg-[var(--success-green)]/10 border border-[var(--success-green)]/20 flex-shrink-0 backdrop-blur-sm">
                        <CheckCircle className="h-6 w-6 text-[var(--success-green)]" />
                      </div>
                      <span className="text-white font-semibold text-lg leading-relaxed">Busca mais energia e disposição no dia a dia</span>
                    </div>
                  </div>
                  
                  <div className="group relative backdrop-blur-sm bg-transparent border-2 border-[var(--success-green)]/15 hover:border-[var(--success-green)]/30 rounded-2xl p-6 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                    <div className="flex items-center gap-5">
                      <div className="p-3 rounded-xl bg-[var(--success-green)]/10 border border-[var(--success-green)]/20 flex-shrink-0 backdrop-blur-sm">
                        <CheckCircle className="h-6 w-6 text-[var(--success-green)]" />
                      </div>
                      <span className="text-white font-semibold text-lg leading-relaxed">Quer uma solução natural e sem efeitos colaterais</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--warm-accent)]/10 to-[var(--accent-blue)]/10 border border-[var(--warm-accent)]/20 px-6 py-3 rounded-xl">
                  <div className="w-3 h-3 bg-[var(--warm-accent)] rounded-full animate-pulse"></div>
                  <span className="text-slate-300 font-medium">Se você se identificou, este método foi feito para você!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}