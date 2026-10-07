import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  ExternalLink,
  Eye,
  FileCheck,
  FileText,
  Globe,
  GraduationCap,
  Layers,
  LayoutDashboard,
  Lock,
  LogOut,
  Menu,
  Palette,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  RotateCcw,
  Rocket,
  Save,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Unlock,
  Upload,
  User,
  UserCheck,
  Users,
  Wallet,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { DealBookEditor } from "@/components/portal/DealBookEditor";
import { ThemeEditor } from "@/components/portal/ThemeEditor";
import { Button } from "@/components/ui/button";
import {
  getStartupBySlug,
  resetStartupOverride,
  saveStartupOverride,
  STARTUPS,
  type Startup,
} from "@/data/startups";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Startup Founder Portal — AI UNIPOD Ethiopia" },
      {
        name: "description",
        content: "Manage your startup profile, pitch materials, funding asks, and investor permissions.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StartupPortalPage,
});

type PortalTab = "overview" | "editor" | "pitch" | "permissions" | "theme";

export function StartupPortalPage() {
  const { user, switchDemoRole, logout } = useAuth();
  const navigate = useNavigate();

  // Find active startup: fallback to Sela Health
  const activeSlug = user?.startupSlug || "sela-health";
  const [selectedStartupSlug, setSelectedStartupSlug] = useState<string>(activeSlug);

  // Dynamic startup form state
  const [startup, setStartup] = useState<Startup>(
    () => getStartupBySlug(selectedStartupSlug) || STARTUPS[0]!
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Sync state when tenant dropdown changes
  useEffect(() => {
    const loaded =
      getStartupBySlug(selectedStartupSlug) ||
      STARTUPS.find((s) => s.slug === selectedStartupSlug) ||
      STARTUPS[0]!;
    setStartup(loaded);
    setHasUnsavedChanges(false);
  }, [selectedStartupSlug]);

  const [activeTab, setActiveTab] = useState<PortalTab>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Mock access requests from investors (PRD FR-14)
  const [accessRequests, setAccessRequests] = useState([
    {
      id: "req-1",
      investorName: "Vetted Institutional Investor",
      organization: "Partech Africa (investor@partech.com)",
      section: "Audited 3-Year Projections & Unit Economics",
      status: "APPROVED" as const,
      date: "Yesterday",
    },
    {
      id: "req-2",
      investorName: "Frontier Angel Syndicate",
      organization: "Addis Angels Network (angel@addisangels.et)",
      section: "Confidential Pitch Deck v2.1 & Term Sheet",
      status: "PENDING" as const,
      date: "3 hours ago",
    },
    {
      id: "req-3",
      investorName: "DFI Tech Fund",
      organization: "Global Frontier Tech Partners",
      section: "Sovereign Clinical Weights & Benchmark Data",
      status: "DENIED" as const,
      date: "5 days ago",
    },
  ]);

  // Section visibility permissions (PRD FR-13: public by default, can mark investor-only)
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, "public" | "investor-only">>({
    overview: "public",
    dealMemo: "public",
    problemStatement: "public",
    aiTechArchitecture: "public",
    dataMoat: "public",
    productsPortfolio: "public",
    marketTAM: "public",
    businessModel: "public",
    tractionMetrics: "public",
    aiBenchmarks: "public",
    competitiveMoats: "investor-only",
    teamComposition: "public",
    socialImpact: "public",
    financialProjections: "investor-only",
    growthRoadmap: "public",
    investmentAsk: "public",
    diligenceVault: "investor-only",
    riskManagement: "investor-only",
  });

  const toggleVisibility = (key: string) => {
    setSectionVisibility((prev) => {
      const next = prev[key] === "public" ? "investor-only" : "public";
      toast.info(`Updated section access to ${next.toUpperCase()}`);
      return { ...prev, [key]: next };
    });
  };

  const handleRequest = (id: string, action: "APPROVED" | "DENIED") => {
    setAccessRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: action } : req))
    );
    toast.success(`Access request marked as ${action}`);
  };

  const handleStartupChange = (updated: Startup) => {
    setStartup(updated);
    setHasUnsavedChanges(true);
  };

  const handleSaveStartup = () => {
    saveStartupOverride(startup.slug, startup);
    setHasUnsavedChanges(false);
    toast.success(
      `Saved all changes for ${startup.name}! Your public Deal Book profile is now live with the new data.`
    );
  };

  const handleResetToBaseline = () => {
    resetStartupOverride(startup.slug);
    const baseline = STARTUPS.find((s) => s.slug === startup.slug) || STARTUPS[0]!;
    setStartup(baseline);
    setHasUnsavedChanges(false);
    toast.info(`Reset ${startup.name} back to default living lab baseline.`);
  };

  const isFounderOrEditor =
    user?.role === "STARTUP_ADMIN" || user?.role === "STARTUP_EDITOR" || user?.role === "SUPER_ADMIN";

  const pendingRequestsCount = accessRequests.filter((r) => r.status === "PENDING").length;

  // Navigation Items
  const navItems = [
    {
      id: "overview" as const,
      label: "Overview & Living Lab",
      description: "KPIs, compute & status",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "editor" as const,
      label: "Deal Book Intake (18 Sec)",
      description: "Edit all 18 venture sections",
      icon: FileText,
      badge: `${startup.products.length} Products`,
    },
    {
      id: "pitch" as const,
      label: "Pitch & Funding Ask",
      description: "Deck v2.1 & terms (FR-11, 12)",
      icon: Wallet,
      badge: startup.investment_ask.round,
    },
    {
      id: "permissions" as const,
      label: "Investor Diligence",
      description: "Access controls (FR-13, 14)",
      icon: Shield,
      badge: pendingRequestsCount > 0 ? `${pendingRequestsCount} Pending` : null,
      badgeColor: "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30",
    },
    {
      id: "theme" as const,
      label: "White-Label Brand",
      description: "Dynamic theme engine (FR-6)",
      icon: Palette,
      badge: null,
    },
  ];

  // ==========================================
  // UNGATED / UNAUTHORIZED LOCK SCREEN
  // ==========================================
  if (!isFounderOrEditor) {
    return (
      <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-background font-body text-foreground antialiased selection:bg-primary selection:text-primary-foreground flex flex-col justify-between">
        <header className="border-b border-border/70 bg-card/60 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/aiunipod-logo.webp"
              alt="AI UNIPOD"
              width="130"
              height="32"
              className="h-7 w-auto object-contain"
            />
          </Link>
          <Button asChild variant="outline" size="sm" className="rounded-xl text-xs">
            <Link to="/">Back to Public Portal</Link>
          </Button>
        </header>

        <main className="relative flex flex-1 items-center justify-center px-5 py-16">
          <div className="relative z-10 w-full max-w-lg rounded-3xl border border-border/80 bg-card p-8 sm:p-10 shadow-xl text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 shadow-xs">
              <Rocket className="size-8" />
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                <Shield className="size-3.5" /> Founder &amp; Editor Portal
              </span>
            </div>

            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Startup Founder Sign In Required
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              This console is dedicated to active cohort startup founders and editors to manage profile
              intake, pitch materials, and investor access.
              {user ? (
                <>
                  {" "}
                  You are currently signed in as <strong>{user.name}</strong> ({user.role}).
                </>
              ) : (
                <> Please sign in with an authorized founder account to proceed.</>
              )}
            </p>

            <div className="mt-8 space-y-3">
              <Button
                onClick={() => {
                  switchDemoRole("startup_admin");
                  toast.success("Authorized as Startup Founder (founder@founder.com)");
                }}
                className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md gap-2"
              >
                <Rocket className="size-4" /> Sign In as Founder (founder@founder.com)
              </Button>

              <Button
                onClick={() => {
                  switchDemoRole("startup_editor");
                  toast.success("Authorized as Startup Editor (editor@founder.com)");
                }}
                variant="outline"
                className="w-full h-12 rounded-2xl border-border font-semibold text-sm gap-2"
              >
                <UserCheck className="size-4" /> Sign In as Editor (editor@founder.com)
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

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-background font-body text-foreground antialiased flex">
      {/* ================================================== */}
      {/* 1. LEFT SIDEBAR (DESKTOP) */}
      {/* ================================================== */}
      <aside
        className={`hidden lg:flex flex-col border-r border-border bg-card/70 backdrop-blur-xl transition-[width] duration-300 z-30 shrink-0 sticky top-0 h-screen ${
          sidebarCollapsed ? "w-20" : "w-72"
        }`}
      >
        {/* Brand & Startup Header */}
        <div className="h-18 flex items-center justify-between px-5 border-b border-border/80">
          {!sidebarCollapsed ? (
            <Link to="/portal" className="flex items-center gap-3 overflow-hidden">
              <div
                className="size-10 rounded-2xl grid place-items-center shrink-0 text-white shadow-xs font-bold text-sm"
                style={{ backgroundColor: startup.theme.primary_color }}
              >
                {startup.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <span className="font-display font-bold text-sm tracking-tight text-foreground block truncate">
                  {startup.name}
                </span>
                <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                  Founder Console
                </span>
              </div>
            </Link>
          ) : (
            <Link to="/portal" className="mx-auto" title={startup.name}>
              <div
                className="size-10 rounded-2xl grid place-items-center text-white shadow-xs font-bold text-sm"
                style={{ backgroundColor: startup.theme.primary_color }}
              >
                {startup.name.slice(0, 2).toUpperCase()}
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
                Founder Workspace
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
                  className={`w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-xs font-semibold transition-all relative cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  <Icon
                    className={`size-4.5 shrink-0 ${
                      isActive ? "text-primary-foreground" : "text-muted-foreground"
                    }`}
                  />
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

          {/* Quick Actions & Live Link */}
          <div className="space-y-1 pt-3 border-t border-border/60">
            {!sidebarCollapsed && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Public Profile &amp; Ecosystem
              </p>
            )}

            <Link
              to="/$startupSlug"
              params={{ startupSlug: startup.slug }}
              title="Live Public Profile"
              className="w-full flex items-center gap-3 rounded-2xl px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/10 transition-all"
            >
              <Eye className="size-4 shrink-0" />
              {!sidebarCollapsed && <span className="truncate flex-1">View Live Profile</span>}
              {!sidebarCollapsed && <ArrowUpRight className="size-3 text-primary/70" />}
            </Link>

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
              {!sidebarCollapsed && <span className="truncate flex-1">Cohort 3 Applications</span>}
              {!sidebarCollapsed && <ArrowUpRight className="size-3 text-muted-foreground/60" />}
            </Link>

            <Link
              to="/jobs"
              title="Jobs Board"
              className="w-full flex items-center gap-3 rounded-2xl px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all"
            >
              <Briefcase className="size-4 shrink-0" />
              {!sidebarCollapsed && <span className="truncate flex-1">Ecosystem Jobs</span>}
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
              src={user?.avatarUrl || "/avatars/founder.svg"}
              alt={user?.name || "Startup Founder"}
              width={36}
              height={36}
              className="size-9 rounded-xl object-cover shrink-0 border border-border"
            />

            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-foreground truncate">
                  {user?.name || "Startup Founder"}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {user?.email || "founder@founder.com"}
                </p>
              </div>
            )}

            {!sidebarCollapsed && (
              <button
                type="button"
                onClick={() => {
                  logout();
                  toast.info("Logged out from founder console");
                }}
                className="text-muted-foreground hover:text-destructive p-1 rounded-lg transition-colors cursor-pointer"
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
                  <div
                    className="size-9 rounded-xl grid place-items-center text-white font-bold text-xs"
                    style={{ backgroundColor: startup.theme.primary_color }}
                  >
                    {startup.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-foreground">{startup.name}</h3>
                    <p className="text-[10px] text-blue-600 font-semibold uppercase">Founder Portal</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="rounded-xl p-1 text-muted-foreground hover:bg-muted cursor-pointer"
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
                      className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold cursor-pointer ${
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
                  to="/$startupSlug"
                  params={{ startupSlug: startup.slug }}
                  className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-primary hover:bg-primary/10"
                >
                  <span className="flex items-center gap-2">
                    <Eye className="size-4" /> Live Public Profile
                  </span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
                <Link
                  to="/startups"
                  className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="size-4" /> Startups Directory
                  </span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={user?.avatarUrl || "/avatars/founder.svg"}
                  alt={user?.name || "Startup Founder"}
                  width={32}
                  height={32}
                  className="size-8 rounded-lg object-cover shrink-0 border border-border"
                />
                <div className="text-left">
                  <p className="text-xs font-bold text-foreground">{user?.name || "Startup Founder"}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {user?.email || "founder@founder.com"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => logout()}
                className="text-muted-foreground hover:text-destructive p-1 cursor-pointer"
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
      <div className="flex-1 flex flex-col min-w-0 max-w-full overflow-x-hidden">
        {/* Top Header */}
        <header className="h-18 w-full max-w-full border-b border-border/80 bg-card/60 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden grid size-9 place-items-center rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
            >
              <Menu className="size-5" />
            </button>

            {/* Breadcrumb Path */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-muted-foreground">Founder Console</span>
              <ChevronRight className="size-3.5 text-muted-foreground/60" />
              <span className="font-bold text-foreground">
                {navItems.find((n) => n.id === activeTab)?.label}
              </span>
            </div>
          </div>

          {/* Right Header: Tenant Switcher, Demo Roles, Live Profile CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Startup Tenant Quick Switcher */}
            <div className="hidden md:flex items-center gap-1.5 rounded-xl border border-border bg-background/60 px-2.5 py-1 text-xs">
              <span className="text-[11px] text-muted-foreground">Tenant:</span>
              <select
                value={selectedStartupSlug}
                onChange={(e) => {
                  setSelectedStartupSlug(e.target.value);
                  toast.success(
                    `Switched tenant view to ${
                      STARTUPS.find((s) => s.slug === e.target.value)?.name
                    }`
                  );
                }}
                className="bg-transparent font-bold text-foreground focus:outline-hidden text-xs cursor-pointer"
              >
                {STARTUPS.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name} ({s.sector})
                  </option>
                ))}
              </select>
            </div>

            {/* Unsaved indicator & Save Button in Header */}
            {hasUnsavedChanges && (
              <Button
                size="sm"
                onClick={handleSaveStartup}
                className="rounded-xl text-xs h-9 gap-1.5 font-bold bg-primary text-primary-foreground shadow-xs animate-bounce"
              >
                <Save className="size-3.5" /> Save Changes
              </Button>
            )}

            {/* Role Demo Switchers */}
            <div className="hidden sm:flex items-center gap-1 rounded-2xl border border-border bg-card p-1 text-xs">
              <button
                type="button"
                onClick={() => switchDemoRole("startup_admin")}
                className={`rounded-xl px-2.5 py-1 font-semibold transition-all cursor-pointer ${
                  user?.role === "STARTUP_ADMIN"
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Founder
              </button>
              <button
                type="button"
                onClick={() => switchDemoRole("startup_editor")}
                className={`rounded-xl px-2.5 py-1 font-semibold transition-all cursor-pointer ${
                  user?.role === "STARTUP_EDITOR"
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Editor
              </button>
              <button
                type="button"
                onClick={() => {
                  switchDemoRole("super_admin");
                  navigate({ to: "/admin" });
                }}
                className="rounded-xl px-2.5 py-1 font-semibold text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  switchDemoRole("investor_vetted");
                  navigate({ to: "/investor" });
                }}
                className="rounded-xl px-2.5 py-1 font-semibold text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              >
                Investor
              </button>
            </div>

            {/* View Live Profile Button */}
            <Button
              asChild
              size="sm"
              variant="outline"
              className="rounded-xl text-xs h-9 gap-1.5 font-semibold"
            >
              <Link to="/$startupSlug" params={{ startupSlug: startup.slug }} target="_blank">
                <span className="hidden sm:inline">Live Profile</span> <Eye className="size-3.5" />
              </Link>
            </Button>
          </div>
        </header>

        {/* Main Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full max-w-full overflow-x-hidden min-w-0 mx-auto space-y-8">
          {/* Header Banner */}
          <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card/90 to-muted/30 p-6 sm:p-8 shadow-xs relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                    <Rocket className="size-3.5" /> EAII Living Lab Venture
                  </span>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                    {startup.sector}
                  </span>
                  <span className="rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                    HQ: {startup.location}
                  </span>
                  {hasUnsavedChanges && (
                    <span className="rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-2.5 py-0.5 text-xs font-bold animate-pulse">
                      Unsaved Changes
                    </span>
                  )}
                </div>

                <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {startup.name} Founder Console
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed">
                  {startup.tagline} · All 18 Deal Book sections can be customized and updated live on the public
                  page.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <Button
                  size="sm"
                  onClick={handleSaveStartup}
                  className="rounded-xl text-xs h-10 gap-1.5 font-bold bg-primary text-primary-foreground shadow-xs cursor-pointer hover:opacity-90"
                >
                  <Save className="size-3.5" /> Save All Sections
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleResetToBaseline}
                  className="rounded-xl text-xs h-10 gap-1.5 text-muted-foreground hover:text-foreground cursor-pointer"
                  title="Reset to default baseline"
                >
                  <RotateCcw className="size-3.5" /> Reset
                </Button>
              </div>
            </div>
          </div>

          {/* TAB 1: OVERVIEW & LIVING LAB */}
          {activeTab === "overview" && (
            <div key={startup.slug} className="space-y-6 animate-in fade-in duration-200">
              {/* Quick KPI Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Investment Ask
                    </span>
                    <Wallet className="size-4 text-emerald-500" />
                  </div>
                  <p className="mt-2 font-display text-2xl font-bold text-foreground">
                    ${startup.investment_ask.amount_usd.toLocaleString()}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Target Round: <strong>{startup.investment_ask.round}</strong>
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Living Lab Program
                    </span>
                    <Cpu className="size-4 text-purple-500" />
                  </div>
                  <p className="mt-2 font-display text-2xl font-bold text-foreground">
                    {startup.cohort || "Cohort 3"}
                  </p>
                  <p className="mt-1 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="size-3" /> EAII Compute Allocated
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Products &amp; IP
                    </span>
                    <Layers className="size-4 text-blue-500" />
                  </div>
                  <p className="mt-2 font-display text-2xl font-bold text-foreground">
                    {startup.products.length} Products
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Active stage: <strong>{startup.products[0]?.stage || "Pilot"}</strong>
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Investor Diligence
                    </span>
                    <ShieldCheck className="size-4 text-amber-500" />
                  </div>
                  <p className="mt-2 font-display text-2xl font-bold text-foreground">
                    {accessRequests.length} Requests
                  </p>
                  <p className="mt-1 text-[11px] text-amber-600 font-semibold">
                    {pendingRequestsCount} Pending Approval
                  </p>
                </div>
              </div>

              {/* Startup Quick Summary & Core Details */}
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {startup.name} · Living Lab Cohort Status
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Incubated under {startup.cohort || "Cohort 3"} with Ethiopian Artificial
                        Intelligence Institute (EAII) sovereign infrastructure.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => setActiveTab("editor")}
                      className="rounded-xl text-xs bg-primary text-primary-foreground font-semibold"
                    >
                      <FileText className="size-3.5 mr-1" /> Edit Deal Book
                    </Button>
                  </div>

                  <div className="space-y-4 text-xs leading-relaxed text-muted-foreground">
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">Executive Overview</h4>
                      <p className="mt-1">{startup.description}</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 pt-2">
                      <div className="rounded-2xl border border-border bg-muted/20 p-4">
                        <span className="font-semibold text-foreground text-xs block">
                          Team Composition
                        </span>
                        <span className="text-lg font-display font-bold text-foreground mt-1 block">
                          {startup.team_size} Full-Time Specialists
                        </span>
                        <span className="text-[11px] text-muted-foreground mt-0.5 block">
                          Founded {startup.founded} · {startup.location}
                        </span>
                      </div>

                      <div className="rounded-2xl border border-border bg-muted/20 p-4">
                        <span className="font-semibold text-foreground text-xs block">
                          Planned Use of Funds
                        </span>
                        <span className="text-xs text-foreground mt-1 block font-medium">
                          {startup.investment_ask.use_of_funds}
                        </span>
                      </div>
                    </div>

                    {/* Official Channels */}
                    {startup.links && startup.links.length > 0 && (
                      <div className="pt-2 border-t border-border">
                        <span className="font-semibold text-foreground text-xs block mb-2">
                          Verified Channels:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {startup.links.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:border-primary/50 transition-colors"
                            >
                              <Globe className="size-3 text-primary" />
                              <span>{link.label}</span>
                              <ExternalLink className="size-2.5 opacity-60" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Shortcuts & Navigation card */}
                <div className="rounded-3xl border border-border bg-card p-6 shadow-xs space-y-4">
                  <h3 className="font-display text-base font-bold text-foreground">
                    Founder Quick Actions
                  </h3>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab("editor")}
                      className="w-full flex items-center justify-between p-3 rounded-2xl border border-primary/30 bg-primary/5 hover:bg-primary/10 text-left transition-all text-xs cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="size-4 text-primary" />
                        <div>
                          <p className="font-bold text-foreground">Deal Book Editor (18 Sec)</p>
                          <p className="text-[11px] text-muted-foreground">
                            Edit Problem, AI, TAM, Financials
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-primary" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("pitch")}
                      className="w-full flex items-center justify-between p-3 rounded-2xl border border-border/80 bg-background/50 hover:bg-muted/50 text-left transition-all text-xs cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileCheck className="size-4 text-emerald-600" />
                        <div>
                          <p className="font-semibold text-foreground">Pitch Deck Versioning</p>
                          <p className="text-[11px] text-muted-foreground">
                            {startup.name.replace(/\s+/g, "_")}_v2.1
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("permissions")}
                      className="w-full flex items-center justify-between p-3 rounded-2xl border border-border/80 bg-background/50 hover:bg-muted/50 text-left transition-all text-xs cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Lock className="size-4 text-amber-600" />
                        <div>
                          <p className="font-semibold text-foreground">Investor Permissions</p>
                          <p className="text-[11px] text-muted-foreground">
                            {pendingRequestsCount} awaiting review
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("theme")}
                      className="w-full flex items-center justify-between p-3 rounded-2xl border border-border/80 bg-background/50 hover:bg-muted/50 text-left transition-all text-xs cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Palette className="size-4 text-purple-600" />
                        <div>
                          <p className="font-semibold text-foreground">Brand Theme Tokens</p>
                          <p className="text-[11px] text-muted-foreground">Customize runtime colors</p>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEAL BOOK INTAKE & 18-SECTION EDITOR */}
          {activeTab === "editor" && (
            <div key={startup.slug} className="animate-in fade-in duration-200">
              <DealBookEditor
                startup={startup}
                onChange={handleStartupChange}
                onSave={handleSaveStartup}
                hasUnsavedChanges={hasUnsavedChanges}
              />
            </div>
          )}

          {/* TAB 3: PITCH DECK & FUNDING */}
          {activeTab === "pitch" && (
            <div key={startup.slug} className="space-y-6 animate-in fade-in duration-200">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Pitch Deck Card */}
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center gap-2">
                      <FileCheck className="size-4 text-primary" />
                      <h3 className="font-display text-lg font-bold text-foreground">
                        Pitch Deck Versioning (FR-11)
                      </h3>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600">
                      v2.1 Active
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Pitch materials are served via short-lived, revocable access links (Non-Functional
                    Security Requirement).
                  </p>

                  <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-6 text-center space-y-3">
                    <FileText className="size-8 text-primary mx-auto" />
                    <div>
                      <p className="font-bold text-xs text-foreground">
                        {startup.name.replace(/\s+/g, "_")}_PitchDeck_{startup.investment_ask.round}_v2.1.pdf
                      </p>
                      <p className="text-[11px] text-muted-foreground">14.2 MB · Updated 2 days ago</p>
                    </div>
                    <div className="flex justify-center gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toast.info("Downloading institutional pitch deck dossier...")}
                        className="rounded-xl text-xs h-8 cursor-pointer"
                      >
                        Download Copy
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => toast.success("Uploaded new pitch deck v2.2 simulation")}
                        className="rounded-xl text-xs h-8 gap-1 bg-primary text-primary-foreground font-semibold cursor-pointer"
                      >
                        <Upload className="size-3" /> Upload Version
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Funding Needs Card (FR-12) */}
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center gap-2">
                      <Wallet className="size-4 text-emerald-600" />
                      <h3 className="font-display text-lg font-bold text-foreground">
                        Funding Needs &amp; Terms (FR-12)
                      </h3>
                    </div>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                      {startup.investment_ask.round} Round
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-foreground">Investment Ask (USD)</label>
                      <input
                        type="number"
                        value={startup.investment_ask.amount_usd}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          handleStartupChange({
                            ...startup,
                            investment_ask: {
                              ...startup.investment_ask,
                              amount_usd: val,
                            },
                          });
                        }}
                        className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-foreground">Target Round</label>
                      <select
                        value={startup.investment_ask.round}
                        onChange={(e) => {
                          handleStartupChange({
                            ...startup,
                            investment_ask: {
                              ...startup.investment_ask,
                              round: e.target.value,
                            },
                          });
                        }}
                        className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground font-semibold"
                      >
                        <option value="Pre-Seed">Pre-Seed</option>
                        <option value="Seed">Seed</option>
                        <option value="Series A">Series A</option>
                        <option value="Living Lab Pilot Grant">Living Lab Pilot Grant</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-foreground">Planned Use of Funds</label>
                      <textarea
                        rows={3}
                        value={startup.investment_ask.use_of_funds}
                        onChange={(e) => {
                          handleStartupChange({
                            ...startup,
                            investment_ask: {
                              ...startup.investment_ask,
                              use_of_funds: e.target.value,
                            },
                          });
                        }}
                        className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        size="sm"
                        onClick={handleSaveStartup}
                        className="rounded-xl text-xs bg-primary text-primary-foreground font-semibold"
                      >
                        Save Funding Terms
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setActiveTab("editor")}
                        className="rounded-xl text-xs"
                      >
                        Edit Full Allocation Breakdown →
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INVESTOR ACCESS & PERMISSIONS */}
          {activeTab === "permissions" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Granular Section Visibility (FR-13) */}
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-4">
                <div className="border-b border-border pb-4">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Granular Section Visibility (FR-13)
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Per PRD Section 4.3 FR-13: All profile sections are public by default; you can mark
                    sensitive sections as investor-only.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(sectionVisibility).map(([sectionKey, access]) => {
                    const isInvestorOnly = access === "investor-only";
                    return (
                      <div
                        key={sectionKey}
                        className={`rounded-2xl border p-4 transition-all flex items-center justify-between ${
                          isInvestorOnly
                            ? "border-amber-500/30 bg-amber-500/5 text-foreground"
                            : "border-border bg-muted/20 text-muted-foreground"
                        }`}
                      >
                        <div>
                          <p className="font-semibold text-xs text-foreground capitalize">
                            {sectionKey.replace(/([A-Z])/g, " $1")}
                          </p>
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
                              isInvestorOnly
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-emerald-600 dark:text-emerald-400"
                            }`}
                          >
                            {isInvestorOnly ? <Lock className="size-3" /> : <Unlock className="size-3" />}
                            {access}
                          </span>
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleVisibility(sectionKey)}
                          className="rounded-xl text-[11px] h-8 cursor-pointer"
                        >
                          Toggle
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pending Investor Access Requests (FR-14) */}
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-4">
                <div className="border-b border-border pb-4">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Investor Access Requests (FR-14)
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Per PRD Section 4.3 FR-14: Approve or deny investor requests for sections you've marked
                    investor-only, and revoke access at any time.
                  </p>
                </div>

                <div className="space-y-3">
                  {accessRequests.map((req) => (
                    <div
                      key={req.id}
                      className="rounded-2xl border border-border bg-muted/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-xs text-foreground">{req.investorName}</p>
                          <span className="text-xs text-primary font-semibold">({req.organization})</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              req.status === "APPROVED"
                                ? "bg-emerald-500/15 text-emerald-600"
                                : req.status === "PENDING"
                                ? "bg-amber-500/15 text-amber-600"
                                : "bg-destructive/15 text-destructive"
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Requested: <strong>{req.section}</strong> · {req.date}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {req.status !== "APPROVED" && (
                          <Button
                            size="sm"
                            onClick={() => handleRequest(req.id, "APPROVED")}
                            className="rounded-xl text-xs h-8 bg-emerald-600 text-white hover:bg-emerald-700 gap-1 cursor-pointer"
                          >
                            <CheckCircle2 className="size-3.5" /> Approve Access
                          </Button>
                        )}
                        {req.status !== "DENIED" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRequest(req.id, "DENIED")}
                            className="rounded-xl text-xs h-8 gap-1 cursor-pointer"
                          >
                            <XCircle className="size-3.5" /> Deny / Revoke
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: WHITE-LABEL THEME BUILDER */}
          {activeTab === "theme" && (
            <div key={startup.slug} className="animate-in fade-in duration-200">
              <ThemeEditor
                startupName={startup.name}
                theme={startup.theme}
                onChange={(updatedTheme) => handleStartupChange({ ...startup, theme: updatedTheme })}
                onSave={handleSaveStartup}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
