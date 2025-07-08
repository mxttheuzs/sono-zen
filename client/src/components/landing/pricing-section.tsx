import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { trackInitiateCheckout, trackAddPaymentInfo } from "@/lib/conversion-tracking";
import { Shield, Lock, Star, Cloud, CheckCircle, Download, Clock, Users, Gift, Moon, Sparkles, Heart } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";

// Componente RedirectModal com barra de progresso automática
interface RedirectModalProps {
  onRedirect: () => void;
}

function RedirectModal({ onRedirect }: RedirectModalProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let isRedirected = false;
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0 && !isRedirected) {
          clearInterval(timer);
          isRedirected = true;
          onRedirect();
          return 0;
        }
        return prev - 4; // Diminui 4% a cada 100ms (2.5 segundos total)
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [onRedirect]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-3xl p-8 max-w-md mx-auto text-center border border-slate-700">
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-accent-blue to-warm-accent rounded-full flex items-center justify-center">
          <Moon className="h-8 w-8 text-white" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-4">Redirecionando para Pagamento</h3>
        <p className="text-slate-300 mb-6">
          Você será redirecionado para nossa plataforma de pagamento segura em instantes...
        </p>
        
        {/* Barra de progresso */}
        <div className="w-full bg-slate-700 rounded-full h-3 mb-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-accent-blue to-warm-accent transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-sm text-slate-400">
          {Math.ceil(progress / 40)} segundos restantes
        </p>
      </div>
    </div>
  );
}

