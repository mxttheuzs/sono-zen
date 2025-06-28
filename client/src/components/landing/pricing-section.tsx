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
import { Shield, Lock, Flame, Moon, CheckCircle, Star, Clock, Users, Download, CreditCard, Trophy, Gift, Cloud } from "lucide-react";
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
      const response = await apiRequest('/api/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
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

  const bonuses = [
    {
      icon: <Gift className="h-6 w-6 text-[var(--warm-accent)]" />,
      title: "Bônus #1: Meditações Guiadas",
      description: "3 áudios exclusivos para relaxamento profundo",
      value: "R$ 29,90"
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-400" />,
      title: "Bônus #2: Checklist Sono Perfeito",
      description: "Guia prático para otimizar seu ambiente",
      value: "R$ 19,90"
    }
  ];

  return (
    <>
      <section id="preco" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20"></div>
        <FloatingClouds className="opacity-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">Método Comprovado Cientificamente</span>
            </div>
            
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Transforme Suas Noites
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Comece Hoje Mesmo
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Junte-se a milhares de pessoas que já conquistaram o sono dos sonhos com o Método Sono Zen
            </p>
          </div>
          
          {/* Main Product Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center relative">
                <div className="absolute top-4 right-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs font-semibold text-white">MAIS VENDIDO</span>
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Sono Zen - Método Completo
                </h3>
                <p className="text-blue-100 text-lg mb-6">
                  Transformação completa do seu sono em 7 noites
                </p>
                
                {/* Price */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-2xl text-blue-200 line-through">R$ 89,70</span>
                  <span className="text-5xl font-bold text-white">R$ 19,90</span>
                  <div className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                    78% OFF
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8 md:p-12">
                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Método natural sem medicamentos</h4>
                      <p className="text-sm text-slate-400">100% baseado em técnicas orientais milenares</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Programa prático de 7 noites</h4>
                      <p className="text-sm text-slate-400">Protocolo completo passo a passo</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Técnicas orientais milenares</h4>
                      <p className="text-sm text-slate-400">Sabedoria ancestral validada pela ciência</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Sons e frequências relaxantes</h4>
                      <p className="text-sm text-slate-400">Áudios especiais para indução do sono</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Rituais noturnos prontos</h4>
                      <p className="text-sm text-slate-400">Sequências organizadas para máxima eficácia</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Acesso imediato após compra</h4>
                      <p className="text-sm text-slate-400">Download instantâneo e vitalício</p>
                    </div>
                  </div>
                </div>
                
                {/* Bonuses */}
                <div className="bg-slate-800/20 rounded-2xl p-6 mb-8">
                  <h4 className="text-xl font-bold text-white mb-4 text-center">🎁 Bônus Exclusivos (R$ 49,80)</h4>
                  <div className="space-y-3">
                    {bonuses.map((bonus, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="text-green-400">{bonus.icon}</div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-white text-sm">{bonus.title}</h5>
                          <p className="text-xs text-slate-400">{bonus.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-slate-500 line-through">{bonus.value}</span>
                          <div className="text-xs font-bold text-green-400">GRÁTIS</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-4 pt-4 border-t border-slate-700">
                    <p className="text-green-400 font-bold">💚 TODOS GRÁTIS HOJE!</p>
                  </div>
                </div>
                
                {/* Purchase Button */}
                <div className="space-y-6">
                  <Button 
                    onClick={handlePurchaseClick}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 px-8 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <Moon className="h-6 w-6 mr-3" />
                    ✨ QUERO TRANSFORMAR MINHAS NOITES
                  </Button>
                  
                  {/* Security badges */}
                  <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-400" />
                      <span>Garantia de 30 dias</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-green-400" />
                      <span>Pagamento seguro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-green-400" />
                      <span>Acesso instantâneo</span>
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Finalizar Compra</h3>
              <p className="text-gray-600">Sono Zen - Método Completo</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">R$ 19,90</p>
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