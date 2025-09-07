import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { configurationUpdateSchema, rowConfigSchema, type DashboardData, type StokData, type ProduksiData, type BenihData, type DistribusiData, type RowConfiguration } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Admin authentication
  app.post("/api/admin/auth", async (req, res) => {
    try {
      const { password } = req.body;
      const adminPassword = await storage.getConfiguration("adminPassword");
      
      if (adminPassword && password === adminPassword.value) {
        res.json({ success: true, message: "Authentication successful" });
      } else {
        res.status(401).json({ success: false, message: "Invalid password" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  // Get current configuration
  app.get("/api/admin/config", async (req, res) => {
    try {
      const sheetUrl = await storage.getConfiguration("sheetUrl");
      const pollingInterval = await storage.getConfiguration("pollingInterval");
      const rowConfig = await storage.getConfiguration("rowConfiguration");
      
      let rowConfiguration;
      try {
        rowConfiguration = rowConfig ? JSON.parse(rowConfig.value) : {
          stokBibit: { startRow: 2, endRow: 5, label: "Stok Bibit" },
          produksiHarian: { startRow: 6, endRow: 9, label: "Produksi Harian" },
          benihTersedia: { startRow: 10, endRow: 13, label: "Benih Tersedia" },
          distribusiBenih: { startRow: 14, endRow: 17, label: "Distribusi Benih" }
        };
      } catch (parseError) {
        rowConfiguration = {
          stokBibit: { startRow: 2, endRow: 5, label: "Stok Bibit" },
          produksiHarian: { startRow: 6, endRow: 9, label: "Produksi Harian" },
          benihTersedia: { startRow: 10, endRow: 13, label: "Benih Tersedia" },
          distribusiBenih: { startRow: 14, endRow: 17, label: "Distribusi Benih" }
        };
      }
      
      res.json({
        sheetUrl: sheetUrl?.value || "",
        pollingInterval: parseInt(pollingInterval?.value || "30000"),
        rowConfiguration
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to get configuration" });
    }
  });

  // Update configuration
  app.post("/api/admin/config", async (req, res) => {
    try {
      const validatedData = configurationUpdateSchema.parse(req.body);
      
      if (validatedData.sheetUrl) {
        await storage.updateConfiguration("sheetUrl", validatedData.sheetUrl);
      }
      
      if (validatedData.pollingInterval) {
        await storage.updateConfiguration("pollingInterval", validatedData.pollingInterval.toString());
      }
      
      if (validatedData.adminPassword) {
        await storage.updateConfiguration("adminPassword", validatedData.adminPassword);
      }
      
      if (validatedData.rowConfiguration) {
        await storage.updateConfiguration("rowConfiguration", JSON.stringify(validatedData.rowConfiguration));
      }
      
      res.json({ success: true, message: "Configuration updated successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid configuration data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update configuration" });
      }
    }
  });

  // Validate spreadsheet URL
  app.post("/api/admin/validate-url", async (req, res) => {
    try {
      const { url } = req.body;
      
      if (!url) {
        return res.status(400).json({ valid: false, message: "URL is required" });
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const csvText = await response.text();
      const rows = csvText.split('\n').slice(0, 20);
      
      res.json({ 
        valid: true, 
        message: "URL is valid", 
        preview: rows.join('\n') 
      });
    } catch (error) {
      res.json({ 
        valid: false, 
        message: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Get dashboard data
  app.get("/api/dashboard/data", async (req, res) => {
    try {
      const sheetUrlConfig = await storage.getConfiguration("sheetUrl");
      const sheetUrl = sheetUrlConfig?.value;
      
      if (!sheetUrl) {
        return res.json({
          stokData: [],
          produksiData: [],
          benihData: [],
          distribusiData: []
        });
      }

      // Get row configuration
      const rowConfigData = await storage.getConfiguration("rowConfiguration");
      let rowConfig: RowConfiguration;
      
      try {
        rowConfig = rowConfigData ? JSON.parse(rowConfigData.value) : {
          stokBibit: { startRow: 2, endRow: 5, label: "Stok Bibit" },
          produksiHarian: { startRow: 6, endRow: 9, label: "Produksi Harian" },
          benihTersedia: { startRow: 10, endRow: 13, label: "Benih Tersedia" },
          distribusiBenih: { startRow: 14, endRow: 17, label: "Distribusi Benih" }
        };
      } catch (parseError) {
        rowConfig = {
          stokBibit: { startRow: 2, endRow: 5, label: "Stok Bibit" },
          produksiHarian: { startRow: 6, endRow: 9, label: "Produksi Harian" },
          benihTersedia: { startRow: 10, endRow: 13, label: "Benih Tersedia" },
          distribusiBenih: { startRow: 14, endRow: 17, label: "Distribusi Benih" }
        };
      }

      const response = await fetch(sheetUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch spreadsheet data: ${response.statusText}`);
      }

      const csvText = await response.text();
      const rows = csvText.split('\n').map(row => row.split(','));
      
      // Parse data using dynamic row configuration
      const stokData: StokData[] = [];
      const produksiData: ProduksiData[] = [];
      const benihData: BenihData[] = [];
      const distribusiData: DistribusiData[] = [];
      
      // Parse Stok Bibit using configured rows
      for (let i = rowConfig.stokBibit.startRow - 1; i <= rowConfig.stokBibit.endRow - 1; i++) {
        if (rows[i] && rows[i][0] && rows[i][1]) {
          stokData.push({ 
            jenis: rows[i][0].trim(), 
            stok: parseInt(rows[i][1].trim()) || 0 
          });
        }
      }
      
      // Parse Produksi Harian using configured rows
      for (let i = rowConfig.produksiHarian.startRow - 1; i <= rowConfig.produksiHarian.endRow - 1; i++) {
        if (rows[i] && rows[i][0] && rows[i][1]) {
          produksiData.push({ 
            tanggal: rows[i][0].trim(), 
            jumlah: parseFloat(rows[i][1].trim()) || 0 
          });
        }
      }
      
      // Parse Benih Tersedia using configured rows
      for (let i = rowConfig.benihTersedia.startRow - 1; i <= rowConfig.benihTersedia.endRow - 1; i++) {
        if (rows[i] && rows[i][0] && rows[i][1]) {
          benihData.push({ 
            jenis: rows[i][0].trim(), 
            jumlah: parseInt(rows[i][1].trim()) || 0 
          });
        }
      }
      
      // Parse Distribusi Benih using configured rows
      for (let i = rowConfig.distribusiBenih.startRow - 1; i <= rowConfig.distribusiBenih.endRow - 1; i++) {
        if (rows[i] && rows[i][0] && rows[i][1]) {
          distribusiData.push({ 
            bulan: rows[i][0].trim(), 
            jumlah: parseFloat(rows[i][1].trim()) || 0 
          });
        }
      }

      const dashboardData: DashboardData = {
        stokData,
        produksiData,
        benihData,
        distribusiData
      };

      res.json(dashboardData);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch dashboard data",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
