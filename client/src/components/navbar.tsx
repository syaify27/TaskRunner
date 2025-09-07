import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Cog, Leaf } from "lucide-react";

interface NavbarProps {
  onToggleAdminPanel: () => void;
  isOnline: boolean;
}

export function Navbar({ onToggleAdminPanel, isOnline }: NavbarProps) {
  return (
    <nav className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 flex items-center">
              <Leaf className="text-primary text-2xl mr-3" size={28} />
              <div>
                <h1 className="text-lg font-bold text-foreground">UPT Pembibitan</h1>
                <p className="text-xs text-muted-foreground">Pembenihan Pertanian</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
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
            >
              <Cog size={16} />
              <span className="hidden sm:inline">Konfigurasi Admin</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
