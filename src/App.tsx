import { useEffect, useState } from 'react';
import './App.css';
import { Navbar } from './sections/Navbar';
import Header from './sections/Header';
import DemoVoz from './sections/DemoVoz';
import DemoWhatsApp from './sections/DemoWhatsApp';
import DemoCRM from './sections/DemoCRM';
import Contacto from './sections/Contacto';
import Footer from './sections/Footer';

function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Main Content */}
      <main>

        <Header />
        <DemoVoz />
        <DemoWhatsApp />
        <DemoCRM />
        <Contacto />
        <Footer />
      </main>

      {/* Floating CTA (Mobile) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 sm:hidden">
        <button
          onClick={() => scrollToSection('contacto')}
          className="px-6 py-3 bg-rose-600 text-white rounded-full text-sm font-medium shadow-glow-rose hover:bg-rose-700 transition-colors"
        >
          Solicitar auditoría
        </button>
      </div>
    </div>
  );
}

export default App;
