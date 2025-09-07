import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "../components/navbar";
import { HeroSection } from "../components/hero-section";
import { AboutSection } from "../components/about-section";
import { DashboardCards } from "../components/dashboard-cards";
import { ChartsSection } from "../components/charts-section";
import { ServicesSection } from "../components/services-section";
import { ContactSection } from "../components/contact-section";
import { AdminPanel } from "../components/admin-panel";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Leaf } from "lucide-react";
import { api } from "../lib/api";
import type { DashboardData } from "../types/dashboard";

export default function Dashboard() {
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const { 
    data: dashboardData, 
    isLoading, 
    error,
    refetch 
  } = useQuery<DashboardData>({
    queryKey: ['/api/dashboard/data'],
    refetchInterval: 30000, // 30 seconds polling
    refetchOnWindowFocus: false
  });

  const emptyData: DashboardData = {
    stokData: [],
    produksiData: [],
    benihData: [],
    distribusiData: []
  };

  const data: DashboardData = dashboardData || emptyData;

  useEffect(() => {
    if (dashboardData) {
      setIsOnline(true);
    } else if (error) {
      setIsOnline(false);
    }
  }, [dashboardData, error]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onToggleAdminPanel={() => setIsAdminPanelOpen(!isAdminPanelOpen)}
        isOnline={isOnline}
      />

      {/* Hero Section */}
      <section id="hero-section">
        <HeroSection />
      </section>

      {/* About Section */}
      <section id="about-section">
        <AboutSection />
      </section>

      {/* Dashboard Section */}
      <section id="dashboard-section" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Dashboard Monitoring Real-time
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Pantau data produksi, stok, dan distribusi secara real-time langsung dari Google Spreadsheet
            </p>
          </div>
          
          <div className="mb-16">
            <DashboardCards data={data} />
          </div>

          <ChartsSection data={data} isLoading={isLoading} />

          {error && (
            <Alert className="mt-8 bg-red-50 border-red-200" data-testid="alert-fetch-error">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-700">
                <strong>Gagal Mengambil Data</strong>
                <br />
                Tidak dapat terhubung ke sumber data. Silakan periksa konfigurasi URL atau koneksi internet.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Contact Section */}
      <section id="contact-section">
        <ContactSection />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Leaf className="text-green-400 mr-2" size={24} />
                <h3 className="text-xl font-bold">UPT Pembibitan</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Unit Pelaksana Teknis Pembibitan dan Pembenihan yang berkomitmen 
                untuk mendukung ketahanan pangan nasional melalui inovasi teknologi 
                pertanian berkelanjutan.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Menu Navigasi</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-green-400 transition-colors">Beranda</button></li>
                <li><button onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-green-400 transition-colors">Tentang Kami</button></li>
                <li><button onClick={() => document.getElementById('dashboard-section')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-green-400 transition-colors">Dashboard</button></li>
                <li><button onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-green-400 transition-colors">Agrowisata</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Kontak Info</h4>
              <div className="text-gray-300 space-y-2">
                <p>📍 Jl. Pembibitan Raya No. 123</p>
                <p>📞 (0271) 123-4567</p>
                <p>✉️ info@uptpembibitan.go.id</p>
                <p>🕒 Senin - Jumat: 08:00 - 16:00</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 UPT Pembibitan dan Pembenihan. Semua hak dilindungi undang-undang.</p>
          </div>
        </div>
      </footer>

      <AdminPanel 
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />
    </div>
  );
}
