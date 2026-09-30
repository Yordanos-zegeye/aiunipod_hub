import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section id="connect" className="relative bg-ink py-24 text-on-ink sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Main Headline */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-normal sm:text-6xl lg:text-7xl">
              Build what Africa needs next.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-md text-sm leading-relaxed text-on-ink/70 sm:text-base"
          >
            Whether you are an ambitious technical founder, an institutional venture investor, or a global research partner — there is a place for you at AI UNIPOD Ethiopia.
          </motion.p>
        </div>

        {/* Dual Track Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Card 1: For Founders */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-on-ink/15 bg-on-ink/[0.04] p-8 transition-colors hover:border-brand-blue/40 hover:bg-on-ink/[0.06] sm:p-10"
          >
            <div>
              <h3 className="font-display text-3xl font-bold text-on-ink">
                For Technical Founders
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-on-ink/70 sm:text-base">
                Access dedicated high-performance GPU computing, 1 PB storage at the EAII data center, mentorship from resident researchers, seed funding, and a verified profile on this platform.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-on-ink/80 sm:text-sm">
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-brand-blue" />
                  <span>Up to $5,000 seed grant per team (100% subsidy for micro/small ventures)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-brand-blue" />
                  <span>800 m² physical lab at EAII Headquarters in Addis Ababa</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-brand-blue" />
                  <span>Direct bridge to timbuktoo’s 10 thematic innovation hubs across Africa</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button asChild size="lg" className="h-12 rounded-full bg-brand-blue px-7 text-sm font-semibold text-ink shadow-md hover:bg-brand-blue/90">
                  <Link to="/cohort-3">
                    Apply for Cohort 3 <ArrowUpRight className="ml-1.5 size-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Card 2: For Investors & Partners */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-on-ink/15 bg-on-ink/[0.04] p-8 transition-colors hover:border-amber-400/40 hover:bg-on-ink/[0.06] sm:p-10"
          >
            <div>
              <h3 className="font-display text-3xl font-bold text-on-ink">
                For Investors & Partners
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-on-ink/70 sm:text-base">
                Access pre-vetted, high-retention AI ventures building defensible technology in high-growth African markets.
                Review dynamic data rooms and participate in curated Demo Days.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-on-ink/80 sm:text-sm">
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-amber-400" />
                  <span>Curated venture deal flow across East Africa</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-amber-400" />
                  <span>Verified pilot metrics, IP audits, and cap tables</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-amber-400" />
                  <span>Co-investment syndicates powered by the timbuktoo initiative</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button asChild size="lg" className="h-12 rounded-full bg-amber-500 px-6 text-sm font-semibold text-ink shadow-md hover:bg-amber-400">
                  <Link to="/startups">
                    Explore Startups Directory <ArrowUpRight className="ml-1.5 size-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full border-on-ink/20 bg-transparent text-sm font-semibold text-on-ink hover:bg-on-ink/10"
                >
                  <a href="mailto:unipod.ethiopia@undp.org">Contact Hub Desk</a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}