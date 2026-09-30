import { ArrowDown, MoveRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";

import { NeuralCanvas } from "@/components/landing/NeuralCanvas";
import { SplineStage } from "@/components/landing/SplineStage";
import { Button } from "@/components/ui/button";
import { STARTUPS } from "@/data/startups";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 24,
      stiffness: 140,
    },
  },
};

const statsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.45,
    },
  },
};

const statItemVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 150,
    },
  },
};

export function LandingHero() {
  const quickMetrics = [
    { label: "Computing Workstations", value: "85 Workstations", sub: "high-performance GPU cluster" },
    { label: "Living Lab Facility", value: "800 m²", sub: "renovated EAII HQ Addis Ababa" },
    { label: "Human Capital Target", value: "200+", sub: "certified (30% women target)" },
    { label: "Central Data Storage", value: "1 Petabyte", sub: "government AI data center" },
  ];

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-between overflow-hidden border-b border-border pt-24 sm:pt-28 lg:pt-32">
      {/* 1. Ambient Generative Neural Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <NeuralCanvas />
      </div>

      {/* 2. Interactive Spline 3D Stage (loads asynchronously with graceful fallback) */}
      <div className="absolute inset-0 z-1 lg:left-[36%]">
        <SplineStage />
      </div>

      {/* 3. Gradient Light Wash to ensure readability */}
      <div className="pointer-events-none absolute inset-0 z-2 bg-hero-wash" />

      {/* 4. Hero Content Layer - pointer-events-none allows cursor events to reach Spline 3D */}
      <div className="pointer-events-none relative z-10 mx-auto flex w-full flex-1 max-w-[1440px] flex-col justify-between px-5 pb-8 sm:px-8 sm:pb-10 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="pointer-events-auto my-auto max-w-[760px] py-6 sm:py-8 lg:py-10"
        >
          {/* Display Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-[clamp(2.75rem,5.5vw,5.5rem)] font-bold leading-[0.92] tracking-normal"
          >
            Where Intelligence<br />
            Meets <span className="text-primary">Impact.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl"
          >
            Ethiopia's living lab for applied artificial intelligence—anchored at the Ethiopian Artificial Intelligence Institute (EAII) in collaboration with Addis Ababa University and powered by the timbuktoo initiative to co-create AI solutions for national development, inclusion, and sovereign innovation.
          </motion.p>

          {/* Institutional Partner Bar */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3 rounded-2xl border border-border/70 bg-card/60 px-3.5 py-2 backdrop-blur-md w-fit shadow-2xs"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              National Initiative:
            </span>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <img
                  src="/partners/eaii-logo.webp"
                  alt="EAII"
                  width="20"
                  height="20"
                  className="size-5 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/partners/eaii-logo.png";
                  }}
                />
                EAII
              </span>
              <span className="text-border/80">·</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <img
                  src="/partners/aau-logo.webp"
                  alt="AAU"
                  width="20"
                  height="20"
                  className="size-5 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/partners/aau-logo.png";
                  }}
                />
                AAU
              </span>
              <span className="text-border/80">·</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <img
                  src="/partners/undp-logo.webp"
                  alt="UNDP"
                  width="20"
                  height="20"
                  className="size-5 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/partners/undp-logo.png";
                  }}
                />
                UNDP timbuktoo
              </span>
            </div>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div variants={itemVariants} className="mt-7 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="lg" className="group h-12 rounded-full px-6 text-sm font-semibold shadow-md sm:h-13 sm:px-7 sm:text-base">
                <Link to="/startups">
                  Explore Startups
                  <MoveRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-border/80 bg-background/80 px-6 text-sm font-semibold backdrop-blur-md sm:h-13 sm:px-7 sm:text-base"
              >
                <Link to="/cohort-3">
                  <Sparkles className="mr-2 size-4 text-amber-500" />
                  Apply for Cohort 3
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 5. Quick Impact Telemetry Strip */}
        <motion.div
          variants={statsContainerVariants}
          initial="hidden"
          animate="visible"
          className="pointer-events-auto relative z-10 mt-8 border-t border-border/80 pt-6"
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
            {quickMetrics.map((stat) => (
              <motion.div
                key={stat.label}
                variants={statItemVariants}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group cursor-default rounded-xl p-2 transition-colors hover:bg-muted/40"
              >
                <p className="font-display text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl lg:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-foreground/90 sm:text-sm">
                  {stat.label}
                </p>
                <p className="text-[11px] text-muted-foreground sm:text-xs">
                  {stat.sub}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Down Scroll Trigger centered below telemetry strip with proper clearance */}
          <div className="mt-6 flex justify-center pb-2">
            <motion.a
              href="#mission"
              aria-label="Scroll to discover mission"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background/80 shadow-xs backdrop-blur-md transition-colors hover:bg-accent"
            >
              <ArrowDown className="size-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
