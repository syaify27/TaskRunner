import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "../components/navbar";
import { DashboardCards } from "../components/dashboard-cards";
import { ChartsSection } from "../components/charts-section";
import { AdminPanel } from "../components/admin-panel";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
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
    refetchOnWindowFocus: false,
    onError: () => setIsOnline(false),
    onSuccess: () => setIsOnline(true)
  });

  const emptyData: DashboardData = {
    stokData: [],
    produksiData: [],
    benihData: [],
    distribusiData: []
  };

  const data = dashboardData || emptyData;

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Dashboard Monitoring Real-time
          </h2>
          
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
      </main>

      <AdminPanel 
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />
    </div>
  );
}
