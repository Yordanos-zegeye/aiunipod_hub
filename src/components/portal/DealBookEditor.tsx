import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Brain,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  Database,
  ExternalLink,
  FileCheck,
  FileText,
  Globe,
  Heart,
  Layers,
  Link as LinkIcon,
  Lock,
  Mail,
  MapPin,
  Phone,
  PieChart,
  Plus,
  Rocket,
  Save,
  Scale,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Founder,
  Product,
  Startup,
  StartupDiligenceDoc,
  StartupFinancialYear,
  StartupRisk,
  UseOfFundsItem,
} from "@/data/startups";
import { TagInput } from "./TagInput";

interface DealBookEditorProps {
  startup: Startup;
  onChange: (updated: Startup) => void;
  onSave: () => void;
  hasUnsavedChanges?: boolean;
}

type SubSection =
  | "identity"
  | "problem_ai"
  | "products_market"
  | "traction_benchmarks"
  | "team_impact"
  | "financials_funding"
  | "vault_risks";

const SUB_SECTIONS: { id: SubSection; label: string; icon: any; count?: number }[] = [
  { id: "identity", label: "1. Identity & Contacts", icon: Building2 },
  { id: "problem_ai", label: "2. Problem & AI Tech", icon: Brain },
  { id: "products_market", label: "3. Products & TAM", icon: Layers },
  { id: "traction_benchmarks", label: "4. Traction & Benchmarks", icon: Activity },
  { id: "team_impact", label: "5. Team & SDGs", icon: Users },
  { id: "financials_funding", label: "6. Financials & Ask", icon: Wallet },
  { id: "vault_risks", label: "7. Vault & Risks", icon: ShieldCheck },
];

const ALL_SDGS = [
  { number: 1, label: "No Poverty", color: "bg-[#E5243B]" },
  { number: 2, label: "Zero Hunger", color: "bg-[#DDA63A]" },
  { number: 3, label: "Good Health & Well-being", color: "bg-[#4C9F38]" },
  { number: 4, label: "Quality Education", color: "bg-[#C5192D]" },
  { number: 5, label: "Gender Equality", color: "bg-[#FF3A21]" },
  { number: 6, label: "Clean Water & Sanitation", color: "bg-[#26BDE2]" },
  { number: 7, label: "Affordable & Clean Energy", color: "bg-[#FCC30B]" },
  { number: 8, label: "Decent Work & Economic Growth", color: "bg-[#A21942]" },
  { number: 9, label: "Industry, Innovation & Infrastructure", color: "bg-[#FD6925]" },
  { number: 10, label: "Reduced Inequalities", color: "bg-[#DD1367]" },
  { number: 11, label: "Sustainable Cities & Communities", color: "bg-[#FD9D24]" },
  { number: 12, label: "Responsible Consumption", color: "bg-[#BF8B2E]" },
  { number: 13, label: "Climate Action", color: "bg-[#3F7E44]" },
  { number: 16, label: "Peace & Strong Institutions", color: "bg-[#00689D]" },
];

