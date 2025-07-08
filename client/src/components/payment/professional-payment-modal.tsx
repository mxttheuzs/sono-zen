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
        <DialogContent className="sm:max-w-md bg-black/95 border border-blue-500/30 text-white backdrop-blur-md">
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-blue-400">Processando Pagamento</h3>
            <p className="text-gray-300 text-center">
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
        <DialogContent className="sm:max-w-md bg-black/95 border border-blue-500/30 text-white backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-center">
              <CheckCircle className="w-6 h-6 text-blue-400" />
              <span className="text-blue-400">Pagamento Criado</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="bg-black/60 rounded-lg p-4 border border-blue-500/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">R$ 27,90</div>
                <div className="text-sm text-blue-400">Sono <span className="text-blue-400">Zen</span> - Método Completo</div>
              </div>
            </div>

            {transaction.pix && (
              <div className="space-y-4">
                <div className="text-center">
                  <QrCode className="w-16 h-16 mx-auto text-blue-400 mb-2" />
                  <p className="text-lg font-medium text-blue-400">PIX Copia e Cola</p>
                  <p className="text-sm text-gray-400">
                    Copie o código abaixo e cole em seu app bancário
                  </p>
                </div>
                
                <div className="bg-black/60 p-4 rounded-lg border border-blue-500/30">
                  <p className="text-xs text-gray-300 break-all font-mono">
                    {transaction.pix.payload}
                  </p>
                </div>
                
                <Button
                  onClick={() => copyToClipboard(transaction.pix!.payload)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? 'Copiado!' : 'Copiar Código PIX'}
                </Button>
              </div>
            )}

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <Clock className="w-4 h-4" />
                <span className="font-medium">Aguardando Pagamento</span>
              </div>
              <p className="text-sm text-gray-300">
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
      <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-black/95 border border-blue-500/30 text-white shadow-2xl backdrop-blur-md mx-2">
        <DialogHeader className="space-y-6 pb-8 border-b border-blue-500/20">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
              <Moon className="w-8 h-8 text-black" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-3xl font-bold text-white mb-2">
                Finalizar Compra
              </DialogTitle>
              <p className="text-gray-300 text-lg">
                Sono <span className="text-blue-400 font-bold">Zen</span> - Método Completo
              </p>
            </div>
            <div className="flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/30">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">Transação Segura</span>
            </div>
          </div>
          
          <div className="bg-black/60 rounded-2xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-black fill-black" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">Investimento Premium</p>
                  <p className="text-gray-400 text-xs">Transformação Garantida</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white mb-1">R$ 27,90</div>
                <div className="text-sm text-blue-400 flex items-center gap-1 justify-end">
                  <Lock className="w-3 h-3" />
                  <span className="font-medium">7 dias de garantia</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {error && (
            <Alert className="bg-red-900/30 border-red-800/50 text-red-200 backdrop-blur-sm">
              <AlertDescription className="font-medium">{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-black" />
              </div>
              <h3 className="text-xl font-bold text-blue-400">Informações Pessoais</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-gray-300 flex items-center gap-2 font-medium">
                  <User className="w-4 h-4 text-blue-400" />
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  value={customerData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-black/40 border-blue-500/30 text-white focus:border-blue-400 focus:ring-blue-400/20 h-12"
                  placeholder="Seu nome completo"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-gray-300 flex items-center gap-2 font-medium">
                  <Mail className="w-4 h-4 text-blue-400" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={customerData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-black/40 border-blue-500/30 text-white focus:border-blue-400 focus:ring-blue-400/20 h-12"
                  placeholder="seu@email.com"
                />
              </div>
              <div className="space-y-3 md:col-span-2">
                <Label htmlFor="phone" className="text-gray-300 flex items-center gap-2 font-medium">
                  <Phone className="w-4 h-4 text-blue-400" />
                  Telefone
                </Label>
                <Input
                  id="phone"
                  value={customerData.phone}
                  onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                  className="bg-black/40 border-blue-500/30 text-white focus:border-blue-400 focus:ring-blue-400/20 h-12"
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-black" />
              </div>
              <h3 className="text-xl font-bold text-blue-400">Método de Pagamento</h3>
            </div>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'pix' | 'credit' | 'boleto')}>
              <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-blue-500/30 p-1 rounded-lg">
                <TabsTrigger value="pix" className="flex items-center justify-center gap-1 data-[state=active]:bg-blue-500 data-[state=active]:text-black rounded-lg h-12 font-medium transition-all duration-300 text-gray-300 text-sm px-2">
                  <QrCode className="w-4 h-4" />
                  <span className="hidden sm:inline">PIX</span>
                </TabsTrigger>
                <TabsTrigger value="credit" className="flex items-center justify-center gap-1 data-[state=active]:bg-blue-500 data-[state=active]:text-black rounded-lg h-12 font-medium transition-all duration-300 text-gray-300 text-sm px-2">
                  <CreditCard className="w-4 h-4" />
                  <span className="hidden sm:inline">Cartão</span>
                </TabsTrigger>
                <TabsTrigger value="boleto" className="flex items-center justify-center gap-1 data-[state=active]:bg-blue-500 data-[state=active]:text-black rounded-lg h-12 font-medium transition-all duration-300 text-gray-300 text-sm px-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Boleto</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pix" className="space-y-6 mt-6">
                <div className="bg-black/40 border border-blue-500/30 rounded-lg p-6">
                  <div className="flex items-center gap-3 text-blue-400 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-black" />
                    </div>
                    <span className="font-bold text-lg">Aprovação Instantânea</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Pagamento aprovado imediatamente via PIX. Você receberá o acesso completo ao método em sua caixa de entrada dentro de 2 minutos.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="credit" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 md:col-span-2">
                    <Label htmlFor="card-number" className="text-gray-300 font-medium">Número do Cartão</Label>
                    <Input
                      id="card-number"
                      value={cardData.number}
                      onChange={(e) => handleCardChange('number', formatCardNumber(e.target.value))}
                      className="bg-black/40 border-blue-500/30 text-white focus:border-blue-400 focus:ring-blue-400/20 h-12"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="expiry" className="text-gray-300 font-medium">Validade</Label>
                    <Input
                      id="expiry"
                      value={cardData.expiry}
                      onChange={(e) => handleCardChange('expiry', formatExpiry(e.target.value))}
                      className="bg-black/40 border-blue-500/30 text-white focus:border-blue-400 focus:ring-blue-400/20 h-12"
                      placeholder="MM/AA"
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="cvv" className="text-gray-300 font-medium">CVV</Label>
                    <Input
                      id="cvv"
                      value={cardData.cvv}
                      onChange={(e) => handleCardChange('cvv', e.target.value.replace(/\D/g, ''))}
                      className="bg-black/40 border-blue-500/30 text-white focus:border-blue-400 focus:ring-blue-400/20 h-12"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <Label htmlFor="holder-name" className="text-gray-300 font-medium">Nome no Cartão</Label>
                    <Input
                      id="holder-name"
                      value={cardData.holder_name}
                      onChange={(e) => handleCardChange('holder_name', e.target.value)}
                      className="bg-black/40 border-blue-500/30 text-white focus:border-blue-400 focus:ring-blue-400/20 h-12"
                      placeholder="Nome como está no cartão"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="boleto" className="space-y-6 mt-6">
                <div className="bg-black/40 border border-blue-500/30 rounded-lg p-6">
                  <div className="flex items-center gap-3 text-blue-400 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-black" />
                    </div>
                    <span className="font-bold text-lg">Processamento Bancário</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Após o pagamento do boleto, o acesso será liberado em até 2 dias úteis. Você receberá uma confirmação por email assim que o pagamento for processado.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="bg-black/40 rounded-lg p-6 border border-blue-500/30">
            <div className="flex items-center gap-3 text-gray-300 mb-3">
              <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-3 h-3 text-black" />
              </div>
              <span className="font-medium text-blue-400">14.847 pessoas já transformaram suas noites</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>Compra Segura</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400" />
                <span>Dados Protegidos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>7 Dias Garantia</span>
              </div>
            </div>
          </div>

          <Button
            onClick={createTransaction}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 text-lg transition-all duration-300"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processando...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5" />
                <span>Finalizar Compra - R$ 27,90</span>
              </div>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}