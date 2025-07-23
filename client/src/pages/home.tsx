import { useEffect } from "react";
import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { VSLSection } from "@/components/landing/vsl-section";
import { SleepPlanningSection } from "@/components/landing/sleep-planning-section";
import { VideoPreviewSection } from "@/components/landing/video-preview-section";
import { EbookContentSection } from "@/components/landing/ebook-content-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { LazySection } from "@/components/ui/lazy-section";

import { ObjectionsSection } from "@/components/landing/objections-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { AuthorSection } from "@/components/landing/author-section";
import { FAQSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";
import { FloatingClouds } from "@/components/ui/floating-clouds";
import { FloatingStars } from "@/components/ui/floating-stars";
import { Floating3DElements, Floating3DCubes, Floating3DSpheres } from "@/components/ui/floating-3d-elements";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import { trackViewContent } from "@/lib/conversion-tracking";



export default function Home() {
  // Inicializar tracking ao carregar a página
  useEffect(() => {
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
      
      {/* 3D Elements */}
      <Floating3DElements className="fixed inset-0 z-0" density="medium" />
      <Floating3DCubes className="fixed inset-0 z-0" />
      <Floating3DSpheres className="fixed inset-0 z-0" />
      
      {/* Content with proper z-index */}
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <ProblemSection />
        <VSLSection />
        <SleepPlanningSection />
        <VideoPreviewSection />
        <EbookContentSection />
        <TestimonialsSection />

        <LazySection>
          <ObjectionsSection />
        </LazySection>
        <PricingSection />
        <AuthorSection />
        <FAQSection />
        <Footer />
      </div>
      

    </div>
  );
}
