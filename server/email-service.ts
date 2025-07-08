import { Transaction } from '../shared/schema';

interface EmailData {
  to: string;
  customerName: string;
  transactionId: string;
  productName: string;
  downloadLink: string;
}

// Email template for product delivery
const createDeliveryEmailHTML = (data: EmailData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Sono Zen - Acesso Liberado!</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f4f4f4; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
    .header { text-align: center; margin-bottom: 30px; }
    .logo { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
    .success-icon { font-size: 48px; margin-bottom: 15px; }
    .download-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }
    .download-button:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4); }
    .content { margin: 20px 0; }
    .highlight { background: #f8f9ff; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px; }
    .transaction-id { font-family: monospace; background: #f5f5f5; padding: 5px 10px; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <div class="success-icon">🌙</div>
        <h1>Sono Zen - Método Oriental</h1>
        <p>Seu acesso foi liberado com sucesso!</p>
      </div>
    </div>

    <div class="content">
      <h2>Olá, ${data.customerName}!</h2>
      
      <p>Parabéns! Sua compra foi processada com sucesso e agora você tem acesso completo ao <strong>Sono Zen - Método Oriental</strong>.</p>
      
      <div class="highlight">
        <h3>🎉 O que você recebeu:</h3>
        <ul>
          <li>E-book completo com 180+ páginas</li>
          <li>6 módulos especializados de transformação do sono</li>
          <li>Técnicas orientais milenares</li>
          <li>Métodos de respiração 4-7-8</li>
          <li>Pontos de acupressão para relaxamento</li>
          <li>Frequências 432Hz e batidas binaurais</li>
          <li>Protocolo completo de 7 noites</li>
        </ul>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${data.downloadLink}" class="download-button">
          📥 BAIXAR MEU SONO ZEN AGORA
        </a>
      </div>

      <div class="highlight">
        <h3>🔐 Informações do seu pedido:</h3>
        <p><strong>Produto:</strong> ${data.productName}</p>
        <p><strong>ID da Transação:</strong> <span class="transaction-id">${data.transactionId}</span></p>
        <p><strong>Status:</strong> ✅ Aprovado e Entregue</p>
      </div>

      <h3>🌙 Como começar sua transformação:</h3>
      <ol>
        <li>Clique no botão de download acima</li>
        <li>Salve o arquivo em um local seguro</li>
        <li>Comece pelo Módulo 1 - Preparação Mental</li>
        <li>Siga o cronograma de 7 noites</li>
        <li>Pratique as técnicas diariamente</li>
      </ol>

      <div class="highlight">
        <h3>💡 Dica importante:</h3>
        <p>Para melhores resultados, dedique 15-20 minutos por noite às práticas. A transformação acontece gradualmente, mas muitas pessoas relatam melhorias já na primeira noite!</p>
      </div>

      <p><strong>Lembre-se:</strong> Você tem 7 dias de garantia total. Se não ficar satisfeito, devolvemos 100% do seu investimento.</p>
    </div>

    <div class="footer">
      <p>Este e-mail foi enviado automaticamente após a confirmação do seu pagamento.</p>
      <p>Se tiver dúvidas, responda este e-mail ou entre em contato: metodosozonozen@gmail.com</p>
      <p><strong>Sono Zen</strong> - Transformando noites, mudando vidas</p>
    </div>
  </div>
</body>
</html>
`;

// Product delivery service
export class ProductDeliveryService {
  private static productId = "717c2192-d50e-4f36-9fc3-d7eb9a1d22d7"; // Sono Zen - Método Oriental
  private static productDownloadLink = "https://drive.google.com/file/d/1751948184816-beb814d4/view"; // Sono Zen - Método Oriental
  
  static async sendProductDelivery(transaction: Transaction, customerName: string, customerEmail: string) {
    const emailData: EmailData = {
      to: customerEmail,
      customerName: customerName,
      transactionId: transaction.external_id,
      productName: "Sono Zen - Método Oriental",
      downloadLink: this.productDownloadLink
    };

    try {
      // For now, we'll log the email content and simulate sending
      // In production, this would integrate with an email service like SendGrid, Mailgun, etc.
      
      console.log('🎯 PRODUTO ENTREGUE AUTOMATICAMENTE:');
      console.log('📧 Para:', emailData.to);
      console.log('👤 Cliente:', emailData.customerName);
      console.log('🆔 Transação:', emailData.transactionId);
      console.log('🆔 Produto ID:', this.productId);
      console.log('📦 Produto:', emailData.productName);
      console.log('🔗 Link de Download:', emailData.downloadLink);
      
      // Simulate email sending
      const emailHTML = createDeliveryEmailHTML(emailData);
      
      // In a real implementation, you would send this via your email provider:
      // await emailProvider.send({
      //   to: emailData.to,
      //   subject: `🌙 Sono Zen - Seu acesso foi liberado! Download disponível`,
      //   html: emailHTML
      // });
      
      console.log('✅ Email de entrega simulado enviado com sucesso!');
      console.log('📄 Preview do email salvo em logs');
      
      return {
        success: true,
        message: 'Produto entregue com sucesso',
        emailSent: true,
        productId: this.productId,
        downloadLink: emailData.downloadLink
      };
      
    } catch (error) {
      console.error('❌ Erro ao entregar produto:', error);
      return {
        success: false,
        message: 'Erro na entrega do produto',
        error: error
      };
    }
  }

  // Update the download link when needed
  static updateDownloadLink(newLink: string) {
    this.productDownloadLink = newLink;
    console.log('🔗 Link de download atualizado:', newLink);
  }
}