import { Button } from "@/components/ui/button";
import { Moon, Shield, Sparkles, Heart, Star, CheckCircle } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import { StarryBackground } from "@/components/ui/starry-background";
import { FloatingParticles } from "@/components/ui/floating-particles";
import sleepingWomanImage from "@assets/image_1751506836548.png";

export function HeroSection() {
  const scrollToCheckout = () => {
    const element = document.getElementById("preco");
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
    <section className="bg-black relative overflow-hidden min-h-screen flex items-center pt-24 pb-8 md:pt-0 md:pb-0">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Starry night background */}
      <StarryBackground />
      
      {/* Floating clouds for peaceful atmosphere */}
      <FloatingClouds />
      
      {/* Subtle floating particles */}
      <FloatingParticles className="opacity-60" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left content */}
        <div className="text-left space-y-8">


          <div className="space-y-6">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-[var(--text-primary)] leading-tight">
              Durma Como um Bebê
              <span className="block bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--warm-accent)] bg-clip-text text-transparent">
                em Apenas 7 Noites
              </span>
            </h1>
            
            <div className="space-y-4">
              <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl leading-relaxed font-medium">
                🌙 Pare de ficar <span className="text-[var(--warm-accent)] font-bold">3h rolando na cama</span> sem conseguir dormir
              </p>
              <p className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed">
                ✨ Descubra o método oriental que faz você adormecer em <span className="text-[var(--accent-blue)] font-semibold">15 minutos</span> e acordar descansado
              </p>
            </div>

            {/* Benefícios rápidos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
              <div className="flex items-center gap-2 text-[var(--text-secondary)] hover:transform hover:translate-x-1 transition-all duration-200">
                <CheckCircle className="h-5 w-5 text-[var(--success-green)]" />
                <span className="text-sm font-medium">Sem remédios ou dependência</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-secondary)] hover:transform hover:translate-x-1 transition-all duration-200">
                <CheckCircle className="h-5 w-5 text-[var(--success-green)]" />
                <span className="text-sm font-medium">Resultados em 1 semana</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-secondary)] hover:transform hover:translate-x-1 transition-all duration-200">
                <CheckCircle className="h-5 w-5 text-[var(--success-green)]" />
                <span className="text-sm font-medium">Técnicas orientais milenares</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-secondary)] hover:transform hover:translate-x-1 transition-all duration-200">
                <CheckCircle className="h-5 w-5 text-[var(--success-green)]" />
                <span className="text-sm font-medium">3.452 depoimentos reais</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-6 items-start">
            {/* CTA Principal */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <Button 
                onClick={scrollToCheckout}
                className="relative bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] text-white px-6 sm:px-10 py-4 sm:py-6 rounded-2xl text-base sm:text-xl font-bold hover:shadow-2xl hover:shadow-[var(--warm-accent)]/25 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              >
                <Heart className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6" />
                <span className="hidden sm:inline">QUERO DORMIR MELHOR HOJE!</span>
                <span className="sm:hidden">DORMIR MELHOR!</span>
                <Sparkles className="ml-2 sm:ml-3 h-5 sm:h-6 w-5 sm:w-6" />
              </Button>
            </div>

            {/* Indicadores de credibilidade */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="flex items-center gap-2 bg-[var(--success-green)]/10 border border-[var(--success-green)]/30 px-4 py-2 rounded-full">
                <Shield className="h-5 w-5 text-[var(--success-green)]" />
                <span className="text-sm font-semibold text-[var(--success-green)]">Garantia Total 7 Dias</span>
              </div>
              <div className="flex items-center gap-2 bg-[var(--warm-accent)]/10 border border-[var(--warm-accent)]/30 px-4 py-2 rounded-full">
                <Star className="h-5 w-5 text-[var(--warm-accent)] fill-current" />
                <span className="text-sm font-semibold text-[var(--warm-accent)]">14.847 Vidas Transformadas</span>
              </div>
            </div>

            {/* Enhanced Premium Promotional Banner */}
            <div className="relative max-w-2xl">
              {/* Outer glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/30 via-red-400/20 to-yellow-400/30 rounded-3xl blur-lg"></div>
              
              {/* Main banner container */}
              <div className="relative bg-gradient-to-br from-orange-500/85 via-red-500/90 to-yellow-500/85 border-2 border-orange-400/60 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-red-400/15 to-yellow-400/20 animate-pulse"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '4s' }}></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                
                {/* Badge flutuante premium */}
                <div className="absolute top-3 right-3 bg-white/90 text-orange-600 text-xs font-black px-4 py-2 rounded-full shadow-xl animate-pulse z-10 border border-orange-300">
                  OFERTA ESPECIAL
                </div>
                
                <div className="relative z-10">
                  {/* Main headline */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="bg-white/20 rounded-full p-3 animate-pulse">
                        <span className="text-3xl">⭐</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide leading-tight"
                          style={{ textShadow: '0 3px 12px rgba(0,0,0,0.6)' }}>
                        Preço de lançamento: Apenas hoje
                      </h3>
                      <div className="bg-white/20 rounded-full p-3 animate-pulse" style={{ animationDelay: '0.7s' }}>
                        <span className="text-3xl">⭐</span>
                      </div>
                    </div>
                    
                    {/* Social proof */}
                    <p className="text-white/95 text-xl font-bold mb-6" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                      14.847 vidas transformadas
                    </p>
                  </div>
                  
                  {/* Status indicators */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 bg-white/15 rounded-2xl px-4 py-3 backdrop-blur-sm border border-white/20">
                      <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                      <span className="text-white font-bold text-sm sm:text-base">Método Comprovado</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/15 rounded-2xl px-4 py-3 backdrop-blur-sm border border-white/20">
                      <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }}></div>
                      <span className="text-white font-bold text-sm sm:text-base">Acesso Imediato</span>
                    </div>
                  </div>
                  
                  {/* Urgency indicator */}
                  <div className="bg-black/40 border border-yellow-400/40 rounded-2xl p-4 text-center backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-yellow-300 text-2xl animate-pulse">⚡</span>
                      <p className="text-white font-bold text-base sm:text-lg" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                        273 pessoas adquiriram nas últimas 24h
                      </p>
                      <span className="text-yellow-300 text-2xl animate-pulse" style={{ animationDelay: '0.3s' }}>⚡</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right image */}
        <div className="relative">
          <div className="card-modern p-0 overflow-hidden">
            <img 
              src={sleepingWomanImage} 
              alt="Mulher segurando lua luminosa em ambiente celestial com nuvens azuis"
              className="w-full h-full aspect-square rounded-lg object-cover"
            />
          </div>
          

        </div>
      </div>
    </section>
  );
}
