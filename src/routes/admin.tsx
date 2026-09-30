import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Bot,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cpu,
  Database,
  Download,
  Eye,
  FileCheck,
  FileDown,
  FileText,
  Filter,
  Globe,
  GraduationCap,
  HardDrive,
  Layers,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  Menu,
  Network,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  RefreshCw,
  Rocket,
  Search,
  Server,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
  TrendingUp,
  User,
  UserCheck,
  Users,
  Wallet,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { STARTUPS as INITIAL_STARTUPS, type Startup } from "@/data/startups";
import { useAuth, DEMO_USERS } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Program Administration Console — AI UNIPOD Ethiopia" },
      { name: "description", content: "Super Admin dashboard for orchestrating startups, high-performance compute clusters, investor diligence, and cohort pipelines." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboardPage,
});

// Mock Cohort 3 Applications
const INITIAL_COHORT3_APPLICANTS = [
  {
    id: "c3-01",
    name: "TenaMed AI",
    sector: "Health AI",
    founder: "Dr. Selamawit Bekele",
    email: "selam@tenamed.et",
    university: "Addis Ababa University (Health Sciences)",
    techSummary: "Edge-AI ultrasound diagnostics optimized for maternal clinics with low-bandwidth offline caching.",
    score: 94,
    status: "UNDER_REVIEW" as "UNDER_REVIEW" | "SHORTLISTED" | "INTERVIEWED" | "ACCEPTED" | "REJECTED",
    date: "2026-09-12",
  },
  {
    id: "c3-02",
    name: "EthioBio Vision",
    sector: "AgriTech",
    founder: "Yared Haile",
    email: "yared@ethiobio.ai",
    university: "Haramaya University / EAII Lab",
    techSummary: "Hyperspectral drone imagery vision models detecting coffee berry disease and rust before visible crop loss.",
    score: 89,
    status: "SHORTLISTED" as "UNDER_REVIEW" | "SHORTLISTED" | "INTERVIEWED" | "ACCEPTED" | "REJECTED",
    date: "2026-09-15",
  },
  {
    id: "c3-03",
    name: "Sheger Mobility AI",
    sector: "Logistics AI",
    founder: "Kalkidan Girma",
    email: "kalkidan@shegermobility.et",
    university: "Addis Ababa Institute of Technology (AAiT)",
    techSummary: "Dynamic minibus fleet dispatch and route congestion prediction algorithms for Addis Ababa municipal transit.",
    score: 86,
    status: "INTERVIEWED" as "UNDER_REVIEW" | "SHORTLISTED" | "INTERVIEWED" | "ACCEPTED" | "REJECTED",
    date: "2026-09-18",
  },
  {
    id: "c3-04",
    name: "Abyssinia Voice LLM",
    sector: "Language AI",
    founder: "Tewodros Kassahun",
    email: "ted@abyssiniavoice.ai",
    university: "EAII Natural Language Processing Lab",
    techSummary: "Low-resource speech-to-text models for Tigrinya, Afaan Oromoo, and Somali customer support automation.",
    score: 92,
    status: "ACCEPTED" as "UNDER_REVIEW" | "SHORTLISTED" | "INTERVIEWED" | "ACCEPTED" | "REJECTED",
    date: "2026-09-20",
  },
];

