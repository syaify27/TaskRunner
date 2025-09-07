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

// Row configuration schema
export interface RowRange {
  startRow: number;
  endRow: number;
  label: string;
}

export const rowConfigSchema = z.object({
  stokBibit: z.object({
    startRow: z.number().min(1).max(1000),
    endRow: z.number().min(1).max(1000),
    label: z.string().default("Stok Bibit")
  }),
  produksiHarian: z.object({
    startRow: z.number().min(1).max(1000),
    endRow: z.number().min(1).max(1000),
    label: z.string().default("Produksi Harian")
  }),
  benihTersedia: z.object({
    startRow: z.number().min(1).max(1000),
    endRow: z.number().min(1).max(1000),
    label: z.string().default("Benih Tersedia")
  }),
  distribusiBenih: z.object({
    startRow: z.number().min(1).max(1000),
    endRow: z.number().min(1).max(1000),
    label: z.string().default("Distribusi Benih")
  })
}).refine((data) => {
  // Validate that endRow is greater than startRow for each category
  return data.stokBibit.endRow >= data.stokBibit.startRow &&
         data.produksiHarian.endRow >= data.produksiHarian.startRow &&
         data.benihTersedia.endRow >= data.benihTersedia.startRow &&
         data.distribusiBenih.endRow >= data.distribusiBenih.startRow;
}, {
  message: "Baris akhir harus lebih besar atau sama dengan baris awal"
});

export const configurationUpdateSchema = z.object({
  sheetUrl: z.string().url("URL harus valid"),
  pollingInterval: z.number().min(10).max(300),
  adminPassword: z.string().optional(),
  rowConfiguration: rowConfigSchema.optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertConfiguration = z.infer<typeof insertConfigurationSchema>;
export type Configuration = typeof configurations.$inferSelect;
export type ConfigurationUpdate = z.infer<typeof configurationUpdateSchema>;
export type RowConfiguration = z.infer<typeof rowConfigSchema>;

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
