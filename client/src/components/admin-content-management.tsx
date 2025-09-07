import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Save, Plus, Trash2, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { HeroContent, AboutContent, ServicesContent, ContactContent } from "@shared/schema";

interface ContentManagementProps {
  isAuthenticated: boolean;
}

export function AdminContentManagement({ isAuthenticated }: ContentManagementProps) {
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: "",
    subtitle: "",
    description: "",
    heroImage: "",
    stats: { varieties: "1000+", experience: "50+", farmers: "100K+" }
  });
  
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    title: "",
    subtitle: "",
    vision: "",
    mission: [],
    commitments: { success: "95%", monitoring: "24/7", guarantee: "100%" }
  });
  
  const [servicesContent, setServicesContent] = useState<ServicesContent>({
    title: "",
    subtitle: "",
    heroImage: "",
    services: []
  });
  
  const [contactContent, setContactContent] = useState<ContactContent>({
    title: "",
    subtitle: "",
    address: "",
    phone: "",
    email: "",
    workingHours: ""
  });

  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      loadContent();
    }
  }, [isAuthenticated]);

  const loadContent = async () => {
    try {
      const response = await fetch("/api/admin/content", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.hero) setHeroContent(data.hero);
        if (data.about) setAboutContent(data.about);
        if (data.services) setServicesContent(data.services);
        if (data.contact) setContactContent(data.contact);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat konten website",
        variant: "destructive"
      });
    }
  };

  const saveHeroContent = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/content/hero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(heroContent)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save hero content');
      }
      
      toast({
        title: "Berhasil",
        description: "Konten Hero berhasil disimpan"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan konten Hero",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const saveAboutContent = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/content/about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(aboutContent)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save about content');
      }
      
      toast({
        title: "Berhasil",
        description: "Konten About berhasil disimpan"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan konten About",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const saveServicesContent = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/content/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(servicesContent)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save services content');
      }
      
      toast({
        title: "Berhasil",
        description: "Konten Services berhasil disimpan"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan konten Services",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const saveContactContent = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/content/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contactContent)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save contact content');
      }
      
      toast({
        title: "Berhasil",
        description: "Konten Contact berhasil disimpan"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan konten Contact",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addMission = () => {
    setAboutContent({
      ...aboutContent,
      mission: [...aboutContent.mission, ""]
    });
  };

  const updateMission = (index: number, value: string) => {
    const newMissions = [...aboutContent.mission];
    newMissions[index] = value;
    setAboutContent({
      ...aboutContent,
      mission: newMissions
    });
  };

  const removeMission = (index: number) => {
    const newMissions = aboutContent.mission.filter((_, i) => i !== index);
    setAboutContent({
      ...aboutContent,
      mission: newMissions
    });
  };

  const addService = () => {
    setServicesContent({
      ...servicesContent,
      services: [...servicesContent.services, {
        title: "",
        description: "",
        price: "",
        duration: "",
        includes: []
      }]
    });
  };

  const updateService = (index: number, field: string, value: any) => {
    const newServices = [...servicesContent.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setServicesContent({
      ...servicesContent,
      services: newServices
    });
  };

  const removeService = (index: number) => {
    const newServices = servicesContent.services.filter((_, i) => i !== index);
    setServicesContent({
      ...servicesContent,
      services: newServices
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="about">About Section</TabsTrigger>
          <TabsTrigger value="services">Services Section</TabsTrigger>
          <TabsTrigger value="contact">Contact Section</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hero" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image size={20} />
                Edit Hero Section
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hero-title">Judul Utama</Label>
                <Input
                  id="hero-title"
                  value={heroContent.title}
                  onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                  placeholder="UPT Pembibitan"
                  data-testid="input-hero-title"
                />
              </div>
              
              <div>
                <Label htmlFor="hero-subtitle">Subjudul</Label>
                <Input
                  id="hero-subtitle"
                  value={heroContent.subtitle}
                  onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                  placeholder="Unit Pelaksana Teknis Pembibitan dan Pembenihan"
                  data-testid="input-hero-subtitle"
                />
              </div>
              
              <div>
                <Label htmlFor="hero-description">Deskripsi</Label>
                <Textarea
                  id="hero-description"
                  value={heroContent.description}
                  onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
                  placeholder="Deskripsi singkat tentang UPT Pembibitan..."
                  rows={4}
                  data-testid="textarea-hero-description"
                />
              </div>
              
              <div>
                <Label htmlFor="hero-image">URL Gambar Hero</Label>
                <Input
                  id="hero-image"
                  value={heroContent.heroImage || ""}
                  onChange={(e) => setHeroContent({ ...heroContent, heroImage: e.target.value })}
                  placeholder="https://example.com/hero-image.jpg"
                  data-testid="input-hero-image"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="stat-varieties">Jumlah Varietas</Label>
                  <Input
                    id="stat-varieties"
                    value={heroContent.stats?.varieties || ""}
                    onChange={(e) => setHeroContent({
                      ...heroContent,
                      stats: { 
                        varieties: e.target.value,
                        experience: heroContent.stats?.experience || "",
                        farmers: heroContent.stats?.farmers || ""
                      }
                    })}
                    placeholder="1000+"
                    data-testid="input-stat-varieties"
                  />
                </div>
                <div>
                  <Label htmlFor="stat-experience">Pengalaman</Label>
                  <Input
                    id="stat-experience"
                    value={heroContent.stats?.experience || ""}
                    onChange={(e) => setHeroContent({
                      ...heroContent,
                      stats: { 
                        varieties: heroContent.stats?.varieties || "",
                        experience: e.target.value,
                        farmers: heroContent.stats?.farmers || ""
                      }
                    })}
                    placeholder="50+"
                    data-testid="input-stat-experience"
                  />
                </div>
                <div>
                  <Label htmlFor="stat-farmers">Petani Terlayani</Label>
                  <Input
                    id="stat-farmers"
                    value={heroContent.stats?.farmers || ""}
                    onChange={(e) => setHeroContent({
                      ...heroContent,
                      stats: { 
                        varieties: heroContent.stats?.varieties || "",
                        experience: heroContent.stats?.experience || "",
                        farmers: e.target.value
                      }
                    })}
                    placeholder="100K+"
                    data-testid="input-stat-farmers"
                  />
                </div>
              </div>
              
              <Button 
                onClick={saveHeroContent}
                disabled={isSaving}
                className="w-full"
                data-testid="button-save-hero"
              >
                <Save size={16} className="mr-2" />
                {isSaving ? "Menyimpan..." : "Simpan Hero Content"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="about" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Edit About Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="about-title">Judul</Label>
                <Input
                  id="about-title"
                  value={aboutContent.title}
                  onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                  placeholder="Tentang UPT Pembibitan"
                  data-testid="input-about-title"
                />
              </div>
              
              <div>
                <Label htmlFor="about-subtitle">Subjudul</Label>
                <Input
                  id="about-subtitle"
                  value={aboutContent.subtitle}
                  onChange={(e) => setAboutContent({ ...aboutContent, subtitle: e.target.value })}
                  placeholder="Lembaga terdepan dalam pengembangan bibit..."
                  data-testid="input-about-subtitle"
                />
              </div>
              
              <div>
                <Label htmlFor="about-vision">Visi</Label>
                <Textarea
                  id="about-vision"
                  value={aboutContent.vision}
                  onChange={(e) => setAboutContent({ ...aboutContent, vision: e.target.value })}
                  placeholder="Visi organisasi..."
                  rows={3}
                  data-testid="textarea-about-vision"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Misi</Label>
                  <Button 
                    onClick={addMission}
                    size="sm"
                    variant="outline"
                    data-testid="button-add-mission"
                  >
                    <Plus size={16} className="mr-1" />
                    Tambah Misi
                  </Button>
                </div>
                
                {aboutContent.mission.map((mission, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Input
                      value={mission}
                      onChange={(e) => updateMission(index, e.target.value)}
                      placeholder={`Misi ${index + 1}`}
                      data-testid={`input-mission-${index}`}
                    />
                    <Button
                      onClick={() => removeMission(index)}
                      size="sm"
                      variant="destructive"
                      data-testid={`button-remove-mission-${index}`}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="commitment-success">Tingkat Keberhasilan</Label>
                  <Input
                    id="commitment-success"
                    value={aboutContent.commitments?.success || ""}
                    onChange={(e) => setAboutContent({
                      ...aboutContent,
                      commitments: { 
                        success: e.target.value,
                        monitoring: aboutContent.commitments?.monitoring || "",
                        guarantee: aboutContent.commitments?.guarantee || ""
                      }
                    })}
                    placeholder="95%"
                    data-testid="input-commitment-success"
                  />
                </div>
                <div>
                  <Label htmlFor="commitment-monitoring">Monitoring</Label>
                  <Input
                    id="commitment-monitoring"
                    value={aboutContent.commitments?.monitoring || ""}
                    onChange={(e) => setAboutContent({
                      ...aboutContent,
                      commitments: { 
                        success: aboutContent.commitments?.success || "",
                        monitoring: e.target.value,
                        guarantee: aboutContent.commitments?.guarantee || ""
                      }
                    })}
                    placeholder="24/7"
                    data-testid="input-commitment-monitoring"
                  />
                </div>
                <div>
                  <Label htmlFor="commitment-guarantee">Jaminan Kualitas</Label>
                  <Input
                    id="commitment-guarantee"
                    value={aboutContent.commitments?.guarantee || ""}
                    onChange={(e) => setAboutContent({
                      ...aboutContent,
                      commitments: { 
                        success: aboutContent.commitments?.success || "",
                        monitoring: aboutContent.commitments?.monitoring || "",
                        guarantee: e.target.value
                      }
                    })}
                    placeholder="100%"
                    data-testid="input-commitment-guarantee"
                  />
                </div>
              </div>
              
              <Button 
                onClick={saveAboutContent}
                disabled={isSaving}
                className="w-full"
                data-testid="button-save-about"
              >
                <Save size={16} className="mr-2" />
                {isSaving ? "Menyimpan..." : "Simpan About Content"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Edit Services Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="services-title">Judul</Label>
                <Input
                  id="services-title"
                  value={servicesContent.title}
                  onChange={(e) => setServicesContent({ ...servicesContent, title: e.target.value })}
                  placeholder="Layanan Agrowisata"
                  data-testid="input-services-title"
                />
              </div>
              
              <div>
                <Label htmlFor="services-subtitle">Subjudul</Label>
                <Input
                  id="services-subtitle"
                  value={servicesContent.subtitle}
                  onChange={(e) => setServicesContent({ ...servicesContent, subtitle: e.target.value })}
                  placeholder="Rasakan pengalaman menarik..."
                  data-testid="input-services-subtitle"
                />
              </div>
              
              <div>
                <Label htmlFor="services-image">URL Gambar Hero</Label>
                <Input
                  id="services-image"
                  value={servicesContent.heroImage || ""}
                  onChange={(e) => setServicesContent({ ...servicesContent, heroImage: e.target.value })}
                  placeholder="https://example.com/services-image.jpg"
                  data-testid="input-services-image"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-lg font-semibold">Layanan</Label>
                  <Button 
                    onClick={addService}
                    size="sm"
                    variant="outline"
                    data-testid="button-add-service"
                  >
                    <Plus size={16} className="mr-1" />
                    Tambah Layanan
                  </Button>
                </div>
                
                {servicesContent.services.map((service, index) => (
                  <Card key={index} className="mb-4">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">Layanan {index + 1}</CardTitle>
                        <Button
                          onClick={() => removeService(index)}
                          size="sm"
                          variant="destructive"
                          data-testid={`button-remove-service-${index}`}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Input
                        value={service.title}
                        onChange={(e) => updateService(index, 'title', e.target.value)}
                        placeholder="Nama layanan"
                        data-testid={`input-service-title-${index}`}
                      />
                      <Textarea
                        value={service.description}
                        onChange={(e) => updateService(index, 'description', e.target.value)}
                        placeholder="Deskripsi layanan"
                        rows={3}
                        data-testid={`textarea-service-description-${index}`}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={service.price}
                          onChange={(e) => updateService(index, 'price', e.target.value)}
                          placeholder="Harga"
                          data-testid={`input-service-price-${index}`}
                        />
                        <Input
                          value={service.duration}
                          onChange={(e) => updateService(index, 'duration', e.target.value)}
                          placeholder="Durasi"
                          data-testid={`input-service-duration-${index}`}
                        />
                      </div>
                      <Textarea
                        value={service.includes.join(', ')}
                        onChange={(e) => updateService(index, 'includes', e.target.value.split(', ').filter(Boolean))}
                        placeholder="Yang termasuk (pisahkan dengan koma)"
                        rows={2}
                        data-testid={`textarea-service-includes-${index}`}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button 
                onClick={saveServicesContent}
                disabled={isSaving}
                className="w-full"
                data-testid="button-save-services"
              >
                <Save size={16} className="mr-2" />
                {isSaving ? "Menyimpan..." : "Simpan Services Content"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Edit Contact Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contact-title">Judul</Label>
                <Input
                  id="contact-title"
                  value={contactContent.title}
                  onChange={(e) => setContactContent({ ...contactContent, title: e.target.value })}
                  placeholder="Hubungi Kami"
                  data-testid="input-contact-title"
                />
              </div>
              
              <div>
                <Label htmlFor="contact-subtitle">Subjudul</Label>
                <Input
                  id="contact-subtitle"
                  value={contactContent.subtitle}
                  onChange={(e) => setContactContent({ ...contactContent, subtitle: e.target.value })}
                  placeholder="Kami siap membantu Anda..."
                  data-testid="input-contact-subtitle"
                />
              </div>
              
              <div>
                <Label htmlFor="contact-address">Alamat</Label>
                <Textarea
                  id="contact-address"
                  value={contactContent.address}
                  onChange={(e) => setContactContent({ ...contactContent, address: e.target.value })}
                  placeholder="Alamat lengkap..."
                  rows={3}
                  data-testid="textarea-contact-address"
                />
              </div>
              
              <div>
                <Label htmlFor="contact-phone">Telepon</Label>
                <Textarea
                  id="contact-phone"
                  value={contactContent.phone}
                  onChange={(e) => setContactContent({ ...contactContent, phone: e.target.value })}
                  placeholder="Nomor telepon..."
                  rows={2}
                  data-testid="textarea-contact-phone"
                />
              </div>
              
              <div>
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  value={contactContent.email}
                  onChange={(e) => setContactContent({ ...contactContent, email: e.target.value })}
                  placeholder="email@domain.com"
                  data-testid="input-contact-email"
                />
              </div>
              
              <div>
                <Label htmlFor="contact-hours">Jam Operasional</Label>
                <Textarea
                  id="contact-hours"
                  value={contactContent.workingHours}
                  onChange={(e) => setContactContent({ ...contactContent, workingHours: e.target.value })}
                  placeholder="Jam operasional..."
                  rows={3}
                  data-testid="textarea-contact-hours"
                />
              </div>
              
              <Button 
                onClick={saveContactContent}
                disabled={isSaving}
                className="w-full"
                data-testid="button-save-contact"
              >
                <Save size={16} className="mr-2" />
                {isSaving ? "Menyimpan..." : "Simpan Contact Content"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}