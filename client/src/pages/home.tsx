import { useEffect } from "react";
import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { MethodSection } from "@/components/landing/method-section";
import { EbookContentSection } from "@/components/landing/ebook-content-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { SleepComfortQuiz } from "@/components/quiz/sleep-comfort-quiz";
import { ObjectionsSection } from "@/components/landing/objections-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { AuthorSection } from "@/components/landing/author-section";
import { FAQSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import { FloatingStars } from "@/components/ui/floating-stars";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import { trackPageView, trackViewContent } from "@/lib/conversion-tracking";
import { ConversionDebug } from "@/components/conversion-debug";


export default function Home() {
  // Inicializar tracking ao carregar a página
  useEffect(() => {
    // Tracking de page view com parâmetros UTM capturados
    trackPageView();
    
    // Tracking de view content da landing page
    trackViewContent('Sono Zen - Landing Page');
  }, []);

  const scrollToCheckout = () => {
    const element = document.getElementById("preco");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      {/* Animated background elements */}
      <FloatingStars className="fixed inset-0 z-0" density="medium" />
      <FloatingClouds className="fixed inset-0 z-0" />
      
      {/* Content with proper z-index */}
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <ProblemSection />
        <MethodSection />
        <EbookContentSection />
        <TestimonialsSection />
        <SleepComfortQuiz />
        <ObjectionsSection />
        <PricingSection />
        <AuthorSection />
        <FAQSection />
        <Footer />
      </div>
      
      {/* Debug component (apenas em desenvolvimento) */}
      <ConversionDebug />
    </div>
  );
}
