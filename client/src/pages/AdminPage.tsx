import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Settings, Link, Mail, Download, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const [downloadLink, setDownloadLink] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [testEmail, setTestEmail] = useState({
    customerName: 'João Silva',
    customerEmail: 'joao@teste.com',
    transactionId: `test_${Date.now()}`
  });
  const { toast } = useToast();

  const updateDownloadLink = async () => {
    if (!downloadLink || !adminKey) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/admin/update-download-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          downloadLink,
          adminKey
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Link de download atualizado com sucesso!",
        });
        setDownloadLink('');
        setAdminKey('');
      } else {
        toast({
          title: "Erro",
          description: result.error || "Erro ao atualizar link",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro de conexão",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const testProductDelivery = async () => {
    if (!testEmail.customerName || !testEmail.customerEmail) {
      toast({
        title: "Erro",
        description: "Preencha nome e email para teste",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate a test transaction
      const response = await fetch('/api/lira-payment/create-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          external_id: testEmail.transactionId,
          total_amount: 27.90,
          payment_method: 'PIX',
          customer: {
            name: testEmail.customerName,
            email: testEmail.customerEmail,
            phone: '11999999999',
            document_type: 'CPF',
            document: '00000000000'
          }
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Teste Enviado",
          description: "Email de produto enviado para " + testEmail.customerEmail,
        });
      } else {
        toast({
          title: "Erro",
          description: result.error || "Erro no teste",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro de conexão",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            <Settings className="inline mr-2" />
            Sono Zen - Admin Panel
          </h1>
          <p className="text-slate-300">Gerenciar produto e entregas</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Update Download Link */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Link className="mr-2" />
                Atualizar Link de Download
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="downloadLink" className="text-slate-300">
                  Link do Google Drive
                </Label>
                <Input
                  id="downloadLink"
                  type="url"
                  placeholder="https://drive.google.com/file/d/..."
                  value={downloadLink}
                  onChange={(e) => setDownloadLink(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="adminKey" className="text-slate-300">
                  Chave de Admin
                </Label>
                <Input
                  id="adminKey"
                  type="password"
                  placeholder="Chave de administrador"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <Button 
                onClick={updateDownloadLink}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Atualizando...' : 'Atualizar Link'}
              </Button>
            </CardContent>
          </Card>

          {/* Test Product Delivery */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Mail className="mr-2" />
                Testar Entrega do Produto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="testName" className="text-slate-300">
                  Nome do Cliente (Teste)
                </Label>
                <Input
                  id="testName"
                  placeholder="João Silva"
                  value={testEmail.customerName}
                  onChange={(e) => setTestEmail({...testEmail, customerName: e.target.value})}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="testEmail" className="text-slate-300">
                  Email do Cliente (Teste)
                </Label>
                <Input
                  id="testEmail"
                  type="email"
                  placeholder="joao@teste.com"
                  value={testEmail.customerEmail}
                  onChange={(e) => setTestEmail({...testEmail, customerEmail: e.target.value})}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              <Button 
                onClick={testProductDelivery}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {loading ? 'Enviando...' : 'Enviar Teste'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="bg-slate-800/50 border-slate-700 mt-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <CheckCircle className="mr-2" />
              Como Funciona a Entrega Automática
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-3">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-white mb-2">📦 Entrega Automática</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Quando cliente faz pagamento PIX</li>
                  <li>• Sistema cria transação na Lirapay</li>
                  <li>• Produto é entregue automaticamente</li>
                  <li>• Email com download é enviado</li>
                  <li>• Cliente recebe acesso imediato</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-white mb-2">🔗 Gerenciar Link</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Atualize o link do Google Drive</li>
                  <li>• Use a chave de admin correta</li>
                  <li>• Teste a entrega antes de ir ao ar</li>
                  <li>• Monitore logs do servidor</li>
                </ul>
              </div>
            </div>
            
            <Alert className="bg-blue-900/20 border-blue-700">
              <AlertDescription className="text-blue-300">
                <strong>Chave de Admin:</strong> sono_zen_admin_2025
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}