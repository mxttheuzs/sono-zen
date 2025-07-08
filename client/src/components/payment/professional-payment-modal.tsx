import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Moon, Copy, CheckCircle, Clock, CreditCard, Shield, Zap, QrCode, FileText, Star, Lock, Sparkles, Users, Phone, Mail, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfessionalPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomerData {
  name: string;
  email: string;
  phone: string;
}

interface CardData {
  number: string;
  expiry: string;
  cvv: string;
  holder_name: string;
}

interface Transaction {
  id: string;
  external_id: string;
  status: string;
  total_value: number;
  pix?: {
    payload: string;
  };
  credit_card?: {
    status: string;
    authorization_code: string;
  };
  boleto?: {
    barcode: string;
    due_date: string;
    link: string;
  };
}

export default function ProfessionalPaymentModal({ isOpen, onClose }: ProfessionalPaymentModalProps) {
  const [activeTab, setActiveTab] = useState<'pix' | 'credit' | 'boleto'>('pix');
  const [step, setStep] = useState<'form' | 'processing' | 'payment'>('form');
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    email: '',
    phone: ''
  });
  const [cardData, setCardData] = useState<CardData>({
    number: '',
    expiry: '',
    cvv: '',
    holder_name: ''
  });
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const handleCardChange = (field: keyof CardData, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return numbers.substring(0, 2) + '/' + numbers.substring(2, 4);
    }
    return numbers;
  };

  const validateForm = () => {
    if (!customerData.name.trim()) return 'Nome é obrigatório';
    if (!customerData.email.trim()) return 'Email é obrigatório';
    if (!customerData.phone.trim()) return 'Telefone é obrigatório';
    if (!/\S+@\S+\.\S+/.test(customerData.email)) return 'Email inválido';
    
    if (activeTab === 'credit') {
      if (!cardData.number.trim()) return 'Número do cartão é obrigatório';
      if (!cardData.expiry.trim()) return 'Validade é obrigatória';
      if (!cardData.cvv.trim()) return 'CVV é obrigatório';
      if (!cardData.holder_name.trim()) return 'Nome no cartão é obrigatório';
      if (cardData.number.replace(/\D/g, '').length < 16) return 'Número do cartão inválido';
      if (cardData.expiry.length < 5) return 'Validade inválida';
      if (cardData.cvv.length < 3) return 'CVV inválido';
    }
    
    return null;
  };

  const createTransaction = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);
    setStep('processing');

    try {
      const paymentMethod = activeTab === 'pix' ? 'PIX' : 
                           activeTab === 'credit' ? 'CREDIT_CARD' : 'BOLETO';

      const requestData: any = {
        external_id: `sono_zen_${Date.now()}`,
        total_amount: 27.90,
        payment_method: paymentMethod,
        customer: {
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone.replace(/\D/g, ''),
          document_type: 'CPF',
          document: '00000000000'
        }
      };

      if (activeTab === 'credit') {
        requestData.card = {
          number: cardData.number.replace(/\D/g, ''),
          expiry_month: cardData.expiry.split('/')[0],
          expiry_year: '20' + cardData.expiry.split('/')[1],
          cvv: cardData.cvv,
          holder_name: cardData.holder_name
        };
      }

      const response = await fetch('/api/lira-payment/create-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (result.success && result.transaction) {
        setTransaction(result.transaction);
        setStep('payment');
        
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'InitiateCheckout', {
            content_name: 'Sono Zen - Método Completo',
            content_category: 'E-book',
            value: 27.90,
            currency: 'BRL',
            payment_method: paymentMethod
          });
        }
      } else {
        setError(result.error?.error || 'Erro ao criar transação');
        setStep('form');
      }
    } catch (error) {
      setError('Erro de conexão. Tente novamente.');
      setStep('form');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copiado!",
      description: "Código copiado para a área de transferência.",
    });
    setTimeout(() => setCopied(false), 3000);
  };

  if (step === 'processing') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-600 text-white">
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Processando Pagamento</h3>
            <p className="text-slate-300 text-center">
              Aguarde enquanto preparamos sua compra...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (step === 'payment' && transaction) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-600 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
              Pagamento Criado
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-4 border border-slate-600">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">R$ 27,90</div>
                <div className="text-sm text-green-400">Sono Zen - Método Completo</div>
              </div>
            </div>

            {transaction.pix && (
              <div className="space-y-4">
                <div className="text-center">
                  <QrCode className="w-16 h-16 mx-auto text-blue-400 mb-2" />
                  <p className="text-lg font-medium">PIX Copia e Cola</p>
                  <p className="text-sm text-slate-400">
                    Copie o código abaixo e cole em seu app bancário
                  </p>
                </div>
                
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <p className="text-xs text-slate-300 break-all font-mono">
                    {transaction.pix.payload}
                  </p>
                </div>
                
                <Button
                  onClick={() => copyToClipboard(transaction.pix!.payload)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? 'Copiado!' : 'Copiar Código PIX'}
                </Button>
              </div>
            )}

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-yellow-400 mb-2">
                <Clock className="w-4 h-4" />
                <span className="font-medium">Aguardando Pagamento</span>
              </div>
              <p className="text-sm text-yellow-300">
                Após o pagamento, você receberá o acesso por email em até 5 minutos.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-600 text-white shadow-2xl">
        <DialogHeader className="space-y-4 pb-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Moon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Finalizar Compra
              </DialogTitle>
              <p className="text-slate-300 text-base">
                Sono Zen - Método Completo
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm text-green-400 font-medium">Seguro</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-4 border border-slate-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-slate-300">Preço Especial</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">R$ 27,90</div>
                <div className="text-sm text-green-400 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  7 dias de garantia
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {error && (
            <Alert className="bg-red-900/20 border-red-700 text-red-300">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Seus Dados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  value={customerData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white focus:border-blue-500"
                  placeholder="Seu nome completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={customerData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white focus:border-blue-500"
                  placeholder="seu@email.com"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phone" className="text-slate-300 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Telefone
                </Label>
                <Input
                  id="phone"
                  value={customerData.phone}
                  onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                  className="bg-slate-800 border-slate-600 text-white focus:border-blue-500"
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Forma de Pagamento</h3>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'pix' | 'credit' | 'boleto')}>
              <TabsList className="grid w-full grid-cols-3 bg-slate-800 border border-slate-600">
                <TabsTrigger value="pix" className="flex items-center gap-2 data-[state=active]:bg-blue-600">
                  <QrCode className="w-4 h-4" />
                  PIX
                </TabsTrigger>
                <TabsTrigger value="credit" className="flex items-center gap-2 data-[state=active]:bg-blue-600">
                  <CreditCard className="w-4 h-4" />
                  Cartão
                </TabsTrigger>
                <TabsTrigger value="boleto" className="flex items-center gap-2 data-[state=active]:bg-blue-600">
                  <FileText className="w-4 h-4" />
                  Boleto
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pix" className="space-y-4">
                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <Zap className="w-5 h-5" />
                    <span className="font-medium">Aprovação Imediata</span>
                  </div>
                  <p className="text-sm text-blue-300">
                    Pagamento aprovado instantaneamente. Você receberá o acesso imediatamente após o pagamento.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="credit" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="card-number" className="text-slate-300">Número do Cartão</Label>
                    <Input
                      id="card-number"
                      value={cardData.number}
                      onChange={(e) => handleCardChange('number', formatCardNumber(e.target.value))}
                      className="bg-slate-800 border-slate-600 text-white focus:border-blue-500"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry" className="text-slate-300">Validade</Label>
                    <Input
                      id="expiry"
                      value={cardData.expiry}
                      onChange={(e) => handleCardChange('expiry', formatExpiry(e.target.value))}
                      className="bg-slate-800 border-slate-600 text-white focus:border-blue-500"
                      placeholder="MM/AA"
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-slate-300">CVV</Label>
                    <Input
                      id="cvv"
                      value={cardData.cvv}
                      onChange={(e) => handleCardChange('cvv', e.target.value.replace(/\D/g, ''))}
                      className="bg-slate-800 border-slate-600 text-white focus:border-blue-500"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="holder-name" className="text-slate-300">Nome no Cartão</Label>
                    <Input
                      id="holder-name"
                      value={cardData.holder_name}
                      onChange={(e) => handleCardChange('holder_name', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white focus:border-blue-500"
                      placeholder="Nome como está no cartão"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="boleto" className="space-y-4">
                <div className="bg-orange-900/20 border border-orange-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-orange-400 mb-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">Aprovação em 1-2 dias úteis</span>
                  </div>
                  <p className="text-sm text-orange-300">
                    Após o pagamento do boleto, o acesso será liberado em até 2 dias úteis.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-2 text-slate-300 mb-2">
              <Users className="w-4 h-4" />
              <span className="font-medium">14.847 pessoas já transformaram suas noites</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Compra 100% segura</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-4 h-4 text-green-400" />
                <span>Dados protegidos</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Garantia de 7 dias</span>
              </div>
            </div>
          </div>

          <Button
            onClick={createTransaction}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5" />
                Finalizar Compra - R$ 27,90
              </div>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}