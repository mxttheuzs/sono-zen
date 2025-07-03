import { Button } from "@/components/ui/button";
import { Moon, Shield, Sparkles, Heart, Star, CheckCircle } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import { StarryBackground } from "@/components/ui/starry-background";
import { FloatingParticles } from "@/components/ui/floating-particles";
import sleepingWomanImage from "@assets/image_1750998629749.png";

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
                <span className="text-sm font-medium">Aprovado por 2.800+ pessoas</span>
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
                <span className="text-sm font-semibold text-[var(--warm-accent)]">2.800+ Vidas Transformadas</span>
              </div>
            </div>

            {/* Oferta Especial Ultra Chamativa */}
            <div className="relative group">
              {/* Glow effect externo */}
              <div className="absolute -inset-3 bg-gradient-to-r from-yellow-400/30 via-orange-400/30 to-red-400/30 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
              
              {/* Banner principal */}
              <div className="relative bg-gradient-to-r from-orange-600/90 via-red-500/90 to-yellow-500/90 border-3 border-yellow-400/70 rounded-2xl p-6 max-w-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-orange-500/20">
                
                {/* Badge de urgência no canto */}
                <div className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full animate-bounce shadow-lg">
                  🔥 HOJE!
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Indicador animado mais chamativo */}
                  <div className="relative">
                    <div className="w-6 h-6 bg-yellow-300 rounded-full animate-ping absolute"></div>
                    <div className="w-6 h-6 bg-yellow-400 rounded-full animate-pulse flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-white font-black text-lg mb-1 tracking-wide">
                      ⚡ <span className="text-yellow-200">OFERTA ESPECIAL:</span> PREÇO DE LANÇAMENTO
                    </p>
                    <p className="text-yellow-100 font-bold text-base mb-2">
                      🚀 Milhares já transformaram suas noites!
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-300 text-sm font-bold">✅ APROVADO</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-blue-200 text-sm font-bold">⏰ LIMITADO</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Barra de progresso fake para urgência */}
                <div className="mt-3 bg-black/20 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-400 to-yellow-400 h-full w-3/4 rounded-full animate-pulse"></div>
                </div>
                <p className="text-yellow-100 text-xs mt-1 font-semibold">⚡ 76% das vagas já foram preenchidas</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right image */}
        <div className="relative">
          <div className="card-modern p-0 overflow-hidden">
            <img 
              src={sleepingWomanImage} 
              alt="Mulher dormindo tranquilamente com luzes suaves"
              className="w-full h-full aspect-square rounded-lg object-cover"
            />
          </div>
          

        </div>
      </div>
    </section>
  );
}
