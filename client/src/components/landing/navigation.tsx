import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Menu, X, Star, Cloud } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Calcular offset para compensar a navegação fixa
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  const handlePurchaseClick = () => {
    scrollToSection("preco");
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-[var(--dark-bg)]/95 backdrop-blur-md shadow-xl shadow-black/10 border-b border-[var(--border-subtle)]" : "bg-[var(--dark-bg)]/80 backdrop-blur-sm"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="font-heading font-bold text-2xl text-[var(--text-primary)] flex items-center group cursor-pointer">
          <div className="relative w-12 h-12 rounded-3xl bg-gradient-to-br from-slate-800/40 to-slate-900/60 border-2 border-slate-600/40 flex items-center justify-center mr-4 backdrop-blur-md transition-all duration-500 group-hover:border-blue-400/60 group-hover:bg-gradient-to-br group-hover:from-slate-700/50 group-hover:to-slate-800/70">
            {/* Estrelas flutuantes ao redor do logo */}
            <Star className="absolute -top-1.5 -right-1.5 w-3 h-3 text-white/80 animate-twinkle fill-current" 
                 style={{animationDelay: '0s'}} />
            <Star className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 text-white/70 animate-twinkle fill-current" 
                 style={{animationDelay: '1.5s'}} />
            <Star className="absolute top-1 -left-2.5 w-2 h-2 text-white/60 animate-twinkle fill-current" 
                 style={{animationDelay: '3s'}} />
            
            {/* Nuvenzinhas flutuantes */}
            <Cloud className="absolute -top-2.5 left-1.5 w-4 h-4 text-white/50 animate-float-slow" 
                 style={{animationDelay: '2s'}} />
            <Cloud className="absolute -bottom-2.5 right-1.5 w-3.5 h-3.5 text-white/40 animate-float-slow" 
                 style={{animationDelay: '4s'}} />
            
            {/* Container da lua com brilho focado */}
            <div className="relative">
              {/* Brilho suave atrás da lua */}
              <div className="absolute inset-0 bg-blue-300/20 rounded-full blur-md animate-pulse-gentle"></div>
              
              {/* Brilho intenso no hover apenas na lua */}
              <div className="absolute inset-0 bg-gradient-radial from-white/30 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150"></div>
              
              {/* Anel de luz no hover */}
              <div className="absolute inset-0 bg-blue-200/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-125 blur-sm"></div>
              
              <Moon className="h-7 w-7 text-white relative z-10 animate-breathe group-hover:text-blue-50 group-hover:drop-shadow-lg transition-all duration-500" />
            </div>
          </div>
          <span className="bg-gradient-to-r from-white via-blue-50 to-slate-100 bg-clip-text text-transparent group-hover:from-blue-100 group-hover:via-white group-hover:to-blue-50 transition-all duration-500 drop-shadow-sm">
            Sono Zen
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <button onClick={() => scrollToSection("vsl")} className="text-white/90 hover:text-[var(--warm-accent)] transition-colors font-semibold text-base animate-text-focus">
            Apresentação
          </button>
          <button onClick={() => scrollToSection("planejamento-sono")} className="text-white/90 hover:text-[var(--warm-accent)] transition-colors font-semibold text-base animate-text-focus">
            Planejamento
          </button>
          <button onClick={() => scrollToSection("preview-video")} className="text-white/90 hover:text-[var(--warm-accent)] transition-colors font-semibold text-base animate-text-focus">
            Preview
          </button>
          <button onClick={() => scrollToSection("problema")} className="text-white/90 hover:text-[var(--warm-accent)] transition-colors font-semibold text-base animate-text-focus">
            Benefícios
          </button>
          <button onClick={() => scrollToSection("deborah-genaro")} className="text-white/90 hover:text-[var(--warm-accent)] transition-colors font-semibold text-base animate-text-focus">
            Sobre Mim
          </button>
          <button onClick={() => scrollToSection("depoimentos")} className="text-white/90 hover:text-[var(--warm-accent)] transition-colors font-semibold text-base animate-text-focus">
            Depoimentos
          </button>
          <button onClick={() => scrollToSection("mood-tracker")} className="text-white/90 hover:text-[var(--warm-accent)] transition-colors font-semibold text-base animate-text-focus">
            Relaxamento
          </button>
          <button onClick={() => scrollToSection("preco")} className="text-white/90 hover:text-[var(--warm-accent)] transition-colors font-semibold text-base animate-text-focus">
            Oferta
          </button>
        </div>

        {/* Desktop CTA */}
        <Button 
          onClick={handlePurchaseClick}
          className="hidden md:flex group relative overflow-hidden bg-[var(--accent-blue)]/20 backdrop-blur-sm border border-[var(--accent-blue)]/30 hover:border-[var(--accent-blue)]/50 text-[var(--accent-blue)] hover:text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-[var(--accent-blue)]/25 transition-all duration-300 transform hover:scale-105 animate-magnetic-hover"
        >
          <div className="absolute inset-0 bg-[var(--accent-blue)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative animate-shimmer">Transformar Sono</span>
        </Button>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-[var(--text-primary)]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--card-bg)]/95 backdrop-blur-md border-t border-[var(--border-subtle)]">
          <div className="px-6 py-6 space-y-6">
            <button 
              onClick={() => scrollToSection("vsl")} 
              className="block w-full text-left text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors font-medium py-4 px-3 rounded-lg hover:bg-[var(--card-hover)] text-base"
            >
              Apresentação
            </button>
            <button 
              onClick={() => scrollToSection("planejamento-sono")} 
              className="block w-full text-left text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors font-medium py-4 px-3 rounded-lg hover:bg-[var(--card-hover)] text-base"
            >
              Planejamento
            </button>
            <button 
              onClick={() => scrollToSection("preview-video")} 
              className="block w-full text-left text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors font-medium py-4 px-3 rounded-lg hover:bg-[var(--card-hover)] text-base"
            >
              Preview
            </button>
            <button 
              onClick={() => scrollToSection("problema")} 
              className="block w-full text-left text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors font-medium py-4 px-3 rounded-lg hover:bg-[var(--card-hover)] text-base"
            >
              Benefícios
            </button>
            <button 
              onClick={() => scrollToSection("deborah-genaro")} 
              className="block w-full text-left text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors font-medium py-4 px-3 rounded-lg hover:bg-[var(--card-hover)] text-base"
            >
              Sobre Mim
            </button>
            <button 
              onClick={() => scrollToSection("depoimentos")} 
              className="block w-full text-left text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors font-medium py-4 px-3 rounded-lg hover:bg-[var(--card-hover)] text-base"
            >
              Depoimentos
            </button>
            <button 
              onClick={() => scrollToSection("mood-tracker")} 
              className="block w-full text-left text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors font-medium py-4 px-3 rounded-lg hover:bg-[var(--card-hover)] text-base"
            >
              Relaxamento
            </button>
            <button 
              onClick={() => scrollToSection("preco")} 
              className="block w-full text-left text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors font-medium py-4 px-3 rounded-lg hover:bg-[var(--card-hover)] text-base"
            >
              Oferta
            </button>
            <Button 
              onClick={handlePurchaseClick}
              className="w-full group relative overflow-hidden bg-[var(--accent-blue)]/20 backdrop-blur-sm border-2 border-[var(--accent-blue)]/30 hover:border-[var(--accent-blue)]/50 text-[var(--accent-blue)] hover:text-white rounded-xl mt-4 py-4 text-lg font-semibold hover:shadow-lg hover:shadow-[var(--accent-blue)]/25 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-[var(--accent-blue)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                🌙 Transformar Sono Hoje
              </span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
