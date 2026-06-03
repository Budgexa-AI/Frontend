import HeroSection from "@/components/landing/HeroSection";
import BanksSection from "@/components/landing/BanksSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import SmartInsightSection from "@/components/landing/SmartInsightSection";

export default function LandingPage() {
  return (
    <main className="relative overflow-x-hidden">
      <HeroSection />
      <BanksSection />
      <FeaturesSection />
      <SmartInsightSection />
    </main>
  );
}