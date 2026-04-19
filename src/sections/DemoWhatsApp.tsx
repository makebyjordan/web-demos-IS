import { useState, useEffect, useRef, useCallback } from 'react';
import { Send, RefreshCw, CheckCircle, User, Bot, Phone, MapPin, Home, Calendar, Euro, Bed } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface LeadData {
  tipo: string;
  zona: string;
  presupuesto: string;
  habitaciones: string;
  duracion: string;
  financiacion: string;
}

const preguntasBot = [
  {
    id: 1,
    texto: "¡Hola! Soy Laura, tu asesora inmobiliaria. ¿Buscas alquilar, comprar o vender una propiedad?",
    campo: 'tipo',
    opciones: {
      'alquilar': 'Alquiler',
      'comprar': 'Compra',
      'vender': 'Venta',
      'alquiler': 'Alquiler'
    }
  },
  {
    id: 2,
    texto: "Perfecto. ¿En qué zona de Sevilla te interesa? Por ejemplo: Triana, Nervión, Centro, Alameda...",
    campo: 'zona',
    opciones: {}
  },
  {
    id: 3,
    texto: "¿Cuál es tu presupuesto aproximado?",
    campo: 'presupuesto',
    opciones: {}
  },
  {
    id: 4,
    texto: "¿Cuántas habitaciones necesitas?",
    campo: 'habitaciones',
    opciones: {
      '1': '1 habitación',
      '2': '2 habitaciones',
      '3': '3 habitaciones',
      '4': '4+ habitaciones',
      'uno': '1 habitación',
      'dos': '2 habitaciones',
      'tres': '3 habitaciones',
      'cuatro': '4+ habitaciones'
    }
  },
  {
    id: 5,
    texto: "¿Para cuándo lo necesitas? ¿Tienes urgencia?",
    campo: 'duracion',
    opciones: {
      'inmediato': 'Inmediato',
      '1 mes': '1 mes',
      '3 meses': '3 meses',
      '6 meses': '6 meses',
      'urgencia': 'Inmediato'
    }
  },
  {
    id: 6,
    texto: "¿Necesitas financiación o tienes el capital disponible?",
    campo: 'financiacion',
    opciones: {
      'financiación': 'Sí, necesita financiación',
      'financiacion': 'Sí, necesita financiación',
      'capital': 'Capital disponible',
      'disponible': 'Capital disponible',
      'no': 'Capital disponible',
      'sí': 'Sí, necesita financiación',
      'si': 'Sí, necesita financiación'
    }
  }
];

