import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Cog, Leaf, Menu, X } from "lucide-react";

interface NavbarProps {
  onToggleAdminPanel: () => void;
  isOnline: boolean;
}

export function Navbar({ onToggleAdminPanel, isOnline }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { label: 'Beranda', sectionId: 'hero-section' },
    { label: 'Tentang', sectionId: 'about-section' },
    { label: 'Dashboard', sectionId: 'dashboard-section' },
    { label: 'Agrowisata', sectionId: 'services-section' },
    { label: 'Kontak', sectionId: 'contact-section' }
  ];

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-border shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => scrollToSection('hero-section')}>
              <Leaf className="text-primary text-2xl mr-3" size={28} />
              <div>
                <h1 className="text-lg font-bold text-foreground">UPT Pembibitan</h1>
                <p className="text-xs text-muted-foreground">Pembenihan Pertanian</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                data-testid={`nav-${item.sectionId}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm">
              <span 
                className={`status-indicator ${isOnline ? 'status-online' : 'status-offline'}`}
                data-testid="connection-indicator"
              />
              <span data-testid="connection-status">
                {isOnline ? 'Terhubung' : 'Terputus'}
              </span>
            </div>
            
            <Button 
              onClick={onToggleAdminPanel}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center space-x-2"
              data-testid="button-admin-config"
              size="sm"
            >
              <Cog size={16} />
              <span className="hidden lg:inline">Admin</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              className="md:hidden"
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  data-testid={`mobile-nav-${item.sectionId}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="px-3 py-2 text-sm border-t border-border mt-2 pt-4">
                <div className="flex items-center space-x-2">
                  <span 
                    className={`status-indicator ${isOnline ? 'status-online' : 'status-offline'}`}
                  />
                  <span className="text-muted-foreground">
                    {isOnline ? 'Terhubung' : 'Terputus'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
