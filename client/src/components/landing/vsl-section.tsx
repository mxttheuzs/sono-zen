import React, { useEffect } from 'react';
import { Play, Shield, Clock, Award } from 'lucide-react';

export function VSLSection() {
  useEffect(() => {
    // Load ConvertAI SDK
    const script = document.createElement('script');
    script.src = 'https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
      try {
        document.head.removeChild(script);
      } catch (e) {
        // Script might have already been removed
      }
    };
  }, []);

  return (
    <section id="vsl" className="py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--warm-accent)]/20 to-[var(--accent-blue)]/20 border border-[var(--warm-accent)]/30 rounded-full px-4 py-2 mb-6">
            <Play className="w-4 h-4 text-[var(--warm-accent)]" />
            <span className="text-sm font-medium text-[var(--warm-accent)]">Apresentação Especial</span>
          </div>
          
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--celestial-blue)] bg-clip-text text-transparent">
              Transforme Sua Noite
            </span>{' '}
            em um{' '}
            <span className="bg-gradient-to-r from-[var(--celestial-blue)] via-[var(--accent-blue)] to-[var(--warm-accent)] bg-clip-text text-transparent">
              Momento Sagrado
            </span>
          </h2>
          
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Descubra como milhares de pessoas estão conquistando o sono dos sonhos com o método que está revolucionando a forma como dormimos
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-[var(--accent-blue)]/10 to-[var(--warm-accent)]/10 border border-[var(--accent-blue)]/20 rounded-2xl p-4 sm:p-6 md:p-8">
            
            {/* Video Badge */}
            <div className="flex items-center justify-center mb-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--success-green)]/20 to-[var(--mint-green)]/20 border border-[var(--success-green)]/30 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-[var(--success-green)] rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-[var(--success-green)]">AO VIVO - Método Completo</span>
              </div>
            </div>

            {/* ConvertAI Video Player */}
            <div className="relative rounded-xl overflow-hidden bg-black/50 border border-[var(--accent-blue)]/30">
              <div id="ifr_68746e5feeeef9dc21f33836_wrapper" style={{ margin: '0 auto', width: '100%' }}>
                <div 
                  style={{ padding: '52.760136785539814% 0 0 0', position: 'relative' }} 
                  id="ifr_68746e5feeeef9dc21f33836_aspect"
                >
                  <iframe 
                    frameBorder="0" 
                    allowFullScreen 
                    src="about:blank" 
                    id="ifr_68746e5feeeef9dc21f33836" 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    referrerPolicy="origin" 
                    onLoad={(e) => {
                      const iframe = e.target as HTMLIFrameElement;
                      iframe.onload = null;
                      iframe.src = 'https://scripts.converteai.net/565bfa0e-d0fd-494c-b04a-2fc27a3af576/players/68746e5feeeef9dc21f33836/v4/embed.html' + 
                                  (location.search || '?') + 
                                  '&vl=' + encodeURIComponent(location.href);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Video Description */}
            <div className="mt-6 text-center">
              <p className="text-[var(--text-secondary)] leading-relaxed">
                🎥 <strong className="text-[var(--warm-accent)]">Atenção:</strong> Este vídeo revela os segredos que os especialistas em sono não querem que você saiba. 
                Assista até o final para descobrir como transformar suas noites em apenas 7 dias.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[var(--success-green)]/20 to-[var(--mint-green)]/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-[var(--success-green)]" />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">100% Seguro</h3>
            <p className="text-sm text-[var(--text-muted)]">Método testado e aprovado por milhares de pessoas</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[var(--accent-blue)]/20 to-[var(--celestial-blue)]/20 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-[var(--accent-blue)]" />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">Resultados Rápidos</h3>
            <p className="text-sm text-[var(--text-muted)]">Primeiros resultados já na primeira noite</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[var(--warm-accent)]/20 to-[var(--accent-blue)]/20 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-[var(--warm-accent)]" />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">Garantia Total</h3>
            <p className="text-sm text-[var(--text-muted)]">7 dias de garantia ou seu dinheiro de volta</p>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-12">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-[var(--warm-accent)]/10 to-[var(--accent-blue)]/10 border border-[var(--warm-accent)]/30 rounded-xl p-6">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              💡 <strong className="text-[var(--warm-accent)]">Dica Importante:</strong> Assista o vídeo completo para entender por que você não consegue dormir 
              e como o método oriental vai resolver isso de forma definitiva. Milhares de pessoas já transformaram suas noites com estas técnicas simples.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}