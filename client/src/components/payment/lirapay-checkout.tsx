import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Moon, Copy, CheckCircle, Clock, CreditCard, Shield, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LirapayCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomerData {
  name: string;
  email: string;
  phone: string;
  document: string;
  document_type: 'CPF' | 'CNPJ';
}

interface Transaction {
  id: string;
  external_id: string;
  status: string;
  total_value: number;
  pix?: {
    payload: string;
  };
}

export default function LirapayCheckout({ isOpen, onClose }: LirapayCheckoutProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'payment'>('form');
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    email: '',
    phone: '',
    document: '',
    document_type: 'CPF'
  });
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
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

  const validateForm = () => {
    if (!customerData.name.trim()) return 'Nome é obrigatório';
    if (!customerData.email.trim()) return 'Email é obrigatório';
    if (!customerData.phone.trim()) return 'Telefone é obrigatório';
    if (!customerData.document.trim()) return 'CPF é obrigatório';
    if (!/\S+@\S+\.\S+/.test(customerData.email)) return 'Email inválido';
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
      const response = await fetch('/api/lira-payment/create-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          external_id: `sono_zen_${Date.now()}`,
          total_amount: 2790, // R$ 27,90
          payment_method: 'PIX',
          customer: {
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone.replace(/\D/g, ''),
            document_type: customerData.document_type,
            document: customerData.document.replace(/\D/g, '')
          }
        }),
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
            currency: 'BRL'
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

  const copyPixCode = () => {
    if (transaction?.pix?.payload) {
      navigator.clipboard.writeText(transaction.pix.payload);
      toast({
        title: "Código PIX copiado!",
        description: "Cole no seu app bancário para finalizar o pagamento.",
      });
    }
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
      phone: '',
      document: '',
      document_type: 'CPF'
    });
    setTransaction(null);
    setError(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-slate-900 border-slate-700 text-slate-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Moon className="h-6 w-6 text-accent-blue" />
            Finalizar Compra
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {step === 'form' && "Preencha seus dados para gerar o PIX"}
            {step === 'processing' && "Processando sua solicitação..."}
            {step === 'payment' && "Escaneie o QR Code ou copie a chave PIX"}
          </DialogDescription>
        </DialogHeader>

        {/* Formulário de Dados */}
        {step === 'form' && (
          <div className="space-y-4">
            {error && (
              <Alert className="border-red-500/20 bg-red-500/10">
                <AlertDescription className="text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}

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
                {loading ? 'Gerando PIX...' : 'Gerar PIX'}
              </Button>
            </div>
          </div>
        )}

        {/* Processando */}
        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue"></div>
            <p className="text-slate-300">Gerando seu PIX...</p>
          </div>
        )}

        {/* Tela de Pagamento PIX */}
        {step === 'payment' && transaction && (
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

            {/* Instruções de Pagamento */}
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

            {/* Código PIX */}
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-300">Código PIX:</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyPixCode}
                  className="text-accent-blue hover:text-accent-blue/80"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copiar
                </Button>
              </div>
              <div className="bg-slate-900 p-2 rounded text-xs text-slate-200 break-all font-mono">
                {transaction.pix?.payload}
              </div>
            </div>

            {/* Status da Transação */}
            <div className="text-center text-xs text-slate-500 space-y-1">
              <p>ID da transação: {transaction.id}</p>
              <p className="flex items-center justify-center gap-1">
                <Clock className="h-3 w-3" />
                Status: {transaction.status}
              </p>
            </div>

            {/* Garantias */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-800 p-2 rounded">
                <Shield className="h-4 w-4 mx-auto text-green-400 mb-1" />
                <p className="text-xs text-slate-300">Seguro</p>
              </div>
              <div className="bg-slate-800 p-2 rounded">
                <Zap className="h-4 w-4 mx-auto text-accent-blue mb-1" />
                <p className="text-xs text-slate-300">Instantâneo</p>
              </div>
              <div className="bg-slate-800 p-2 rounded">
                <CreditCard className="h-4 w-4 mx-auto text-warm-accent mb-1" />
                <p className="text-xs text-slate-300">PIX</p>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={resetForm}
                className="flex-1 border-slate-600 hover:bg-slate-700"
              >
                Nova Compra
              </Button>
              <Button
                onClick={checkPaymentStatus}
                className="flex-1 bg-accent-blue hover:bg-accent-blue/90"
              >
                Verificar Pagamento
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}