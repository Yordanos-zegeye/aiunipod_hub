import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

// ─── Critical above-the-fold: eagerly loaded ───────────────────────────────
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { DynamicMarquee } from "@/components/landing/DynamicMarquee";
import { ScrollProgress } from "@/components/landing/ScrollProgress";

// ─── Below-the-fold: lazy-loaded so initial JS bundle stays small ──────────
const MissionSection   = lazy(() => import("@/components/landing/MissionSection").then(m => ({ default: m.MissionSection })));
const StrategicPillars = lazy(() => import("@/components/landing/StrategicPillars").then(m => ({ default: m.StrategicPillars })));
const VentureDirectory = lazy(() => import("@/components/landing/VentureDirectory").then(m => ({ default: m.VentureDirectory })));
const EcosystemImpact  = lazy(() => import("@/components/landing/EcosystemImpact").then(m => ({ default: m.EcosystemImpact })));
const FaqSection       = lazy(() => import("@/components/landing/FaqSection").then(m => ({ default: m.FaqSection })));
const CtaSection       = lazy(() => import("@/components/landing/CtaSection").then(m => ({ default: m.CtaSection })));
const LandingFooter    = lazy(() => import("@/components/landing/LandingFooter").then(m => ({ default: m.LandingFooter })));

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

/** Minimal section-level skeleton shown while a lazy chunk loads */
function SectionSkeleton() {
  return (
    <div className="w-full py-24 sm:py-32 flex items-center justify-center" aria-hidden="true">
      <span className="h-1.5 w-16 rounded-full bg-border animate-pulse" />
    </div>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-body text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* 1. Glassmorphic Header & Mobile Drawer — critical, always eager */}
      <LandingHeader />

      <main>
        {/* 2. Hero — critical, always eager */}
        <LandingHero />

        {/* 3. Marquee — lightweight, always eager */}
        <DynamicMarquee />

        {/* 4–10. Lazy-loaded below-the-fold sections */}
        <Suspense fallback={<SectionSkeleton />}>
          <MissionSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <StrategicPillars />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <VentureDirectory />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <EcosystemImpact />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <FaqSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <CtaSection />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <LandingFooter />
      </Suspense>
    </div>
  );
}
