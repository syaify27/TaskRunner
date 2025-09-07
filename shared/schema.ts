import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const configurations = pgTable("configurations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertConfigurationSchema = createInsertSchema(configurations).pick({
  key: true,
  value: true,
});

export const configurationUpdateSchema = z.object({
  sheetUrl: z.string().url("URL harus valid"),
  pollingInterval: z.number().min(10).max(300),
  adminPassword: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertConfiguration = z.infer<typeof insertConfigurationSchema>;
export type Configuration = typeof configurations.$inferSelect;
export type ConfigurationUpdate = z.infer<typeof configurationUpdateSchema>;

// Dashboard data types
export interface StokData {
  jenis: string;
  stok: number;
}

export interface ProduksiData {
  tanggal: string;
  jumlah: number;
}

export interface BenihData {
  jenis: string;
  jumlah: number;
}

export interface DistribusiData {
  bulan: string;
  jumlah: number;
}

export interface DashboardData {
  stokData: StokData[];
  produksiData: ProduksiData[];
  benihData: BenihData[];
  distribusiData: DistribusiData[];
}
