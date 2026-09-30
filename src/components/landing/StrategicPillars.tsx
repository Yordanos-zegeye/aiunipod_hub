import { Bot, CheckCircle2, Cpu, Database, Eye, FileCode2, HardDrive, Layers, Network, Palette, Rocket, ShieldCheck, Terminal, Users, Zap } from "lucide-react";
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
      staggerChildren: 0.1,
    },
  },
};

export function StrategicPillars() {
  const components = [
    {
      number: "01",
      title: "AI & Robotics Lab",
      subtitle: "High-Performance Workstations & Edge Hardware",
      badge: "Core Engineering",
      icon: Cpu,
      description:
        "A specialized R&D environment equipped with high-performance GPU workstations, edge devices, robotics kits, and AI simulation platforms where researchers and innovators collaborate on cognitive computing.",
      highlights: [
        "Dedicated GPU Workstations (256 GB RAM, NVMe)",
        "NVIDIA A100-equivalent model training & inference capacity",
        "Edge computing nodes for satellite & sensor low-latency processing",
      ],
    },
    {
      number: "02",
      title: "Design Lab",
      subtitle: "Human-centered design & iterative prototyping",
      badge: "Productization",
      icon: Palette,
      description:
        "Dedicated creative space supporting human-centered product design, usability testing, and rapid iterative prototyping to transform experimental models into intuitive tools for frontline users.",
      highlights: [
        "Five 75-inch interactive smart panels for co-design sprints",
        "Field user experience & interface usability testing",
        "Modular breakout spaces for agile team collaboration",
      ],
    },
    {
      number: "03",
      title: "Technology Transfer Office (TTO)",
      subtitle: "IP protection, patenting & commercial pathways",
      badge: "Commercialization",
      icon: FileCode2,
      description:
        "Helps student innovators, researchers, and early founders protect their intellectual property, navigate university-industry technology transfer, and formalize commercialization partnerships.",
      highlights: [
        "Patent filing & IP licensing guidance with Ethiopian authorities",
        "Academic-industry technology transfer agreements",
        "Equity arrangements for sustainable university revenue share",
      ],
    },
    {
      number: "04",
      title: "AI Training & Skills Development",
      subtitle: "200+ individuals trained (30% women target)",
      badge: "Human Capital",
      icon: Users,
      description:
        "Structured foundational and advanced bootcamps delivering hands-on modules in Python for data science, machine learning, computer vision, natural language processing, and embedded AI.",
      highlights: [
        "Foundational 2–4 week bootcamps (~50 trainees per cohort)",
        "Advanced workshops in Transformers, GANs, and Kubernetes",
        "Cloud-hosted LMS offering continuous blended learning",
      ],
    },
    {
      number: "05",
      title: "AI Ethics & Responsible Innovation",
      subtitle: "AU Continental Strategy & UNESCO compliance",
      badge: "Governance",
      icon: ShieldCheck,
      description:
        "Fosters inclusive, transparent, and accountable AI systems through multidisciplinary policy labs, data governance frameworks, and oversight by an Ethics Advisory Board.",
      highlights: [
        "Ethics Advisory Board (law, public health, data science experts)",
        "Aligned with African Union Continental AI Strategy & UNESCO",
        "Zero-trust cybersecurity suite & role-based access management",
      ],
    },
    {
      number: "06",
      title: "Startup Incubation & Acceleration",
      subtitle: "timbuktoo Pan-African Innovation Pipeline",
      badge: "Acceleration",
      icon: Rocket,
      description:
        "Part-time 3–6 month incubator clinics and 20-fellow tracks providing seed grants up to USD $5,000, 1-on-1 mentorship, and direct feeding into the 10 thematic pan-African timbuktoo hubs.",
      highlights: [
        "Seed funding up to USD $5,000 per early-stage prototype team",
        "20 mid-career fellowship tracks with government liaisons",
        "Direct bridge into 10 thematic timbuktoo hubs across Africa",
      ],
    },
  ];

  const infrastructureSpecs = [
    {
      label: "Computing Workstations",
      value: "85x AI GPU Workstations",
      detail: "Equipped with NVIDIA A100–equivalent GPUs, 256 GB RAM, and high-speed NVMe storage for fine-tuning and inference.",
      icon: Cpu,
    },
    {
      label: "Central Data Server",
      value: "1 Petabyte Secure Storage",
      detail: "Integrated with Government AI data center at EAII, redundant 10 Gbps networking, UPS & generator backup (PUE < 1.5).",
      icon: HardDrive,
    },
    {
      label: "Regional Edge Nodes",
      value: "4 Compact Hub Stations",
      detail: "Deployed in regional centers for low-latency processing of satellite imagery and agricultural sensor data.",
      icon: Network,
    },
    {
      label: "Facility & Connectivity",
      value: "800 m² & 200 Mbps VPN",
      detail: "Located at newly renovated EAII HQ in central Addis Ababa, with 5x 75-inch smart panels and dedicated symmetrical fiber.",
      icon: Zap,
    },
  ];

  return (
    <section id="pillars" className="relative bg-ink py-24 text-on-ink sm:py-32">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-brand-blue/10 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariants}
          className="max-w-3xl"
        >
          <h2 className="font-display text-4xl font-bold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            An integrated center of <span className="text-brand-blue">AI excellence.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-ink/70 sm:text-lg">
            The AI UniPod functions through six interlocked components—providing cutting-edge hardware, design labs, skills training, IP transfer, and pan-African incubation.
          </p>
        </motion.div>

        {/* 6 Components Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainerVariants}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {components.map((comp) => {
            const Icon = comp.icon;
            return (
              <motion.div
                key={comp.title}
                variants={fadeUpVariants}
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.2 } }}
                className="group relative flex flex-col justify-between rounded-2xl border border-on-ink/10 bg-on-ink/[0.03] p-7 backdrop-blur-md transition-colors hover:border-brand-blue/40 hover:bg-on-ink/[0.06]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-bold tracking-widest text-on-ink/40">
                      {comp.number}
                    </span>
                    <span className="rounded-full border border-brand-blue/30 bg-brand-blue/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand-blue">
                      {comp.badge}
                    </span>
                  </div>

                  <div className="mt-7 flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-on-ink/10 text-brand-blue transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="size-6" />
                    </div>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-on-ink transition-colors group-hover:text-brand-blue">
                    {comp.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-brand-blue/80">
                    {comp.subtitle}
                  </p>
                  <p className="mt-3.5 text-xs leading-relaxed text-on-ink/65 sm:text-sm">
                    {comp.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-on-ink/10 pt-4">
                  <ul className="space-y-2">
                    {comp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-on-ink/75">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-brand-blue" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Technical Infrastructure Deep Dive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 rounded-3xl border border-on-ink/15 bg-on-ink/[0.03] p-8 sm:p-12"
        >
          <div className="max-w-2xl">
            <h3 className="font-display text-2xl font-bold text-on-ink sm:text-3xl">
              High-Performance Infrastructure & Compute
            </h3>
            <p className="mt-2 text-xs text-on-ink/70 sm:text-sm">
              Integrated with the Ethiopian Artificial Intelligence Institute’s sovereign data center and dedicated high-performance GPU workstations.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerVariants}
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {infrastructureSpecs.map((spec) => {
              const SpecIcon = spec.icon;
              return (
                <motion.div
                  key={spec.label}
                  variants={fadeUpVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="rounded-2xl border border-on-ink/10 bg-on-ink/[0.02] p-5 transition-colors hover:border-brand-blue/30 hover:bg-on-ink/[0.04]"
                >
                  <SpecIcon className="size-5 text-brand-blue" />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-on-ink/50">
                    {spec.label}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-on-ink">
                    {spec.value}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-on-ink/65">
                    {spec.detail}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}