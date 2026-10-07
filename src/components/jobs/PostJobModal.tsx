import {
  AlertCircle,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Cpu,
  DollarSign,
  HelpCircle,
  Layers,
  MapPin,
  Plus,
  Rocket,
  Send,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { useId, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { ExperienceLevel, JobOpening, JobType, WorkplaceType } from "@/data/jobs";
import { STARTUPS } from "@/data/startups";

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: (job: JobOpening) => void;
}

const SECTOR_OPTIONS = [
  "AgriTech",
  "Health AI",
  "Language AI",
  "Robotics & Hardware",
  "FinTech AI",
  "Climate & Earth AI",
  "Foundation Models",
  "Computer Vision",
  "Other",
];

const JOB_TYPE_OPTIONS: JobType[] = ["Full-time", "Fellowship", "Internship", "Contract", "Part-time"];
const EXP_LEVEL_OPTIONS: ExperienceLevel[] = ["Entry Level", "Mid-Level", "Senior", "Lead / Principal", "Fellowship"];
const WORKPLACE_OPTIONS: WorkplaceType[] = ["On-site", "Hybrid", "Remote (Ethiopia)"];

const COMPUTE_PRESETS = [
  "Dedicated High-Performance GPU Workstation (256 GB RAM, RTX 6000 Ada) + 1 PB EAII Data Center Storage",
  "Dedicated High-Performance GPU Workstation (128 GB RAM) + Living Lab Desk",
  "Shared High-Performance GPU Cluster + EAII AI Training Cluster Access",
  "High-Performance GPU Workstation + Embedded Edge TPU & Robotics Bench Access",
  "Remote EAII GPU Compute Allocation + Monthly Addis Ababa Living Lab Residency",
];

export function PostJobModal({ isOpen, onClose, onJobCreated }: PostJobModalProps) {
  const modalTitleId = useId();

  // Startup selection mode: existing incubated startup or custom startup
  const [startupMode, setStartupMode] = useState<"incubated" | "custom">("incubated");
  const [selectedStartupSlug, setSelectedStartupSlug] = useState<string>(STARTUPS[0]?.slug || "");
  const [customStartupName, setCustomStartupName] = useState("");
  const [customStartupTagline, setCustomStartupTagline] = useState("");

  // Role details
  const [title, setTitle] = useState("");
  const [sector, setSector] = useState("AgriTech");
  const [department, setDepartment] = useState("Machine Learning Engineering");
  const [type, setType] = useState<JobType>("Full-time");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>("Senior");
  const [workplaceType, setWorkplaceType] = useState<WorkplaceType>("Hybrid");
  const [location, setLocation] = useState("Addis Ababa (EAII Living Lab HQ)");
  const defaultComputePreset =
    COMPUTE_PRESETS[0] ||
    "Dedicated High-Performance GPU Workstation (256 GB RAM, RTX 6000 Ada) + 1 PB EAII Data Center Storage";
  const [compensation, setCompensation] = useState("$1,500 – $2,500 / month + Equity");
  const [computeAllocation, setComputeAllocation] = useState<string>(defaultComputePreset);
  const [deadline, setDeadline] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0] || "2026-10-31";
  });
  const [contactEmailOrUrl, setContactEmailOrUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  // Text contents
  const [summary, setSummary] = useState("");
  const [responsibilitiesText, setResponsibilitiesText] = useState(
    "• Develop and optimize deep learning models for production inference.\n• Run distributed fine-tuning on high-performance GPU workstations.\n• Collaborate with cross-functional domain experts and researchers."
  );
  const [requirementsText, setRequirementsText] = useState(
    "• Strong hands-on proficiency in Python, PyTorch or TensorFlow.\n• Experience with computer vision, NLP, or embedded AI pipelines.\n• Bachelor's or Master's in Computer Science, AI, Electrical Engineering, or related practical experience."
  );
  const [skillsText, setSkillsText] = useState("PyTorch, FastAPI, Docker, GPU Optimization");
  const [benefitsText, setBenefitsText] = useState(
    "Dedicated high-performance GPU access, EAII living lab desk, timbuktoo founder network, health allowance"
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Selected startup reference if incubated
  const activeIncubatedStartup =
    STARTUPS.find((s) => s.slug === selectedStartupSlug) ||
    STARTUPS[0] || {
      name: "MeklitAI",
      tagline: "Offline-first, curriculum-grounded AI tutoring platform",
      slug: "meklit-ai",
      sector: "EdTech AI",
    };

  const handleStartupSelect = (slug: string) => {
    setSelectedStartupSlug(slug);
    const s = STARTUPS.find((item) => item.slug === slug);
    if (s) {
      setSector(s.sector);
      if (s.slug === "meklit-ai") {
        setDepartment("Applied NLP & Educational AI");
        setLocation("Addis Ababa, Ethiopia");
      } else if (s.slug === "ethioagrisight") {
        setDepartment("Computer Vision & Remote Sensing");
        setLocation("Addis Ababa (EAII HQ) & Adama Hub");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!title.trim()) {
      setFormError("Job title is required.");
      return;
    }

    let startupName = "";
    let startupTagline = "";
    let startupSlug = "";

    if (startupMode === "incubated") {
      startupName = activeIncubatedStartup.name;
      startupTagline = activeIncubatedStartup.tagline;
      startupSlug = activeIncubatedStartup.slug;
    } else {
      if (!customStartupName.trim()) {
        setFormError("Please enter your startup name.");
        return;
      }
      startupName = customStartupName.trim();
      startupTagline = customStartupTagline.trim() || "AI UniPod Ethiopia Incubated Startup";
      startupSlug = customStartupName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    if (!summary.trim()) {
      setFormError("Please provide a summary of the role.");
      return;
    }

    // Split textareas into string arrays
    const parseLines = (raw: string): string[] =>
      raw
        .split("\n")
        .map((line) => line.replace(/^[•\-\*]\s*/, "").trim())
        .filter(Boolean);

    const parseCommaTags = (raw: string): string[] =>
      raw
        .split(/[,,\n]/)
        .map((item) => item.trim())
        .filter(Boolean);

    const responsibilities = parseLines(responsibilitiesText);
    const requirements = parseLines(requirementsText);
    const skills = parseCommaTags(skillsText);
    const benefits = parseCommaTags(benefitsText);

    if (responsibilities.length === 0) {
      setFormError("Please list at least one responsibility.");
      return;
    }

    if (requirements.length === 0) {
      setFormError("Please list at least one requirement.");
      return;
    }

    setIsSubmitting(true);

    const uniqueId = `job-startup-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const todayDate = new Date().toISOString().split("T")[0] || "2026-09-23";

    const newJob: JobOpening = {
      id: uniqueId,
      title: title.trim(),
      startupSlug,
      startupName,
      startupTagline,
      sector,
      location: location.trim() || "Addis Ababa, Ethiopia",
      type,
      experienceLevel,
      workplaceType,
      compensation: compensation.trim() || "Competitive (Stipend / Salary)",
      postedDate: todayDate,
      deadline: deadline || "Open until filled",
      featured: isFeatured,
      department: department.trim() || "Engineering",
      computeAllocation: (computeAllocation || defaultComputePreset).trim(),
      skills: skills.length > 0 ? skills : ["AI", "Machine Learning"],
      summary: summary.trim(),
      responsibilities,
      requirements,
      niceToHave: [],
      benefits: benefits.length > 0 ? benefits : ["High-performance GPU compute access"],
      isCustomPosted: true,
      contactEmail: contactEmailOrUrl.includes("@") ? contactEmailOrUrl : undefined,
      applicationUrl: contactEmailOrUrl.startsWith("http") ? contactEmailOrUrl : undefined,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onJobCreated(newJob);
      toast.success("Job Opening Published!", {
        description: `"${newJob.title}" at ${newJob.startupName} is now live in the careers directory.`,
      });
      onClose();
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col rounded-3xl border border-border bg-card shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 px-6 py-5 sm:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
              <Sparkles className="size-3" />
              For Startups & Cohort Ventures
            </div>
            <h2 id={modalTitleId} className="mt-1.5 font-display text-xl font-bold text-foreground sm:text-2xl">
              Post a Startup Job Opening
            </h2>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Publish positions to top AAU graduates, EAII researchers, and African tech talent.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 space-y-7">
          {formError && (
            <div className="flex items-center gap-2.5 rounded-2xl border border-destructive/30 bg-destructive/10 p-3.5 text-xs font-medium text-destructive">
              <AlertCircle className="size-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Section 1: Startup Identity */}
          <div className="rounded-2xl border border-border bg-muted/20 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold text-foreground flex items-center gap-2">
                <Building2 className="size-4 text-primary" />
                1. Hiring Startup
              </span>

              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setStartupMode("incubated")}
                  className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                    startupMode === "incubated"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  Incubated Startup
                </button>
                <button
                  type="button"
                  onClick={() => setStartupMode("custom")}
                  className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                    startupMode === "custom"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  Other / New Venture
                </button>
              </div>
            </div>

            {startupMode === "incubated" ? (
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                  Select Your Incubated Venture
                </label>
                <select
                  value={selectedStartupSlug}
                  onChange={(e) => handleStartupSelect(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-medium text-foreground focus:border-primary focus:outline-hidden"
                >
                  {STARTUPS.map((startup) => (
                    <option key={startup.slug} value={startup.slug}>
                      {startup.name} — {startup.sector} ({startup.tagline})
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-[11px] text-muted-foreground">
                  Includes pre-configured living lab GPU profiles and AAU candidate routing.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    Startup / Company Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={customStartupName}
                    onChange={(e) => setCustomStartupName(e.target.value)}
                    placeholder="e.g. Addis Quantum Labs"
                    className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    Tagline / One-liner
                  </label>
                  <input
                    type="text"
                    value={customStartupTagline}
                    onChange={(e) => setCustomStartupTagline(e.target.value)}
                    placeholder="e.g. Autonomous drone delivery for rural medical hubs"
                    className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Role Details */}
          <div className="space-y-4">
            <span className="font-display text-sm font-bold text-foreground flex items-center gap-2">
              <Briefcase className="size-4 text-primary" />
              2. Position Overview
            </span>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Job Title <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Computer Vision Engineer (Crop Pathology & Satellite)"
                  className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-semibold text-foreground focus:border-primary focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Sector / Technology Domain
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-foreground focus:border-primary focus:outline-hidden"
                >
                  {SECTOR_OPTIONS.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Department / Squad
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Machine Learning Engineering"
                  className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Employment Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as JobType)}
                  className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-foreground focus:border-primary focus:outline-hidden"
                >
                  {JOB_TYPE_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Experience Level
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                  className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-foreground focus:border-primary focus:outline-hidden"
                >
                  {EXP_LEVEL_OPTIONS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Workplace Mode
                </label>
                <select
                  value={workplaceType}
                  onChange={(e) => setWorkplaceType(e.target.value as WorkplaceType)}
                  className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-foreground focus:border-primary focus:outline-hidden"
                >
                  {WORKPLACE_OPTIONS.map((wp) => (
                    <option key={wp} value={wp}>
                      {wp}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Addis Ababa (EAII Living Lab HQ) & Hawassa"
                  className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Compensation / Salary Range
                </label>
                <input
                  type="text"
                  value={compensation}
                  onChange={(e) => setCompensation(e.target.value)}
                  placeholder="e.g. $1,400 – $2,200 / month + Equity"
                  className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Application Deadline
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Compute Hardware & Lab Allocation */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Cpu className="size-4 text-primary" />
              <span className="font-display text-sm font-bold text-foreground">
                3. High-Performance GPU & Compute Allocation
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Every position backed by AI UniPod connects engineers directly to dedicated living lab hardware at EAII headquarters.
            </p>

            <select
              value={computeAllocation}
              onChange={(e) => setComputeAllocation(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-medium text-foreground focus:border-primary focus:outline-hidden"
            >
              {COMPUTE_PRESETS.map((preset) => (
                <option key={preset} value={preset}>
                  {preset}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-muted-foreground">Quick pick:</span>
              <button
                type="button"
                onClick={() =>
                  setComputeAllocation(
                    "Dedicated High-Performance GPU Workstation (256 GB RAM, RTX 6000 Ada) + 1 PB EAII Data Center Storage"
                  )
                }
                className="rounded-md border border-border bg-card px-2 py-0.5 text-[10px] text-foreground hover:bg-muted"
              >
                256 GB RTX 6000 Workstation
              </button>
              <button
                type="button"
                onClick={() =>
                  setComputeAllocation(
                    "Shared High-Performance GPU Workstation (128 GB RAM) + Living Lab Desk"
                  )
                }
                className="rounded-md border border-border bg-card px-2 py-0.5 text-[10px] text-foreground hover:bg-muted"
              >
                Shared 128 GB Workstation
              </button>
            </div>
          </div>

          {/* Section 4: Role Description & Requirements */}
          <div className="space-y-4">
            <span className="font-display text-sm font-bold text-foreground flex items-center gap-2">
              <Layers className="size-4 text-primary" />
              4. Role Summary & Requirements
            </span>

            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">
                Summary / Overview <span className="text-destructive">*</span>
              </label>
              <textarea
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Describe what your venture is building, why this role matters, and the impact across Ethiopia and Africa..."
                className="w-full rounded-xl border border-border bg-card p-3 text-xs leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Key Responsibilities (one per line) <span className="text-destructive">*</span>
                </label>
                <textarea
                  rows={4}
                  value={responsibilitiesText}
                  onChange={(e) => setResponsibilitiesText(e.target.value)}
                  placeholder="• Train and deploy foundation models&#10;• Optimize edge inference&#10;• Collaborate with EAII researchers"
                  className="w-full rounded-xl border border-border bg-card p-3 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Key Requirements (one per line) <span className="text-destructive">*</span>
                </label>
                <textarea
                  rows={4}
                  value={requirementsText}
                  onChange={(e) => setRequirementsText(e.target.value)}
                  placeholder="• 2+ years experience in PyTorch or TensorFlow&#10;• Degree in Computer Science, AI, or Engineering&#10;• Strong communication skills"
                  className="w-full rounded-xl border border-border bg-card p-3 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Key Skills & Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                  placeholder="PyTorch, YOLOv9, ROS2, FastAPI, Docker, Amharic NLP"
                  className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Benefits & Living Lab Perks (comma separated)
                </label>
                <input
                  type="text"
                  value={benefitsText}
                  onChange={(e) => setBenefitsText(e.target.value)}
                  placeholder="High-Performance GPU Workstation, Living Lab Desk, timbuktoo Founder Network"
                  className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Application Channel */}
          <div className="space-y-4">
            <span className="font-display text-sm font-bold text-foreground flex items-center gap-2">
              <Send className="size-4 text-primary" />
              5. Application Handling
            </span>

            <div className="grid gap-4 sm:grid-cols-2 items-center">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Contact Email or Application Portal URL (Optional)
                </label>
                <input
                  type="text"
                  value={contactEmailOrUrl}
                  onChange={(e) => setContactEmailOrUrl(e.target.value)}
                  placeholder="e.g. jobs@meklitai.com or https://meklitai.com/apply"
                  className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
                <p className="mt-1 text-[11px] text-muted-foreground">
                  If left blank, candidates will submit applications through the integrated AI UniPod portal.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-muted/30 p-3.5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="size-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <div>
                    <p className="text-xs font-semibold text-foreground">Mark as Featured Opening</p>
                    <p className="text-[11px] text-muted-foreground">
                      Pins this position to the top with an ecosystem priority badge.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </form>

        {/* Modal Footer / Actions */}
        <div className="flex items-center justify-between border-t border-border/80 bg-card px-6 py-4 sm:px-8">
          <Button type="button" variant="outline" onClick={onClose} className="rounded-xl text-xs">
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-xl px-5 text-xs font-semibold shadow-sm gap-2"
          >
            {isSubmitting ? (
              <>Publishing Opening...</>
            ) : (
              <>
                <Rocket className="size-3.5" />
                Publish Job Opening
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
