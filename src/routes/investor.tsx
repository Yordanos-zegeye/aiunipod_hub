import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  DollarSign,
  Download,
  ExternalLink,
  Eye,
  FileCheck,
  FileText,
  Filter,
  Globe,
  GraduationCap,
  Layers,
  LayoutDashboard,
  Lock,
  LogOut,
  Menu,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Rocket,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  TrendingUp,
  Unlock,
  User,
  UserCheck,
  Users,
  Wallet,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { STARTUPS, type Startup } from "@/data/startups";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/investor")({
  head: () => ({
    meta: [
      { title: "Investor Portal & Deal Room — AI UNIPOD Ethiopia" },
      { name: "description", content: "Discover pre-vetted AI startups, request confidential access, and manage your investment pipeline." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: InvestorPortalPage,
});

type PipelineStage = "Watching" | "Reviewing" | "In Talks" | "Committed" | "Passed";

interface PipelineDeal {
  startupSlug: string;
  stage: PipelineStage;
  privateNotes: string;
  pledgedAmount?: number;
}

type InvestorTab = "pipeline" | "kanban" | "startups" | "dataroom" | "commitments" | "impact";

export function InvestorPortalPage() {
  const { user, switchDemoRole, logout } = useAuth();
  const navigate = useNavigate();

  const isInvestor = user?.role === "INVESTOR" || user?.role === "SUPER_ADMIN";
  const vettingStatus = user?.investorProfile?.vettingStatus || (user?.role === "SUPER_ADMIN" ? "VETTED" : "PENDING");

  const [activeTab, setActiveTab] = useState<InvestorTab>("pipeline");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Personal deal pipeline state (PRD FR-18)
  const [pipeline, setPipeline] = useState<PipelineDeal[]>([
    {
      startupSlug: "sela-health",
      stage: "In Talks",
      privateNotes: "Met founder at EAII demo day. Impressive offline Amharic NLP benchmarks. Reviewing clinical data room.",
      pledgedAmount: 100000,
    },
    {
      startupSlug: "kuraz-agri",
      stage: "Reviewing",
      privateNotes: "Cooperative yield matching product looks defensible with satellite integrations in Hawassa.",
    },
    {
      startupSlug: "adera-labs",
      stage: "Watching",
      privateNotes: "Early stage speech-to-text API. Following progress on government service line integrations.",
    },
  ]);

  const [activePipelineTab, setActivePipelineTab] = useState<PipelineStage | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const updateStage = (slug: string, newStage: PipelineStage) => {
    setPipeline((prev) =>
      prev.map((deal) => (deal.startupSlug === slug ? { ...deal, stage: newStage } : deal))
    );
    toast.success(`Updated deal stage to ${newStage}`);
  };

  const handleLogCommitment = (slug: string) => {
    const startupObj = STARTUPS.find((s) => s.slug === slug);
    const amountStr = window.prompt(`Enter pledged investment amount in USD for ${startupObj?.name || slug}:`, "50000");
    if (!amountStr) return;
    const amount = parseInt(amountStr);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid numeric amount");
      return;
    }

    setPipeline((prev) => {
      const exists = prev.some((d) => d.startupSlug === slug);
      if (exists) {
        return prev.map((deal) =>
          deal.startupSlug === slug ? { ...deal, stage: "Committed", pledgedAmount: amount } : deal
        );
      } else {
        return [
          ...prev,
          {
            startupSlug: slug,
            stage: "Committed",
            privateNotes: "Soft commitment logged via UNIPOD syndicate portal.",
            pledgedAmount: amount,
          },
        ];
      }
    });
    toast.success(`Logged $${amount.toLocaleString()} investment commitment (PRD FR-19)!`);
  };

  const handleAddToPipeline = (slug: string) => {
    if (pipeline.some((d) => d.startupSlug === slug)) {
      toast.info("This startup is already in your deal pipeline!");
      return;
    }
    const newDeal: PipelineDeal = {
      startupSlug: slug,
      stage: "Watching",
      privateNotes: "Added from directory exploration.",
    };
    setPipeline((prev) => [newDeal, ...prev]);
    toast.success("Added venture to Watching pipeline!");
  };

  const filteredDeals = pipeline.filter((d) => {
    if (activePipelineTab !== "All" && d.stage !== activePipelineTab) return false;
    if (!searchQuery.trim()) return true;
    const s = STARTUPS.find((item) => item.slug === d.startupSlug);
    const q = searchQuery.toLowerCase();
    return (
      s?.name.toLowerCase().includes(q) ||
      s?.sector.toLowerCase().includes(q) ||
      d.privateNotes.toLowerCase().includes(q)
    );
  });

  const totalCommittedUsd = pipeline.reduce((sum, d) => sum + (d.pledgedAmount || 0), 0);

  // Navigation Items
  const navItems = [
    {
      id: "pipeline" as const,
      label: "Deal Flow Pipeline",
      description: "Manage stages & notes (FR-18)",
      icon: LayoutDashboard,
      badge: `${pipeline.length} Deals`,
    },
    {
      id: "kanban" as const,
      label: "Deal Kanban",
      description: "Visual pipeline columns",
      icon: Layers,
      badge: null,
    },
    {
      id: "startups" as const,
      label: "Startups Explorer",
      description: "Pre-screened living lab AI",
      icon: Building2,
      badge: `${STARTUPS.length}`,
    },
    {
      id: "dataroom" as const,
      label: "Confidential Data Room",
      description: "Pitch decks & models (FR-14)",
      icon: ShieldCheck,
      badge: vettingStatus === "VETTED" ? "Unlocked" : "Gated",
      badgeColor:
        vettingStatus === "VETTED"
          ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
          : "bg-amber-500/20 text-amber-600 dark:text-amber-400",
    },
    {
      id: "commitments" as const,
      label: "Portfolio & Commitments",
      description: "Track allocations (FR-19)",
      icon: DollarSign,
      badge: `$${(totalCommittedUsd / 1000).toFixed(0)}k`,
      badgeColor: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    },
    {
      id: "impact" as const,
      label: "UNDP Impact Rollup",
      description: "SDGs & living lab compute",
      icon: TrendingUp,
      badge: "SDG 3, 2, 8",
    },
  ];

  // ==========================================
  // UNGATED / UNAUTHORIZED LOCK SCREEN
  // ==========================================
  if (!isInvestor) {
    return (
      <div className="min-h-screen bg-background font-body text-foreground antialiased selection:bg-primary selection:text-primary-foreground flex flex-col justify-between">
        <header className="border-b border-border/70 bg-card/60 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/aiunipod-logo.webp" alt="AI UNIPOD" width="130" height="32" className="h-7 w-auto object-contain" />
          </Link>
          <Button asChild variant="outline" size="sm" className="rounded-xl text-xs">
            <Link to="/">Back to Public Portal</Link>
          </Button>
        </header>

        <main className="relative flex flex-1 items-center justify-center px-5 py-16">
          <div className="relative z-10 w-full max-w-lg rounded-3xl border border-border/80 bg-card p-8 sm:p-10 shadow-xl text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 shadow-xs">
              <Wallet className="size-8" />
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                <Shield className="size-3.5" /> Investor & Syndicate Perimeter
              </span>
            </div>

            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Investor Sign In Required
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The UNIPOD Investor Deal Room provides private access to pre-screened AI ventures, pitch decks, and syndicate deal flow.
              {user ? (
                <> You are currently signed in as <strong>{user.name}</strong> ({user.role}).</>
              ) : (
                <> Please sign in with an investor account to continue.</>
              )}
            </p>

            <div className="mt-8 space-y-3">
              <Button
                onClick={() => {
                  switchDemoRole("investor_vetted");
                  toast.success("Authorized as Vetted Investor (investor@investor.com)");
                }}
                className="w-full h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md gap-2"
              >
                <ShieldCheck className="size-4" /> Sign In as Vetted Investor (investor@investor.com)
              </Button>

              <Button
                onClick={() => {
                  switchDemoRole("investor_pending");
                  toast.success("Authorized as Pending Investor (angel@investor.com)");
                }}
                variant="outline"
                className="w-full h-12 rounded-2xl border-border font-semibold text-sm gap-2"
              >
                <Clock className="size-4 text-amber-500" /> Sign In as Pending Investor (angel@investor.com)
              </Button>
            </div>

            <div className="mt-6 border-t border-border pt-5 text-xs text-muted-foreground">
              <p>Protected by AI UNIPOD Ethiopia Multi-Tenant RBAC Framework</p>
            </div>
          </div>
        </main>

        <footer className="border-t border-border/70 py-4 text-center text-xs text-muted-foreground">
          © 2026 AI UNIPOD Ethiopia · Ethiopian Artificial Intelligence Institute (EAII) · timbuktoo
        </footer>
      </div>
    );
  }

  const investorOrg = user?.investorProfile?.organization || "Novastar Ventures";

  return (
    <div className="min-h-screen bg-background font-body text-foreground antialiased flex">
      {/* ================================================== */}
      {/* 1. LEFT SIDEBAR (DESKTOP) */}
      {/* ================================================== */}
      <aside
        className={`hidden lg:flex flex-col border-r border-border bg-card/70 backdrop-blur-xl transition-[width] duration-300 z-30 shrink-0 sticky top-0 h-screen ${
          sidebarCollapsed ? "w-20" : "w-72"
        }`}
      >
        {/* Brand & Investor Header */}
        <div className="h-18 flex items-center justify-between px-5 border-b border-border/80">
          {!sidebarCollapsed ? (
            <Link to="/investor" className="flex items-center gap-3 overflow-hidden">
              <div className="size-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 grid place-items-center shrink-0">
                <Wallet className="size-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="overflow-hidden">
                <span className="font-display font-bold text-sm tracking-tight text-foreground block truncate">
                  {investorOrg}
                </span>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                  {vettingStatus === "VETTED" ? "Vetted Deal Room" : "Pending Review"}
                </span>
              </div>
            </Link>
          ) : (
            <Link to="/investor" className="mx-auto" title={investorOrg}>
              <div className="size-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 grid place-items-center">
                <Wallet className="size-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </Link>
          )}

          <button
            type="button"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:grid size-8 place-items-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0"
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-6 no-scrollbar">
          {/* Main Navigation Section */}
          <div className="space-y-1">
            {!sidebarCollapsed && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Deal Syndicate
              </p>
            )}
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-xs font-semibold transition-all relative ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  <Icon className={`size-4.5 shrink-0 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  {!sidebarCollapsed && (
                    <div className="flex flex-1 items-center justify-between text-left truncate">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ml-1.5 shrink-0 ${
                            isActive
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : item.badgeColor || "bg-muted text-muted-foreground"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* External & Living Lab Ecosystem */}
          <div className="space-y-1 pt-3 border-t border-border/60">
            {!sidebarCollapsed && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Living Lab & Portals
              </p>
            )}

            <Link
              to="/startups"
              title="Public Directory"
              className="w-full flex items-center gap-3 rounded-2xl px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all"
            >
              <Globe className="size-4 shrink-0" />
              {!sidebarCollapsed && <span className="truncate flex-1">Startups Directory</span>}
              {!sidebarCollapsed && <ArrowUpRight className="size-3 text-muted-foreground/60" />}
            </Link>

            <Link
              to="/cohort-3"
              title="Cohort 3"
              className="w-full flex items-center gap-3 rounded-2xl px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all"
            >
              <GraduationCap className="size-4 shrink-0" />
              {!sidebarCollapsed && <span className="truncate flex-1">Cohort 3 Pipeline</span>}
              {!sidebarCollapsed && <ArrowUpRight className="size-3 text-muted-foreground/60" />}
            </Link>

            <Link
              to="/jobs"
              title="Jobs Board"
              className="w-full flex items-center gap-3 rounded-2xl px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all"
            >
              <Briefcase className="size-4 shrink-0" />
              {!sidebarCollapsed && <span className="truncate flex-1">Ecosystem Talent</span>}
              {!sidebarCollapsed && <ArrowUpRight className="size-3 text-muted-foreground/60" />}
            </Link>
          </div>
        </div>

        {/* Sidebar Footer User Card */}
        <div className="p-3 border-t border-border/80">
          <div
            className={`rounded-2xl border border-border/70 bg-muted/30 p-2.5 flex items-center gap-3 ${
              sidebarCollapsed ? "justify-center" : ""
            }`}
          >
            <img
              src={user?.avatarUrl || "/avatars/investor.svg"}
              alt={user?.name || "Vetted Investor"}
              width={36}
              height={36}
              className="size-9 rounded-xl object-cover shrink-0 border border-border"
            />

            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-foreground truncate">{user?.name || "Vetted Investor"}</p>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`size-1.5 rounded-full ${
                      vettingStatus === "VETTED" ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                  />
                  <p className="text-[10px] text-muted-foreground truncate">{investorOrg}</p>
                </div>
              </div>
            )}

            {!sidebarCollapsed && (
              <button
                type="button"
                onClick={() => {
                  logout();
                  toast.info("Logged out from investor portal");
                }}
                className="text-muted-foreground hover:text-destructive p-1 rounded-lg transition-colors"
                title="Sign out"
              >
                <LogOut className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ================================================== */}
      {/* 2. MOBILE DRAWER */}
      {/* ================================================== */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-card border-r border-border p-5 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="size-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 grid place-items-center text-emerald-600">
                    <Wallet className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-foreground">{investorOrg}</h3>
                    <p className="text-[10px] text-emerald-600 font-semibold uppercase">Investor Deal Room</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="rounded-xl p-1 text-muted-foreground hover:bg-muted"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-5 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold ${
                        isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-foreground">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-border space-y-1">
                <Link
                  to="/startups"
                  className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted"
                >
                  <span className="flex items-center gap-2"><Globe className="size-4" /> Startups Directory</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={user?.avatarUrl || "/avatars/investor.svg"}
                  alt={user?.name || "Vetted Investor"}
                  width={32}
                  height={32}
                  className="size-8 rounded-lg object-cover shrink-0 border border-border"
                />
                <div className="text-left">
                  <p className="text-xs font-bold text-foreground">{user?.name || "Vetted Investor"}</p>
                  <p className="text-[10px] text-muted-foreground">{vettingStatus}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => logout()}
                className="text-muted-foreground hover:text-destructive p-1"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* 3. MAIN DASHBOARD CONTENT AREA */}
      {/* ================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-18 border-b border-border/80 bg-card/60 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden grid size-9 place-items-center rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Menu className="size-5" />
            </button>

            {/* Breadcrumb Path */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-muted-foreground">Investor Portal</span>
              <ChevronRight className="size-3.5 text-muted-foreground/60" />
              <span className="font-bold text-foreground">
                {navItems.find((n) => n.id === activeTab)?.label}
              </span>
            </div>
          </div>

          {/* Right Header: Vetting Switcher, Demo Roles, Commit CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Demo Investor Switcher */}
            <div className="hidden sm:flex items-center gap-1 rounded-2xl border border-border bg-card p-1 text-xs">
              <button
                type="button"
                onClick={() => switchDemoRole("investor_vetted")}
                className={`rounded-xl px-2.5 py-1 font-semibold transition-all ${
                  vettingStatus === "VETTED"
                    ? "bg-emerald-600 text-white shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Vetted Investor
              </button>
              <button
                type="button"
                onClick={() => switchDemoRole("investor_pending")}
                className={`rounded-xl px-2.5 py-1 font-semibold transition-all ${
                  vettingStatus === "PENDING"
                    ? "bg-amber-500 text-black shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Pending
              </button>
              <button
                type="button"
                onClick={() => {
                  switchDemoRole("startup_admin");
                  navigate({ to: "/portal" });
                }}
                className="rounded-xl px-2.5 py-1 font-semibold text-muted-foreground hover:text-foreground transition-all"
              >
                Founder
              </button>
              <button
                type="button"
                onClick={() => {
                  switchDemoRole("super_admin");
                  navigate({ to: "/admin" });
                }}
                className="rounded-xl px-2.5 py-1 font-semibold text-muted-foreground hover:text-foreground transition-all"
              >
                Admin
              </button>
            </div>

            {/* Log Investment Commitment CTA */}
            <Button
              size="sm"
              onClick={() => handleLogCommitment("sela-health")}
              className="rounded-xl text-xs h-9 gap-1.5 font-semibold bg-primary text-primary-foreground shadow-xs"
            >
              <Plus className="size-3.5" /> <span className="hidden sm:inline">Log Commitment</span> (FR-19)
            </Button>
          </div>
        </header>

        {/* Main Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-8">
          {/* Header Banner */}
          <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card/90 to-muted/30 p-6 sm:p-8 shadow-xs relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <Wallet className="size-3.5" /> AI Syndicate Deal Room
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                      vettingStatus === "VETTED"
                        ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30"
                        : "bg-amber-500/15 text-amber-600 border border-amber-500/30"
                    }`}
                  >
                    {vettingStatus} Account (FR-16)
                  </span>
                  <span className="rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                    Check Size: {user?.investorProfile?.ticketSize || "$150k – $500k"}
                  </span>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {investorOrg} Deal Pipeline
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed">
                  Track living lab AI startups across deal stages (Watching, Reviewing, In Talks, Committed, Passed), request access to confidential data rooms, and log syndicate commitments (FR-18, FR-19).
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-right">
                  <p className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Total Committed</p>
                  <p className="font-display text-xl font-bold text-emerald-700 dark:text-emerald-300">
                    ${totalCommittedUsd.toLocaleString()} USD
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* VETTING STATUS PENDING ALERT */}
          {vettingStatus === "PENDING" && (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-xs text-amber-800 dark:text-amber-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <ShieldAlert className="size-4 shrink-0 text-amber-600" />
                <span>Account Awaiting Administrative Vetting (PRD Section 4.4 FR-16)</span>
              </div>
              <p className="leading-relaxed">
                Your investor profile is currently under review by UNIPOD program administrators. You can browse public startup profiles and curate your watchlist, but confidential pitch materials, data rooms, and financial models remain locked until your accreditation is confirmed.
              </p>
              <div className="pt-1 flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => switchDemoRole("investor_vetted")}
                  className="rounded-xl border-amber-500/30 bg-amber-500/20 text-xs text-amber-900 dark:text-amber-100"
                >
                  Simulate Vetted Status (One-Click)
                </Button>
              </div>
            </div>
          )}

          {/* TAB 1: DEAL FLOW PIPELINE (FR-18) */}
          {activeTab === "pipeline" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">Personal Deal Pipeline (FR-18)</h3>
                  <p className="text-xs text-muted-foreground">
                    Filter by deal stage, add private diligence notes, and record committed ticket amounts.
                  </p>
                </div>

                {/* Stage Filter Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar rounded-xl border border-border bg-card p-1 text-xs">
                  {(["All", "Watching", "Reviewing", "In Talks", "Committed", "Passed"] as const).map((stage) => (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => setActivePipelineTab(stage)}
                      className={`rounded-lg px-3 py-1 font-semibold transition-all ${
                        activePipelineTab === stage
                          ? "bg-primary text-primary-foreground shadow-2xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
              </div>

              {/* Deals Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDeals.map((deal) => {
                  const s = STARTUPS.find((item) => item.slug === deal.startupSlug) || STARTUPS[0]!;
                  return (
                    <div
                      key={deal.startupSlug}
                      className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-xs hover:border-primary/40 transition-all"
                    >
                      <div>
                        {/* Top Badges */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                            {s.sector}
                          </span>
                          <select
                            value={deal.stage}
                            onChange={(e) => updateStage(deal.startupSlug, e.target.value as PipelineStage)}
                            className="rounded-lg border border-border bg-background px-2 py-1 text-[11px] font-bold text-foreground focus:outline-hidden"
                          >
                            <option value="Watching">Watching</option>
                            <option value="Reviewing">Reviewing</option>
                            <option value="In Talks">In Talks</option>
                            <option value="Committed">Committed</option>
                            <option value="Passed">Passed</option>
                          </select>
                        </div>

                        <h4 className="mt-4 font-display text-xl font-bold text-foreground">{s.name}</h4>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{s.tagline}</p>

                        <div className="mt-4 rounded-2xl border border-border/80 bg-muted/20 p-3 text-xs space-y-1">
                          <p className="text-[11px] text-muted-foreground uppercase font-semibold">Investment Ask</p>
                          <p className="font-bold text-base text-foreground">
                            ${s.investment_ask.amount_usd.toLocaleString()} ({s.investment_ask.round})
                          </p>
                        </div>

                        {deal.pledgedAmount && (
                          <div className="mt-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Committed Amount</p>
                            <p className="font-display font-bold text-emerald-700 dark:text-emerald-300 text-lg">
                              ${deal.pledgedAmount.toLocaleString()} USD
                            </p>
                          </div>
                        )}

                        {/* Private Notes */}
                        <div className="mt-4">
                          <p className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                            <MessageSquare className="size-3" /> Private Notes
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground italic bg-background/50 p-2.5 rounded-xl border border-border">
                            "{deal.privateNotes}"
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between gap-2">
                        <Button asChild size="sm" variant="outline" className="rounded-xl text-xs">
                          <Link to="/$startupSlug" params={{ startupSlug: s.slug }}>
                            View Details <ChevronRight className="ml-1 size-3" />
                          </Link>
                        </Button>

                        <Button
                          size="sm"
                          onClick={() => handleLogCommitment(deal.startupSlug)}
                          className="rounded-xl text-xs bg-primary text-primary-foreground font-semibold"
                        >
                          Log Commitment (FR-19)
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: DEAL KANBAN BOARD */}
          {activeTab === "kanban" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">Syndicate Deal Kanban</h3>
                  <p className="text-xs text-muted-foreground">
                    Move opportunities through stages from initial watchlist to signed commitment.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setActiveTab("startups")}
                  variant="outline"
                  className="rounded-xl text-xs"
                >
                  <Plus className="size-3.5 mr-1" /> Add More Deals
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                {(["Watching", "Reviewing", "In Talks", "Committed"] as const).map((colStage) => {
                  const stageDeals = pipeline.filter((d) => d.stage === colStage);
                  return (
                    <div key={colStage} className="rounded-3xl border border-border bg-card p-4 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-border">
                        <span className="font-display font-bold text-xs uppercase tracking-wider text-foreground">
                          {colStage}
                        </span>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                          {stageDeals.length}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {stageDeals.length === 0 ? (
                          <div className="rounded-2xl border border-dashed border-border/80 p-6 text-center text-xs text-muted-foreground">
                            No deals in this stage
                          </div>
                        ) : (
                          stageDeals.map((deal) => {
                            const st = STARTUPS.find((item) => item.slug === deal.startupSlug) || STARTUPS[0]!;
                            return (
                              <div
                                key={deal.startupSlug}
                                className="rounded-2xl border border-border bg-background p-4 shadow-2xs space-y-2 hover:border-primary/50 transition-all"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                                    {st.sector}
                                  </span>
                                  {deal.pledgedAmount && (
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                      ${(deal.pledgedAmount / 1000).toFixed(0)}k
                                    </span>
                                  )}
                                </div>
                                <h5 className="font-bold text-xs text-foreground">{st.name}</h5>
                                <p className="text-[11px] text-muted-foreground line-clamp-2">{st.tagline}</p>
                                
                                <div className="pt-2 border-t border-border flex items-center justify-between text-[10px]">
                                  <Link
                                    to="/$startupSlug"
                                    params={{ startupSlug: st.slug }}
                                    className="font-semibold text-primary hover:underline"
                                  >
                                    Inspect
                                  </Link>
                                  <select
                                    value={deal.stage}
                                    onChange={(e) => updateStage(deal.startupSlug, e.target.value as PipelineStage)}
                                    className="bg-muted text-[10px] rounded px-1.5 py-0.5 font-bold"
                                  >
                                    <option value="Watching">Watching</option>
                                    <option value="Reviewing">Reviewing</option>
                                    <option value="In Talks">In Talks</option>
                                    <option value="Committed">Committed</option>
                                    <option value="Passed">Passed</option>
                                  </select>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: STARTUPS EXPLORER */}
          {activeTab === "startups" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">Living Lab Startups Explorer</h3>
                  <p className="text-xs text-muted-foreground">
                    Discover pre-screened cohort ventures incubated at EAII with ready investment asks.
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search ventures, AI models..."
                    className="w-full rounded-xl border border-border bg-card pl-9 pr-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {STARTUPS.map((s) => {
                  const inPipeline = pipeline.some((d) => d.startupSlug === s.slug);
                  return (
                    <div
                      key={s.slug}
                      className="rounded-3xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-all"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                              {s.sector}
                            </span>
                            <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-bold text-primary">
                              {s.cohort || "Cohort 3"}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">{s.location}</span>
                        </div>

                        <h4 className="font-display text-xl font-bold text-foreground">{s.name}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{s.description}</p>

                        <div className="rounded-2xl border border-border bg-muted/20 p-3.5 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground font-semibold">Investment Ask</span>
                            <span className="font-bold text-foreground">${s.investment_ask.amount_usd.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground font-semibold">Stage</span>
                            <span className="font-bold text-primary">{s.investment_ask.round}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between gap-2">
                        <Button asChild size="sm" variant="outline" className="rounded-xl text-xs">
                          <Link to="/$startupSlug" params={{ startupSlug: s.slug }}>
                            Inspect Profile
                          </Link>
                        </Button>

                        {inPipeline ? (
                          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="size-3.5" /> In Pipeline
                          </span>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleAddToPipeline(s.slug)}
                            className="rounded-xl text-xs bg-primary text-primary-foreground font-semibold"
                          >
                            <Plus className="size-3.5 mr-1" /> Add to Pipeline
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: CONFIDENTIAL DATA ROOM */}
          {activeTab === "dataroom" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">Confidential Diligence Data Room (FR-14)</h3>
                    <p className="text-xs text-muted-foreground">
                      Access restricted pitch materials, financial models, and model benchmark weights.
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                      vettingStatus === "VETTED"
                        ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30"
                        : "bg-amber-500/15 text-amber-600 border border-amber-500/30"
                    }`}
                  >
                    {vettingStatus} Access
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      title: "Sela Health — Pre-Seed Institutional Pitch Deck v2.1",
                      size: "14.2 MB",
                      type: "PITCH_DECK",
                      startup: "Sela Health",
                      locked: vettingStatus !== "VETTED",
                    },
                    {
                      title: "Sela Health — Clinical Trial Efficacy & Amharic NLP Benchmark",
                      size: "8.5 MB",
                      type: "CLINICAL_TRIAL",
                      startup: "Sela Health",
                      locked: vettingStatus !== "VETTED",
                    },
                    {
                      title: "Kuraz Agri — Cooperative Satellite Yield Projections 2026",
                      size: "22.1 MB",
                      type: "FINANCIAL_MODEL",
                      startup: "Kuraz Agri",
                      locked: vettingStatus !== "VETTED",
                    },
                    {
                      title: "Adera Labs — Amharic Speech Corpus Architecture & Latency Report",
                      size: "5.4 MB",
                      type: "TECH_REPORT",
                      startup: "Adera Labs",
                      locked: vettingStatus !== "VETTED",
                    },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-border bg-muted/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-primary/10 grid place-items-center text-primary shrink-0">
                          <FileText className="size-5" />
                        </div>
                        <div>
                          <p className="font-bold text-xs text-foreground">{doc.title}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {doc.startup} · {doc.size} · {doc.type}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {doc.locked ? (
                          <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                            <Lock className="size-3.5" /> Awaiting Vetting (FR-16)
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => toast.success(`Downloaded ${doc.title}`)}
                            className="rounded-xl text-xs h-8 gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            <Download className="size-3.5" /> Download Decrypted
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PORTFOLIO & COMMITMENTS */}
          {activeTab === "commitments" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Total Committed (FR-19)</span>
                  <p className="mt-2 font-display text-2xl font-bold text-emerald-600">
                    ${totalCommittedUsd.toLocaleString()} USD
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Active soft-circle allocations</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Portfolio Ventures</span>
                  <p className="mt-2 font-display text-2xl font-bold text-foreground">
                    {pipeline.filter((d) => d.stage === "Committed").length} Startups
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Signed term-sheets & soft circles</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Syndicate Partner</span>
                  <p className="mt-2 font-display text-2xl font-bold text-foreground">
                    Novastar Ventures
                  </p>
                  <p className="mt-1 text-[11px] text-emerald-600 font-semibold">Accredited LP Syndicate</p>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 shadow-xs space-y-4">
                <h4 className="font-display text-base font-bold text-foreground">Committed Deals Registry</h4>
                <div className="space-y-3">
                  {pipeline
                    .filter((d) => d.stage === "Committed")
                    .map((deal) => {
                      const st = STARTUPS.find((item) => item.slug === deal.startupSlug) || STARTUPS[0]!;
                      return (
                        <div
                          key={deal.startupSlug}
                          className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-center justify-between"
                        >
                          <div>
                            <p className="font-bold text-xs text-foreground">{st.name}</p>
                            <p className="text-[11px] text-muted-foreground">{st.sector} · {st.investment_ask.round}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-display text-lg font-bold text-emerald-600">
                              ${(deal.pledgedAmount || 0).toLocaleString()} USD
                            </span>
                            <p className="text-[10px] text-muted-foreground">Logged Commitment</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: UNDP IMPACT ROLLUP */}
          {activeTab === "impact" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
                <div className="border-b border-border pb-4">
                  <h3 className="font-display text-xl font-bold text-foreground">UNDP SDG & Living Lab Impact Rollup</h3>
                  <p className="text-xs text-muted-foreground">
                    Portfolio metrics synchronized with timbuktoo Africa and UNDP Country Program goals.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-2">
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                      SDG 3: Good Health
                    </span>
                    <h5 className="font-bold text-sm text-foreground">40 Rural Clinics Reached</h5>
                    <p className="text-xs text-muted-foreground">
                      Sela Health triage models running offline in Oromia & Amhara regional bureaus.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-2">
                    <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600">
                      SDG 2: Zero Hunger
                    </span>
                    <h5 className="font-bold text-sm text-foreground">1,200 Smallholder Farmers</h5>
                    <p className="text-xs text-muted-foreground">
                      Kuraz Agri yield matching algorithms reducing post-harvest loss by 18%.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-2">
                    <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-bold text-purple-600">
                      SDG 8: Decent Work
                    </span>
                    <h5 className="font-bold text-sm text-foreground">68 Local Tech Jobs</h5>
                    <p className="text-xs text-muted-foreground">
                      High-skilled AI researchers and model annotators employed in Ethiopia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
