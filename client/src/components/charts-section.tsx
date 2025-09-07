import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import type { DashboardData } from "../types/dashboard";

interface ChartsSectionProps {
  data: DashboardData;
  isLoading: boolean;
}

declare global {
  interface Window {
    Chart: any;
  }
}

export function ChartsSection({ data, isLoading }: ChartsSectionProps) {
  const stokChartRef = useRef<HTMLCanvasElement>(null);
  const produksiChartRef = useRef<HTMLCanvasElement>(null);
  const benihChartRef = useRef<HTMLCanvasElement>(null);
  const distribusiChartRef = useRef<HTMLCanvasElement>(null);
  
  const stokChartInstance = useRef<any>(null);
  const produksiChartInstance = useRef<any>(null);
  const benihChartInstance = useRef<any>(null);
  const distribusiChartInstance = useRef<any>(null);

  useEffect(() => {
    // Load Chart.js
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = () => {
      initializeCharts();
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup charts
      stokChartInstance.current?.destroy();
      produksiChartInstance.current?.destroy();
      benihChartInstance.current?.destroy();
      distribusiChartInstance.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (window.Chart && data) {
      updateCharts();
    }
  }, [data]);

  const initializeCharts = () => {
    if (!window.Chart) return;

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
        }
      }
    };

    // Stok Chart (Doughnut)
    if (stokChartRef.current) {
      stokChartInstance.current = new window.Chart(stokChartRef.current, {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [{
            data: [],
            backgroundColor: [
              'hsl(142, 76%, 36%)', 
              'hsl(24, 95%, 53%)', 
              'hsl(217, 91%, 60%)', 
              'hsl(262, 83%, 58%)'
            ]
          }]
        },
        options: chartOptions
      });
    }

    // Produksi Chart (Line)
    if (produksiChartRef.current) {
      produksiChartInstance.current = new window.Chart(produksiChartRef.current, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Produksi Harian',
            data: [],
            borderColor: 'hsl(142, 76%, 36%)',
            backgroundColor: 'hsla(142, 76%, 36%, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          ...chartOptions,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    // Benih Chart (Bar)
    if (benihChartRef.current) {
      benihChartInstance.current = new window.Chart(benihChartRef.current, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{
            label: 'Ketersediaan (Kg)',
            data: [],
            backgroundColor: 'hsl(24, 95%, 53%)'
          }]
        },
        options: {
          ...chartOptions,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    // Distribusi Chart (Bar)
    if (distribusiChartRef.current) {
      distribusiChartInstance.current = new window.Chart(distribusiChartRef.current, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{
            label: 'Distribusi Bulanan',
            data: [],
            backgroundColor: 'hsl(217, 91%, 60%)'
          }]
        },
        options: {
          ...chartOptions,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };

  const updateCharts = () => {
    // Update Stok Chart
    if (stokChartInstance.current) {
      stokChartInstance.current.data.labels = data.stokData.map(item => item.jenis);
      stokChartInstance.current.data.datasets[0].data = data.stokData.map(item => item.stok);
      stokChartInstance.current.update();
    }

    // Update Produksi Chart
    if (produksiChartInstance.current) {
      produksiChartInstance.current.data.labels = data.produksiData.map(item => item.tanggal);
      produksiChartInstance.current.data.datasets[0].data = data.produksiData.map(item => item.jumlah);
      produksiChartInstance.current.update();
    }

    // Update Benih Chart
    if (benihChartInstance.current) {
      benihChartInstance.current.data.labels = data.benihData.map(item => item.jenis);
      benihChartInstance.current.data.datasets[0].data = data.benihData.map(item => item.jumlah);
      benihChartInstance.current.update();
    }

    // Update Distribusi Chart
    if (distribusiChartInstance.current) {
      distribusiChartInstance.current.data.labels = data.distribusiData.map(item => item.bulan);
      distribusiChartInstance.current.data.datasets[0].data = data.distribusiData.map(item => item.jumlah);
      distribusiChartInstance.current.update();
    }
  };

  const LoadingIcon = ({ show }: { show: boolean }) => (
    <RefreshCw className={`h-4 w-4 ${show ? 'animate-spin' : 'opacity-0'}`} />
  );

  return (
    <>
      {/* Top Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card data-testid="chart-stok-bibit">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Stok Bibit per Jenis</span>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <LoadingIcon show={isLoading} />
                <span>Diperbarui otomatis</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <canvas ref={stokChartRef} data-testid="canvas-stok-chart" />
            </div>
          </CardContent>
        </Card>

        <Card data-testid="chart-produksi-harian">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Produksi Harian (7 Hari Terakhir)</span>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <LoadingIcon show={isLoading} />
                <span>Real-time</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <canvas ref={produksiChartRef} data-testid="canvas-produksi-chart" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card data-testid="chart-benih-tersedia">
          <CardHeader>
            <CardTitle>Ketersediaan Benih per Jenis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <canvas ref={benihChartRef} data-testid="canvas-benih-chart" />
            </div>
          </CardContent>
        </Card>

        <Card data-testid="chart-distribusi-bulanan">
          <CardHeader>
            <CardTitle>Distribusi Benih Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <canvas ref={distribusiChartRef} data-testid="canvas-distribusi-chart" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
