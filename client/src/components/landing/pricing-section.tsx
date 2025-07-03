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
import { Shield, Lock, Star, Cloud, CheckCircle, Download, Clock, Users, Gift, Moon } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import { z } from "zod";

const purchaseFormSchema = insertPurchaseSchema.extend({
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos")
});

type PurchaseFormData = z.infer<typeof purchaseFormSchema>;

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
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-[var(--accent-blue)]/10 to-[var(--warm-accent)]/5 backdrop-blur-xl border border-[var(--accent-blue)]/30 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-[var(--warm-accent)]/20 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-[var(--accent-blue)]/20 to-transparent rounded-full blur-xl"></div>
        
        <div className="text-center relative z-10">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[var(--warm-accent)]/20 to-[var(--accent-blue)]/20 border border-[var(--warm-accent)]/30 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Moon className="h-8 w-8 text-[var(--warm-accent)]" style={{ filter: 'drop-shadow(0 0 8px rgba(218, 165, 32, 0.5))' }} />
          </div>
          
          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-8" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
            🌙 Quase lá!
          </h3>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 mb-4 overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Redirecting text */}
          <p className="text-sm text-[var(--text-secondary)]" style={{ textShadow: '0 0 6px rgba(255,255,255,0.15)' }}>
            Redirecionando para pagamento seguro...
          </p>
        </div>
      </div>
    </div>
  );
}

export function PricingSection() {
  const [showForm, setShowForm] = useState(false);
  const [showRedirectModal, setShowRedirectModal] = useState(false);
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
    onSuccess: () => {
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
    purchaseMutation.mutate(data);
  };

  const handlePurchaseClick = () => {
    // Facebook Pixel - Event tracking para botão de compra
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: 'Sono Zen - Método Completo',
        content_category: 'E-book',
        value: 27.90,
        currency: 'BRL'
      }, {test_event_code: 'TEST74923'});
    }
    
    setShowRedirectModal(true);
  };

  const handleConfirmRedirect = () => {
    // Facebook Pixel - Event tracking para redirecionamento ao pagamento
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'AddPaymentInfo', {
        content_name: 'Sono Zen - Método Completo',
        content_category: 'E-book',
        value: 27.90,
        currency: 'BRL'
      }, {test_event_code: 'TEST74923'});
    }
    
    const paymentUrl = 'https://pay.cakto.com.br/j6iqgss_456470';
    
    try {
      // Primeira tentativa: window.open
      const newWindow = window.open(paymentUrl, '_blank', 'noopener,noreferrer');
      
      // Se foi bloqueado, tenta window.location
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // Fallback: redirecionar na mesma aba
        window.location.href = paymentUrl;
      }
    } catch (error) {
      // Último fallback: redirecionar na mesma aba
      window.location.href = paymentUrl;
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
      description: "3 áudios exclusivos para relaxamento profundo",
      value: "R$ 29,90"
    },
    {
      icon: <Clock className="h-5 w-5 text-[var(--accent-blue)]" />,
      title: "Bônus #2: Checklist Sono Perfeito",
      description: "Guia prático para otimizar seu ambiente",
      value: "R$ 19,90"
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
            <div className="inline-flex items-center gap-2 bg-[var(--card-bg)]/80 backdrop-blur-sm border border-[var(--border-subtle)] rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-[var(--accent-blue)]" />
              <span className="text-sm text-[var(--text-secondary)] font-medium">SUA TRANSFORMAÇÃO - 7 NOITES PARA UM NOVO VOCÊ</span>
            </div>
            
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
                      em apenas 7 noites
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
                    {/* Header with urgency */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-full px-4 py-2 mb-4">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-bold text-red-300">OFERTA LIMITADA</span>
                    </div>
                    
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
                          
                          {/* Payment methods icons */}
                          <div className="flex items-center justify-center gap-3 opacity-80">
                            <div className="text-white text-xs font-medium">Aceita:</div>
                            <div className="flex items-center gap-2">
                              {/* PIX */}
                              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                                <span className="text-xs font-bold text-gray-800">PIX</span>
                              </div>
                              {/* Credit Card */}
                              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                                <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zM4 18V8h16v10H4z"/>
                                  <path d="M6 10h2v2H6zm3 0h5v2H9z"/>
                                </svg>
                              </div>
                              {/* Boleto */}
                              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                                <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M3 3h18v18H3V3zm2 16h14V5H5v14zm2-12h10v2H7V7zm0 4h7v2H7v-2zm0 4h10v2H7v-2z"/>
                                </svg>
                              </div>
                              {/* PicPay */}
                              <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center">
                                <span className="text-xs font-bold text-white">P</span>
                              </div>
                              {/* Apple Pay */}
                              <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                </svg>
                              </div>
                              {/* Google Pay */}
                              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                  <path fill="#4285F4" d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
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
                  <h4 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-3 sm:mb-4 text-center" style={{ textShadow: '0 0 10px rgba(255,255,255,0.25)' }}>🎁 Bônus Exclusivos (R$ 49,80)</h4>
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
                
                {/* Purchase Button - Enhanced with urgency and appeal */}
                <div className="space-y-6">
                  {/* Call-to-action intro */}
                  <div className="text-center mb-4">
                    <p className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-2">
                      Sua nova vida começa{" "}
                      <span className="text-white">
                        agora
                      </span>
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Mais de 14.847 pessoas já transformaram suas noites
                    </p>
                  </div>
                  
                  {/* Enhanced Purchase Button */}
                  <div className="relative group">
                    {/* Animated background glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--warm-accent)] rounded-3xl blur opacity-30 group-hover:opacity-50 animate-pulse"></div>
                    
                    <Button 
                      onClick={handlePurchaseClick}
                      className="w-full relative bg-gradient-to-r from-[var(--warm-accent)] via-[hsl(45,100%,60%)] to-[var(--accent-blue)] border-2 border-[var(--warm-accent)] text-white py-6 sm:py-8 px-6 sm:px-8 rounded-3xl text-lg sm:text-xl font-bold transition-all duration-500 group shadow-2xl shadow-[var(--warm-accent)]/40 hover:scale-105 hover:shadow-3xl"
                    >
                      {/* Button content with enhanced styling */}
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex items-center gap-3">
                          <Moon className="h-6 w-6 sm:h-7 sm:w-7 text-white transition-transform duration-300 group-hover:rotate-12" />
                          <span className="text-white font-bold tracking-wide text-center leading-tight" style={{ textShadow: '0 0 12px rgba(255,255,255,0.5)' }}>
                            SIM! QUERO DORMIR COMO UM BEBÊ
                          </span>
                          <Moon className="h-6 w-6 sm:h-7 sm:w-7 text-white transition-transform duration-300 group-hover:-rotate-12" />
                        </div>
                        <span className="text-sm font-medium opacity-90">
                          💳 Acesso instantâneo após o pagamento
                        </span>
                      </div>
                      
                      {/* Floating sparkle effect */}
                      <div className="absolute top-2 right-4 w-2 h-2 bg-white rounded-full animate-ping opacity-60"></div>
                      <div className="absolute bottom-3 left-6 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-40 animation-delay-300"></div>
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
                        </span>
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
              <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[var(--accent-blue)] to-[var(--warm-accent)] bg-clip-text text-transparent mt-2" style={{ textShadow: '0 0 12px rgba(255,255,255,0.25)' }}>R$ 19,90</p>
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

      {/* Redirect Modal with Progress Bar */}
      {showRedirectModal && (
        <RedirectModal onRedirect={handleConfirmRedirect} />
      )}
    </>
  );
}