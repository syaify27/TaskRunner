import { type User, type InsertUser, type Configuration, type InsertConfiguration } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getConfiguration(key: string): Promise<Configuration | undefined>;
  setConfiguration(config: InsertConfiguration): Promise<Configuration>;
  updateConfiguration(key: string, value: string): Promise<Configuration | undefined>;
  getAllConfigurations(): Promise<Configuration[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private configurations: Map<string, Configuration>;

  constructor() {
    this.users = new Map();
    this.configurations = new Map();
    
    // Initialize default admin user
    this.createUser({ username: "admin", password: "admin123" });
    
    // Initialize default configurations
    this.setConfiguration({ key: "adminPassword", value: "admin123" });
    this.setConfiguration({ key: "sheetUrl", value: "" });
    this.setConfiguration({ key: "pollingInterval", value: "30000" });
    
    // Initialize default row configuration
    const defaultRowConfig = JSON.stringify({
      stokBibit: { startRow: 2, endRow: 5, label: "Stok Bibit" },
      produksiHarian: { startRow: 6, endRow: 9, label: "Produksi Harian" },
      benihTersedia: { startRow: 10, endRow: 13, label: "Benih Tersedia" },
      distribusiBenih: { startRow: 14, endRow: 17, label: "Distribusi Benih" }
    });
    this.setConfiguration({ key: "rowConfiguration", value: defaultRowConfig });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getConfiguration(key: string): Promise<Configuration | undefined> {
    return this.configurations.get(key);
  }

  async setConfiguration(config: InsertConfiguration): Promise<Configuration> {
    const id = randomUUID();
    const configuration: Configuration = { ...config, id };
    this.configurations.set(config.key, configuration);
    return configuration;
  }

  async updateConfiguration(key: string, value: string): Promise<Configuration | undefined> {
    const existing = this.configurations.get(key);
    if (existing) {
      const updated: Configuration = { ...existing, value };
      this.configurations.set(key, updated);
      return updated;
    }
    return undefined;
  }

  async getAllConfigurations(): Promise<Configuration[]> {
    return Array.from(this.configurations.values());
  }
}

export const storage = new MemStorage();