export function DealBookEditor({ startup, onChange, onSave, hasUnsavedChanges }: DealBookEditorProps) {
  const [activeSubSection, setActiveSubSection] = useState<SubSection>("identity");

  // Dialog modals
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProductIdx, setEditingProductIdx] = useState<number | null>(null);
  const [productForm, setProductForm] = useState<Product>({
    name: "",
    summary: "",
    stage: "Pilot",
    target_customer: "",
    ai_functionality: "",
    differentiation: "",
  });

  const [founderModalOpen, setFounderModalOpen] = useState(false);
  const [editingFounderIdx, setEditingFounderIdx] = useState<number | null>(null);
  const [founderForm, setFounderForm] = useState<Founder>({
    name: "",
    role: "",
    background: "",
  });

  const [riskModalOpen, setRiskModalOpen] = useState(false);
  const [editingRiskIdx, setEditingRiskIdx] = useState<number | null>(null);
  const [riskForm, setRiskForm] = useState<StartupRisk>({
    risk: "",
    severity: "Medium",
    mitigation: "",
  });

  const [docModalOpen, setDocModalOpen] = useState(false);
  const [editingDocIdx, setEditingDocIdx] = useState<number | null>(null);
  const [docForm, setDocForm] = useState<StartupDiligenceDoc>({
    title: "",
    category: "Technical",
    file_type: "PDF",
    file_size: "2.4 MB",
    status: "Verified",
  });

  const [fundItemModalOpen, setFundItemModalOpen] = useState(false);
  const [editingFundItemIdx, setEditingFundItemIdx] = useState<number | null>(null);
  const [fundItemForm, setFundItemForm] = useState<UseOfFundsItem>({
    category: "Core AI Engineering & Living Lab",
    percentage: 30,
    amount_usd: 150000,
    description: "",
  });

  // Helper updaters
  const updateStartupField = <K extends keyof Startup>(field: K, value: Startup[K]) => {
    onChange({
      ...startup,
      [field]: value,
    });
  };

  const updateNested = (section: keyof Startup, field: string, value: any) => {
    const currSection = (startup[section] || {}) as any;
    onChange({
      ...startup,
      [section]: {
        ...currSection,
        [field]: value,
      },
    });
  };

  // Products Handlers
  const handleOpenProductModal = (idx?: number) => {
    if (typeof idx === "number") {
      setEditingProductIdx(idx);
      setProductForm({ ...startup.products[idx]! });
    } else {
      setEditingProductIdx(null);
      setProductForm({
        name: "",
        summary: "",
        stage: "Pilot",
        target_customer: "",
        ai_functionality: "",
        differentiation: "",
      });
    }
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name) {
      toast.error("Product name is required");
      return;
    }
    let updated = [...startup.products];
    if (editingProductIdx !== null) {
      updated[editingProductIdx] = productForm;
      toast.success(`Updated "${productForm.name}"`);
    } else {
      updated.push(productForm);
      toast.success(`Added product "${productForm.name}"`);
    }
    updateStartupField("products", updated);
    setProductModalOpen(false);
  };

  const handleDeleteProduct = (idx: number) => {
    const updated = startup.products.filter((_, i) => i !== idx);
    updateStartupField("products", updated);
    toast.info("Product removed");
  };

  // Founders Handlers
  const handleOpenFounderModal = (idx?: number) => {
    const list = startup.founders || [];
    if (typeof idx === "number") {
      setEditingFounderIdx(idx);
      setFounderForm({ ...list[idx]! });
    } else {
      setEditingFounderIdx(null);
      setFounderForm({ name: "", role: "", background: "" });
    }
    setFounderModalOpen(true);
  };

  const handleSaveFounder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!founderForm.name) {
      toast.error("Founder name is required");
      return;
    }
    let list = [...(startup.founders || [])];
    if (editingFounderIdx !== null) {
      list[editingFounderIdx] = founderForm;
      toast.success(`Updated leader "${founderForm.name}"`);
    } else {
      list.push(founderForm);
      toast.success(`Added founder "${founderForm.name}"`);
    }
    updateStartupField("founders", list);
    setFounderModalOpen(false);
  };

  const handleDeleteFounder = (idx: number) => {
    const list = (startup.founders || []).filter((_, i) => i !== idx);
    updateStartupField("founders", list);
    toast.info("Founder removed");
  };

  // Risks Handlers
  const handleOpenRiskModal = (idx?: number) => {
    const list = startup.risks || [];
    if (typeof idx === "number") {
      setEditingRiskIdx(idx);
      setRiskForm({ ...list[idx]! });
    } else {
      setEditingRiskIdx(null);
      setRiskForm({ risk: "", severity: "Medium", mitigation: "" });
    }
    setRiskModalOpen(true);
  };

  const handleSaveRisk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!riskForm.risk) {
      toast.error("Risk description is required");
      return;
    }
    let list = [...(startup.risks || [])];
    if (editingRiskIdx !== null) {
      list[editingRiskIdx] = riskForm;
      toast.success("Risk item updated");
    } else {
      list.push(riskForm);
      toast.success("New risk item added");
    }
    updateStartupField("risks", list);
    setRiskModalOpen(false);
  };

  const handleDeleteRisk = (idx: number) => {
    const list = (startup.risks || []).filter((_, i) => i !== idx);
    updateStartupField("risks", list);
    toast.info("Risk item removed");
  };

  // Diligence Documents Handlers
  const handleOpenDocModal = (idx?: number) => {
    const list = startup.diligence_documents || [];
    if (typeof idx === "number") {
      setEditingDocIdx(idx);
      setDocForm({ ...list[idx]! });
    } else {
      setEditingDocIdx(null);
      setDocForm({
        title: "",
        category: "Technical",
        file_type: "PDF",
        file_size: "2.5 MB",
        status: "Verified",
      });
    }
    setDocModalOpen(true);
  };

  const handleSaveDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docForm.title) {
      toast.error("Document title is required");
      return;
    }
    let list = [...(startup.diligence_documents || [])];
    if (editingDocIdx !== null) {
      list[editingDocIdx] = docForm;
      toast.success(`Updated document "${docForm.title}"`);
    } else {
      list.push(docForm);
      toast.success(`Added document "${docForm.title}"`);
    }
    updateStartupField("diligence_documents", list);
    setDocModalOpen(false);
  };

  const handleDeleteDoc = (idx: number) => {
    const list = (startup.diligence_documents || []).filter((_, i) => i !== idx);
    updateStartupField("diligence_documents", list);
    toast.info("Document removed");
  };

  // Fund Breakdown Handlers
  const handleOpenFundItemModal = (idx?: number) => {
    const list = startup.investment_ask.funds_breakdown || [];
    if (typeof idx === "number") {
      setEditingFundItemIdx(idx);
      setFundItemForm({ ...list[idx]! });
    } else {
      setEditingFundItemIdx(null);
      setFundItemForm({
        category: "Living Lab Compute & Deployments",
        percentage: 25,
        amount_usd: Math.round(startup.investment_ask.amount_usd * 0.25),
        description: "",
      });
    }
    setFundItemModalOpen(true);
  };

  const handleSaveFundItem = (e: React.FormEvent) => {
    e.preventDefault();
    let list = [...(startup.investment_ask.funds_breakdown || [])];
    if (editingFundItemIdx !== null) {
      list[editingFundItemIdx] = fundItemForm;
    } else {
      list.push(fundItemForm);
    }
    onChange({
      ...startup,
      investment_ask: {
        ...startup.investment_ask,
        funds_breakdown: list,
      },
    });
    setFundItemModalOpen(false);
    toast.success("Capital deployment allocation updated");
  };

  const handleDeleteFundItem = (idx: number) => {
    const list = (startup.investment_ask.funds_breakdown || []).filter((_, i) => i !== idx);
    onChange({
      ...startup,
      investment_ask: {
        ...startup.investment_ask,
        funds_breakdown: list,
      },
    });
    toast.info("Capital allocation item removed");
  };

  // Links Handlers
  const handleAddLink = () => {
    const list = [...(startup.links || []), { label: "Website", url: "https://" }];
    updateStartupField("links", list);
  };

  const handleUpdateLink = (idx: number, field: "label" | "url", val: string) => {
    const list = [...(startup.links || [])];
    list[idx] = { ...list[idx]!, [field]: val };
    updateStartupField("links", list);
  };

  const handleDeleteLink = (idx: number) => {
    const list = (startup.links || []).filter((_, i) => i !== idx);
    updateStartupField("links", list);
  };

  // SDG Toggle Handler
  const handleToggleSdg = (sdg: (typeof ALL_SDGS)[0]) => {
    const current = startup.impact?.sdgs || [];
    const exists = current.some((s) => s.number === sdg.number);
    let nextSdgs;
    if (exists) {
      nextSdgs = current.filter((s) => s.number !== sdg.number);
    } else {
      nextSdgs = [...current, { number: sdg.number, label: sdg.label }];
    }
    updateNested("impact", "sdgs", nextSdgs);
  };

  return (
    <div className="space-y-6">
      {/* Top Sticky Bar: Quick Actions & Status */}
      <div className="sticky top-20 z-10 rounded-2xl border border-border bg-card/90 backdrop-blur-md p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl grid place-items-center bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <FileText className="size-5" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-foreground">
              {startup.name} · 18-Section Deal Book Editor
            </h3>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              {hasUnsavedChanges ? (
                <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                  <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" /> Unsaved edits pending
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="size-3" /> Live profile in sync
                </span>
              )}
              <span>·</span>
              <span>All 18 sections available</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={onSave}
            className="rounded-xl text-xs h-9 font-semibold gap-1.5 bg-primary text-primary-foreground shadow-xs cursor-pointer hover:opacity-90"
          >
            <Save className="size-3.5" /> Save All Sections
          </Button>
        </div>
      </div>

      {/* Sub-section Navigation Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
        {SUB_SECTIONS.map((sub) => {
          const Icon = sub.icon;
          const isActive = activeSubSection === sub.id;
          return (
            <button
              key={sub.id}
              type="button"
              onClick={() => setActiveSubSection(sub.id)}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-foreground text-background shadow-xs font-bold"
                  : "bg-card border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="size-3.5 shrink-0" />
              <span>{sub.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 1. IDENTITY & CONTACTS */}
      {/* ========================================================= */}
      {activeSubSection === "identity" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Template Section 1 &amp; 2 · Venture Overview
              </span>
              <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                Venture Identity, Legal Entity &amp; Living Lab Base
              </h3>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="text-xs font-semibold text-foreground">Venture Brand Name</label>
                <input
                  type="text"
                  value={startup.name}
                  onChange={(e) => updateStartupField("name", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Registered Legal Name</label>
                <input
                  type="text"
                  value={startup.legal_name || ""}
                  placeholder="e.g. Sela Digital Health Technologies PLC"
                  onChange={(e) => updateStartupField("legal_name", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Incubation Cohort</label>
                <select
                  value={startup.cohort || "Cohort 3"}
                  onChange={(e) => updateStartupField("cohort", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                >
                  <option value="Cohort 3">Cohort 3 (Current Living Lab)</option>
                  <option value="Cohort 2">Cohort 2 (Graduated)</option>
                  <option value="Cohort 1">Cohort 1 (Alumni)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Sector / Industry Vertical</label>
                <input
                  type="text"
                  value={startup.sector}
                  onChange={(e) => updateStartupField("sector", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Incorporation / Founded Year</label>
                <input
                  type="text"
                  value={startup.founded}
                  onChange={(e) => updateStartupField("founded", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">HQ &amp; Living Lab Location</label>
                <input
                  type="text"
                  value={startup.location}
                  onChange={(e) => updateStartupField("location", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Core Full-Time Team Size</label>
                <input
                  type="number"
                  value={startup.team_size}
                  onChange={(e) => updateStartupField("team_size", parseInt(e.target.value) || 1)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <TagInput
                  label="Operating Markets & Regional Corridors"
                  description="Regions, regional states, or African corridors where you have deployments"
                  tags={startup.operating_markets || []}
                  onChange={(markets) => updateStartupField("operating_markets", markets)}
                  placeholder="e.g. Oromia Region, Kenya, Rwanda..."
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-xs font-semibold text-foreground">Venture Tagline (One-Liner)</label>
                <input
                  type="text"
                  value={startup.tagline}
                  onChange={(e) => updateStartupField("tagline", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-xs font-semibold text-foreground">Executive Overview &amp; Narrative</label>
                <textarea
                  rows={4}
                  value={startup.description}
                  onChange={(e) => updateStartupField("description", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>
            </div>

            {/* Primary Contact Person */}
            <div className="pt-4 border-t border-border space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <h4 className="font-display text-sm font-bold text-foreground">
                  Primary Venture Representative (Deal Room Lead)
                </h4>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">Representative Name</label>
                  <input
                    type="text"
                    value={startup.primary_contact?.name || ""}
                    placeholder="e.g. Dr. Selamawit Bekele"
                    onChange={(e) => updateNested("primary_contact", "name", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Executive Role</label>
                  <input
                    type="text"
                    value={startup.primary_contact?.role || ""}
                    placeholder="e.g. Co-Founder & CEO"
                    onChange={(e) => updateNested("primary_contact", "role", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Institutional Email</label>
                  <input
                    type="email"
                    value={startup.primary_contact?.email || ""}
                    placeholder="founder@venture.et"
                    onChange={(e) => updateNested("primary_contact", "email", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Phone Number</label>
                  <input
                    type="text"
                    value={startup.primary_contact?.phone || ""}
                    placeholder="+251 91 142 8821"
                    onChange={(e) => updateNested("primary_contact", "phone", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Official Links */}
            <div className="pt-4 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="size-4 text-primary" />
                  <h4 className="font-display text-sm font-bold text-foreground">
                    Verified Digital Channels &amp; Links ({startup.links?.length || 0})
                  </h4>
                </div>
                <Button type="button" size="sm" variant="outline" onClick={handleAddLink} className="rounded-xl text-xs h-8">
                  <Plus className="size-3 mr-1" /> Add Channel
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {(startup.links || []).map((link, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl border border-border bg-background">
                    <input
                      type="text"
                      value={link.label}
                      placeholder="Label (e.g. Website, Demo)"
                      onChange={(e) => handleUpdateLink(idx, "label", e.target.value)}
                      className="w-1/3 rounded-lg border border-border bg-muted/30 px-2 py-1 text-xs text-foreground"
                    />
                    <input
                      type="text"
                      value={link.url}
                      placeholder="https://..."
                      onChange={(e) => handleUpdateLink(idx, "url", e.target.value)}
                      className="flex-1 rounded-lg border border-border bg-muted/30 px-2 py-1 text-xs text-foreground font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteLink(idx)}
                      className="p-1 text-muted-foreground hover:text-destructive cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. PROBLEM & AI TECHNOLOGY */}
      {/* ========================================================= */}
      {activeSubSection === "problem_ai" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Section 3: The Problem */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Template Section 3 · Core Problem &amp; Regional Severity
              </span>
              <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                The Regional Challenge Solved in Ethiopia &amp; East Africa
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Core Problem Statement</label>
                <textarea
                  rows={3}
                  value={startup.problem?.problem_statement || ""}
                  placeholder="Detail the urgent systemic friction in the region..."
                  onChange={(e) => updateNested("problem", "problem_statement", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-foreground">Target Population / Entities Affected</label>
                  <input
                    type="text"
                    value={startup.problem?.target_affected || ""}
                    placeholder="e.g. Rural health extension workers, smallholder farmers..."
                    onChange={(e) => updateNested("problem", "target_affected", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Problem Severity &amp; Consequences</label>
                  <input
                    type="text"
                    value={startup.problem?.severity || ""}
                    placeholder="e.g. Over 45% of critical patient transfers arrive late..."
                    onChange={(e) => updateNested("problem", "severity", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Current Status Quo Alternatives</label>
                  <input
                    type="text"
                    value={startup.problem?.current_alternatives || ""}
                    placeholder="e.g. Paper booklets, unguided manual referrals..."
                    onChange={(e) => updateNested("problem", "current_alternatives", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Why Alternatives Fail</label>
                  <input
                    type="text"
                    value={startup.problem?.why_alternatives_fail || ""}
                    placeholder="e.g. Cloud latency fails during blackouts, complex decision trees..."
                    onChange={(e) => updateNested("problem", "why_alternatives_fail", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 & 5: AI Architecture & Sovereign Data Moat */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Template Section 4 &amp; 5 · AI Architecture &amp; Sovereign Data
              </span>
              <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                Proprietary AI Engineering, Models &amp; Local Data Moat
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-foreground">Core AI Modality / Technology Type</label>
                  <input
                    type="text"
                    value={startup.ai_tech?.technology_type || ""}
                    placeholder="e.g. Edge NLP, Multi-Lingual Speech AI & Quantized Decision Trees"
                    onChange={(e) => updateNested("ai_tech", "technology_type", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Model Ownership &amp; IP Status</label>
                  <input
                    type="text"
                    value={startup.ai_tech?.model_ownership || ""}
                    placeholder="e.g. Proprietary fine-tuned with sovereign clinical weights"
                    onChange={(e) => updateNested("ai_tech", "model_ownership", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <TagInput
                  label="Models, Frameworks & Architectures Deployed"
                  description="Pre-trained or fine-tuned foundation models, edge runtimes, or custom weights"
                  tags={startup.ai_tech?.models_used || []}
                  onChange={(models) => updateNested("ai_tech", "models_used", models)}
                  placeholder="e.g. Quantized Llama-3 8B, Ethiopic Whisper, ONNX Edge..."
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">System Architecture &amp; Pipeline Flow</label>
                <textarea
                  rows={3}
                  value={startup.ai_tech?.system_architecture || ""}
                  placeholder="Describe edge execution, local cache, offline sync, or GPU inference pipelines..."
                  onChange={(e) => updateNested("ai_tech", "system_architecture", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Proprietary Technology &amp; Registered IP</label>
                <textarea
                  rows={2}
                  value={startup.ai_tech?.proprietary_ip || ""}
                  placeholder="Trade secrets, localized ontologies, proprietary loss functions..."
                  onChange={(e) => updateNested("ai_tech", "proprietary_ip", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              {/* Data Moat Sub-grid */}
              <div className="pt-4 border-t border-border space-y-4">
                <div className="flex items-center gap-2">
                  <Database className="size-4 text-emerald-600" />
                  <h4 className="font-display text-sm font-bold text-foreground">
                    Sovereign Data Defensibility &amp; Rights
                  </h4>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-foreground">Dataset Scale &amp; Scope</label>
                    <input
                      type="text"
                      value={startup.ai_tech?.dataset_size || ""}
                      placeholder="e.g. 18.4 GB annotated clinical speech, 400k transcripts"
                      onChange={(e) => updateNested("ai_tech", "dataset_size", e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground">Institutional Data Rights &amp; Agreements</label>
                    <input
                      type="text"
                      value={startup.ai_tech?.data_rights || ""}
                      placeholder="e.g. Sovereign institutional agreement co-signed with EAII & MoH"
                      onChange={(e) => updateNested("ai_tech", "data_rights", e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground">Primary Data Sources</label>
                    <textarea
                      rows={2}
                      value={startup.ai_tech?.data_sources || ""}
                      placeholder="Field recordings from 42 woreda posts, validated with Tikur Anbessa clinicians..."
                      onChange={(e) => updateNested("ai_tech", "data_sources", e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-primary focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground">Competitive Data Advantage</label>
                    <textarea
                      rows={2}
                      value={startup.ai_tech?.data_advantage || ""}
                      placeholder="What makes this data impossible for global competitors to replicate?"
                      onChange={(e) => updateNested("ai_tech", "data_advantage", e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-primary focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. PRODUCTS & MARKET SIZING */}
      {/* ========================================================= */}
      {activeSubSection === "products_market" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Section 6: Products & Solutions */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Template Section 6 · Commercial Offerings
                </span>
                <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                  Products &amp; Verified Solutions ({startup.products.length})
                </h3>
              </div>
              <Button type="button" size="sm" onClick={() => handleOpenProductModal()} className="rounded-xl text-xs h-8 gap-1">
                <Plus className="size-3.5" /> Add Product
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {startup.products.map((p, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-background p-5 shadow-2xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-sm font-bold text-foreground">{p.name}</h4>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                        {p.stage} Stage
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.summary}</p>

                    {p.ai_functionality && (
                      <div className="text-[11px] bg-muted/40 p-2.5 rounded-xl border border-border/60">
                        <span className="font-bold text-foreground block">AI Engine:</span>
                        <span className="text-muted-foreground">{p.ai_functionality}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-[11px] text-muted-foreground truncate">
                      Target: <strong>{p.target_customer || "Enterprise"}</strong>
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenProductModal(idx)}
                        className="text-primary hover:underline text-xs font-medium cursor-pointer"
                      >
                        Edit
                      </button>
                      <span className="text-muted-foreground">·</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(idx)}
                        className="text-destructive hover:underline text-xs font-medium cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7: Market Sizing TAM / SAM / SOM */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Template Section 7 · Total Addressable Market
              </span>
              <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                Market Sizing (TAM / SAM / SOM) &amp; Customer Segments
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="text-xs font-semibold text-foreground">Total Addressable Market (TAM)</label>
                <input
                  type="text"
                  value={startup.market?.tam_usd || ""}
                  placeholder="e.g. $1.4B"
                  onChange={(e) => updateNested("market", "tam_usd", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Serviceable Available Market (SAM)</label>
                <input
                  type="text"
                  value={startup.market?.sam_usd || ""}
                  placeholder="e.g. $320M"
                  onChange={(e) => updateNested("market", "sam_usd", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Serviceable Obtainable Market (SOM)</label>
                <input
                  type="text"
                  value={startup.market?.som_usd || ""}
                  placeholder="e.g. $45M"
                  onChange={(e) => updateNested("market", "som_usd", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-emerald-600 dark:text-emerald-400 focus:border-primary focus:outline-hidden font-bold"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-xs font-semibold text-foreground">Market Sizing Opportunity Narrative</label>
                <textarea
                  rows={3}
                  value={startup.market?.opportunity_narrative || ""}
                  placeholder="Explain market dynamics, regulatory drivers, and why this timing is defensible..."
                  onChange={(e) => updateNested("market", "opportunity_narrative", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-3 grid gap-4 sm:grid-cols-2">
                <TagInput
                  label="Target Customer Segments"
                  description="B2B, B2G, enterprise or cooperative buyers"
                  tags={startup.market?.customer_segments || []}
                  onChange={(segs) => updateNested("market", "customer_segments", segs)}
                  placeholder="e.g. Regional Health Bureaus, UNICEF, Agro Cooperatives..."
                />

                <TagInput
                  label="Regional Expansion Corridors"
                  description="Adjacent markets targeted for cross-border scale"
                  tags={startup.market?.expansion_markets || []}
                  onChange={(exp) => updateNested("market", "expansion_markets", exp)}
                  placeholder="e.g. Kenya, Uganda, Rwanda, Tanzania..."
                />
              </div>
            </div>
          </div>

          {/* Section 8: Business Model & Monetization */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Template Section 8 · Commercial Engine
              </span>
              <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                Business Model, Pricing &amp; Revenue Velocity
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Revenue Model Structure</label>
                <input
                  type="text"
                  value={startup.business_model?.revenue_model || ""}
                  placeholder="e.g. B2G Annual Enterprise Subscription"
                  onChange={(e) => updateNested("business_model", "revenue_model", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Pricing Tier Structure</label>
                <input
                  type="text"
                  value={startup.business_model?.pricing || ""}
                  placeholder="e.g. $1,200/yr per health center tier"
                  onChange={(e) => updateNested("business_model", "pricing", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Average Contract Value / ARPU</label>
                <input
                  type="text"
                  value={startup.business_model?.arpu || ""}
                  placeholder="e.g. $28,000 / district contract"
                  onChange={(e) => updateNested("business_model", "arpu", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Current MRR / ARR Velocity</label>
                <input
                  type="text"
                  value={startup.business_model?.mrr_arr || ""}
                  placeholder="e.g. $12,400 MRR (Growing 18% MoM)"
                  onChange={(e) => updateNested("business_model", "mrr_arr", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold focus:border-primary focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-4">
                <label className="text-xs font-semibold text-foreground">Gross Margins &amp; Unit Economics Notes</label>
                <input
                  type="text"
                  value={startup.business_model?.other_metrics || ""}
                  placeholder="e.g. 84% software gross margin, payback period 4.2 months"
                  onChange={(e) => updateNested("business_model", "other_metrics", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. TRACTION & AI PERFORMANCE BENCHMARKS */}
      {/* ========================================================= */}
      {activeSubSection === "traction_benchmarks" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Section 9: Empirical Field Traction */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Template Section 9 · Field Deployments &amp; Milestones
              </span>
              <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                Empirical Living Lab Traction &amp; Institutional Validation
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="text-xs font-semibold text-foreground">Headline Metric Value</label>
                <input
                  type="text"
                  value={startup.traction?.key_metric_value || ""}
                  placeholder="e.g. 84,000+ Scans"
                  onChange={(e) => updateNested("traction", "key_metric_value", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground font-bold focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Headline Metric Label</label>
                <input
                  type="text"
                  value={startup.traction?.key_metric_label || ""}
                  placeholder="e.g. Completed Clinical Inferences"
                  onChange={(e) => updateNested("traction", "key_metric_label", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Active Operational Deployments</label>
                <input
                  type="text"
                  value={startup.traction?.active_deployments || ""}
                  placeholder="e.g. 42 Public Health Posts in Oromia"
                  onChange={(e) => updateNested("traction", "active_deployments", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-3">
                <TagInput
                  label="Key Institutional & Enterprise Partners"
                  description="Hospitals, government institutes, NGO backers, or academic living labs"
                  tags={startup.traction?.key_partners || []}
                  onChange={(partners) => updateNested("traction", "key_partners", partners)}
                  placeholder="e.g. Tikur Anbessa Hospital, Ministry of Innovation & Technology..."
                />
              </div>

              <div className="sm:col-span-3">
                <TagInput
                  label="Major Venture Milestones Achieved"
                  description="Sequential milestone achievements displayed on your institutional deal sheet"
                  tags={startup.traction?.major_milestones || []}
                  onChange={(milestones) => updateNested("traction", "major_milestones", milestones)}
                  placeholder="e.g. Achieved 94.6% AUC-ROC in double-blind validation..."
                />
              </div>
            </div>
          </div>

          {/* Section 10: AI Performance & Empirical Benchmarks */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Template Section 10 · Empirical Benchmark Evaluation
              </span>
              <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                AI Performance Metrics, Edge Latency &amp; Throughput
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Primary Evaluation Metric</label>
                <input
                  type="text"
                  value={startup.ai_performance?.primary_metric || ""}
                  placeholder="e.g. AUC-ROC Diagnostic Accuracy"
                  onChange={(e) => updateNested("ai_performance", "primary_metric", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Current Model Performance</label>
                <input
                  type="text"
                  value={startup.ai_performance?.current_performance || ""}
                  placeholder="e.g. 94.6%"
                  onChange={(e) => updateNested("ai_performance", "current_performance", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-primary font-bold focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Baseline / Industry Standard</label>
                <input
                  type="text"
                  value={startup.ai_performance?.baseline_benchmark || ""}
                  placeholder="e.g. 78.2% Human Generalist"
                  onChange={(e) => updateNested("ai_performance", "baseline_benchmark", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Improvement Delta</label>
                <input
                  type="text"
                  value={startup.ai_performance?.improvement || ""}
                  placeholder="e.g. +16.4% Accuracy Delta"
                  onChange={(e) => updateNested("ai_performance", "improvement", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-emerald-600 font-bold focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Edge Latency</label>
                <input
                  type="text"
                  value={startup.ai_performance?.latency || ""}
                  placeholder="e.g. 120ms on Mobile Edge"
                  onChange={(e) => updateNested("ai_performance", "latency", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Unit Inference Cost</label>
                <input
                  type="text"
                  value={startup.ai_performance?.inference_cost || ""}
                  placeholder="e.g. $0.003 / inference"
                  onChange={(e) => updateNested("ai_performance", "inference_cost", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-foreground">Operational Scale &amp; Throughput</label>
                <input
                  type="text"
                  value={startup.ai_performance?.scale || ""}
                  placeholder="e.g. 1,200 evaluations/day across 42 offline edge clusters"
                  onChange={(e) => updateNested("ai_performance", "scale", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-4">
                <label className="text-xs font-semibold text-foreground">Validation Methodology</label>
                <input
                  type="text"
                  value={startup.ai_performance?.validation || ""}
                  placeholder="e.g. Double-blind prospective validation study conducted with Tikur Anbessa Hospital"
                  onChange={(e) => updateNested("ai_performance", "validation", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Section 11: Competitive Moats */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Template Section 11 · Strategic Defensibility
              </span>
              <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                Competitive Moats &amp; Alternative Players
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="text-xs font-semibold text-foreground">Proprietary IP Moat</label>
                <textarea
                  rows={3}
                  value={startup.competitive_advantage?.proprietary_moat || ""}
                  placeholder="Why your algorithms or patents cannot be copied..."
                  onChange={(e) => updateNested("competitive_advantage", "proprietary_moat", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Local Domain &amp; Data Moat</label>
                <textarea
                  rows={3}
                  value={startup.competitive_advantage?.local_expertise || ""}
                  placeholder="Deep Ethiopian linguistic or clinical nuances..."
                  onChange={(e) => updateNested("competitive_advantage", "local_expertise", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Distribution &amp; Regulatory Moat</label>
                <textarea
                  rows={3}
                  value={startup.competitive_advantage?.distribution_moat || ""}
                  placeholder="Last-mile institutional channels or ministerial partnerships..."
                  onChange={(e) => updateNested("competitive_advantage", "distribution_moat", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-3">
                <TagInput
                  label="Direct & Indirect Competitors"
                  description="Global or regional competitors you differentiate against"
                  tags={startup.competitive_advantage?.main_competitors || []}
                  onChange={(comps) => updateNested("competitive_advantage", "main_competitors", comps)}
                  placeholder="e.g. Babyl Health, Ada Health, Paper clinical books..."
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. TEAM & SOCIAL IMPACT (SDGS) */}
      {/* ========================================================= */}
      {activeSubSection === "team_impact" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Section 12: Leadership Team */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Template Section 12 · Founding Leadership &amp; Talent
                </span>
                <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                  Core Founders &amp; Engineering Credentials ({startup.founders?.length || 0})
                </h3>
              </div>
              <Button type="button" size="sm" onClick={() => handleOpenFounderModal()} className="rounded-xl text-xs h-8 gap-1">
                <Plus className="size-3.5" /> Add Founder / Leader
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {(startup.founders || []).map((f, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-border bg-background space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-sm font-bold text-foreground">{f.name}</h4>
                      <span className="text-xs font-semibold text-primary">{f.role}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.background}</p>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                    <button
                      type="button"
                      onClick={() => handleOpenFounderModal(idx)}
                      className="text-primary hover:underline text-xs font-medium cursor-pointer"
                    >
                      Edit
                    </button>
                    <span className="text-muted-foreground">·</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteFounder(idx)}
                      className="text-destructive hover:underline text-xs font-medium cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Team Breakdown */}
            <div className="pt-4 border-t border-border space-y-4">
              <h4 className="font-display text-sm font-bold text-foreground">
                Technical Composition &amp; Specialized R&amp;D Team
              </h4>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-xs font-semibold text-foreground">Dedicated Technical Team Size</label>
                  <input
                    type="number"
                    value={startup.team_breakdown?.technical_team_size || 5}
                    onChange={(e) => updateNested("team_breakdown", "technical_team_size", parseInt(e.target.value) || 0)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">AI &amp; Data Science Specialists</label>
                  <input
                    type="number"
                    value={startup.team_breakdown?.ai_data_science_size || 3}
                    onChange={(e) => updateNested("team_breakdown", "ai_data_science_size", parseInt(e.target.value) || 0)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-primary font-bold focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="text-xs font-semibold text-foreground">Core Technical Advantage &amp; Research Credentials</label>
                  <textarea
                    rows={2}
                    value={startup.team_breakdown?.key_team_strength || ""}
                    placeholder="e.g. 3 PhD researchers in NLP from Addis Ababa University, former EAII researchers..."
                    onChange={(e) => updateNested("team_breakdown", "key_team_strength", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 13: Measurable Development Impact & SDGs */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Template Section 13 · UNDP timbuktoo Alignment
              </span>
              <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                Measurable Social Impact, Job Creation &amp; UN SDGs
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-xs font-semibold text-foreground">Beneficiaries Reached / Impacted</label>
                  <input
                    type="text"
                    value={startup.impact?.beneficiaries_reached || ""}
                    placeholder="e.g. 1.2M+ rural community residents"
                    onChange={(e) => updateNested("impact", "beneficiaries_reached", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground font-bold focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Direct High-Tech Jobs Created</label>
                  <input
                    type="number"
                    value={startup.impact?.jobs_created || 0}
                    onChange={(e) => updateNested("impact", "jobs_created", parseInt(e.target.value) || 0)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Inclusion &amp; Gender Representation</label>
                  <input
                    type="text"
                    value={startup.impact?.women_youth_representation || ""}
                    placeholder="e.g. 50% Female Founding Team; 75% Youth"
                    onChange={(e) => updateNested("impact", "women_youth_representation", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="text-xs font-semibold text-foreground">Impact Narrative</label>
                  <textarea
                    rows={3}
                    value={startup.impact?.impact_narrative || ""}
                    placeholder="Describe direct alignment with Africa's Agenda 2063, localized job growth..."
                    onChange={(e) => updateNested("impact", "impact_narrative", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>
              </div>

              {/* SDG Selector Strip */}
              <div className="pt-4 border-t border-border space-y-3">
                <label className="text-xs font-semibold text-foreground block">
                  Select Aligned UN Sustainable Development Goals (SDGs)
                </label>
                <div className="flex flex-wrap gap-2">
                  {ALL_SDGS.map((sdg) => {
                    const isSelected = (startup.impact?.sdgs || []).some((s) => s.number === sdg.number);
                    return (
                      <button
                        key={sdg.number}
                        type="button"
                        onClick={() => handleToggleSdg(sdg)}
                        className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? `${sdg.color} text-white shadow-xs ring-2 ring-primary ring-offset-1`
                            : "bg-muted/40 text-muted-foreground border border-border hover:bg-muted"
                        }`}
                      >
                        <span className="font-bold">SDG {sdg.number}:</span>
                        <span>{sdg.label}</span>
                        {isSelected && <Check className="size-3 ml-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. FINANCIALS & INVESTMENT ASK */}
      {/* ========================================================= */}
      {activeSubSection === "financials_funding" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Section 15: Financial Projections Table */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Template Section 15 · 3-Year Financial Model
              </span>
              <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                Pro Forma Projections &amp; Living Lab Unit Economics
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-foreground">Historical Revenue &amp; Incubation Support</label>
                  <input
                    type="text"
                    value={startup.financials?.historical || ""}
                    placeholder="e.g. Bootstrapped with $25k EAII compute allocation..."
                    onChange={(e) => updateNested("financials", "historical", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Unit Economics Summary</label>
                  <input
                    type="text"
                    value={startup.financials?.unit_economics || ""}
                    placeholder="e.g. 84% gross margins, rapid payback period"
                    onChange={(e) => updateNested("financials", "unit_economics", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Financial Projections Table */}
              <div className="pt-2">
                <span className="text-xs font-bold text-foreground block mb-2">Projected Annual Financials:</span>
                <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full min-w-[620px] text-left text-xs">
                    <thead className="bg-muted/50 border-b border-border text-[11px] font-bold text-muted-foreground uppercase">
                      <tr>
                        <th className="p-3">Year</th>
                        <th className="p-3">Projected Rev (USD)</th>
                        <th className="p-3">Gross Profit (USD)</th>
                        <th className="p-3">Margin (%)</th>
                        <th className="p-3">EBITDA (USD)</th>
                        <th className="p-3">Target Footprint</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {(startup.financials?.projected || []).map((row, idx) => (
                        <tr key={idx} className="bg-card">
                          <td className="p-2.5 font-bold">
                            <input
                              type="text"
                              value={row.year}
                              onChange={(e) => {
                                const list = [...(startup.financials?.projected || [])];
                                list[idx] = { ...list[idx]!, year: e.target.value };
                                updateNested("financials", "projected", list);
                              }}
                              className="w-20 rounded-lg border border-border bg-background px-2 py-1 font-semibold"
                            />
                          </td>
                          <td className="p-2.5">
                            <input
                              type="number"
                              value={row.revenue_usd}
                              onChange={(e) => {
                                const list = [...(startup.financials?.projected || [])];
                                list[idx] = { ...list[idx]!, revenue_usd: parseFloat(e.target.value) || 0 };
                                updateNested("financials", "projected", list);
                              }}
                              className="w-28 rounded-lg border border-border bg-background px-2 py-1 font-mono font-bold"
                            />
                          </td>
                          <td className="p-2.5">
                            <input
                              type="number"
                              value={row.gross_profit_usd}
                              onChange={(e) => {
                                const list = [...(startup.financials?.projected || [])];
                                list[idx] = { ...list[idx]!, gross_profit_usd: parseFloat(e.target.value) || 0 };
                                updateNested("financials", "projected", list);
                              }}
                              className="w-28 rounded-lg border border-border bg-background px-2 py-1 font-mono"
                            />
                          </td>
                          <td className="p-2.5">
                            <input
                              type="number"
                              value={row.gross_margin_pct}
                              onChange={(e) => {
                                const list = [...(startup.financials?.projected || [])];
                                list[idx] = { ...list[idx]!, gross_margin_pct: parseFloat(e.target.value) || 0 };
                                updateNested("financials", "projected", list);
                              }}
                              className="w-16 rounded-lg border border-border bg-background px-2 py-1 font-mono"
                            />
                          </td>
                          <td className="p-2.5">
                            <input
                              type="number"
                              value={row.operating_profit_usd}
                              onChange={(e) => {
                                const list = [...(startup.financials?.projected || [])];
                                list[idx] = { ...list[idx]!, operating_profit_usd: parseFloat(e.target.value) || 0 };
                                updateNested("financials", "projected", list);
                              }}
                              className="w-28 rounded-lg border border-border bg-background px-2 py-1 font-mono text-emerald-600 font-bold"
                            />
                          </td>
                          <td className="p-2.5">
                            <input
                              type="text"
                              value={row.active_units || ""}
                              placeholder="e.g. 120 Clinics"
                              onChange={(e) => {
                                const list = [...(startup.financials?.projected || [])];
                                list[idx] = { ...list[idx]!, active_units: e.target.value };
                                updateNested("financials", "projected", list);
                              }}
                              className="w-36 rounded-lg border border-border bg-background px-2 py-1"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Section 16: 18-Month Strategic Growth Roadmap */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Template Section 16 · 18-Month Strategic Growth
              </span>
              <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                Product, Customer, Regional &amp; AI Capability Expansion
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-foreground">Product Evolution Horizon</label>
                <textarea
                  rows={2}
                  value={startup.growth_plan?.product_growth || ""}
                  placeholder="e.g. Integrate diagnostic multi-modal ultrasound classifier..."
                  onChange={(e) => updateNested("growth_plan", "product_growth", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Customer Acquisition Strategy</label>
                <textarea
                  rows={2}
                  value={startup.growth_plan?.customer_growth || ""}
                  placeholder="e.g. Direct integration into Ministry of Health regional pilots..."
                  onChange={(e) => updateNested("growth_plan", "customer_growth", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Regional Geographic Expansion</label>
                <textarea
                  rows={2}
                  value={startup.growth_plan?.geographic_expansion || ""}
                  placeholder="e.g. Expansion across 3 Eastern Africa neighboring jurisdictions..."
                  onChange={(e) => updateNested("growth_plan", "geographic_expansion", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Next-Gen AI Capability Expansion</label>
                <textarea
                  rows={2}
                  value={startup.growth_plan?.ai_capability_expansion || ""}
                  placeholder="e.g. Fine-tune on 5 additional Ethio-Semitic & Cushitic dialects..."
                  onChange={(e) => updateNested("growth_plan", "ai_capability_expansion", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Section 14 & 18: Capital Ask & Use of Funds */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Template Section 14 &amp; 18 · Institutional Funding Terms
              </span>
              <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                Capital Ask, Target Round &amp; Deployment Allocation
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">Capital Ask (USD)</label>
                  <input
                    type="number"
                    value={startup.investment_ask.amount_usd}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      onChange({
                        ...startup,
                        investment_ask: {
                          ...startup.investment_ask,
                          amount_usd: val,
                        },
                      });
                    }}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-mono font-bold text-primary focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Target Round</label>
                  <select
                    value={startup.investment_ask.round}
                    onChange={(e) => {
                      onChange({
                        ...startup,
                        investment_ask: {
                          ...startup.investment_ask,
                          round: e.target.value,
                        },
                      });
                    }}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground focus:border-primary focus:outline-hidden"
                  >
                    <option value="Pre-Seed">Pre-Seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A">Series A</option>
                    <option value="Living Lab Pilot Grant">Living Lab Pilot Grant</option>
                    <option value="Bridge">Bridge</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Preferred Legal Instrument</label>
                  <input
                    type="text"
                    value={startup.investment_ask.preferred_instrument || "SAFE"}
                    placeholder="e.g. Post-Money SAFE, Priced Equity"
                    onChange={(e) => {
                      onChange({
                        ...startup,
                        investment_ask: {
                          ...startup.investment_ask,
                          preferred_instrument: e.target.value,
                        },
                      });
                    }}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Prior / Current Funding</label>
                  <input
                    type="text"
                    value={startup.investment_ask.current_funding || ""}
                    placeholder="e.g. $45,000 non-dilutive EAII grant"
                    onChange={(e) => {
                      onChange({
                        ...startup,
                        investment_ask: {
                          ...startup.investment_ask,
                          current_funding: e.target.value,
                        },
                      });
                    }}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-4">
                  <label className="text-xs font-semibold text-foreground">Primary Capital Objective (Headline)</label>
                  <textarea
                    rows={2}
                    value={startup.investment_ask.use_of_funds}
                    placeholder="e.g. Scale edge clinical deployments across 120 primary clinics and achieve MoH integration..."
                    onChange={(e) => {
                      onChange({
                        ...startup,
                        investment_ask: {
                          ...startup.investment_ask,
                          use_of_funds: e.target.value,
                        },
                      });
                    }}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Capital Allocation Breakdown */}
              <div className="pt-4 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display text-sm font-bold text-foreground">
                      Planned Capital Deployment Allocation
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      Visual progress breakdown displayed on the public Deal Book
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenFundItemModal()}
                    className="rounded-xl text-xs h-8 gap-1"
                  >
                    <Plus className="size-3" /> Add Category
                  </Button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {(startup.investment_ask.funds_breakdown || []).map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl border border-border bg-background space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-foreground">{item.category}</span>
                        <span className="font-mono font-bold text-primary">
                          {item.percentage}% (${item.amount_usd.toLocaleString()})
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${item.percentage}%` }} />
                      </div>
                      <p className="text-[11px] text-muted-foreground">{item.description}</p>
                      <div className="flex justify-end gap-2 pt-1 border-t border-border/60">
                        <button
                          type="button"
                          onClick={() => handleOpenFundItemModal(idx)}
                          className="text-primary hover:underline text-xs cursor-pointer"
                        >
                          Edit
                        </button>
                        <span className="text-muted-foreground">·</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteFundItem(idx)}
                          className="text-destructive hover:underline text-xs cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. DILIGENCE VAULT & RISK MANAGEMENT */}
      {/* ========================================================= */}
      {activeSubSection === "vault_risks" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Diligence Vault Documents */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Institutional Diligence Room Vault
                </span>
                <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                  Verified Data Room Dossiers ({startup.diligence_documents?.length || 0})
                </h3>
              </div>
              <Button type="button" size="sm" onClick={() => handleOpenDocModal()} className="rounded-xl text-xs h-8 gap-1">
                <Plus className="size-3.5" /> Add Document
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(startup.diligence_documents || []).map((doc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-border bg-background space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                        {doc.category}
                      </span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded-md ${
                          doc.status === "Verified"
                            ? "bg-emerald-500/15 text-emerald-600"
                            : doc.status === "Available"
                            ? "bg-blue-500/15 text-blue-600"
                            : "bg-amber-500/15 text-amber-600"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </div>
                    <h4 className="font-display text-xs font-bold text-foreground leading-snug">{doc.title}</h4>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border text-[11px] text-muted-foreground">
                    <span className="font-mono">
                      {doc.file_type} · {doc.file_size}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenDocModal(idx)}
                        className="text-primary hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                      <span>·</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteDoc(idx)}
                        className="text-destructive hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 17: Operational Risks & Engineered Mitigations */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Template Section 17 · Risk Management Framework
                </span>
                <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
                  Key Operational &amp; Technical Risks ({startup.risks?.length || 0})
                </h3>
              </div>
              <Button type="button" size="sm" onClick={() => handleOpenRiskModal()} className="rounded-xl text-xs h-8 gap-1">
                <Plus className="size-3.5" /> Add Risk Item
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(startup.risks || []).map((r, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-border bg-background space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">Risk {idx + 1}</span>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          r.severity === "High"
                            ? "bg-rose-500/15 text-rose-600"
                            : r.severity === "Medium"
                            ? "bg-amber-500/15 text-amber-600"
                            : "bg-blue-500/15 text-blue-600"
                        }`}
                      >
                        {r.severity} Severity
                      </span>
                    </div>
                    <p className="text-xs font-medium text-foreground leading-relaxed">{r.risk}</p>
                    <div className="pt-2 border-t border-border/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                        Engineered Mitigation:
                      </span>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{r.mitigation}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-border text-xs">
                    <button
                      type="button"
                      onClick={() => handleOpenRiskModal(idx)}
                      className="text-primary hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                    <span className="text-muted-foreground">·</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteRisk(idx)}
                      className="text-destructive hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DIALOG MODALS FOR ADDING / EDITING ITEMS */}
      {/* ========================================================= */}

      {/* Product Modal */}
      <Dialog open={productModalOpen} onOpenChange={setProductModalOpen}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              {editingProductIdx !== null ? "Edit Product Offering" : "Add Product Offering (Section 6)"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Define the commercial solution, stage, and localized AI functionality.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveProduct} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-foreground">Product Name</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Sela Edge Triage"
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Maturity Stage</label>
                <select
                  value={productForm.stage}
                  onChange={(e) => setProductForm({ ...productForm, stage: e.target.value as any })}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground"
                >
                  <option value="Concept">Concept</option>
                  <option value="Prototype">Prototype</option>
                  <option value="Pilot">Pilot</option>
                  <option value="Market">Market</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-foreground">Target Customer</label>
                <input
                  type="text"
                  value={productForm.target_customer || ""}
                  placeholder="e.g. Rural Health Extension Workers, Primary Clinics"
                  onChange={(e) => setProductForm({ ...productForm, target_customer: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-foreground">Executive Product Summary</label>
                <textarea
                  rows={2}
                  required
                  value={productForm.summary}
                  onChange={(e) => setProductForm({ ...productForm, summary: e.target.value })}
                  placeholder="Overview of the product and its primary purpose..."
                  className="mt-1 w-full rounded-xl border border-border bg-background p-2.5 text-xs text-foreground"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-foreground">AI Engine &amp; Functionality</label>
                <textarea
                  rows={2}
                  value={productForm.ai_functionality || ""}
                  placeholder="e.g. Quantized Llama-3 running on 4-bit edge weights with local Amharic speech..."
                  onChange={(e) => setProductForm({ ...productForm, ai_functionality: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-border bg-background p-2.5 text-xs text-foreground"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-foreground">Differentiation vs Existing Alternatives</label>
                <input
                  type="text"
                  value={productForm.differentiation || ""}
                  placeholder="e.g. 100% offline-first execution with zero cloud requirement"
                  onChange={(e) => setProductForm({ ...productForm, differentiation: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground"
                />
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setProductModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-primary text-primary-foreground font-semibold">
                Save Product
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Founder Modal */}
      <Dialog open={founderModalOpen} onOpenChange={setFounderModalOpen}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              {editingFounderIdx !== null ? "Edit Founding Leader" : "Add Founding Leader (Section 12)"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveFounder} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-foreground">Full Name</label>
              <input
                type="text"
                required
                value={founderForm.name}
                onChange={(e) => setFounderForm({ ...founderForm, name: e.target.value })}
                placeholder="e.g. Dr. Selamawit Bekele"
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground">Title / Role</label>
              <input
                type="text"
                required
                value={founderForm.role}
                onChange={(e) => setFounderForm({ ...founderForm, role: e.target.value })}
                placeholder="e.g. Co-Founder & Chief Medical Officer"
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground">Background &amp; Credentials</label>
              <textarea
                rows={3}
                required
                value={founderForm.background}
                onChange={(e) => setFounderForm({ ...founderForm, background: e.target.value })}
                placeholder="e.g. Former Chief Resident at Tikur Anbessa Hospital with 10+ years public health..."
                className="mt-1 w-full rounded-xl border border-border bg-background p-2.5 text-xs text-foreground"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setFounderModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-primary text-primary-foreground font-semibold">
                Save Leader
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Risk Modal */}
      <Dialog open={riskModalOpen} onOpenChange={setRiskModalOpen}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              {editingRiskIdx !== null ? "Edit Operational Risk" : "Add Risk & Mitigation (Section 17)"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveRisk} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-foreground">Risk Description</label>
              <textarea
                rows={2}
                required
                value={riskForm.risk}
                onChange={(e) => setRiskForm({ ...riskForm, risk: e.target.value })}
                placeholder="e.g. Edge device fragmentation across low-cost Android variants..."
                className="mt-1 w-full rounded-xl border border-border bg-background p-2.5 text-xs text-foreground"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground">Severity Level</label>
              <select
                value={riskForm.severity}
                onChange={(e) => setRiskForm({ ...riskForm, severity: e.target.value as any })}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground">Engineered Mitigation</label>
              <textarea
                rows={3}
                required
                value={riskForm.mitigation}
                onChange={(e) => setRiskForm({ ...riskForm, mitigation: e.target.value })}
                placeholder="e.g. Native C++ inference engine compiled specifically for ARM Cortex..."
                className="mt-1 w-full rounded-xl border border-border bg-background p-2.5 text-xs text-foreground"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setRiskModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-primary text-primary-foreground font-semibold">
                Save Risk Item
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Diligence Document Modal */}
      <Dialog open={docModalOpen} onOpenChange={setDocModalOpen}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              {editingDocIdx !== null ? "Edit Vault Document" : "Add Vault Document (Diligence Room)"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveDoc} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-foreground">Document Title</label>
              <input
                type="text"
                required
                value={docForm.title}
                onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                placeholder="e.g. Q3 2026 Audit & Clinical Trial Report"
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-foreground">Category</label>
                <select
                  value={docForm.category}
                  onChange={(e) => setDocForm({ ...docForm, category: e.target.value as any })}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground"
                >
                  <option value="Pitch Deck">Pitch Deck</option>
                  <option value="Financials">Financials</option>
                  <option value="Technical">Technical</option>
                  <option value="Regulatory & Impact">Regulatory & Impact</option>
                  <option value="Cap Table">Cap Table</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Access Status</label>
                <select
                  value={docForm.status}
                  onChange={(e) => setDocForm({ ...docForm, status: e.target.value as any })}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground"
                >
                  <option value="Verified">Verified</option>
                  <option value="Available">Available</option>
                  <option value="Restricted">Restricted</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">File Format</label>
                <select
                  value={docForm.file_type}
                  onChange={(e) => setDocForm({ ...docForm, file_type: e.target.value as any })}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground"
                >
                  <option value="PDF">PDF</option>
                  <option value="XLSX">XLSX</option>
                  <option value="DOCX">DOCX</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">File Size</label>
                <input
                  type="text"
                  value={docForm.file_size}
                  onChange={(e) => setDocForm({ ...docForm, file_size: e.target.value })}
                  placeholder="e.g. 14.2 MB"
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground"
                />
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setDocModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-primary text-primary-foreground font-semibold">
                Save Document
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Fund Breakdown Item Modal */}
      <Dialog open={fundItemModalOpen} onOpenChange={setFundItemModalOpen}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              {editingFundItemIdx !== null ? "Edit Capital Allocation Item" : "Add Capital Allocation Category"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveFundItem} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-foreground">Allocation Category</label>
              <input
                type="text"
                required
                value={fundItemForm.category}
                onChange={(e) => setFundItemForm({ ...fundItemForm, category: e.target.value })}
                placeholder="e.g. AI Engineering & Model Quantization"
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-foreground">Allocation Percentage (%)</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={100}
                  value={fundItemForm.percentage}
                  onChange={(e) => {
                    const pct = parseFloat(e.target.value) || 0;
                    const amt = Math.round((startup.investment_ask.amount_usd * pct) / 100);
                    setFundItemForm({ ...fundItemForm, percentage: pct, amount_usd: amt });
                  }}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Amount (USD)</label>
                <input
                  type="number"
                  required
                  value={fundItemForm.amount_usd}
                  onChange={(e) => setFundItemForm({ ...fundItemForm, amount_usd: parseFloat(e.target.value) || 0 })}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground">Description &amp; Milestones Funded</label>
              <textarea
                rows={2}
                value={fundItemForm.description}
                onChange={(e) => setFundItemForm({ ...fundItemForm, description: e.target.value })}
                placeholder="e.g. GPU compute clusters, clinical validation trials..."
                className="mt-1 w-full rounded-xl border border-border bg-background p-2.5 text-xs text-foreground"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setFundItemModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-primary text-primary-foreground font-semibold">
                Save Allocation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
