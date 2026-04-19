import { useState } from 'react';
import { Send, Building2, User, Mail, Phone, Briefcase, Users, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface FormData {
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  sector: string;
  companySize: string;
  demoInterest: string;
  need: string;
  message: string;
}

const sectores = [
  'Tecnología',
  'Inmobiliario',
  'Retail / E-commerce',
  'Salud',
  'Educación',
  'Industria',
  'Servicios',
  'Consultoría',
  'Otro'
];

const companySizes = [
  'Autónomo',
  '2-10 empleados',
  '11-50 empleados',
  '51-200 empleados',
  '200+ empleados'
];

const demoOptions = [
  { value: 'voz', label: 'Asistente de Voz', icon: '🔊' },
  { value: 'whatsapp', label: 'Bot WhatsApp "Laura"', icon: '💬' },
  { value: 'crm', label: 'CRM Documental', icon: '📊' },
  { value: 'todos', label: 'Todos me interesan', icon: '✨' }
];

export default function Contacto() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    sector: '',
    companySize: '',
    demoInterest: '',
    need: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({
      companyName: '',
      contactName: '',
      phone: '',
      email: '',
      sector: '',
      companySize: '',
      demoInterest: '',
      need: '',
      message: ''
    });
  };

  return (
    <section id="contacto" className="relative min-h-screen w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      {/* Ambient Glow */}
      <div className="ambient-glow top-1/4 -left-60" />
      <div className="ambient-glow bottom-1/4 -right-60" />
      
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">Contacto</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-black text-white mb-6">
            Solicita tu <span className="text-rose-500">Auditoría IA</span>
          </h2>
          <p className="text-lg sm:text-xl text-zinc-400 font-inter font-light max-w-2xl mx-auto">
            Cuéntanos sobre tu negocio y te contactaremos en menos de 24 horas 
            para agendar tu auditoría gratuita de 3 horas.
          </p>
        </div>

        {/* Form */}
        <div className="card-premium p-8 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-outfit font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-rose-500" />
                Información de la empresa
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">
                    Nombre de la empresa <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => handleChange('companyName', e.target.value)}
                      placeholder="Tu empresa S.L."
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-12 pr-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 text-sm mb-2">
                    Sector <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <select
                      required
                      value={formData.sector}
                      onChange={(e) => handleChange('sector', e.target.value)}
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-rose-500/50 transition-colors appearance-none"
                    >
                      <option value="">Selecciona un sector</option>
                      {sectores.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 text-sm mb-2">
                    Tamaño de la empresa <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <select
                      required
                      value={formData.companySize}
                      onChange={(e) => handleChange('companySize', e.target.value)}
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-rose-500/50 transition-colors appearance-none"
                    >
                      <option value="">Selecciona tamaño</option>
                      {companySizes.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 text-sm mb-2">
                    ¿Qué demo te interesó más? <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <select
                      required
                      value={formData.demoInterest}
                      onChange={(e) => handleChange('demoInterest', e.target.value)}
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-rose-500/50 transition-colors appearance-none"
                    >
                      <option value="">Selecciona una demo</option>
                      {demoOptions.map(d => (
                        <option key={d.value} value={d.value}>{d.icon} {d.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-divider" />

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-outfit font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-rose-500" />
                Datos de contacto
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">
                    Nombre de contacto <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => handleChange('contactName', e.target.value)}
                      placeholder="Juan Pérez"
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-12 pr-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 text-sm mb-2">
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="juan@empresa.com"
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-12 pr-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-400 text-sm mb-2">
                    Teléfono <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+34 600 000 000"
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-12 pr-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/50 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="section-divider" />

            {/* Needs */}
            <div className="space-y-6">
              <h3 className="text-xl font-outfit font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-rose-500" />
                Tu necesidad
              </h3>
              
              <div>
                <label className="block text-zinc-400 text-sm mb-2">
                  ¿Qué problema quieres resolver con IA? <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.need}
                  onChange={(e) => handleChange('need', e.target.value)}
                  placeholder="Ej: Automatizar la cualificación de leads, gestionar documentación..."
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-sm mb-2">
                  Mensaje adicional (opcional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Cuéntanos más sobre tu proyecto, objetivos o cualquier información relevante..."
                  rows={4}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/50 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Solicitar auditoría gratuita
                </>
              )}
            </button>

            <p className="text-center text-zinc-500 text-sm">
              Te contactaremos en menos de 24 horas. Sin compromiso.
            </p>
          </form>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
          <DialogHeader className="text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <DialogTitle className="text-2xl font-outfit font-bold">
              ¡Solicitud enviada!
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Hemos recibido tu solicitud de auditoría. Nuestro equipo te contactará 
              en menos de 24 horas para agendar una reunión.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 p-4 bg-zinc-800/50 rounded-xl">
            <p className="text-sm text-zinc-400 text-center">
              Mientras tanto, sigue explorando nuestras demos interactivas.
            </p>
          </div>
          <button
            onClick={() => setShowSuccess(false)}
            className="w-full btn-primary mt-4"
          >
            Entendido
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
