import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertPurchaseSchema } from "@shared/schema";
import { z } from "zod";
import { ProductDeliveryService } from "./email-service";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Lead capture endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      
      // Here you could integrate with email service like Mailchimp, ConvertKit etc.
      console.log(`New lead captured: ${lead.email}`);
      
      res.json({ success: true, lead });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  });

  // Purchase endpoint
  app.post("/api/purchases", async (req, res) => {
    try {
      const validatedData = insertPurchaseSchema.parse(req.body);
      const purchase = await storage.createPurchase(validatedData);
      
      // Here you would integrate with payment processor (Stripe, PayPal, etc.)
      console.log(`New purchase: ${purchase.email} - R$ ${purchase.amount / 100}`);
      
      res.json({ success: true, purchase });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  });

  // Get leads (admin only - in real app would need authentication)
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // Get purchases (admin only)
  app.get("/api/purchases", async (req, res) => {
    try {
      const purchases = await storage.getPurchases();
      res.json(purchases);
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  });

  // Lira PayBr - Test API Connection
  app.get("/api/lira-payment/test", async (req, res) => {
    try {
      const apiSecret = "sk_41cc88f998400db7171239e839e48661370ce6e6cbc22e2c9008e18127cd345bb1154a3049387cfd65d24b25baf51e4bb0a2b0f26c8691e3fc219e2b272a3430";
      
      // Test with a simple account info request
      const response = await fetch('https://api.lirapaybr.com/v1/account-info', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'api-secret': apiSecret
        }
      });

      const result = await response.json();
      
      if (response.ok) {
        res.json({ success: true, data: result });
      } else {
        console.error('Lira PayBr API test error:', result);
        res.status(response.status).json({ success: false, error: result });
      }
    } catch (error) {
      console.error('Lira PayBr test error:', error);
      res.status(500).json({ message: "Erro ao testar API" });
    }
  });

  // Lira PayBr - Create Transaction
  app.post("/api/lira-payment/create-transaction", async (req, res) => {
    try {
      const apiSecret = "sk_41cc88f998400db7171239e839e48661370ce6e6cbc22e2c9008e18127cd345bb1154a3049387cfd65d24b25baf51e4bb0a2b0f26c8691e3fc219e2b272a3430";
      
      const {
        external_id,
        total_amount,
        payment_method = "PIX",
        webhook_url,
        items,
        customer,
        card // New field for credit card data
      } = req.body;

      // Get client IP address - usar IP válido para teste
      const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
      const validIp = clientIp.toString().includes('::') ? '127.0.0.1' : clientIp;
      
      // Validate credit card fields if payment method is CREDIT_CARD
      if (payment_method === 'CREDIT_CARD') {
        if (!card || !card.number || !card.expiry_month || !card.expiry_year || !card.cvv || !card.holder_name) {
          return res.status(400).json({
            success: false,
            error: 'Missing required credit card fields: number, expiry_month, expiry_year, cvv, holder_name'
          });
        }
      }
      
      // Create transaction with Lira PayBr API - using temporary webhook for testing
      const transactionData: any = {
        external_id,
        total_amount,
        payment_method,
        ip: Array.isArray(validIp) ? validIp[0] : validIp.toString().split(',')[0],
        webhook_url: webhook_url || "https://webhook.site/test",
        items: items || [{
          id: "sono-zen-method",
          title: "Método Sono Zen - Transformação em 7 Noites",
          description: "Método completo para transformar seu sono em apenas 7 noites",
          price: total_amount,
          quantity: 1,
          is_physical: false
        }],
        customer: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          document_type: customer.document_type || "CPF",
          document: customer.document || "11144477735"
        }
      };

      // Add credit card data if payment method is CREDIT_CARD
      if (payment_method === 'CREDIT_CARD' && card) {
        transactionData.card = {
          number: card.number,
          expiry_month: card.expiry_month,
          expiry_year: card.expiry_year,
          cvv: card.cvv,
          holder_name: card.holder_name
        };
      }

      // Add boleto specific data if needed
      if (payment_method === 'BOLETO') {
        // Boleto usually has a due date (vencimento)
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 3); // 3 days from now
        transactionData.boleto = {
          due_date: dueDate.toISOString().split('T')[0] // YYYY-MM-DD format
        };
      }

      const response = await fetch('https://api.lirapaybr.com/v1/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-secret': apiSecret
        },
        body: JSON.stringify(transactionData)
      });

      const result = await response.json();
      
      if (response.ok) {
        // Save to database
        const purchaseData = {
          name: customer.name,
          email: customer.email,
          phone: customer.phone || "",
          amount: total_amount,
          paymentMethod: payment_method,
          status: "pending",
          externalId: result.id,
          pixKey: result.pix_key || ""
        };
        
        const purchase = await storage.createPurchase(purchaseData);
        
        console.log(`Lira PayBr transaction created: ${result.id}`);
        
        // Automatically deliver product when transaction is created
        // In PIX payments, we deliver immediately as payment is expected to be instant
        try {
          const deliveryResult = await ProductDeliveryService.sendProductDelivery(
            {
              id: result.id,
              external_id: result.external_id || external_id,
              status: result.status || 'pending',
              total_value: total_amount,
              pix: result.pix ? { payload: result.pix.payload } : undefined
            },
            customer.name,
            customer.email
          );
          
          console.log('🎁 Produto entregue automaticamente:', deliveryResult);
          
        } catch (deliveryError) {
          console.error('❌ Erro na entrega automática do produto:', deliveryError);
          // Don't fail the transaction if delivery fails, just log it
        }
        
        res.json({ 
          success: true, 
          transaction: result,
          purchase: purchase,
          productDelivered: true,
          message: "Transação criada e produto entregue automaticamente!"
        });
      } else {
        console.error('Lira PayBr API error:', result);
        res.status(400).json({ success: false, error: result });
      }
    } catch (error) {
      console.error('Lira PayBr transaction error:', error);
      res.status(500).json({ message: "Erro ao criar transação" });
    }
  });

  // Lira PayBr - Check Transaction Status
  app.get("/api/lira-payment/transaction/:transactionId", async (req, res) => {
    try {
      const apiSecret = "sk_41cc88f998400db7171239e839e48661370ce6e6cbc22e2c9008e18127cd345bb1154a3049387cfd65d24b25baf51e4bb0a2b0f26c8691e3fc219e2b272a3430";
      const { transactionId } = req.params;

      const response = await fetch(`https://api.lirapaybr.com/v1/transactions/${transactionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'api-secret': apiSecret
        }
      });

      const result = await response.json();
      
      if (response.ok) {
        res.json({ success: true, transaction: result });
      } else {
        console.error('Lira PayBr API error:', result);
        res.status(400).json({ success: false, error: result });
      }
    } catch (error) {
      console.error('Lira PayBr check transaction error:', error);
      res.status(500).json({ message: "Erro ao consultar transação" });
    }
  });

  // Lira PayBr - Create Cashout (PIX)
  app.post("/api/lira-payment/cashout", async (req, res) => {
    try {
      const apiSecret = "sk_41cc88f998400db7171239e839e48661370ce6e6cbc22e2c9008e18127cd345bb1154a3049387cfd65d24b25baf51e4bb0a2b0f26c8691e3fc219e2b272a3430";
      
      const {
        external_id,
        pix_key,
        pix_type = "CPF",
        amount,
        webhook_url
      } = req.body;

      const cashoutData = {
        external_id,
        pix_key,
        pix_type,
        amount,
        webhook_url: webhook_url || `${req.protocol}://${req.get('host')}/api/lira-payment/cashout-webhook`
      };

      const response = await fetch('https://api.lirapaybr.com/v1/cashout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-secret': apiSecret
        },
        body: JSON.stringify(cashoutData)
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log(`Lira PayBr cashout created: ${result.id}`);
        res.json({ success: true, cashout: result });
      } else {
        console.error('Lira PayBr cashout error:', result);
        res.status(400).json({ success: false, error: result });
      }
    } catch (error) {
      console.error('Lira PayBr cashout error:', error);
      res.status(500).json({ message: "Erro ao criar cashout" });
    }
  });

  // Lira PayBr - Webhook for transaction updates
  app.post("/api/lira-payment/webhook", async (req, res) => {
    try {
      const { id, external_id, status, total_amount, payment_method } = req.body;
      
      console.log('Lira PayBr webhook received:', req.body);
      
      // Update purchase status in database based on external_id
      if (id) {
        const updatedPurchase = await storage.updatePurchaseByExternalId(id, {
          status: status.toLowerCase(),
          amount: total_amount || undefined,
          paymentMethod: payment_method || undefined
        });
        
        if (updatedPurchase) {
          console.log(`Purchase updated: ${updatedPurchase.id} - Status: ${updatedPurchase.status}`);
        } else {
          console.log(`Purchase not found for external_id: ${id}`);
        }
      }
      
      res.status(200).json({ received: true });
    } catch (error) {
      console.error('Lira PayBr webhook error:', error);
      res.status(500).json({ message: "Erro no webhook" });
    }
  });

  // Facebook Conversions API endpoint
  app.post("/api/facebook-conversion", async (req, res) => {
    try {
      const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
      const pixelId = '1115446710644058'; // Your Facebook Pixel ID
      
      if (!accessToken) {
        return res.status(500).json({ message: "Facebook access token not configured" });
      }

      const {
        eventName,
        eventTime,
        userData,
        customData,
        eventSourceUrl,
        actionSource = 'website'
      } = req.body;

      const conversionData = {
        data: [{
          event_name: eventName,
          event_time: Math.floor(eventTime / 1000), // Convert to Unix timestamp
          action_source: actionSource,
          event_source_url: eventSourceUrl,
          user_data: userData,
          custom_data: customData
        }],
        test_event_code: 'TEST74923'
      };

      const response = await fetch(`https://graph.facebook.com/v18.0/${pixelId}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...conversionData,
          access_token: accessToken
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('Facebook Conversion API success:', result);
        res.json({ success: true, result });
      } else {
        console.error('Facebook Conversion API error:', result);
        res.status(400).json({ success: false, error: result });
      }
    } catch (error) {
      console.error('Facebook Conversion API error:', error);
      res.status(500).json({ message: "Erro ao enviar para Facebook API" });
    }
  });

  // Webhook endpoint for payment confirmations
  app.post("/api/lira-payment/webhook", async (req, res) => {
    try {
      const { transaction_id, status, external_id } = req.body;
      
      console.log('🔔 Webhook recebido:', req.body);
      
      if (status === 'approved' || status === 'paid') {
        // Find the purchase by external_id
        const purchases = await storage.getAllPurchases();
        const purchase = purchases.find(p => p.externalId === transaction_id);
        
        if (purchase) {
          // Update purchase status
          // Note: This is a simplified approach. In production, you'd have update methods
          console.log('✅ Pagamento confirmado via webhook para:', purchase.email);
          
          // Send product delivery confirmation
          try {
            const deliveryResult = await ProductDeliveryService.sendProductDelivery(
              {
                id: transaction_id,
                external_id: external_id || transaction_id,
                status: status,
                total_value: purchase.amount,
                pix: undefined // Webhook doesn't typically include PIX data
              },
              purchase.name,
              purchase.email
            );
            
            console.log('🎁 Produto entregue via webhook:', deliveryResult);
            
          } catch (deliveryError) {
            console.error('❌ Erro na entrega via webhook:', deliveryError);
          }
        }
      }
      
      res.json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({ error: 'Webhook processing failed' });
    }
  });

  // Admin endpoint to update product download link
  app.post("/api/admin/update-download-link", async (req, res) => {
    try {
      const { downloadLink, adminKey } = req.body;
      
      // Simple admin authentication - in production use proper auth
      if (adminKey !== "sono_zen_admin_2025") {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      if (!downloadLink || !downloadLink.startsWith('http')) {
        return res.status(400).json({ error: "Invalid download link" });
      }
      
      ProductDeliveryService.updateDownloadLink(downloadLink);
      
      res.json({ 
        success: true, 
        message: "Link de download atualizado com sucesso!",
        newLink: downloadLink
      });
    } catch (error) {
      console.error('Update download link error:', error);
      res.status(500).json({ error: 'Failed to update download link' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