export default function DemoWhatsApp() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentPregunta, setCurrentPregunta] = useState(0);
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [demoCompleted, setDemoCompleted] = useState(false);
  const [demoStarted, setDemoStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addMessage = useCallback((text: string, sender: 'user' | 'bot') => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      sender,
      timestamp: new Date()
    }]);
  }, []);

  const procesarRespuesta = useCallback((respuesta: string) => {
    const pregunta = preguntasBot[currentPregunta];
    const respuestaLower = respuesta.toLowerCase().trim();
    
    let valorExtraido = respuesta;
    
    // Buscar en opciones predefinidas
    for (const [key, value] of Object.entries(pregunta.opciones)) {
      if (respuestaLower.includes(key)) {
        valorExtraido = value;
        break;
      }
    }

    setLeadData(prev => ({
      ...prev,
      [pregunta.campo]: valorExtraido
    }));

    if (currentPregunta < preguntasBot.length - 1) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setCurrentPregunta(prev => prev + 1);
      }, 1500);
    } else {
      setTimeout(() => {
        setDemoCompleted(true);
      }, 1000);
    }
  }, [currentPregunta]);

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');
    procesarRespuesta(inputValue);
    setInputValue('');
  }, [inputValue, addMessage, procesarRespuesta]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }, [handleSend]);

  const iniciarDemo = useCallback(() => {
    setDemoStarted(true);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(preguntasBot[0].texto, 'bot');
    }, 1000);
  }, [addMessage]);

  const reiniciarDemo = useCallback(() => {
    setDemoStarted(false);
    setDemoCompleted(false);
    setCurrentPregunta(0);
    setMessages([]);
    setLeadData({});
    setInputValue('');
  }, []);

  // Enviar siguiente pregunta cuando cambia currentPregunta
  useEffect(() => {
    if (demoStarted && !demoCompleted && currentPregunta > 0 && messages.length > 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage(preguntasBot[currentPregunta].texto, 'bot');
      }, 1000);
    }
  }, [currentPregunta, demoStarted, demoCompleted, messages.length, addMessage]);

  return (
    <section id="demo-whatsapp" className="relative min-h-screen w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      {/* Ambient Glow */}
      <div className="ambient-glow top-1/3 -left-60" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">Demo 02</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-black text-white mb-6">
            Bot WhatsApp <span className="text-rose-500">"Laura"</span>
          </h2>
          <p className="text-lg sm:text-xl text-zinc-400 font-inter font-light max-w-2xl mx-auto">
            Simula una conversación de cualificación inmobiliaria real. Laura extrae 
            automáticamente toda la información relevante del cliente.
          </p>
        </div>

        {/* Demo Container */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* WhatsApp Interface */}
          <div className="lg:col-span-3">
            {!demoStarted ? (
              <div className="card-premium p-12 text-center">
                <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8">
                  <Bot className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-2xl font-outfit font-bold text-white mb-4">
                  Chat con Laura
                </h3>
                <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                  Laura es un bot de WhatsApp que cualifica leads inmobiliarios 
                  de forma automática. Inicia la conversación y observa cómo funciona.
                </p>
                <button
                  onClick={iniciarDemo}
                  className="btn-primary flex items-center gap-2 mx-auto"
                >
                  <Send className="w-5 h-5" />
                  Iniciar chat
                </button>
              </div>
            ) : (
              <div className="bg-[#0b141a] rounded-[2.5rem] overflow-hidden border border-zinc-800 shadow-2xl">
                {/* WhatsApp Header */}
                <div className="bg-[#1f2c34] px-6 py-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">Laura</h4>
                    <p className="text-green-400 text-sm">en línea</p>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="h-[400px] overflow-y-auto p-4 space-y-3 bg-[url('https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png')] bg-repeat">
                  {/* Welcome Message */}
                  <div className="flex justify-center mb-4">
                    <span className="bg-[#1f2c34] text-zinc-400 text-xs px-3 py-1 rounded-full">
                      Hoy
                    </span>
                  </div>

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                          message.sender === 'user'
                            ? 'bg-[#005c4b] text-white rounded-tr-sm'
                            : 'bg-[#202c33] text-white rounded-tl-sm'
                        }`}
                      >
                        <p>{message.text}</p>
                        <div className={`text-[10px] mt-1 ${
                          message.sender === 'user' ? 'text-green-300' : 'text-zinc-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString('es-ES', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                          {message.sender === 'user' && (
                            <span className="ml-1">✓✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-[#202c33] px-4 py-3 rounded-2xl rounded-tl-sm">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce animation-delay-200" />
                          <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce animation-delay-400" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Completion Message */}
                  {demoCompleted && (
                    <div className="flex justify-center mt-4">
                      <div className="bg-green-500/20 border border-green-500/30 px-4 py-3 rounded-2xl text-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto mb-1" />
                        <p className="text-green-400 text-sm">
                          Lead cualificado completamente
                        </p>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="bg-[#1f2c34] px-4 py-3 flex items-center gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={demoCompleted || isTyping}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 bg-[#2a3942] text-white px-4 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 disabled:opacity-50"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || demoCompleted || isTyping}
                    className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-700 transition-colors"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary Panel */}
          <div className="lg:col-span-2">
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-outfit font-bold text-white">
                  Resumen del Lead
                </h3>
                {demoCompleted && (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                    Completado
                  </span>
                )}
              </div>

              {Object.keys(leadData).length === 0 ? (
                <div className="text-center py-12 text-zinc-500">
                  <User className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p className="text-sm">El resumen aparecerá aquí</p>
                  <p className="text-xs mt-2">Responde las preguntas de Laura</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {leadData.tipo && (
                    <div className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl animate-fade-in">
                      <Home className="w-5 h-5 text-rose-500" />
                      <div>
                        <p className="text-zinc-400 text-xs">Tipo</p>
                        <p className="text-white font-medium">{leadData.tipo}</p>
                      </div>
                    </div>
                  )}

                  {leadData.zona && (
                    <div className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl animate-fade-in animation-delay-100">
                      <MapPin className="w-5 h-5 text-rose-500" />
                      <div>
                        <p className="text-zinc-400 text-xs">Zona</p>
                        <p className="text-white font-medium">{leadData.zona}</p>
                      </div>
                    </div>
                  )}

                  {leadData.presupuesto && (
                    <div className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl animate-fade-in animation-delay-200">
                      <Euro className="w-5 h-5 text-rose-500" />
                      <div>
                        <p className="text-zinc-400 text-xs">Presupuesto</p>
                        <p className="text-white font-medium">{leadData.presupuesto}</p>
                      </div>
                    </div>
                  )}

                  {leadData.habitaciones && (
                    <div className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl animate-fade-in animation-delay-300">
                      <Bed className="w-5 h-5 text-rose-500" />
                      <div>
                        <p className="text-zinc-400 text-xs">Habitaciones</p>
                        <p className="text-white font-medium">{leadData.habitaciones}</p>
                      </div>
                    </div>
                  )}

                  {leadData.duracion && (
                    <div className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl animate-fade-in animation-delay-400">
                      <Calendar className="w-5 h-5 text-rose-500" />
                      <div>
                        <p className="text-zinc-400 text-xs">Disponibilidad</p>
                        <p className="text-white font-medium">{leadData.duracion}</p>
                      </div>
                    </div>
                  )}

                  {leadData.financiacion && (
                    <div className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl animate-fade-in animation-delay-500">
                      <Phone className="w-5 h-5 text-rose-500" />
                      <div>
                        <p className="text-zinc-400 text-xs">Financiación</p>
                        <p className="text-white font-medium">{leadData.financiacion}</p>
                      </div>
                    </div>
                  )}

                  {demoCompleted && (
                    <div className="mt-6 p-4 bg-rose-600/10 border border-rose-600/30 rounded-xl">
                      <p className="text-rose-400 text-sm text-center">
                        ✅ Lead listo para asignar a un agente
                      </p>
                    </div>
                  )}
                </div>
              )}

              {demoCompleted && (
                <button
                  onClick={reiniciarDemo}
                  className="w-full mt-6 btn-outline flex items-center justify-center gap-2 text-sm py-3"
                >
                  <RefreshCw className="w-4 h-4" />
                  Nueva conversación
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
