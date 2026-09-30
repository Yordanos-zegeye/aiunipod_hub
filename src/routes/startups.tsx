import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  ExternalLink,
  Eye,
  Filter,
  Grid3X3,
  Layers,
  List,
  MapPin,
  Maximize2,
  Rocket,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";

import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Button } from "@/components/ui/button";
import { JOB_OPENINGS } from "@/data/jobs";
import { STARTUPS, type Startup } from "@/data/startups";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const Route = createFileRoute("/startups")({
  head: () => ({
    meta: [
      { title: "Startups Directory — AI UNIPOD Ethiopia Ecosystem" },
      {
        name: "description",
        content:
          "Search and explore every public startup accelerating within AI UNIPOD Ethiopia. Filter by sector, product stage, funding ask, and location.",
      },
      { property: "og:title", content: "AI UNIPOD Startups Directory" },
      {
        property: "og:description",
        content: "Search and filter investor-ready AI startups from Ethiopia.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: StartupsDirectoryPage,
});

function StartupsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [selectedRound, setSelectedRound] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState<"featured" | "ask-high" | "ask-low" | "team" | "name" | "newest">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [previewStartup, setPreviewStartup] = useState<Startup | null>(null);

  // Derive unique filter lists
  const sectors = useMemo(() => {
    return ["All", ...Array.from(new Set(STARTUPS.map((s) => s.sector)))];
  }, []);

  const stages = ["All", "Market", "Pilot", "Prototype", "Concept"];
  const rounds = ["All", "Seed", "Pre-seed"];
  const locations = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(
          STARTUPS.map((s) => {
            const city = s.location.split(",")[0];
            return city ? city.trim() : s.location;
          })
        )
      ),
    ];
  }, []);

  // Compute ecosystem stats
  const totalFundingAsk = useMemo(() => {
    return STARTUPS.reduce((acc, s) => acc + s.investment_ask.amount_usd, 0);
  }, []);

  const totalProducts = useMemo(() => {
    return STARTUPS.reduce((acc, s) => acc + s.products.length, 0);
  }, []);

  // Filter and sort startups
  const filteredStartups = useMemo(() => {
    return STARTUPS.filter((startup) => {
      // Sector filter
      if (selectedSector !== "All" && startup.sector.toLowerCase() !== selectedSector.toLowerCase()) {
        return false;
      }

      // Stage filter (matches any product at this stage)
      if (selectedStage !== "All" && !startup.products.some((p) => p.stage.toLowerCase() === selectedStage.toLowerCase())) {
        return false;
      }

      // Round filter
      if (selectedRound !== "All" && startup.investment_ask.round.toLowerCase() !== selectedRound.toLowerCase()) {
        return false;
      }

      // Location filter
      if (selectedLocation !== "All" && !startup.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }

      // Search query
      if (deferredSearch.trim()) {
        const q = deferredSearch.toLowerCase().trim();
        const matchesName = startup.name.toLowerCase().includes(q);
        const matchesTagline = startup.tagline.toLowerCase().includes(q);
        const matchesDesc = startup.description.toLowerCase().includes(q);
        const matchesSector = startup.sector.toLowerCase().includes(q);
        const matchesLocation = startup.location.toLowerCase().includes(q);
        const matchesProduct = startup.products.some(
          (p) => p.name.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)
        );
        const matchesAsk = startup.investment_ask.round.toLowerCase().includes(q);

        if (!matchesName && !matchesTagline && !matchesDesc && !matchesSector && !matchesLocation && !matchesProduct && !matchesAsk) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "ask-high") return b.investment_ask.amount_usd - a.investment_ask.amount_usd;
      if (sortBy === "ask-low") return a.investment_ask.amount_usd - b.investment_ask.amount_usd;
      if (sortBy === "team") return b.team_size - a.team_size;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "newest") return parseInt(b.founded) - parseInt(a.founded);
      return 0; // featured default
    });
  }, [deferredSearch, selectedSector, selectedStage, selectedRound, selectedLocation, sortBy]);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedSector !== "All" ||
    selectedStage !== "All" ||
    selectedRound !== "All" ||
    selectedLocation !== "All" ||
    sortBy !== "featured";

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedSector("All");
    setSelectedStage("All");
    setSelectedRound("All");
    setSelectedLocation("All");
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-background font-body text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      {/* 1. Global Navigation Header */}
      <LandingHeader />

      <main className="pt-24 sm:pt-28">
        {/* 2. Hero & Breadcrumbs */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/40 via-background to-background py-12 sm:py-16">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">Startups Directory</span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  <Sparkles className="size-3 text-amber-500" />
                  Ecosystem Startups & Ventures
                </div>
                <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Startups Directory.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Explore every public venture accelerating within AI UNIPOD Ethiopia. Filter across sectors, inspect verified product roadmaps, and explore dynamic startups.
                </p>

                {/* Ecosystem Jobs Banner */}
                <div className="mt-5">
                  <Link
                    to="/jobs"
                    className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    <Briefcase className="size-3.5" />
                    <span>Now Hiring: View {JOB_OPENINGS.length} Open Positions Across Hub Startups →</span>
                  </Link>
                </div>
              </div>

              {/* Telemetry Highlights */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card/80 p-4 shadow-xs backdrop-blur-md">
                  <p className="text-xs font-medium text-muted-foreground">Total Ventures</p>
                  <p className="mt-1 font-display text-2xl font-bold text-foreground">{STARTUPS.length}</p>
                  <p className="text-[11px] text-muted-foreground">in active cohorts</p>
                </div>
                <div className="rounded-2xl border border-border bg-card/80 p-4 shadow-xs backdrop-blur-md">
                  <p className="text-xs font-medium text-muted-foreground">Combined Capital Ask</p>
                  <p className="mt-1 font-display text-2xl font-bold text-primary">
                    {currency.format(totalFundingAsk)}
                  </p>
                  <p className="text-[11px] text-muted-foreground">pre-seed & seed rounds</p>
                </div>
                <div className="rounded-2xl border border-border bg-card/80 p-4 shadow-xs backdrop-blur-md">
                  <p className="text-xs font-medium text-muted-foreground">Proprietary Products</p>
                  <p className="mt-1 font-display text-2xl font-bold text-foreground">{totalProducts}</p>
                  <p className="text-[11px] text-muted-foreground">prototypes & pilots</p>
                </div>
                <div className="rounded-2xl border border-border bg-card/80 p-4 shadow-xs backdrop-blur-md">
                  <p className="text-xs font-medium text-muted-foreground">Hub Sovereign Compute</p>
                  <p className="mt-1 font-display text-2xl font-bold text-emerald-600 dark:text-emerald-400">GPU Cluster</p>
                  <p className="text-[11px] text-muted-foreground">10x GPU cluster at EAII</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Search & Multi-Filter Control Console */}
        <section className="sticky top-[56px] sm:top-[60px] z-30 border-b border-border/80 bg-background/95 py-3.5 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* Primary Search Box */}
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, model, product, or location..."
                  className="h-10 w-full rounded-full border border-input bg-background/90 pl-10 pr-9 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>

              {/* Dropdown Filters & Controls */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Sector Select */}
                <div className="relative">
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    aria-label="Filter by sector"
                    className="h-9 cursor-pointer appearance-none rounded-full border border-border bg-card pl-3.5 pr-8 text-xs font-semibold text-foreground shadow-xs outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    {sectors.map((sec) => (
                      <option key={sec} value={sec}>
                        Sector: {sec}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" />
                </div>

                {/* Stage Select */}
                <div className="relative">
                  <select
                    value={selectedStage}
                    onChange={(e) => setSelectedStage(e.target.value)}
                    aria-label="Filter by product stage"
                    className="h-9 cursor-pointer appearance-none rounded-full border border-border bg-card pl-3.5 pr-8 text-xs font-semibold text-foreground shadow-xs outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    {stages.map((st) => (
                      <option key={st} value={st}>
                        Stage: {st}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" />
                </div>

                {/* Funding Round Select */}
                <div className="relative">
                  <select
                    value={selectedRound}
                    onChange={(e) => setSelectedRound(e.target.value)}
                    aria-label="Filter by funding round"
                    className="h-9 cursor-pointer appearance-none rounded-full border border-border bg-card pl-3.5 pr-8 text-xs font-semibold text-foreground shadow-xs outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    {rounds.map((rd) => (
                      <option key={rd} value={rd}>
                        Round: {rd}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" />
                </div>

                {/* Location Select */}
                <div className="relative">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    aria-label="Filter by location"
                    className="h-9 cursor-pointer appearance-none rounded-full border border-border bg-card pl-3.5 pr-8 text-xs font-semibold text-foreground shadow-xs outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        City: {loc}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" />
                </div>

                {/* Sort Order */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    aria-label="Sort startups"
                    className="h-9 cursor-pointer appearance-none rounded-full border border-border bg-secondary/50 pl-3.5 pr-8 text-xs font-semibold text-foreground shadow-xs outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="ask-high">Ask: High to Low</option>
                    <option value="ask-low">Ask: Low to High</option>
                    <option value="team">Team Size</option>
                    <option value="name">Name (A–Z)</option>
                    <option value="newest">Founded (Newest)</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" />
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 rounded-full border border-border bg-muted/40 p-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                    className={`rounded-full p-1.5 transition-all ${
                      viewMode === "grid" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Grid3X3 className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                    className={`rounded-full p-1.5 transition-all ${
                      viewMode === "list" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <List className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Tags Strip */}
            {hasActiveFilters && (
              <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-border/50 text-xs">
                <span className="text-muted-foreground">Active filters:</span>
                {selectedSector !== "All" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                    Sector: {selectedSector}
                    <button type="button" onClick={() => setSelectedSector("All")} className="hover:opacity-75">
                      <X className="size-3" />
                    </button>
                  </span>
                )}
                {selectedStage !== "All" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                    Stage: {selectedStage}
                    <button type="button" onClick={() => setSelectedStage("All")} className="hover:opacity-75">
                      <X className="size-3" />
                    </button>
                  </span>
                )}
                {selectedRound !== "All" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                    Round: {selectedRound}
                    <button type="button" onClick={() => setSelectedRound("All")} className="hover:opacity-75">
                      <X className="size-3" />
                    </button>
                  </span>
                )}
                {selectedLocation !== "All" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                    City: {selectedLocation}
                    <button type="button" onClick={() => setSelectedLocation("All")} className="hover:opacity-75">
                      <X className="size-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                    Query: "{searchQuery}"
                    <button type="button" onClick={() => setSearchQuery("")} className="hover:opacity-75">
                      <X className="size-3" />
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-primary underline underline-offset-4 hover:opacity-80"
                >
                  <RotateCcw className="size-3" /> Reset all
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 4. Results Directory Content */}
        <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12">
          {/* Header Count */}
          <div className="mb-6 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing <strong className="text-foreground">{filteredStartups.length}</strong> of {STARTUPS.length} startups
            </span>
          </div>

          {/* Empty State */}
          {filteredStartups.length === 0 && (
            <div className="my-16 rounded-3xl border border-dashed border-border bg-card/50 p-12 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
                <Search className="size-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-foreground">No matching startups found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search terms or relaxing sector and stage filters.
              </p>
              <Button onClick={clearAllFilters} variant="outline" className="mt-6 rounded-full">
                Clear all filters
              </Button>
            </div>
          )}

          {/* View Mode: Grid Cards */}
          {viewMode === "grid" && filteredStartups.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredStartups.map((startup) => (
                <div
                  key={startup.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-xs transition-all duration-120 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                  style={{
                    borderTopColor: startup.theme.primary_color,
                    borderTopWidth: "3px",
                  }}
                >
                  <div>
                    {/* Header Row: Sector & Brand Swatch */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {startup.sector}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="h-2.5 w-2.5 rounded-full ring-2 ring-background"
                          style={{ backgroundColor: startup.theme.primary_color }}
                          title={`Brand primary: ${startup.theme.primary_color}`}
                        />
                        <span className="text-[11px] font-medium text-muted-foreground">
                          {startup.investment_ask.round}
                        </span>
                      </div>
                    </div>

                    {/* Startup Name & Tagline */}
                    <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {startup.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-foreground/85 line-clamp-1">
                      {startup.tagline}
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {startup.description}
                    </p>

                    {/* Key Products with Stages */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {startup.products.map((p) => (
                        <span
                          key={p.name}
                          className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-[11px] text-muted-foreground"
                        >
                          <strong className="text-foreground/85 font-medium">{p.name}</strong> ·{" "}
                          <span
                            className={
                              p.stage === "Market"
                                ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                                : p.stage === "Pilot"
                                ? "text-blue-600 dark:text-blue-400 font-semibold"
                                : "text-amber-600 dark:text-amber-400"
                            }
                          >
                            {p.stage}
                          </span>
                        </span>
                      ))}
                    </div>

                    {/* Meta: Location & Team */}
                    <div className="mt-5 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3 text-primary/70" />
                        {startup.location.split(",")[0]}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Users className="size-3 text-primary/70" />
                        {startup.team_size} team
                      </span>
                      <span>·</span>
                      <span>Est. {startup.founded}</span>
                    </div>
                  </div>

                  {/* Card Bottom: Investment & Startup Details */}
                  <div className="mt-6 border-t border-border/70 pt-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          Investment Ask
                        </p>
                        <p className="font-display text-base font-bold text-foreground">
                          {currency.format(startup.investment_ask.amount_usd)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPreviewStartup(startup)}
                        className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/40 px-2.5 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        <Eye className="size-3" /> Preview
                      </button>
                    </div>

                    <Button asChild className="w-full rounded-xl text-xs font-semibold shadow-xs">
                      <Link to="/$startupSlug" params={{ startupSlug: startup.slug }}>
                        View Startup <ArrowUpRight className="ml-1.5 size-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View Mode: List / Investor Table */}
          {viewMode === "list" && filteredStartups.length > 0 && (
            <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-xs">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-4">Venture</th>
                    <th className="px-4 py-4">Sector</th>
                    <th className="px-4 py-4">Key Products</th>
                    <th className="px-4 py-4">Location</th>
                    <th className="px-4 py-4">Team</th>
                    <th className="px-4 py-4">Investment Ask</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredStartups.map((startup) => (
                    <tr key={startup.slug} className="transition-colors hover:bg-secondary/20">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span
                            className="h-3 w-3 rounded-full shrink-0"
                            style={{ backgroundColor: startup.theme.primary_color }}
                          />
                          <div>
                            <Link
                              to="/$startupSlug"
                              params={{ startupSlug: startup.slug }}
                              className="font-display text-base font-bold text-foreground transition-colors hover:text-primary"
                            >
                              {startup.name}
                            </Link>
                            <p className="text-xs text-muted-foreground line-clamp-1">{startup.tagline}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {startup.sector}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {startup.products.map((p) => (
                            <span
                              key={p.name}
                              className="rounded border border-border bg-muted/30 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                            >
                              {p.name} ({p.stage})
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs text-muted-foreground">{startup.location}</td>
                      <td className="px-4 py-4 text-xs font-medium text-foreground">{startup.team_size} members</td>
                      <td className="px-4 py-4">
                        <div className="font-display font-semibold text-foreground">
                          {currency.format(startup.investment_ask.amount_usd)}
                        </div>
                        <div className="text-[11px] text-muted-foreground">{startup.investment_ask.round}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setPreviewStartup(startup)}
                            className="inline-flex items-center rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            title="Quick preview"
                          >
                            <Eye className="size-3.5" />
                          </button>
                          <Button asChild size="sm" className="rounded-lg text-xs">
                            <Link to="/$startupSlug" params={{ startupSlug: startup.slug }}>
                              Profile <ArrowUpRight className="ml-1 size-3" />
                            </Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* 5. Cohort Application Callout */}
        <section className="border-t border-border bg-secondary/20 py-16">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/30 p-8 sm:p-12">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Are you building applied AI in Ethiopia?
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                    Get incubated and join the AI UNIPOD directory.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Selected ventures receive dedicated high-performance GPU compute, up to $5,000 seed funding, and a verified white-labeled investor profile.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild size="lg" className="rounded-full px-7">
                    <a href="/#journey">Apply for Cohort 3</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full px-7">
                    <Link to="/login">Startup Sign In</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Quick Startup Preview Modal / Slide-over Drawer */}
      {previewStartup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-md transition-opacity"
            onClick={() => setPreviewStartup(null)}
          />

          <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => setPreviewStartup(null)}
              aria-label="Close preview"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {previewStartup.sector}
              </span>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {previewStartup.investment_ask.round} Round
              </span>
            </div>

            <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
              {previewStartup.name}
            </h2>
            <p className="mt-1 text-sm font-semibold text-foreground/80">
              {previewStartup.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {previewStartup.description}
            </p>

            {/* Quick Meta Stats */}
            <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-border bg-secondary/30 p-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">{previewStartup.location}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Team Size</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">{previewStartup.team_size} members</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Founded</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">{previewStartup.founded}</p>
              </div>
            </div>

            {/* Products Roster */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Product Portfolio
              </h4>
              <div className="mt-3 space-y-2.5">
                {previewStartup.products.map((p) => (
                  <div key={p.name} className="flex items-start justify-between rounded-xl border border-border p-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.summary}</p>
                    </div>
                    <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">
                      {p.stage}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Ask Callout */}
            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Investment Ask ({previewStartup.investment_ask.round})
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-foreground">
                {currency.format(previewStartup.investment_ask.amount_usd)}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                <strong>Use of funds:</strong> {previewStartup.investment_ask.use_of_funds}
              </p>
            </div>

            {/* White-Label Theme Palette Preview */}
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>Theme Palette:</span>
                <span
                  className="h-4 w-4 rounded-full border border-border"
                  style={{ backgroundColor: previewStartup.theme.primary_color }}
                  title="Primary"
                />
                <span
                  className="h-4 w-4 rounded-full border border-border"
                  style={{ backgroundColor: previewStartup.theme.secondary_color }}
                  title="Secondary"
                />
                <span
                  className="h-4 w-4 rounded-full border border-border"
                  style={{ backgroundColor: previewStartup.theme.accent_color }}
                  title="Accent"
                />
              </div>

              {previewStartup.links.length > 0 && previewStartup.links[0] && (
                <a
                  href={previewStartup.links[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  {previewStartup.links[0].label} <ExternalLink className="size-3" />
                </a>
              )}
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-border pt-4">
              <Button variant="ghost" onClick={() => setPreviewStartup(null)} className="rounded-full text-xs">
                Close
              </Button>
              <Button asChild className="rounded-full px-6 text-xs font-semibold shadow-xs">
                <Link to="/$startupSlug" params={{ startupSlug: previewStartup.slug }}>
                  View Startup <ArrowUpRight className="ml-1.5 size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Comprehensive Global Footer */}
      <LandingFooter />
    </div>
  );
}
