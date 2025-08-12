import { useState } from "react";
import { ChevronLeft, ChevronRight, Moon } from "lucide-react";
import phase1Image from "@assets/fase1-preparacao-quebra-habitos.png";
import phase2Image from "@assets/fase2-ritualizacao-tecnicas-corporais.png";
import phase3Image from "@assets/fase3-respiracao-mindfulness.png";
import phase4Image from "@assets/fase4-consolidacao-ambiente-ideal.png";

const programPhases = [
  {
    id: 1,
    title: "FASE 1 - Preparação e Quebra de Hábitos",
    period: "Dias 1 a 7",
    image: phase1Image,
    description: "Aprenda a quebrar os hábitos que prejudicam seu sono e estabeleça uma rotina noturna eficaz."
  },
  {
    id: 2,
    title: "FASE 2 - Ritualização e Técnicas Corporais",
    period: "Dias 8 a 14",
    image: phase2Image,
    description: "Desenvolva rituais relaxantes e técnicas corporais para preparar seu corpo para o sono profundo."
  },
  {
    id: 3,
    title: "FASE 3 - Respiração e Mindfulness",
    period: "Dias 15 a 21",
    image: phase3Image,
    description: "Domine técnicas avançadas de respiração e mindfulness para acalmar a mente antes de dormir."
  },
  {
    id: 4,
    title: "FASE 4 - Consolidação e Ambiente Ideal",
    period: "Dias 22 a 30",
    image: phase4Image,
    description: "Consolide todos os aprendizados e crie o ambiente ideal para um sono reparador e duradouro."
  }
];

export function ProgramContentSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % programPhases.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + programPhases.length) % programPhases.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="program-content" className="py-16 sm:py-24 relative overflow-hidden">
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

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Carousel */}
          <div className="bg-gradient-to-br from-[var(--accent-blue)]/10 via-[var(--warm-accent)]/5 to-[var(--accent-blue)]/8 rounded-3xl border border-[var(--accent-blue)]/30 backdrop-blur-lg overflow-hidden">
            <div className="relative">
              {/* Image Display */}
              <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
                <img
                  src={programPhases[currentSlide].image}
                  alt={programPhases[currentSlide].title}
                  className="w-full h-full object-contain bg-white rounded-2xl"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>


            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-3">
            {programPhases.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-[var(--accent-blue)] scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Phase Navigation */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {programPhases.map((phase, index) => (
              <button
                key={phase.id}
                onClick={() => goToSlide(index)}
                className={`p-4 rounded-2xl border transition-all duration-300 text-left ${
                  index === currentSlide
                    ? 'bg-[var(--accent-blue)]/20 border-[var(--accent-blue)]/50 shadow-lg'
                    : 'bg-black/20 border-white/10 hover:bg-black/30 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border ${
                    index === currentSlide
                      ? 'bg-[var(--accent-blue)]/30 text-[var(--accent-blue)] border-[var(--accent-blue)]/40'
                      : 'bg-white/10 text-white/70 border-white/20'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`text-xs font-medium ${
                    index === currentSlide ? 'text-[var(--accent-blue)]' : 'text-white/60'
                  }`}>
                    {phase.period}
                  </span>
                </div>
                <h4 className={`text-sm font-semibold mb-1 ${
                  index === currentSlide ? 'text-white' : 'text-white/80'
                }`}>
                  Fase {phase.id}
                </h4>
                <p className={`text-xs ${
                  index === currentSlide ? 'text-white/90' : 'text-white/60'
                }`}>
                  {phase.title.split(' - ')[1]}
                </p>
              </button>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}