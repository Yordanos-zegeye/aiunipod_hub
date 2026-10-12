import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Cpu,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  Globe,
  Grid3X3,
  Layers,
  Lightbulb,
  List,
  MapPin,
  Quote,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ALUMNI_STARTUPS,
  getAllAlumni,
  type AlumniStartup,
} from "@/data/alumni";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function getStartupMonogram(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: "Alumni Network & Graduated Startups — AI UNIPOD Ethiopia" },
      {
        name: "description",
        content:
          "Discover graduated sovereign AI startups from AI UNIPOD Ethiopia (Cohorts 1 & 2). Explore founder journey case studies, follow-on capital raised, and commercial scale.",
      },
      { property: "og:title", content: "AI UNIPOD Ethiopia Alumni Network" },
      {
        property: "og:description",
        content:
          "Pioneering AI startups that graduated from AI UNIPOD Living Lab into commercial operations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AlumniPage,
});

export function AlumniPage() {
  const [alumniList, setAlumniList] = useState<AlumniStartup[]>(() => getAllAlumni());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCohort, setSelectedCohort] = useState<string>("All");
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"graduation" | "funding" | "team" | "name">("graduation");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Active spotlight index for hero founder journey carousel
  const [activeSpotlightSlug, setActiveSpotlightSlug] = useState<string>("adwa-logistics");

  // Selected alumni for detailed Journey Case Study Modal
  const [selectedStoryAlumni, setSelectedStoryAlumni] = useState<AlumniStartup | null>(null);

  // Sync with localStorage overrides if edited in the portal
  useEffect(() => {
    const handleUpdate = () => {
      setAlumniList(getAllAlumni());
    };
    window.addEventListener("aiunipod_alumni_updated", handleUpdate);
    return () => window.removeEventListener("aiunipod_alumni_updated", handleUpdate);
  }, []);

  // Aggregated ecosystem telemetry
  const totalFundingRaised = useMemo(() => {
    return alumniList.reduce((acc, s) => acc + s.follow_on_funding_usd, 0);
  }, [alumniList]);

  const totalJobsCreated = useMemo(() => {
    return alumniList.reduce((acc, s) => acc + (s.jobs_created_post_grad || 0), 0);
  }, [alumniList]);

  const totalTeamSize = useMemo(() => {
    return alumniList.reduce((acc, s) => acc + s.team_size, 0);
  }, [alumniList]);

  // Unique sectors
  const sectors = useMemo(() => {
    return ["All", ...Array.from(new Set(alumniList.map((s) => s.sector)))];
  }, [alumniList]);

  // Active spotlight item
  const activeSpotlight = useMemo(() => {
    return alumniList.find((s) => s.slug === activeSpotlightSlug) || alumniList[0];
  }, [alumniList, activeSpotlightSlug]);

  // Filtered & Sorted Alumni
  const filteredAlumni = useMemo(() => {
    return alumniList
      .filter((s) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = s.name.toLowerCase().includes(q);
          const matchesTagline = s.tagline.toLowerCase().includes(q);
          const matchesSector = s.sector.toLowerCase().includes(q);
          const matchesFounder = s.primary_contact?.name.toLowerCase().includes(q) || false;
          const matchesStory = s.founder_journey.headline.toLowerCase().includes(q);
          if (!matchesName && !matchesTagline && !matchesSector && !matchesFounder && !matchesStory) {
            return false;
          }
        }

        // Cohort filter
        if (selectedCohort !== "All" && s.cohort !== selectedCohort) {
          return false;
        }

        // Sector filter
        if (selectedSector !== "All" && s.sector !== selectedSector) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "funding") {
          return b.follow_on_funding_usd - a.follow_on_funding_usd;
        }
        if (sortBy === "team") {
          return b.team_size - a.team_size;
        }
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        // Default: graduation year (newest first)
        return Number(b.graduation_year) - Number(a.graduation_year);
      });
  }, [alumniList, searchQuery, selectedCohort, selectedSector, sortBy]);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-background font-body text-foreground">
      {/* Top Header */}
      <LandingHeader />

      <main className="w-full">
        {/* ========================================================= */}
        {/* HERO SECTION: GRADUATE NETWORK & ACCELERATION IMPACT     */}
        {/* ========================================================= */}
        <section className="relative overflow-hidden border-b border-border/80 bg-gradient-to-b from-card via-background to-background py-16 sm:py-24">
          {/* Subtle Background Glow Elements */}
          <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 right-0 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col items-center text-center">
              {/* Institutional Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary shadow-xs backdrop-blur-md">
                <Award className="size-3.5" />
                <span>AI UNIPOD Living Lab Alumni Network</span>
                <span className="size-1 rounded-full bg-primary" />
                <span className="font-mono text-[11px] text-muted-foreground">Cohorts 1 &amp; 2</span>
              </div>

              {/* Headline */}
              <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Where Pioneer AI Research Scales into{" "}
                <span className="bg-gradient-to-r from-primary via-blue-600 to-emerald-600 bg-clip-text text-transparent dark:via-blue-400 dark:to-emerald-400">
                  Commercial Reality
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Meet our graduated founders who transformed university prototypes and sovereign datasets into
                financially resilient, production-grade AI enterprises serving enterprise and government clients across East Africa.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" className="rounded-full px-6 font-semibold shadow-sm">
                  <a href="#alumni-directory">
                    Explore Alumni Directory ({alumniList.length})
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-6 font-semibold">
                  <Link to="/cohort-3">
                    Apply for Cohort 3 Incubation <ArrowUpRight className="ml-1 size-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* ========================================================= */}
            {/* AGGREGATE IMPACT TELEMETRY STATS                         */}
            {/* ========================================================= */}
            <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
              <div className="rounded-2xl border border-border/80 bg-card/60 p-5 shadow-xs backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-primary/10 grid place-items-center text-primary">
                    <Rocket className="size-5" />
                  </div>
                  <div>
                    <p className="font-mono text-2xl sm:text-3xl font-bold text-foreground">
                      {alumniList.length}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground">Graduated Ventures</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5 text-[11px] text-muted-foreground">
                  <span>Cohort 1 (2024)</span>
                  <span className="font-semibold text-foreground">Cohort 2 (2025)</span>
                </div>
              </div>

              <div className="rounded-2xl border border-border/80 bg-card/60 p-5 shadow-xs backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-emerald-500/10 grid place-items-center text-emerald-600 dark:text-emerald-400">
                    <Wallet className="size-5" />
                  </div>
                  <div>
                    <p className="font-mono text-2xl sm:text-3xl font-bold text-foreground">
                      {currency.format(totalFundingRaised)}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground">Follow-On Capital Raised</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5 text-[11px] text-muted-foreground">
                  <span>Pre-Seed to Pre-Series A</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">100% Institutional</span>
                </div>
              </div>

              <div className="rounded-2xl border border-border/80 bg-card/60 p-5 shadow-xs backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-blue-500/10 grid place-items-center text-blue-600 dark:text-blue-400">
                    <Users className="size-5" />
                  </div>
                  <div>
                    <p className="font-mono text-2xl sm:text-3xl font-bold text-foreground">
                      {totalJobsCreated}+
                    </p>
                    <p className="text-xs font-medium text-muted-foreground">Jobs Created Post-Grad</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5 text-[11px] text-muted-foreground">
                  <span>High-skilled AI &amp; ML</span>
                  <span className="font-semibold text-foreground">{totalTeamSize} Total Staff</span>
                </div>
              </div>

              <div className="rounded-2xl border border-border/80 bg-card/60 p-5 shadow-xs backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-purple-500/10 grid place-items-center text-purple-600 dark:text-purple-400">
                    <Building2 className="size-5" />
                  </div>
                  <div>
                    <p className="font-mono text-2xl sm:text-3xl font-bold text-foreground">
                      24+
                    </p>
                    <p className="text-xs font-medium text-muted-foreground">Enterprise &amp; Gov Contracts</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5 text-[11px] text-muted-foreground">
                  <span>Ports, Banks, Hospitals</span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">Commercial Deployments</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* INTERACTIVE FOUNDER JOURNEY SPOTLIGHT CASE STUDY         */}
        {/* ========================================================= */}
        <section className="border-b border-border/80 bg-muted/20 py-16 sm:py-20">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Lightbulb className="size-3.5" /> Alumni Spotlight &amp; Case Studies
                </span>
                <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                  Founder Journeys: From Lab Prototype to Market
                </h2>
                <p className="mt-2 max-w-xl text-xs sm:text-sm text-muted-foreground">
                  Read how our alumni navigated early research, hardware prototyping at EAII living labs, and regulatory clearance.
                </p>
              </div>

              {/* Spotlight Selector Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                {alumniList.map((alumnus) => (
                  <button
                    key={alumnus.slug}
                    onClick={() => setActiveSpotlightSlug(alumnus.slug)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      activeSpotlightSlug === alumnus.slug
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {alumnus.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Spotlight Card Display */}
            {activeSpotlight && (
              <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
                  {/* Left Column: Narrative & Quote */}
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        {activeSpotlight.cohort} ({activeSpotlight.graduation_year} Graduate)
                      </span>
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {activeSpotlight.graduation_stage}
                      </span>
                      <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                        {activeSpotlight.sector}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-foreground">
                      {activeSpotlight.founder_journey.headline}
                    </h3>

                    {/* Pull Quote Box */}
                    <div className="relative rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
                      <Quote className="size-8 text-primary/30 absolute -top-3.5 -left-1.5" />
                      <p className="relative z-10 italic text-sm sm:text-base leading-relaxed text-foreground font-medium">
                        "{activeSpotlight.founder_journey.quote}"
                      </p>
                      <div className="mt-4 flex items-center gap-3">
                        <div
                          style={{ backgroundColor: activeSpotlight.theme.primary_color }}
                          className="size-10 rounded-full text-white font-bold grid place-items-center text-sm shadow-xs"
                        >
                          {getStartupMonogram(activeSpotlight.primary_contact?.name || activeSpotlight.name)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">
                            {activeSpotlight.primary_contact?.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activeSpotlight.primary_contact?.role} · {activeSpotlight.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Post-Graduation Impact Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-border pt-4">
                      <div>
                        <p className="text-[11px] text-muted-foreground font-medium">Follow-on Raised</p>
                        <p className="font-mono text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400">
                          {currency.format(activeSpotlight.follow_on_funding_usd)}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{activeSpotlight.follow_on_round}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-muted-foreground font-medium">Team Scale</p>
                        <p className="font-mono text-base sm:text-lg font-bold text-foreground">
                          {activeSpotlight.team_size} Staff
                        </p>
                        <p className="text-[10px] text-muted-foreground">+{activeSpotlight.jobs_created_post_grad} created</p>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <p className="text-[11px] text-muted-foreground font-medium">Active Markets</p>
                        <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                          {activeSpotlight.location.split(",")[0]}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{activeSpotlight.operating_markets?.[0]}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Button
                        onClick={() => setSelectedStoryAlumni(activeSpotlight)}
                        className="rounded-full px-5 text-xs font-semibold gap-1.5"
                      >
                        <BookOpen className="size-3.5" /> Read Full Founder Case Study
                      </Button>
                      <Button asChild variant="outline" className="rounded-full px-5 text-xs font-semibold gap-1.5">
                        <Link to="/$startupSlug" params={{ startupSlug: activeSpotlight.slug }}>
                          View Verified Deal Room <ArrowUpRight className="size-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Right Column: Key Commercial Partners & Highlights */}
                  <div className="rounded-2xl border border-border/80 bg-muted/40 p-6 space-y-6">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        The Problem Tackled
                      </span>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-foreground">
                        {activeSpotlight.founder_journey.problem_tackled}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                        The AI UniPod Acceleration
                      </span>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-foreground">
                        {activeSpotlight.founder_journey.unipod_acceleration}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Key Commercial &amp; Institutional Partners
                      </span>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {activeSpotlight.commercial_partners.map((partner, pIdx) => (
                          <span
                            key={pIdx}
                            className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground shadow-2xs"
                          >
                            <Building2 className="size-3 text-muted-foreground" />
                            {partner}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Milestones Preview */}
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Recent Milestone
                      </span>
                      {activeSpotlight.milestones?.[activeSpotlight.milestones.length - 1] && (
                        <div className="mt-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs">
                          <p className="font-bold text-foreground">
                            {activeSpotlight.milestones[activeSpotlight.milestones.length - 1].title} (
                            {activeSpotlight.milestones[activeSpotlight.milestones.length - 1].date})
                          </p>
                          <p className="mt-0.5 text-muted-foreground text-[11px]">
                            {activeSpotlight.milestones[activeSpotlight.milestones.length - 1].description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* ALUMNI DIRECTORY WITH SEARCH & FILTERING CONTROLS        */}
        {/* ========================================================= */}
        <section id="alumni-directory" className="py-16 sm:py-20">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 space-y-8">
            {/* Directory Header Bar */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-3.5" /> Commercial Alumni Directory
                </span>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-foreground">
                  All Graduated Startups ({filteredAlumni.length})
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Browse and filter our verified alumni roster across cohorts, sectors, and funding stages.
                </p>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-xl border border-border bg-card p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`rounded-lg p-1.5 transition-colors ${
                      viewMode === "grid" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Grid View"
                  >
                    <Grid3X3 className="size-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`rounded-lg p-1.5 transition-colors ${
                      viewMode === "list" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="List View"
                  >
                    <List className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filter and Search Controls Strip */}
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between shadow-2xs">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search alumni by name, founder, sector, or keyword..."
                  className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>

              {/* Dropdown Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Cohort Filter */}
                <select
                  value={selectedCohort}
                  onChange={(e) => setSelectedCohort(e.target.value)}
                  className="rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden font-medium"
                >
                  <option value="All">All Cohorts</option>
                  <option value="Cohort 2">Cohort 2 (2025)</option>
                  <option value="Cohort 1">Cohort 1 (2024)</option>
                </select>

                {/* Sector Filter */}
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden font-medium"
                >
                  {sectors.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec === "All" ? "All Sectors" : sec}
                    </option>
                  ))}
                </select>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden font-medium"
                >
                  <option value="graduation">Sort: Newest Graduation</option>
                  <option value="funding">Sort: Funding Raised</option>
                  <option value="team">Sort: Team Size</option>
                  <option value="name">Sort: Name (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredAlumni.length === 0 && (
              <div className="rounded-3xl border border-dashed border-border p-12 text-center">
                <Award className="mx-auto size-12 text-muted-foreground/40" />
                <h3 className="mt-4 font-display text-lg font-bold">No graduated startups found</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try adjusting your search query or removing active cohort and sector filters.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCohort("All");
                    setSelectedSector("All");
                  }}
                  className="mt-4 rounded-full text-xs font-semibold"
                >
                  Reset All Filters
                </Button>
              </div>
            )}

            {/* ========================================================= */}
            {/* GRID VIEW RENDERING                                       */}
            {/* ========================================================= */}
            {viewMode === "grid" && filteredAlumni.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredAlumni.map((alumnus) => (
                  <div
                    key={alumnus.slug}
                    className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-xs transition-all hover:border-primary/50 hover:shadow-md"
                  >
                    {/* Top Stripe Color */}
                    <div
                      style={{ backgroundColor: alumnus.theme.primary_color }}
                      className="absolute top-0 left-8 right-8 h-1 rounded-b-full opacity-80"
                    />

                    <div>
                      {/* Top Header Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div
                            style={{ backgroundColor: alumnus.theme.primary_color }}
                            className="size-11 rounded-2xl text-white font-bold grid place-items-center text-sm shadow-xs"
                          >
                            {getStartupMonogram(alumnus.name)}
                          </div>
                          <div>
                            <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                              {alumnus.name}
                            </h3>
                            <p className="text-[11px] text-muted-foreground truncate max-w-[170px]">
                              {alumnus.legal_name || alumnus.sector}
                            </p>
                          </div>
                        </div>

                        <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                          {alumnus.cohort} ({alumnus.graduation_year})
                        </span>
                      </div>

                      {/* Tagline */}
                      <p className="mt-4 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {alumnus.tagline}
                      </p>

                      {/* Follow-on Capital Metric Badge */}
                      <div className="mt-4 rounded-xl border border-border bg-muted/30 p-3 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-medium text-muted-foreground">Follow-On Funding</p>
                          <p className="font-mono text-sm font-bold text-foreground">
                            {currency.format(alumnus.follow_on_funding_usd)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-medium text-muted-foreground">Round Stage</p>
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-primary">
                            {alumnus.follow_on_round}
                          </span>
                        </div>
                      </div>

                      {/* Partners Pill List */}
                      <div className="mt-4 space-y-1.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          Key Commercial Partners:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {alumnus.commercial_partners.slice(0, 2).map((partner, pIdx) => (
                            <span
                              key={pIdx}
                              className="rounded-md border border-border bg-background px-2 py-0.5 text-[10px] font-medium text-foreground truncate max-w-[200px]"
                            >
                              {partner}
                            </span>
                          ))}
                          {alumnus.commercial_partners.length > 2 && (
                            <span className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                              +{alumnus.commercial_partners.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action CTAs */}
                    <div className="mt-6 border-t border-border/80 pt-4 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedStoryAlumni(alumnus)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                      >
                        <BookOpen className="size-3.5" /> Read Journey
                      </button>

                      <div className="flex items-center gap-2">
                        <Button asChild variant="outline" size="sm" className="rounded-full text-xs h-8 px-3">
                          <Link to="/$startupSlug" params={{ startupSlug: alumnus.slug }}>
                            Deal Book <ArrowUpRight className="ml-1 size-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ========================================================= */}
            {/* LIST VIEW RENDERING                                       */}
            {/* ========================================================= */}
            {viewMode === "list" && filteredAlumni.length > 0 && (
              <div className="space-y-3">
                {filteredAlumni.map((alumnus) => (
                  <div
                    key={alumnus.slug}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:border-primary/40"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        style={{ backgroundColor: alumnus.theme.primary_color }}
                        className="size-12 rounded-xl text-white font-bold grid place-items-center text-sm shrink-0 shadow-xs"
                      >
                        {getStartupMonogram(alumnus.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-base font-bold text-foreground">
                            {alumnus.name}
                          </h3>
                          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            {alumnus.cohort} ({alumnus.graduation_year})
                          </span>
                          <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                            {alumnus.sector}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground truncate max-w-xl">
                          {alumnus.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 border-t sm:border-t-0 border-border/60 pt-3 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <p className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                          {currency.format(alumnus.follow_on_funding_usd)}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{alumnus.follow_on_round}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedStoryAlumni(alumnus)}
                          className="rounded-full text-xs h-8 px-3"
                        >
                          Journey
                        </Button>
                        <Button asChild size="sm" className="rounded-full text-xs h-8 px-3 font-semibold">
                          <Link to="/$startupSlug" params={{ startupSlug: alumnus.slug }}>
                            Deal Book <ArrowUpRight className="ml-1 size-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* CALL TO ACTION: CONNECT AS ALUMNI OR APPLY TO COHORT 3    */}
        {/* ========================================================= */}
        <section className="border-t border-border bg-gradient-to-br from-card via-card/90 to-primary/5 py-16 sm:py-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8 text-center">
            <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              Empowering the Next Generation
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-foreground">
              Ready to Follow in Their Footsteps?
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-sm text-muted-foreground leading-relaxed">
              Join Cohort 3 of AI UNIPOD Ethiopia. Gain sovereign high-performance GPU workstations compute,
              up to $5,000 in prototype seed funding, and world-class living lab mentorship from EAII, AAU, and timbuktoo.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-7 font-semibold shadow-sm">
                <Link to="/cohort-3">
                  Apply for Cohort 3 Incubation <ArrowUpRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-7 font-semibold">
                <Link to="/portal">
                  Alumni / Founder Sign In
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================= */}
      {/* DETAILED FOUNDER JOURNEY & CASE STUDY MODAL DIALOG       */}
      {/* ========================================================= */}
      <Dialog
        open={selectedStoryAlumni !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedStoryAlumni(null);
        }}
      >
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
          {selectedStoryAlumni && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedStoryAlumni.cohort} ({selectedStoryAlumni.graduation_year} Graduate)
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                    {selectedStoryAlumni.sector}
                  </span>
                </div>
                <DialogTitle className="font-display text-2xl font-bold text-foreground">
                  {selectedStoryAlumni.founder_journey.headline}
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  {selectedStoryAlumni.name} · Founded in {selectedStoryAlumni.founded} · {selectedStoryAlumni.location}
                </DialogDescription>
              </DialogHeader>

              {/* Founder Quote */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
                <p className="italic text-xs sm:text-sm text-foreground leading-relaxed font-medium">
                  "{selectedStoryAlumni.founder_journey.quote}"
                </p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="font-bold text-primary">
                    {selectedStoryAlumni.primary_contact?.name} ({selectedStoryAlumni.primary_contact?.role})
                  </span>
                  <span className="text-muted-foreground">
                    Follow-on: {currency.format(selectedStoryAlumni.follow_on_funding_usd)} ({selectedStoryAlumni.follow_on_round})
                  </span>
                </div>
              </div>

              {/* Deep Dive Narrative Sections */}
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-foreground">
                <div className="rounded-xl border border-border bg-card p-4">
                  <h4 className="font-bold text-primary text-xs uppercase tracking-wider">
                    1. The Physical Friction &amp; Problem
                  </h4>
                  <p className="mt-1.5 text-muted-foreground">
                    {selectedStoryAlumni.founder_journey.problem_tackled}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-4">
                  <h4 className="font-bold text-primary text-xs uppercase tracking-wider">
                    2. The AI UniPod Living Lab Acceleration
                  </h4>
                  <p className="mt-1.5 text-muted-foreground">
                    {selectedStoryAlumni.founder_journey.unipod_acceleration}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-4">
                  <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-xs uppercase tracking-wider">
                    3. Commercial Scale &amp; Deployment Breakthrough
                  </h4>
                  <p className="mt-1.5 text-muted-foreground">
                    {selectedStoryAlumni.founder_journey.commercial_breakthrough}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-muted/40 p-4">
                  <h4 className="font-bold text-foreground text-xs uppercase tracking-wider">
                    4. Current Footprint &amp; Traction
                  </h4>
                  <p className="mt-1.5 text-muted-foreground">
                    {selectedStoryAlumni.founder_journey.where_they_are_now}
                  </p>
                </div>

                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                  <h4 className="font-bold text-primary text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb className="size-3.5" /> Founder Advice for Cohort 3 Teams
                  </h4>
                  <p className="mt-1.5 text-foreground italic">
                    "{selectedStoryAlumni.founder_journey.advice_to_cohort3}"
                  </p>
                </div>
              </div>

              {/* Milestones Road */}
              {selectedStoryAlumni.milestones && selectedStoryAlumni.milestones.length > 0 && (
                <div className="space-y-2 border-t border-border pt-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                    Key Historical Milestones
                  </h4>
                  <div className="space-y-2">
                    {selectedStoryAlumni.milestones.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/20 p-2.5 text-xs"
                      >
                        <span className="font-mono text-[11px] font-semibold text-primary shrink-0">
                          {m.date}
                        </span>
                        <div>
                          <p className="font-bold text-foreground">{m.title}</p>
                          <p className="text-[11px] text-muted-foreground">{m.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer CTAs */}
              <div className="border-t border-border pt-4 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedStoryAlumni(null)}
                  className="rounded-full text-xs"
                >
                  Close
                </Button>
                <Button asChild size="sm" className="rounded-full text-xs font-semibold gap-1">
                  <Link to="/$startupSlug" params={{ startupSlug: selectedStoryAlumni.slug }}>
                    View Full Deal Book Room <ArrowUpRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
