import { Card, CardContent } from "@/components/ui/card";
import { Smile, Lightbulb, Heart, Clock, Feather } from "lucide-react";
import { StarryBackground } from "@/components/ui/starry-background";
import { FloatingClouds } from "@/components/ui/floating-clouds";

const benefits = [
  { 
    icon: Clock, 
    title: "Dormir mais rápido",
    description: "Adormeça em minutos"
  },
  { 
    icon: Heart, 
    title: "Menos despertares noturnos",
    description: "Sono contínuo e profundo"
  },
  { 
    icon: Smile, 
    title: "Acordar mais disposto",
    description: "Energia renovada pela manhã"
  }
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-20 bg-black relative overflow-hidden">
      {/* Starry background for dreamy atmosphere */}
      <StarryBackground className="opacity-40" />
      <FloatingClouds />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Morning Scene SVG */}
          <div className="relative">
            <div className="card-modern p-8 animate-slide-up">
              <svg viewBox="0 0 600 400" className="w-full h-auto rounded-lg">
                {/* Sky gradient */}
                <rect width="600" height="400" fill="url(#skyGradient)" />
                
                {/* Sun */}
                <circle cx="500" cy="80" r="40" fill="url(#sunGradient)">
                  <animate attributeName="r" values="40;42;40" dur="3s" repeatCount="indefinite" />
                </circle>
                
                {/* Sun rays */}
                <g stroke="rgba(255, 215, 120, 0.6)" strokeWidth="2" strokeLinecap="round">
                  <line x1="460" y1="40" x2="450" y2="30">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
                  </line>
                  <line x1="540" y1="40" x2="550" y2="30">
                    <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
                  </line>
                  <line x1="460" y1="120" x2="450" y2="130">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
                  </line>
                  <line x1="540" y1="120" x2="550" y2="130">
                    <animate attributeName="opacity" values="1;0.6;1" dur="2.5s" repeatCount="indefinite" />
                  </line>
                </g>
                
                {/* Window frame */}
                <rect x="50" y="50" width="300" height="200" fill="none" stroke="rgba(100, 100, 120, 0.8)" strokeWidth="4" rx="8" />
                <line x1="200" y1="50" x2="200" y2="250" stroke="rgba(100, 100, 120, 0.8)" strokeWidth="2" />
                <line x1="50" y1="150" x2="350" y2="150" stroke="rgba(100, 100, 120, 0.8)" strokeWidth="2" />
                
                {/* Curtains */}
                <path d="M50 50 Q70 70 50 90 Q70 110 50 130 Q70 150 50 170 Q70 190 50 210 Q70 230 50 250" 
                      stroke="rgba(180, 180, 200, 0.7)" strokeWidth="3" fill="none" />
                <path d="M350 50 Q330 70 350 90 Q330 110 350 130 Q330 150 350 170 Q330 190 350 210 Q330 230 350 250" 
                      stroke="rgba(180, 180, 200, 0.7)" strokeWidth="3" fill="none" />
                
                {/* Plant on windowsill */}
                <ellipse cx="120" cy="240" rx="25" ry="8" fill="rgba(139, 119, 101, 0.8)" />
                <path d="M120 230 Q110 210 105 200 Q115 205 120 230 Q125 205 135 200 Q130 210 120 230" 
                      fill="rgba(34, 139, 34, 0.8)" />
                
                {/* Person stretching (simplified silhouette) */}
                <ellipse cx="450" cy="350" rx="60" ry="15" fill="rgba(0,0,0,0.1)" />
                
                {/* Person body */}
                <ellipse cx="450" cy="280" rx="20" ry="40" fill="url(#personGradient)" />
                
                {/* Arms raised in stretch */}
                <ellipse cx="420" cy="250" rx="8" ry="25" fill="url(#personGradient)" transform="rotate(-30 420 250)" />
                <ellipse cx="480" cy="250" rx="8" ry="25" fill="url(#personGradient)" transform="rotate(30 480 250)" />
                
                {/* Head */}
                <circle cx="450" cy="230" r="18" fill="url(#personGradient)" />
                
                {/* Peaceful floating elements */}
                <circle cx="100" cy="300" r="2" fill="rgba(255, 255, 255, 0.8)">
                  <animate attributeName="cy" values="300;290;300" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.4;0.8" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="300" cy="320" r="1.5" fill="rgba(255, 215, 120, 0.9)">
                  <animate attributeName="cy" values="320;310;320" dur="2s" repeatCount="indefinite" />
                </circle>
                
                <defs>
                  <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(135, 206, 250, 0.3)" />
                    <stop offset="100%" stopColor="rgba(25, 25, 35, 1)" />
                  </linearGradient>
                  
                  <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(255, 215, 120, 1)" />
                    <stop offset="100%" stopColor="rgba(255, 140, 0, 0.8)" />
                  </radialGradient>
                  
                  <linearGradient id="personGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(210, 180, 140, 0.9)" />
                    <stop offset="100%" stopColor="rgba(160, 140, 110, 1)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          
          {/* Right content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
                Resultados em
                <span className="block bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] bg-clip-text text-transparent">
                  7 Noites
                </span>
              </h2>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
                Após aplicar o Método Sono Zen, você vai <span className="text-[var(--accent-blue)] font-semibold">retomar o prazer de dormir bem</span> e transformar suas noites.
              </p>
              <p className="text-base text-[var(--text-muted)]">
                Os resultados que você pode esperar:
              </p>
            </div>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-subtle)] hover:bg-[var(--card-hover)] transition-all animate-slide-up"
                     style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="w-12 h-12 rounded-xl blue-gradient flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">{benefit.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-r from-[var(--ritual-blue)]/10 to-[var(--warm-accent)]/10 border border-[var(--ritual-blue)]/20">
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed">
                Obrigado por ter chegado até aqui. Dormir bem é mais do que descansar. É cuidar da mente, do corpo e da sua energia vital. Ao aplicar o Método - Sono Zen, você já deu um passo valente em direção a uma vida mais equilibrada, presente e leve.
              </p>
              <p className="text-[var(--text-muted)] mt-3 text-sm">
                Desejo que suas noites sejam sempre profundas e restauradoras.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
