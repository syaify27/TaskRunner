import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, Award, Sprout } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Tentang UPT Pembibitan
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Lembaga terdepan dalam pengembangan bibit dan benih berkualitas untuk mendukung 
            pertanian berkelanjutan dan ketahanan pangan Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Visi & Misi Kami
            </h3>
            
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-green-600 mb-3">Visi</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Menjadi pusat unggulan pembibitan dan pembenihan yang menghasilkan varietas 
                unggul untuk mendukung pertanian berkelanjutan dan ramah lingkungan di Indonesia.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-green-600 mb-3">Misi</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  Mengembangkan teknologi pembibitan modern dan inovatif
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  Menyediakan bibit berkualitas tinggi dan bersertifikat
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  Memberikan edukasi dan pelatihan kepada petani
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  Mendukung program ketahanan pangan nasional
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <Leaf className="text-green-600 mb-4 mx-auto" size={48} />
                <h4 className="font-bold text-lg mb-2">Varietas Unggul</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Lebih dari 1000 jenis bibit berkualitas tinggi
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <Users className="text-blue-600 mb-4 mx-auto" size={48} />
                <h4 className="font-bold text-lg mb-2">Tim Ahli</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Didukung oleh para ahli berpengalaman
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <Award className="text-yellow-600 mb-4 mx-auto" size={48} />
                <h4 className="font-bold text-lg mb-2">Bersertifikat</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Semua produk memiliki sertifikat resmi
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <Sprout className="text-green-500 mb-4 mx-auto" size={48} />
                <h4 className="font-bold text-lg mb-2">Ramah Lingkungan</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Teknologi pertanian berkelanjutan
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Komitmen Kami
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600 dark:text-gray-300">Tingkat Keberhasilan Tumbuh</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Monitoring Kualitas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-300">Jaminan Kualitas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}