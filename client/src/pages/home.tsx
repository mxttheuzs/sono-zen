import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { MethodSection } from "@/components/landing/method-section";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { AuthorSection } from "@/components/landing/author-section";
import { FAQSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-900">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <MethodSection />
      <BenefitsSection />
      <TestimonialsSection />
      <PricingSection />
      <AuthorSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
