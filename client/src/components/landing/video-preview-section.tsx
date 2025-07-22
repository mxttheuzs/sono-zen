import { BookOpen, Eye, Moon, Target, Brain, Heart } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import React from "react";
import ebookImage1 from "@assets/image_1753223301901.png";
import ebookImage2 from "@assets/image_1753223306678.png";
import ebookImage3 from "@assets/image_1753223315393.png";

export function VideoPreviewSection() {

  const scrollToCheckout = () => {
    const element = document.getElementById('preco');
    if (element) {
      // Calcular offset para compensar a navegação fixa
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="preview-ebook" className="py-20 bg-black relative overflow-hidden">
      <FloatingClouds />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/30 px-4 py-2 rounded-full mb-6">
            <BookOpen className="h-5 w-5 text-[var(--accent-blue)]" />
            <span className="text-[var(--accent-blue)] font-semibold">Ebook Interativo</span>
          </div>
          
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-6 px-2">
            Veja Por Dentro do{" "}
            <span className="bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--celestial-blue)] bg-clip-text text-transparent">
              Sono Zen
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto px-4">
            Um <strong>guia completo e prático</strong> que vai transformar sua relação com o sono através de técnicas comprovadas e um método único baseado na sabedoria oriental
          </p>
        </div>

        {/* Ebook Images Grid */}
        <div className="space-y-16">
          
          {/* Image 1 - Desperte o Poder do Seu Sono */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[var(--warm-accent)]/10 border border-[var(--warm-accent)]/30 px-3 py-1 rounded-full">
                <Moon className="h-4 w-4 text-[var(--warm-accent)]" />
                <span className="text-[var(--warm-accent)] text-sm font-medium">Capítulo 1</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight">
                Desperte o Poder do{" "}
                <span className="bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] bg-clip-text text-transparent">
                  Seu Sono
                </span>
              </h3>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                Descubra por que você não consegue dormir e como um método simples, natural e realista pode transformar suas noites para sempre.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[var(--accent-blue)] rounded-full"></div>
                  <span className="text-[var(--text-secondary)]">Entenda as verdadeiras causas da insônia</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[var(--accent-blue)] rounded-full"></div>
                  <span className="text-[var(--text-secondary)]">Aprenda técnicas orientais milenares adaptadas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[var(--accent-blue)] rounded-full"></div>
                  <span className="text-[var(--text-secondary)]">Crie um novo relacionamento com o sono</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={ebookImage1} 
                  alt="Desperte o Poder do Seu Sono - Primeira página do ebook Sono Zen"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Image 2 - Por Que Você Não Consegue Dormir? */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[var(--celestial-blue)]/10 border border-[var(--celestial-blue)]/30 px-3 py-1 rounded-full">
                <Brain className="h-4 w-4 text-[var(--celestial-blue)]" />
                <span className="text-[var(--celestial-blue)] text-sm font-medium">Diagnóstico</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight">
                Por Que Você{" "}
                <span className="bg-gradient-to-r from-[var(--celestial-blue)] to-[var(--warm-accent)] bg-clip-text text-transparent">
                  Não Consegue Dormir?
                </span>
              </h3>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                Identifique os verdadeiros bloqueios que estão sabotando seu sono e descubra soluções práticas para cada um deles.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-[var(--card-bg)]/30 border border-[var(--border-subtle)] rounded-xl p-4">
                  <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center mb-3">
                    <Brain className="h-4 w-4 text-pink-400" />
                  </div>
                  <h4 className="font-semibold text-[var(--text-primary)] mb-1">Mente Acelerada</h4>
                  <p className="text-[var(--text-secondary)] text-sm">Trabalho, redes sociais, tarefas...</p>
                </div>
                <div className="bg-[var(--card-bg)]/30 border border-[var(--border-subtle)] rounded-xl p-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
                    <Target className="h-4 w-4 text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-[var(--text-primary)] mb-1">Celular Atrapalha</h4>
                  <p className="text-[var(--text-secondary)] text-sm">Luz azul engana o cérebro</p>
                </div>
              </div>
            </div>
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={ebookImage2} 
                  alt="Por Que Você Não Consegue Dormir - Análise dos problemas do sono"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Image 3 - O Método Sono Zen */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/30 px-3 py-1 rounded-full">
                <Heart className="h-4 w-4 text-[var(--accent-blue)]" />
                <span className="text-[var(--accent-blue)] text-sm font-medium">Método Exclusivo</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight">
                O Método{" "}
                <span className="bg-gradient-to-r from-[var(--accent-blue)] via-[var(--celestial-blue)] to-[var(--warm-accent)] bg-clip-text text-transparent">
                  Sono Zen
                </span>
              </h3>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                Dormir é um ritual, não uma obrigação. Um método leve, natural e inspirado em práticas orientais milenares que funciona com seu corpo, não contra ele.
              </p>
              <div className="bg-gradient-to-br from-[var(--card-bg)]/50 to-[var(--card-bg)]/30 border border-[var(--border-subtle)] rounded-xl p-6">
                <h4 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                  <Moon className="h-5 w-5 text-[var(--accent-blue)]" />
                  O que você vai aprender:
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[var(--accent-blue)] rounded-full"></div>
                    <span className="text-[var(--text-secondary)] text-sm">Rotinas simples que ajudam seu corpo a entender que chegou a hora</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[var(--accent-blue)] rounded-full"></div>
                    <span className="text-[var(--text-secondary)] text-sm">Técnicas de respiração e relaxamento orientais</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[var(--accent-blue)] rounded-full"></div>
                    <span className="text-[var(--text-secondary)] text-sm">Como desacelerar a mente naturalmente</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={ebookImage3} 
                  alt="O Método Sono Zen - Dormir é Um Ritual"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-[var(--card-bg)]/50 to-[var(--card-bg)]/30 border border-[var(--border-subtle)] rounded-2xl p-8 max-w-2xl mx-auto">
            <BookOpen className="h-12 w-12 text-[var(--accent-blue)] mx-auto mb-4" />
            <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-4">
              Este é apenas o começo...
            </h3>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
              O ebook completo contém <strong>16 capítulos detalhados</strong> com técnicas práticas, exercícios guiados e um plano completo de 7 dias para transformar seu sono.
            </p>
            <button 
              onClick={scrollToCheckout}
              className="bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] hover:from-[var(--warm-accent)]/90 hover:to-[var(--accent-blue)]/90 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Quero Ter Acesso Completo
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}