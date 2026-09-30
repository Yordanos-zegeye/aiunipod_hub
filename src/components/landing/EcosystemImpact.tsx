import { BarChart3, Globe, Heart, Shield, Sparkles, TrendingUp } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { LeadershipTestimonials } from "@/components/landing/LeadershipTestimonials";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
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

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function EcosystemImpact() {
  const metrics = [
    {
      value: "140,000+",
      label: "Smallholder Farmers Reached",
      description: "Yield forecasting and crop disease mitigation alerts delivered via SMS and USSD.",
      sdg: "SDG 2: Zero Hunger",
    },
    {
      value: "85+",
      label: "Rural Health Extension Posts",
      description: "Deploying offline Bayesian triage on entry-level Android hardware.",
      sdg: "SDG 3: Good Health & Well-being",
    },
    {
      value: "5.2M+",
      label: "Ethiopic Tokens Annotated",
      description: "Speech and text corpora powering open benchmarks for African low-resource languages.",
      sdg: "SDG 9: Industry & Innovation",
    },
    {
      value: "$4.15M+",
      label: "Follow-On Capital Pipeline",
      description: "Catalyzed through timbuktoo syndicate partners, local angels, and DFIs.",
      sdg: "SDG 8: Decent Work & Economic Growth",
    },
  ];

  return (
    <section id="impact" className="relative border-b border-border bg-ink py-24 text-on-ink sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariants}
          className="max-w-3xl"
        >
          <h2 className="font-display text-4xl font-bold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            Real intelligence solves <span className="text-brand-blue">real problems.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-on-ink/70 sm:text-lg">
            Every venture incubated at AI UNIPOD Ethiopia is engineered against concrete socio-economic benchmarks,
            ensuring applied artificial intelligence drives inclusive prosperity across the Horn of Africa.
          </p>
        </motion.div>

        {/* 4 Impact Stat Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainerVariants}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={fadeUpVariants}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-on-ink/10 bg-on-ink/[0.04] p-6 backdrop-blur-md transition-colors hover:border-brand-blue/40 hover:bg-on-ink/[0.07]"
            >
              <span className="inline-block rounded-full bg-brand-blue/15 px-2.5 py-0.5 text-[10px] font-bold text-brand-blue">
                {metric.sdg}
              </span>
              <p className="mt-6 font-display text-4xl font-bold tracking-tight text-on-ink sm:text-5xl">
                {metric.value}
              </p>
              <h3 className="mt-2 font-display text-base font-semibold text-on-ink">
                {metric.label}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-on-ink/60">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Leadership Testimonials Slideshow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <LeadershipTestimonials />
        </motion.div>
      </div>
    </section>
  );
}