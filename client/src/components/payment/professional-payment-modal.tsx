import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Moon, Copy, CheckCircle, Clock, CreditCard, Shield, Zap, QrCode, FileText, Star, Lock, Sparkles, Users, Phone, Mail, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode';

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
  const [activeTab, setActiveTab] = useState<'pix'>('pix');
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
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const { toast } = useToast();

  // Generate QR Code when PIX payload is available
  useEffect(() => {
    if (transaction?.pix?.payload) {
      generateQRCode(transaction.pix.payload);
    }
  }, [transaction]);

  const generateQRCode = async (payload: string) => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(payload, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeImage(qrCodeDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

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
      // Generate a valid CPF for API requirement (test CPF)
      const validCPF = '11144477735'; // Valid test CPF format

      const requestData = {
        external_id: `sono_zen_${Date.now()}`,
        total_amount: 27.90,
        payment_method: 'PIX',
        customer: {
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone.replace(/\D/g, ''),
          document_type: 'CPF',
          document: validCPF
        }
      };

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
            payment_method: 'PIX'
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
        <DialogContent className="sm:max-w-md bg-black/95 backdrop-blur-xl border-slate-800 text-white shadow-2xl">
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-8 h-8 text-white/70" />
            </div>
            <h3 className="text-xl font-semibold text-white">Processando Pagamento</h3>
            <p className="text-white/60 text-center">
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
        <DialogContent className="sm:max-w-md bg-black/95 backdrop-blur-xl border-slate-800 text-white shadow-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
              Pagamento Criado
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="bg-black/50 border border-white/10 rounded-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">R$ 27,90</div>
                <div className="text-sm text-white/60">Sono Zen - Método Completo</div>
              </div>
            </div>

            {transaction.pix && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-blue-400 mb-4">
                  <QrCode className="w-5 h-5" />
                  <span className="font-medium">PIX - Escolha sua forma preferida</span>
                </div>
                
                {/* QR Code Section */}
                <div className="space-y-4">
                  <h4 className="text-white font-medium">1. Escaneie o QR Code</h4>
                  <div className="bg-white rounded-lg p-4 flex justify-center">
                    {qrCodeImage ? (
                      <img 
                        src={qrCodeImage} 
                        alt="QR Code PIX" 
                        className="w-48 h-48"
                      />
                    ) : (
                      <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Gerando QR Code...</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-white/60 text-center">
                    Abra o app do seu banco e escaneie o código
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-white/20"></div>
                  <span className="text-white/60 text-sm">OU</span>
                  <div className="flex-1 h-px bg-white/20"></div>
                </div>

                {/* Copy & Paste Section */}
                <div className="space-y-4">
                  <h4 className="text-white font-medium">2. Copie e Cole o Código</h4>
                  <div className="bg-black/50 border border-white/10 p-4 rounded-lg">
                    <p className="text-xs text-white/80 break-all font-mono max-h-20 overflow-y-auto">
                      {transaction.pix.payload}
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => copyToClipboard(transaction.pix!.payload)}
                    className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {copied ? 'Copiado!' : 'Copiar Código PIX'}
                  </Button>
                </div>
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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-black/95 backdrop-blur-xl border border-slate-800 text-white shadow-2xl">
        <DialogHeader className="space-y-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
              <Moon className="w-6 h-6 text-white/80" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-white">
                Finalizar Compra
              </DialogTitle>
              <p className="text-white/60 text-base">
                Sono Zen - Método Completo
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm text-green-400 font-medium">Seguro</span>
            </div>
          </div>
          
          <div className="bg-black/40 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-white/70">Preço Especial</span>
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
            <Alert className="bg-red-500/10 border border-red-500/20 text-red-300">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Seus Dados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/70 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  value={customerData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-black/50 border border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-0"
                  placeholder="Seu nome completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/70 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={customerData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-black/50 border border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-0"
                  placeholder="seu@email.com"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phone" className="text-white/70 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Telefone
                </Label>
                <Input
                  id="phone"
                  value={customerData.phone}
                  onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                  className="bg-black/50 border border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-0"
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Forma de Pagamento</h3>
            
            <div className="bg-black/50 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <QrCode className="w-6 h-6 text-white/80" />
                <div>
                  <h4 className="font-medium text-white">PIX - Pagamento Instantâneo</h4>
                  <p className="text-sm text-white/60">Aprovação imediata</p>
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-blue-400 mb-1">
                  <Zap className="w-4 h-4" />
                  <span className="font-medium text-sm">Aprovação Imediata</span>
                </div>
                <p className="text-xs text-blue-300">
                  Pagamento aprovado instantaneamente. Você receberá o acesso imediatamente após o pagamento.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/30 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 text-white/70 mb-2">
              <Users className="w-4 h-4" />
              <span className="font-medium">14.847 pessoas já transformaram suas noites</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/50">
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
            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 text-lg transition-all duration-300 backdrop-blur-sm"
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