'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import MainMenu from '@/components/main-menu';

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button 
        className="p-2 text-primary hover:text-primary/90 transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed top-0 left-0 w-64 h-full bg-sidebar shadow-lg z-50">
            <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
              <span className="text-lg font-semibold text-sidebar-foreground">Menu</span>
              <button 
                className="p-2 text-primary hover:text-primary/90 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <MainMenu />
            </div>
          </div>
          {/* Clicar fora fecha o menu */}
          <div 
            className="w-full h-full"
            onClick={() => setMenuOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
}
