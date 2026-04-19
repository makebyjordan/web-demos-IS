import { useRef, useLayoutEffect, useCallback } from 'react';
import { ChevronDown, Sparkles, Play } from 'lucide-react';
import gsap from 'gsap';

export default function Header() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".hero-bg", {
        scale: 1.2,
        duration: 2.5,
        ease: "power2.out",
      })
      .from(headlineRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power4.out",
      }, "-=2")
      .from(subheadlineRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8")
      .from(ctasRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.6")
      .from(statsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToDemo = useCallback(() => {
    const element = document.getElementById('demo-voz');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToContact = useCallback(() => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/hero_bg.png"
          alt="Inteligencia Sevilla AI Concept"
          className="hero-bg w-full h-full object-cover opacity-60 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Ambient Glows */}
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-rose-600/10 blur-[120px] rounded-full pointer-events-none z-1"></div>
      <div className="absolute bottom-[0%] -right-[10%] w-[30%] h-[30%] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none z-1"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
        <div className="text-center max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span className="eyebrow">Inteligencia Artificial · Sevilla</span>
            <Sparkles className="w-4 h-4 text-rose-500" />
          </div>

          {/* Main Title */}
          <h1 
            ref={headlineRef}
            className="font-outfit font-black text-white mb-6 leading-[1.05] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            Esto no es teoría.
            <br />
            <span className="text-rose-500">Es tu negocio,</span>
            <br />
            automatizado.
          </h1>

          {/* Subtitle */}
          <p 
            ref={subheadlineRef}
            className="text-xl sm:text-2xl text-zinc-300 font-inter font-light leading-relaxed max-w-3xl mx-auto mb-10"
            style={{ textWrap: 'balance' }}
          >
            Prueba en vivo cómo la inteligencia artificial puede cualificar clientes, 
            gestionar documentación y optimizar tu operativa, antes de comprometerte con nada.
          </p>

          {/* CTAs */}
          <div ref={ctasRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={scrollToDemo}
              className="btn-primary flex items-center gap-2 text-lg group"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Probar las demos
            </button>
            <button
              onClick={scrollToContact}
              className="btn-outline flex items-center gap-2 text-lg"
            >
              Solicitar auditoría
            </button>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {[
              { value: '3', label: 'Demos interactivas' },
              { value: '5min', label: 'Prueba sin compromiso' },
              { value: '100%', label: 'Tecnología real' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-outfit font-bold text-rose-500 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-400 font-inter">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <button
            onClick={scrollToDemo}
            className="flex flex-col items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
          >
            <span className="text-xs uppercase tracking-widest font-inter">
              Descubre más
            </span>
            <ChevronDown className="w-6 h-6 animate-bounce group-hover:text-rose-500 transition-colors" />
          </button>
        </div>
      </div>

      {/* Ghost Text Background */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div className="text-ghost whitespace-nowrap translate-y-1/3">
          INTELIGENCIA ARTIFICIAL
        </div>
      </div>
    </section>
  );
}

