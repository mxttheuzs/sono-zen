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
                <span className="text-sm font-medium">Aprovado por 2.347 pessoas</span>
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
                <span className="text-sm font-semibold text-[var(--warm-accent)]">2.347 Vidas Transformadas</span>
              </div>
            </div>

            {/* Oferta Especial do Ebook */}
            <div className="bg-gradient-to-r from-[var(--warm-accent)]/15 to-[var(--accent-blue)]/10 border-2 border-[var(--warm-accent)]/40 rounded-2xl p-6 max-w-xl backdrop-blur-sm shadow-lg relative overflow-hidden">
              {/* Badge flutuante zen */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg animate-pulse z-10">
                OFERTA ESPECIAL
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-5 h-5 bg-[var(--warm-accent)] rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-5 h-5 bg-[var(--warm-accent)]/40 rounded-full animate-ping"></div>
                </div>
                <div className="flex-1">
                  <p className="text-[var(--text-primary)] font-bold text-xl mb-2 leading-tight">
                    ✨ <span className="text-[var(--warm-accent)]">Preço de lançamento:</span> Apenas hoje
                  </p>
                  <p className="text-[var(--text-secondary)] text-base mb-3 font-medium">
                    14.847 pessoas já transformaram suas noites
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[var(--success-green)] rounded-full animate-pulse"></div>
                      <span className="text-[var(--success-green)] text-sm font-semibold">Método Comprovado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[var(--accent-blue)] rounded-full"></div>
                      <span className="text-[var(--accent-blue)] text-sm font-semibold">Acesso Imediato</span>
                    </div>
                  </div>
                  
                  {/* Indicador de interesse */}
                  <div className="mt-4 bg-[var(--warm-accent)]/10 border border-[var(--warm-accent)]/30 rounded-xl p-3">
                    <p className="text-[var(--warm-accent)] text-sm font-medium text-center">
                      🌙 273 pessoas adquiriram nas últimas 24h
                    </p>
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
