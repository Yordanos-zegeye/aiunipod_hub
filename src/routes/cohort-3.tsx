import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Building,
  Calendar,
  CheckCircle2,
  Cpu,
  Database,
  FileCheck,
  Globe2,
  Layers,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";

import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/button";
import { STARTUPS } from "@/data/startups";

const TITLE = "Apply for Cohort 3 Incubation — AI UNIPOD Ethiopia";
const DESCRIPTION =
  "Apply for Cohort 3 of AI UNIPOD Ethiopia. Selected ventures receive high-performance GPU workstations compute, up to $5,000 seed grants, and living lab incubation.";

export const Route = createFileRoute("/cohort-3")({
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
  component: Cohort3Page,
});

function Cohort3Page() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    teamName: "",
    founderName: "",
    founderEmail: "",
    founderPhone: "",
    sector: "Agriculture",
    prototypeStage: "Working Prototype",
    summary: "",
    computeNeeds: "Dedicated GPU slots for training & inference",
    teamSize: "2-5 members",
    demoLink: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-background font-body text-foreground">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Back to Home
            </Link>
            <span className="text-muted-foreground/40">|</span>
            <Link to="/" className="flex items-center">
              <img
                src="/aiunipod-logo.webp"
                alt="AI UNIPOD powered by timbuktoo"
                loading="lazy"
                decoding="async"
                width="144"
                height="32"
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="rounded-full text-xs font-semibold">
              <Link to="/startups">View Startups</Link>
            </Button>
            <Button asChild size="sm" className="rounded-full text-xs font-semibold">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-20 lg:px-12">
        {/* Hero Banner */}
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Cohort 3 Application
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Join the next generation of African founders transforming research and local data into scalable AI solutions.
            Powered by the <strong>timbuktoo</strong> initiative in partnership with the Ethiopian Artificial Intelligence Institute (EAII) and Addis Ababa University (AAU).
          </p>
        </div>

        {/* Institutional Accreditation Strip */}
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-6 rounded-2xl border border-border/80 bg-card/70 p-4 shadow-xs backdrop-blur-md">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Accrediting Partners:
          </span>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <img
                src="/partners/eaii-logo.webp"
                alt="EAII"
                className="size-7 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/partners/eaii-logo.png";
                }}
              />
              <span className="text-xs font-semibold text-foreground">EAII (Host Institute)</span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="/partners/aau-logo.webp"
                alt="AAU"
                className="size-7 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/partners/aau-logo.png";
                }}
              />
              <span className="text-xs font-semibold text-foreground">Addis Ababa University</span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="/partners/undp-logo.webp"
                alt="UNDP"
                className="size-7 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/partners/undp-logo.png";
                }}
              />
              <span className="text-xs font-semibold text-foreground">UNDP · timbuktoo</span>
            </div>
          </div>
        </div>

        {/* Benefits Strip */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
            <Cpu className="size-5 text-primary" />
            <h3 className="mt-3 font-display text-base font-bold text-foreground">Sovereign Compute</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Direct access to 85 high-performance GPU workstations and EAII data center storage.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
            <Rocket className="size-5 text-primary" />
            <h3 className="mt-3 font-display text-base font-bold text-foreground">Seed Funding</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Up to USD $5,000 catalytic grant per prototype team (100% subsidized for small teams).
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
            <Building className="size-5 text-primary" />
            <h3 className="mt-3 font-display text-base font-bold text-foreground">800 m² Living Lab</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Dedicated makerspace, robotics kits, and design studio at EAII headquarters.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
            <Globe2 className="size-5 text-primary" />
            <h3 className="mt-3 font-display text-base font-bold text-foreground">Pan-African Scale</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Direct bridge to timbuktoo’s 10 thematic innovation hubs across Africa.
            </p>
          </div>
        </div>

        {/* Currently Incubated Cohort 3 Ventures */}
        <div className="mt-14 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Rocket className="size-3.5" /> Active Living Lab Roster
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-foreground">
                Currently Incubated in Cohort 3 ({STARTUPS.filter((s) => s.cohort === "Cohort 3").length} Ventures)
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Explore sovereign AI teams accelerating at the EAII living lab facility in Addis Ababa.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="rounded-full text-xs">
              <Link to="/startups">
                Explore Full Directory <ArrowRight className="ml-1 size-3" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STARTUPS.filter((s) => s.cohort === "Cohort 3").map((startup) => (
              <div
                key={startup.slug}
                className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between transition-all hover:border-primary/40 hover:shadow-md"
                style={{ borderTopColor: startup.theme.primary_color, borderTopWidth: "3px" }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {startup.sector}
                    </span>
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {startup.investment_ask.round}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-foreground">{startup.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{startup.tagline}</p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {startup.products.map((p) => (
                      <span key={p.name} className="rounded border border-border bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground">
                        {p.name} ({p.stage})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">{startup.location.split(",")[0]}</span>
                  <Link
                    to="/$startupSlug"
                    params={{ startupSlug: startup.slug }}
                    className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Venture Profile <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form or Success Notice */}
        <div className="mt-14 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10 lg:p-12">
          {submitted ? (
            <div className="py-12 text-center animate-rise">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="size-8" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold text-foreground sm:text-3xl">
                Application Received!
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
                Thank you, <strong>{formData.founderName || "Founder"}</strong>. Your application for <strong>{formData.teamName || "your venture"}</strong> has been registered in the AI UNIPOD Cohort 3 intake pipeline.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full">
                  Edit Application
                </Button>
                <Button asChild className="rounded-full">
                  <Link to="/startups">Explore Current Startups</Link>
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Founder & Venture Details
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Provide your team information to begin the admissions review.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground">Venture / Project Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    placeholder="e.g. AgroVision AI"
                    className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground">Lead Founder Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.founderName}
                    onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                    placeholder="e.g. Almaz Tadesse"
                    className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.founderEmail}
                    onChange={(e) => setFormData({ ...formData, founderEmail: e.target.value })}
                    placeholder="founder@example.com"
                    className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.founderPhone}
                    onChange={(e) => setFormData({ ...formData, founderPhone: e.target.value })}
                    placeholder="+251 91 234 5678"
                    className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground">Primary Sector *</label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Agriculture">Agriculture & Food Security</option>
                    <option value="Healthcare">Healthcare & Clinical Diagnostics</option>
                    <option value="Language AI">Language AI & Ethiopic NLP</option>
                    <option value="Fintech">Financial Technology & Inclusion</option>
                    <option value="Climate">Climate AI & Water Management</option>
                    <option value="Robotics">Robotics & Edge Hardware</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground">Current Prototype Stage *</label>
                  <select
                    value={formData.prototypeStage}
                    onChange={(e) => setFormData({ ...formData, prototypeStage: e.target.value })}
                    className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Idea with Academic Research">Idea with Academic Research</option>
                    <option value="Early Proof of Concept">Early Proof of Concept</option>
                    <option value="Working Prototype">Working Prototype</option>
                    <option value="Pilot in the Field">Pilot in the Field with Users</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">
                  Problem Statement & Solution Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Describe the challenge you are solving in Ethiopia/Africa and how your AI model addresses it..."
                  className="w-full rounded-xl border border-input bg-background p-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground">
                    Estimated Compute / Lab Needs
                  </label>
                  <input
                    type="text"
                    value={formData.computeNeeds}
                    onChange={(e) => setFormData({ ...formData, computeNeeds: e.target.value })}
                    placeholder="e.g. GPU workstation slots, satellite data ingestion..."
                    className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground">
                    Prototype Demo / Repository / Deck Link
                  </label>
                  <input
                    type="url"
                    value={formData.demoLink}
                    onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                    placeholder="https://github.com/... or Google Drive link"
                    className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  Applications are reviewed on a rolling basis. Priority given to inclusive and female-led teams.
                </p>
                <Button type="submit" size="lg" className="rounded-full px-8 font-semibold">
                  Submit Cohort 3 Application <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
