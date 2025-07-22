import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { insertPurchaseSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { trackInitiateCheckout, trackPurchase } from "@/lib/conversion-tracking";
import { Shield, Lock, Star, CheckCircle, Download, Clock, Moon, Gift, Sparkles } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import { z } from "zod";

const purchaseFormSchema = insertPurchaseSchema.extend({
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos")
});

type PurchaseFormData = z.infer<typeof purchaseFormSchema>;

// Componente LoadingModal para inicialização do pagamento
interface LoadingModalProps {
  onComplete: () => void;
}

function LoadingModal({ onComplete }: LoadingModalProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  const stages = [
    "Verificando segurança...",
    "Validando certificados SSL...",
    "Integrando pagamento seguro...",
    "Conectando com Cakto...",
    "Finalizando conexão..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 1.11; // 30ms * 90 = 3 segundos total para carregamento mais suave
      });
    }, 33);

    // Change stage text during progress
    const stageTimer = setInterval(() => {
      setStage((prev) => (prev + 1) % stages.length);
    }, 600);

    return () => {
      clearInterval(timer);
      clearInterval(stageTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-slate-900 to-black z-[9999] flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-10 max-w-lg w-full shadow-2xl border border-slate-200 relative overflow-hidden">
        
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10 animate-pulse"></div>
        
        <div className="text-center relative z-10">
          {/* Enhanced Security Icon with multiple animations */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg relative">
              <Shield className="h-12 w-12 text-white" />
              
              {/* Animated Rings */}
              <div className="absolute inset-0 rounded-full border-4 border-blue-300/30 animate-spin"></div>
              <div className="absolute inset-[-8px] rounded-full border-2 border-blue-400/20 animate-pulse"></div>
            </div>
            
            {/* Floating Security Badges */}
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <Lock className="h-6 w-6 text-white" />
            </div>
          </div>
          
          {/* Enhanced Title */}
          <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Integrando Pagamento Seguro
          </h3>
          
          {/* Dynamic subtitle with better spacing */}
          <p className="text-slate-600 mb-8 font-medium text-lg min-h-[28px] transition-all duration-300">
            {stages[stage]}
          </p>
          
          {/* Professional Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-4 mb-6 relative overflow-hidden border border-slate-300/50 shadow-inner">
            <div 
              className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 h-4 rounded-full transition-all duration-75 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Animated Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full animate-pulse"></div>
              
              {/* Moving Highlight */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
            </div>
          </div>
          
          {/* Progress Percentage Display */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-slate-800/10 rounded-full px-8 py-3 border border-slate-300/50 shadow-sm">
              <span className="text-slate-700 font-bold text-2xl">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          
          {/* Enhanced Security Indicators */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col items-center p-4 bg-green-50 rounded-xl border border-green-200/50 shadow-sm">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-green-700 font-semibold">SSL</span>
              <span className="text-green-600 text-xs">Seguro</span>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl border border-blue-200/50 shadow-sm">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <span className="text-blue-700 font-semibold">256-bits</span>
              <span className="text-blue-600 text-xs">Criptografia</span>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-purple-50 rounded-xl border border-purple-200/50 shadow-sm">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <span className="text-purple-700 font-semibold">Cakto</span>
              <span className="text-purple-600 text-xs">Verificado</span>
            </div>
          </div>
          
          {/* Loading Dots Animation */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente PaymentModal com iframe da Cakto
interface PaymentModalProps {
  onClose: () => void;
}

function PaymentModal({ onClose }: PaymentModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Garante que o modal ocupe toda a viewport
  useEffect(() => {
    // Disable scroll on body
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);

  return (
    <div 
      className="fixed bg-black z-[9999]"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <div className="bg-black w-full h-full relative">
        
        {/* Header */}
        <div className="bg-black border-b border-gray-800 p-3 flex items-center justify-between" style={{ height: '60px' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Pagamento Seguro</h3>
              <p className="text-gray-300 text-xs">Sono Zen - Método Completo</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <span className="text-white text-xl">×</span>
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div 
            className="absolute bg-black flex flex-col items-center justify-center"
            style={{
              top: '60px',
              left: 0,
              right: 0,
              bottom: 0
            }}
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin mb-6"></div>
              <h3 className="text-white text-lg font-semibold mb-2">Carregando Pagamento Seguro</h3>
              <p className="text-gray-300 text-sm">Conectando com sistema de pagamento...</p>
              <div className="mt-4">
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <Shield className="h-4 w-4" />
                  <span>Pagamento 100% seguro</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Iframe */}
        <iframe
          src="https://pay.cakto.com.br/j6iqgss_456470"
          className="w-full border-0"
          style={{ 
            height: 'calc(100vh - 60px)',
            width: '100vw'
          }}
          onLoad={handleIframeLoad}
          title="Pagamento Seguro - Cakto"
          allow="payment"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
        />
      </div>
    </div>
  );
}

export function PricingSection() {
  const [showForm, setShowForm] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      paymentMethod: "pix"
    }
  });

  const purchaseMutation = useMutation({
    mutationFn: async (data: PurchaseFormData) => {
      return apiRequest('POST', '/api/purchases', data);
    },
    onSuccess: (data) => {
      // Tracking de compra realizada com todos os parâmetros UTM
      trackPurchase({
        conversion_value: 27.90,
        currency: 'BRL',
        content_name: 'Sono Zen - Método Completo',
        content_category: 'E-book'
      });
      
      toast({
        title: "Compra realizada!",
        description: "Em breve você receberá as instruções por email.",
      });
      form.reset();
      setShowForm(false);
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: PurchaseFormData) => {
    // Add the amount in cents (R$ 27,90 = 2790 cents)
    const purchaseData = {
      ...data,
      amount: 2790,
      status: "pending"
    };
    purchaseMutation.mutate(purchaseData);
  };

  const handlePurchaseClick = () => {
    // Enviar evento de InitiateCheckout quando inicia o processo
    trackInitiateCheckout();
    // Ir direto para o pagamento sem modal de carregamento
    setShowPaymentModal(true);
  };

  const handleLoadingComplete = () => {
    setShowLoadingModal(false);
    setShowPaymentModal(true);
  };

  const handleClosePayment = () => {
    setShowPaymentModal(false);
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
      text: "Técnicas orientais milenares"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-[var(--success-green)]" />,
      text: "Sons e frequências relaxantes"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-[var(--success-green)]" />,
      text: "Rituais noturnos prontos"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-[var(--success-green)]" />,
      text: "Acesso imediato após compra"
    }
  ];

  const bonuses = [
    {
      icon: <Gift className="h-5 w-5 text-[var(--warm-accent)]" />,
      title: "Bônus #1: Meditações Guiadas",
      description: "3 áudios para relaxamento profundo",
      value: "R$ 9,90"
    },
    {
      icon: <Clock className="h-5 w-5 text-[var(--accent-blue)]" />,
      title: "Bônus #2: Checklist Sono Perfeito",
      description: "Guia prático para otimizar seu ambiente",
      value: "R$ 9,90"
    }
  ];

  return (
    <>
      <section id="preco" className="py-20 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-blue)]/5 via-transparent to-[var(--warm-accent)]/5"></div>
        <FloatingClouds className="opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">

            
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
              Sua{" "}
              <span className="bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--celestial-blue)] bg-clip-text text-transparent font-black tracking-tight">
                Transformação
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl mt-2 text-[var(--text-secondary)]">
                Começa Hoje
              </span>
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              Muitas pessoas dormem melhor já na primeira noite! Outras sentem a diferença na terceira noite. O que todos relatam: em 7 dias, você não vai reconhecer seu sono.
            </p>
          </div>
          
          {/* Main Product Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[var(--accent-blue)]/5 backdrop-blur-xl border-2 border-[var(--accent-blue)]/40 rounded-3xl overflow-hidden shadow-2xl relative">
              
              {/* Product Header - Enhanced harmony */}
              <div className="relative bg-gradient-to-br from-[var(--accent-blue)]/12 via-[var(--warm-accent)]/8 to-[var(--celestial-blue)]/10 border-b-2 border-[var(--warm-accent)]/40 p-6 sm:p-8 md:p-12 text-center overflow-hidden">
                {/* Enhanced decorative elements */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[var(--warm-accent)]/15 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[var(--accent-blue)]/15 to-transparent rounded-full blur-xl"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-[var(--celestial-blue)]/12 to-transparent rounded-full blur-2xl"></div>
                
                {/* Enhanced icon with better harmony */}
                <div className="w-14 h-14 sm:w-18 sm:h-18 mx-auto mb-6 bg-gradient-to-br from-[var(--warm-accent)]/25 via-[var(--accent-blue)]/15 to-[var(--celestial-blue)]/20 border-2 border-[var(--warm-accent)]/40 rounded-3xl flex items-center justify-center backdrop-blur-lg shadow-xl relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--warm-accent)]/10 to-[var(--accent-blue)]/10 rounded-3xl blur opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <Moon className="h-7 w-7 sm:h-9 sm:w-9 text-[var(--warm-accent)] relative z-10" style={{ filter: 'drop-shadow(0 0 10px rgba(218, 165, 32, 0.6))' }} />
                </div>
                
                {/* Enhanced title with better gradient consistency */}
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 tracking-tight leading-tight px-2 relative z-10">
                  <span className="bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--celestial-blue)] bg-clip-text text-transparent">
                    Sono Zen
                  </span>
                  <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[var(--text-primary)] mt-2" style={{ textShadow: '0 0 12px rgba(255,255,255,0.25)' }}>
                    Método Completo
                  </span>
                </h3>
                
                <div className="max-w-md mx-auto px-4 relative z-10">
                  <p className="text-[var(--text-secondary)] text-lg sm:text-xl font-medium mb-4" style={{ textShadow: '0 0 8px rgba(255,255,255,0.15)' }}>
                    Transformação completa do seu sono
                  </p>
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--warm-accent)]/25 via-[var(--accent-blue)]/15 to-[var(--celestial-blue)]/20 border-2 border-[var(--warm-accent)]/40 rounded-full px-5 py-3 backdrop-blur-lg shadow-lg">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--warm-accent)] fill-current" />
                    <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] bg-clip-text text-transparent">
                      transformação garantida
                    </span>
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--warm-accent)] fill-current" />
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8">




                {/* Pricing - Enhanced with better visual hierarchy */}
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
                      
                      {/* Main price with enhanced visual impact */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--warm-accent)]/30 to-[var(--accent-blue)]/30 rounded-2xl blur-xl"></div>
                        <div className="relative bg-gradient-to-r from-[var(--warm-accent)]/20 to-[var(--accent-blue)]/20 rounded-2xl p-6 border-2 border-[var(--warm-accent)]/40">
                          <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-[var(--warm-accent)] via-white to-[var(--accent-blue)] bg-clip-text text-transparent tracking-tight mb-4" style={{ textShadow: '0 0 20px rgba(255,255,255,0.6)' }}>
                            R$ 27,90
                          </p>
                          

                        </div>
                      </div>
                    </div>
                    
                    {/* Savings highlight */}
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-400/30 backdrop-blur-sm">
                      <p className="text-green-300 font-bold text-lg sm:text-xl" style={{ textShadow: '0 0 8px rgba(255,255,255,0.2)' }}>
                        💚 Você economiza R$ 20,00 (42% OFF)
                      </p>
                      <p className="text-green-200 text-sm mt-1">Maior desconto do ano!</p>
                    </div>
                  </div>
                </div>

                {/* Bonuses */}
                <div className="bg-[var(--accent-blue)]/5 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border-2 border-[var(--accent-blue)]/35 backdrop-blur-sm relative">
                  <h4 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-3 sm:mb-4 text-center" style={{ textShadow: '0 0 10px rgba(255,255,255,0.25)' }}>🎁 Bônus Exclusivos (R$ 19,80)</h4>
                  <div className="space-y-3 sm:space-y-4">
                    {bonuses.map((bonus, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="text-[var(--success-green)] flex-shrink-0 mt-1">{bonus.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-[var(--text-primary)] text-sm sm:text-base" style={{ textShadow: '0 0 6px rgba(255,255,255,0.2)' }}>{bonus.title}</h5>
                          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1" style={{ textShadow: '0 0 5px rgba(255,255,255,0.15)' }}>{bonus.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-xs text-[var(--text-muted)] line-through block" style={{ textShadow: '0 0 5px rgba(255,255,255,0.15)' }}>{bonus.value}</span>
                          <div className="text-xs sm:text-sm font-bold text-[var(--success-green)]" style={{ textShadow: '0 0 6px rgba(255,255,255,0.2)' }}>GRÁTIS</div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
                
                {/* Elegant Premium Purchase Button */}
                <div className="space-y-6">
                  {/* Clean Premium Purchase Button */}
                  <div className="relative group">
                    {/* Subtle glow effect */}
                    <div className="absolute -inset-0.5 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-500" 
                         style={{ background: 'linear-gradient(135deg, hsl(220, 25%, 65%) 0%, hsl(220, 30%, 70%) 100%)' }}></div>
                    
                    <Button 
                      onClick={handlePurchaseClick}
                      className="relative w-full py-6 sm:py-7 px-8 sm:px-10 rounded-2xl text-lg sm:text-xl font-semibold transition-all duration-300 transform hover:scale-[1.01] shadow-lg hover:shadow-xl border border-white/10 backdrop-blur-sm text-white"
                      style={{ 
                        background: 'linear-gradient(135deg, hsl(220, 25%, 55%) 0%, hsl(220, 30%, 60%) 50%, hsl(220, 25%, 55%) 100%)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, hsl(220, 25%, 60%) 0%, hsl(220, 30%, 65%) 50%, hsl(220, 25%, 60%) 100%)';
                        e.currentTarget.style.boxShadow = '0 6px 25px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, hsl(220, 25%, 55%) 0%, hsl(220, 30%, 60%) 50%, hsl(220, 25%, 55%) 100%)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)';
                      }}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <Moon className="h-5 w-5 sm:h-6 sm:w-6 text-white/80" />
                        <span className="text-white font-semibold">
                          Transformar Meu Sono Agora
                        </span>
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white/70" />
                      </div>
                    </Button>
                  </div>
                  
                  {/* Enhanced Security & Trust Badges */}
                  <div className="bg-gradient-to-br from-[var(--accent-blue)]/10 via-[var(--warm-accent)]/5 to-[var(--accent-blue)]/8 rounded-3xl p-6 sm:p-8 border-2 border-[var(--warm-accent)]/40 backdrop-blur-lg relative overflow-hidden shadow-xl">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[var(--warm-accent)]/15 to-transparent rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-[var(--accent-blue)]/15 to-transparent rounded-full blur-xl"></div>
                    
                    <div className="text-center mb-6 relative z-10">
                      <h4 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2">
                        🛡️ Sua Compra está{" "}
                        <span className="bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--celestial-blue)] bg-clip-text text-transparent">
                          Protegida
                        </span>.
                      </h4>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Milhares de clientes satisfeitos confiam em nossa plataforma
                      </p>
                    </div>
                    
                    <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 relative z-10">
                      <div className="flex flex-col items-center text-center p-5 bg-gradient-to-br from-green-500/15 to-emerald-500/10 border-2 border-green-400/30 rounded-2xl backdrop-blur-sm hover:scale-105 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                          <Shield className="h-6 w-6 text-green-300" />
                        </div>
                        <h5 className="font-bold text-green-200 text-sm sm:text-base mb-1">Garantia de 7 Dias</h5>
                        <p className="text-green-100/80 text-xs sm:text-sm">Não funcionou? Devolvemos seu dinheiro</p>
                      </div>
                      
                      <div className="flex flex-col items-center text-center p-5 bg-gradient-to-br from-blue-500/15 to-cyan-500/10 border-2 border-blue-400/30 rounded-2xl backdrop-blur-sm hover:scale-105 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                          <Lock className="h-6 w-6 text-blue-300" />
                        </div>
                        <h5 className="font-bold text-blue-200 text-sm sm:text-base mb-1">Pagamento Seguro</h5>
                        <p className="text-blue-100/80 text-xs sm:text-sm">Criptografia SSL 256-bits</p>
                      </div>
                      
                      <div className="flex flex-col items-center text-center p-5 bg-gradient-to-br from-[var(--warm-accent)]/15 to-orange-500/10 border-2 border-[var(--warm-accent)]/30 rounded-2xl backdrop-blur-sm hover:scale-105 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-[var(--warm-accent)]/20 to-orange-400/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                          <Download className="h-6 w-6 text-[var(--warm-accent)]" />
                        </div>
                        <h5 className="font-bold text-[var(--warm-accent)] text-sm sm:text-base mb-1">Acesso Instantâneo</h5>
                        <p className="text-orange-100/80 text-xs sm:text-sm">Receba em até 2 minutos</p>
                      </div>
                    </div>
                    
                    {/* Social proof footer */}
                    <div className="text-center mt-6 pt-4 border-t border-[var(--warm-accent)]/20 relative z-10">
                      <p className="text-sm text-[var(--text-secondary)]">
                        ⭐ 4.9/5 estrelas • 14.847+ transformações • 98% de satisfação
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-gradient-to-br from-[var(--accent-blue)]/10 to-[var(--warm-accent)]/5 backdrop-blur-xl border border-[var(--accent-blue)]/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>Finalizar Compra</h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)]" style={{ textShadow: '0 0 6px rgba(255,255,255,0.15)' }}>Sono Zen - Método Completo</p>
              <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[var(--accent-blue)] to-[var(--warm-accent)] bg-clip-text text-transparent mt-2" style={{ textShadow: '0 0 12px rgba(255,255,255,0.25)' }}>R$ 27,90</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(11) 99999-9999" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Forma de pagamento</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pix">PIX</SelectItem>
                          <SelectItem value="credit_card">Cartão de Crédito</SelectItem>
                          <SelectItem value="debit_card">Cartão de Débito</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowForm(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={purchaseMutation.isPending}
                  >
                    {purchaseMutation.isPending ? "Processando..." : "Finalizar Compra"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}

      {/* Loading Modal */}
      {showLoadingModal && (
        <LoadingModal onComplete={handleLoadingComplete} />
      )}

      {/* Payment Modal with Cakto iframe */}
      {showPaymentModal && (
        <PaymentModal onClose={handleClosePayment} />
      )}
    </>
  );
}