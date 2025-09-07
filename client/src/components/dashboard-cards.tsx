import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Factory, Wheat, Truck } from "lucide-react";
import type { DashboardData } from "../types/dashboard";

interface DashboardCardsProps {
  data: DashboardData;
}

export function DashboardCards({ data }: DashboardCardsProps) {
  const totalStok = data.stokData.reduce((sum, item) => sum + item.stok, 0);
  const produksiHariIni = data.produksiData[data.produksiData.length - 1]?.jumlah || 0;
  const totalBenih = data.benihData.reduce((sum, item) => sum + item.jumlah, 0);
  const distribusiBulanIni = data.distribusiData[data.distribusiData.length - 1]?.jumlah || 0;

  const cardData = [
    {
      title: "Total Stok Bibit",
      value: totalStok,
      subtitle: "Unit tersedia",
      icon: Leaf,
      iconClass: "text-green-600",
      bgClass: "bg-green-100",
      testId: "card-total-stok"
    },
    {
      title: "Produksi Hari Ini",
      value: produksiHariIni,
      subtitle: "Unit diproduksi",
      icon: Factory,
      iconClass: "text-blue-600",
      bgClass: "bg-blue-100",
      testId: "card-produksi-hari-ini"
    },
    {
      title: "Total Benih",
      value: totalBenih,
      subtitle: "Kg tersedia",
      icon: Wheat,
      iconClass: "text-yellow-600",
      bgClass: "bg-yellow-100",
      testId: "card-total-benih"
    },
    {
      title: "Distribusi Bulan Ini",
      value: distribusiBulanIni,
      subtitle: "Unit didistribusi",
      icon: Truck,
      iconClass: "text-orange-600",
      bgClass: "bg-orange-100",
      testId: "card-distribusi-bulan-ini"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <Card key={index} className="card-hover" data-testid={card.testId}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">{card.title}</p>
                  <p className="text-2xl font-bold text-foreground" data-testid={`text-${card.testId}-value`}>
                    {card.value.toLocaleString('id-ID')}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{card.subtitle}</p>
                </div>
                <div className={`w-12 h-12 ${card.bgClass} rounded-full flex items-center justify-center`}>
                  <IconComponent className={card.iconClass} size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
