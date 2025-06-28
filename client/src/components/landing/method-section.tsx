import { Card, CardContent } from "@/components/ui/card";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import { Wind, Moon, Home } from "lucide-react";

const foundations = [
  {
    icon: Wind,
    title: "Respiração Milenar",
    description: "Técnicas de respiração ajudam a desacelerar o coração, reduzir a ansiedade e silenciar os pensamentos. Em minutos, seu corpo entende que pode desligar.",
    number: "1"
  },
  {
    icon: Moon,
    title: "Ritual Noturno",
    description: "Crie um pequeno ritual de 15 a 20 minutos antes de dormir. Ele ensina seu cérebro que o dia acabou — e que agora é hora de relaxar.",
    number: "2"
  },
  {
    icon: Home,
    title: "Ambiente Yin",
    description: "Seu quarto deve ser um lugar de calma e silêncio. Ajuste luz, som, temperatura e cheiro para que o ambiente ajude seu sono.",
    number: "3"
  }
];

export function MethodSection() {
  return (
    <section id="metodo" className="py-20 bg-black relative overflow-hidden">
      {/* Floating clouds for peaceful atmosphere */}
      <FloatingClouds className="opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
                O Método Sono Zen: Dormir É
                <span className="block bg-gradient-to-r from-[var(--accent-blue)] to-[var(--warm-accent)] bg-clip-text text-transparent">
                  Um Ritual
                </span>
              </h2>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
                Você não precisa dormir melhor por sorte. Você pode dormir melhor <span className="text-[var(--accent-blue)] font-semibold">por escolha</span>.
              </p>
              <p className="text-base text-[var(--text-muted)]">
                Isso começa com uma mudança simples: Encarar o sono como um ritual, e não como uma obrigação.
              </p>
            </div>
            
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>Enquanto muita gente apenas "deita na cama e espera o sono vir", os orientais tratam o sono como algo sagrado — um momento de reconexão, equilíbrio e cura.</p>
              <p className="text-[var(--accent-blue)] font-medium">
                O Sono Zen é um método leve, natural e inspirado em práticas orientais milenares, baseado em rotinas simples que ajudam seu corpo a entender que chegou a hora de descansar de verdade.
              </p>
            </div>
          </div>
          
          {/* Right image - Meditation SVG */}
          <div className="relative">
            <div className="card-modern p-8 animate-slide-up">
              <svg viewBox="0 0 500 400" className="w-full h-auto">
                {/* Background */}
                <rect width="500" height="400" fill="url(#meditationBg)" />
                
                {/* Person meditating */}
                <ellipse cx="250" cy="350" rx="80" ry="20" fill="rgba(0,0,0,0.1)" />
                
                {/* Body */}
                <path d="M250 200 Q240 220 230 250 Q235 280 250 300 Q265 280 270 250 Q260 220 250 200" 
                      fill="url(#bodyGradient)" />
                
                {/* Arms in meditation pose */}
                <ellipse cx="220" cy="260" rx="15" ry="30" fill="url(#bodyGradient)" transform="rotate(-20 220 260)" />
                <ellipse cx="280" cy="260" rx="15" ry="30" fill="url(#bodyGradient)" transform="rotate(20 280 260)" />
                
                {/* Head */}
                <circle cx="250" cy="180" r="25" fill="url(#bodyGradient)" />
                
                {/* Hair */}
                <path d="M225 165 Q250 150 275 165 Q270 170 250 175 Q230 170 225 165" 
                      fill="rgba(60, 60, 80, 0.8)" />
                
                {/* Meditation aura */}
                <circle cx="250" cy="200" r="120" fill="none" stroke="url(#auraGradient)" strokeWidth="2" opacity="0.6">
                  <animate attributeName="r" values="120;140;120" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0.3;0.6" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="250" cy="200" r="90" fill="none" stroke="url(#auraGradient2)" strokeWidth="1" opacity="0.4">
                  <animate attributeName="r" values="90;110;90" dur="3s" repeatCount="indefinite" />
                </circle>
                
                {/* Floating elements around */}
                <circle cx="150" cy="120" r="3" fill="rgba(135, 206, 250, 0.8)">
                  <animate attributeName="cy" values="120;110;120" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="350" cy="140" r="2" fill="rgba(255, 215, 120, 0.9)">
                  <animate attributeName="cy" values="140;130;140" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="180" cy="80" r="2.5" fill="rgba(255, 255, 255, 0.7)">
                  <animate attributeName="cy" values="80;70;80" dur="3s" repeatCount="indefinite" />
                </circle>
                
                <defs>
                  <linearGradient id="meditationBg" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(25, 25, 35, 1)" />
                    <stop offset="100%" stopColor="rgba(15, 15, 25, 1)" />
                  </linearGradient>
                  
                  <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(210, 180, 140, 0.9)" />
                    <stop offset="100%" stopColor="rgba(160, 140, 110, 1)" />
                  </linearGradient>
                  
                  <linearGradient id="auraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(135, 206, 250, 0.8)" />
                    <stop offset="100%" stopColor="rgba(255, 215, 120, 0.6)" />
                  </linearGradient>
                  
                  <linearGradient id="auraGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255, 215, 120, 0.6)" />
                    <stop offset="100%" stopColor="rgba(135, 206, 250, 0.4)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        
        {/* 3 Pillars */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-4">
              Os 3 Pilares do Sono Zen
            </h3>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Inspirado em técnicas orientais milenares, o Sono Zen vai te ajudar a:
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {foundations.map((foundation, index) => (
              <div key={index} className="card-dreamy p-8 text-center group animate-slide-up animate-breathe" 
                   style={{animationDelay: `${index * 0.2}s`}}>
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto blue-gradient rounded-2xl flex items-center justify-center mb-4">
                    <foundation.icon className="text-white h-8 w-8" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--warm-accent)] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {foundation.number}
                  </div>
                </div>
                <h4 className="font-heading font-semibold text-xl text-[var(--text-primary)] mb-4 group-hover:text-[var(--ritual-blue-light)] transition-colors">
                  {foundation.title}
                </h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {foundation.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
