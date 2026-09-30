import { ArrowUpRight, Calendar, CheckCircle2, Clock, Cpu, MapPin, Rocket, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export function CohortTimeline() {
  const deploymentPhases = [
    {
      phase: "Phase 1",
      timeline: "Q3 2025 – Q4 2025",
      title: "Core Infrastructure & Baseline Pilot",
      badge: "Foundational Setup",
      description:
        "Establishment of physical and computing facilities, government baseline digital readiness mapping, and the inaugural training bootcamp.",
      activities: [
        "Deploy 10x high-performance GPU workstations & 5x 75-inch smart panels",
        "Integrate with EAII AI data center (1 PB storage, 10 Gbps networking)",
        "Conduct baseline digital maturity assessments for federal ministries",
        "Launch inaugural AI bootcamp for 50 early-adopter students and civil servants",
      ],
    },
    {
      phase: "Phase 2",
      timeline: "Q1 2026 – Q2 2026",
      title: "Full Program Expansion & Policy Dialogues",
      badge: "Scale & Incubation",
      description:
        "Rolling out specialized domain bootcamps, startup incubator clinics in national priority sectors, and ethical regulatory roundtables.",
      activities: [
        "Specialized tracks: Natural Language Processing, Computer Vision, & Data Analytics",
        "Incubation clinics & solution studios in Agriculture, Healthcare, and Education",
        "Convene national policy workshops drafting Ethiopia’s National AI Strategy",
        "Deploy dynamic M&E dashboard tracking GPU uptime, learning, and pilot outputs",
      ],
    },
    {
      phase: "Phase 3",
      timeline: "Q3 2026 & Beyond",
      title: "Sustainability, Regional Outreach & Pan-African Node",
      badge: "National Rollout",
      description:
        "Transitioning to a hybrid cost-recovery model, taking AI to secondary regional cities via mobile labs, and formalizing pan-African alliances.",
      activities: [
        "Deploy mobile AI labs to Bahir Dar, Hawassa, and Mekelle for underserved regions",
        "Activate tiered fee structure: 100% subsidy for micro/small, 40-50% for medium/large",
        "Form academic cost-sharing partnerships with AAU and Ethiopian Institute of Technology",
        "Partner with UNDP Nigeria parallel node for Trans-African AI Hackathons & Alliance Charter",
      ],
    },
  ];

  const eligibilityTiers = [
    {
      tier: "Micro & Small Enterprises",
      sub: "< 50 employees",
      model: "100% Fully Subsidized",
      detail: "Full subsidy for UniPod services, prototype support, GPU access, and seed grants up to $5,000.",
    },
    {
      tier: "Public Administration",
      sub: "Ministries & State Agencies",
      model: "100% Fully Subsidized",
      detail: "Advisory, digital maturity audits, and immersion training for civil servants co-financed by UNDP & government.",
    },
    {
      tier: "Medium & Large Enterprises",
      sub: "> 50 employees",
      model: "40% – 50% Subsidized",
      detail: "Co-financing model for commercial scale-ups utilizing high-performance GPU compute clusters.",
    },
    {
      tier: "Academic & Research",
      sub: "AAU, Polytechnics & Labs",
      model: "Collaborative Grants",
      detail: "Shared laboratory access, student project co-supervision, and research fellowship tracks.",
    },
  ];

  return (
    <section id="roadmap" className="relative border-b border-border bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="size-3 text-amber-500" />
              Table 1: Strategic Concept Roadmap
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Phased Deployment Plan & Next Steps
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Structured execution plan establishing sovereign AI compute at the Ethiopian Artificial Intelligence Institute, expanding into national priority sectors, and scaling across Ethiopia and Africa.
            </p>
          </div>
        </div>

        {/* 3 Phased Deployment Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {deploymentPhases.map((phase) => (
            <div
              key={phase.phase}
              className="flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-xs transition-all duration-150 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-bold text-primary">
                    {phase.phase}
                  </span>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-foreground/80">
                    {phase.badge}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Clock className="size-3.5 text-primary" />
                  <span>{phase.timeline}</span>
                </div>

                <h3 className="mt-3 font-display text-2xl font-bold text-foreground">
                  {phase.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {phase.description}
                </p>

                <div className="mt-6 border-t border-border/70 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
                    Core Activities (Table 1):
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {phase.activities.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 12: Eligibility, Access & Financial Tiers */}
        <div className="mt-20">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Section 11 & 12 · Strategic Concept Note
            </span>
            <h3 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
              Access Policies & Tiered Subsidy Model
            </h3>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
              Designed to eliminate financial barriers for early-stage innovators while maintaining long-term financial sustainability through co-financing.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {eligibilityTiers.map((tier) => (
              <div
                key={tier.tier}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs"
              >
                <div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                    {tier.model}
                  </span>
                  <h4 className="mt-4 font-display text-lg font-bold text-foreground">{tier.tier}</h4>
                  <p className="text-xs font-medium text-muted-foreground">{tier.sub}</p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {tier.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incubation Clinics & Fellowship Application Callout Banner */}
        <div id="journey" className="mt-16 rounded-3xl border border-primary/20 bg-linear-to-br from-primary/5 via-background to-secondary/30 p-8 sm:p-12 lg:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Incubation Clinics & Fellowship Tracks
              </div>
              <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Build high-impact solutions with high-performance GPU computing.
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Promising prototype teams receive <strong>up to USD $5,000 seed funding</strong>, 1-on-1 mentorship, access to 10x high-performance GPU workstations at EAII headquarters, and direct channels into the <strong>10 thematic timbuktoo hubs</strong> across Africa. Priority given to female-led teams and inclusive social enterprises.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-foreground/80 sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary" /> Ethiopian registered micro/small enterprise or student team
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary" /> Priority in Agriculture, Healthcare, Education, or Finance
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary" /> 30% women participation priority
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Incubation Window</p>
                <div className="mt-2 flex items-center gap-2 font-display text-lg font-bold">
                  <Calendar className="size-4 text-primary" />
                  <span>Phase 1 Pilot & Phase 2 Cohorts</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Includes 20 mid-career fellowship tracks with dedicated government liaisons.
                </p>
              </div>

              <Button asChild size="lg" className="h-12 w-full rounded-xl text-base font-semibold shadow-md">
                <a href="#connect">
                  Apply for UniPod Incubation <ArrowUpRight className="ml-2 size-4" />
                </a>
              </Button>

              <p className="text-center text-[11px] text-muted-foreground">
                Fully subsidized for micro & small enterprises · Sponsored by UNDP timbuktoo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
