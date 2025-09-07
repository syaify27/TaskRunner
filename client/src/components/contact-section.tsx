import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Send
} from "lucide-react";
import { useContactContent } from "../hooks/useWebsiteContent";

export function ContactSection() {
  const { contactContent } = useContactContent();
  
  // Default content while loading or if no content
  const defaultContent = {
    title: "Hubungi Kami",
    subtitle: "Kami siap membantu Anda dengan layanan terbaik. Jangan ragu untuk menghubungi tim profesional kami kapan saja.",
    address: "Jl. Pembibitan Raya No. 123\nKecamatan Pertanian, Kabupaten Subur\nJawa Tengah 50123, Indonesia",
    phone: "Kantor: (0271) 123-4567\nWhatsApp: +62 812-3456-7890\nFax: (0271) 123-4568",
    email: "info@uptpembibitan.go.id",
    workingHours: "Senin - Jumat: 08:00 - 16:00 WIB\nSabtu - Minggu: 08:00 - 17:00 WIB\nHari Libur: Tutup"
  };

  const content = contactContent || defaultContent;
  
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Informasi Kontak
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                    <MapPin className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Alamat</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {content.address.split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < content.address.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                    <Phone className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Telepon</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {content.phone.split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < content.phone.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                    <Mail className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {content.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                    <Clock className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Jam Operasional</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {content.workingHours.split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < content.workingHours.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Ikuti Kami
              </h3>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center space-x-2"
                  data-testid="button-facebook"
                >
                  <Facebook size={16} />
                  <span>Facebook</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center space-x-2"
                  data-testid="button-instagram"
                >
                  <Instagram size={16} />
                  <span>Instagram</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center space-x-2"
                  data-testid="button-youtube"
                >
                  <Youtube size={16} />
                  <span>YouTube</span>
                </Button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <MapPin size={48} className="mx-auto mb-2" />
                <p>Peta Lokasi</p>
                <p className="text-sm">Google Maps akan dimuat di sini</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Kirim Pesan</CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                Isi form di bawah ini dan kami akan segera menghubungi Anda kembali.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Nama Depan *</Label>
                  <Input 
                    id="firstName" 
                    placeholder="Masukkan nama depan"
                    data-testid="input-first-name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Nama Belakang</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Masukkan nama belakang"
                    data-testid="input-last-name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="nama@email.com"
                  data-testid="input-email"
                />
              </div>

              <div>
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+62 812-3456-7890"
                  data-testid="input-phone"
                />
              </div>

              <div>
                <Label htmlFor="subject">Subjek *</Label>
                <Input 
                  id="subject" 
                  placeholder="Pilih topik pesan Anda"
                  data-testid="input-subject"
                />
              </div>

              <div>
                <Label htmlFor="message">Pesan *</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tulis pesan Anda di sini..."
                  rows={5}
                  data-testid="textarea-message"
                />
              </div>

              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                data-testid="button-send-message"
              >
                <Send className="mr-2" size={16} />
                Kirim Pesan
              </Button>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Dengan mengirim pesan ini, Anda menyetujui kebijakan privasi kami.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}