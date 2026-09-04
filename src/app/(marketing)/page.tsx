// app/(marketing)/page.tsx
import HeroSection from "@/components/landing/HeroSection";
import ProductNavStrip from "@/components/landing/ProductNavStrip";
import ManifestoSection from "@/components/landing/ManifestoSection";
import StatementSection from "@/components/landing/StatementSection";
import DashboardSection from "@/components/landing/DashboardSection";
import ImpactSection from "@/components/landing/ImpactSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import TrustSection from "@/components/landing/TrustSection";

export default function LandingPage() {
  return (
    <main className="relative overflow-x-hidden bg-[#FBF9F5]">
      <HeroSection />
      <ProductNavStrip />
      <ManifestoSection />
      <StatementSection />
      <DashboardSection />
      <ImpactSection />
      <TestimonialsSection />
      <TrustSection />
    </main>
  );
}