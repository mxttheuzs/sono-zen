import { FloatingClouds } from "@/components/ui/floating-clouds";

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
              <svg viewBox="0 0 600 500" className="w-full h-auto">
                {/* Background room with soft lighting */}
                <defs>
                  <linearGradient id="roomBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(30, 40, 60, 1)" />
                    <stop offset="50%" stopColor="rgba(20, 30, 50, 1)" />
                    <stop offset="100%" stopColor="rgba(15, 25, 45, 1)" />
                  </linearGradient>
                  
                  <linearGradient id="windowLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(200, 220, 255, 0.3)" />
                    <stop offset="100%" stopColor="rgba(150, 180, 220, 0.1)" />
                  </linearGradient>
                  
                  <linearGradient id="skinTone" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(220, 190, 160, 1)" />
                    <stop offset="100%" stopColor="rgba(190, 160, 130, 1)" />
                  </linearGradient>
                  
                  <linearGradient id="clothingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(180, 200, 220, 1)" />
                    <stop offset="100%" stopColor="rgba(140, 160, 180, 1)" />
                  </linearGradient>
                  
                  <linearGradient id="bedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(240, 240, 250, 1)" />
                    <stop offset="100%" stopColor="rgba(220, 220, 235, 1)" />
                  </linearGradient>
                  
                  <radialGradient id="candleGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(255, 200, 100, 0.8)" />
                    <stop offset="100%" stopColor="rgba(255, 150, 50, 0.2)" />
                  </radialGradient>
                  
                  <filter id="softGlow">
                    <feGaussianBlur stdDeviation="3" />
                    <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" />
                  </filter>
                </defs>
                
                {/* Room background */}
                <rect width="600" height="500" fill="url(#roomBg)" />
                
                {/* Window with curtains */}
                <rect x="50" y="50" width="180" height="250" fill="url(#windowLight)" rx="10" />
                
                {/* Curtains */}
                <path d="M40 50 Q60 80 50 120 Q55 160 45 200 Q50 240 40 280 L40 320 L10 320 L10 50 Z" 
                      fill="rgba(160, 180, 200, 0.8)" />
                <path d="M240 50 Q220 80 230 120 Q225 160 235 200 Q230 240 240 280 L240 320 L270 320 L270 50 Z" 
                      fill="rgba(160, 180, 200, 0.8)" />
                
                {/* Bed base */}
                <ellipse cx="300" cy="420" rx="120" ry="30" fill="rgba(200, 200, 220, 0.6)" />
                <rect x="180" y="380" width="240" height="40" fill="url(#bedGradient)" rx="20" />
                
                {/* Pillow */}
                <ellipse cx="280" cy="370" rx="40" ry="15" fill="rgba(230, 230, 240, 1)" />
                
                {/* Plant in corner */}
                <ellipse cx="520" cy="430" rx="25" ry="15" fill="rgba(100, 80, 60, 1)" />
                <path d="M520 430 Q510 410 505 390 Q515 385 525 390 Q535 385 545 390 Q540 410 530 430" 
                      fill="rgba(60, 120, 80, 1)" />
                <path d="M520 430 Q530 415 540 400 Q545 405 535 415 Q525 405 520 415" 
                      fill="rgba(80, 140, 100, 1)" />
                
                {/* Candle on side table */}
                <rect x="450" y="320" width="30" height="40" fill="rgba(120, 100, 80, 1)" rx="5" />
                <rect x="458" y="315" width="14" height="25" fill="rgba(250, 240, 220, 1)" rx="7" />
                <ellipse cx="465" cy="308" rx="3" ry="6" fill="url(#candleGlow)" />
                <circle cx="465" cy="305" r="8" fill="url(#candleGlow)" opacity="0.3" filter="url(#softGlow)" />
                
                {/* Woman in meditation pose */}
                {/* Hair bun */}
                <circle cx="300" cy="200" r="25" fill="rgba(40, 30, 20, 1)" />
                <circle cx="300" cy="185" r="12" fill="rgba(50, 40, 30, 1)" />
                
                {/* Head */}
                <circle cx="300" cy="220" r="22" fill="url(#skinTone)" />
                
                {/* Neck */}
                <rect x="295" y="240" width="10" height="15" fill="url(#skinTone)" />
                
                {/* Body/torso */}
                <ellipse cx="300" cy="280" rx="35" ry="45" fill="url(#clothingGradient)" />
                
                {/* Arms in meditation pose */}
                <ellipse cx="270" cy="290" rx="12" ry="25" fill="url(#skinTone)" transform="rotate(-30 270 290)" />
                <ellipse cx="330" cy="290" rx="12" ry="25" fill="url(#skinTone)" transform="rotate(30 330 290)" />
                
                {/* Hands in mudra position */}
                <circle cx="280" cy="320" r="8" fill="url(#skinTone)" />
                <circle cx="320" cy="320" r="8" fill="url(#skinTone)" />
                <circle cx="300" cy="330" r="6" fill="url(#skinTone)" />
                
                {/* Legs in lotus position */}
                <ellipse cx="275" cy="350" rx="20" ry="35" fill="url(#clothingGradient)" transform="rotate(-20 275 350)" />
                <ellipse cx="325" cy="350" rx="20" ry="35" fill="url(#clothingGradient)" transform="rotate(20 325 350)" />
                
                {/* Feet */}
                <ellipse cx="260" cy="375" rx="8" ry="12" fill="url(#skinTone)" transform="rotate(45 260 375)" />
                <ellipse cx="340" cy="375" rx="8" ry="12" fill="url(#skinTone)" transform="rotate(-45 340 375)" />
                
                {/* Peaceful aura around the person */}
                <circle cx="300" cy="280" r="80" fill="none" stroke="rgba(200, 220, 255, 0.3)" strokeWidth="2" opacity="0.6">
                  <animate attributeName="r" values="80;100;80" dur="6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0.2;0.6" dur="6s" repeatCount="indefinite" />
                </circle>
                
                <circle cx="300" cy="280" r="60" fill="none" stroke="rgba(255, 220, 180, 0.4)" strokeWidth="1" opacity="0.4">
                  <animate attributeName="r" values="60;75;60" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0.1;0.4" dur="4s" repeatCount="indefinite" />
                </circle>
                
                {/* Floating meditation particles */}
                <circle cx="200" cy="150" r="2" fill="rgba(200, 220, 255, 0.8)">
                  <animate attributeName="cy" values="150;140;150" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
                </circle>
                
                <circle cx="400" cy="180" r="1.5" fill="rgba(255, 220, 180, 0.9)">
                  <animate attributeName="cy" values="180;170;180" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2.5s" repeatCount="indefinite" />
                </circle>
                
                <circle cx="250" cy="120" r="2.5" fill="rgba(255, 255, 255, 0.7)">
                  <animate attributeName="cy" values="120;110;120" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0.2;0.7" dur="4s" repeatCount="indefinite" />
                </circle>
                
                <circle cx="380" cy="140" r="1.8" fill="rgba(180, 200, 255, 0.6)">
                  <animate attributeName="cy" values="140;130;140" dur="3.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3.5s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
