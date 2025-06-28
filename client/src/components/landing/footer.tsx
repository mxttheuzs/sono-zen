import { Moon, Star, Cloud } from "lucide-react";

const footerLinks = {
  useful: [
    { name: "O Método", href: "#conteudo-ebook" },
    { name: "Benefícios", href: "#problema" },
    { name: "Depoimentos", href: "#depoimentos" }
  ],
  support: [
    { name: "Contato", href: "#" },
    { name: "FAQ", href: "#faq" },
    { name: "Garantia", href: "#" }
  ],
  legal: [
    { name: "Privacidade", href: "#" },
    { name: "Termos", href: "#" }
  ]
};

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-950/95 to-slate-900/90 border-t border-slate-700/40 py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="font-heading font-bold text-2xl mb-6 flex items-center text-white group cursor-pointer">
              <div className="relative w-12 h-12 rounded-3xl bg-gradient-to-br from-slate-800/40 to-slate-900/60 border-2 border-slate-600/40 flex items-center justify-center mr-4 backdrop-blur-md transition-all duration-500 group-hover:border-blue-400/60 group-hover:bg-gradient-to-br group-hover:from-slate-700/50 group-hover:to-slate-800/70">
                {/* Estrelas flutuantes ao redor do logo */}
                <Star className="absolute -top-1.5 -right-1.5 w-3 h-3 text-white/80 animate-twinkle fill-current" 
                     style={{animationDelay: '0s'}} />
                <Star className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 text-white/70 animate-twinkle fill-current" 
                     style={{animationDelay: '1.5s'}} />
                <Star className="absolute top-1 -left-2.5 w-2 h-2 text-white/60 animate-twinkle fill-current" 
                     style={{animationDelay: '3s'}} />
                
                {/* Nuvenzinhas flutuantes */}
                <Cloud className="absolute -top-2.5 left-1.5 w-4 h-4 text-white/50 animate-float-slow" 
                     style={{animationDelay: '2s'}} />
                <Cloud className="absolute -bottom-2.5 right-1.5 w-3.5 h-3.5 text-white/40 animate-float-slow" 
                     style={{animationDelay: '4s'}} />
                
                {/* Container da lua com brilho focado */}
                <div className="relative">
                  {/* Brilho suave atrás da lua */}
                  <div className="absolute inset-0 bg-blue-300/20 rounded-full blur-md animate-pulse-gentle"></div>
                  
                  {/* Brilho intenso no hover apenas na lua */}
                  <div className="absolute inset-0 bg-gradient-radial from-white/30 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150"></div>
                  
                  {/* Anel de luz no hover */}
                  <div className="absolute inset-0 bg-blue-200/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-125 blur-sm"></div>
                  
                  <Moon className="h-7 w-7 text-white relative z-10 animate-breathe group-hover:text-blue-50 group-hover:drop-shadow-lg transition-all duration-500" />
                </div>
              </div>
              <span className="bg-gradient-to-r from-white via-blue-50 to-slate-100 bg-clip-text text-transparent group-hover:from-blue-100 group-hover:via-white group-hover:to-blue-50 transition-all duration-500 drop-shadow-sm">
                Sono Zen
              </span>
            </div>
            <p className="text-base text-slate-300 leading-relaxed max-w-md mb-6">
              Transformando vidas através do poder do sono reparador. Métodos orientais comprovados para uma noite de sono perfeita.
            </p>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-slate-400">Disponível 24/7</span>
              </div>
              <div className="w-px h-4 bg-slate-600"></div>
              <span className="text-slate-400">Suporte dedicado</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-white text-lg">Links Úteis</h4>
            <ul className="space-y-3">
              {footerLinks.useful.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-300 hover:text-blue-300 transition-colors duration-300 text-sm font-medium hover:translate-x-1 transform transition-transform"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-white text-lg">Suporte</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-slate-300 hover:text-blue-300 transition-colors duration-300 text-sm font-medium hover:translate-x-1 transform transition-transform">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-white text-lg">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-slate-300 hover:text-blue-300 transition-colors duration-300 text-sm font-medium hover:translate-x-1 transform transition-transform">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700/40 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              © 2024 Sono Zen. Todos os direitos reservados.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-slate-400">Resultados garantidos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-slate-400">Método natural</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-slate-400">7 dias para transformar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
