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
  Calendar,
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
  MapPin,
  Megaphone,
  Menu,
  Network,
  PanelLeftClose,
  PanelLeftOpen,
  Pause,
  Play,
  Plus,
  Radio,
  RefreshCw,
  Rocket,
  RotateCcw,
  Search,
  Server,
  Settings,
  Share2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  Tag,
  Terminal,
  Trash2,
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
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { INITIAL_COHORTS, type CohortProgram } from "@/data/cohorts";
import { INITIAL_EVENTS, type EcosystemEvent } from "@/data/events";
import {
  STARTUPS as INITIAL_STARTUPS,
  type Startup,
  getStartupCohort,
  getStartupStage,
} from "@/data/startups";
import { DEMO_USERS, useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Program Administration Console — AI UNIPOD Ethiopia" },
      {
        name: "description",
        content:
          "Super Admin dashboard for orchestrating startups, high-performance compute infrastructure, investor diligence, and cohort pipelines.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboardPage,
});

// Mock Cohort Applicants
const INITIAL_COHORT_APPLICANTS = [
  {
    id: "c3-01",
    cohortId: "cohort-03",
    name: "TenaMed AI",
    sector: "Health AI",
    founder: "Dr. Selamawit Bekele",
    email: "selam@tenamed.et",
    university: "Addis Ababa University (Health Sciences)",
    techSummary:
      "Edge-AI ultrasound diagnostics optimized for maternal clinics with low-bandwidth offline caching.",
    score: 94,
    status: "UNDER_REVIEW" as "UNDER_REVIEW" | "SHORTLISTED" | "INTERVIEWED" | "ACCEPTED" | "REJECTED",
    date: "2026-09-12",
  },
  {
    id: "c3-02",
    cohortId: "cohort-03",
    name: "EthioBio Vision",
    sector: "AgriTech",
    founder: "Yared Haile",
    email: "yared@ethiobio.ai",
    university: "Haramaya University / EAII Lab",
    techSummary:
      "Hyperspectral drone imagery vision models detecting coffee berry disease and rust before visible crop loss.",
    score: 89,
    status: "SHORTLISTED" as "UNDER_REVIEW" | "SHORTLISTED" | "INTERVIEWED" | "ACCEPTED" | "REJECTED",
    date: "2026-09-15",
  },
  {
    id: "c3-03",
    cohortId: "cohort-03",
    name: "Sheger Mobility AI",
    sector: "Logistics AI",
    founder: "Kalkidan Girma",
    email: "kalkidan@shegermobility.et",
    university: "Addis Ababa Institute of Technology (AAiT)",
    techSummary:
      "Dynamic minibus fleet dispatch and route congestion prediction algorithms for Addis Ababa municipal transit.",
    score: 86,
    status: "INTERVIEWED" as "UNDER_REVIEW" | "SHORTLISTED" | "INTERVIEWED" | "ACCEPTED" | "REJECTED",
    date: "2026-09-18",
  },
  {
    id: "c3-04",
    cohortId: "cohort-03",
    name: "Abyssinia Voice LLM",
    sector: "Language AI",
    founder: "Tewodros Kassahun",
    email: "ted@abyssiniavoice.ai",
    university: "EAII Natural Language Processing Lab",
    techSummary:
      "Low-resource speech-to-text models for Tigrinya, Afaan Oromoo, and Somali customer support automation.",
    score: 92,
    status: "ACCEPTED" as "UNDER_REVIEW" | "SHORTLISTED" | "INTERVIEWED" | "ACCEPTED" | "REJECTED",
    date: "2026-09-20",
  },
  {
    id: "c4-01",
    cohortId: "cohort-04",
    name: "Geomap Ethiopia AI",
    sector: "Climate & Earth Observation",
    founder: "Marta Desta",
    email: "marta@geomap.et",
    university: "Arba Minch University / Water Institute",
    techSummary:
      "Synthetic aperture radar water basin depth prediction for hydroelectric reservoir planning.",
    score: 91,
    status: "UNDER_REVIEW" as "UNDER_REVIEW" | "SHORTLISTED" | "INTERVIEWED" | "ACCEPTED" | "REJECTED",
    date: "2026-09-28",
  },
];

