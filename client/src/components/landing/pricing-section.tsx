import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { insertPurchaseSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Shield, Lock, Flame, Moon, CheckCircle, Star, Clock, Users, Download, CreditCard, Trophy, Gift } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import { z } from "zod";

const purchaseFormSchema = insertPurchaseSchema.extend({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
});

type PurchaseFormData = z.infer<typeof purchaseFormSchema>;

export function PricingSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      amount: 1990, // R$ 19.90 in cents
      paymentMethod: "credit_card",
      status: "pending"
    }
  });

  const purchaseMutation = useMutation({
    mutationFn: async (data: PurchaseFormData) => {
      return apiRequest("POST", "/api/purchases", data);
    },
    onSuccess: () => {
      toast({
        title: "Compra registrada!",
        description: "Você receberá as instruções de pagamento por email.",
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Houve um problema ao processar sua compra. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  const handlePurchaseClick = () => {
    setIsDialogOpen(true);
  };

  const onSubmit = (data: PurchaseFormData) => {
    purchaseMutation.mutate(data);
  };

  const features = [
    {
      icon: <CheckCircle className="h-5 w-5 text-[var(--success-green)]" />,
      text: "Método natural sem medicamentos"
    },
    {
      icon: <Moon className="h-5 w-5 text-[var(--accent-blue)]" />,
      text: "Programa prático de 7 noites"
    },
    {
      icon: <Star className="h-5 w-5 text-[var(--warm-accent)]" />,
      text: "Técnicas orientais milenares"
    },
    {
      icon: <Shield className="h-5 w-5 text-[var(--success-green)]" />,
      text: "Sons e frequências relaxantes"
    },
    {
      icon: <Trophy className="h-5 w-5 text-[var(--warm-accent)]" />,
      text: "Rituais noturnos prontos"
    },
    {
      icon: <Download className="h-5 w-5 text-[var(--accent-blue)]" />,
      text: "Acesso imediato após compra"
    }
  ];

  const bonuses = [
    {
      icon: <Gift className="h-6 w-6 text-[var(--warm-accent)]" />,
      title: "Bônus #1: Meditações Guiadas",
      description: "3 áudios exclusivos para relaxamento profundo",
      value: "R$ 29,90"
    },
    {
      icon: <Clock className="h-6 w-6 text-[var(--accent-blue)]" />,
      title: "Bônus #2: Checklist Sono Perfeito",
      description: "Guia prático para otimizar seu ambiente",
      value: "R$ 19,90"
    }
  ];

  const socialProof = [
    { icon: <Users className="h-5 w-5" />, text: "+2.847 pessoas transformadas" },
    { icon: <Star className="h-5 w-5" />, text: "4.8/5 de avaliação média" },
    { icon: <Shield className="h-5 w-5" />, text: "100% seguro e confiável" }
  ];

  return (
    <>
      <section id="preco" className="py-20 dreamy-gradient relative overflow-hidden">
        <FloatingClouds className="opacity-25" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
              Sua Transformação Está a
              <span className="block bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] bg-clip-text text-transparent">
                1 Clique de Distância
              </span>
            </h2>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-8">
              Pare de sofrer com noites mal dormidas. Comece sua jornada rumo ao sono restaurador hoje mesmo.
            </p>
            
            {/* Social Proof */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {socialProof.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-[var(--text-muted)]">
                  {item.icon}
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Main Offer */}
            <div className="lg:col-span-2">
              <div className="card-modern p-8 md:p-12 relative">
                {/* Popular Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[var(--warm-accent)] to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    🔥 MAIS POPULAR
                  </div>
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                    Sono Zen - Edição Completa
                  </h3>
                  <p className="text-[var(--text-secondary)] text-lg mb-6">
                    Método revolucionário para conquistar um sono profundo e reparador
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--card-hover)] border border-[var(--border-subtle)]">
                      {feature.icon}
                      <span className="text-[var(--text-secondary)] font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="bg-gradient-to-r from-[var(--warm-accent)]/10 to-[var(--accent-blue)]/10 rounded-2xl p-8 mb-8 border border-[var(--warm-accent)]/20">
                  <div className="text-center">
                    <p className="text-[var(--text-muted)] mb-2">Valor normal:</p>
                    <p className="text-2xl text-[var(--text-muted)] line-through mb-4">R$ 89,70</p>
                    <p className="text-[var(--text-muted)] mb-2">Oferta especial hoje:</p>
                    <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-4">R$ 19,90</p>
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
                      <p className="text-[var(--success-green)] font-bold text-lg">
                        💰 Economia de R$ 69,80 (78% OFF)
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button 
                  onClick={handlePurchaseClick}
                  className="w-full bg-gradient-to-r from-[var(--warm-accent)] to-orange-500 hover:from-[var(--warm-accent)]/90 hover:to-orange-500/90 text-white py-4 sm:py-6 px-4 sm:px-8 rounded-xl text-base sm:text-xl font-bold hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 mb-6"
                >
                  <CreditCard className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6" />
                  <span className="hidden sm:inline">QUERO TRANSFORMAR MEU SONO AGORA</span>
                  <span className="sm:hidden">TRANSFORMAR SONO AGORA</span>
                </Button>

                {/* Security badges */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-[var(--success-green)]" />
                    <span>Garantia de 7 dias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-[var(--success-green)]" />
                    <span>Pagamento 100% seguro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-[var(--success-green)]" />
                    <span>Acesso instantâneo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bonuses Sidebar */}
            <div className="space-y-6">
              <div className="card-modern p-6">
                <h4 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-4 text-center">
                  🎁 Bônus Exclusivos
                </h4>
                
                <div className="space-y-4">
                  {bonuses.map((bonus, index) => (
                    <div key={index} className="border border-[var(--border-subtle)] rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-2">
                        {bonus.icon}
                        <div>
                          <h5 className="font-semibold text-[var(--text-primary)] text-sm">{bonus.title}</h5>
                          <p className="text-xs text-[var(--text-muted)] mb-2">{bonus.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[var(--text-muted)] line-through">{bonus.value}</span>
                            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                              GRÁTIS
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-[var(--success-green)]/10 to-emerald-500/10 rounded-lg border border-[var(--success-green)]/30">
                  <p className="text-center text-[var(--text-primary)] font-bold">
                    Valor total dos bônus:
                    <span className="block text-lg text-[var(--text-muted)] line-through mb-1">R$ 49,80</span>
                    <span className="block text-2xl text-[var(--success-green)] font-bold">
                      💎 TODOS GRÁTIS HOJE!
                    </span>
                  </p>
                </div>
              </div>

              {/* Urgency */}
              <div className="card-modern p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30">
                <div className="text-center">
                  <Flame className="h-8 w-8 text-red-500 mx-auto mb-3" />
                  <h4 className="font-bold text-[var(--text-primary)] mb-2">⚠️ Oferta Limitada</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    Esta promoção especial expira em breve e o preço voltará para R$ 89,70
                  </p>
                  <div className="bg-red-500/20 rounded-lg p-3 border border-red-500/40">
                    <p className="text-red-400 font-bold text-sm">
                      Restam apenas 47 vagas com desconto
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[90vh] overflow-y-auto" aria-describedby="checkout-description">
          <DialogHeader className="text-center pb-4 border-b border-[var(--border-subtle)]">
            <DialogTitle className="text-2xl font-bold text-[var(--text-primary)]">
              🛒 Finalizar Compra
            </DialogTitle>
            <p id="checkout-description" className="text-[var(--text-secondary)]">
              Você está a poucos passos de transformar suas noites de sono
            </p>
          </DialogHeader>
          
          {/* Order Summary */}
          <div className="bg-[var(--card-hover)] rounded-lg p-4 mb-4 border border-[var(--border-subtle)]">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3">Resumo do Pedido</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Sono Zen - Edição Completa</span>
                <span className="text-[var(--text-primary)] font-medium">R$ 19,90</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-muted)]">+ Bônus: Meditações Guiadas</span>
                <span className="text-[var(--success-green)]">Grátis</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-muted)]">+ Bônus: Checklist Sono Perfeito</span>
                <span className="text-[var(--success-green)]">Grátis</span>
              </div>
              <div className="border-t border-[var(--border-subtle)] pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span className="text-[var(--text-primary)]">Total</span>
                  <span className="text-[var(--warm-accent)] text-lg">R$ 19,90</span>
                </div>
              </div>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
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
              
              <div className="space-y-4">
                {/* Security badges */}
                <div className="flex justify-center gap-4 text-xs text-[var(--text-muted)]">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-[var(--success-green)]" />
                    <span>SSL Seguro</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock className="h-3 w-3 text-[var(--success-green)]" />
                    <span>Dados Protegidos</span>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[var(--warm-accent)] to-orange-500 hover:from-[var(--warm-accent)]/90 hover:to-orange-500/90 text-white py-4 px-8 rounded-xl text-lg font-bold hover:shadow-xl transition-all duration-300"
                  disabled={purchaseMutation.isPending}
                >
                  {purchaseMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processando compra...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      FINALIZAR COMPRA - R$ 19,90
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-center text-[var(--text-muted)]">
                  Ao finalizar a compra, você concorda com nossos <span className="text-[var(--accent-blue)]">termos de uso</span>.<br/>
                  Acesso imediato ao material após confirmação do pagamento.
                </p>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
