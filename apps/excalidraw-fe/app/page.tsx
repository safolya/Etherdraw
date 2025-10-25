
import { HeroSection } from "../components/landing/hero-section";
import { FeatureSection } from "../components/landing/feature-section";
import { CTASection } from "../components/landing/cta-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <HeroSection />
      <FeatureSection />
      <CTASection />
    </main>
  );
}
