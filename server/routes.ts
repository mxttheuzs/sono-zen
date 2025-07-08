import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertPurchaseSchema } from "@shared/schema";
import { z } from "zod";

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

  const httpServer = createServer(app);
  return httpServer;
}
