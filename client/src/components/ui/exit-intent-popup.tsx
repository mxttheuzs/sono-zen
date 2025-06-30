import { useState, useEffect } from "react";
import { X, Moon, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const scrollToCheckout = () => {
    const checkoutSection = document.getElementById('checkout');
    if (checkoutSection) {
      checkoutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="relative max-w-md w-full">
        {/* Background with site styling */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-md rounded-3xl border border-slate-700/40"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--warm-accent)]/10 to-[var(--accent-blue)]/10 rounded-3xl blur-xl"></div>
        
        <div className="relative p-8 animate-in fade-in duration-300">
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="text-center">
            {/* Moon icon with site styling */}
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[var(--warm-accent)] to-[var(--accent-blue)] rounded-full flex items-center justify-center animate-pulse">
                <Moon className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4 font-heading">
              Espere! Não vá embora...
            </h3>
            
            <p className="text-slate-300 mb-6 leading-relaxed">
              Você está a apenas <strong className="text-[var(--warm-accent)]">um clique</strong> de transformar suas noites para sempre. 
              Milhares já conquistaram o sono dos sonhos.
            </p>

            <div className="bg-gradient-to-r from-[var(--warm-accent)]/20 to-orange-500/20 border border-[var(--warm-accent)]/30 rounded-xl p-4 mb-6">
              <p className="text-[var(--warm-accent)] font-semibold text-sm">
                🌙 Esta oferta especial expira em poucas horas!
              </p>
            </div>

            <Button
              onClick={scrollToCheckout}
              className="w-full group relative overflow-hidden bg-[var(--accent-blue)]/20 backdrop-blur-sm border-2 border-[var(--accent-blue)]/30 hover:border-[var(--accent-blue)]/50 text-[var(--accent-blue)] hover:text-white py-4 rounded-xl font-semibold mb-4 transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--accent-blue)]/25"
            >
              <div className="absolute inset-0 bg-[var(--accent-blue)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                <Heart className="h-5 w-5" />
                SIM! QUERO GARANTIR MINHA CÓPIA
              </span>
            </Button>

            <p className="text-xs text-slate-400">
              Garantia de 7 dias • Acesso instantâneo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}