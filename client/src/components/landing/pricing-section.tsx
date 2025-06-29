import { useState } from "react";
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

export function PricingSection() {
  const [showForm, setShowForm] = useState(false);
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
    setShowForm(true);
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
              Investimento em Seu
              <span className="block bg-gradient-to-r from-[hsl(200,100%,60%)] via-[var(--warm-accent)] to-[hsl(45,100%,65%)] bg-clip-text text-transparent font-black tracking-tight" style={{ textShadow: '0 0 20px rgba(218, 165, 32, 0.4)' }}>
                Bem-Estar
              </span>
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              Muitas pessoas dormem melhor já na primeira noite! Outras sentem a diferença na terceira noite. O que todos relatam: em 7 dias, você não vai reconhecer seu sono.
            </p>
          </div>
          
          {/* Main Product Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[var(--accent-blue)]/5 backdrop-blur-xl border border-[var(--accent-blue)]/20 rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Product Header */}
              <div className="relative bg-gradient-to-br from-[var(--accent-blue)]/15 via-[var(--warm-accent)]/10 to-[var(--accent-blue)]/5 border-b border-[var(--accent-blue)]/30 p-6 sm:p-8 md:p-12 text-center overflow-hidden">
                {/* Decorative elements - adjusted for mobile */}
                <div className="absolute top-2 left-4 sm:top-4 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[var(--warm-accent)]/20 to-transparent rounded-full blur-xl"></div>
                <div className="absolute bottom-2 right-4 sm:bottom-4 sm:right-8 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[var(--accent-blue)]/20 to-transparent rounded-full blur-xl"></div>
                
                {/* Icon - responsive sizing */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-[var(--warm-accent)]/20 to-[var(--accent-blue)]/20 border border-[var(--warm-accent)]/30 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Moon className="h-6 w-6 sm:h-8 sm:w-8 text-[var(--warm-accent)]" style={{ filter: 'drop-shadow(0 0 8px rgba(218, 165, 32, 0.5))' }} />
                </div>
                
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-primary)] mb-3 sm:mb-4 tracking-tight leading-tight px-2">
                  <span className="bg-gradient-to-r from-[var(--warm-accent)] via-[hsl(45,100%,70%)] to-[var(--accent-blue)] bg-clip-text text-transparent" style={{ textShadow: '0 0 15px rgba(218, 165, 32, 0.3)' }}>
                    Sono Zen
                  </span>
                  <span className="block text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[var(--text-primary)] mt-1 sm:mt-2" style={{ textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>
                    Método Completo
                  </span>
                </h3>
                
                <div className="max-w-sm sm:max-w-md mx-auto px-4">
                  <p className="text-[var(--text-secondary)] text-base sm:text-lg font-medium mb-3 sm:mb-4" style={{ textShadow: '0 0 8px rgba(255,255,255,0.15)' }}>
                    Transformação completa do seu sono
                  </p>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--warm-accent)]/20 to-[var(--accent-blue)]/20 border border-[var(--warm-accent)]/30 rounded-full px-3 sm:px-4 py-2 backdrop-blur-sm">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 text-[var(--warm-accent)] fill-current" />
                    <span className="text-xs sm:text-sm font-semibold text-[var(--warm-accent)]">em apenas 7 noites</span>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8">
                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-[var(--accent-blue)]/5 border border-[var(--accent-blue)]/15 backdrop-blur-sm hover:bg-[var(--accent-blue)]/10 transition-all duration-300">
                      <div className="text-[var(--accent-blue)] flex-shrink-0">{feature.icon}</div>
                      <span className="text-[var(--text-secondary)] font-medium text-sm sm:text-base" style={{ textShadow: '0 0 6px rgba(255,255,255,0.15)' }}>{feature.text}</span>
                    </div>
                  ))}
                </div>



                {/* Pricing */}
                <div className="bg-gradient-to-r from-[var(--accent-blue)]/8 to-[var(--warm-accent)]/8 rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-[var(--accent-blue)]/25 backdrop-blur-sm">
                  <div className="text-center">
                    <p className="text-[var(--text-muted)] mb-2 text-sm sm:text-base" style={{ textShadow: '0 0 6px rgba(255,255,255,0.15)' }}>Valor normal:</p>
                    <p className="text-xl sm:text-2xl text-[var(--text-muted)] line-through mb-3 sm:mb-4" style={{ textShadow: '0 0 6px rgba(255,255,255,0.15)' }}>R$ 89,70</p>
                    <p className="text-[var(--accent-blue)] font-semibold mb-2 sm:mb-3 text-sm sm:text-base" style={{ textShadow: '0 0 8px rgba(255,255,255,0.2)' }}>Oferta especial hoje:</p>
                    <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-3 sm:mb-4" style={{ textShadow: '0 0 15px rgba(255,255,255,0.4)' }}>
                      R$ 19,90
                    </p>
                    <div className="bg-gradient-to-r from-[var(--warm-accent)]/20 to-[var(--accent-blue)]/20 rounded-xl p-3 sm:p-4 border border-[var(--warm-accent)]/30 backdrop-blur-sm">
                      <p className="text-[var(--warm-accent)] font-bold text-base sm:text-lg" style={{ textShadow: '0 0 8px rgba(255,255,255,0.2)' }}>
                        Economia de R$ 69,80 (78% OFF)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bonuses */}
                <div className="bg-[var(--accent-blue)]/5 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-[var(--accent-blue)]/20 backdrop-blur-sm">
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
                  <div className="text-center mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[var(--border-subtle)]">
                    <p className="text-[var(--success-green)] font-bold text-sm sm:text-base" style={{ textShadow: '0 0 8px rgba(255,255,255,0.25)' }}>💚 TODOS GRÁTIS HOJE!</p>
                  </div>
                </div>
                
                {/* Purchase Button */}
                <div className="space-y-6">
                  <Button 
                    onClick={handlePurchaseClick}
                    className="w-full relative bg-gradient-to-r from-[var(--warm-accent)] to-[hsl(35,70%,50%)] border-2 border-[var(--warm-accent)] text-white py-6 sm:py-8 px-4 sm:px-8 rounded-2xl text-base sm:text-xl font-semibold transition-all duration-500 group animate-enhanced-float shadow-lg shadow-[var(--warm-accent)]/30"
                    style={{ filter: 'drop-shadow(0 0 15px rgba(218, 165, 32, 0.6))' }}
                  >
                    {/* Button content */}
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <Moon className="h-5 w-5 sm:h-6 sm:w-6 text-white transition-colors duration-300" />
                      <span className="text-white font-semibold tracking-wide text-center leading-tight" style={{ textShadow: '0 0 10px rgba(255,255,255,0.4)' }}>
                        QUERO TRANSFORMAR MINHAS NOITES
                      </span>
                    </div>
                  </Button>
                  
                  {/* Security badges - mobile optimized */}
                  <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20 px-3 sm:px-4 py-2 rounded-full backdrop-blur-sm">
                      <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-[var(--accent-blue)]" style={{ filter: 'drop-shadow(0 0 3px rgba(135, 206, 250, 0.4))' }} />
                      <span className="text-[var(--text-secondary)] text-xs sm:text-sm" style={{ textShadow: '0 0 5px rgba(255,255,255,0.15)' }}>Garantia de 30 dias</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20 px-3 sm:px-4 py-2 rounded-full backdrop-blur-sm">
                      <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-[var(--accent-blue)]" style={{ filter: 'drop-shadow(0 0 3px rgba(135, 206, 250, 0.4))' }} />
                      <span className="text-[var(--text-secondary)] text-xs sm:text-sm" style={{ textShadow: '0 0 5px rgba(255,255,255,0.15)' }}>Pagamento seguro</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[var(--warm-accent)]/10 border border-[var(--warm-accent)]/20 px-3 sm:px-4 py-2 rounded-full backdrop-blur-sm">
                      <Download className="h-3 w-3 sm:h-4 sm:w-4 text-[var(--warm-accent)]" style={{ filter: 'drop-shadow(0 0 3px rgba(135, 206, 250, 0.4))' }} />
                      <span className="text-[var(--text-secondary)] text-xs sm:text-sm" style={{ textShadow: '0 0 5px rgba(255,255,255,0.15)' }}>Acesso instantâneo</span>
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
    </>
  );
}