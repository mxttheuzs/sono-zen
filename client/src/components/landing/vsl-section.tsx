import React from 'react';
import { Play, Shield, Clock, Award } from 'lucide-react';

export function VSLSection() {

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

            {/* ConvertAI Video Player */}
            <div className="relative rounded-xl overflow-hidden bg-black/50 border border-[var(--accent-blue)]/30">
              <div 
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