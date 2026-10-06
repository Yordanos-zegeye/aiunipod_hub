import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Brain,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Copy,
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileCheck,
  FileSpreadsheet,
  FileText,
  Globe,
  Heart,
  Info,
  Layers,
  Lock,
  Mail,
  MapPin,
  Phone,
  PieChart,
  Printer,
  Rocket,
  Scale,
  Share2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { DynamicStartupLayout } from "@/components/white-label/DynamicStartupLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getStartupBySlug,
  getStartupCohort,
  getStartupStage,
  STARTUPS,
  type Startup,
} from "@/data/startups";

export const Route = createFileRoute("/$startupSlug")({
  loader: ({ params }) => {
    const startup = getStartupBySlug(params.startupSlug);
    if (!startup) throw notFound();
    return { startup };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Startup not found — AI UNIPOD Ethiopia" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { name, tagline, sector } = loaderData.startup;
    const cohort = getStartupCohort(loaderData.startup);
    const title = `${name} (${cohort}) — ${tagline} · AI UNIPOD Deal Book`;
    const description = `${name} is an investor-ready ${sector} venture in ${cohort} at AI UNIPOD Ethiopia. ${tagline}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: StartupProfilePage,
  notFoundComponent: StartupNotFound,
});

function StartupNotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="text-2xl font-semibold">We couldn't find that startup</h1>
        <p className="mt-2 text-muted-foreground">It may have moved or is not yet public.</p>
        <Link to="/startups" className="mt-6 inline-block text-primary underline underline-offset-4">
          Back to the directory
        </Link>
      </div>
    </div>
  );
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const STAGE_STYLES: Record<string, string> = {
  Market: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  Pilot: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
  Prototype: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  Concept: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30",
};

const SDG_COLORS: Record<number, string> = {
  1: "bg-[#E5243B] text-white",
  2: "bg-[#DDA63A] text-white",
  3: "bg-[#4C9F38] text-white",
  4: "bg-[#C5192D] text-white",
  5: "bg-[#FF3A21] text-white",
  6: "bg-[#26BDE2] text-white",
  7: "bg-[#FCC30B] text-black",
  8: "bg-[#A21942] text-white",
  9: "bg-[#FD6925] text-white",
  10: "bg-[#DD1367] text-white",
  11: "bg-[#FD9D24] text-white",
  12: "bg-[#BF8B2E] text-white",
  13: "bg-[#3F7E44] text-white",
  16: "bg-[#00689D] text-white",
};

function StartupProfilePage() {
  const { startup } = Route.useLoaderData();
  const cohort = getStartupCohort(startup);
  const overallStage = getStartupStage(startup);

  const [diligenceModalOpen, setDiligenceModalOpen] = useState(false);
  const [investorName, setInvestorName] = useState("");
  const [investorFund, setInvestorFund] = useState("");
  const [investorEmail, setInvestorEmail] = useState("");
  const [submittingAccess, setSubmittingAccess] = useState(false);
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);

  // Sibling startups in the same cohort or portfolio for cross-discovery
  const siblingVentures = STARTUPS.filter((s) => s.slug !== startup.slug).slice(0, 3);

  const handleCopyMemo = () => {
    const memo = `### ${startup.name} (${cohort}) — Executive Investment Memo
**Sector**: ${startup.sector} | **Stage**: ${overallStage}
**Tagline**: ${startup.tagline}
**Base**: ${startup.location} (EAII Living Lab Incubated)

**One-Line Problem**: ${startup.problem?.problem_statement || startup.description}
**AI Modality & Moat**: ${startup.ai_tech?.technology_type || "Proprietary Local AI"} (${startup.ai_tech?.dataset_size || "Sovereign Datasets"})
**Commercial Traction**: ${startup.traction?.key_metric_value || "Active Deployments"} ${startup.traction?.key_metric_label || ""}
**TAM / SAM / SOM**: ${startup.market?.tam_usd || "N/A"} / ${startup.market?.sam_usd || "N/A"} / ${startup.market?.som_usd || "N/A"}
**Round / Ask**: ${currency.format(startup.investment_ask.amount_usd)} (${startup.investment_ask.round} - ${startup.investment_ask.preferred_instrument || "SAFE"})
**Primary Contact**: ${startup.primary_contact?.name} (${startup.primary_contact?.email})
Verified by Ethiopian Artificial Intelligence Institute & UNDP timbuktoo.`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(memo);
      toast.success("Executive Investment Memo copied to clipboard!");
    } else {
      toast.info("Memo ready: please copy from screen.");
    }
  };

  const handleRequestAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!investorEmail || !investorName) {
      toast.error("Please provide your name and institutional email.");
      return;
    }
    setSubmittingAccess(true);
    setTimeout(() => {
      setSubmittingAccess(false);
      setDiligenceModalOpen(false);
      toast.success(
        `Full Diligence Room access link dispatched to ${investorEmail}. Our venture lead will review your accreditation within 4 business hours.`
      );
    }, 900);
  };

  const handleDownloadDoc = (docTitle: string) => {
    setDownloadingDoc(docTitle);
    setTimeout(() => {
      setDownloadingDoc(null);
      toast.success(`Encrypted dossier generated: "${docTitle}". Download initiated.`);
    }, 800);
  };

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Deal Memo", href: "#deal-memo" },
    { label: "Problem", href: "#problem" },
    { label: "AI Tech & Data", href: "#ai-tech" },
    { label: "Products", href: "#products" },
    { label: "Market & TAM", href: "#market-sizing" },
    { label: "Business Model", href: "#business-model" },
    { label: "Traction", href: "#traction" },
    { label: "AI Benchmarks", href: "#ai-performance" },
    { label: "Moats", href: "#moats" },
    { label: "Team & Talent", href: "#team-composition" },
    { label: "Impact", href: "#social-impact" },
    { label: "Financials", href: "#financial-projections" },
    { label: "Roadmap", href: "#growth-roadmap" },
    { label: "Investment", href: "#invest" },
    { label: "Diligence Vault", href: "#diligence-vault" },
    { label: "Risks", href: "#risks" },
  ];

  return (
    <DynamicStartupLayout
      theme={startup.theme}
      name={startup.name}
      legalName={startup.legal_name}
      cohort={cohort}
      sector={startup.sector}
      askAmount={currency.format(startup.investment_ask.amount_usd)}
      onRequestDiligence={() => setDiligenceModalOpen(true)}
      nav={navLinks}
    >
      {/* 1. HERO SECTION: VENTURE & EXECUTIVE DEAL BOOK SUMMARY */}
      <section id="overview" className="relative isolate mx-auto max-w-7xl scroll-mt-24 overflow-hidden px-4 pb-20 pt-10 sm:px-6 lg:pb-28 lg:pt-16">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-brand-text/60">
          <div className="flex items-center gap-2">
            <Link to="/startups" className="inline-flex items-center gap-1 hover:text-brand-primary transition-colors font-semibold">
              <ArrowLeft className="size-3.5" /> Startups Directory
            </Link>
            <span>/</span>
            <span className="font-bold text-brand-text">{startup.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-brand bg-brand-primary/10 px-2.5 py-0.5 font-bold text-brand-primary text-[11px]">
              <Sparkles className="size-3 text-amber-500" /> AI UNIPOD Deal Book
            </span>
            <span className="text-[11px] text-brand-text/50">· 18-Section Standard</span>
          </div>
        </nav>

        {/* Badges Strip */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center rounded-brand bg-brand-primary px-3 py-1 text-xs font-bold text-brand-primary-foreground shadow-2xs">
            {startup.sector}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-brand border border-brand-primary/25 bg-brand-primary/10 px-3 py-1 text-xs font-bold text-brand-primary">
            <Rocket className="size-3.5" /> {cohort}
          </span>
          <span className={`inline-flex items-center gap-1.5 rounded-brand border px-2.5 py-1 text-xs font-bold ${STAGE_STYLES[overallStage] || ""}`}>
            <Sparkles className="size-3" /> {overallStage} Stage
          </span>
          <span className="inline-flex items-center gap-1 rounded-brand border border-brand-primary/15 bg-brand-surface px-2.5 py-1 text-xs font-medium text-brand-text/80">
            <Building2 className="size-3 text-brand-primary" /> EAII Living Lab
          </span>
        </div>

        {/* Company Title & Legal Name */}
        <div className="mt-6">
          <h1 className="font-brand-heading text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
            {startup.name}
          </h1>
          {startup.legal_name && (
            <p className="mt-1 text-xs text-brand-text/60 tracking-wider uppercase font-semibold">
              Registered Entity: {startup.legal_name}
            </p>
          )}
          <p className="mt-3 font-brand-heading text-xl sm:text-2xl font-semibold text-brand-primary leading-snug">
            {startup.tagline}
          </p>
        </div>

        {/* Executive Description */}
        <p className="mt-5 max-w-4xl text-base sm:text-lg leading-relaxed text-brand-text/85">
          {startup.description}
        </p>

        {/* Live Channels & Primary Contact Strip */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {startup.links && startup.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-brand border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 text-xs font-bold text-brand-primary hover:bg-brand-primary/15 transition-all shadow-2xs"
            >
              <Globe className="size-3.5" />
              <span>{link.label}</span>
              <ExternalLink className="size-3 opacity-70" />
            </a>
          ))}

          {startup.primary_contact && (
            <div className="inline-flex items-center gap-2 rounded-brand border border-brand-primary/15 bg-brand-surface px-3 py-1.5 text-xs text-brand-text/80">
              <Mail className="size-3 text-brand-primary" />
              <span>Contact: <strong>{startup.primary_contact.name}</strong> ({startup.primary_contact.role})</span>
              <span className="opacity-40">·</span>
              <a href={`mailto:${startup.primary_contact.email}`} className="text-brand-primary hover:underline">
                {startup.primary_contact.email}
              </a>
              {startup.primary_contact.phone && (
                <>
                  <span className="opacity-40">·</span>
                  <span className="text-brand-text/60 font-mono">{startup.primary_contact.phone}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Key Telemetry Highlights Grid (Template Section 1 & 18) */}
        <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-4 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text/60 flex items-center gap-1">
              <Calendar className="size-3" /> Founded
            </span>
            <p className="mt-1 text-lg font-bold">{startup.founded}</p>
            <p className="text-[10px] text-brand-text/60">Incorporated year</p>
          </div>

          <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-4 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text/60 flex items-center gap-1">
              <Users className="size-3" /> Core Team
            </span>
            <p className="mt-1 text-lg font-bold">{startup.team_size} Staff</p>
            <p className="text-[10px] text-brand-text/60">Full-time specialists</p>
          </div>

          <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-4 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text/60 flex items-center gap-1">
              <MapPin className="size-3" /> Base
            </span>
            <p className="mt-1 text-base font-bold truncate" title={startup.location}>
              {startup.location.split(",")[0]}
            </p>
            <p className="text-[10px] text-brand-text/60">HQ &amp; Lab</p>
          </div>

          <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-4 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text/60 flex items-center gap-1">
              <TrendingUp className="size-3" /> Traction
            </span>
            <p className="mt-1 text-base font-bold text-brand-primary truncate">
              {startup.traction?.key_metric_value || `${startup.products.length} Products`}
            </p>
            <p className="text-[10px] text-brand-text/60 truncate">
              {startup.traction?.key_metric_label || "Active offerings"}
            </p>
          </div>

          <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-4 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text/60 flex items-center gap-1">
              <Target className="size-3" /> TAM Size
            </span>
            <p className="mt-1 text-lg font-bold text-foreground">
              {startup.market?.tam_usd || "$1.2B+"}
            </p>
            <p className="text-[10px] text-brand-text/60">Total addressable</p>
          </div>

          <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-4 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text/60 flex items-center gap-1">
              <Wallet className="size-3 text-emerald-600" /> Capital Ask
            </span>
            <p className="mt-1 text-base font-bold text-brand-primary">
              {currency.format(startup.investment_ask.amount_usd)}
            </p>
            <p className="text-[10px] text-brand-text/60 font-semibold">{startup.investment_ask.round} Round</p>
          </div>
        </div>

        {/* Action Header Banner */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-brand border border-brand-primary/20 bg-brand-primary/5 p-4">
          <div className="flex items-center gap-2 text-xs text-brand-text/80">
            <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
            <span>
              Verified sovereign AI asset by <strong>Ethiopian Artificial Intelligence Institute (EAII)</strong> &amp; <strong>UNDP timbuktoo</strong>.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => setDiligenceModalOpen(true)}
              className="rounded-brand bg-brand-primary text-brand-primary-foreground font-bold text-xs h-9 px-4 shadow-sm shadow-brand-primary/5 hover:-translate-y-1 hover:shadow-xl cursor-pointer transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2"
            >
              <Shield className="size-3.5 mr-1" /> Request Diligence Room
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyMemo}
              className="rounded-brand border-brand-primary/30 text-xs h-9 cursor-pointer transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2"
            >
              <Copy className="size-3.5 mr-1" /> Copy Deal Memo
            </Button>

            <Button asChild size="sm" variant="ghost" className="rounded-brand text-xs h-9">
              <a href="#invest">
                Terms <ArrowRight className="size-3.5 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. EXECUTIVE INVESTMENT SNAPSHOT (TEMPLATE SECTION 18) */}
      <section id="deal-memo" className="relative mx-auto max-w-7xl scroll-mt-24 border-t border-brand-primary/10 px-4 py-16 sm:px-6 lg:py-20">
        <div className="rounded-brand border border-brand-primary/20 bg-brand-surface p-6 sm:p-8 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-primary/10 pb-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
                <FileText className="size-3.5" /> Template Section 18 · Executive Deal Snapshot
              </span>
              <h2 className="font-brand-heading text-2xl font-bold tracking-tight mt-1">Institutional Investment Memo Profile</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyMemo}
                className="text-xs h-8 rounded-brand border-brand-primary/20 cursor-pointer transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2"
              >
                <Copy className="size-3 mr-1.5" /> Copy Summary
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.print()}
                className="text-xs h-8 rounded-brand border-brand-primary/20 cursor-pointer transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2"
              >
                <Printer className="size-3 mr-1.5" /> Print Deal Sheet
              </Button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-xs">
            <div className="space-y-1 p-3.5 rounded-brand bg-brand-primary/5 border border-brand-primary/10">
              <span className="font-bold uppercase text-[10px] text-brand-text/60">Entity &amp; Registration</span>
              <p className="font-semibold text-brand-text text-sm">{startup.name}</p>
              <p className="text-brand-text/70">{startup.legal_name || "Incorporated PLC"}</p>
              <p className="text-brand-text/60">HQ: {startup.location} (Incubated at EAII)</p>
            </div>

            <div className="space-y-1 p-3.5 rounded-brand bg-brand-primary/5 border border-brand-primary/10">
              <span className="font-bold uppercase text-[10px] text-brand-text/60">Sector &amp; Stage</span>
              <p className="font-semibold text-brand-text text-sm">{startup.sector}</p>
              <p className="text-brand-text/70">Incubation: {cohort}</p>
              <p className="text-brand-text/60">Maturity: {overallStage} Stage</p>
            </div>

            <div className="space-y-1 p-3.5 rounded-brand bg-brand-primary/5 border border-brand-primary/10">
              <span className="font-bold uppercase text-[10px] text-brand-text/60">Capital Ask &amp; Terms</span>
              <p className="font-bold text-brand-primary text-base">
                {currency.format(startup.investment_ask.amount_usd)}
              </p>
              <p className="text-brand-text/70">Round: {startup.investment_ask.round}</p>
              <p className="text-brand-text/60">Instrument: {startup.investment_ask.preferred_instrument || "SAFE / Priced Equity"}</p>
            </div>

            <div className="space-y-1 p-3.5 rounded-brand bg-brand-primary/5 border border-brand-primary/10">
              <span className="font-bold uppercase text-[10px] text-brand-text/60">Current Traction Metric</span>
              <p className="font-bold text-brand-text text-sm">{startup.traction?.key_metric_value || "In Deployment"}</p>
              <p className="text-brand-text/70">{startup.traction?.key_metric_label || "Active Clients"}</p>
              <p className="text-brand-text/60">Footprint: {startup.traction?.active_deployments || "Living Lab Trials"}</p>
            </div>

            <div className="space-y-1 p-3.5 rounded-brand bg-brand-primary/5 border border-brand-primary/10">
              <span className="font-bold uppercase text-[10px] text-brand-text/60">Market Size (TAM/SAM/SOM)</span>
              <p className="font-semibold text-brand-text text-sm">
                TAM: {startup.market?.tam_usd || "$1B+"}
              </p>
              <p className="text-brand-text/70">SAM: {startup.market?.sam_usd || "$250M"}</p>
              <p className="text-brand-text/60">SOM: {startup.market?.som_usd || "$35M"}</p>
            </div>

            <div className="space-y-1 p-3.5 rounded-brand bg-brand-primary/5 border border-brand-primary/10">
              <span className="font-bold uppercase text-[10px] text-brand-text/60">Commercial Revenue Run-Rate</span>
              <p className="font-semibold text-brand-text text-sm">
                {startup.business_model?.mrr_arr || "Early Revenue"}
              </p>
              <p className="text-brand-text/70">{startup.business_model?.revenue_model?.slice(0, 45) || "Enterprise Subscription"}...</p>
              <p className="text-brand-text/60">Historical: {startup.financials?.historical?.split("(")[0] || "Pilot stage"}</p>
            </div>
          </div>

          <div className="mt-5 p-4 rounded-brand bg-emerald-500/10 border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                Primary Competitive Advantage:
              </span>
              <p className="text-brand-text/85">{startup.competitive_advantage?.proprietary_moat || startup.ai_tech?.data_advantage}</p>
            </div>
            <Button
              size="sm"
              onClick={() => setDiligenceModalOpen(true)}
              className="rounded-brand bg-emerald-700 text-white font-bold h-8 text-xs shrink-0 cursor-pointer hover:bg-emerald-800"
            >
              <Lock className="size-3 mr-1" /> Open Data Room
            </Button>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM & REGIONAL CHALLENGE (TEMPLATE SECTION 3) */}
      {startup.problem && (
        <section id="problem" className="relative mx-auto max-w-7xl scroll-mt-24 border-t border-brand-primary/10 px-4 py-20 sm:px-6 lg:py-24">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <AlertTriangle className="size-3.5" /> Template Section 3 · Core Problem &amp; Severity
            </span>
            <h2 className="font-brand-heading text-3xl font-bold tracking-tight sm:text-[2.15rem]">The Challenge Being Solved in Ethiopia &amp; East Africa</h2>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Primary Problem Statement Card */}
            <div className="lg:col-span-2 rounded-brand border border-brand-primary/15 bg-brand-surface p-6 sm:p-8 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-5">
              <div>
                <h3 className="font-brand-heading text-lg font-bold text-brand-text">Problem Statement</h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-brand-text/80">
                  {startup.problem.problem_statement}
                </p>
              </div>

              <div className="rounded-brand bg-rose-500/10 border border-rose-500/25 p-4 text-xs space-y-1">
                <span className="font-bold text-rose-700 dark:text-rose-300 block">Problem Severity &amp; Consequences:</span>
                <p className="text-brand-text/80 leading-relaxed">{startup.problem.severity}</p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">Who Experiences This:</span>
                <p className="mt-1 text-sm font-semibold text-brand-text">{startup.problem.target_affected}</p>
              </div>
            </div>

            {/* Alternatives vs Failure Card */}
            <div className="rounded-brand border border-brand-primary/15 bg-brand-primary/5 p-6 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-5">
              <h3 className="font-brand-heading text-base font-bold text-brand-text">Existing Alternatives &amp; Why They Fail</h3>

              <div className="space-y-3 text-xs">
                <div className="rounded-brand bg-brand-surface p-3.5 border border-brand-primary/10">
                  <span className="font-bold text-brand-text/70 block uppercase text-[10px] tracking-wider">Current Alternative</span>
                  <p className="mt-1 text-brand-text font-medium">{startup.problem.current_alternatives}</p>
                </div>

                <div className="rounded-brand bg-brand-surface p-3.5 border border-rose-500/20">
                  <span className="font-bold text-rose-600 block uppercase text-[10px] tracking-wider">Why Existing Solutions Fail</span>
                  <p className="mt-1 text-brand-text/85">{startup.problem.why_alternatives_fail}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. AI SOLUTION, ARCHITECTURE & DATA MOAT (TEMPLATE SECTION 4 & 5) */}
      {startup.ai_tech && (
        <section id="ai-tech" className="relative mx-auto max-w-7xl scroll-mt-24 border-t border-brand-primary/10 px-4 py-20 sm:px-6 lg:py-24">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-primary">
              <Brain className="size-3.5" /> Template Section 4 &amp; 5 · AI Architecture &amp; Sovereign Data
            </span>
            <h2 className="font-brand-heading text-3xl font-bold tracking-tight sm:text-[2.15rem]">Proprietary AI Engineering &amp; Data Moat</h2>
            <p className="text-sm text-brand-text/70 max-w-3xl">
              Trained and validated on localized Ethiopian languages, microclimates, and institutional pipelines on sovereign EAII GPU clusters.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Tech Architecture Card */}
            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-6 sm:p-8 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-brand-primary/10 pb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="size-5 text-brand-primary" />
                  <h3 className="font-brand-heading text-lg font-bold">System &amp; AI Architecture</h3>
                </div>
                <span className="rounded-brand bg-brand-primary/15 px-2.5 py-0.5 text-xs font-bold text-brand-primary">
                  {startup.ai_tech.model_ownership}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">Core AI Modality</span>
                <p className="mt-1 text-sm font-semibold text-brand-text">{startup.ai_tech.technology_type}</p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">Models &amp; Frameworks Deployed</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {startup.ai_tech.models_used.map((m) => (
                    <span key={m} className="rounded-brand border border-brand-primary/20 bg-brand-primary/5 px-2.5 py-1 text-xs font-semibold text-brand-primary">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">System Architecture Flow</span>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-brand-text/80">
                  {startup.ai_tech.system_architecture}
                </p>
              </div>

              <div className="rounded-brand bg-brand-primary/5 p-4 border border-brand-primary/15 text-xs">
                <span className="font-bold text-brand-primary block uppercase text-[10px] tracking-wider">Proprietary Technology &amp; IP</span>
                <p className="mt-1 text-brand-text/85">{startup.ai_tech.proprietary_ip}</p>
              </div>
            </div>

            {/* Sovereign Data Advantage Card */}
            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-6 sm:p-8 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-brand-primary/10 pb-4">
                <div className="flex items-center gap-2">
                  <Database className="size-5 text-brand-primary" />
                  <h3 className="font-brand-heading text-lg font-bold">Data Moat &amp; Defensibility</h3>
                </div>
                <span className="rounded-brand border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600">
                  Sovereign Rights
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-brand bg-brand-primary/5 p-3.5 border border-brand-primary/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text/60 block">Dataset Scale</span>
                  <span className="text-base font-bold text-brand-primary mt-1 block">{startup.ai_tech.dataset_size}</span>
                </div>
                <div className="rounded-brand bg-brand-primary/5 p-3.5 border border-brand-primary/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text/60 block">Data Rights</span>
                  <span className="text-xs font-bold text-brand-text mt-1 block truncate" title={startup.ai_tech.data_rights}>
                    {startup.ai_tech.data_rights}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">Primary Data Sources</span>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-brand-text/80">
                  {startup.ai_tech.data_sources}
                </p>
              </div>

              <div className="rounded-brand bg-emerald-500/10 border border-emerald-500/25 p-4 text-xs">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 block uppercase text-[10px] tracking-wider">Competitive Data Moat</span>
                <p className="mt-1 text-brand-text/85">{startup.ai_tech.data_advantage}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. PRODUCTS & SERVICES PORTFOLIO (TEMPLATE SECTION 6) */}
      <section id="products" className="relative mx-auto max-w-7xl scroll-mt-24 border-t border-brand-primary/10 px-4 py-20 sm:px-6 lg:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Template Section 6 · Commercial Offerings</span>
            <h2 className="font-brand-heading text-3xl font-bold tracking-tight sm:text-[2.15rem] mt-1">Products &amp; Verified Solutions ({startup.products.length})</h2>
          </div>
          <p className="text-xs text-brand-text/70 sm:text-right max-w-md">
            Built, tested, and optimized with sovereign compute inside the AI UNIPOD living lab at EAII.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {startup.products.map((product) => (
            <article
              key={product.name}
              className="rounded-brand border border-brand-primary/15 bg-brand-surface p-6 sm:p-7 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-2xl flex flex-col justify-between space-y-5"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-brand-heading text-xl font-bold tracking-tight text-brand-text">{product.name}</h3>
                  <span className={`rounded-brand border px-2.5 py-1 text-xs font-bold ${STAGE_STYLES[product.stage] || "bg-brand-primary text-brand-primary-foreground"}`}>
                    {product.stage} Stage
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-brand-text/80">{product.summary}</p>

                {product.ai_functionality && (
                  <div className="mt-4 pt-3 border-t border-brand-primary/10 text-xs">
                    <span className="font-bold text-brand-primary block text-[11px] uppercase tracking-wider">AI Functionality:</span>
                    <p className="text-brand-text/75 mt-0.5">{product.ai_functionality}</p>
                  </div>
                )}

                {product.differentiation && (
                  <div className="mt-3 rounded-brand bg-brand-primary/5 p-3 border border-brand-primary/15 text-xs">
                    <span className="font-bold text-brand-text/80 block text-[10px] uppercase tracking-wider">Differentiation:</span>
                    <p className="text-brand-text/85 mt-0.5">{product.differentiation}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-brand-primary/10 flex items-center justify-between text-xs text-brand-text/60">
                <span className="inline-flex items-center gap-1 font-medium">
                  <CheckCircle2 className="size-3 text-emerald-600" /> Target: {product.target_customer || "Enterprise"}
                </span>
                <span className="font-bold text-brand-primary">{product.stage}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. MARKET OPPORTUNITY & TAM / SAM / SOM (TEMPLATE SECTION 7) */}
      {startup.market && (
        <section id="market-sizing" className="relative mx-auto max-w-7xl scroll-mt-24 border-t border-brand-primary/10 px-4 py-20 sm:px-6 lg:py-24">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Template Section 7 · Market Sizing</span>
            <h2 className="font-brand-heading text-3xl font-bold tracking-tight sm:text-[2.15rem]">Total Addressable Market &amp; Commercial Segments</h2>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* TAM / SAM / SOM Cards */}
            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-6 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">Total Addressable Market (TAM)</span>
              <p className="mt-2 font-brand-heading text-4xl font-bold text-brand-primary">{startup.market.tam_usd}</p>
              <p className="mt-1 text-xs text-brand-text/60">Pan-African &amp; Regional sector potential</p>
            </div>

            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-6 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">Serviceable Available Market (SAM)</span>
              <p className="mt-2 font-brand-heading text-4xl font-bold text-brand-text">{startup.market.sam_usd}</p>
              <p className="mt-1 text-xs text-brand-text/60">Target regulatory &amp; digital accounts</p>
            </div>

            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-6 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">Serviceable Obtainable Market (SOM)</span>
              <p className="mt-2 font-brand-heading text-4xl font-bold text-emerald-600 dark:text-emerald-400">{startup.market.som_usd}</p>
              <p className="mt-1 text-xs text-brand-text/60">Immediate 3-year commercial capture</p>
            </div>
          </div>

          <div className="mt-6 rounded-brand border border-brand-primary/15 bg-brand-surface p-6 sm:p-8 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-4">
            <h3 className="font-brand-heading text-lg font-bold">Market Opportunity Narrative</h3>
            <p className="text-sm leading-relaxed text-brand-text/80">{startup.market.opportunity_narrative}</p>

            <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-brand-primary/10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">Target Customer Segments</span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {startup.market.customer_segments.map((seg) => (
                    <span key={seg} className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary ring-1 ring-inset ring-brand-primary/10">
                      {seg}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">Regional Expansion Corridors</span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {startup.market.expansion_markets.map((exp) => (
                    <span key={exp} className="rounded-full border border-brand-primary/20 bg-brand-surface px-3 py-1 text-xs font-medium text-brand-text shadow-sm">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. BUSINESS MODEL & MONETIZATION ARCHITECTURE (TEMPLATE SECTION 8) */}
      {startup.business_model && (
        <section id="business-model" className="relative mx-auto max-w-7xl scroll-mt-24 border-t border-brand-primary/10 px-4 py-20 sm:px-6 lg:py-24">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
              <Briefcase className="size-3.5" /> Template Section 8 · Commercial Engine
            </span>
            <h2 className="font-brand-heading text-3xl font-bold tracking-tight sm:text-[2.15rem]">Business Model &amp; Revenue Architecture</h2>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-5 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60 block">Revenue Model</span>
              <p className="mt-2 font-bold text-brand-text text-sm leading-snug">{startup.business_model.revenue_model}</p>
              <p className="mt-1 text-[11px] text-brand-text/60">Commercial contracting structure</p>
            </div>

            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-5 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60 block">Pricing Structure</span>
              <p className="mt-2 font-bold text-brand-primary text-sm leading-snug">{startup.business_model.pricing}</p>
              <p className="mt-1 text-[11px] text-brand-text/60">Tiered customer plans</p>
            </div>

            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-5 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60 block">Average ARPU</span>
              <p className="mt-2 text-xl font-bold text-brand-text">{startup.business_model.arpu || "Custom Contract"}</p>
              <p className="mt-1 text-[11px] text-brand-text/60">Annualized revenue per client</p>
            </div>

            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-5 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60 block">ARR / MRR Velocity</span>
              <p className="mt-2 text-base font-bold text-emerald-600 dark:text-emerald-400">{startup.business_model.mrr_arr || "Early Revenue"}</p>
              <p className="mt-1 text-[11px] text-brand-text/60">{startup.business_model.other_metrics || "High software gross margin"}</p>
            </div>
          </div>
        </section>
      )}

      {/* 8. TRACTION & LIVING LAB MILESTONES (TEMPLATE SECTION 9) */}
      {startup.traction && (
        <section id="traction" className="relative mx-auto max-w-7xl scroll-mt-24 border-t border-brand-primary/10 px-4 py-20 sm:px-6 lg:py-24">
          <div className="rounded-brand border border-brand-primary/15 bg-brand-primary/5 p-8 sm:p-10 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] items-center">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 rounded-brand bg-brand-primary/15 px-3 py-1 text-xs font-bold text-brand-primary">
                  <TrendingUp className="size-3.5" /> Template Section 9 · Field Deployments
                </span>
                <h2 className="font-brand-heading text-3xl font-bold tracking-tight sm:text-[2.15rem]">Empirical Field Validation</h2>
                <div className="pt-2">
                  <span className="font-brand-heading text-5xl font-bold text-brand-primary block">
                    {startup.traction.key_metric_value}
                  </span>
                  <span className="text-sm font-semibold text-brand-text mt-1 block">
                    {startup.traction.key_metric_label}
                  </span>
                  <span className="text-xs text-brand-text/70 mt-1 block">
                    Active footprint: <strong>{startup.traction.active_deployments}</strong>
                  </span>
                </div>

                <div className="pt-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60 block mb-2">Key Institutional Partners:</span>
                  <div className="flex flex-wrap gap-2">
                    {startup.traction.key_partners.map((p) => (
                      <span key={p} className="rounded-brand bg-brand-surface border border-brand-primary/20 px-2.5 py-1 text-xs font-semibold text-brand-text">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Milestones Card */}
              <div className="rounded-brand bg-brand-surface border border-brand-primary/20 p-6 sm:p-7 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-4">
                <h3 className="font-brand-heading text-base font-bold uppercase tracking-wider text-brand-primary flex items-center gap-2">
                  <CheckCircle2 className="size-4" /> Major Venture Milestones Achieved
                </h3>
                <div className="space-y-3">
                  {startup.traction.major_milestones.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-brand bg-brand-primary/5 border border-brand-primary/10">
                      <span className="grid size-6 place-items-center rounded-full bg-brand-primary text-white text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-brand-text/90 leading-relaxed">{m}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9. AI PERFORMANCE & BENCHMARKS (TEMPLATE SECTION 10) */}
      {startup.ai_performance && (
        <section id="ai-performance" className="relative mx-auto max-w-7xl scroll-mt-24 border-t border-brand-primary/10 px-4 py-20 sm:px-6 lg:py-24">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
              <Activity className="size-3.5" /> Template Section 10 · Empirical Benchmark Evaluation
            </span>
            <h2 className="font-brand-heading text-3xl font-bold tracking-tight sm:text-[2.15rem]">AI Performance Metrics &amp; Operational Scale</h2>
            <p className="text-sm text-brand-text/70 max-w-2xl">
              Rigorously benchmarked against standard global models and local operational baselines.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-5 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">Primary Metric</span>
              <p className="mt-2 text-xl font-bold text-brand-primary">{startup.ai_performance.current_performance}</p>
              <p className="mt-0.5 text-xs text-brand-text/70 font-semibold">{startup.ai_performance.primary_metric}</p>
            </div>

            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-5 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">Baseline Benchmark</span>
              <p className="mt-2 text-xl font-bold text-brand-text/80">{startup.ai_performance.baseline_benchmark}</p>
              <p className="mt-0.5 text-xs text-brand-text/60">Industry standard comparison</p>
            </div>

            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-5 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">Improvement Delta</span>
              <p className="mt-2 text-xl font-bold text-emerald-600 dark:text-emerald-400">{startup.ai_performance.improvement}</p>
              <p className="mt-0.5 text-xs text-brand-text/60">Over status quo baseline</p>
            </div>

            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-5 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">Edge Latency &amp; Cost</span>
              <p className="mt-2 text-lg font-bold text-brand-text">{startup.ai_performance.latency}</p>
              <p className="mt-0.5 text-xs text-brand-text/60">{startup.ai_performance.inference_cost}</p>
            </div>
          </div>

          {/* Operational Workload & Scale Card */}
          {startup.ai_performance.scale && (
            <div className="mt-4 rounded-brand border border-brand-primary/20 bg-brand-primary/5 p-4 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Cpu className="size-4 text-brand-primary shrink-0" />
                <span className="text-brand-text font-medium">
                  <strong>Operational AI Scale &amp; Throughput:</strong> {startup.ai_performance.scale}
                </span>
              </div>
              <span className="rounded-brand bg-brand-primary/15 px-2.5 py-1 text-[11px] font-bold text-brand-primary shrink-0">
                100% EAII Validated
              </span>
            </div>
          )}

          <div className="mt-3 rounded-brand border border-brand-primary/15 bg-brand-surface p-4 text-xs flex items-center gap-3">
            <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
            <p className="text-brand-text/80">
              <strong>Validation Methodology:</strong> {startup.ai_performance.validation}
            </p>
          </div>
        </section>
      )}

      {/* 10. COMPETITIVE ADVANTAGE & MOATS (TEMPLATE SECTION 11) */}
      {startup.competitive_advantage && (
        <section id="moats" className="relative mx-auto max-w-7xl scroll-mt-24 border-t border-brand-primary/10 px-4 py-20 sm:px-6 lg:py-24">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Template Section 11 · Defensibility</span>
            <h2 className="font-brand-heading text-3xl font-bold tracking-tight sm:text-[2.15rem]">Competitive Advantage &amp; Strategic Moats</h2>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-6 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-2">
              <Shield className="size-5 text-brand-primary" />
              <h3 className="font-brand-heading text-base font-bold">Proprietary IP Moat</h3>
              <p className="text-xs leading-relaxed text-brand-text/80">{startup.competitive_advantage.proprietary_moat}</p>
            </div>

            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-6 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-2">
              <Database className="size-5 text-brand-primary" />
              <h3 className="font-brand-heading text-base font-bold">Local Data Moat</h3>
              <p className="text-xs leading-relaxed text-brand-text/80">{startup.competitive_advantage.local_expertise}</p>
            </div>

            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-6 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-2">
              <Building2 className="size-5 text-brand-primary" />
              <h3 className="font-brand-heading text-base font-bold">Distribution Moat</h3>
              <p className="text-xs leading-relaxed text-brand-text/80">{startup.competitive_advantage.distribution_moat}</p>
            </div>

            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-6 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-2">
              <Users className="size-5 text-brand-primary" />
              <h3 className="font-brand-heading text-base font-bold">Direct Competitors</h3>
              <ul className="text-xs space-y-1 text-brand-text/75 pt-1">
                {startup.competitive_advantage.main_competitors.map((c) => (
                  <li key={c} className="flex items-center gap-1.5">
                    <span className="size-1 rounded-full bg-brand-primary" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 11. LEADERSHIP TEAM & TECHNICAL TALENT (TEMPLATE SECTION 12) */}
      <section id="team-composition" className="relative mx-auto max-w-7xl scroll-mt-24 border-t border-brand-primary/10 px-4 py-20 sm:px-6 lg:py-24">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Template Section 12 · Team Composition</span>
          <h2 className="font-brand-heading text-3xl font-bold tracking-tight sm:text-[2.15rem]">Founding Leadership &amp; Technical Talent</h2>
          <p className="text-sm text-brand-text/70">
            Multidisciplinary team combining elite academic research, clinical/domain expertise, and engineering execution.
          </p>
        </div>

        {startup.founders && startup.founders.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {startup.founders.map((f) => (
              <div key={f.name} className="rounded-brand border border-brand-primary/15 bg-brand-surface p-6 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex items-start gap-4">
                <div className="size-12 rounded-full grid place-items-center bg-brand-primary text-white font-bold text-base shrink-0 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  {f.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="space-y-1">
                  <h3 className="font-brand-heading text-lg font-bold text-brand-text">{f.name}</h3>
                  <p className="text-xs font-bold text-brand-primary">{f.role}</p>
                  <p className="text-xs text-brand-text/80 leading-relaxed pt-1">{f.background}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Technical Team Breakdown & Domain Advantage */}
        {startup.team_breakdown && (
          <div className="mt-6 rounded-brand border border-brand-primary/20 bg-brand-primary/5 p-5 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary block">
              Core Technical Advantage &amp; Research Credentials:
            </span>
            <p className="text-sm font-medium text-brand-text/90 leading-relaxed">
              {startup.team_breakdown.key_team_strength}
            </p>
          </div>
        )}

        {/* Team Diversity & Size Metrics */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-4 text-center">
            <span className="text-xs font-bold text-brand-text/60 uppercase">Total Employees</span>
            <span className="text-xl font-bold text-brand-text block mt-1">{startup.team_size} Staff</span>
          </div>

          <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-4 text-center">
            <span className="text-xs font-bold text-brand-text/60 uppercase">AI / ML Specialists</span>
            <span className="text-xl font-bold text-brand-primary block mt-1">
              {startup.team_breakdown?.ai_data_science_size || 3} Engineers
            </span>
          </div>

          <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-4 text-center sm:col-span-2">
            <span className="text-xs font-bold text-brand-text/60 uppercase">Inclusion &amp; Representation</span>
            <span className="text-sm font-semibold text-brand-primary block mt-1">
              {startup.impact?.women_youth_representation || "Inclusive founding team"}
            </span>
          </div>
        </div>
      </section>

      {/* 12. SOCIAL & ECONOMIC IMPACT (UNDP TIMBUKTOO FOCUS) (TEMPLATE SECTION 13) */}
      {startup.impact && (
        <section id="social-impact" className="relative mx-auto max-w-7xl scroll-mt-24 border-t border-brand-primary/10 px-4 py-20 sm:px-6 lg:py-24">
          <div className="rounded-brand border border-brand-primary/20 bg-brand-primary/5 p-8 sm:p-10 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 rounded-brand bg-brand-primary/15 px-3 py-1 text-xs font-bold text-brand-primary">
                  <Heart className="size-3.5" /> Template Section 13 · UNDP timbuktoo Alignment
                </span>
                <h2 className="font-brand-heading text-3xl font-bold tracking-tight sm:text-[2.15rem]">Measurable Development Impact</h2>
              </div>

              {/* SDG Badges */}
              <div className="flex flex-wrap gap-2">
                {startup.impact.sdgs.map((sdg) => (
                  <div
                    key={sdg.number}
                    className={`rounded-brand px-3 py-1.5 text-xs font-bold shadow-2xs flex items-center gap-1.5 ${SDG_COLORS[sdg.number] || "bg-brand-primary text-white"}`}
                  >
                    <span>SDG {sdg.number}:</span>
                    <span className="font-medium">{sdg.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-brand-text/85">
              {startup.impact.impact_narrative}
            </p>

            <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-brand-primary/10 text-xs">
              <div className="rounded-brand bg-brand-surface p-4 border border-brand-primary/15">
                <span className="font-bold uppercase tracking-wider text-brand-text/60 block text-[10px]">Beneficiaries Reached</span>
                <p className="text-base font-bold text-brand-primary mt-1">{startup.impact.beneficiaries_reached}</p>
              </div>

              <div className="rounded-brand bg-brand-surface p-4 border border-brand-primary/15">
                <span className="font-bold uppercase tracking-wider text-brand-text/60 block text-[10px]">Direct Knowledge Economy Jobs Created</span>
                <p className="text-base font-bold text-brand-text mt-1">{startup.impact.jobs_created} High-Tech Engineering Jobs</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 13. PRO FORMA FINANCIAL PROJECTIONS & UNIT ECONOMICS (TEMPLATE SECTION 15) */}
      {startup.financials && (
        <section id="financial-projections" className="relative mx-auto max-w-7xl scroll-mt-24 border-t border-brand-primary/10 px-4 py-20 sm:px-6 lg:py-24">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
              <BarChart3 className="size-3.5" /> Template Section 15 · 3-Year Financial Model
            </span>
            <h2 className="font-brand-heading text-3xl font-bold tracking-tight sm:text-[2.15rem]">Financial Projections &amp; Unit Economics</h2>
            <p className="text-sm text-brand-text/70">
              Audited historical performance and pro forma 3-year growth model based on living lab unit economics.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {startup.financials.projected.map((fy, idx) => (
              <div
                key={fy.year}
                className="rounded-brand border border-brand-primary/20 bg-brand-surface p-6 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-5"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-brand-primary/10 pb-3">
                    <span className="font-brand-heading text-xl font-bold tracking-tight text-brand-primary">{fy.year}</span>
                    <span className="rounded-brand bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      {fy.gross_margin_pct}% Gross Margin
                    </span>
                  </div>

                  <div className="mt-4 space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-brand-text/60">Projected Revenue</span>
                      <p className="font-brand-heading text-2xl font-bold tracking-tight text-brand-text mt-0.5">
                        {currency.format(fy.revenue_usd)}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-brand-primary/10">
                      <div>
                        <span className="text-[10px] text-brand-text/60 block">Gross Profit</span>
                        <span className="font-semibold text-brand-text">{currency.format(fy.gross_profit_usd)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-brand-text/60 block">Operating EBITDA</span>
                        <span className={`font-semibold ${fy.operating_profit_usd >= 0 ? "text-emerald-600" : "text-amber-600"}`}>
                          {currency.format(fy.operating_profit_usd)}
                        </span>
                      </div>
                    </div>

                    {fy.active_units && (
                      <div className="pt-2 border-t border-brand-primary/10">
                        <span className="text-[10px] text-brand-text/60 block">Commercial Footprint Target</span>
                        <span className="font-semibold text-brand-primary">{fy.active_units}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Growth Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-brand-text/60">
                    <span>Revenue Scale</span>
                    <span>{idx === 0 ? "Initial Scale" : idx === 1 ? "Expansion" : "Market Leadership"}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-brand-primary/15 overflow-hidden">
                    <div
                      className="h-full bg-brand-primary rounded-full"
                      style={{ width: `${Math.min(100, Math.round((fy.revenue_usd / 5000000) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 text-xs">
            <div className="rounded-brand bg-brand-surface border border-brand-primary/15 p-4">
              <span className="font-bold text-brand-text block uppercase text-[10px] tracking-wider">Historical Traction:</span>
              <p className="text-brand-text/80 mt-1">{startup.financials.historical || "Bootstrapped with EAII incubation support."}</p>
            </div>

            <div className="rounded-brand bg-brand-surface border border-brand-primary/15 p-4">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block uppercase text-[10px] tracking-wider">Unit Economics:</span>
              <p className="text-brand-text/80 mt-1">{startup.financials.unit_economics || "Strong software gross margins with rapid payback period."}</p>
            </div>
          </div>
        </section>
      )}

      {/* 14. 18-MONTH STRATEGIC GROWTH & ROADMAP (TEMPLATE SECTION 16) */}
      {startup.growth_plan && (
        <section id="growth-roadmap" className="relative mx-auto max-w-7xl scroll-mt-24 border-t border-brand-primary/10 px-4 py-20 sm:px-6 lg:py-24">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
              <Compass className="size-3.5" /> Template Section 16 · 18-Month Strategic Growth
            </span>
            <h2 className="font-brand-heading text-3xl font-bold tracking-tight sm:text-[2.15rem]">Execution &amp; Expansion Roadmap</h2>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-6 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <Rocket className="size-4 text-brand-primary" />
                <h3 className="font-brand-heading text-sm font-bold text-brand-text">Product Evolution</h3>
              </div>
              <p className="text-xs leading-relaxed text-brand-text/80">{startup.growth_plan.product_growth}</p>
            </div>

            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-6 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-brand-primary" />
                <h3 className="font-brand-heading text-sm font-bold text-brand-text">Customer Acquisition</h3>
              </div>
              <p className="text-xs leading-relaxed text-brand-text/80">{startup.growth_plan.customer_growth}</p>
            </div>

            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-6 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <Globe className="size-4 text-brand-primary" />
                <h3 className="font-brand-heading text-sm font-bold text-brand-text">Regional Expansion</h3>
              </div>
              <p className="text-xs leading-relaxed text-brand-text/80">{startup.growth_plan.geographic_expansion}</p>
            </div>

            <div className="rounded-brand border border-brand-primary/15 bg-brand-surface p-6 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <Brain className="size-4 text-brand-primary" />
                <h3 className="font-brand-heading text-sm font-bold text-brand-text">AI Next-Gen Horizon</h3>
              </div>
              <p className="text-xs leading-relaxed text-brand-text/80">{startup.growth_plan.ai_capability_expansion}</p>
            </div>
          </div>
        </section>
      )}

      {/* 15. INVESTMENT REQUIREMENT & CAPITAL ALLOCATION (TEMPLATE SECTION 14 & 18) */}
      <section id="invest" className="relative mx-auto max-w-7xl scroll-mt-24 border-t border-brand-primary/10 px-4 py-20 sm:px-6 lg:py-24">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-brand-secondary p-8 text-brand-secondary-foreground shadow-2xl shadow-brand-secondary/20 sm:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/15 pb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-brand bg-brand-accent/20 px-3 py-1 text-xs font-bold text-brand-accent">
                <Wallet className="size-3.5" /> Investment Requirement (Template Section 14)
              </span>
              <p className="mt-4 font-brand-heading text-4xl sm:text-6xl font-bold tracking-tight">
                {currency.format(startup.investment_ask.amount_usd)}
                <span className="ml-3 align-middle text-lg font-normal opacity-80">
                  {startup.investment_ask.round} Round
                </span>
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs opacity-85">
                <span>Preferred Instrument: <strong>{startup.investment_ask.preferred_instrument || "SAFE / Priced Equity"}</strong></span>
                {startup.investment_ask.current_funding && (
                  <>
                    <span>·</span>
                    <span>Prior Capital: <strong>{startup.investment_ask.current_funding}</strong></span>
                  </>
                )}
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-90">
                <strong>Primary Capital Objective:</strong> {startup.investment_ask.use_of_funds}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <Button
                onClick={() => setDiligenceModalOpen(true)}
                className="rounded-brand bg-brand-accent text-brand-accent-foreground font-bold px-6 h-12 hover:opacity-90 shadow-lg gap-2 text-sm cursor-pointer transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2"
              >
                <Shield className="size-4" /> Request Diligence Access
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-brand border-white/30 text-white hover:bg-white/10 font-semibold px-6 h-12 text-sm"
              >
                <Link to="/portal">
                  <Lock className="size-4 mr-2" /> Founder Portal Console
                </Link>
              </Button>
            </div>
          </div>

          {/* Detailed Use of Funds Progress Breakdown */}
          {startup.investment_ask.funds_breakdown && startup.investment_ask.funds_breakdown.length > 0 && (
            <div className="mt-8 pt-2">
              <h3 className="font-brand-heading text-lg font-bold">Planned Capital Deployment Allocation</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {startup.investment_ask.funds_breakdown.map((item) => (
                  <div key={item.category} className="rounded-brand bg-white/5 p-4 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold">{item.category}</span>
                      <span className="font-mono font-bold text-brand-accent">
                        {item.percentage}% ({currency.format(item.amount_usd)})
                      </span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                      <div className="h-full bg-brand-accent rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                    <p className="text-[11px] opacity-80">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Official Investor Contacts */}
          {startup.links && startup.links.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs opacity-75 font-semibold">Official Channels:</span>
                {startup.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-brand bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 transition-all inline-flex items-center gap-1.5"
                  >
                    <Globe className="size-3" />
                    <span>{link.label}</span>
                    <ExternalLink className="size-2.5 opacity-70" />
                  </a>
                ))}
              </div>

              <div className="text-xs opacity-80">
                AI UNIPOD Ref: <strong>{startup.slug}</strong> · Sovereign Incubation Track
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 16. INSTITUTIONAL DILIGENCE VAULT SECTION */}
      {startup.diligence_documents && startup.diligence_documents.length > 0 && (
        <section id="diligence-vault" className="relative mx-auto max-w-7xl scroll-mt-24 border-t border-brand-primary/10 px-4 py-20 sm:px-6 lg:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
                <FileCheck className="size-3.5" /> Diligence Room Vault
              </span>
              <h2 className="font-brand-heading text-3xl font-bold tracking-tight sm:text-[2.15rem] mt-1">Verified Investor Assets ({startup.diligence_documents.length})</h2>
            </div>
            <Button
              size="sm"
              onClick={() => setDiligenceModalOpen(true)}
              className="rounded-brand bg-brand-primary text-brand-primary-foreground text-xs font-bold h-9 cursor-pointer transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2"
            >
              Request Master Data Room Key
            </Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {startup.diligence_documents.map((doc) => (
              <div
                key={doc.title}
                className="rounded-brand border border-brand-primary/15 bg-brand-surface p-5 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded-brand bg-brand-primary/10 px-2 py-0.5 font-bold text-brand-primary text-[10px]">
                      {doc.category}
                    </span>
                    <span
                      className={`rounded-brand px-2 py-0.5 font-bold text-[10px] ${doc.status === "Verified"
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                        : doc.status === "Available"
                          ? "bg-blue-500/15 text-blue-700 dark:text-blue-400"
                          : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                        }`}
                    >
                      {doc.status}
                    </span>
                  </div>

                  <h3 className="font-brand-heading text-sm font-bold text-brand-text mt-3 leading-snug">
                    {doc.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-brand-primary/10 text-xs">
                  <span className="font-mono text-brand-text/60 text-[11px]">
                    {doc.file_type} · {doc.file_size}
                  </span>
                  <button
                    onClick={() => handleDownloadDoc(doc.title)}
                    disabled={downloadingDoc === doc.title}
                    className="inline-flex items-center gap-1 font-bold text-brand-primary hover:underline cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2 transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2"
                  >
                    <Download className="size-3" />
                    <span>{downloadingDoc === doc.title ? "Preparing..." : "Inspect"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 17. KEY OPERATIONAL & TECHNICAL RISKS (TEMPLATE SECTION 17) */}
      {startup.risks && startup.risks.length > 0 && (
        <section id="risks" className="relative mx-auto max-w-7xl scroll-mt-24 border-t border-brand-primary/10 px-4 py-20 sm:px-6 lg:py-24">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-text/60">Template Section 17 · Risk Management</span>
            <h2 className="font-brand-heading text-2xl font-bold tracking-tight">Key Risks &amp; Engineered Mitigations</h2>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {startup.risks.map((r, idx) => (
              <div key={idx} className="rounded-brand border border-brand-primary/15 bg-brand-surface p-5 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-text">Risk {idx + 1}</span>
                  <span
                    className={`rounded-brand px-2 py-0.5 text-[10px] font-bold ${r.severity === "High"
                      ? "bg-rose-500/15 text-rose-600"
                      : r.severity === "Medium"
                        ? "bg-amber-500/15 text-amber-600"
                        : "bg-blue-500/15 text-blue-600"
                      }`}
                  >
                    {r.severity} Severity
                  </span>
                </div>
                <p className="text-xs font-medium text-brand-text/90">{r.risk}</p>
                <div className="pt-2 border-t border-brand-primary/10 text-xs">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-[10px] uppercase">Engineered Mitigation:</span>
                  <p className="text-brand-text/75 mt-0.5 text-[11px] leading-relaxed">{r.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 18. CROSS-VENTURE DISCOVERY CAROUSEL */}
      {siblingVentures.length > 0 && (
        <section className="relative mx-auto max-w-7xl scroll-mt-24 border-t border-brand-primary/10 px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Cohort Portfolio Discovery</span>
              <h2 className="font-brand-heading text-xl font-bold tracking-tight mt-1">Explore Other AI UNIPOD Ventures</h2>
            </div>
            <Link to="/startups" className="text-xs font-bold text-brand-primary hover:underline">
              View All Startups →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {siblingVentures.map((sib) => (
              <Link
                key={sib.slug}
                to="/$startupSlug"
                params={{ startupSlug: sib.slug }}
                className="group rounded-brand border border-brand-primary/15 bg-brand-surface p-5 shadow-sm shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/45 hover:shadow-xl space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-brand-primary">{sib.sector}</span>
                  <span className="text-[10px] text-brand-text/60">{getStartupCohort(sib)}</span>
                </div>
                <h3 className="font-brand-heading text-base font-bold text-brand-text group-hover:text-brand-primary transition-colors">
                  {sib.name}
                </h3>
                <p className="text-xs text-brand-text/75 line-clamp-2 leading-relaxed">
                  {sib.tagline}
                </p>
                <div className="pt-2 text-[11px] font-semibold text-brand-primary flex items-center gap-1">
                  <span>Open Deal Book</span>
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 19. ECOSYSTEM NAVIGATION FOOTER */}
      <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-brand-primary/15 pt-6 text-sm">
          <Link to="/startups" className="inline-flex items-center gap-1.5 text-brand-primary font-semibold hover:underline">
            ← Back to Startups Directory ({cohort})
          </Link>
          <div className="flex items-center gap-4 text-xs text-brand-text/70">
            <Link to="/cohort-3" className="hover:text-brand-primary transition-colors">
              Cohort 3 Incubation
            </Link>
            <span>·</span>
            <Link to="/jobs" className="hover:text-brand-primary transition-colors">
              Open Positions
            </Link>
            <span>·</span>
            <Link to="/investor" className="hover:text-brand-primary transition-colors font-semibold text-brand-primary">
              Investor Portal →
            </Link>
          </div>
        </div>
      </section>

      {/* DILIGENCE ACCESS DIALOG MODAL */}
      <Dialog open={diligenceModalOpen} onOpenChange={setDiligenceModalOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto rounded-brand border border-brand-primary/25 bg-background">
          <DialogHeader>
            <DialogTitle className="font-brand-heading text-xl font-bold tracking-tight flex items-center gap-2">
              <ShieldCheck className="size-5 text-emerald-600" />
              {startup.name} · Verified Deal Room
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Accredited institutional investors and development partners can access full cap tables, audited benchmarks, and regulatory filings.
            </DialogDescription>
          </DialogHeader>

          {/* Available Documents Checklist */}
          {startup.diligence_documents && startup.diligence_documents.length > 0 && (
            <div className="space-y-2 my-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary block">
                Available Institutional Dossiers:
              </span>
              <div className="space-y-2">
                {startup.diligence_documents.map((doc) => (
                  <div
                    key={doc.title}
                    className="flex items-center justify-between p-2.5 rounded-brand bg-brand-primary/5 border border-brand-primary/10 text-xs"
                  >
                    <div className="space-y-0.5">
                      <span className="font-semibold block">{doc.title}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {doc.category} · {doc.file_type} ({doc.file_size})
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadDoc(doc.title)}
                      disabled={downloadingDoc === doc.title}
                      className="h-7 text-[11px] rounded-brand cursor-pointer transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2"
                    >
                      <Download className="size-3 mr-1" />
                      {downloadingDoc === doc.title ? "Sending..." : "Download"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Request Form */}
          <form onSubmit={handleRequestAccessSubmit} className="space-y-3 pt-2 border-t">
            <span className="text-xs font-bold block">Request Full Data Room Access Key</span>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="inv-name" className="text-xs">Investor Full Name</Label>
                <Input
                  id="inv-name"
                  required
                  placeholder="e.g. Maya Abebe"
                  value={investorName}
                  onChange={(e) => setInvestorName(e.target.value)}
                  className="h-8 text-xs rounded-brand"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="inv-fund" className="text-xs">Fund / Institution</Label>
                <Input
                  id="inv-fund"
                  placeholder="e.g. Novastar / Partech / IFC"
                  value={investorFund}
                  onChange={(e) => setInvestorFund(e.target.value)}
                  className="h-8 text-xs rounded-brand"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="inv-email" className="text-xs">Institutional Email</Label>
              <Input
                id="inv-email"
                type="email"
                required
                placeholder="investor@venturefund.com"
                value={investorEmail}
                onChange={(e) => setInvestorEmail(e.target.value)}
                className="h-8 text-xs rounded-brand"
              />
            </div>

            <DialogFooter className="mt-4 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setDiligenceModalOpen(false)}
                className="text-xs h-8"
              >
                Close
              </Button>
              <Button
                type="submit"
                disabled={submittingAccess}
                className="bg-brand-primary text-brand-primary-foreground font-bold text-xs h-8 cursor-pointer transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2"
              >
                {submittingAccess ? "Dispatching..." : "Submit Access Request"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DynamicStartupLayout>
  );
}
