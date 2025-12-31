import Navigation from "@/components/landingPage/Navigation";
import HeroSection from "@/components/landingPage/HeroSection";
import StatsSection from "@/components/landingPage/StatsSection";
import RetailerSection from "@/components/landingPage/RetailerSection";
import PatientSection from "@/components/landingPage/PatientSection";
import PricingSection from "@/components/landingPage/PricingSection";
import TestimonialsSection from "@/components/landingPage/TestimonialsSection";
import Footer from "@/components/landingPage//Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <StatsSection />
        <RetailerSection />
        <PatientSection />
        <TestimonialsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
