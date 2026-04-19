import { useState, useEffect, useCallback } from 'react';
import { 
  Users, Plus, FileText, BarChart3, FolderOpen, 
  Search, MoreVertical, Clock, Trash2, RefreshCw,
  CheckCircle, AlertTriangle, ChevronRight, Filter,
  Download, Upload, Mail, Phone, Building
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'nuevo' | 'contactado' | 'calificado' | 'oportunidad' | 'cerrado';
  lastContact: Date;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: Date;
  contactId?: string;
}

const initialContacts: Contact[] = [
  { id: '1', name: 'María García', email: 'maria@empresa.com', phone: '+34 612 345 678', company: 'InmoSevilla', status: 'oportunidad', lastContact: new Date() },
  { id: '2', name: 'Carlos López', email: 'carlos@ejemplo.com', phone: '+34 623 456 789', company: 'TechStart', status: 'contactado', lastContact: new Date(Date.now() - 86400000) },
  { id: '3', name: 'Ana Martínez', email: 'ana@negocio.es', phone: '+34 634 567 890', company: 'Consultora AM', status: 'nuevo', lastContact: new Date(Date.now() - 172800000) },
];

const initialDocuments: Document[] = [
  { id: '1', name: 'Contrato_Template.pdf', type: 'PDF', size: '245 KB', uploadedAt: new Date() },
  { id: '2', name: 'Presentacion_IA.pptx', type: 'PPTX', size: '1.2 MB', uploadedAt: new Date(Date.now() - 86400000) },
];

const statusColors: Record<string, string> = {
  nuevo: 'bg-zinc-600',
  contactado: 'bg-blue-600',
  calificado: 'bg-amber-600',
  oportunidad: 'bg-rose-600',
  cerrado: 'bg-green-600',
};

const statusLabels: Record<string, string> = {
  nuevo: 'Nuevo',
  contactado: 'Contactado',
  calificado: 'Calificado',
  oportunidad: 'Oportunidad',
  cerrado: 'Cerrado',
};

