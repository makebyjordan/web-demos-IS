import { Sparkles, Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#050505] border-t border-zinc-800">
      {/* Ambient Glow */}
      <div className="ambient-glow bottom-0 left-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-outfit font-bold text-white">
                Demos<span className="text-rose-500">IA</span>Sevilla
              </span>
            </div>
            <p className="text-zinc-400 max-w-md mb-6">
              Demostraciones interactivas de inteligencia artificial aplicada a negocios reales. 
              Toca, prueba y experimenta la IA antes de comprometerte.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-rose-600 transition-colors group">
                <Linkedin className="w-5 h-5 text-zinc-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-rose-600 transition-colors group">
                <Twitter className="w-5 h-5 text-zinc-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-rose-600 transition-colors group">
                <Instagram className="w-5 h-5 text-zinc-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-outfit font-bold mb-4">Demos</h4>
            <ul className="space-y-3">
              {[
                { label: 'Asistente de Voz', href: '#demo-voz' },
                { label: 'Bot WhatsApp', href: '#demo-whatsapp' },
                { label: 'CRM Documental', href: '#demo-crm' },
              ].map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-zinc-400 hover:text-rose-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-outfit font-bold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-zinc-400">
                <Mail className="w-4 h-4 text-rose-500" />
                <span>hola@demosiasevilla.com</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-400">
                <Phone className="w-4 h-4 text-rose-500" />
                <span>+34 954 00 00 00</span>
              </li>
              <li className="flex items-start gap-2 text-zinc-400">
                <MapPin className="w-4 h-4 text-rose-500 mt-0.5" />
                <span>Sevilla, Andalucía<br />España</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            © {currentYear} DemosInteligenciaSevilla. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">
              Política de privacidad
            </a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">
              Términos de uso
            </a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
