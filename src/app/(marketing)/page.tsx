// app/page.tsx (or wherever LandingPage lives)
import HeroSection from "@/components/landing/HeroSection";
import ProductNavStrip from "@/components/landing/ProductNavStrip";
import ManifestoSection from "@/components/landing/ManifestoSection";
import StatementSection from "@/components/landing/StatementSection";
import ProductStorySection from "@/components/landing/ProductStory";
import FeaturesGridSection from "@/components/landing/FeaturesSection";
import TrustSection from "@/components/landing/TrustSection";
import CommunitySection from "@/components/landing/CommunitySection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import Marquee from "@/components/landing/Marquee";

export default function LandingPage() {
  return (
    <main className="relative overflow-x-hidden">
      <HeroSection />
      <ProductNavStrip />
      <ManifestoSection />
      <StatementSection />
      <ProductStorySection />
      <Marquee text="With Budgexa, you're always in control of your money." bg="bg-Budgexa-orange" fg="text-Budgexa-green" />
      <FeaturesGridSection />
      <TrustSection />
      <TestimonialsSection />
      <CommunitySection />
    </main>
  );
}