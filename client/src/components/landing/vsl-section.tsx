import React, { useState, useEffect } from 'react';
import { Play, Shield, Clock, Award, Loader2, Video } from 'lucide-react';

export function VSLSection() {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoLoadProgress, setVideoLoadProgress] = useState(0);

  useEffect(() => {
    // Simulate progressive loading states
    const progressInterval = setInterval(() => {
      setVideoLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsVideoLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Set a maximum loading time
    const maxLoadTime = setTimeout(() => {
      setVideoLoadProgress(100);
      setTimeout(() => setIsVideoLoading(false), 500);
      clearInterval(progressInterval);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(maxLoadTime);
    };
  }, []);

  return (
    <section id="vsl" className="py-20 bg-black relative overflow-hidden pt-[0px] pb-[0px] mt-[40px] mb-[40px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mt-[16px] mb-[16px]">

          
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
            Você Já Viveu Aquela Noite em que{' '}
            <span className="bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--celestial-blue)] bg-clip-text text-transparent">
              Deitou Querendo Desligar
            </span>{' '}
            do Mundo?
          </h2>
          
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Mas sua cabeça parecia ligada no volume máximo? Descubra o segredo oriental que transforma sua mente agitada em 
            <strong className="text-[var(--warm-accent)]"> silêncio interno</strong> natural
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-[var(--accent-blue)]/10 to-[var(--warm-accent)]/10 border border-[var(--accent-blue)]/20 rounded-2xl p-4 sm:p-6 md:p-8">
            
            {/* Video Badge */}
            <div className="flex items-center justify-center mb-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--accent-blue)]/20 to-[var(--celestial-blue)]/20 border border-[var(--accent-blue)]/30 rounded-full px-4 py-2">
                <Play className="w-3 h-3 text-[var(--accent-blue)]" />
                <span className="text-sm font-medium text-[var(--accent-blue)]">Método Completo</span>
              </div>
            </div>

            {/* Video Player Container with Loading Animation */}
            <div className="relative">
              {/* Loading Overlay */}
              {isVideoLoading && (
                <div className="absolute inset-0 z-20 bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-xl flex flex-col items-center justify-center transition-all duration-500 ease-out">
                  {/* Animated Video Icon */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--celestial-blue)] rounded-full opacity-20 animate-ping"></div>
                    <div className="relative bg-gradient-to-r from-[var(--accent-blue)] to-[var(--celestial-blue)] p-4 rounded-full">
                      <Video className="w-8 h-8 text-white animate-pulse" />
                    </div>
                  </div>

                  {/* Loading Text with Typewriter Effect */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2 animate-fade-in">
                      Carregando Apresentação...
                    </h3>
                    <p className="text-slate-300 text-sm animate-fade-in-delay">
                      Preparando conteúdo exclusivo para você
                    </p>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="w-3/4 max-w-sm">
                    <div className="bg-slate-700/50 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[var(--accent-blue)] to-[var(--celestial-blue)] rounded-full transition-all duration-300 ease-out relative"
                        style={{ width: `${Math.min(videoLoadProgress, 100)}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 mt-2">
                      <span>Conectando...</span>
                      <span>{Math.round(videoLoadProgress)}%</span>
                    </div>
                  </div>

                  {/* Floating Dots Animation */}
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[var(--accent-blue)]/30 rounded-full animate-float-1"></div>
                  <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-[var(--celestial-blue)]/40 rounded-full animate-float-2"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-[var(--warm-accent)]/30 rounded-full animate-float-3"></div>
                </div>
              )}

              {/* ConvertAI Video Player */}
              <div 
                className={`transition-all duration-700 ease-out ${isVideoLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                dangerouslySetInnerHTML={{
                  __html: `
                    <script type="text/javascript"> var s=document.createElement("script"); s.src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js", s.async=!0,document.head.appendChild(s); </script> <div id="ifr_6880cd2e24f49ba385264481_wrapper" style="margin: 0 auto; width: 100%; "> <div style="padding: 52.760136785539814% 0 0 0; position: relative;" id="ifr_6880cd2e24f49ba385264481_aspect"> <iframe frameborder="0" allowfullscreen src="about:blank" id="ifr_6880cd2e24f49ba385264481" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" referrerpolicy="origin" onload=" this.onload=null, this.src='https://scripts.converteai.net/565bfa0e-d0fd-494c-b04a-2fc27a3af576/players/6880cd2e24f49ba385264481/v4/embed.html' +(location.search||'?') +'&vl=' +encodeURIComponent(location.href)"></iframe> </div> </div>
                  `
                }}
              />
            </div>


          </div>
        </div>




      </div>
    </section>
  );
}