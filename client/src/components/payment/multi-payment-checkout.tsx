import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Moon, Copy, CheckCircle, Clock, CreditCard, Shield, Zap, QrCode, FileText, X, Lock, Star, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MultiPaymentCheckoutProps {
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

export default function MultiPaymentCheckout({ isOpen, onClose }: MultiPaymentCheckoutProps) {
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

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
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
    
    // Validate card data for credit card payments
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
          document: '00000000000' // Generic CPF for API requirement
        }
      };

      // Add card data for credit card payments
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
        
        // Track conversion event
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
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copiado!",
      description: "Código copiado para a área de transferência.",
    });
  };

  const checkPaymentStatus = async () => {
    if (!transaction?.id) return;

    try {
      const response = await fetch(`/api/lira-payment/transaction/${transaction.id}`);
      const result = await response.json();
      
      if (result.success && result.transaction?.status === 'PAID') {
        toast({
          title: "Pagamento confirmado!",
          description: "Você receberá o acesso por email em instantes.",
        });
        onClose();
      } else {
        toast({
          title: "Pagamento pendente",
          description: "O pagamento ainda não foi processado. Aguarde alguns instantes.",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao verificar pagamento",
        description: "Tente novamente em alguns instantes.",
      });
    }
  };

  const resetForm = () => {
    setStep('form');
    setCustomerData({
      name: '',
      email: '',
      phone: ''
    });
    setCardData({
      number: '',
      expiry: '',
      cvv: '',
      holder_name: ''
    });
    setTransaction(null);
    setError(null);
    setActiveTab('pix');
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'pix': return <QrCode className="h-4 w-4" />;
      case 'credit': return <CreditCard className="h-4 w-4" />;
      case 'boleto': return <FileText className="h-4 w-4" />;
      default: return <Moon className="h-4 w-4" />;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'pix': return 'PIX';
      case 'credit': return 'Cartão';
      case 'boleto': return 'Boleto';
      default: return 'Pagamento';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-auto bg-slate-900 border-slate-700 text-slate-100 max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Moon className="h-6 w-6 text-accent-blue" />
              Finalizar Compra
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-slate-400">
            Sono Zen - Método Completo • R$ 27,90
          </DialogDescription>
        </DialogHeader>

        {/* Formulário */}
        {step === 'form' && (
          <div className="space-y-6">
            {error && (
              <Alert className="border-red-500/20 bg-red-500/10">
                <AlertDescription className="text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Dados do Cliente */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-200">Seus Dados</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name" className="text-slate-300">Nome Completo</Label>
                  <Input
                    id="name"
                    value={customerData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-slate-800 border-slate-600 text-slate-100"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-slate-800 border-slate-600 text-slate-100"
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-slate-300">Telefone</Label>
                    <Input
                      id="phone"
                      value={formatPhone(customerData.phone)}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-slate-100"
                      placeholder="(11) 99999-9999"
                      maxLength={15}
                    />
                  </div>

                  <div>
                    <Label htmlFor="document" className="text-slate-300">CPF</Label>
                    <Input
                      id="document"
                      value={formatCPF(customerData.document)}
                      onChange={(e) => handleInputChange('document', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-slate-100"
                      placeholder="000.000.000-00"
                      maxLength={14}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Forma de Pagamento */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-200">Forma de Pagamento</h3>
              
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'pix' | 'credit' | 'boleto')}>
                <TabsList className="grid w-full grid-cols-3 bg-slate-800">
                  <TabsTrigger value="pix" className="flex items-center gap-2 data-[state=active]:bg-accent-blue">
                    <QrCode className="h-4 w-4" />
                    PIX
                  </TabsTrigger>
                  <TabsTrigger value="credit" className="flex items-center gap-2 data-[state=active]:bg-accent-blue">
                    <CreditCard className="h-4 w-4" />
                    Cartão
                  </TabsTrigger>
                  <TabsTrigger value="boleto" className="flex items-center gap-2 data-[state=active]:bg-accent-blue">
                    <FileText className="h-4 w-4" />
                    Boleto
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pix" className="space-y-4">
                  <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                    <h4 className="font-medium text-blue-200 mb-2 flex items-center gap-2">
                      <QrCode className="h-5 w-5" />
                      PIX - Pagamento Instantâneo
                    </h4>
                    <p className="text-sm text-blue-300">
                      Aprovação imediata e acesso instantâneo ao produto.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="credit" className="space-y-4">
                  <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                    <h4 className="font-medium text-green-200 mb-2 flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Cartão de Crédito
                    </h4>
                    <p className="text-sm text-green-300">
                      Pagamento seguro com aprovação instantânea.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="cardNumber" className="text-slate-300">Número do Cartão</Label>
                      <Input
                        id="cardNumber"
                        value={formatCardNumber(cardData.number)}
                        onChange={(e) => handleCardChange('number', e.target.value)}
                        className="bg-slate-800 border-slate-600 text-slate-100"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div>
                      <Label htmlFor="holderName" className="text-slate-300">Nome no Cartão</Label>
                      <Input
                        id="holderName"
                        value={cardData.holder_name}
                        onChange={(e) => handleCardChange('holder_name', e.target.value.toUpperCase())}
                        className="bg-slate-800 border-slate-600 text-slate-100"
                        placeholder="NOME COMO NO CARTÃO"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-slate-300">Validade</Label>
                        <Input
                          id="expiry"
                          value={formatExpiry(cardData.expiry)}
                          onChange={(e) => handleCardChange('expiry', e.target.value)}
                          className="bg-slate-800 border-slate-600 text-slate-100"
                          placeholder="MM/AA"
                          maxLength={5}
                        />
                      </div>

                      <div>
                        <Label htmlFor="cvv" className="text-slate-300">CVV</Label>
                        <Input
                          id="cvv"
                          value={cardData.cvv}
                          onChange={(e) => handleCardChange('cvv', e.target.value.replace(/[^0-9]/g, ''))}
                          className="bg-slate-800 border-slate-600 text-slate-100"
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="boleto" className="space-y-4">
                  <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                    <h4 className="font-medium text-orange-200 mb-2 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Boleto Bancário
                    </h4>
                    <p className="text-sm text-orange-300">
                      Pagamento em até 3 dias úteis. Acesso liberado após confirmação.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 border-slate-600 hover:bg-slate-700"
              >
                Cancelar
              </Button>
              <Button
                onClick={createTransaction}
                disabled={loading}
                className="flex-1 bg-accent-blue hover:bg-accent-blue/90"
              >
                {loading ? 'Processando...' : `Pagar R$ 27,90`}
              </Button>
            </div>
          </div>
        )}

        {/* Processando */}
        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue"></div>
            <p className="text-slate-300">Processando pagamento...</p>
          </div>
        )}

        {/* Resultado do Pagamento */}
        {step === 'payment' && transaction && (
          <PaymentResult 
            transaction={transaction}
            paymentMethod={activeTab}
            onCopy={copyToClipboard}
            onCheck={checkPaymentStatus}
            onReset={resetForm}
            copied={copied}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

interface PaymentResultProps {
  transaction: Transaction;
  paymentMethod: 'pix' | 'credit' | 'boleto';
  onCopy: (text: string) => void;
  onCheck: () => void;
  onReset: () => void;
  copied: boolean;
}

function PaymentResult({ transaction, paymentMethod, onCopy, onCheck, onReset, copied }: PaymentResultProps) {
  if (paymentMethod === 'pix' && transaction.pix) {
    return (
      <div className="space-y-4">
        <Card className="bg-slate-800 border-slate-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-400 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              PIX Gerado com Sucesso!
            </CardTitle>
            <CardDescription className="text-slate-400">
              Valor: <span className="font-bold text-green-400">R$ 27,90</span>
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="space-y-3">
          <h4 className="font-semibold text-accent-blue">Como pagar:</h4>
          <ol className="text-sm text-slate-300 space-y-1 list-decimal list-inside">
            <li>Copie o código PIX abaixo</li>
            <li>Abra o app do seu banco</li>
            <li>Vá em PIX → Pagar</li>
            <li>Cole o código PIX</li>
            <li>Confirme o pagamento de R$ 27,90</li>
          </ol>
        </div>

        <div className="bg-slate-800 p-3 rounded-lg border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-300">Código PIX:</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onCopy(transaction.pix!.payload)}
              className="text-accent-blue hover:text-accent-blue/80"
            >
              <Copy className="h-4 w-4 mr-1" />
              {copied ? 'Copiado!' : 'Copiar'}
            </Button>
          </div>
          <div className="bg-slate-900 p-2 rounded text-xs text-slate-200 break-all font-mono">
            {transaction.pix.payload}
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            variant="outline"
            onClick={onReset}
            className="flex-1 border-slate-600 hover:bg-slate-700"
          >
            Nova Compra
          </Button>
          <Button
            onClick={onCheck}
            className="flex-1 bg-accent-blue hover:bg-accent-blue/90"
          >
            Verificar Pagamento
          </Button>
        </div>
      </div>
    );
  }

  if (paymentMethod === 'credit' && transaction.credit_card) {
    return (
      <div className="space-y-4">
        <Card className="bg-slate-800 border-slate-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-400 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Pagamento Aprovado!
            </CardTitle>
            <CardDescription className="text-slate-400">
              Valor: <span className="font-bold text-green-400">R$ 27,90</span>
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
          <div className="text-center">
            <p className="text-green-200 mb-2">
              Seu cartão foi processado com sucesso!
            </p>
            <p className="text-xs text-green-300">
              Código de autorização: {transaction.credit_card.authorization_code}
            </p>
          </div>
        </div>

        <Button
          onClick={onReset}
          className="w-full bg-accent-blue hover:bg-accent-blue/90"
        >
          Nova Compra
        </Button>
      </div>
    );
  }

  if (paymentMethod === 'boleto' && transaction.boleto) {
    return (
      <div className="space-y-4">
        <Card className="bg-slate-800 border-slate-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-orange-400 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Boleto Gerado!
            </CardTitle>
            <CardDescription className="text-slate-400">
              Valor: <span className="font-bold text-orange-400">R$ 27,90</span>
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-orange-200">Código de Barras:</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onCopy(transaction.boleto!.barcode)}
              className="text-orange-300 hover:text-orange-200"
            >
              <Copy className="h-4 w-4 mr-1" />
              {copied ? 'Copiado!' : 'Copiar'}
            </Button>
          </div>
          <div className="bg-slate-900 p-2 rounded text-xs text-slate-200 break-all font-mono">
            {transaction.boleto.barcode}
          </div>
        </div>

        {transaction.boleto.link && (
          <div className="text-center">
            <Button 
              variant="outline" 
              className="w-full border-orange-500/30 hover:bg-orange-500/10"
              onClick={() => window.open(transaction.boleto!.link, '_blank')}
            >
              Visualizar Boleto
            </Button>
          </div>
        )}

        <div className="text-center text-xs text-slate-400">
          <p>Vencimento: {transaction.boleto.due_date}</p>
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            variant="outline"
            onClick={onReset}
            className="flex-1 border-slate-600 hover:bg-slate-700"
          >
            Nova Compra
          </Button>
          <Button
            onClick={onCheck}
            className="flex-1 bg-accent-blue hover:bg-accent-blue/90"
          >
            Verificar Pagamento
          </Button>
        </div>
      </div>
    );
  }

  return null;
}