import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, CreditCard, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PixPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: {
    id: string;
    pix_key?: string;
    status: string;
    amount: number;
    created_at: string;
  } | null;
}

export function PixPaymentModal({ isOpen, onClose, transaction }: PixPaymentModalProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyPixKey = async () => {
    if (transaction?.pix_key) {
      try {
        await navigator.clipboard.writeText(transaction.pix_key);
        setCopied(true);
        toast({
          title: "Copiado!",
          description: "Chave PIX copiada para a área de transferência.",
        });
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        toast({
          title: "Erro",
          description: "Não foi possível copiar. Tente selecionar e copiar manualmente.",
          variant: "destructive"
        });
      }
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <CreditCard className="w-5 h-5 text-accent-blue" />
            Pagamento via PIX
          </DialogTitle>
        </DialogHeader>

        {transaction && (
          <div className="space-y-6 pt-4">
            {/* Status */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                <Clock className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-500 text-sm font-medium">
                  Aguardando Pagamento
                </span>
              </div>
            </div>

            {/* Valor */}
            <div className="text-center py-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <p className="text-sm text-slate-400 mb-1">Valor a pagar:</p>
              <p className="text-2xl font-bold text-white">
                {formatAmount(transaction.amount)}
              </p>
            </div>

            {/* Chave PIX */}
            {transaction.pix_key && (
              <div className="space-y-3">
                <p className="text-sm text-slate-400">
                  <strong>Chave PIX:</strong>
                </p>
                <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <code className="flex-1 text-sm text-white font-mono break-all">
                    {transaction.pix_key}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyPixKey}
                    className="border-slate-600 hover:bg-slate-700"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Instruções */}
            <div className="space-y-3 p-4 bg-accent-blue/5 rounded-lg border border-accent-blue/20">
              <p className="text-sm font-medium text-accent-blue">
                Instruções para pagamento:
              </p>
              <ol className="text-sm text-slate-300 space-y-1 list-decimal list-inside">
                <li>Copie a chave PIX acima</li>
                <li>Abra o app do seu banco</li>
                <li>Vá em PIX → Pagar</li>
                <li>Cole a chave PIX</li>
                <li>Confirme o valor de {formatAmount(transaction.amount)}</li>
                <li>Finalize o pagamento</li>
              </ol>
            </div>

            {/* ID da Transação */}
            <div className="text-center text-xs text-slate-500">
              ID da transação: {transaction.id}
            </div>

            {/* Botões */}
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 border-slate-600 hover:bg-slate-700"
              >
                Fechar
              </Button>
              <Button
                onClick={() => window.location.reload()}
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