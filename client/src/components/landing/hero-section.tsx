import { Button } from "@/components/ui/button";
import { Moon, Shield, Sparkles, Heart, Star, CheckCircle } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import { StarryBackground } from "@/components/ui/starry-background";
import { FloatingParticles } from "@/components/ui/floating-particles";
import sleepingWomanImage from "@assets/image_1751506836548.png";

export function HeroSection() {
  const scrollToProblema = () => {
    const element = document.getElementById("problema");
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
    <section className="relative overflow-hidden min-h-screen flex items-center pt-24 pb-8 md:pt-0 md:pb-0" 
             style={{
               background: `linear-gradient(135deg, var(--sono-deep-blue) 0%, #0a1a2e 50%, var(--sono-deep-blue) 100%)`
             }}>
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
            <h1 className="font-heading sm:text-5xl md:text-7xl font-bold text-[var(--text-primary)] text-[40px]">
              Durma Como um Bebê
              <span className="block bg-gradient-to-r from-[var(--sono-golden)] via-[var(--sono-sky-blue)] to-[var(--sono-golden)] bg-clip-text text-transparent">
                em Apenas 7 Noites
              </span>
            </h1>
            
            <div className="space-y-4">
              <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl leading-relaxed font-medium">
                🌙 Pare de ficar <span className="text-[var(--sono-golden)] font-bold">3h rolando na cama</span> sem conseguir dormir
              </p>
              <p className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed">
                ✨ Descubra o método oriental que faz você adormecer em <span className="text-[var(--sono-sky-blue)] font-semibold">15 minutos</span> e acordar descansado
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
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--sono-golden)] to-[var(--sono-sky-blue)] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <Button 
                onClick={scrollToProblema}
                className="relative bg-gradient-to-r from-[var(--sono-golden)] to-[var(--sono-sky-blue)] text-white px-6 sm:px-10 py-4 sm:py-6 rounded-2xl text-base sm:text-xl font-bold hover:shadow-2xl hover:shadow-[var(--sono-golden)]/25 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              >
                <Heart className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6" />
                <span>SAIBA MAIS</span>
                <Sparkles className="ml-2 sm:ml-3 h-5 sm:h-6 w-5 sm:w-6" />
              </Button>
            </div>

            {/* Indicadores de credibilidade */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="flex items-center gap-2 bg-[var(--success-green)]/10 border border-[var(--success-green)]/30 px-4 py-2 rounded-full">
                <Shield className="h-5 w-5 text-[var(--success-green)]" />
                <span className="text-sm font-semibold text-[var(--success-green)]">Garantia Total 7 Dias</span>
              </div>
              <div className="flex items-center gap-2 bg-[var(--sono-golden)]/10 border border-[var(--sono-golden)]/30 px-4 py-2 rounded-full">
                <Star className="h-5 w-5 text-[var(--sono-golden)] fill-current" />
                <span className="text-sm font-semibold text-[var(--sono-golden)]">14.847 Vidas Transformadas</span>
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
