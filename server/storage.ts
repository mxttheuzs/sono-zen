import { users, leads, purchases, type User, type InsertUser, type Lead, type InsertLead, type Purchase, type InsertPurchase } from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Leads
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  
  // Purchases
  createPurchase(purchase: InsertPurchase): Promise<Purchase>;
  getPurchases(): Promise<Purchase[]>;
  updatePurchaseStatus(id: number, status: string): Promise<Purchase | undefined>;
  getPurchaseByExternalId(externalId: string): Promise<Purchase | undefined>;
  updatePurchaseByExternalId(externalId: string, updates: Partial<Purchase>): Promise<Purchase | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private leads: Map<number, Lead>;
  private purchases: Map<number, Purchase>;
  private currentUserId: number;
  private currentLeadId: number;
  private currentPurchaseId: number;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.purchases = new Map();
    this.currentUserId = 1;
    this.currentLeadId = 1;
    this.currentPurchaseId = 1;
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Leads
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.currentLeadId++;
    const lead: Lead = { 
      ...insertLead, 
      id,
      createdAt: new Date()
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  // Purchases
  async createPurchase(insertPurchase: InsertPurchase): Promise<Purchase> {
    const id = this.currentPurchaseId++;
    const purchase: Purchase = { 
      ...insertPurchase, 
      id,
      createdAt: new Date()
    };
    this.purchases.set(id, purchase);
    return purchase;
  }

  async getPurchases(): Promise<Purchase[]> {
    return Array.from(this.purchases.values());
  }

  async updatePurchaseStatus(id: number, status: string): Promise<Purchase | undefined> {
    const purchase = this.purchases.get(id);
    if (purchase) {
      const updatedPurchase = { ...purchase, status };
      this.purchases.set(id, updatedPurchase);
      return updatedPurchase;
    }
    return undefined;
  }

  async getPurchaseByExternalId(externalId: string): Promise<Purchase | undefined> {
    return Array.from(this.purchases.values()).find(
      (purchase) => purchase.externalId === externalId,
    );
  }

  async updatePurchaseByExternalId(externalId: string, updates: Partial<Purchase>): Promise<Purchase | undefined> {
    const purchases = Array.from(this.purchases.entries());
    const purchaseEntry = purchases.find(([_, purchase]) => purchase.externalId === externalId);
    
    if (purchaseEntry) {
      const [id, purchase] = purchaseEntry;
      const updatedPurchase = { ...purchase, ...updates };
      this.purchases.set(id, updatedPurchase);
      return updatedPurchase;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
