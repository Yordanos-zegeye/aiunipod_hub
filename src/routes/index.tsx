import { createFileRoute } from "@tanstack/react-router";

import { CtaSection } from "@/components/landing/CtaSection";
import { DynamicMarquee } from "@/components/landing/DynamicMarquee";
import { EcosystemImpact } from "@/components/landing/EcosystemImpact";
import { FaqSection } from "@/components/landing/FaqSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { MissionSection } from "@/components/landing/MissionSection";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { StrategicPillars } from "@/components/landing/StrategicPillars";
import { VentureDirectory } from "@/components/landing/VentureDirectory";

const TITLE = "AI UNIPOD Ethiopia — Powered by timbuktoo Initiative";
const DESCRIPTION =
  "AI UNIPOD Ethiopia is a national center of excellence and living lab powered by the timbuktoo initiative in partnership with EAII and AAU, incubating sovereign AI ventures with high-performance compute.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-body text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* 1. Glassmorphic Header & Mobile Drawer */}
      <LandingHeader />

      <main>
        {/* 2. Hero with Generative Neural Canvas + Spline 3D + Telemetry */}
        <LandingHero />

        {/* 3. High-Tech Partner & Domain Marquee */}
        <DynamicMarquee />

        {/* 4. Strategic Mission & Multi-Stakeholder Mandate */}
        <MissionSection />

        {/* 5. Strategic Capabilities & Compute Pillars */}
        <StrategicPillars />

        {/* 6. Portfolio Directory & Searchable Explorer */}
        <VentureDirectory />

        {/* 7. Ecosystem Impact & Leadership Testimonials */}
        <EcosystemImpact />

        {/* 8. Interactive FAQ Accordion */}
        <FaqSection />

        {/* 9. High-Conversion Dual CTA */}
        <CtaSection />
      </main>

      {/* 10. Comprehensive Enterprise Global Footer */}
      <LandingFooter />
    </div>
  );
}
