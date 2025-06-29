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
import { Shield, Lock, Star, Moon, CheckCircle, Download, Clock, Users, Gift } from "lucide-react";
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
              <span className="block bg-gradient-to-r from-[var(--accent-blue)] to-[var(--warm-accent)] bg-clip-text text-transparent">
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
              <div className="bg-gradient-to-r from-[var(--accent-blue)]/10 to-[var(--warm-accent)]/10 border-b border-[var(--accent-blue)]/20 p-8 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
                  Sono Zen - Método Completo
                </h3>
                <p className="text-[var(--text-secondary)] text-lg">
                  Transformação completa do seu sono em 7 noites
                </p>
              </div>
              
              {/* Content */}
              <div className="p-8">
                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-[var(--accent-blue)]/5 border border-[var(--accent-blue)]/15 backdrop-blur-sm hover:bg-[var(--accent-blue)]/10 transition-all duration-300">
                      <div className="text-[var(--accent-blue)]">{feature.icon}</div>
                      <span className="text-[var(--text-secondary)] font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Sleep Journey Preview */}
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-r from-[var(--accent-blue)]/10 to-[var(--warm-accent)]/10 border border-[var(--accent-blue)]/30 rounded-lg p-4 mb-4">
                    <p className="text-[var(--accent-blue)] font-semibold text-sm">
                      🌙 <span className="animate-pulse">Sua jornada</span> para o sono perfeito começa hoje
                    </p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-gradient-to-r from-[var(--accent-blue)]/8 to-[var(--warm-accent)]/8 rounded-2xl p-8 mb-8 border border-[var(--accent-blue)]/25 backdrop-blur-sm">
                  <div className="text-center">
                    <p className="text-[var(--text-muted)] mb-2">Valor normal:</p>
                    <p className="text-2xl text-[var(--text-muted)] line-through mb-4">R$ 89,70</p>
                    <p className="text-[var(--accent-blue)] font-semibold mb-3">Oferta especial hoje:</p>
                    <div className="relative inline-block mb-4">
                      <div className="absolute -inset-2 bg-gradient-to-r from-[var(--accent-blue)]/20 to-[var(--warm-accent)]/20 rounded-2xl blur-lg"></div>
                      <p className="relative text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent shadow-2xl">
                        R$ 19,90
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-[var(--warm-accent)]/20 to-[var(--accent-blue)]/20 rounded-xl p-4 border border-[var(--warm-accent)]/30 backdrop-blur-sm">
                      <p className="text-[var(--warm-accent)] font-bold text-lg">
                        Economia de R$ 69,80 (78% OFF)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bonuses */}
                <div className="bg-[var(--accent-blue)]/5 rounded-2xl p-6 mb-8 border border-[var(--accent-blue)]/20 backdrop-blur-sm">
                  <h4 className="text-xl font-bold text-[var(--text-primary)] mb-4 text-center">🎁 Bônus Exclusivos (R$ 49,80)</h4>
                  <div className="space-y-3">
                    {bonuses.map((bonus, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="text-[var(--success-green)]">{bonus.icon}</div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-[var(--text-primary)] text-sm">{bonus.title}</h5>
                          <p className="text-xs text-[var(--text-muted)]">{bonus.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-[var(--text-muted)] line-through">{bonus.value}</span>
                          <div className="text-xs font-bold text-[var(--success-green)]">GRÁTIS</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-4 pt-4 border-t border-[var(--border-subtle)]">
                    <p className="text-[var(--success-green)] font-bold">💚 TODOS GRÁTIS HOJE!</p>
                  </div>
                </div>
                
                {/* Purchase Button */}
                <div className="space-y-6">
                  <div className="relative group">
                    {/* Glow effect background */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-blue)] via-[var(--warm-accent)] to-[var(--accent-blue)] rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500 animate-pulse"></div>
                    
                    {/* Main button */}
                    <Button 
                      onClick={handlePurchaseClick}
                      className="w-full relative overflow-hidden bg-transparent backdrop-blur-md border-2 border-[var(--accent-blue)]/40 hover:border-[var(--warm-accent)]/60 text-white py-8 px-8 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] group"
                    >
                      {/* Subtle gradient background on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-blue)]/5 via-transparent to-[var(--warm-accent)]/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      
                      {/* Border gradient animation */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent-blue)] via-[var(--warm-accent)] to-[var(--accent-blue)] opacity-0 group-hover:opacity-20 transition-all duration-500 -z-10"></div>
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -skew-x-12 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                      
                      {/* Button content */}
                      <div className="relative flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[var(--warm-accent)]/70 rounded-full animate-pulse"></div>
                          <Moon className="h-6 w-6 text-[var(--accent-blue)] group-hover:text-[var(--warm-accent)] transition-colors duration-300" />
                          <div className="w-2 h-2 bg-[var(--warm-accent)]/70 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                        </div>
                        <span className="text-white font-extrabold tracking-wide group-hover:text-[var(--warm-accent)] transition-all duration-300">
                          QUERO TRANSFORMAR MINHAS NOITES
                        </span>
                      </div>
                      
                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--warm-accent)] group-hover:w-3/4 transition-all duration-500 rounded-full"></div>
                    </Button>
                  </div>
                  
                  {/* Security badges */}
                  <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20 px-4 py-2 rounded-full backdrop-blur-sm">
                      <Shield className="h-4 w-4 text-[var(--accent-blue)]" />
                      <span className="text-[var(--text-secondary)]">Garantia de 30 dias</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20 px-4 py-2 rounded-full backdrop-blur-sm">
                      <Lock className="h-4 w-4 text-[var(--accent-blue)]" />
                      <span className="text-[var(--text-secondary)]">Pagamento seguro</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[var(--warm-accent)]/10 border border-[var(--warm-accent)]/20 px-4 py-2 rounded-full backdrop-blur-sm">
                      <Download className="h-4 w-4 text-[var(--warm-accent)]" />
                      <span className="text-[var(--text-secondary)]">Acesso instantâneo</span>
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
        <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[var(--accent-blue)]/10 to-[var(--warm-accent)]/5 backdrop-blur-xl border border-[var(--accent-blue)]/30 rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Finalizar Compra</h3>
              <p className="text-[var(--text-secondary)]">Sono Zen - Método Completo</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-[var(--accent-blue)] to-[var(--warm-accent)] bg-clip-text text-transparent mt-2">R$ 19,90</p>
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