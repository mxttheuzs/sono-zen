import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { MethodSection } from "@/components/landing/method-section";
import { EbookContentSection } from "@/components/landing/ebook-content-section";

import { TestimonialsSection } from "@/components/landing/testimonials-section";

import { ObjectionsSection } from "@/components/landing/objections-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { AuthorSection } from "@/components/landing/author-section";
import { FAQSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import { FloatingStars } from "@/components/ui/floating-stars";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import { YouTubeMusic } from "@/components/audio/youtube-music";

export default function Home() {
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

        <ObjectionsSection />
        <PricingSection />
        <AuthorSection />
        <FAQSection />
        <Footer />
        
        {/* Música relaxante do YouTube - toca automaticamente por 30 segundos */}
        <YouTubeMusic videoId="ZlayI0WKX40" autoPlay={true} volume={0.2} />
      </div>
    </div>
  );
}
