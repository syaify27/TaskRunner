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

export const websiteContent = pgTable("website_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  section: text("section").notNull().unique(), // hero, about, services, contact
  content: text("content").notNull(), // JSON string containing all content for that section
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertConfigurationSchema = createInsertSchema(configurations).pick({
  key: true,
  value: true,
});

export const insertWebsiteContentSchema = createInsertSchema(websiteContent).pick({
  section: true,
  content: true,
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

// Website content schemas
export const heroContentSchema = z.object({
  title: z.string().default("UPT Pembibitan"),
  subtitle: z.string().default("Unit Pelaksana Teknis Pembibitan dan Pembenihan"),
  description: z.string().default("Menyediakan bibit berkualitas tinggi untuk pertanian berkelanjutan Indonesia."),
  heroImage: z.string().url().optional(),
  stats: z.object({
    varieties: z.string().default("1000+"),
    experience: z.string().default("50+"),
    farmers: z.string().default("100K+")
  }).optional()
});

export const aboutContentSchema = z.object({
  title: z.string().default("Tentang UPT Pembibitan"),
  subtitle: z.string().default("Lembaga terdepan dalam pengembangan bibit dan benih berkualitas"),
  vision: z.string().default("Menjadi pusat unggulan pembibitan dan pembenihan yang menghasilkan varietas unggul"),
  mission: z.array(z.string()).default([
    "Mengembangkan teknologi pembibitan modern dan inovatif",
    "Menyediakan bibit berkualitas tinggi dan bersertifikat",
    "Memberikan edukasi dan pelatihan kepada petani",
    "Mendukung program ketahanan pangan nasional"
  ]),
  commitments: z.object({
    success: z.string().default("95%"),
    monitoring: z.string().default("24/7"),
    guarantee: z.string().default("100%")
  }).optional()
});

export const servicesContentSchema = z.object({
  title: z.string().default("Layanan Agrowisata"),
  subtitle: z.string().default("Rasakan pengalaman menarik belajar pertanian sambil menikmati keindahan alam"),
  heroImage: z.string().url().optional(),
  services: z.array(z.object({
    title: z.string(),
    description: z.string(),
    price: z.string(),
    duration: z.string(),
    includes: z.array(z.string())
  })).default([])
});

export const contactContentSchema = z.object({
  title: z.string().default("Hubungi Kami"),
  subtitle: z.string().default("Kami siap membantu Anda dengan layanan terbaik"),
  address: z.string().default("Jl. Pembibitan Raya No. 123, Kecamatan Pertanian"),
  phone: z.string().default("(0271) 123-4567"),
  email: z.string().default("info@uptpembibitan.go.id"),
  workingHours: z.string().default("Senin - Jumat: 08:00 - 16:00 WIB")
});

export const websiteContentSchema = z.object({
  hero: heroContentSchema.optional(),
  about: aboutContentSchema.optional(),
  services: servicesContentSchema.optional(),
  contact: contactContentSchema.optional()
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertConfiguration = z.infer<typeof insertConfigurationSchema>;
export type Configuration = typeof configurations.$inferSelect;
export type InsertWebsiteContent = z.infer<typeof insertWebsiteContentSchema>;
export type WebsiteContent = typeof websiteContent.$inferSelect;
export type ConfigurationUpdate = z.infer<typeof configurationUpdateSchema>;
export type RowConfiguration = z.infer<typeof rowConfigSchema>;
export type HeroContent = z.infer<typeof heroContentSchema>;
export type AboutContent = z.infer<typeof aboutContentSchema>;
export type ServicesContent = z.infer<typeof servicesContentSchema>;
export type ContactContent = z.infer<typeof contactContentSchema>;
export type WebsiteContentData = z.infer<typeof websiteContentSchema>;

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
