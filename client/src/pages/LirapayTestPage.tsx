import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, CheckCircle, Copy, CreditCard, DollarSign, TestTube } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TestResult {
  success: boolean;
  data?: any;
  error?: any;
  timestamp: string;
}

export default function LirapayTestPage() {
  const [results, setResults] = useState<Record<string, TestResult>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  // Estados para formulários
  const [transactionData, setTransactionData] = useState({
    external_id: `test_${Date.now()}`,
    total_amount: 2790, // R$ 27,90 em centavos
    payment_method: 'PIX',
    customer: {
      name: 'João Silva',
      email: 'joao@teste.com',
      phone: '11999999999'
    }
  });

  const [transactionId, setTransactionId] = useState('');
  const [cashoutData, setCashoutData] = useState({
    external_id: `cashout_${Date.now()}`,
    pix_key: '11999999999',
    pix_type: 'PHONE',
    amount: 1000
  });

  const apiCall = async (endpoint: string, method: 'GET' | 'POST' = 'GET', body?: any) => {
    setLoading(prev => ({ ...prev, [endpoint]: true }));
    
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();
      
      setResults(prev => ({
        ...prev,
        [endpoint]: {
          success: response.ok,
          data: response.ok ? data : undefined,
          error: !response.ok ? data : undefined,
          timestamp: new Date().toLocaleString()
        }
      }));
    } catch (error) {
      setResults(prev => ({
        ...prev,
        [endpoint]: {
          success: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido',
          timestamp: new Date().toLocaleString()
        }
      }));
    } finally {
      setLoading(prev => ({ ...prev, [endpoint]: false }));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const ResultCard = ({ title, result, loading }: { title: string; result?: TestResult; loading: boolean }) => (
    <Card className="bg-slate-900 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-slate-100 flex items-center gap-2">
          {result?.success ? (
            <CheckCircle className="h-5 w-5 text-green-400" />
          ) : result?.error ? (
            <AlertCircle className="h-5 w-5 text-red-400" />
          ) : (
            <TestTube className="h-5 w-5 text-slate-400" />
          )}
          {title}
        </CardTitle>
        {result && (
          <CardDescription className="text-slate-400">
            {result.timestamp}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center gap-2 text-slate-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-blue"></div>
            Testando...
          </div>
        ) : result ? (
          <div className="space-y-3">
            {result.success && result.data && (
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400 font-medium">Sucesso</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(JSON.stringify(result.data, null, 2))}
                    className="text-green-400 hover:text-green-300"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <pre className="text-xs text-green-100 bg-green-900/20 p-2 rounded overflow-x-auto">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </div>
            )}
            {result.error && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-red-400 font-medium">Erro</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(JSON.stringify(result.error, null, 2))}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <pre className="text-xs text-red-100 bg-red-900/20 p-2 rounded overflow-x-auto">
                  {JSON.stringify(result.error, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="text-slate-500">
            Clique no botão acima para testar este endpoint
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Painel de Testes - Lirapay API</h1>
          <p className="text-slate-400">
            Teste todos os endpoints da API da Lirapay implementados no seu projeto
          </p>
        </div>

        <Alert className="mb-6 border-accent-blue/20 bg-accent-blue/10">
          <AlertCircle className="h-4 w-4 text-accent-blue" />
          <AlertDescription className="text-slate-200">
            <strong>Importante:</strong> Estes são testes usando a API key configurada no servidor. 
            Certifique-se de que você está usando as credenciais corretas para o ambiente desejado.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6">
          {/* Teste de Conexão */}
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <TestTube className="h-5 w-5 text-accent-blue" />
                1. Teste de Conexão
              </CardTitle>
              <CardDescription className="text-slate-400">
                Verifica se a API está funcionando e se as credenciais estão corretas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => apiCall('/api/lira-payment/test')}
                disabled={loading['/api/lira-payment/test']}
                className="mb-4"
              >
                {loading['/api/lira-payment/test'] ? 'Testando...' : 'Testar Conexão'}
              </Button>
              <ResultCard 
                title="Resultado do Teste de Conexão"
                result={results['/api/lira-payment/test']}
                loading={loading['/api/lira-payment/test']}
              />
            </CardContent>
          </Card>

          {/* Criar Transação */}
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-accent-blue" />
                2. Criar Transação
              </CardTitle>
              <CardDescription className="text-slate-400">
                Cria uma nova transação PIX para o produto Sono Zen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="external_id">ID Externo</Label>
                  <Input
                    id="external_id"
                    value={transactionData.external_id}
                    onChange={(e) => setTransactionData(prev => ({ ...prev, external_id: e.target.value }))}
                    className="bg-slate-800 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="total_amount">Valor (centavos)</Label>
                  <Input
                    id="total_amount"
                    type="number"
                    value={transactionData.total_amount}
                    onChange={(e) => setTransactionData(prev => ({ ...prev, total_amount: parseInt(e.target.value) }))}
                    className="bg-slate-800 border-slate-600"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="customer_name">Nome do Cliente</Label>
                  <Input
                    id="customer_name"
                    value={transactionData.customer.name}
                    onChange={(e) => setTransactionData(prev => ({ 
                      ...prev, 
                      customer: { ...prev.customer, name: e.target.value }
                    }))}
                    className="bg-slate-800 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="customer_email">Email</Label>
                  <Input
                    id="customer_email"
                    type="email"
                    value={transactionData.customer.email}
                    onChange={(e) => setTransactionData(prev => ({ 
                      ...prev, 
                      customer: { ...prev.customer, email: e.target.value }
                    }))}
                    className="bg-slate-800 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="customer_phone">Telefone</Label>
                  <Input
                    id="customer_phone"
                    value={transactionData.customer.phone}
                    onChange={(e) => setTransactionData(prev => ({ 
                      ...prev, 
                      customer: { ...prev.customer, phone: e.target.value }
                    }))}
                    className="bg-slate-800 border-slate-600"
                  />
                </div>
              </div>

              <Button 
                onClick={() => apiCall('/api/lira-payment/create-transaction', 'POST', transactionData)}
                disabled={loading['/api/lira-payment/create-transaction']}
                className="w-full"
              >
                {loading['/api/lira-payment/create-transaction'] ? 'Criando...' : 'Criar Transação'}
              </Button>
              
              <ResultCard 
                title="Resultado da Criação"
                result={results['/api/lira-payment/create-transaction']}
                loading={loading['/api/lira-payment/create-transaction']}
              />
            </CardContent>
          </Card>

          {/* Consultar Transação */}
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <TestTube className="h-5 w-5 text-accent-blue" />
                3. Consultar Transação
              </CardTitle>
              <CardDescription className="text-slate-400">
                Consulta o status de uma transação específica
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="transaction_id">ID da Transação</Label>
                <Input
                  id="transaction_id"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Digite o ID da transação para consultar"
                  className="bg-slate-800 border-slate-600"
                />
              </div>

              <Button 
                onClick={() => apiCall(`/api/lira-payment/transaction/${transactionId}`)}
                disabled={loading[`/api/lira-payment/transaction/${transactionId}`] || !transactionId}
                className="w-full"
              >
                {loading[`/api/lira-payment/transaction/${transactionId}`] ? 'Consultando...' : 'Consultar Transação'}
              </Button>
              
              <ResultCard 
                title="Resultado da Consulta"
                result={results[`/api/lira-payment/transaction/${transactionId}`]}
                loading={loading[`/api/lira-payment/transaction/${transactionId}`]}
              />
            </CardContent>
          </Card>

          {/* Criar Cashout */}
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-accent-blue" />
                4. Criar Cashout (PIX)
              </CardTitle>
              <CardDescription className="text-slate-400">
                Cria uma solicitação de saque via PIX
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cashout_external_id">ID Externo</Label>
                  <Input
                    id="cashout_external_id"
                    value={cashoutData.external_id}
                    onChange={(e) => setCashoutData(prev => ({ ...prev, external_id: e.target.value }))}
                    className="bg-slate-800 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="cashout_amount">Valor (centavos)</Label>
                  <Input
                    id="cashout_amount"
                    type="number"
                    value={cashoutData.amount}
                    onChange={(e) => setCashoutData(prev => ({ ...prev, amount: parseInt(e.target.value) }))}
                    className="bg-slate-800 border-slate-600"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pix_key">Chave PIX</Label>
                  <Input
                    id="pix_key"
                    value={cashoutData.pix_key}
                    onChange={(e) => setCashoutData(prev => ({ ...prev, pix_key: e.target.value }))}
                    className="bg-slate-800 border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="pix_type">Tipo da Chave</Label>
                  <select
                    id="pix_type"
                    value={cashoutData.pix_type}
                    onChange={(e) => setCashoutData(prev => ({ ...prev, pix_type: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-slate-100"
                  >
                    <option value="CPF">CPF</option>
                    <option value="CNPJ">CNPJ</option>
                    <option value="PHONE">Telefone</option>
                    <option value="EMAIL">Email</option>
                    <option value="RANDOM">Aleatória</option>
                  </select>
                </div>
              </div>

              <Button 
                onClick={() => apiCall('/api/lira-payment/cashout', 'POST', cashoutData)}
                disabled={loading['/api/lira-payment/cashout']}
                className="w-full"
              >
                {loading['/api/lira-payment/cashout'] ? 'Criando...' : 'Criar Cashout'}
              </Button>
              
              <ResultCard 
                title="Resultado do Cashout"
                result={results['/api/lira-payment/cashout']}
                loading={loading['/api/lira-payment/cashout']}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}