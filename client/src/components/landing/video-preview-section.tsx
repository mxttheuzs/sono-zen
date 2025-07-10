import { Button } from "@/components/ui/button";
import { Play, Lock, Eye, Smartphone } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import { useState, useEffect } from "react";

export function VideoPreviewSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Hide loading after 2 seconds
    const loadingTimer = setTimeout(() => {
      setVideoLoaded(true);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  const scrollToCheckout = () => {
    const element = document.getElementById('checkout');
    if (element) {
      // Calcular offset para compensar a navegação fixa
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="preview-video" className="py-20 bg-black relative overflow-hidden">
      <FloatingClouds />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/30 px-4 py-2 rounded-full mb-6">
            <Eye className="h-5 w-5 text-[var(--accent-blue)]" />
            <span className="text-[var(--accent-blue)] font-semibold">Preview Exclusivo</span>
          </div>
          
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-6 px-2">
            Veja Por Dentro do{" "}
            <span className="bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--celestial-blue)] bg-clip-text text-transparent">
              Sono Zen
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto px-4">
            Veja o <strong>ebook interativo em ação</strong> - este vídeo mostra <strong>apenas uma pequena parte</strong> de todo o conteúdo da plataforma que vai guiar você em cada passo da sua transformação do sono
          </p>
        </div>

        {/* Video Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Video wrapper with blur overlay */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg)]/80 border border-[var(--border-subtle)]">
            
            {/* Video with Google Drive iframe */}
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
              {/* Loading state */}
              {!videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-blue)] mx-auto mb-4"></div>
                    <p className="text-white text-sm">Carregando preview...</p>
                  </div>
                </div>
              )}
              
              {/* Google Drive iframe */}
              <iframe
                src="https://drive.google.com/file/d/1Jda20tDrjynVaUvW-zFM93wu_9HZaWXt/preview"
                className="w-full h-full"
                allow="autoplay"
                allowFullScreen
                onLoad={() => setVideoLoaded(true)}
              ></iframe>
              
              {/* Small preview indicator */}
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                <div className="bg-black/70 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 flex items-center gap-1 sm:gap-2">
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-[var(--accent-blue)]" />
                  <span className="text-white text-xs sm:text-sm font-medium">Preview do Web App</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-[var(--card-bg)]/50 backdrop-blur-sm border border-[var(--border-subtle)] rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-[var(--accent-blue)]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-6 w-6 text-[var(--accent-blue)]" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Web App Interativo</h3>
              <p className="text-[var(--text-secondary)] text-sm">Acesse de qualquer dispositivo, a qualquer hora</p>
            </div>

            <div className="bg-[var(--card-bg)]/50 backdrop-blur-sm border border-[var(--border-subtle)] rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-[var(--warm-accent)]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Play className="h-6 w-6 text-[var(--warm-accent)]" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Áudios Integrados</h3>
              <p className="text-[var(--text-secondary)] text-sm">Sons relaxantes e meditações guiadas incluídas</p>
            </div>

            <div className="bg-[var(--card-bg)]/50 backdrop-blur-sm border border-[var(--border-subtle)] rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-[var(--celestial-blue)]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Eye className="h-6 w-6 text-[var(--celestial-blue)]" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Interface Intuitiva</h3>
              <p className="text-[var(--text-secondary)] text-sm">Fácil de usar, mesmo sem experiência técnica</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12 px-4">
            <div className="bg-gradient-to-r from-[var(--warm-accent)]/10 to-[var(--accent-blue)]/10 border border-[var(--warm-accent)]/30 rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
              <p className="text-[var(--text-secondary)] mb-4 text-sm sm:text-base leading-relaxed">
                Este vídeo mostra <strong>apenas uma pequena amostra</strong> do webapp interativo que você vai receber. O conteúdo completo possui muito mais módulos, técnicas e recursos do que você vê aqui.
              </p>
              <p className="text-[var(--text-primary)] font-semibold mb-6 text-sm sm:text-base leading-relaxed">
                Após a compra, você terá acesso ao <strong>método completo</strong> sem blur e com todos os módulos especializados desbloqueados!
              </p>
              
              <Button 
                onClick={scrollToCheckout}
                className="bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base md:text-lg font-semibold hover:shadow-2xl hover:shadow-[var(--warm-accent)]/25 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto min-h-[50px] flex items-center justify-center"
              >
                <Lock className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="text-center break-words">Desbloquear Acesso Completo</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}