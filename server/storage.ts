import { type User, type InsertUser, type Configuration, type InsertConfiguration, type WebsiteContent, type InsertWebsiteContent, type HeroContent, type AboutContent, type ServicesContent, type ContactContent } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getConfiguration(key: string): Promise<Configuration | undefined>;
  setConfiguration(config: InsertConfiguration): Promise<Configuration>;
  updateConfiguration(key: string, value: string): Promise<Configuration | undefined>;
  getAllConfigurations(): Promise<Configuration[]>;

  getWebsiteContent(section: string): Promise<WebsiteContent | undefined>;
  setWebsiteContent(content: InsertWebsiteContent): Promise<WebsiteContent>;
  updateWebsiteContent(section: string, content: string): Promise<WebsiteContent | undefined>;
  getAllWebsiteContent(): Promise<WebsiteContent[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private configurations: Map<string, Configuration>;
  private websiteContent: Map<string, WebsiteContent>;

  constructor() {
    this.users = new Map();
    this.configurations = new Map();
    this.websiteContent = new Map();
    
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
    
    // Initialize default website content
    this.initializeDefaultWebsiteContent();
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

  async getWebsiteContent(section: string): Promise<WebsiteContent | undefined> {
    return this.websiteContent.get(section);
  }

  async setWebsiteContent(content: InsertWebsiteContent): Promise<WebsiteContent> {
    const id = randomUUID();
    const websiteContent: WebsiteContent = { ...content, id };
    this.websiteContent.set(content.section, websiteContent);
    return websiteContent;
  }

  async updateWebsiteContent(section: string, content: string): Promise<WebsiteContent | undefined> {
    const existing = this.websiteContent.get(section);
    if (existing) {
      const updated: WebsiteContent = { ...existing, content };
      this.websiteContent.set(section, updated);
      return updated;
    }
    return undefined;
  }

  async getAllWebsiteContent(): Promise<WebsiteContent[]> {
    return Array.from(this.websiteContent.values());
  }

  private async initializeDefaultWebsiteContent(): Promise<void> {
    // Hero section default content
    const heroContent: HeroContent = {
      title: "UPT Pembibitan",
      subtitle: "Unit Pelaksana Teknis Pembibitan dan Pembenihan",
      description: "Menyediakan bibit berkualitas tinggi untuk pertanian berkelanjutan Indonesia. Kami berkomitmen untuk mendukung ketahanan pangan nasional melalui inovasi teknologi pembibitan modern dan ramah lingkungan.",
      heroImage: "/src/assets/generated_images/Indonesian_nursery_facility_landscape_583b4905.png",
      stats: {
        varieties: "1000+",
        experience: "50+",
        farmers: "100K+"
      }
    };
    
    // About section default content
    const aboutContent: AboutContent = {
      title: "Tentang UPT Pembibitan",
      subtitle: "Lembaga terdepan dalam pengembangan bibit dan benih berkualitas untuk mendukung pertanian berkelanjutan dan ketahanan pangan Indonesia.",
      vision: "Menjadi pusat unggulan pembibitan dan pembenihan yang menghasilkan varietas unggul untuk mendukung pertanian berkelanjutan dan ramah lingkungan di Indonesia.",
      mission: [
        "Mengembangkan teknologi pembibitan modern dan inovatif",
        "Menyediakan bibit berkualitas tinggi dan bersertifikat",
        "Memberikan edukasi dan pelatihan kepada petani",
        "Mendukung program ketahanan pangan nasional"
      ],
      commitments: {
        success: "95%",
        monitoring: "24/7",
        guarantee: "100%"
      }
    };
    
    // Services section default content
    const servicesContent: ServicesContent = {
      title: "Layanan Agrowisata",
      subtitle: "Rasakan pengalaman menarik belajar pertanian sambil menikmati keindahan alam di fasilitas pembibitan modern kami.",
      heroImage: "/src/assets/generated_images/Indonesian_agrotourism_activities_scene_ee760d16.png",
      services: [
        {
          title: "Tur Kebun Edukasi",
          description: "Jelajahi kebun pembibitan dengan panduan ahli dan pelajari proses pertanian modern",
          price: "Rp 50.000/orang",
          duration: "2-3 jam",
          includes: ["Panduan ahli", "Dokumentasi", "Sertifikat"]
        },
        {
          title: "Workshop Pertanian",
          description: "Pelatihan praktis tentang teknik pembibitan, perawatan tanaman, dan pertanian organik",
          price: "Rp 150.000/orang",
          duration: "4-6 jam",
          includes: ["Materi lengkap", "Praktek langsung", "Take home kit"]
        },
        {
          title: "Farm to Table",
          description: "Nikmati hidangan segar langsung dari kebun dengan konsep farm to table",
          price: "Rp 75.000/orang",
          duration: "2 jam",
          includes: ["Menu organik", "Minuman sehat", "Suasana alam"]
        },
        {
          title: "Paket Keluarga",
          description: "Aktivitas seru untuk seluruh keluarga dengan berbagai permainan edukatif",
          price: "Rp 300.000/keluarga",
          duration: "Seharian",
          includes: ["Semua aktivitas", "Makan siang", "Oleh-oleh"]
        }
      ]
    };
    
    // Contact section default content
    const contactContent: ContactContent = {
      title: "Hubungi Kami",
      subtitle: "Kami siap membantu Anda dengan layanan terbaik. Jangan ragu untuk menghubungi tim profesional kami kapan saja.",
      address: "Jl. Pembibitan Raya No. 123\nKecamatan Pertanian, Kabupaten Subur\nJawa Tengah 50123, Indonesia",
      phone: "Kantor: (0271) 123-4567\nWhatsApp: +62 812-3456-7890\nFax: (0271) 123-4568",
      email: "info@uptpembibitan.go.id",
      workingHours: "Senin - Jumat: 08:00 - 16:00 WIB\nSabtu - Minggu: 08:00 - 17:00 WIB\nHari Libur: Tutup"
    };
    
    // Store default content
    await this.setWebsiteContent({ section: "hero", content: JSON.stringify(heroContent) });
    await this.setWebsiteContent({ section: "about", content: JSON.stringify(aboutContent) });
    await this.setWebsiteContent({ section: "services", content: JSON.stringify(servicesContent) });
    await this.setWebsiteContent({ section: "contact", content: JSON.stringify(contactContent) });
  }
}

export const storage = new MemStorage();