export function AdminDashboardPage() {
  const { user, isAuthenticated, switchDemoRole, logout } = useAuth();
  const navigate = useNavigate();

  const isSuperAdmin = isAuthenticated && user?.role === "SUPER_ADMIN";

  // Sidebar & Navigation UI State
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "events" | "cohorts" | "startups" | "investors" | "audit"
  >("overview");

  // ==========================================
  // PORTFOLIO & STARTUP ANALYTICS STATE (Non-Technical Executive View)
  // ==========================================
  const [overviewStageFilter, setOverviewStageFilter] = useState<string>("All");
  const [visualizationTab, setVisualizationTab] = useState<
    "all" | "capital" | "stages" | "radar"
  >("all");
  const [activeDonutSector, setActiveDonutSector] = useState<string | null>(null);

  const [milestoneFeed, setMilestoneFeed] = useState([
    {
      id: "feed-1",
      title: "Clinical Trial Validation Milestone",
      desc: "Sela Health commenced field pilot validation across 40 rural health extension posts in Oromia.",
      time: "12m ago",
      tag: "PILOT",
      stage: "Pilot",
      cohort: "Cohort 3",
    },
    {
      id: "feed-2",
      title: "Commercial Cooperative Agreement",
      desc: "Kuraz Agri reached Market stage with 14 smallholder farmer cooperatives in Hawassa.",
      time: "45m ago",
      tag: "MARKET",
      stage: "Market",
      cohort: "Cohort 2",
    },
    {
      id: "feed-3",
      title: "Cohort 4 Intake Application Received",
      desc: "Geomap Ethiopia AI submitted proposal for Cohort 4 (Climate & Earth Observation).",
      time: "2h ago",
      tag: "INTAKE",
      stage: "Concept",
      cohort: "Cohort 4",
    },
    {
      id: "feed-4",
      title: "Institutional Deal Room Diligence",
      desc: "Vetted Institutional Investor accessed deal room diligence pack for Enku Credit.",
      time: "3h ago",
      tag: "INVESTOR",
      stage: "Market",
      cohort: "Cohort 3",
    },
    {
      id: "feed-5",
      title: "Industrial Park Vision Deployment",
      desc: "Abyssinia Vision deployed TextileInspect AI camera sensor units at Hawassa Industrial Park.",
      time: "5h ago",
      tag: "MARKET",
      stage: "Market",
      cohort: "Cohort 2",
    },
    {
      id: "feed-6",
      title: "Rift Valley Hydrological Telemetry",
      desc: "Awash Climate expanded river basin sensor network in partnership with Adama Science and Technology University.",
      time: "1d ago",
      tag: "PILOT",
      stage: "Pilot",
      cohort: "Cohort 2",
    },
  ]);

  // ==========================================
  // EVENTS MANAGEMENT STATE
  // ==========================================
  const [eventsList, setEventsList] = useState<EcosystemEvent[]>(INITIAL_EVENTS);
  const [eventCategoryFilter, setEventCategoryFilter] = useState("All");
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  // New Event Form State
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventCategory, setNewEventCategory] = useState<EcosystemEvent["category"]>("Hackathon");
  const [newEventDate, setNewEventDate] = useState("2026-11-15");
  const [newEventTime, setNewEventTime] = useState("09:30 AM – 05:00 PM EAT");
  const [newEventVenue, setNewEventVenue] = useState("EAII Sovereign Innovation Center, Addis Ababa");
  const [newEventIsVirtual, setNewEventIsVirtual] = useState(false);
  const [newEventAudience, setNewEventAudience] = useState("AI Founders, ML Researchers, University Cohort Teams");
  const [newEventCapacity, setNewEventCapacity] = useState("150");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventRegistrationUrl, setNewEventRegistrationUrl] = useState("");
  const [newEventTags, setNewEventTags] = useState("AI, Sovereign, EAII");
  const [newEventStatus, setNewEventStatus] = useState<EcosystemEvent["status"]>("PUBLISHED");

  const handlePostEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) {
      toast.error("Please enter an event title");
      return;
    }

    const createdEvent: EcosystemEvent = {
      id: `evt-${Date.now()}`,
      title: newEventTitle.trim(),
      category: newEventCategory,
      date: newEventDate,
      time: newEventTime,
      venue: newEventVenue,
      isVirtual: newEventIsVirtual,
      audience: newEventAudience,
      capacity: parseInt(newEventCapacity, 10) || 100,
      rsvpCount: 0,
      status: newEventStatus,
      description: newEventDescription || "Ecosystem event organized by AI UNIPOD Ethiopia.",
      registrationUrl: newEventRegistrationUrl || undefined,
      tags: newEventTags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    setEventsList((prev) => [createdEvent, ...prev]);
    setIsEventModalOpen(false);

    // Reset Form
    setNewEventTitle("");
    setNewEventDescription("");
    setNewEventRegistrationUrl("");

    toast.success(`Successfully posted event: "${createdEvent.title}"!`);

    // Log to audit
    const newLog = {
      id: `log-${Date.now()}`,
      actor: user?.name || "Admin User",
      action: `Posted new ecosystem event: "${createdEvent.title}" (${createdEvent.category})`,
      time: "Just now",
      type: "EVENT" as const,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleToggleEventStatus = (eventId: string) => {
    setEventsList((prev) =>
      prev.map((evt) => {
        if (evt.id === eventId) {
          const nextStatus = evt.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
          toast.info(`Event status updated to ${nextStatus}`);
          return { ...evt, status: nextStatus };
        }
        return evt;
      })
    );
  };

  const handleDeleteEvent = (eventId: string) => {
    setEventsList((prev) => prev.filter((e) => e.id !== eventId));
    toast.success("Event deleted");
  };

  // ==========================================
  // COHORTS & INTAKE STATE
  // ==========================================
  const [cohortsList, setCohortsList] = useState<CohortProgram[]>(INITIAL_COHORTS);
  const [cohortApplicants, setCohortApplicants] = useState(INITIAL_COHORT_APPLICANTS);
  const [cohortSubView, setCohortSubView] = useState<"programs" | "applicants">("programs");
  const [isCohortModalOpen, setIsCohortModalOpen] = useState(false);

  // New Cohort Form State
  const [newCohortName, setNewCohortName] = useState("");
  const [newCohortEdition, setNewCohortEdition] = useState("Cohort 5");
  const [newCohortDeadline, setNewCohortDeadline] = useState("2027-02-28");
  const [newCohortStartDate, setNewCohortStartDate] = useState("2027-03-15");
  const [newCohortEndDate, setNewCohortEndDate] = useState("2027-09-15");
  const [newCohortTargetVentures, setNewCohortTargetVentures] = useState("15");
  const [newCohortGrantPool, setNewCohortGrantPool] = useState("$150,000 Equity-Free Seed");
  const [newCohortComputeHours, setNewCohortComputeHours] = useState("60,000 GPU Node Hours");
  const [newCohortSectors, setNewCohortSectors] = useState("Health AI, AgriTech, NLP, Edge AI");
  const [newCohortDescription, setNewCohortDescription] = useState("");
  const [newCohortEligibility, setNewCohortEligibility] = useState("");
  const [newCohortStatus, setNewCohortStatus] = useState<CohortProgram["status"]>("ACCEPTING_APPLICATIONS");

  const handlePostCohort = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCohortName.trim()) {
      toast.error("Please enter a cohort name");
      return;
    }

    const createdCohort: CohortProgram = {
      id: `cohort-${Date.now()}`,
      name: newCohortName.trim(),
      edition: newCohortEdition.trim(),
      status: newCohortStatus,
      applicationDeadline: newCohortDeadline,
      programStartDate: newCohortStartDate,
      programEndDate: newCohortEndDate,
      targetVentures: parseInt(newCohortTargetVentures, 10) || 12,
      grantPool: newCohortGrantPool,
      computeHours: newCohortComputeHours,
      sectors: newCohortSectors.split(",").map((s) => s.trim()).filter(Boolean),
      description: newCohortDescription || "National incubation cohort for sovereign AI ventures.",
      eligibility: newCohortEligibility || "Technical co-founders with working prototype.",
      applicantsCount: 0,
      acceptedCount: 0,
    };

    setCohortsList((prev) => [createdCohort, ...prev]);
    setIsCohortModalOpen(false);

    // Reset Form
    setNewCohortName("");
    setNewCohortDescription("");
    setNewCohortEligibility("");

    toast.success(`Successfully launched new cohort: "${createdCohort.name}"!`);

    // Log to audit
    const newLog = {
      id: `log-${Date.now()}`,
      actor: user?.name || "Admin User",
      action: `Launched new incubation cohort: "${createdCohort.name}" (${createdCohort.edition})`,
      time: "Just now",
      type: "COHORT" as const,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleUpdateApplicantStatus = (
    id: string,
    newStatus: (typeof INITIAL_COHORT_APPLICANTS)[0]["status"]
  ) => {
    setCohortApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    toast.success(`Applicant status updated to ${newStatus.replace("_", " ")}`);
  };

  // ==========================================
  // STARTUPS & PROVISIONING STATE
  // ==========================================
  const [startupsList, setStartupsList] = useState<Startup[]>(INITIAL_STARTUPS);
  const [startupSearch, setStartupSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");

  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);
  const [newStartupName, setNewStartupName] = useState("");
  const [newStartupSector, setNewStartupSector] = useState("Health AI");
  const [newStartupCohort, setNewStartupCohort] = useState("Cohort 3");
  const [newStartupStage, setNewStartupStage] = useState<"Concept" | "Prototype" | "Pilot" | "Market">("Prototype");
  const [newStartupTagline, setNewStartupTagline] = useState("");
  const [newStartupLocation, setNewStartupLocation] = useState("Addis Ababa, Ethiopia");
  const [newStartupAsk, setNewStartupAsk] = useState("350000");
  const [newStartupRound, setNewStartupRound] = useState("Pre-seed");
  const [newStartupTeamSize, setNewStartupTeamSize] = useState("6");
  const [newStartupFounderName, setNewStartupFounderName] = useState("");
  const [newStartupFounderEmail, setNewStartupFounderEmail] = useState("");

  const handleProvisionStartup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStartupName.trim()) {
      toast.error("Please enter startup name");
      return;
    }

    const slug = newStartupName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newTenant: Startup = {
      slug,
      name: newStartupName,
      tagline: newStartupTagline || "Sovereign AI innovation in Ethiopia.",
      sector: newStartupSector,
      cohort: newStartupCohort,
      description: "Recently provisioned venture incubated at the EAII AI UNIPOD national laboratory.",
      location: newStartupLocation,
      founded: `${new Date().getFullYear()}`,
      team_size: parseInt(newStartupTeamSize, 10) || 4,
      products: [
        {
          name: `${newStartupName} Core Solution`,
          summary: "Sovereign AI model pipeline running locally.",
          stage: newStartupStage,
        },
      ],
      investment_ask: {
        amount_usd: parseInt(newStartupAsk, 10) || 250000,
        round: newStartupRound,
        use_of_funds: "Compute training infrastructure, team expansion, and field pilot validation.",
      },
      links: [
        { label: "Public Profile", url: `/${slug}` },
      ],
      theme: {
        primary_color: "#2563EB",
        secondary_color: "#1E3A8A",
        accent_color: "#38BDF8",
        surface_color: "#F8FAFC",
        text_color: "#0F172A",
        font_family: "system-ui, sans-serif",
        radius: "1rem",
        layout: "classic",
      },
    };

    setStartupsList((prev) => [newTenant, ...prev]);

    const newLog = {
      id: `log-${Date.now()}`,
      actor: user?.name || "Admin User",
      action: `Provisioned new startup tenant: ${newTenant.name} (${newTenant.sector})`,
      time: "Just now",
      type: "PROVISIONING" as const,
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    setIsProvisionModalOpen(false);
    setNewStartupName("");
    setNewStartupTagline("");
    setNewStartupFounderName("");
    setNewStartupFounderEmail("");

    toast.success(`Successfully provisioned tenant: ${newTenant.name}!`);
  };

  // ==========================================
  // INVESTOR VETTING STATE
  // ==========================================
  const [investorList, setInvestorList] = useState([
    {
      id: "inv-1",
      name: "Vetted Investor",
      org: "Venture Capital Partner",
      type: "VC" as const,
      ticket: "$150k – $500k",
      sectors: ["Health AI", "AgriTech"],
      status: "VETTED" as "VETTED" | "PENDING" | "REJECTED",
      date: "2025-02-14",
      aum: "$120M",
      leadPartner: "Vetted Investor",
      accredited: true,
    },
    {
      id: "inv-2",
      name: "Angel Investor",
      org: "Angel Investor Syndicate",
      type: "Angel" as const,
      ticket: "$25k – $50k",
      sectors: ["Language AI", "AgriTech"],
      status: "PENDING" as "VETTED" | "PENDING" | "REJECTED",
      date: "2025-05-18",
      aum: "$2.5M Syndicate",
      leadPartner: "Angel Investor",
      accredited: true,
    },
    {
      id: "inv-3",
      name: "DFI Partner",
      org: "Regional DFI Fund",
      type: "DFI" as const,
      ticket: "$250k – $1M",
      sectors: ["Climate AI", "AgriTech"],
      status: "PENDING" as "VETTED" | "PENDING" | "REJECTED",
      date: "2025-06-02",
      aum: "$45M",
      leadPartner: "DFI Partner",
      accredited: true,
    },
    {
      id: "inv-4",
      name: "Institutional Partner",
      org: "Global Frontier Fund",
      type: "VC" as const,
      ticket: "$500k+",
      sectors: ["Vision AI", "Fintech AI"],
      status: "REJECTED" as "VETTED" | "PENDING" | "REJECTED",
      date: "2025-03-01",
      aum: "$80M",
      leadPartner: "Institutional Partner",
      accredited: false,
    },
  ]);

  const handleVetInvestor = (id: string, newStatus: "VETTED" | "REJECTED") => {
    const target = investorList.find((i) => i.id === id);
    setInvestorList((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: newStatus } : inv))
    );

    const newLog = {
      id: `log-${Date.now()}`,
      actor: user?.name || "Admin User",
      action: `${newStatus === "VETTED" ? "Approved" : "Rejected"} investor account for ${target?.org || "investor"}`,
      time: "Just now",
      type: "SECURITY" as const,
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    if (newStatus === "VETTED") {
      toast.success(`Approved ${target?.org} for investor deal room access!`);
    } else {
      toast.info(`Investor status updated to ${newStatus}.`);
    }
  };

  // ==========================================
  // AUDIT LOGS STATE
  // ==========================================
  interface AuditLog {
    id: string;
    actor: string;
    action: string;
    time: string;
    type: "SECURITY" | "COMPUTE" | "COHORT" | "STARTUP" | "COMPLIANCE" | "PROVISIONING" | "EVENT";
  }

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: "log-1",
      actor: "Admin User",
      action: "Vetted investor account: Venture Capital Partner (Deal Room Access Approved)",
      time: "Just now",
      type: "SECURITY" as const,
    },
    {
      id: "log-2",
      actor: "System Engine",
      action: "EAII AI Lab automated system health check completed across active tenant environments",
      time: "42 mins ago",
      type: "SECURITY" as const,
    },
    {
      id: "log-3",
      actor: "Admin User",
      action: "Reviewed Cohort 3 application: TenaMed AI (Score: 94/100)",
      time: "2 hours ago",
      type: "COHORT" as const,
    },
    {
      id: "log-4",
      actor: "Startup Founder",
      action: "Uploaded v2.4 institutional pitch deck for Sela Health",
      time: "5 hours ago",
      type: "STARTUP" as const,
    },
    {
      id: "log-5",
      actor: "System Engine",
      action: "UNDP Quarterly Impact rollups exported ($3.2M sought, 68 jobs created)",
      time: "1 day ago",
      type: "COMPLIANCE" as const,
    },
    {
      id: "log-6",
      actor: "Admin User",
      action: "Provisioned new startup tenant: Hakym AI (Diagnostic Vision)",
      time: "2 days ago",
      type: "PROVISIONING" as const,
    },
  ]);

  // Derived counts
  const pendingInvestorsCount = investorList.filter((i) => i.status === "PENDING").length;
  const pendingApplicantsCount = cohortApplicants.filter((a) => a.status === "UNDER_REVIEW").length;
  const publishedEventsCount = eventsList.filter((e) => e.status === "PUBLISHED").length;

  // Filtered startups
  const filteredStartups = startupsList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(startupSearch.toLowerCase()) ||
      s.tagline.toLowerCase().includes(startupSearch.toLowerCase());
    const matchesSector = selectedSector === "All" || s.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  // Filtered events
  const filteredEvents = eventsList.filter((e) => {
    return eventCategoryFilter === "All" || e.category === eventCategoryFilter;
  });

  // ==========================================
  // DERIVED PORTFOLIO OVERVIEW METRICS (Executive Review)
  // ==========================================
  const totalVenturesCount = startupsList.length;
  const marketStartups = startupsList.filter((s) => getStartupStage(s) === "Market");
  const pilotStartups = startupsList.filter((s) => getStartupStage(s) === "Pilot");
  const prototypeStartups = startupsList.filter((s) => getStartupStage(s) === "Prototype");
  const conceptStartups = startupsList.filter((s) => getStartupStage(s) === "Concept");

  const totalCapitalSoughtUsd = startupsList.reduce(
    (acc, s) => acc + s.investment_ask.amount_usd,
    0
  );
  const totalJobsCreated = startupsList.reduce((acc, s) => acc + s.team_size, 0);

  const cohort3Startups = startupsList.filter((s) => getStartupCohort(s) === "Cohort 3");
  const cohort2Startups = startupsList.filter((s) => getStartupCohort(s) === "Cohort 2");
  const cohort4Startups = startupsList.filter((s) => getStartupCohort(s) === "Cohort 4");

  // Overview Tab Filtered Startups
  const overviewFilteredStartups = startupsList.filter((s) => {
    const stage = getStartupStage(s);
    return overviewStageFilter === "All" || stage === overviewStageFilter;
  });

  // Non-technical Chart 1: Stage progression by cohort data
  const cohortStageChartData = [
    {
      cohort: "Cohort 3 (Active)",
      Market: cohort3Startups.filter((s) => getStartupStage(s) === "Market").length,
      Pilot: cohort3Startups.filter((s) => getStartupStage(s) === "Pilot").length,
      Prototype: cohort3Startups.filter((s) => getStartupStage(s) === "Prototype").length,
      Concept: cohort3Startups.filter((s) => getStartupStage(s) === "Concept").length,
    },
    {
      cohort: "Cohort 2 (Graduated)",
      Market: cohort2Startups.filter((s) => getStartupStage(s) === "Market").length,
      Pilot: cohort2Startups.filter((s) => getStartupStage(s) === "Pilot").length,
      Prototype: cohort2Startups.filter((s) => getStartupStage(s) === "Prototype").length,
      Concept: cohort2Startups.filter((s) => getStartupStage(s) === "Concept").length,
    },
  ];

  // Executive Visualizations Datasets
  const SECTOR_PALETTE: Record<string, string> = {
    AgriTech: "#10B981", // Emerald
    "Health AI": "#0EA5E9", // Sky
    "Language AI": "#8B5CF6", // Purple
    "Fintech AI": "#F59E0B", // Amber
    "CleanTech AI": "#14B8A6", // Teal
    "Civic AI": "#EC4899", // Rose
  };
  const DEFAULT_COLORS = ["#10B981", "#0EA5E9", "#8B5CF6", "#F59E0B", "#14B8A6", "#EC4899"];

  const sectorList = Array.from(new Set(startupsList.map((s) => s.sector)));
  const sectorChartData = sectorList.map((sector, idx) => {
    const inSector = startupsList.filter((s) => s.sector === sector);
    const capitalUsd = inSector.reduce(
      (acc, s) => acc + s.investment_ask.amount_usd,
      0
    );
    const color =
      SECTOR_PALETTE[sector] || DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
    return {
      sectorName: sector.replace(" AI", "").replace("Tech", ""),
      fullName: sector,
      capitalK: Math.round(capitalUsd / 1000),
      capitalUsd,
      jobs: inSector.reduce((acc, s) => acc + s.team_size, 0),
      count: inSector.length,
      color,
    };
  });

  const sectorDonutData = sectorChartData.map((d) => ({
    name: d.fullName,
    shortName: d.sectorName,
    value: d.capitalK,
    jobs: d.jobs,
    count: d.count,
    color: d.color,
  }));

  // Sovereign AI Ecosystem Capability Radar Matrix (6 Strategic Pillars)
  const sovereignRadarData = [
    {
      metric: "Local Language Data",
      Cohort2: 70,
      Cohort3: 95,
      fullMark: 100,
    },
    {
      metric: "Field Pilot Scale",
      Cohort2: 85,
      Cohort3: 92,
      fullMark: 100,
    },
    {
      metric: "Commercial Contracts",
      Cohort2: 95,
      Cohort3: 65,
      fullMark: 100,
    },
    {
      metric: "Sovereign IP & Code",
      Cohort2: 78,
      Cohort3: 88,
      fullMark: 100,
    },
    {
      metric: "AI Talent Density",
      Cohort2: 82,
      Cohort3: 90,
      fullMark: 100,
    },
    {
      metric: "Gov & Institutional Links",
      Cohort2: 88,
      Cohort3: 96,
      fullMark: 100,
    },
  ];

  // Access guard
  if (!isSuperAdmin) {
    return (
      <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-background text-foreground flex flex-col justify-between">
        <header className="border-b border-border/70 py-4 px-6 sm:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-primary/10 grid place-items-center">
              <Bot className="size-4 text-primary" />
            </div>
            <span className="font-display font-bold text-sm tracking-tight text-foreground">
              AI UNIPOD Ethiopia
            </span>
          </Link>
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
            Return to public portal
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-3xl border border-border bg-card p-8 text-center shadow-lg animate-in fade-in zoom-in-95">
            <div className="mx-auto size-16 rounded-2xl bg-primary/10 border border-primary/20 grid place-items-center">
              <ShieldAlert className="size-8 text-primary" />
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
                  toast.success("Authorized as Super Admin (admin@admin.com)");
                }}
                className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm shadow-md gap-2"
              >
                <ShieldCheck className="size-4" /> Sign In as Super Admin (admin@admin.com)
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

  // Navigation Items definitions with consistent colors
  const navItems = [
    {
      id: "overview",
      label: "Portfolio Analytics",
      description: "Startups, stages & cohort pipeline",
      icon: BarChart3,
      badge: `${totalVenturesCount} Startups`,
      badgeColor: "bg-primary/10 text-primary border border-primary/20",
    },
    {
      id: "cohorts",
      label: "Cohorts & Intake",
      description: "Post cohorts & review applicants",
      icon: GraduationCap,
      badge: pendingApplicantsCount > 0 ? `${pendingApplicantsCount} New` : null,
      badgeColor: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30",
    },
    {
      id: "startups",
      label: "Tenants & Startups",
      description: "Provision & manage ventures",
      icon: Building2,
      badge: startupsList.length,
      badgeColor: "bg-primary/10 text-primary border border-primary/20",
    },
    {
      id: "events",
      label: "Events & Hubs",
      description: "Post & manage ecosystem events",
      icon: Calendar,
      badge: `${publishedEventsCount} Active`,
      badgeColor: "bg-primary/10 text-primary border border-primary/20",
    },
    {
      id: "investors",
      label: "Investor Vetting",
      description: "Deal room diligence pipeline",
      icon: UserCheck,
      badge: pendingInvestorsCount > 0 ? `${pendingInvestorsCount} Pending` : null,
      badgeColor: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30",
    },
    {
      id: "audit",
      label: "Audit & Security",
      description: "Activity trail & compliance",
      icon: ShieldCheck,
      badge: `${auditLogs.length}`,
      badgeColor: "bg-muted text-muted-foreground",
    },
  ];

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
                <span className="text-[10px] font-semibold text-primary uppercase tracking-wider block">
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
            className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
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

          {/* Quick Actions in Sidebar */}
          {!sidebarCollapsed && (
            <div className="pt-3 border-t border-border/60 space-y-2">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Quick Publish
              </p>
              <button
                type="button"
                onClick={() => setIsEventModalOpen(true)}
                className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-foreground bg-primary/10 hover:bg-primary/15 border border-primary/20 transition-all text-left"
              >
                <Plus className="size-3.5 text-primary" /> Post New Event
              </button>
              <button
                type="button"
                onClick={() => setIsCohortModalOpen(true)}
                className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-foreground bg-primary/10 hover:bg-primary/15 border border-primary/20 transition-all text-left"
              >
                <Plus className="size-3.5 text-primary" /> Launch New Cohort
              </button>
            </div>
          )}

          {/* Ecosystem Links Section */}
          <div className="space-y-1 pt-3 border-t border-border/60">
            {!sidebarCollapsed && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Living Lab Ecosystem
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
              <span className="truncate">EAII AI Infrastructure 10Gbps</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={user?.avatarUrl || "/avatars/admin.svg"}
                alt={user?.name || "Admin User"}
                width="36"
                height="36"
                className="size-9 rounded-xl object-cover ring-1 ring-border shrink-0"
              />
              {!sidebarCollapsed && (
                <div className="overflow-hidden">
                  <p className="font-display text-xs font-bold text-foreground leading-tight truncate">
                    {user?.name || "Admin User"}
                  </p>
                  <p className="text-[10px] text-primary font-semibold truncate">
                    {user?.email || "admin@admin.com"}
                  </p>
                </div>
              )}
            </div>

            {!sidebarCollapsed && (
              <button
                type="button"
                onClick={() => {
                  logout();
                  toast.info("Signed out from admin console");
                }}
                className="text-muted-foreground hover:text-destructive p-1 rounded-lg transition-colors"
                title="Sign out"
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
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-card border-r border-border p-5 flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="size-9 rounded-xl bg-primary/10 grid place-items-center">
                    <Bot className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm">AI UNIPOD</p>
                    <p className="text-[10px] text-primary font-semibold">Admin Console</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground"
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
                        setActiveTab(item.id as any);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={user?.avatarUrl || "/avatars/admin.svg"}
                  alt="Avatar"
                  width="32"
                  height="32"
                  className="size-8 rounded-lg object-cover"
                />
                <div>
                  <p className="text-xs font-bold leading-tight">{user?.name || "Admin User"}</p>
                  <p className="text-[10px] text-muted-foreground">{user?.email || "admin@admin.com"}</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  logout();
                  setMobileSidebarOpen(false);
                }}
              >
                <LogOut className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* 3. MAIN DASHBOARD CONTENT AREA */}
      {/* ================================================== */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full overflow-x-hidden">
        {/* Top Dashboard App Header */}
        <header className="h-18 w-full max-w-full border-b border-border bg-card/60 backdrop-blur-md px-5 sm:px-8 flex items-center justify-between sticky top-0 z-20">
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
                className="rounded-lg px-2.5 py-1 text-[11px] font-bold bg-primary text-primary-foreground shadow-2xs"
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

            {/* Primary Action Button based on active tab */}
            {activeTab === "events" ? (
              <Button
                onClick={() => setIsEventModalOpen(true)}
                size="sm"
                className="h-9 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-xs gap-1.5"
              >
                <Plus className="size-3.5" /> Post Event
              </Button>
            ) : activeTab === "cohorts" ? (
              <Button
                onClick={() => setIsCohortModalOpen(true)}
                size="sm"
                className="h-9 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-xs gap-1.5"
              >
                <Plus className="size-3.5" /> Launch Cohort
              </Button>
            ) : (
              <Button
                onClick={() => setIsProvisionModalOpen(true)}
                size="sm"
                className="h-9 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-xs gap-1.5"
              >
                <Plus className="size-3.5" /> Provision Tenant
              </Button>
            )}
          </div>
        </header>

        {/* Dynamic Main Workspace Container */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-[1500px] w-full max-w-full overflow-x-hidden min-w-0">
          {/* ================================================== */}
          {/* TAB 1: PORTFOLIO & COHORT STAGE ANALYTICS */}
          {/* ================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Executive Overview Header Bar */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-2xl bg-primary/10 border border-primary/20 grid place-items-center text-primary shrink-0">
                    <BarChart3 className="size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-display text-lg font-bold text-foreground">
                        Ecosystem Venture Portfolio & Stage Analytics
                      </h2>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        {totalVenturesCount} Sovereign Startups
                      </span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold">
                        2 Active Cohorts
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Executive portfolio intelligence across innovation cohorts, technology maturity stages, and investment pipelines.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {overviewStageFilter !== "All" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setOverviewStageFilter("All");
                        toast.info("Showing all portfolio stages");
                      }}
                      className="h-9 rounded-xl text-xs gap-1.5 border-border"
                    >
                      <RotateCcw className="size-3.5" /> Show All Stages
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const summary = `AI UNIPOD Portfolio Summary:\n• Total Ventures: ${totalVenturesCount}\n• Market Stage: ${marketStartups.length} (${Math.round((marketStartups.length / totalVenturesCount) * 100)}%)\n• Pilot Stage: ${pilotStartups.length} (${Math.round((pilotStartups.length / totalVenturesCount) * 100)}%)\n• Prototype Stage: ${prototypeStartups.length} (${Math.round((prototypeStartups.length / totalVenturesCount) * 100)}%)\n• Capital Pipeline: $${(totalCapitalSoughtUsd / 1000000).toFixed(2)}M\n• High-Skilled Jobs Created: ${totalJobsCreated}`;
                      navigator.clipboard.writeText(summary);
                      toast.success("Executive portfolio summary copied to clipboard");
                    }}
                    className="h-9 rounded-xl text-xs gap-1.5 border-border"
                  >
                    <Download className="size-3.5" /> Export Briefing
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => setIsProvisionModalOpen(true)}
                    className="h-9 rounded-xl bg-primary text-primary-foreground text-xs gap-1.5 font-semibold shadow-xs"
                  >
                    <Plus className="size-3.5" /> Provision Venture
                  </Button>
                </div>
              </div>

              {/* High-Level Executive KPI Stat Cards (5 Cards) */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {/* 1. Total Ventures Incubated */}
                <div className="rounded-3xl border border-border bg-card p-5 shadow-xs relative overflow-hidden group hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[11px] font-semibold uppercase tracking-wider">Total Incubated</span>
                    <div className="size-8 rounded-xl bg-primary/10 grid place-items-center text-primary">
                      <Building2 className="size-4" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <p className="font-display text-3xl font-bold text-foreground sm:text-4xl tabular-nums">
                      {totalVenturesCount}
                    </p>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      100% Active
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Across 2 cohorts & 6 AI sectors</p>
                </div>

                {/* 2. Market Stage (Commercial) */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setOverviewStageFilter(overviewStageFilter === "Market" ? "All" : "Market")}
                  className={`rounded-3xl border p-5 shadow-xs relative overflow-hidden cursor-pointer transition-all ${
                    overviewStageFilter === "Market"
                      ? "border-emerald-500 bg-emerald-500/5 ring-2 ring-emerald-500/20"
                      : "border-border bg-card hover:border-emerald-500/40"
                  }`}
                >
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Market Stage
                    </span>
                    <div className="size-8 rounded-xl bg-emerald-500/10 grid place-items-center text-emerald-600">
                      <CheckCircle2 className="size-4" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <p className="font-display text-3xl font-bold text-emerald-600 sm:text-4xl tabular-nums">
                      {marketStartups.length}
                    </p>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      {Math.round((marketStartups.length / totalVenturesCount) * 100)}%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Live revenue & municipal contracts</p>
                </div>

                {/* 3. Pilot Stage (Field Trials) */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setOverviewStageFilter(overviewStageFilter === "Pilot" ? "All" : "Pilot")}
                  className={`rounded-3xl border p-5 shadow-xs relative overflow-hidden cursor-pointer transition-all ${
                    overviewStageFilter === "Pilot"
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                      Field Pilot Stage
                    </span>
                    <div className="size-8 rounded-xl bg-primary/10 grid place-items-center text-primary">
                      <Activity className="size-4" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <p className="font-display text-3xl font-bold text-foreground sm:text-4xl tabular-nums">
                      {pilotStartups.length}
                    </p>
                    <span className="text-[11px] font-bold text-primary">
                      {Math.round((pilotStartups.length / totalVenturesCount) * 100)}%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Clinical & cooperative deployments</p>
                </div>

                {/* 4. Prototype Stage */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setOverviewStageFilter(overviewStageFilter === "Prototype" ? "All" : "Prototype")}
                  className={`rounded-3xl border p-5 shadow-xs relative overflow-hidden cursor-pointer transition-all ${
                    overviewStageFilter === "Prototype"
                      ? "border-amber-500 bg-amber-500/5 ring-2 ring-amber-500/20"
                      : "border-border bg-card hover:border-amber-500/40"
                  }`}
                >
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Prototype Stage
                    </span>
                    <div className="size-8 rounded-xl bg-amber-500/10 grid place-items-center text-amber-600">
                      <Layers className="size-4" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <p className="font-display text-3xl font-bold text-amber-600 sm:text-4xl tabular-nums">
                      {prototypeStartups.length + conceptStartups.length}
                    </p>
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                      {Math.round(((prototypeStartups.length + conceptStartups.length) / totalVenturesCount) * 100)}%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Functional MVP lab validations</p>
                </div>

                {/* 5. Total Capital Pipeline */}
                <div className="rounded-3xl border border-border bg-card p-5 shadow-xs relative overflow-hidden group hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[11px] font-semibold uppercase tracking-wider">Capital Pipeline</span>
                    <div className="size-8 rounded-xl bg-primary/10 grid place-items-center text-primary">
                      <Wallet className="size-4" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <p className="font-display text-3xl font-bold text-foreground sm:text-4xl tabular-nums">
                      ${(totalCapitalSoughtUsd / 1000000).toFixed(2)}M
                    </p>
                    <span className="text-[11px] font-bold text-primary">Seed & Pre</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{totalJobsCreated} AI engineers employed</p>
                </div>
              </div>

              {/* Visual Stage Progression Funnel / Pipeline Breakdown */}
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                      <TrendingUp className="size-5 text-primary" /> Venture Maturity Stage Pipeline
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Progression funnel tracking startups from lab research to full commercial market integration. Click any stage to filter.
                    </p>
                  </div>

                  {overviewStageFilter !== "All" && (
                    <button
                      type="button"
                      onClick={() => setOverviewStageFilter("All")}
                      className="text-xs font-semibold text-primary hover:underline self-start sm:self-auto"
                    >
                      Showing {overviewStageFilter} Only · Reset to All
                    </button>
                  )}
                </div>

                {/* Segmented Pipeline Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Portfolio Stage Balance</span>
                    <span>
                      {marketStartups.length} Market · {pilotStartups.length} Pilot · {prototypeStartups.length} Prototype
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-muted overflow-hidden flex">
                    <div
                      style={{ width: `${(marketStartups.length / totalVenturesCount) * 100}%` }}
                      className="bg-emerald-500 h-full transition-all duration-500"
                      title={`Market: ${marketStartups.length} startups`}
                    />
                    <div
                      style={{ width: `${(pilotStartups.length / totalVenturesCount) * 100}%` }}
                      className="bg-primary h-full transition-all duration-500"
                      title={`Pilot: ${pilotStartups.length} startups`}
                    />
                    <div
                      style={{ width: `${(prototypeStartups.length / totalVenturesCount) * 100}%` }}
                      className="bg-amber-500 h-full transition-all duration-500"
                      title={`Prototype: ${prototypeStartups.length} startups`}
                    />
                  </div>
                </div>

                {/* 4 Interactive Stage Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Stage 1: Concept */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setOverviewStageFilter(overviewStageFilter === "Concept" ? "All" : "Concept")}
                    className={`rounded-2xl border p-4 text-xs transition-all cursor-pointer ${
                      overviewStageFilter === "Concept"
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-border bg-muted/20 hover:border-border/80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-foreground text-sm">1. Concept</span>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                        {conceptStartups.length} Ventures
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Problem formulation, academic dataset curation, and sovereign model architecture design.
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">Maturity:</span>
                      <span className="font-semibold text-muted-foreground">0% of Portfolio</span>
                    </div>
                  </div>

                  {/* Stage 2: Prototype */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setOverviewStageFilter(overviewStageFilter === "Prototype" ? "All" : "Prototype")}
                    className={`rounded-2xl border p-4 text-xs transition-all cursor-pointer ${
                      overviewStageFilter === "Prototype"
                        ? "border-amber-500 bg-amber-500/5 ring-2 ring-amber-500/20"
                        : "border-border bg-muted/20 hover:border-amber-500/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">2. Prototype</span>
                      <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                        {prototypeStartups.length} Venture
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Working functional MVP, local model fine-tuning, and laboratory accuracy validation.
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">Key Example:</span>
                      <span className="font-semibold text-foreground">Adera Labs</span>
                    </div>
                  </div>

                  {/* Stage 3: Pilot */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setOverviewStageFilter(overviewStageFilter === "Pilot" ? "All" : "Pilot")}
                    className={`rounded-2xl border p-4 text-xs transition-all cursor-pointer ${
                      overviewStageFilter === "Pilot"
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-border bg-muted/20 hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-primary text-sm">3. Pilot</span>
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">
                        {pilotStartups.length} Ventures
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Active field trials with hospitals, smallholder farmer cooperatives, or regional water basins.
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">Key Examples:</span>
                      <span className="font-semibold text-foreground">Sela, Awash, Tenaw</span>
                    </div>
                  </div>

                  {/* Stage 4: Market */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setOverviewStageFilter(overviewStageFilter === "Market" ? "All" : "Market")}
                    className={`rounded-2xl border p-4 text-xs transition-all cursor-pointer ${
                      overviewStageFilter === "Market"
                        ? "border-emerald-500 bg-emerald-500/5 ring-2 ring-emerald-500/20"
                        : "border-border bg-muted/20 hover:border-emerald-500/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">4. Market</span>
                      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        {marketStartups.length} Ventures
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Active commercial contracts, recurring enterprise revenue, and municipal integrations.
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">Key Examples:</span>
                      <span className="font-semibold text-foreground">Kuraz, Enku, Sheba</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================================================== */}
              {/* EXECUTIVE SOVEREIGN AI VISUAL INTELLIGENCE COCKPIT */}
              {/* ================================================== */}
              <div className="space-y-6">
                {/* Visualizations Controller Header & View Selector */}
                <div className="rounded-3xl border border-border bg-card p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-xl bg-primary/10 grid place-items-center text-primary">
                        <BarChart3 className="size-4" />
                      </div>
                      <h3 className="font-display text-base font-bold text-foreground">
                        Sovereign AI Ecosystem Visual Intelligence Cockpit
                      </h3>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Live Analytics
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Multi-dimensional executive telemetry across capital velocity, talent creation, maturity distribution, and national capability pillars.
                    </p>
                  </div>

                  {/* Interactive View Filter Tabs */}
                  <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-muted/40 border border-border text-xs self-start md:self-auto flex-wrap">
                    <button
                      type="button"
                      onClick={() => setVisualizationTab("all")}
                      className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                        visualizationTab === "all"
                          ? "bg-card text-foreground shadow-2xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      All Intelligence
                    </button>
                    <button
                      type="button"
                      onClick={() => setVisualizationTab("capital")}
                      className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                        visualizationTab === "capital"
                          ? "bg-card text-foreground shadow-2xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Capital & Sectors
                    </button>
                    <button
                      type="button"
                      onClick={() => setVisualizationTab("stages")}
                      className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                        visualizationTab === "stages"
                          ? "bg-card text-foreground shadow-2xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Cohort Maturity
                    </button>
                    <button
                      type="button"
                      onClick={() => setVisualizationTab("radar")}
                      className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                        visualizationTab === "radar"
                          ? "bg-card text-foreground shadow-2xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Capability Radar
                    </button>
                  </div>
                </div>

                {/* Grid of Visualizations */}
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* VISUAL 1: Capital Pipeline & High-Skilled Jobs by Sector */}
                  {(visualizationTab === "all" || visualizationTab === "capital") && (
                    <div className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="size-2 rounded-full bg-primary" />
                              <h4 className="font-display text-base font-bold text-foreground">
                                Capital Pipeline & AI Jobs by Strategic Sector
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Dual comparison of venture investment asks (USD) and local researcher/engineer jobs created.
                            </p>
                          </div>
                        </div>

                        {/* Mini Stat Summary Strip */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 pb-1">
                          <div className="rounded-xl border border-border/60 bg-muted/20 p-2.5 text-center">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground">Capital Seek</span>
                            <p className="font-display font-bold text-sm text-primary tabular-nums">
                              ${(totalCapitalSoughtUsd / 1000000).toFixed(2)}M
                            </p>
                          </div>
                          <div className="rounded-xl border border-border/60 bg-muted/20 p-2.5 text-center">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground">AI Engineers</span>
                            <p className="font-display font-bold text-sm text-emerald-600 dark:text-emerald-400 tabular-nums">
                              {totalJobsCreated} Jobs
                            </p>
                          </div>
                          <div className="rounded-xl border border-border/60 bg-muted/20 p-2.5 text-center">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground">Top Domain</span>
                            <p className="font-display font-bold text-sm text-foreground truncate">
                              AgriTech ($1.2M)
                            </p>
                          </div>
                        </div>

                        <div className="h-[270px] w-full pt-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={sectorChartData}
                              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                            >
                              <defs>
                                <linearGradient id="capitalGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.9} />
                                  <stop offset="100%" stopColor="#0284C7" stopOpacity={0.4} />
                                </linearGradient>
                                <linearGradient id="jobsGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
                                  <stop offset="100%" stopColor="#059669" stopOpacity={0.4} />
                                </linearGradient>
                              </defs>
                              <XAxis
                                dataKey="sectorName"
                                stroke="currentColor"
                                className="text-[11px] text-muted-foreground"
                                tickLine={false}
                                axisLine={false}
                              />
                              <YAxis
                                stroke="currentColor"
                                className="text-[11px] text-muted-foreground"
                                tickLine={false}
                                axisLine={false}
                                allowDecimals={false}
                              />
                              <Tooltip
                                formatter={(value: any, name: any) => [
                                  name === "Capital ($K)" ? `$${value}k USD` : `${value} Engineers`,
                                  name,
                                ]}
                                contentStyle={{
                                  backgroundColor: "var(--card)",
                                  borderColor: "var(--border)",
                                  borderRadius: "1rem",
                                  fontSize: "12px",
                                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                                }}
                              />
                              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                              <Bar
                                dataKey="capitalK"
                                name="Capital ($K)"
                                fill="url(#capitalGradient)"
                                radius={[6, 6, 0, 0]}
                              />
                              <Bar
                                dataKey="jobs"
                                name="AI Engineers (Jobs)"
                                fill="url(#jobsGradient)"
                                radius={[6, 6, 0, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                        <span>Highest Talent Density: <strong className="text-foreground">Health & AgriTech</strong></span>
                        <span className="font-semibold text-primary">Avg $368K / Venture</span>
                      </div>
                    </div>
                  )}

                  {/* VISUAL 2: Capital Allocation Donut with Center Metric */}
                  {(visualizationTab === "all" || visualizationTab === "capital") && (
                    <div className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="size-2 rounded-full bg-emerald-500" />
                              <h4 className="font-display text-base font-bold text-foreground">
                                Strategic Investment Pipeline Distribution
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Proportional allocation of total funding sought across prioritized national AI domains.
                            </p>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-[180px_1fr] items-center gap-4 pt-1">
                          {/* Donut Chart with Center Metric */}
                          <div className="h-[230px] w-full relative grid place-items-center">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={sectorDonutData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={62}
                                  outerRadius={92}
                                  paddingAngle={4}
                                  cornerRadius={6}
                                  dataKey="value"
                                  onMouseEnter={(_, index) => setActiveDonutSector(sectorDonutData[index].name)}
                                  onMouseLeave={() => setActiveDonutSector(null)}
                                >
                                  {sectorDonutData.map((entry) => (
                                    <Cell
                                      key={`cell-${entry.name}`}
                                      fill={entry.color}
                                      stroke="var(--card)"
                                      strokeWidth={2}
                                      className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                                    />
                                  ))}
                                </Pie>
                                <Tooltip
                                  formatter={(value: any) => [`$${value}k USD (${Math.round((Number(value) / (totalCapitalSoughtUsd / 1000)) * 100)}%)`, "Funding Ask"]}
                                  contentStyle={{
                                    backgroundColor: "var(--card)",
                                    borderColor: "var(--border)",
                                    borderRadius: "0.75rem",
                                    fontSize: "12px",
                                  }}
                                />
                              </PieChart>
                            </ResponsiveContainer>

                            {/* Centered Stat Badge */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                                Pipeline
                              </span>
                              <span className="font-display text-lg font-bold text-foreground tabular-nums">
                                ${(totalCapitalSoughtUsd / 1000000).toFixed(2)}M
                              </span>
                              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                {totalVenturesCount} Startups
                              </span>
                            </div>
                          </div>

                          {/* Sector Breakdown Pills / Legend */}
                          <div className="space-y-2">
                            {sectorDonutData.map((sec) => {
                              const pct = Math.round((sec.value / (totalCapitalSoughtUsd / 1000)) * 100);
                              const isHovered = activeDonutSector === sec.name;
                              return (
                                <div
                                  key={sec.name}
                                  onMouseEnter={() => setActiveDonutSector(sec.name)}
                                  onMouseLeave={() => setActiveDonutSector(null)}
                                  className={`rounded-xl p-2 text-xs flex items-center justify-between border transition-all cursor-pointer ${
                                    isHovered
                                      ? "border-primary bg-primary/5 shadow-2xs"
                                      : "border-border/60 bg-muted/20 hover:border-border"
                                  }`}
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span
                                      className="size-2.5 rounded-full shrink-0"
                                      style={{ backgroundColor: sec.color }}
                                    />
                                    <span className="font-semibold text-foreground truncate">
                                      {sec.name}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">
                                      ({sec.count})
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className="font-mono text-xs font-bold text-foreground">
                                      ${sec.value}k
                                    </span>
                                    <span className="text-[10px] font-bold text-muted-foreground w-8 text-right">
                                      {pct}%
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border text-xs text-muted-foreground flex items-center justify-between">
                        <span>Dominant Sector: <strong className="text-foreground">AgriTech (41%)</strong></span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Seed Ready</span>
                      </div>
                    </div>
                  )}

                  {/* VISUAL 3: Incubation Cohort Stage Progression Velocity */}
                  {(visualizationTab === "all" || visualizationTab === "stages") && (
                    <div className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="size-2 rounded-full bg-amber-500" />
                              <h4 className="font-display text-base font-bold text-foreground">
                                Incubation Cohort Stage Progression Velocity
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Comparing commercial maturity graduation between Cohort 2 (graduated) and Cohort 3 (active).
                            </p>
                          </div>
                        </div>

                        {/* Cohort Velocity Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-foreground">Cohort 2 (Graduated)</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600">
                                67% Market Rate
                              </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground">
                              2 of 3 ventures reached sustainable recurring revenue and multi-zone deployments.
                            </p>
                          </div>

                          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-3 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-foreground">Cohort 3 (Active)</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                                80% Field Pilots
                              </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground">
                              4 of 5 ventures deployed live across 40+ clinical posts and credit unions in 2026.
                            </p>
                          </div>
                        </div>

                        <div className="h-[250px] w-full pt-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={cohortStageChartData}
                              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            >
                              <XAxis
                                dataKey="cohort"
                                stroke="currentColor"
                                className="text-[11px] text-muted-foreground"
                                tickLine={false}
                                axisLine={false}
                              />
                              <YAxis
                                stroke="currentColor"
                                className="text-[11px] text-muted-foreground"
                                tickLine={false}
                                axisLine={false}
                                allowDecimals={false}
                                domain={[0, 4]}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "var(--card)",
                                  borderColor: "var(--border)",
                                  borderRadius: "0.75rem",
                                  fontSize: "12px",
                                }}
                              />
                              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                              <Bar dataKey="Market" name="Market (Commercial)" fill="#10B981" radius={[6, 6, 0, 0]} />
                              <Bar dataKey="Pilot" name="Pilot (Field Trials)" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
                              <Bar dataKey="Prototype" name="Prototype (MVP)" fill="#F59E0B" radius={[6, 6, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border text-xs text-muted-foreground flex items-center justify-between">
                        <span>Cohort 3 Velocity: <strong className="text-foreground">+40% faster pilot entry</strong></span>
                        <span className="text-primary font-semibold">Demo Day: Q4 2026</span>
                      </div>
                    </div>
                  )}

                  {/* VISUAL 4: National AI Sovereign Ecosystem Capability Radar */}
                  {(visualizationTab === "all" || visualizationTab === "radar") && (
                    <div className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="size-2 rounded-full bg-purple-500" />
                              <h4 className="font-display text-base font-bold text-foreground">
                                Sovereign AI Ecosystem Readiness Radar
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Holistic capability maturity benchmarking across 6 sovereign national intelligence priorities.
                            </p>
                          </div>
                        </div>

                        <div className="h-[270px] w-full pt-1">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={sovereignRadarData}>
                              <PolarGrid stroke="var(--border)" strokeDasharray="3 3" />
                              <PolarAngleAxis
                                dataKey="metric"
                                tick={{ fill: "currentColor", fontSize: 10, fontWeight: 600 }}
                              />
                              <PolarRadiusAxis
                                angle={30}
                                domain={[0, 100]}
                                stroke="var(--border)"
                                tick={{ fill: "currentColor", fontSize: 9 }}
                              />
                              <Radar
                                name="Cohort 3 (Active)"
                                dataKey="Cohort3"
                                stroke="#0EA5E9"
                                fill="#0EA5E9"
                                fillOpacity={0.35}
                              />
                              <Radar
                                name="Cohort 2 (Graduated)"
                                dataKey="Cohort2"
                                stroke="#10B981"
                                fill="#10B981"
                                fillOpacity={0.25}
                              />
                              <Tooltip
                                formatter={(value: any) => [`${value}% Maturity`, "Score"]}
                                contentStyle={{
                                  backgroundColor: "var(--card)",
                                  borderColor: "var(--border)",
                                  borderRadius: "0.75rem",
                                  fontSize: "12px",
                                }}
                              />
                              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border text-xs text-muted-foreground flex items-center justify-between">
                        <span>Top Sovereign Metric: <strong className="text-foreground">Local Language Data (95%)</strong></span>
                        <span className="text-purple-600 dark:text-purple-400 font-semibold">Institutional Trust 96%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Executive Ecosystem Milestones Feed */}
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground">
                      Recent Ecosystem Program Milestones
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Validated achievements, clinical trial advances, and commercial milestones reported by incubated ventures.
                    </p>
                  </div>
                  <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {milestoneFeed.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-border bg-muted/20 p-4 text-xs space-y-2 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                          {item.tag}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">{item.time}</span>
                      </div>
                      <h4 className="font-bold text-foreground text-xs leading-snug">{item.title}</h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                      <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[10px] text-muted-foreground">
                        <span>Cohort: <strong className="text-foreground">{item.cohort}</strong></span>
                        <span>Stage: <strong className="text-foreground">{item.stage}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================== */}
          {/* TAB 2: ECOSYSTEM EVENTS & HUBS */}
          {/* ================================================== */}
          {activeTab === "events" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Ecosystem Events & Hub Programs ({eventsList.length})
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Post, curate, and broadcast hackathons, investor demo days, research symposiums, and masterclasses.
                  </p>
                </div>

                <Button
                  onClick={() => setIsEventModalOpen(true)}
                  className="rounded-xl bg-primary text-primary-foreground font-semibold text-xs gap-1.5 h-10 shadow-xs"
                >
                  <Plus className="size-4" /> Post New Event
                </Button>
              </div>

              {/* Event Category Filter */}
              <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
                {["All", "Hackathon", "Workshop", "Demo Day", "Symposium", "Masterclass"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setEventCategoryFilter(cat)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                      eventCategoryFilter === cat
                        ? "bg-primary text-primary-foreground shadow-2xs"
                        : "bg-muted/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Events Grid */}
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="rounded-3xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                          {evt.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              evt.status === "PUBLISHED"
                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                            }`}
                          >
                            {evt.status}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-display text-base font-bold text-foreground leading-snug">
                        {evt.title}
                      </h4>

                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {evt.description}
                      </p>

                      <div className="space-y-1.5 text-xs text-muted-foreground pt-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-3.5 text-primary" />
                          <span>{evt.date} · {evt.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="size-3.5 text-primary" />
                          <span className="truncate">{evt.venue}</span>
                        </div>
                      </div>

                      {/* RSVP Capacity Progress */}
                      <div className="space-y-1 pt-1">
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                          <span>Registrations: {evt.rsvpCount} / {evt.capacity}</span>
                          <span className="font-semibold text-foreground">
                            {Math.round((evt.rsvpCount / evt.capacity) * 100)}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${Math.min(100, (evt.rsvpCount / evt.capacity) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {evt.tags.slice(0, 2).map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground">
                            #{t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleEventStatus(evt.id)}
                          className="h-8 text-[11px] rounded-xl"
                        >
                          {evt.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteEvent(evt.id)}
                          className="h-8 size-8 p-0 rounded-xl text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================== */}
          {/* TAB 3: COHORTS & INTAKE */}
          {/* ================================================== */}
          {activeTab === "cohorts" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Cohort Incubation Cycles & Applicant Pipeline
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Launch national incubation cohorts, set compute and grant allocations, and review applicants.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-xl border border-border bg-card p-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setCohortSubView("programs")}
                      className={`rounded-lg px-3 py-1 font-semibold transition-all ${
                        cohortSubView === "programs"
                          ? "bg-primary text-primary-foreground shadow-2xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Cohorts ({cohortsList.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setCohortSubView("applicants")}
                      className={`rounded-lg px-3 py-1 font-semibold transition-all ${
                        cohortSubView === "applicants"
                          ? "bg-primary text-primary-foreground shadow-2xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Applicants ({cohortApplicants.length})
                    </button>
                  </div>

                  <Button
                    onClick={() => setIsCohortModalOpen(true)}
                    className="rounded-xl bg-primary text-primary-foreground font-semibold text-xs gap-1.5 h-9 shadow-xs"
                  >
                    <Plus className="size-3.5" /> Launch Cohort
                  </Button>
                </div>
              </div>

              {/* Subview 1: Cohort Programs */}
              {cohortSubView === "programs" && (
                <div className="grid gap-6 sm:grid-cols-2">
                  {cohortsList.map((cohort) => (
                    <div
                      key={cohort.id}
                      className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-5 hover:border-primary/40 transition-colors"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-primary">
                            {cohort.edition}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              cohort.status === "ACTIVE_INCUBATION"
                                ? "bg-primary/15 text-primary border border-primary/20"
                                : cohort.status === "ACCEPTING_APPLICATIONS"
                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {cohort.status.replace("_", " ")}
                          </span>
                        </div>

                        <h4 className="font-display text-lg font-bold text-foreground">
                          {cohort.name}
                        </h4>

                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {cohort.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                          <div className="rounded-xl border border-border bg-muted/20 p-2.5">
                            <p className="text-[10px] text-muted-foreground">Grant & Seed Pool</p>
                            <p className="font-bold text-foreground mt-0.5 text-xs truncate">{cohort.grantPool}</p>
                          </div>
                          <div className="rounded-xl border border-border bg-muted/20 p-2.5">
                            <p className="text-[10px] text-muted-foreground">Compute Allocation</p>
                            <p className="font-bold text-emerald-600 mt-0.5 text-xs truncate">{cohort.computeHours}</p>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs text-muted-foreground pt-1">
                          <p>
                            <span className="font-semibold text-foreground">Application Deadline:</span>{" "}
                            {cohort.applicationDeadline}
                          </p>
                          <p>
                            <span className="font-semibold text-foreground">Incubation Cycle:</span>{" "}
                            {cohort.programStartDate} → {cohort.programEndDate}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {cohort.sectors.map((s) => (
                            <span
                              key={s}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          Ventures: <strong>{cohort.acceptedCount}</strong> accepted /{" "}
                          <strong>{cohort.targetVentures}</strong> target
                        </span>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setCohortSubView("applicants")}
                          className="rounded-xl text-xs h-8"
                        >
                          Review Applicants ({cohortApplicants.length})
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Subview 2: Applicants Review Table */}
              {cohortSubView === "applicants" && (
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xs">
                  <div className="p-5 border-b border-border bg-muted/20 flex items-center justify-between">
                    <div>
                      <h4 className="font-display text-sm font-bold text-foreground">
                        Cohort Applicant Submissions ({cohortApplicants.length})
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Reviewing candidates evaluated on sovereign compute feasibility and local development impact.
                      </p>
                    </div>

                    <Button asChild variant="outline" size="sm" className="rounded-xl text-xs gap-1.5">
                      <Link to="/cohort-3">
                        Public Portal <ArrowUpRight className="size-3.5" />
                      </Link>
                    </Button>
                  </div>

                  <div className="w-full max-w-full overflow-x-auto">
                    <table className="w-full min-w-[650px] text-left text-xs">
                    <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground uppercase text-[11px]">
                      <tr>
                        <th className="p-4 sm:p-5">Applicant & Founder</th>
                        <th className="p-4 sm:p-5">Lab / University</th>
                        <th className="p-4 sm:p-5">Score</th>
                        <th className="p-4 sm:p-5">Pipeline Status</th>
                        <th className="p-4 sm:p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {cohortApplicants.map((app) => (
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
                                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                  : app.status === "SHORTLISTED"
                                  ? "bg-primary/15 text-primary"
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
            </div>
          )}

          {/* ================================================== */}
          {/* TAB 4: TENANT STARTUPS & PROVISIONING */}
          {/* ================================================== */}
          {activeTab === "startups" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Incubated Tenant Directory ({startupsList.length})
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Structured startup intake, compute allocation parameters, and diligence profile management.
                  </p>
                </div>

                <Button
                  onClick={() => setIsProvisionModalOpen(true)}
                  className="rounded-xl bg-primary text-primary-foreground font-semibold text-xs gap-1.5 h-10 shadow-xs"
                >
                  <Plus className="size-4" /> Provision New Tenant
                </Button>
              </div>

              {/* Search & Sector Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search tenant by venture name or keywords..."
                    value={startupSearch}
                    onChange={(e) => setStartupSearch(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-card pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                  {["All", "Health AI", "AgriTech", "Language AI", "Logistics AI"].map((sector) => (
                    <button
                      key={sector}
                      type="button"
                      onClick={() => setSelectedSector(sector)}
                      className={`rounded-xl px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                        selectedSector === sector
                          ? "bg-primary text-primary-foreground shadow-2xs"
                          : "bg-muted/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {sector}
                    </button>
                  ))}
                </div>
              </div>

              {/* Startups Table (No Impersonate button) */}
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xs">
                <div className="w-full max-w-full overflow-x-auto">
                  <table className="w-full min-w-[650px] text-left text-xs">
                  <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground uppercase text-[11px]">
                    <tr>
                      <th className="p-4 sm:p-5">Startup & Focus</th>
                      <th className="p-4 sm:p-5">Cohort / Stage</th>
                      <th className="p-4 sm:p-5">Fundraising Ask</th>
                      <th className="p-4 sm:p-5">Products</th>
                      <th className="p-4 sm:p-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {filteredStartups.map((startup) => (
                      <tr key={startup.slug} className="hover:bg-muted/20 transition-colors">
                        <td className="p-4 sm:p-5">
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-muted/60 border border-border p-1.5 flex items-center justify-center shrink-0">
                              <span className="font-display font-bold text-xs text-primary">
                                {startup.name.slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-bold text-sm text-foreground">{startup.name}</p>
                              <p className="text-[11px] text-muted-foreground line-clamp-1">{startup.tagline}</p>
                              <span className="inline-block mt-0.5 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">
                                {startup.sector}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 sm:p-5">
                          <p className="font-semibold text-foreground">{startup.location}</p>
                          <p className="text-[11px] text-muted-foreground">Est. {startup.founded} · {startup.team_size} team</p>
                        </td>
                        <td className="p-4 sm:p-5">
                          <span className="font-display font-bold text-sm text-foreground">
                            ${(startup.investment_ask.amount_usd / 1000).toFixed(0)}k ({startup.investment_ask.round})
                          </span>
                        </td>
                        <td className="p-4 sm:p-5">
                          <span className="text-muted-foreground">{startup.products.length} registered</span>
                        </td>
                        <td className="p-4 sm:p-5 text-right">
                          <Button asChild size="sm" variant="outline" className="rounded-xl text-[11px] h-8">
                            <Link to="/$startupSlug" params={{ startupSlug: startup.slug }}>
                              Public Profile <Eye className="ml-1 size-3" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
          )}

          {/* ================================================== */}
          {/* TAB 5: INVESTOR VETTING & DUE DILIGENCE */}
          {/* ================================================== */}
          {activeTab === "investors" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Investor Vetting & Due Diligence Pipeline
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Verify institutional and angel partner credentials before unlocking confidential startup pitch materials.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xs">
                <div className="w-full max-w-full overflow-x-auto">
                  <table className="w-full min-w-[650px] text-left text-xs">
                  <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground uppercase text-[11px]">
                    <tr>
                      <th className="p-4 sm:p-5">Organization & Lead</th>
                      <th className="p-4 sm:p-5">Type / AUM</th>
                      <th className="p-4 sm:p-5">Ticket Size & Focus</th>
                      <th className="p-4 sm:p-5">Vetting Status</th>
                      <th className="p-4 sm:p-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {investorList.map((inv) => (
                      <tr key={inv.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-4 sm:p-5">
                          <p className="font-bold text-sm text-foreground">{inv.org}</p>
                          <p className="text-[11px] text-muted-foreground">{inv.name} (Partner)</p>
                        </td>
                        <td className="p-4 sm:p-5">
                          <p className="font-semibold text-foreground">{inv.type}</p>
                          <p className="text-[11px] text-muted-foreground">{inv.aum}</p>
                        </td>
                        <td className="p-4 sm:p-5">
                          <p className="font-bold text-foreground">{inv.ticket}</p>
                          <p className="text-[11px] text-muted-foreground">{inv.sectors.join(", ")}</p>
                        </td>
                        <td className="p-4 sm:p-5">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              inv.status === "VETTED"
                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                : inv.status === "PENDING"
                                ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                                : "bg-destructive/15 text-destructive"
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="p-4 sm:p-5 text-right space-x-1.5">
                          {inv.status !== "VETTED" && (
                            <Button
                              size="sm"
                              onClick={() => handleVetInvestor(inv.id, "VETTED")}
                              className="rounded-xl text-[10px] h-7 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                            >
                              Approve
                            </Button>
                          )}
                          {inv.status !== "REJECTED" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleVetInvestor(inv.id, "REJECTED")}
                              className="rounded-xl text-[10px] h-7 px-2.5 text-destructive hover:bg-destructive/10"
                            >
                              Reject
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
          )}



          {/* ================================================== */}
          {/* TAB 7: AUDIT TRAIL & COMPLIANCE */}
          {/* ================================================== */}
          {activeTab === "audit" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Security Audit Trail & Governance Log ({auditLogs.length})
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Immutable event log documenting tenant provisioning, diligence authorizations, and compute benchmark dispatches.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xs">
                <div className="w-full max-w-full overflow-x-auto">
                  <table className="w-full min-w-[650px] text-left text-xs">
                  <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground uppercase text-[11px]">
                    <tr>
                      <th className="p-4 sm:p-5">Event Type</th>
                      <th className="p-4 sm:p-5">Actor</th>
                      <th className="p-4 sm:p-5">Action Description</th>
                      <th className="p-4 sm:p-5 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-4 sm:p-5">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              log.type === "SECURITY"
                                ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                                : log.type === "COMPUTE"
                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                : log.type === "COHORT"
                                ? "bg-primary/15 text-primary"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {log.type}
                          </span>
                        </td>
                        <td className="p-4 sm:p-5 font-semibold text-foreground">{log.actor}</td>
                        <td className="p-4 sm:p-5 text-muted-foreground">{log.action}</td>
                        <td className="p-4 sm:p-5 text-right font-mono text-[11px] text-muted-foreground">
                          {log.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
          )}
        </main>
      </div>

      {/* ================================================== */}
      {/* MODAL 1: POST NEW EVENT */}
      {/* ================================================== */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
            onClick={() => setIsEventModalOpen(false)}
          />
          <div className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-primary/10 grid place-items-center">
                  <Calendar className="size-4.5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">Post Ecosystem Event</h3>
                  <p className="text-xs text-muted-foreground">Publish hackathons, masterclasses, and demo days</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEventModalOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handlePostEvent} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-foreground block mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. National Sovereign AI Hackathon 2026"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-foreground block mb-1">Category</label>
                  <select
                    value={newEventCategory}
                    onChange={(e) => setNewEventCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-border bg-muted/20 px-3 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Demo Day">Demo Day</option>
                    <option value="Symposium">Symposium</option>
                    <option value="Masterclass">Masterclass</option>
                    <option value="Office Hours">Office Hours</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">Publish Status</label>
                  <select
                    value={newEventStatus}
                    onChange={(e) => setNewEventStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-border bg-muted/20 px-3 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="PUBLISHED">Published (Live)</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-foreground block mb-1">Date</label>
                  <input
                    type="date"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">Time</label>
                  <input
                    type="text"
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Venue / Location</label>
                <input
                  type="text"
                  value={newEventVenue}
                  onChange={(e) => setNewEventVenue(e.target.value)}
                  className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-foreground block mb-1">Capacity (Seats)</label>
                  <input
                    type="number"
                    value={newEventCapacity}
                    onChange={(e) => setNewEventCapacity(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">Format</label>
                  <select
                    value={newEventIsVirtual ? "virtual" : "physical"}
                    onChange={(e) => setNewEventIsVirtual(e.target.value === "virtual")}
                    className="w-full rounded-xl border border-border bg-muted/20 px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="physical">Physical / In-Person</option>
                    <option value="virtual">Virtual / Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Target Audience</label>
                <input
                  type="text"
                  value={newEventAudience}
                  onChange={(e) => setNewEventAudience(e.target.value)}
                  className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Registration URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newEventRegistrationUrl}
                  onChange={(e) => setNewEventRegistrationUrl(e.target.value)}
                  className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newEventDescription}
                  onChange={(e) => setNewEventDescription(e.target.value)}
                  placeholder="Provide an overview of the event, keynote speakers, or agenda..."
                  className="w-full rounded-xl border border-border bg-muted/20 p-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEventModalOpen(false)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl bg-primary text-primary-foreground font-semibold text-xs gap-1.5"
                >
                  <Plus className="size-4" /> Publish Event
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* MODAL 2: LAUNCH NEW COHORT */}
      {/* ================================================== */}
      {isCohortModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
            onClick={() => setIsCohortModalOpen(false)}
          />
          <div className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-primary/10 grid place-items-center">
                  <GraduationCap className="size-4.5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">Launch New Cohort Cycle</h3>
                  <p className="text-xs text-muted-foreground">Post call for sovereign AI incubator applications</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCohortModalOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handlePostCohort} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-foreground block mb-1">Cohort Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI UNIPOD Cohort 5: Sovereign Edge & Foundation Models"
                  value={newCohortName}
                  onChange={(e) => setNewCohortName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-foreground block mb-1">Edition Tag</label>
                  <input
                    type="text"
                    value={newCohortEdition}
                    onChange={(e) => setNewCohortEdition(e.target.value)}
                    placeholder="e.g. Cohort 5"
                    className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">Status</label>
                  <select
                    value={newCohortStatus}
                    onChange={(e) => setNewCohortStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-border bg-muted/20 px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="ACCEPTING_APPLICATIONS">Accepting Applications</option>
                    <option value="UNDER_REVIEW">Under Review</option>
                    <option value="ACTIVE_INCUBATION">Active Incubation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-foreground block mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={newCohortDeadline}
                    onChange={(e) => setNewCohortDeadline(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">Target Venture Intake</label>
                  <input
                    type="number"
                    value={newCohortTargetVentures}
                    onChange={(e) => setNewCohortTargetVentures(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-foreground block mb-1">Grant & Seed Pool</label>
                  <input
                    type="text"
                    value={newCohortGrantPool}
                    onChange={(e) => setNewCohortGrantPool(e.target.value)}
                    placeholder="e.g. $150,000 Equity-Free Seed"
                    className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">Compute Allocation</label>
                  <input
                    type="text"
                    value={newCohortComputeHours}
                    onChange={(e) => setNewCohortComputeHours(e.target.value)}
                    placeholder="e.g. 60,000 GPU Node Hours"
                    className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Focus Sectors (comma-separated)</label>
                <input
                  type="text"
                  value={newCohortSectors}
                  onChange={(e) => setNewCohortSectors(e.target.value)}
                  className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Program Description</label>
                <textarea
                  rows={3}
                  value={newCohortDescription}
                  onChange={(e) => setNewCohortDescription(e.target.value)}
                  placeholder="Outline the cohort mandate, lab resources, and commercial milestone expectations..."
                  className="w-full rounded-xl border border-border bg-muted/20 p-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCohortModalOpen(false)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl bg-primary text-primary-foreground font-semibold text-xs gap-1.5"
                >
                  <Plus className="size-4" /> Launch Cohort
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* MODAL 3: PROVISION NEW STARTUP TENANT */}
      {/* ================================================== */}
      {isProvisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
            onClick={() => setIsProvisionModalOpen(false)}
          />
          <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl z-10 space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-primary/10 grid place-items-center">
                  <Building2 className="size-4.5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">Provision Startup Tenant</h3>
                  <p className="text-xs text-muted-foreground">Add and allocate compute for a new incubated venture</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsProvisionModalOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleProvisionStartup} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-foreground block mb-1">Startup Venture Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AfriBio Vision AI"
                  value={newStartupName}
                  onChange={(e) => setNewStartupName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-foreground block mb-1">Sector Focus</label>
                  <select
                    value={newStartupSector}
                    onChange={(e) => setNewStartupSector(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/20 px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="Health AI">Health AI</option>
                    <option value="AgriTech">AgriTech</option>
                    <option value="Language AI">Language AI</option>
                    <option value="Logistics AI">Logistics AI</option>
                    <option value="Fintech AI">Fintech AI</option>
                    <option value="Vision AI">Vision AI</option>
                    <option value="Climate AI">Climate AI</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">Fundraising Ask (USD)</label>
                  <input
                    type="number"
                    value={newStartupAsk}
                    onChange={(e) => setNewStartupAsk(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                  </input>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-foreground block mb-1">Assigned Cohort</label>
                  <select
                    value={newStartupCohort}
                    onChange={(e) => setNewStartupCohort(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/20 px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
                  >
                    <option value="Cohort 3">Cohort 3 (Active)</option>
                    <option value="Cohort 4">Cohort 4 (Upcoming)</option>
                    <option value="Cohort 2">Cohort 2 (Graduated)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">Current Maturity Stage</label>
                  <select
                    value={newStartupStage}
                    onChange={(e) => setNewStartupStage(e.target.value as any)}
                    className="w-full rounded-xl border border-border bg-muted/20 px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
                  >
                    <option value="Prototype">Prototype (Functional MVP)</option>
                    <option value="Pilot">Pilot (Field Validation)</option>
                    <option value="Market">Market (Commercial Revenue)</option>
                    <option value="Concept">Concept (Lab Research)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">One-Line Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Edge ML diagnostics for rural healthcare clinics"
                  value={newStartupTagline}
                  onChange={(e) => setNewStartupTagline(e.target.value)}
                  className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-foreground block mb-1">Lead Founder Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Startup Founder"
                    value={newStartupFounderName}
                    onChange={(e) => setNewStartupFounderName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">Founder Email</label>
                  <input
                    type="email"
                    placeholder="founder@founder.com"
                    value={newStartupFounderEmail}
                    onChange={(e) => setNewStartupFounderEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/20 px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsProvisionModalOpen(false)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl bg-primary text-primary-foreground font-semibold text-xs gap-1.5"
                >
                  <Plus className="size-4" /> Provision Tenant
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