export function PricingSection() {
  const [showRedirectModal, setShowRedirectModal] = useState(false);

  const handlePurchaseClick = () => {
    // Tracking de iniciação de checkout
    trackInitiateCheckout({
      content_name: 'Sono Zen - Método Completo',
      content_category: 'E-book',
      value: 27.90,
      currency: 'BRL'
    });
    
    setShowRedirectModal(true);
  };

  const handleConfirmRedirect = () => {
    // Enviar evento de InitiateCheckout apenas quando usuário confirma ir para pagamento
    trackInitiateCheckout();
    
    const paymentUrl = 'https://pay.cakto.com.br/j6iqgss_456470';
    
    try {
      // Primeira tentativa: window.open
      const newWindow = window.open(paymentUrl, '_blank', 'noopener,noreferrer');
      
      // Aguardar um pouco e depois enviar AddPaymentInfo (quando realmente está na página de pagamento)
      setTimeout(() => {
        trackAddPaymentInfo();
      }, 2000);
      
      // Se foi bloqueado, tenta window.location
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // Fallback: redirecionar na mesma aba
        window.location.href = paymentUrl;
        // Enviar AddPaymentInfo imediatamente neste caso
        setTimeout(() => {
          trackAddPaymentInfo();
        }, 1000);
      }
    } catch (error) {
      // Último fallback: redirecionar na mesma aba
      window.location.href = paymentUrl;
      // Enviar AddPaymentInfo imediatamente neste caso
      setTimeout(() => {
        trackAddPaymentInfo();
      }, 1000);
    }
    
    setShowRedirectModal(false);
  };

  const features = [
    {
      icon: <CheckCircle className="h-5 w-5 text-[var(--success-green)]" />,
      text: "Método natural sem medicamentos"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-[var(--success-green)]" />,
      text: "Programa prático de 7 noites"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-[var(--success-green)]" />,
      text: "Técnicas orientais relaxantes"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-[var(--success-green)]" />,
      text: "Sons calmantes inclusos"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-[var(--success-green)]" />,
      text: "Rituais prontos para usar"
    }
  ];

  return (
    <>
      <section id="pricing" className="py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden">
        {/* Background elements */}
        <FloatingClouds />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Sua{" "}
              <span className="bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--celestial-blue)] bg-clip-text text-transparent">
                Transformação{" "}
              </span>
              Começa Hoje
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Desperte o poder do seu sono e transforme suas noites para sempre
            </p>
          </div>

          {/* Pricing card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800/50 via-slate-700/30 to-slate-800/50 backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8">
              {/* Product header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--accent-blue)]/20 to-[var(--warm-accent)]/20 rounded-full px-6 py-3 mb-6 border border-[var(--accent-blue)]/30">
                  <Moon className="h-6 w-6 text-[var(--accent-blue)]" />
                  <span className="text-[var(--accent-blue)] font-semibold">Edição Completa</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Sono Zen - Método Completo
                </h3>
                <p className="text-slate-300 text-lg">
                  Transforme seu sono em apenas 7 noites com o método oriental mais eficaz
                </p>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-br from-[var(--accent-blue)]/15 via-[var(--warm-accent)]/8 to-[var(--accent-blue)]/10 rounded-3xl p-6 sm:p-8 md:p-10 mb-8 border-2 border-[var(--warm-accent)]/50 backdrop-blur-lg relative overflow-hidden shadow-2xl">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--warm-accent)]/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-[var(--accent-blue)]/20 to-transparent rounded-full blur-2xl"></div>
                
                <div className="text-center relative z-10">
                  {/* Price comparison */}
                  <div className="mb-6">
                    <p className="text-[var(--text-muted)] mb-2 text-base" style={{ textShadow: '0 0 6px rgba(255,255,255,0.15)' }}>De:</p>
                    <p className="text-2xl sm:text-3xl text-[var(--text-muted)] line-through mb-4 opacity-70" style={{ textShadow: '0 0 6px rgba(255,255,255,0.15)' }}>R$ 47,90</p>
                    
                    <p className="text-lg sm:text-xl text-[var(--accent-blue)] font-semibold mb-3" style={{ textShadow: '0 0 8px rgba(255,255,255,0.2)' }}>Por apenas:</p>
                    
                    {/* Preço principal com gradiente e sombra */}
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--warm-accent)]/30 via-white/20 to-[var(--celestial-blue)]/30 blur-xl rounded-lg"></div>
                      <p className="relative text-5xl sm:text-6xl md:text-7xl font-black text-white mb-4" style={{ 
                        textShadow: '0 0 30px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.1), 2px 2px 4px rgba(0,0,0,0.3)' 
                      }}>
                        R$ 27,90
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        42% OFF
                      </span>
                      <span className="text-green-400 font-semibold">
                        Economia de R$ 20,00
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30">
                    {feature.icon}
                    <span className="text-slate-200 text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Purchase button */}
              <div className="text-center">
                <Button
                  onClick={handlePurchaseClick}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-hsl(220,40%,30%) to-hsl(220,40%,35%) hover:from-hsl(220,40%,35%) hover:to-hsl(220,40%,40%) text-white font-bold py-6 px-8 rounded-2xl text-xl transition-all duration-300 border border-hsl(220,40%,40%)/50 hover:border-hsl(220,40%,50%) shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Moon className="h-6 w-6" />
                    Transformar Meu Sono Agora
                  </span>
                </Button>
              </div>

              {/* Security badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                  <Shield className="h-10 w-10 text-green-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-white mb-1">Garantia de 7 Dias</h4>
                  <p className="text-xs text-slate-400">100% do seu dinheiro de volta se não funcionar</p>
                </div>
                
                <div className="text-center p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                  <Lock className="h-10 w-10 text-blue-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-white mb-1">Pagamento Seguro</h4>
                  <p className="text-xs text-slate-400">SSL criptografado e dados protegidos</p>
                </div>
                
                <div className="text-center p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                  <Download className="h-10 w-10 text-purple-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-white mb-1">Acesso Imediato</h4>
                  <p className="text-xs text-slate-400">Receba por email em até 5 minutos</p>
                </div>
              </div>

              {/* Social proof footer */}
              <div className="text-center mt-8 pt-6 border-t border-slate-700/50">
                <div className="flex items-center justify-center gap-2 text-slate-300 text-sm">
                  <Users className="h-4 w-4 text-[var(--accent-blue)]" />
                  <span>
                    <span className="font-semibold text-[var(--warm-accent)]">14.847 vidas</span> transformadas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Redirecionamento para Cakto */}
      {showRedirectModal && <RedirectModal onRedirect={handleConfirmRedirect} />}
    </>
  );
}