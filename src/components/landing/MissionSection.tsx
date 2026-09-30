import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
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
      staggerChildren: 0.12,
    },
  },
};

export function MissionSection() {
  const challenges = [
    {
      title: "Capacity & Compute Access",
      subtitle: "Closing the talent and hardware divide",
      description:
        "Addressing the critical shortage of trained AI professionals in Ethiopia—especially women—by provisioning 85 high-performance GPU workstations, 1 PB storage at the EAII data center, and intensive training for 200+ individuals.",
    },
    {
      title: "Ecosystem Coordination",
      subtitle: "Uniting fragmented national initiatives",
      description:
        "Serving as the single convergence point bringing together federal ministries, Addis Ababa University researchers, and tech entrepreneurs to eliminate redundancies and co-create high-impact pilots.",
    },
    {
      title: "Policy & Ethical Alignment",
      subtitle: "Sovereign governance & accountability",
      description:
        "Providing evidence-based advisory services to guide Ethiopia’s National AI Strategy, establishing an Ethics Advisory Board, and aligning data protection frameworks with the African Union Continental AI Strategy and UNESCO guidelines.",
    },
  ];

  const partners = [
    {
      name: "Ethiopian Artificial Intelligence Institute (EAII)",
      badge: "Host Institute",
      role: "Provides the 800 m² physical space at its newly renovated Addis Ababa headquarters, core data center integration (1 PB storage, 10 Gbps networking), and day-to-day operational management.",
      logo: "/partners/eaii-logo.webp",
      fallbackLogo: "/partners/eaii-logo.png",
      url: "https://ai.et/",
    },
    {
      name: "Addis Ababa University (AAU)",
      badge: "Collaborating Entity",
      role: "Integrates academic research, launches specialized AI degree & certification programs, facilitates faculty and student talent, and provides long-term stewardship via its Center of Excellence in AI.",
      logo: "/partners/aau-logo.webp",
      fallbackLogo: "/partners/aau-logo.png",
      url: "http://www.aau.edu.et/",
    },
    {
      name: "UNDP · timbuktoo Initiative",
      badge: "Innovation & Technology Partner",
      role: "Provides initial seed funding, equipment facilitation, international AI expert mentorship, and links Ethiopian founders with 10 pan-African timbuktoo hubs.",
      logo: "/partners/undp-logo.webp",
      fallbackLogo: "/partners/undp-logo.png",
      url: "https://www.undp.org/ethiopia",
    },
  ];

  return (
    <section id="mission" className="relative border-b border-border bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariants}
          className="max-w-3xl"
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Where intelligence meets <span className="text-primary">national impact.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Artificial Intelligence UniPod Ethiopia is a national center of excellence and living lab anchored in Ethiopia's existing digital infrastructure. Powered by the <strong>timbuktoo</strong> initiative as a joint partnership between the Ethiopian Artificial Intelligence Institute (EAII), Addis Ababa University (AAU), and UNDP, it bridges the gap between academia and industry—empowering civil servants, students, researchers, and entrepreneurs to co-create AI solutions that solve critical local and global challenges.
          </p>
        </motion.div>

        {/* Vision Statement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 rounded-3xl border border-primary/20 bg-linear-to-br from-primary/5 via-background to-secondary/30 p-8 sm:p-12 lg:p-14"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
                Position Ethiopia as a regional leader in applied artificial intelligence.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Guided by the National Artificial Intelligence Policy, the UniPod aligns intelligent technology with Ethiopia’s Growth and Transformation Plan. By focusing on high-impact domestic priorities in <strong>agriculture</strong> (crop health & yield monitoring), <strong>healthcare</strong> (clinical diagnostics & triage), and <strong>education</strong> (personalized learning), the UniPod turns sovereign computing power into inclusive socio-economic development.
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainerVariants}
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              {[
                { val: "800 m²", title: "Dedicated Lab", sub: "EAII Headquarters", highlight: true },
                { val: "85x", title: "Workstations", sub: "GPU Computing" },
                { val: "200+", title: "Trainees", sub: "30% women target" },
                { val: "$1M", title: "Seed Fund", sub: "Setup & equipment", highlight: true },
              ].map((badge) => (
                <motion.div
                  key={badge.title}
                  variants={fadeUpVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-2xl border border-border bg-card p-4 shadow-2xs transition-shadow hover:shadow-sm"
                >
                  <p className={`font-display text-3xl font-bold ${badge.highlight ? "text-primary" : "text-foreground"}`}>
                    {badge.val}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-foreground">{badge.title}</p>
                  <p className="text-[11px] text-muted-foreground">{badge.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* 3 Core Systemic Challenges Solved */}
        <div className="mt-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUpVariants}
            className="max-w-2xl"
          >
            <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Overcoming Ethiopia's three systemic hurdles.
            </h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainerVariants}
            className="mt-8 grid gap-6 md:grid-cols-3"
          >
            {challenges.map((c) => (
              <motion.div
                key={c.title}
                variants={fadeUpVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-7 shadow-xs transition-colors hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  <h4 className="font-display text-xl font-bold text-foreground">{c.title}</h4>
                  <p className="mt-1 text-xs font-medium text-foreground/80">{c.subtitle}</p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {c.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Multi-Stakeholder Governance Roles */}
        <div className="mt-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUpVariants}
            className="max-w-2xl"
          >
            <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Co-governed by Ethiopia's premier institutions.
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              A joint tripartite initiative bringing together government sovereign research, premier academia, and international innovation.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainerVariants}
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {partners.map((partner) => (
              <motion.div
                key={partner.name}
                variants={fadeUpVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs transition-colors hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold text-foreground">
                      {partner.badge}
                    </span>
                    <div className="flex size-12 items-center justify-center rounded-xl border border-border/80 bg-background/80 p-1.5 shadow-2xs backdrop-blur-xs">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        loading="lazy"
                        decoding="async"
                        width="44"
                        height="44"
                        onError={(e) => {
                          if (partner.fallbackLogo && e.currentTarget.src !== partner.fallbackLogo) {
                            e.currentTarget.src = partner.fallbackLogo;
                          }
                        }}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                  <h4 className="mt-5 font-display text-base font-bold text-foreground leading-snug">
                    {partner.name}
                  </h4>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {partner.role}
                  </p>
                </div>

                <div className="mt-6 border-t border-border/70 pt-3">
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    Official Website <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}