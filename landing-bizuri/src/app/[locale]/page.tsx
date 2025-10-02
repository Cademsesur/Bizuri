import Header from "@/components/header/Header";
import { HeroSection } from "@/components/hero/HeroSection";
import Features from "@/components/features/Features";
import HowItWorksSection from "@/components/howitwork/HowItWorks";
// import { PartnersSection } from "@/components/partners/PartnersSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import Pricing from "@/components/pricing/Pricing";
import FAQ from "@/components/faq/Faq";
import ContactSection from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <section id="features">
          <Features />
        </section>
        <section id="how-it-works">
          <HowItWorksSection />
        </section>
        <TestimonialsSection /> 
        <section id="pricing">
          <Pricing />
        </section> 
          {/* <PartnersSection /> */}
        <section id="faq">
          <FAQ />
        </section>
        <section id="contact">
          <ContactSection />
        </section> 
      </main>
      <Footer /> 
    </div>
  );
}