export function AdminDashboardPage() {
  const { user, isAuthenticated, switchDemoRole, logout } = useAuth();
  const navigate = useNavigate();

  const isSuperAdmin = isAuthenticated && user?.role === "SUPER_ADMIN";

  // Sidebar and UI state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<"overview" | "startups" | "investors" | "cohort3" | "compute" | "audit">("overview");

  // State for startups (allows provisioning new ones dynamically)
  const [startupsList, setStartupsList] = useState<Startup[]>(INITIAL_STARTUPS);
  const [startupSearch, setStartupSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");

  // Provisioning Modal State
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);
  const [newStartupName, setNewStartupName] = useState("");
  const [newStartupSector, setNewStartupSector] = useState("Health AI");
  const [newStartupTagline, setNewStartupTagline] = useState("");
  const [newStartupLocation, setNewStartupLocation] = useState("Addis Ababa, Ethiopia");
  const [newStartupAsk, setNewStartupAsk] = useState("350000");
  const [newStartupRound, setNewStartupRound] = useState("Pre-seed");
  const [newStartupTeamSize, setNewStartupTeamSize] = useState("6");
  const [newStartupFounderName, setNewStartupFounderName] = useState("");
  const [newStartupFounderEmail, setNewStartupFounderEmail] = useState("");

  // Investors State
  const [investorList, setInvestorList] = useState([
    {
      id: "inv-1",
      name: "Sofia Mengesha",
      org: "Novastar Ventures",
      type: "VC" as const,
      ticket: "$150k – $500k",
      sectors: ["Health AI", "AgriTech"],
      status: "VETTED" as "VETTED" | "PENDING" | "REJECTED",
      date: "2025-02-14",
      aum: "$120M",
      leadPartner: "Sofia Mengesha",
      accredited: true,
    },
    {
      id: "inv-2",
      name: "Dawit Alemu",
      org: "Addis Angels Network",
      type: "Angel" as const,
      ticket: "$25k – $50k",
      sectors: ["Language AI", "AgriTech"],
      status: "PENDING" as "VETTED" | "PENDING" | "REJECTED",
      date: "2025-05-18",
      aum: "$2.5M Syndicate",
      leadPartner: "Dawit Alemu",
      accredited: true,
    },
    {
      id: "inv-3",
      name: "Amina Yusuf",
      org: "East Africa Green Innovation Fund",
      type: "DFI" as const,
      ticket: "$250k – $1M",
      sectors: ["Climate AI", "AgriTech"],
      status: "PENDING" as "VETTED" | "PENDING" | "REJECTED",
      date: "2025-06-02",
      aum: "$45M",
      leadPartner: "Amina Yusuf",
      accredited: true,
    },
    {
      id: "inv-4",
      name: "Marcus Vance",
      org: "Global Frontier Tech Partners",
      type: "VC" as const,
      ticket: "$500k+",
      sectors: ["Vision AI", "Fintech AI"],
      status: "REJECTED" as "VETTED" | "PENDING" | "REJECTED",
      date: "2025-03-01",
      aum: "$80M",
      leadPartner: "Marcus Vance",
      accredited: false,
    },
  ]);

  // Cohort 3 Applicants State
  const [cohort3Applicants, setCohort3Applicants] = useState(INITIAL_COHORT3_APPLICANTS);

  // Security & Audit Logs State
  const [auditLogs, setAuditLogs] = useState([
    { id: "log-1", actor: "Dr. Worku Gachena", action: "Vetted investor account: Novastar Ventures (Deal Room Access Approved)", time: "Just now", type: "SECURITY" },
    { id: "log-2", actor: "System Engine", action: "EAII GPU Cluster 1 scheduled benchmark batch (85 nodes synchronized)", time: "42 mins ago", type: "COMPUTE" },
    { id: "log-3", actor: "Dr. Worku Gachena", action: "Reviewed Cohort 3 application: TenaMed AI (Score: 94/100)", time: "2 hours ago", type: "COHORT" },
    { id: "log-4", actor: "Bethlehem Tadesse", action: "Uploaded v2.4 institutional pitch deck for Sela Health", time: "5 hours ago", type: "STARTUP" },
    { id: "log-5", actor: "System Engine", action: "UNDP Quarterly Impact rollups exported ($3.2M sought, 68 jobs created)", time: "1 day ago", type: "COMPLIANCE" },
    { id: "log-6", actor: "Dr. Worku Gachena", action: "Provisioned new startup tenant: Hakym AI (Diagnostic Vision)", time: "2 days ago", type: "PROVISIONING" },
  ]);

  const handleVetInvestor = (id: string, newStatus: "VETTED" | "REJECTED") => {
    const target = investorList.find((i) => i.id === id);
    setInvestorList((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: newStatus } : inv))
    );

    // Append to audit log
    const newLog = {
      id: `log-${Date.now()}`,
      actor: user?.name || "Dr. Worku Gachena",
      action: `${newStatus === "VETTED" ? "Approved" : "Rejected"} investor account for ${target?.org || "investor"}`,
      time: "Just now",
      type: "SECURITY",
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    if (newStatus === "VETTED") {
      toast.success(`Approved ${target?.org} for full investor deal room access!`);
    } else {
      toast.info(`Investor status updated to ${newStatus}.`);
    }
  };

  const handleUpdateApplicantStatus = (id: string, newStatus: typeof INITIAL_COHORT3_APPLICANTS[0]["status"]) => {
    setCohort3Applicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    toast.success(`Applicant status updated to ${newStatus.replace("_", " ")}`);
  };

  const handleProvisionStartup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStartupName.trim()) {
      toast.error("Please enter startup name");
      return;
    }

    const slug = newStartupName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newTenant: Startup = {
      slug,
      name: newStartupName.trim(),
      tagline: newStartupTagline.trim() || "Applied AI venture accelerating at AI UNIPOD Ethiopia",
      sector: newStartupSector,
      description: `${newStartupName.trim()} is an incubated AI UNIPOD Ethiopia venture co-creating sovereign artificial intelligence solutions anchored at EAII headquarters.`,
      location: newStartupLocation,
      founded: "2026",
      team_size: Number(newStartupTeamSize) || 5,
      products: [
        {
          name: `${newStartupName.trim()} Core`,
          summary: "Flagship applied artificial intelligence model pipeline.",
          stage: "Prototype",
        },
      ],
      investment_ask: {
        amount_usd: Number(newStartupAsk) || 350000,
        round: newStartupRound,
        use_of_funds: "GPU compute scaling, data curation, and field deployment.",
      },
      links: [
        { label: "Website", url: "https://ai.et" },
      ],
      theme: {
        primary_color: "#2563EB",
        secondary_color: "#1E40AF",
        accent_color: "#F59E0B",
        surface_color: "#F8FAFC",
        text_color: "#0F172A",
        brand_font: "Space Grotesk, sans-serif",
        brand_heading_font: "Space Grotesk, sans-serif",
        brand_radius: "16px",
      },
    };

    setStartupsList((prev) => [newTenant, ...prev]);

    // Record audit event
    const newLog = {
      id: `log-${Date.now()}`,
      actor: user?.name || "Dr. Worku Gachena",
      action: `Provisioned new startup tenant: ${newTenant.name} (${newTenant.sector})`,
      time: "Just now",
      type: "PROVISIONING",
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    setIsProvisionModalOpen(false);
    setNewStartupName("");
    setNewStartupTagline("");
    setNewStartupFounderName("");
    setNewStartupFounderEmail("");

    toast.success(`Successfully provisioned tenant: ${newTenant.name}!`);
    setActiveTab("startups");
  };

  const handleExportAuditCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Actor,Action,Timestamp,Category", ...auditLogs.map((l) => `"${l.id}","${l.actor}","${l.action.replace(/"/g, '""')}","${l.time}","${l.type}"`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `unipod-audit-log-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Audit log exported to CSV successfully!");
  };

  // Filtered startups
  const filteredStartups = startupsList.filter((s) => {
    const matchesSector = selectedSector === "All" || s.sector.toLowerCase() === selectedSector.toLowerCase();
    const q = startupSearch.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      s.name.toLowerCase().includes(q) ||
      s.sector.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q);
    return matchesSector && matchesSearch;
  });

  // Badge counts
  const pendingInvestorsCount = investorList.filter((i) => i.status === "PENDING").length;
  const underReviewApplicantsCount = cohort3Applicants.filter((a) => a.status === "UNDER_REVIEW").length;

  // ==========================================
  // UNGATED / UNAUTHORIZED LOCK SCREEN
  // ==========================================
  if (!isSuperAdmin) {
    return (
      <div className="min-h-screen bg-background font-body text-foreground antialiased selection:bg-primary selection:text-primary-foreground flex flex-col justify-between">
        {/* Minimal Auth Bar */}
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
            <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 shadow-xs">
              <Lock className="size-8" />
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-600 dark:text-purple-400">
                <Shield className="size-3.5" /> Administrative Security Perimeter
              </span>
            </div>

            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Super Admin Sign In Required
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The Ecosystem Program Console is restricted to UNIPOD Program Staff and EAII Directors.
              {user ? (
                <> You are currently signed in as <strong>{user.name}</strong> ({user.role}).</>
              ) : (
                <> Please sign in with an authorized administrative account to continue.</>
              )}
            </p>

            <div className="mt-8 space-y-3">
              <Button
                onClick={() => {
                  switchDemoRole("super_admin");
                  toast.success("Authorized as Super Admin (Dr. Worku Gachena)");
                }}
                className="w-full h-12 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md gap-2"
              >
                <ShieldCheck className="size-4" /> Sign In as Super Admin (One-Click Demo)
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full h-12 rounded-2xl border-border font-semibold text-sm"
              >
                <Link to="/login">
                  Go to Standard Login Screen <ArrowRight className="ml-2 size-4" />
                </Link>
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

  // Navigation Items definitions
  const navItems = [
    {
      id: "overview",
      label: "Overview",
      description: "KPIs & living lab rollup",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "startups",
      label: "Tenants & Startups",
      description: "Provision & manage ventures",
      icon: Building2,
      badge: startupsList.length,
    },
    {
      id: "investors",
      label: "Investor Vetting",
      description: "Deal room diligence pipeline",
      icon: UserCheck,
      badge: pendingInvestorsCount > 0 ? `${pendingInvestorsCount} Pending` : null,
      badgeColor: "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30",
    },
    {
      id: "cohort3",
      label: "Cohort 3 Applicants",
      description: "Review incoming candidates",
      icon: GraduationCap,
      badge: underReviewApplicantsCount > 0 ? `${underReviewApplicantsCount} New` : null,
      badgeColor: "bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30",
    },
    {
      id: "compute",
      label: "EAII GPU Living Lab",
      description: "85 cluster nodes & storage",
      icon: Cpu,
      badge: "85 Nodes",
      badgeColor: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    },
    {
      id: "audit",
      label: "Audit & Compliance",
      description: "Security & activity trail",
      icon: ShieldCheck,
      badge: `${auditLogs.length}`,
    },
  ];

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
        {/* Sidebar Brand Header */}
        <div className="h-18 flex items-center justify-between px-5 border-b border-border/80">
          {!sidebarCollapsed ? (
            <Link to="/admin" className="flex items-center gap-3">
              <div className="size-10 rounded-2xl bg-primary/10 border border-primary/20 grid place-items-center shrink-0">
                <Bot className="size-5 text-primary" />
              </div>
              <div className="overflow-hidden">
                <span className="font-display font-bold text-sm tracking-tight text-foreground block truncate">
                  AI UNIPOD
                </span>
                <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                  Admin Console
                </span>
              </div>
            </Link>
          ) : (
            <Link to="/admin" className="mx-auto" title="AI UNIPOD Admin">
              <div className="size-10 rounded-2xl bg-primary/10 border border-primary/20 grid place-items-center">
                <Bot className="size-5 text-primary" />
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
                Program Operations
              </p>
            )}
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id as any)}
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

          {/* Ecosystem Links Section */}
          <div className="space-y-1 pt-3 border-t border-border/60">
            {!sidebarCollapsed && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                External & Portals
              </p>
            )}

            <Link
              to="/startups"
              title="Public Directory"
              className="w-full flex items-center gap-3 rounded-2xl px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all"
            >
              <Globe className="size-4 shrink-0" />
              {!sidebarCollapsed && <span className="truncate flex-1">Public Directory</span>}
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

            <Link
              to="/portal"
              title="Founder Portal"
              className="w-full flex items-center gap-3 rounded-2xl px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all"
            >
              <Rocket className="size-4 shrink-0" />
              {!sidebarCollapsed && <span className="truncate flex-1">Founder Portal</span>}
              {!sidebarCollapsed && <ArrowUpRight className="size-3 text-muted-foreground/60" />}
            </Link>

            <Link
              to="/investor"
              title="Investor Deal Room"
              className="w-full flex items-center gap-3 rounded-2xl px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all"
            >
              <Wallet className="size-4 shrink-0" />
              {!sidebarCollapsed && <span className="truncate flex-1">Investor Deal Room</span>}
              {!sidebarCollapsed && <ArrowUpRight className="size-3 text-muted-foreground/60" />}
            </Link>
          </div>
        </div>

        {/* Sidebar Footer: System Status & User Profile */}
        <div className="p-3.5 border-t border-border/80 space-y-3 bg-muted/20">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2 rounded-xl bg-card border border-border px-3 py-2 text-[11px] font-medium text-muted-foreground">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="truncate">EAII HPC Cluster 10Gbps</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={user?.avatarUrl || "/leaders/worku-gachena.webp"}
                alt={user?.name || "Dr. Worku"}
                width="36"
                height="36"
                className="size-9 rounded-xl object-cover ring-1 ring-border shrink-0"
              />
              {!sidebarCollapsed && (
                <div className="overflow-hidden">
                  <p className="font-display text-xs font-bold text-foreground leading-tight truncate">
                    {user?.name || "Dr. Worku Gachena"}
                  </p>
                  <p className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold truncate">
                    Super Admin
                  </p>
                </div>
              )}
            </div>

            {!sidebarCollapsed && (
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate({ to: "/" });
                  toast.info("Signed out of administrative console.");
                }}
                title="Sign out"
                className="grid size-8 place-items-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <LogOut className="size-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ================================================== */}
      {/* 2. MOBILE DRAWER SIDEBAR */}
      {/* ================================================== */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative flex flex-col w-72 max-w-[80vw] bg-card border-r border-border h-full shadow-2xl z-10">
            <div className="h-16 flex items-center justify-between px-5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center">
                  <Bot className="size-5 text-primary" />
                </div>
                <div>
                  <span className="font-display font-bold text-sm tracking-tight text-foreground block">
                    AI UNIPOD
                  </span>
                  <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                    Admin Console
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="grid size-8 place-items-center rounded-xl text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id as any);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-bold bg-muted text-muted-foreground">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={user?.avatarUrl || "/leaders/worku-gachena.webp"}
                  alt="Avatar"
                  width="32"
                  height="32"
                  className="size-8 rounded-lg object-cover"
                />
                <div>
                  <p className="text-xs font-bold leading-tight">{user?.name}</p>
                  <p className="text-[10px] text-muted-foreground">{user?.role}</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  logout();
                  navigate({ to: "/" });
                }}
                className="h-8 text-xs text-destructive hover:bg-destructive/10"
              >
                <LogOut className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* 3. MAIN DASHBOARD CONTENT AREA */}
      {/* ================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Dashboard App Header */}
        <header className="h-18 border-b border-border bg-card/60 backdrop-blur-md px-5 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden grid size-9 place-items-center rounded-xl border border-border text-muted-foreground hover:text-foreground"
            >
              <Menu className="size-4" />
            </button>

            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Admin Console</span>
              <span className="text-muted-foreground/40">/</span>
              <span className="font-semibold text-foreground">
                {navItems.find((n) => n.id === activeTab)?.label}
              </span>
            </div>
          </div>

          {/* Top Header Right Controls */}
          <div className="flex items-center gap-3">
            {/* Quick Demo Role Switcher */}
            <div className="hidden sm:flex items-center gap-1.5 rounded-xl border border-border bg-background p-1 text-xs">
              <span className="text-[10px] font-bold text-muted-foreground px-2">Role:</span>
              <button
                type="button"
                onClick={() => switchDemoRole("super_admin")}
                className="rounded-lg px-2.5 py-1 text-[11px] font-bold bg-purple-600 text-white shadow-2xs"
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  switchDemoRole("startup_admin");
                  navigate({ to: "/portal" });
                }}
                className="rounded-lg px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Founder →
              </button>
              <button
                type="button"
                onClick={() => {
                  switchDemoRole("investor_vetted");
                  navigate({ to: "/investor" });
                }}
                className="rounded-lg px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Investor →
              </button>
            </div>

            {/* Primary Action Button */}
            <Button
              onClick={() => setIsProvisionModalOpen(true)}
              size="sm"
              className="h-9 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-xs gap-1.5"
            >
              <Plus className="size-3.5" /> Provision Tenant
            </Button>
          </div>
        </header>

        {/* Dynamic Main Workspace Container */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-[1500px] w-full">
          {/* ================================================== */}
          {/* TAB 1: EXECUTIVE OVERVIEW */}
          {/* ================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Telemetry Stat Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-3xl border border-border bg-card p-6 shadow-xs relative overflow-hidden group hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-semibold uppercase tracking-wider">Active Startups</span>
                    <div className="size-8 rounded-xl bg-primary/10 grid place-items-center text-primary">
                      <Building2 className="size-4" />
                    </div>
                  </div>
                  <p className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">{startupsList.length}</p>
                  <p className="mt-1 text-xs text-muted-foreground">8 Incubated · 4 Cohort 3 Shortlisted</p>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6 shadow-xs relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-semibold uppercase tracking-wider">Capital Pipeline</span>
                    <div className="size-8 rounded-xl bg-emerald-500/10 grid place-items-center text-emerald-600">
                      <Wallet className="size-4" />
                    </div>
                  </div>
                  <p className="mt-4 font-display text-3xl font-bold text-emerald-600 sm:text-4xl">
                    ${(startupsList.reduce((acc, s) => acc + s.investment_ask.amount_usd, 0) / 1000000).toFixed(2)}M
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Active Pre-Seed & Seed ask across tenants</p>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6 shadow-xs relative overflow-hidden group hover:border-blue-500/40 transition-colors">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-semibold uppercase tracking-wider">Researchers & Engineers</span>
                    <div className="size-8 rounded-xl bg-blue-500/10 grid place-items-center text-blue-600">
                      <Users className="size-4" />
                    </div>
                  </div>
                  <p className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
                    {startupsList.reduce((acc, s) => acc + s.team_size, 0)}+
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground font-medium text-emerald-600 dark:text-emerald-400">
                    34% Female Researchers (Target: 30%)
                  </p>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6 shadow-xs relative overflow-hidden group hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-semibold uppercase tracking-wider">GPU Workstations</span>
                    <div className="size-8 rounded-xl bg-amber-500/10 grid place-items-center text-amber-600">
                      <Cpu className="size-4" />
                    </div>
                  </div>
                  <p className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">85 Nodes</p>
                  <p className="mt-1 text-xs text-muted-foreground">1 PB Storage at EAII HQ Addis Ababa</p>
                </div>
              </div>

              {/* Main 2-Column Split: Compute Telemetry + Quick Actions */}
              <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                {/* Left: Living Lab Physical & Compute Overview */}
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">EAII Living Lab Telemetry</h3>
                      <p className="text-xs text-muted-foreground">800 m² physical space at EAII Headquarters</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setActiveTab("compute")}
                      className="rounded-xl text-xs gap-1"
                    >
                      Node Details <ChevronRight className="size-3.5" />
                    </Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border bg-muted/20 p-4">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span>Workstation Utilization</span>
                        <span className="text-primary font-bold">78%</span>
                      </div>
                      <div className="mt-2.5 h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "78%" }} />
                      </div>
                      <p className="mt-2 text-[11px] text-muted-foreground">66 of 85 workstations actively reserved</p>
                    </div>

                    <div className="rounded-2xl border border-border bg-muted/20 p-4">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span>Data Center NVMe Storage</span>
                        <span className="text-emerald-600 font-bold">42%</span>
                      </div>
                      <div className="mt-2.5 h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: "42%" }} />
                      </div>
                      <p className="mt-2 text-[11px] text-muted-foreground">420 TB utilized of 1.0 Petabyte cluster</p>
                    </div>
                  </div>

                  {/* Active Ventures by Sector */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      Incubated AI Tenants
                    </h4>
                    <div className="space-y-2.5">
                      {startupsList.slice(0, 4).map((s) => (
                        <div key={s.slug} className="flex items-center justify-between rounded-xl border border-border bg-muted/15 p-3 text-xs">
                          <div className="flex items-center gap-3">
                            <div className="size-2 rounded-full bg-emerald-500" />
                            <div>
                              <p className="font-bold text-foreground">{s.name}</p>
                              <p className="text-[11px] text-muted-foreground">{s.sector} · {s.team_size} researchers</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-primary">${(s.investment_ask.amount_usd / 1000).toFixed(0)}k</span>
                            <Button asChild size="sm" variant="ghost" className="h-7 px-2 text-xs">
                              <Link to="/$startupSlug" params={{ startupSlug: s.slug }}>
                                <ArrowUpRight className="size-3.5" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Urgent Action Center */}
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <h3 className="font-display text-lg font-bold text-foreground">Action Center</h3>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                        Admin Tools
                      </span>
                    </div>

                    <div className="mt-5 space-y-3">
                      <Button
                        onClick={() => setActiveTab("investors")}
                        className="w-full justify-between rounded-2xl h-13 text-xs font-semibold shadow-xs"
                      >
                        <span className="flex items-center gap-2.5">
                          <UserCheck className="size-4" /> Review Pending Investors
                        </span>
                        {pendingInvestorsCount > 0 ? (
                          <span className="rounded-full bg-amber-500 text-white px-2 py-0.5 text-[10px] font-bold">
                            {pendingInvestorsCount} Pending
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-[10px]">All vetted</span>
                        )}
                      </Button>

                      <Button
                        onClick={() => setIsProvisionModalOpen(true)}
                        variant="outline"
                        className="w-full justify-between rounded-2xl h-13 text-xs font-semibold"
                      >
                        <span className="flex items-center gap-2.5">
                          <Plus className="size-4 text-primary" /> Provision New Tenant (FR-21)
                        </span>
                        <ChevronRight className="size-4 text-muted-foreground" />
                      </Button>

                      <Button
                        onClick={() => setActiveTab("cohort3")}
                        variant="outline"
                        className="w-full justify-between rounded-2xl h-13 text-xs font-semibold"
                      >
                        <span className="flex items-center gap-2.5">
                          <GraduationCap className="size-4 text-purple-600" /> Cohort 3 Applications
                        </span>
                        <span className="rounded-full bg-purple-500/15 text-purple-600 px-2 py-0.5 text-[10px] font-bold">
                          {cohort3Applicants.length}
                        </span>
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        className="w-full justify-between rounded-2xl h-13 text-xs font-semibold"
                      >
                        <Link to="/startups">
                          <span className="flex items-center gap-2.5">
                            <Layers className="size-4 text-primary" /> Public Venture Directory
                          </span>
                          <ArrowUpRight className="size-4 text-muted-foreground" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-border/80 bg-muted/30 p-4 text-xs text-muted-foreground">
                    <p className="font-semibold text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="size-4 text-primary" /> Sovereign AI Compliance
                    </p>
                    <p className="mt-1 leading-relaxed text-[11px]">
                      All compute workloads, weights, and investor NDA queries are stored strictly within the EAII national data center infrastructure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================== */}
          {/* TAB 2: TENANT STARTUPS & PROVISIONING (FR-21) */}
          {/* ================================================== */}
          {activeTab === "startups" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Tenant Startups & Provisioning ({startupsList.length})
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    PRD Section 4.5 FR-21: Provision startup tenants, configure white-label namespaces, and assign founder administrative permissions.
                  </p>
                </div>

                <Button
                  onClick={() => setIsProvisionModalOpen(true)}
                  className="rounded-2xl gap-2 font-semibold text-xs h-11 shadow-sm"
                >
                  <Plus className="size-4" /> Provision New Startup
                </Button>
              </div>

              {/* Filters & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={startupSearch}
                    onChange={(e) => setStartupSearch(e.target.value)}
                    placeholder="Search tenant name or sector..."
                    className="w-full h-10 rounded-xl border border-input bg-background pl-9 pr-3 text-xs placeholder:text-muted-foreground outline-none focus:border-primary"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full no-scrollbar">
                  {["All", "Health AI", "AgriTech", "Language AI", "Fintech AI", "Climate AI"].map((sector) => (
                    <button
                      key={sector}
                      onClick={() => setSelectedSector(sector)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                        selectedSector === sector
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {sector}
                    </button>
                  ))}
                </div>
              </div>

              {/* Startups Table */}
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground uppercase text-[11px]">
                    <tr>
                      <th className="p-4 sm:p-5">Startup & Sector</th>
                      <th className="p-4 sm:p-5">Location</th>
                      <th className="p-4 sm:p-5">Team Size</th>
                      <th className="p-4 sm:p-5">Investment Round</th>
                      <th className="p-4 sm:p-5">Products</th>
                      <th className="p-4 sm:p-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {filteredStartups.map((startup) => (
                      <tr key={startup.slug} className="hover:bg-muted/20 transition-colors">
                        <td className="p-4 sm:p-5">
                          <p className="font-bold text-sm text-foreground">{startup.name}</p>
                          <p className="text-[11px] text-muted-foreground">{startup.sector}</p>
                        </td>
                        <td className="p-4 sm:p-5 text-muted-foreground">{startup.location}</td>
                        <td className="p-4 sm:p-5 font-semibold text-foreground">{startup.team_size} members</td>
                        <td className="p-4 sm:p-5">
                          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                            ${(startup.investment_ask.amount_usd / 1000).toFixed(0)}k ({startup.investment_ask.round})
                          </span>
                        </td>
                        <td className="p-4 sm:p-5">
                          <span className="text-muted-foreground">{startup.products.length} registered</span>
                        </td>
                        <td className="p-4 sm:p-5 text-right space-x-2">
                          <Button asChild size="sm" variant="outline" className="rounded-xl text-[11px] h-8">
                            <Link to="/$startupSlug" params={{ startupSlug: startup.slug }}>
                              Public Profile <Eye className="ml-1 size-3" />
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              switchDemoRole("startup_admin");
                              navigate({ to: `/portal?tenant=${startup.slug}` as any });
                            }}
                            className="rounded-xl text-[11px] h-8 text-primary border-primary/30 hover:bg-primary/10"
                          >
                            Impersonate Portal
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================== */}
          {/* TAB 3: INVESTOR VETTING (FR-25) */}
          {/* ================================================== */}
          {activeTab === "investors" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Investor Vetting & Due Diligence Pipeline
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    PRD Section 4.4 FR-16 & Section 4.5 FR-25: Institutional and angel accounts must be verified before accessing confidential startup pitch materials.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-amber-500/15 text-amber-600 px-3 py-1 text-xs font-bold">
                    {pendingInvestorsCount} Pending Verification
                  </span>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {investorList.map((inv) => (
                  <div key={inv.id} className="rounded-3xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-foreground">
                          {inv.type} Investor
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                            inv.status === "VETTED"
                              ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30"
                              : inv.status === "PENDING"
                              ? "bg-amber-500/15 text-amber-600 border border-amber-500/30"
                              : "bg-destructive/15 text-destructive border border-destructive/30"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </div>

                      <h4 className="mt-4 font-display text-lg font-bold text-foreground">{inv.name}</h4>
                      <p className="text-xs font-semibold text-primary">{inv.org}</p>

                      <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                        <p>Fund Assets Under Management: <strong className="text-foreground">{inv.aum}</strong></p>
                        <p>Target Ticket Size: <strong className="text-foreground">{inv.ticket}</strong></p>
                        <p>Target Sectors: <strong className="text-foreground">{inv.sectors.join(", ")}</strong></p>
                        <p>Registered Date: {inv.date}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border flex items-center justify-between gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          switchDemoRole("investor_vetted");
                          navigate({ to: "/investor" });
                        }}
                        className="rounded-xl text-xs"
                      >
                        Preview Portal View
                      </Button>

                      <div className="flex items-center gap-2">
                        {inv.status !== "VETTED" && (
                          <Button
                            size="sm"
                            onClick={() => handleVetInvestor(inv.id, "VETTED")}
                            className="rounded-xl text-xs bg-emerald-600 text-white hover:bg-emerald-700 gap-1.5"
                          >
                            <CheckCircle2 className="size-3.5" /> Approve & Vet
                          </Button>
                        )}
                        {inv.status !== "REJECTED" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleVetInvestor(inv.id, "REJECTED")}
                            className="rounded-xl text-xs gap-1.5"
                          >
                            <XCircle className="size-3.5" /> Reject
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================== */}
          {/* TAB 4: COHORT 3 APPLICANTS */}
          {/* ================================================== */}
          {activeTab === "cohort3" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Cohort 3 Incubation Applicants ({cohort3Applicants.length})
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Review and interview top sovereign AI applications for the upcoming 6-month living lab incubation cycle.
                  </p>
                </div>

                <Button asChild variant="outline" size="sm" className="rounded-xl text-xs gap-1.5">
                  <Link to="/cohort-3">
                    View Public Application Portal <ArrowUpRight className="size-3.5" />
                  </Link>
                </Button>
              </div>

              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground uppercase text-[11px]">
                    <tr>
                      <th className="p-4 sm:p-5">Applicant & Founder</th>
                      <th className="p-4 sm:p-5">Academic / Lab Partner</th>
                      <th className="p-4 sm:p-5">Review Score</th>
                      <th className="p-4 sm:p-5">Pipeline Status</th>
                      <th className="p-4 sm:p-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {cohort3Applicants.map((app) => (
                      <tr key={app.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-4 sm:p-5">
                          <p className="font-bold text-sm text-foreground">{app.name}</p>
                          <p className="text-[11px] text-primary">{app.sector} · {app.founder}</p>
                          <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{app.techSummary}</p>
                        </td>
                        <td className="p-4 sm:p-5 text-muted-foreground">{app.university}</td>
                        <td className="p-4 sm:p-5">
                          <span className="font-display font-bold text-sm text-foreground">{app.score}</span>
                          <span className="text-muted-foreground text-[10px]"> / 100</span>
                        </td>
                        <td className="p-4 sm:p-5">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              app.status === "ACCEPTED"
                                ? "bg-emerald-500/15 text-emerald-600"
                                : app.status === "SHORTLISTED"
                                ? "bg-purple-500/15 text-purple-600"
                                : app.status === "INTERVIEWED"
                                ? "bg-blue-500/15 text-blue-600"
                                : "bg-amber-500/15 text-amber-600"
                            }`}
                          >
                            {app.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="p-4 sm:p-5 text-right space-x-1.5">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateApplicantStatus(app.id, "SHORTLISTED")}
                            className="rounded-xl text-[10px] h-7 px-2"
                          >
                            Shortlist
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateApplicantStatus(app.id, "INTERVIEWED")}
                            className="rounded-xl text-[10px] h-7 px-2"
                          >
                            Interview
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateApplicantStatus(app.id, "ACCEPTED")}
                            className="rounded-xl text-[10px] h-7 px-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            Accept
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================== */}
          {/* TAB 5: EAII GPU LIVING LAB & COMPUTE */}
          {/* ================================================== */}
          {activeTab === "compute" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    EAII Sovereign High-Performance Compute Infrastructure
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    85 high-performance GPU workstations and 1 Petabyte national AI storage integration at EAII Headquarters.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                    All 85 Nodes Operational
                  </span>
                </div>
              </div>

              {/* Compute Cluster Cards */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-border bg-card p-6 shadow-xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-semibold uppercase">Cluster Alpha (LLM / NLP)</span>
                    <Server className="size-4 text-primary" />
                  </div>
                  <p className="mt-3 font-display text-2xl font-bold text-foreground">32 Nodes (A100 80GB)</p>
                  <p className="mt-1 text-xs text-muted-foreground">Dedicated to Amharic & Regional Language Models</p>
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">Active Workload:</span>
                    <span className="text-emerald-600">Sela Health + Abyssinia AI</span>
                  </div>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6 shadow-xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-semibold uppercase">Cluster Beta (Computer Vision)</span>
                    <Cpu className="size-4 text-emerald-600" />
                  </div>
                  <p className="mt-3 font-display text-2xl font-bold text-foreground">28 Nodes (RTX 6000 Ada)</p>
                  <p className="mt-1 text-xs text-muted-foreground">Agricultural Vision & Medical Diagnostic Imaging</p>
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">Active Workload:</span>
                    <span className="text-emerald-600">Kuraz Agri + TenaMed AI</span>
                  </div>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6 shadow-xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-semibold uppercase">Living Lab Workstations</span>
                    <HardDrive className="size-4 text-purple-600" />
                  </div>
                  <p className="mt-3 font-display text-2xl font-bold text-foreground">25 Interactive Desks</p>
                  <p className="mt-1 text-xs text-muted-foreground">On-premise rapid prototyping at EAII Addis Ababa</p>
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">Current Occupancy:</span>
                    <span className="text-primary">22 / 25 Desks</span>
                  </div>
                </div>
              </div>

              {/* Data Center Architecture Telemetry */}
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs">
                <h4 className="font-display text-base font-bold text-foreground mb-4">
                  Sovereign Data Storage & Network Topology
                </h4>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
                  <div className="rounded-2xl border border-border bg-muted/20 p-4">
                    <p className="text-muted-foreground">Network Backbone</p>
                    <p className="mt-1 font-display text-lg font-bold text-foreground">10 Gbps Low-Latency</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">Direct fiber link to AAU Center of Excellence</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-muted/20 p-4">
                    <p className="text-muted-foreground">Central Storage</p>
                    <p className="mt-1 font-display text-lg font-bold text-foreground">1.0 Petabyte NVMe</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">Encrypted national research repository</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-muted/20 p-4">
                    <p className="text-muted-foreground">Power & Resilience</p>
                    <p className="mt-1 font-display text-lg font-bold text-foreground">Dual Grid + UPS</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">99.98% guaranteed laboratory uptime</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-muted/20 p-4">
                    <p className="text-muted-foreground">Facility Footprint</p>
                    <p className="mt-1 font-display text-lg font-bold text-foreground">800 m² Renovated</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">Living lab + maker space + demo theater</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================== */}
          {/* TAB 6: SECURITY & AUDIT LOG (FR-26) */}
          {/* ================================================== */}
          {activeTab === "audit" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Platform Security & Compliance Audit Log
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    PRD Section 4.5 FR-26: All administrative actions, investor diligence requests, and tenant allocations are permanently recorded.
                  </p>
                </div>

                <Button
                  onClick={handleExportAuditCsv}
                  variant="outline"
                  className="rounded-2xl gap-2 font-semibold text-xs h-10 shadow-xs"
                >
                  <Download className="size-4" /> Export CSV Report
                </Button>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs">
                <div className="space-y-4">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="flex items-start justify-between border-b border-border/70 pb-4 last:border-b-0 last:pb-0 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              log.type === "SECURITY"
                                ? "bg-purple-500/15 text-purple-600"
                                : log.type === "PROVISIONING"
                                ? "bg-blue-500/15 text-blue-600"
                                : log.type === "COMPUTE"
                                ? "bg-amber-500/15 text-amber-600"
                                : "bg-emerald-500/15 text-emerald-600"
                            }`}
                          >
                            {log.type}
                          </span>
                          <span className="font-semibold text-foreground">{log.action}</span>
                        </div>
                        <p className="text-muted-foreground">
                          Authorized Actor: <span className="font-semibold text-foreground">{log.actor}</span>
                        </p>
                      </div>
                      <span className="text-muted-foreground text-[11px] shrink-0 ml-4 font-mono">{log.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ================================================== */}
      {/* PROVISION NEW STARTUP TENANT MODAL (FR-21) */}
      {/* ================================================== */}
      {isProvisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Tenant Provisioning (FR-21)</span>
                <h3 className="font-display text-xl font-bold text-foreground mt-0.5">
                  Provision New Sovereign AI Startup
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsProvisionModalOpen(false)}
                className="grid size-8 place-items-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <form className="mt-5 space-y-4" onSubmit={handleProvisionStartup}>
              <div>
                <label className="text-xs font-semibold text-foreground">Startup Venture Name</label>
                <input
                  type="text"
                  required
                  value={newStartupName}
                  onChange={(e) => setNewStartupName(e.target.value)}
                  placeholder="e.g. Hakym Health AI"
                  className="mt-1.5 w-full h-10 rounded-xl border border-input bg-background px-3 text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-foreground">AI Sector</label>
                  <select
                    value={newStartupSector}
                    onChange={(e) => setNewStartupSector(e.target.value)}
                    className="mt-1.5 w-full h-10 rounded-xl border border-input bg-background px-3 text-xs outline-none focus:border-primary"
                  >
                    <option value="Health AI">Health AI</option>
                    <option value="AgriTech">AgriTech</option>
                    <option value="Language AI">Language AI</option>
                    <option value="Fintech AI">Fintech AI</option>
                    <option value="Climate AI">Climate AI</option>
                    <option value="Logistics AI">Logistics AI</option>
                    <option value="Vision AI">Vision AI</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Investment Ask ($ USD)</label>
                  <input
                    type="number"
                    value={newStartupAsk}
                    onChange={(e) => setNewStartupAsk(e.target.value)}
                    placeholder="350000"
                    className="mt-1.5 w-full h-10 rounded-xl border border-input bg-background px-3 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Mission & Tagline</label>
                <input
                  type="text"
                  value={newStartupTagline}
                  onChange={(e) => setNewStartupTagline(e.target.value)}
                  placeholder="e.g. AI-assisted triage models for district clinics"
                  className="mt-1.5 w-full h-10 rounded-xl border border-input bg-background px-3 text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-foreground">Round</label>
                  <select
                    value={newStartupRound}
                    onChange={(e) => setNewStartupRound(e.target.value)}
                    className="mt-1.5 w-full h-10 rounded-xl border border-input bg-background px-3 text-xs outline-none focus:border-primary"
                  >
                    <option value="Pre-seed">Pre-seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Grant / Cohort">Grant / Cohort</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Team Size</label>
                  <input
                    type="number"
                    value={newStartupTeamSize}
                    onChange={(e) => setNewStartupTeamSize(e.target.value)}
                    className="mt-1.5 w-full h-10 rounded-xl border border-input bg-background px-3 text-xs outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Compute Tier</label>
                  <select className="mt-1.5 w-full h-10 rounded-xl border border-input bg-background px-3 text-xs outline-none focus:border-primary">
                    <option>HPC A100 (4 GPUs)</option>
                    <option>RTX Vision (2 GPUs)</option>
                    <option>Standard Lab Workstation</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-xs font-bold text-foreground">Founder & Tenant Admin Account</p>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-muted-foreground">Founder Full Name</label>
                    <input
                      type="text"
                      value={newStartupFounderName}
                      onChange={(e) => setNewStartupFounderName(e.target.value)}
                      placeholder="e.g. Bethlehem Tadesse"
                      className="mt-1 w-full h-9 rounded-xl border border-input bg-background px-3 text-xs outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground">Founder Email</label>
                    <input
                      type="email"
                      value={newStartupFounderEmail}
                      onChange={(e) => setNewStartupFounderEmail(e.target.value)}
                      placeholder="founder@venture.et"
                      className="mt-1 w-full h-9 rounded-xl border border-input bg-background px-3 text-xs outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsProvisionModalOpen(false)}
                  className="rounded-xl text-xs h-10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl text-xs h-10 bg-primary text-primary-foreground font-semibold shadow-sm"
                >
                  Provision & Deploy Tenant
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
