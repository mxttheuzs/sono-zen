import { useState, useEffect } from "react";
import { X, Clock, Heart } from "lucide-react";
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
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative animate-in fade-in duration-300">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center">
          <div className="mb-4">
            <Clock className="h-16 w-16 text-red-500 mx-auto animate-pulse" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Espere! Não vá embora...
          </h3>
          
          <p className="text-gray-600 mb-6">
            Você está a apenas <strong>um clique</strong> de transformar suas noites para sempre. 
            Milhares já conquistaram o sono dos sonhos.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 font-semibold text-sm">
              ⚠️ Esta oferta especial expira em poucas horas!
            </p>
          </div>

          <Button
            onClick={scrollToCheckout}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 rounded-xl font-bold mb-4"
          >
            <Heart className="mr-2 h-5 w-5" />
            SIM! QUERO GARANTIR MINHA CÓPIA
          </Button>

          <p className="text-xs text-gray-500">
            Garantia de 30 dias • Acesso instantâneo
          </p>
        </div>
      </div>
    </div>
  );
}