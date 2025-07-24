import { Moon, Star, Cloud } from "lucide-react";
import { SonoZenLogo } from "@/components/ui/sono-zen-logo";

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

  const handleWhatsAppContact = () => {
    const whatsappNumber = "5513996116102";
    const message = "Oi! Tenho interesse no método Sono Zen e gostaria de tirar algumas dúvidas.";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <footer className="bg-gradient-to-br from-slate-950/95 to-slate-900/90 border-t border-slate-700/40 py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <SonoZenLogo size="md" className="mb-6" />
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
                  {link.name === "Contato" ? (
                    <button 
                      onClick={handleWhatsAppContact}
                      className="text-slate-300 hover:text-blue-300 transition-colors duration-300 text-sm font-medium hover:translate-x-1 transform transition-transform"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a href={link.href} className="text-slate-300 hover:text-blue-300 transition-colors duration-300 text-sm font-medium hover:translate-x-1 transform transition-transform">
                      {link.name}
                    </a>
                  )}
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
