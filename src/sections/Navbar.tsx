import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sections = ['demo-voz', 'demo-whatsapp', 'demo-crm', 'contacto'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'demo-voz', label: 'Voz' },
    { id: 'demo-whatsapp', label: 'WhatsApp' },
    { id: 'demo-crm', label: 'CRM' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4",
        isScrolled 
          ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-3" 
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col group"
        >
          <div className="flex items-center gap-2">
            <span className="font-outfit font-bold text-xl tracking-tighter leading-none text-white">
              INTELIGENCIA <span className="text-rose-600">SEVILLA</span>
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium mt-1">
            Consultora Experta en <span className="text-white font-bold">IA</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-white",
                activeSection === item.id ? "text-white" : "text-zinc-400"
              )}
            >
              {item.label}
            </button>
          ))}
          <Button 
            className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-6" 
            size="sm"
            onClick={() => scrollToSection('contacto')}
          >
            Auditoría gratis
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black z-40 flex flex-col p-8 transition-all duration-500 lg:hidden",
          mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}
      >
        <div className="flex justify-between items-center mb-12">
            <div className="flex flex-col">
              <span className="font-outfit font-bold text-xl tracking-tighter text-white">
                INTELIGENCIA <span className="text-rose-600">SEVILLA</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-medium">
                Demos Interactivas
              </span>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-white/5 rounded-lg text-white"
            >
              <X size={24} />
            </button>
        </div>
        <div className="flex flex-col gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "text-3xl font-outfit font-semibold transition-colors text-left",
                activeSection === item.id ? "text-rose-500" : "text-white"
              )}
            >
              {item.label}
            </button>
          ))}
          <div className="mt-8">
            <Button 
              className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-full py-6 text-lg" 
              size="lg"
              onClick={() => scrollToSection('contacto')}
            >
              Solicitar Auditoría
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
