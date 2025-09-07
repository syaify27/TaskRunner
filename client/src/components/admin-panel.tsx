import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Save, CheckCircle } from "lucide-react";
import { api } from "../lib/api";
import { useToast } from "@/hooks/use-toast";
import type { AdminConfig, ValidationResult, RowConfiguration } from "../types/dashboard";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [config, setConfig] = useState<AdminConfig>({ 
    sheetUrl: "", 
    pollingInterval: 30,
    rowConfiguration: {
      stokBibit: { startRow: 2, endRow: 5, label: "Stok Bibit" },
      produksiHarian: { startRow: 6, endRow: 9, label: "Produksi Harian" },
      benihTersedia: { startRow: 10, endRow: 13, label: "Benih Tersedia" },
      distribusiBenih: { startRow: 14, endRow: 17, label: "Distribusi Benih" }
    }
  });
  const [urlStatus, setUrlStatus] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadConfig();
    }
  }, [isOpen, isAuthenticated]);

  const loadConfig = async () => {
    try {
      const currentConfig = await api.config.get();
      setConfig(currentConfig);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat konfigurasi",
        variant: "destructive"
      });
    }
  };

  const handleLogin = async () => {
    try {
      const result = await api.auth.login(password);
      if (result.success) {
        setIsAuthenticated(true);
        toast({
          title: "Berhasil",
          description: "Login admin berhasil"
        });
      } else {
        toast({
          title: "Error",
          description: "Password salah",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal melakukan login",
        variant: "destructive"
      });
    }
  };

  const handleValidateUrl = async () => {
    if (!config.sheetUrl.trim()) {
      toast({
        title: "Error",
        description: "URL tidak boleh kosong",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);
    try {
      const result = await api.config.validateUrl(config.sheetUrl);
      setUrlStatus(result);
      if (result.valid) {
        toast({
          title: "Berhasil",
          description: "URL valid dan dapat diakses"
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      setUrlStatus({ valid: false, message: "Gagal validasi URL" });
      toast({
        title: "Error",
        description: "Gagal validasi URL",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSaveConfig = async () => {
    setIsSaving(true);
    try {
      await api.config.update({
        sheetUrl: config.sheetUrl,
        pollingInterval: config.pollingInterval,
        rowConfiguration: config.rowConfiguration
      });
      toast({
        title: "Berhasil",
        description: "Konfigurasi berhasil disimpan"
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan konfigurasi",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        data-testid="admin-overlay"
      />
      
      {/* Admin Panel */}
      <div className={`admin-panel fixed top-0 right-0 w-96 h-full bg-card shadow-2xl z-50 border-l border-border ${isOpen ? 'open' : ''}`}
           data-testid="admin-panel">
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-foreground">Konfigurasi Admin</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              data-testid="button-close-admin"
            >
              <X size={20} />
            </Button>
          </div>

          {!isAuthenticated ? (
            /* Authentication Form */
            <Card>
              <CardHeader>
                <CardTitle>Autentikasi Admin</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="password">Password Admin</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan password admin"
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                      data-testid="input-admin-password"
                    />
                    <Button 
                      onClick={handleLogin}
                      data-testid="button-admin-login"
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Configuration Form */
            <div className="flex-1 flex flex-col space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>URL Google Sheets CSV</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Textarea
                      value={config.sheetUrl}
                      onChange={(e) => setConfig({ ...config, sheetUrl: e.target.value })}
                      placeholder="https://docs.google.com/spreadsheets/d/[SHEET_ID]/export?format=csv"
                      rows={3}
                      className="text-sm"
                      data-testid="textarea-sheet-url"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Pastikan spreadsheet dapat diakses publik
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Status Koneksi</Label>
                    <Badge 
                      variant={urlStatus?.valid ? "default" : urlStatus === null ? "secondary" : "destructive"}
                      data-testid="badge-url-status"
                    >
                      {urlStatus === null ? "Belum divalidasi" : 
                       urlStatus.valid ? "URL Valid" : "URL Tidak Valid"}
                    </Badge>
                  </div>

                  <Button 
                    onClick={handleValidateUrl}
                    disabled={isValidating}
                    variant="secondary"
                    className="w-full"
                    data-testid="button-validate-url"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    {isValidating ? "Memvalidasi..." : "Validasi URL"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pengaturan Polling</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="polling-interval">Interval Update (detik)</Label>
                    <Input
                      id="polling-interval"
                      type="number"
                      value={config.pollingInterval}
                      onChange={(e) => setConfig({ ...config, pollingInterval: parseInt(e.target.value) || 30 })}
                      min={10}
                      max={300}
                      className="mt-2"
                      data-testid="input-polling-interval"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Konfigurasi Baris Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-sm text-muted-foreground mb-4">
                    Tentukan baris mana di spreadsheet yang berisi data untuk setiap kategori. Nomor baris mengacu pada baris spreadsheet (mulai dari 1).
                  </div>
                  
                  {/* Stok Bibit Configuration */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-primary">Stok Bibit</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="stok-start" className="text-xs">Baris Mulai</Label>
                        <Input
                          id="stok-start"
                          type="number"
                          value={config.rowConfiguration.stokBibit.startRow}
                          onChange={(e) => setConfig({
                            ...config,
                            rowConfiguration: {
                              ...config.rowConfiguration,
                              stokBibit: { ...config.rowConfiguration.stokBibit, startRow: parseInt(e.target.value) || 1 }
                            }
                          })}
                          min={1}
                          max={1000}
                          className="mt-1"
                          data-testid="input-stok-start-row"
                        />
                      </div>
                      <div>
                        <Label htmlFor="stok-end" className="text-xs">Baris Selesai</Label>
                        <Input
                          id="stok-end"
                          type="number"
                          value={config.rowConfiguration.stokBibit.endRow}
                          onChange={(e) => setConfig({
                            ...config,
                            rowConfiguration: {
                              ...config.rowConfiguration,
                              stokBibit: { ...config.rowConfiguration.stokBibit, endRow: parseInt(e.target.value) || 1 }
                            }
                          })}
                          min={1}
                          max={1000}
                          className="mt-1"
                          data-testid="input-stok-end-row"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Produksi Harian Configuration */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-primary">Produksi Harian</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="produksi-start" className="text-xs">Baris Mulai</Label>
                        <Input
                          id="produksi-start"
                          type="number"
                          value={config.rowConfiguration.produksiHarian.startRow}
                          onChange={(e) => setConfig({
                            ...config,
                            rowConfiguration: {
                              ...config.rowConfiguration,
                              produksiHarian: { ...config.rowConfiguration.produksiHarian, startRow: parseInt(e.target.value) || 1 }
                            }
                          })}
                          min={1}
                          max={1000}
                          className="mt-1"
                          data-testid="input-produksi-start-row"
                        />
                      </div>
                      <div>
                        <Label htmlFor="produksi-end" className="text-xs">Baris Selesai</Label>
                        <Input
                          id="produksi-end"
                          type="number"
                          value={config.rowConfiguration.produksiHarian.endRow}
                          onChange={(e) => setConfig({
                            ...config,
                            rowConfiguration: {
                              ...config.rowConfiguration,
                              produksiHarian: { ...config.rowConfiguration.produksiHarian, endRow: parseInt(e.target.value) || 1 }
                            }
                          })}
                          min={1}
                          max={1000}
                          className="mt-1"
                          data-testid="input-produksi-end-row"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Benih Tersedia Configuration */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-primary">Benih Tersedia</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="benih-start" className="text-xs">Baris Mulai</Label>
                        <Input
                          id="benih-start"
                          type="number"
                          value={config.rowConfiguration.benihTersedia.startRow}
                          onChange={(e) => setConfig({
                            ...config,
                            rowConfiguration: {
                              ...config.rowConfiguration,
                              benihTersedia: { ...config.rowConfiguration.benihTersedia, startRow: parseInt(e.target.value) || 1 }
                            }
                          })}
                          min={1}
                          max={1000}
                          className="mt-1"
                          data-testid="input-benih-start-row"
                        />
                      </div>
                      <div>
                        <Label htmlFor="benih-end" className="text-xs">Baris Selesai</Label>
                        <Input
                          id="benih-end"
                          type="number"
                          value={config.rowConfiguration.benihTersedia.endRow}
                          onChange={(e) => setConfig({
                            ...config,
                            rowConfiguration: {
                              ...config.rowConfiguration,
                              benihTersedia: { ...config.rowConfiguration.benihTersedia, endRow: parseInt(e.target.value) || 1 }
                            }
                          })}
                          min={1}
                          max={1000}
                          className="mt-1"
                          data-testid="input-benih-end-row"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Distribusi Benih Configuration */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-primary">Distribusi Benih</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="distribusi-start" className="text-xs">Baris Mulai</Label>
                        <Input
                          id="distribusi-start"
                          type="number"
                          value={config.rowConfiguration.distribusiBenih.startRow}
                          onChange={(e) => setConfig({
                            ...config,
                            rowConfiguration: {
                              ...config.rowConfiguration,
                              distribusiBenih: { ...config.rowConfiguration.distribusiBenih, startRow: parseInt(e.target.value) || 1 }
                            }
                          })}
                          min={1}
                          max={1000}
                          className="mt-1"
                          data-testid="input-distribusi-start-row"
                        />
                      </div>
                      <div>
                        <Label htmlFor="distribusi-end" className="text-xs">Baris Selesai</Label>
                        <Input
                          id="distribusi-end"
                          type="number"
                          value={config.rowConfiguration.distribusiBenih.endRow}
                          onChange={(e) => setConfig({
                            ...config,
                            rowConfiguration: {
                              ...config.rowConfiguration,
                              distribusiBenih: { ...config.rowConfiguration.distribusiBenih, endRow: parseInt(e.target.value) || 1 }
                            }
                          })}
                          min={1}
                          max={1000}
                          className="mt-1"
                          data-testid="input-distribusi-end-row"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {urlStatus?.preview && (
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle>Preview Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="text-xs text-muted-foreground bg-muted p-3 rounded-lg max-h-48 overflow-y-auto font-mono"
                      data-testid="text-data-preview"
                    >
                      <pre className="whitespace-pre-wrap">{urlStatus.preview}</pre>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button 
                onClick={handleSaveConfig}
                disabled={isSaving || !urlStatus?.valid}
                className="w-full"
                data-testid="button-save-config"
              >
                <Save size={16} className="mr-2" />
                {isSaving ? "Menyimpan..." : "Simpan Konfigurasi"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
