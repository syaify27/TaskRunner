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

export interface RowRange {
  startRow: number;
  endRow: number;
  label: string;
}

export interface RowConfiguration {
  stokBibit: RowRange;
  produksiHarian: RowRange;
  benihTersedia: RowRange;
  distribusiBenih: RowRange;
}

export interface AdminConfig {
  sheetUrl: string;
  pollingInterval: number;
  rowConfiguration: RowConfiguration;
}

export interface ValidationResult {
  valid: boolean;
  message: string;
  preview?: string;
}