export default function DemoCRM() {
  const [activeTab, setActiveTab] = useState<'contactos' | 'nuevo' | 'pipeline' | 'documentos' | 'informes'>('contactos');
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos
  const [showResetWarning, setShowResetWarning] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '', company: '' });
  const [searchQuery, setSearchQuery] = useState('');

  // Timer para borrado automático
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 60 && prev > 0) {
          setShowResetWarning(true);
        }
        if (prev <= 0) {
          // Resetear datos
          setContacts(initialContacts);
          setDocuments(initialDocuments);
          setNewContact({ name: '', email: '', phone: '', company: '' });
          return 300;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleAddContact = useCallback(() => {
    if (!newContact.name || !newContact.email) return;
    
    const contact: Contact = {
      id: Date.now().toString(),
      ...newContact,
      status: 'nuevo',
      lastContact: new Date(),
    };
    
    setContacts(prev => [contact, ...prev]);
    setNewContact({ name: '', email: '', phone: '', company: '' });
    setActiveTab('contactos');
  }, [newContact]);

  const handleDeleteContact = useCallback((id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  }, []);

  const handleStatusChange = useCallback((id: string, newStatus: Contact['status']) => {
    setContacts(prev => prev.map(c => 
      c.id === id ? { ...c, status: newStatus, lastContact: new Date() } : c
    ));
  }, []);

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'contactos':
        return (
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Buscar contactos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/50"
                />
              </div>
              <button className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors">
                <Filter className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            {/* Contacts List */}
            <div className="space-y-3">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="glass-panel rounded-2xl p-4 flex items-center gap-4 hover:border-rose-600/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-600 to-rose-800 flex items-center justify-center text-white font-bold">
                    {contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-white font-medium truncate">{contact.name}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] text-white ${statusColors[contact.status]}`}>
                        {statusLabels[contact.status]}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        {contact.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {contact.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleDeleteContact(contact.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                    <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-zinc-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'nuevo':
        return (
          <div className="max-w-lg mx-auto">
            <h3 className="text-xl font-outfit font-bold text-white mb-6">Nuevo Lead</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Nombre completo</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ej: Juan Pérez"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/50"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="ejemplo@correo.com"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/50"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+34 600 000 000"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/50"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-2">Empresa</label>
                <input
                  type="text"
                  value={newContact.company}
                  onChange={(e) => setNewContact(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Nombre de la empresa"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500/50"
                />
              </div>
              <button
                onClick={handleAddContact}
                disabled={!newContact.name || !newContact.email}
                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5 inline mr-2" />
                Crear contacto
              </button>
            </div>
          </div>
        );

      case 'pipeline':
        return (
          <div className="grid grid-cols-5 gap-4">
            {['nuevo', 'contactado', 'calificado', 'oportunidad', 'cerrado'].map((status) => (
              <div key={status} className="space-y-3">
                <div className={`px-3 py-2 rounded-xl ${statusColors[status]} bg-opacity-20`}>
                  <span className="text-white text-sm font-medium">{statusLabels[status]}</span>
                  <span className="text-white/60 text-xs ml-2">
                    {contacts.filter(c => c.status === status).length}
                  </span>
                </div>
                <div className="space-y-2">
                  {contacts.filter(c => c.status === status).map((contact) => (
                    <div
                      key={contact.id}
                      className="glass-panel rounded-xl p-3 cursor-pointer hover:border-rose-600/30 transition-colors"
                      onClick={() => {
                        const statuses: Contact['status'][] = ['nuevo', 'contactado', 'calificado', 'oportunidad', 'cerrado'];
                        const currentIdx = statuses.indexOf(contact.status);
                        if (currentIdx < statuses.length - 1) {
                          handleStatusChange(contact.id, statuses[currentIdx + 1]);
                        }
                      }}
                    >
                      <p className="text-white text-sm font-medium truncate">{contact.name}</p>
                      <p className="text-zinc-500 text-xs truncate">{contact.company}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'documentos':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Subir documento
                </button>
                <button className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
                  <FolderOpen className="w-4 h-4" />
                  Nueva carpeta
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="glass-panel rounded-2xl p-4 flex items-center gap-4 hover:border-rose-600/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-rose-600/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-rose-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{doc.name}</h4>
                    <p className="text-zinc-500 text-sm">{doc.type} · {doc.size}</p>
                  </div>
                  <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-zinc-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'informes':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Total Leads', value: contacts.length, icon: Users, color: 'rose' },
                { label: 'Oportunidades', value: contacts.filter(c => c.status === 'oportunidad').length, icon: CheckCircle, color: 'green' },
                { label: 'Contactados', value: contacts.filter(c => c.status === 'contactado').length, icon: Phone, color: 'blue' },
                { label: 'Documentos', value: documents.length, icon: FileText, color: 'amber' },
              ].map((stat) => (
                <div key={stat.label} className="glass-panel rounded-2xl p-6 text-center">
                  <div className={`w-12 h-12 rounded-xl bg-${stat.color}-600/20 flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                  </div>
                  <p className="text-3xl font-outfit font-bold text-white">{stat.value}</p>
                  <p className="text-zinc-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="glass-panel rounded-2xl p-6">
              <h4 className="text-white font-medium mb-4">Actividad reciente</h4>
              <div className="space-y-3">
                {contacts.slice(0, 5).map((contact) => (
                  <div key={contact.id} className="flex items-center gap-4 py-2 border-b border-zinc-800 last:border-0">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white text-xs font-bold">
                      {contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{contact.name}</p>
                      <p className="text-zinc-500 text-xs">{contact.company}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] text-white ${statusColors[contact.status]}`}>
                      {statusLabels[contact.status]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="demo-crm" className="relative min-h-screen w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#050505]">
      {/* Ambient Glow */}
      <div className="ambient-glow top-1/2 -right-60" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">Demo 03</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-black text-white mb-6">
            CRM <span className="text-rose-500">Documental</span>
          </h2>
          <p className="text-lg sm:text-xl text-zinc-400 font-inter font-light max-w-2xl mx-auto">
            Gestiona leads, documentos y pipeline en un sistema CRM completo. 
            Los datos se borran automáticamente cada 5 minutos para privacidad.
          </p>
        </div>

        {/* Timer Warning */}
        {showResetWarning && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-amber-400 font-medium">
                Los datos se reiniciarán en {formatTime(timeLeft)}
              </p>
              <p className="text-amber-400/70 text-sm">
                Todos los cambios se perderán. La demo se resetea automáticamente.
              </p>
            </div>
            <div className="flex items-center gap-2 text-amber-500">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>
        )}

        {/* CRM Interface */}
        <div className="card-premium overflow-hidden">
          {/* Sidebar + Content */}
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-zinc-900/50 border-r border-zinc-800 p-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-outfit font-bold">CRM Pro</span>
              </div>

              <nav className="space-y-1">
                {[
                  { id: 'contactos', label: 'Contactos', icon: Users },
                  { id: 'nuevo', label: 'Nuevo Lead', icon: Plus },
                  { id: 'pipeline', label: 'Pipeline', icon: BarChart3 },
                  { id: 'documentos', label: 'Documentos', icon: FolderOpen },
                  { id: 'informes', label: 'Informes', icon: FileText },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as typeof activeTab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeTab === item.id
                        ? 'bg-rose-600 text-white'
                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.id === 'contactos' && (
                      <span className="ml-auto text-xs bg-zinc-700 px-2 py-0.5 rounded-full">
                        {contacts.length}
                      </span>
                    )}
                    {activeTab === item.id && (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </button>
                ))}
              </nav>

              {/* Timer */}
              <div className="mt-8 p-4 bg-zinc-900 rounded-xl">
                <div className="flex items-center gap-2 text-zinc-400 text-xs mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Reset automático</span>
                </div>
                <div className={`font-mono text-2xl ${timeLeft < 60 ? 'text-amber-500' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {renderContent()}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 flex items-center justify-center gap-2 text-zinc-500 text-sm">
          <RefreshCw className="w-4 h-4" />
          <span>Los datos se borran automáticamente cada 5 minutos para proteger la privacidad</span>
        </div>
      </div>
    </section>
  );
}
