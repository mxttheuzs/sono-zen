import { Button } from "@/components/ui/button";
import { Play, Lock, Eye, Smartphone } from "lucide-react";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import previewVideo from "@assets/0706(1)_1751855906942.mp4";

export function VideoPreviewSection() {
  const scrollToCheckout = () => {
    const element = document.getElementById("preco");
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
          
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-6">
            Veja Por Dentro do{" "}
            <span className="bg-gradient-to-r from-[var(--warm-accent)] via-[var(--accent-blue)] to-[var(--celestial-blue)] bg-clip-text text-transparent">
              Sono Zen
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto">
            Veja o <strong>Web App interativo em ação</strong> - este vídeo mostra como funciona a plataforma que vai guiar você em cada passo da sua transformação do sono
          </p>
        </div>

        {/* Video Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Video wrapper with blur overlay */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg)]/80 border border-[var(--border-subtle)]">
            
            {/* Video with blur effect already applied in the source */}
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
              {/* Video element */}
              <video 
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                controls
              >
                <source src={previewVideo} type="video/mp4" />
                Seu navegador não suporta vídeo HTML5.
              </video>
              
              {/* Small preview indicator */}
              <div className="absolute top-4 left-4">
                <div className="bg-black/70 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-[var(--accent-blue)]" />
                  <span className="text-white text-sm font-medium">Preview do Web App</span>
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
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-[var(--warm-accent)]/10 to-[var(--accent-blue)]/10 border border-[var(--warm-accent)]/30 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
              <p className="text-[var(--text-secondary)] mb-4">
                Este vídeo mostra <strong>exatamente como funciona o Web App interativo</strong> que você vai receber. Pode assistir quantas vezes quiser para conhecer o conteúdo e a experiência.
              </p>
              <p className="text-[var(--text-primary)] font-semibold mb-6">
                Após a compra, você terá acesso à versão completa sem blur com todos os recursos desbloqueados!
              </p>
              
              <Button 
                onClick={scrollToCheckout}
                className="w-full sm:w-auto bg-gradient-to-r from-[var(--warm-accent)] to-[var(--accent-blue)] text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:shadow-2xl hover:shadow-[var(--warm-accent)]/25 transition-all duration-300 transform hover:scale-105"
              >
                <Lock className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="text-sm sm:text-base leading-tight">
                  Desbloquear Acesso Completo
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}