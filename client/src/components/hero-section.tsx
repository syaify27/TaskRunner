import { Button } from "@/components/ui/button";
import { ArrowDown, Leaf } from "lucide-react";
import heroImage from "@assets/generated_images/Indonesian_nursery_facility_landscape_583b4905.png";

export function HeroSection() {
  const scrollToDashboard = () => {
    const dashboardElement = document.getElementById('dashboard-section');
    if (dashboardElement) {
      dashboardElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
      <div className="absolute inset-0 bg-black/20">
        <img 
          src={heroImage} 
          alt="Fasilitas Pembibitan UPT" 
          className="w-full h-full object-cover"
          data-testid="img-hero-background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-800/60"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        <div className="flex items-center justify-center mb-6">
          <Leaf className="text-green-300 mr-4" size={48} />
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            UPT Pembibitan
          </h1>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-green-100">
          Unit Pelaksana Teknis Pembibitan dan Pembenihan
        </h2>
        
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-200 leading-relaxed">
          Menyediakan bibit berkualitas tinggi untuk pertanian berkelanjutan Indonesia. 
          Kami berkomitmen untuk mendukung ketahanan pangan nasional melalui inovasi 
          teknologi pembibitan modern dan ramah lingkungan.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            onClick={scrollToDashboard}
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
            data-testid="button-dashboard"
          >
            <ArrowDown className="mr-2" size={20} />
            Lihat Dashboard
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white hover:text-green-800 px-8 py-3 text-lg rounded-full shadow-lg transform transition-all duration-200 hover:scale-105"
            onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
            data-testid="button-services"
          >
            Layanan Kami
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform transition-all duration-200 hover:scale-105">
            <div className="text-3xl font-bold text-green-300 mb-2">1000+</div>
            <div className="text-green-100">Jenis Bibit</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform transition-all duration-200 hover:scale-105">
            <div className="text-3xl font-bold text-green-300 mb-2">50+</div>
            <div className="text-green-100">Tahun Pengalaman</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform transition-all duration-200 hover:scale-105">
            <div className="text-3xl font-bold text-green-300 mb-2">100K+</div>
            <div className="text-green-100">Petani Terlayani</div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-white/70" size={32} />
      </div>
    </section>
  );
}