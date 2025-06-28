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
          <div className="relative w-14 h-14 flex items-center justify-center mr-4 transition-all duration-500">
            {/* Sono Zen Logo SVG */}
            <svg className="w-12 h-12 group-hover:scale-110 transition-all duration-500" viewBox="0 0 100 100" fill="none">
              {/* Moon crescent */}
              <path 
                d="M30 20 Q15 30 15 50 Q15 70 30 80 Q45 85 60 75 Q50 80 40 80 Q25 80 20 65 Q15 50 20 35 Q25 20 40 20 Q50 20 60 25 Q45 15 30 20 Z" 
                fill="url(#moonGradient)"
                className="group-hover:fill-blue-200 transition-all duration-500"
              />
              
              {/* Waves */}
              <path 
                d="M20 85 Q30 82 40 85 Q50 88 60 85 Q70 82 80 85" 
                stroke="url(#waveGradient)" 
                strokeWidth="2.5" 
                fill="none"
                className="group-hover:stroke-blue-300 transition-all duration-500"
              />
              <path 
                d="M25 90 Q35 87 45 90 Q55 93 65 90 Q75 87 85 90" 
                stroke="url(#waveGradient)" 
                strokeWidth="2" 
                fill="none" 
                opacity="0.8"
                className="group-hover:stroke-blue-300 transition-all duration-500"
              />
              
              {/* Star/Sun dot */}
              <circle 
                cx="65" 
                cy="35" 
                r="4" 
                fill="#F4B942"
                className="group-hover:fill-yellow-300 animate-pulse transition-all duration-500"
              />
              
              {/* Gradients */}
              <defs>
                <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#1E40AF" />
                </linearGradient>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="bg-gradient-to-r from-white via-blue-50 to-slate-100 bg-clip-text text-transparent group-hover:from-blue-100 group-hover:via-white group-hover:to-blue-50 transition-all duration-500 drop-shadow-sm">
            Sono Zen
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <button onClick={() => scrollToSection("metodo")} className="text-white/90 hover:text-[var(--warm-accent)] transition-colors font-semibold text-base">
            O Método
          </button>
          <button onClick={() => scrollToSection("problema")} className="text-white/90 hover:text-[var(--warm-accent)] transition-colors font-semibold text-base">
            Benefícios
          </button>
          <button onClick={() => scrollToSection("deborah-genaro")} className="text-white/90 hover:text-[var(--warm-accent)] transition-colors font-semibold text-base">
            Sobre Mim
          </button>
          <button onClick={() => scrollToSection("depoimentos")} className="text-white/90 hover:text-[var(--warm-accent)] transition-colors font-semibold text-base">
            Depoimentos
          </button>
          <button onClick={() => scrollToSection("preco")} className="text-white/90 hover:text-[var(--warm-accent)] transition-colors font-semibold text-base">
            Oferta
          </button>
        </div>

        {/* Desktop CTA */}
        <Button 
          onClick={handlePurchaseClick}
          className="hidden md:flex bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-[var(--warm-accent)]/25 transition-all duration-300 transform hover:scale-105"
        >
          Transformar Sono
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
              onClick={() => scrollToSection("metodo")} 
              className="block w-full text-left text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors font-medium py-4 px-3 rounded-lg hover:bg-[var(--card-hover)] text-base"
            >
              O Método
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
              onClick={() => scrollToSection("preco")} 
              className="block w-full text-left text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors font-medium py-4 px-3 rounded-lg hover:bg-[var(--card-hover)] text-base"
            >
              Oferta
            </button>
            <Button 
              onClick={handlePurchaseClick}
              className="w-full bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] text-white rounded-xl mt-4 py-4 text-lg font-bold hover:shadow-lg transition-all duration-300"
            >
              🌙 Transformar Sono Hoje
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
