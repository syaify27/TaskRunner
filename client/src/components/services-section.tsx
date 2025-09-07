import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Users, 
  BookOpen, 
  Utensils, 
  Car,
  Clock,
  MapPin,
  Star 
} from "lucide-react";
import agrotourismImage from "@assets/generated_images/Indonesian_agrotourism_activities_scene_ee760d16.png";

export function ServicesSection() {
  const services = [
    {
      icon: Camera,
      title: "Tur Kebun Edukasi",
      description: "Jelajahi kebun pembibitan dengan panduan ahli dan pelajari proses pertanian modern",
      price: "Rp 50.000/orang",
      duration: "2-3 jam",
      includes: ["Panduan ahli", "Dokumentasi", "Sertifikat"]
    },
    {
      icon: BookOpen,
      title: "Workshop Pertanian",
      description: "Pelatihan praktis tentang teknik pembibitan, perawatan tanaman, dan pertanian organik",
      price: "Rp 150.000/orang",
      duration: "4-6 jam",
      includes: ["Materi lengkap", "Praktek langsung", "Take home kit"]
    },
    {
      icon: Utensils,
      title: "Farm to Table",
      description: "Nikmati hidangan segar langsung dari kebun dengan konsep farm to table",
      price: "Rp 75.000/orang",
      duration: "2 jam",
      includes: ["Menu organik", "Minuman sehat", "Suasana alam"]
    },
    {
      icon: Users,
      title: "Paket Keluarga",
      description: "Aktivitas seru untuk seluruh keluarga dengan berbagai permainan edukatif",
      price: "Rp 300.000/keluarga",
      duration: "Seharian",
      includes: ["Semua aktivitas", "Makan siang", "Oleh-oleh"]
    }
  ];

  const features = [
    { icon: MapPin, text: "Lokasi strategis dan mudah diakses" },
    { icon: Car, text: "Area parkir luas dan aman" },
    { icon: Clock, text: "Buka setiap hari 08:00 - 17:00" },
    { icon: Star, text: "Rating 4.8/5 dari pengunjung" }
  ];

  return (
    <section id="services-section" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Layanan Agrowisata
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Rasakan pengalaman menarik belajar pertanian sambil menikmati keindahan alam 
            di fasilitas pembibitan modern kami.
          </p>
        </div>

        {/* Hero Image Section */}
        <div className="mb-16 relative">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src={agrotourismImage} 
              alt="Aktivitas Agrowisata" 
              className="w-full h-96 object-cover"
              data-testid="img-agrotourism-hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Pengalaman Pertanian yang Tak Terlupakan</h3>
              <p className="text-lg opacity-90">Belajar, bermain, dan menikmati alam bersama keluarga</p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md">
                <feature.icon className="text-green-600" size={24} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-fit">
                  <service.icon className="text-green-600" size={32} />
                </div>
                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {service.duration}
                  </Badge>
                  <Badge variant="outline" className="text-xs font-bold text-green-600">
                    {service.price}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="mb-4">
                  <h5 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">Termasuk:</h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  data-testid={`button-book-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  Pesan Sekarang
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Siap untuk Petualangan Pertanian?</h3>
          <p className="text-lg mb-6 opacity-90">
            Hubungi kami untuk informasi lebih lanjut dan reservasi grup khusus
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-green-800 hover:bg-gray-100"
              data-testid="button-contact-services"
            >
              Hubungi Kami
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-green-800"
              data-testid="button-see-packages"
            >
              Lihat Semua Paket
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}