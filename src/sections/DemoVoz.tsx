import { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Volume2, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface VoiceResponse {
  pregunta: string;
  respuesta: string;
}

const preguntas = [
  {
    id: 1,
    texto: "¿Estás buscando financiación para tu proyecto?",
    clave: "Financiación",
    opciones: ["sí", "si", "no", "quizás", "quizas", "depende"]
  },
  {
    id: 2,
    texto: "¿Cuál es el tamaño de tu empresa?",
    clave: "Tamaño",
    opciones: ["pequeña", "mediana", "grande", "autónomo", "startup", "pyme"]
  },
  {
    id: 3,
    texto: "¿En qué sector opera tu negocio?",
    clave: "Sector",
    opciones: ["tecnología", "inmobiliario", "retail", "salud", "educación", "industria", "servicios"]
  },
  {
    id: 4,
    texto: "¿Tienes presupuesto asignado para este año?",
    clave: "Presupuesto",
    opciones: ["sí", "si", "no", "en proceso", "pendiente"]
  }
];

export default function DemoVoz() {
  const [isListening, setIsListening] = useState(false);
  const [currentPregunta, setCurrentPregunta] = useState(0);
  const [respuestas, setRespuestas] = useState<VoiceResponse[]>([]);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoStarted, setDemoStarted] = useState(false);
  const [demoCompleted, setDemoCompleted] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'es-ES';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        procesarRespuesta(result);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError('Error en el reconocimiento. Intenta de nuevo.');
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setError('Tu navegador no soporta reconocimiento de voz. Usa Google Chrome.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      const voices = synthRef.current.getVoices();
      const spanishVoice = voices.find(v => v.lang.includes('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  }, []);

  const procesarRespuesta = useCallback((respuesta: string) => {
    const preguntaActual = preguntas[currentPregunta];
    const respuestaLower = respuesta.toLowerCase().trim();
    
    // Extraer la respuesta clave
    let respuestaClave = respuestaLower;
    for (const opcion of preguntaActual.opciones) {
      if (respuestaLower.includes(opcion)) {
        respuestaClave = opcion;
        break;
      }
    }

    // Capitalizar primera letra
    respuestaClave = respuestaClave.charAt(0).toUpperCase() + respuestaClave.slice(1);

    setRespuestas(prev => [...prev, {
      pregunta: preguntaActual.clave,
      respuesta: respuestaClave
    }]);

    if (currentPregunta < preguntas.length - 1) {
      setTimeout(() => {
        setCurrentPregunta(prev => prev + 1);
        setTranscript('');
      }, 1000);
    } else {
      setDemoCompleted(true);
    }
  }, [currentPregunta]);

  const startListening = useCallback(() => {
    setError(null);
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        setError('Error al iniciar el micrófono. Verifica los permisos.');
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const iniciarDemo = useCallback(() => {
    setDemoStarted(true);
    speak(preguntas[0].texto);
  }, [speak]);

  const reiniciarDemo = useCallback(() => {
    setDemoStarted(false);
    setDemoCompleted(false);
    setCurrentPregunta(0);
    setRespuestas([]);
    setTranscript('');
    setError(null);
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  }, []);

  useEffect(() => {
    if (demoStarted && !demoCompleted && currentPregunta > 0) {
      speak(preguntas[currentPregunta].texto);
    }
  }, [currentPregunta, demoStarted, demoCompleted, speak]);

  return (
    <section id="demo-voz" className="relative min-h-screen w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#050505]">
      {/* Ambient Glow */}
      <div className="ambient-glow top-1/4 -right-60" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">Demo 01</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-black text-white mb-6">
            Asistente de <span className="text-rose-500">Voz Real</span>
          </h2>
          <p className="text-lg sm:text-xl text-zinc-400 font-inter font-light max-w-2xl mx-auto">
            Experimenta un asistente de voz funcional en español. Habla con él, responde las preguntas 
            y observa cómo la IA transcribe y estructura la información clave.
          </p>
        </div>

        {/* Demo Container */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Panel - Voice Interface */}
          <div className="card-premium p-8 sm:p-12">
            {!demoStarted ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 rounded-full bg-rose-600/20 flex items-center justify-center mx-auto mb-8">
                  <Volume2 className="w-12 h-12 text-rose-500" />
                </div>
                <h3 className="text-2xl font-outfit font-bold text-white mb-4">
                  ¿Listo para probar?
                </h3>
                <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                  El asistente te hará 4 preguntas sobre tu negocio. 
                  Responde con voz natural y la IA extraerá la información clave.
                </p>
                <button
                  onClick={iniciarDemo}
                  className="btn-primary flex items-center gap-2 mx-auto"
                >
                  <Mic className="w-5 h-5" />
                  Iniciar conversación
                </button>
                <p className="text-xs text-zinc-500 mt-4">
                  Requiere micrófono y Google Chrome
                </p>
              </div>
            ) : demoCompleted ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-2xl font-outfit font-bold text-white mb-4">
                  ¡Conversación completada!
                </h3>
                <p className="text-zinc-400 mb-8">
                  La IA ha extraído toda la información relevante de tus respuestas.
                </p>
                <button
                  onClick={reiniciarDemo}
                  className="btn-outline flex items-center gap-2 mx-auto"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reiniciar demo
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Progress */}
                <div className="flex items-center gap-2">
                  {preguntas.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        idx <= currentPregunta ? 'bg-rose-600' : 'bg-zinc-800'
                      }`}
                    />
                  ))}
                </div>

                {/* Question */}
                <div className="text-center py-8">
                  <p className="text-zinc-400 text-sm mb-4">
                    Pregunta {currentPregunta + 1} de {preguntas.length}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-outfit font-bold text-white">
                    {preguntas[currentPregunta].texto}
                  </h3>
                </div>

                {/* Voice Visualization */}
                <div className="flex items-center justify-center gap-1 h-16">
                  {isSpeaking ? (
                    <>
                      <div className="voice-wave" />
                      <div className="voice-wave" />
                      <div className="voice-wave" />
                      <div className="voice-wave" />
                      <div className="voice-wave" />
                    </>
                  ) : isListening ? (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-rose-500 animate-pulse" />
                      <span className="text-rose-500 font-medium">Escuchando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-zinc-500">
                      <Volume2 className="w-5 h-5" />
                      <span>Esperando...</span>
                    </div>
                  )}
                </div>

                {/* Mic Button */}
                <div className="flex justify-center">
                  <button
                    onClick={isListening ? stopListening : startListening}
                    disabled={isSpeaking}
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                      isListening
                        ? 'bg-rose-600 animate-pulse-glow'
                        : 'bg-zinc-800 hover:bg-zinc-700'
                    } disabled:opacity-50`}
                  >
                    {isListening ? (
                      <MicOff className="w-8 h-8 text-white" />
                    ) : (
                      <Mic className="w-8 h-8 text-rose-500" />
                    )}
                  </button>
                </div>

                {/* Live Transcript */}
                {transcript && (
                  <div className="glass-panel rounded-2xl p-4 text-center">
                    <p className="text-zinc-400 text-sm mb-1">Has dicho:</p>
                    <p className="text-white text-lg">"{transcript}"</p>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 text-amber-500 justify-center">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel - Structured Data */}
          <div className="card-premium p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-outfit font-bold text-white">
                Datos Extraídos
              </h3>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${respuestas.length > 0 ? 'bg-green-500' : 'bg-zinc-600'}`} />
                <span className="text-xs text-zinc-400">
                  {respuestas.length > 0 ? 'Procesando' : 'Esperando'}
                </span>
              </div>
            </div>

            {respuestas.length === 0 ? (
              <div className="text-center py-16 text-zinc-500">
                <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-4">
                  <Volume2 className="w-8 h-8 opacity-50" />
                </div>
                <p>Los datos aparecerán aquí automáticamente</p>
                <p className="text-sm mt-2">Responde a las preguntas del asistente</p>
              </div>
            ) : (
              <div className="space-y-4">
                {respuestas.map((resp, idx) => (
                  <div
                    key={idx}
                    className="glass-panel rounded-2xl p-4 animate-fade-in"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-zinc-400 text-sm mb-1">{resp.pregunta}</p>
                        <p className="text-white text-lg font-medium">{resp.respuesta}</p>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    </div>
                  </div>
                ))}

                {demoCompleted && (
                  <div className="mt-6 p-4 bg-rose-600/10 border border-rose-600/30 rounded-2xl">
                    <p className="text-rose-400 text-sm text-center">
                      ✅ Información completa lista para exportar al CRM
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Info Box */}
            <div className="mt-6 p-4 bg-zinc-900/50 rounded-2xl">
              <p className="text-xs text-zinc-500 leading-relaxed">
                <strong className="text-zinc-400">Nota:</strong> Esta demo utiliza la 
                Web Speech API de tu navegador. El reconocimiento de voz funciona 
                mejor en Google Chrome. Los datos se procesan localmente y no se 
                almacenan en ningún servidor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
