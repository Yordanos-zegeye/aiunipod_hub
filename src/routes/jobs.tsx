import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Building,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  Cpu,
  DollarSign,
  ExternalLink,
  Eye,
  FileCheck,
  FileText,
  Filter,
  Globe2,
  GraduationCap,
  Grid3X3,
  Heart,
  Layers,
  List,
  MapPin,
  Plus,
  PlusCircle,
  Rocket,
  RotateCcw,
  Search,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  UserCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";

import { PostJobModal } from "@/components/jobs/PostJobModal";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Button } from "@/components/ui/button";
import { JOB_OPENINGS, type JobOpening, type JobType, type ExperienceLevel, type WorkplaceType } from "@/data/jobs";
import { STARTUPS } from "@/data/startups";

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Startup Jobs & Fellowships — AI UNIPOD Ethiopia Careers" },
      {
        name: "description",
        content:
          "Explore and apply for high-impact AI engineering, machine learning research, and fellowship opportunities across startups incubated at AI UniPod Ethiopia with high-performance GPU compute.",
      },
      { property: "og:title", content: "AI UNIPOD Ethiopia Startup Jobs & Fellowships" },
      {
        property: "og:description",
        content: "Build sovereign African AI. Apply to top venture openings in healthcare, agriculture, NLP, and climate.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: StartupJobsPage,
});

interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  yearsExperience: string;
  portfolioUrl: string;
  resumeFileName: string;
  coverNote: string;
  startDate: string;
  agreedToDataPolicy: boolean;
}

const INITIAL_FORM_DATA: ApplicationFormData = {
  fullName: "",
  email: "",
  phone: "",
  location: "Addis Ababa, Ethiopia",
  yearsExperience: "2-4 years",
  portfolioUrl: "",
  resumeFileName: "resume.pdf",
  coverNote: "",
  startDate: "Immediately",
  agreedToDataPolicy: false,
};

function StartupJobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [selectedWorkplace, setSelectedWorkplace] = useState("All");
  const [selectedStartup, setSelectedStartup] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"featured" | "newest" | "title">("featured");

  // State for bookmarks
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("unipod_saved_jobs");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Modals & Application Step State
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<JobOpening | null>(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobOpening | null>(null);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [applicationStep, setApplicationStep] = useState<1 | 2 | 3>(1);
  const [applicationSuccessCode, setApplicationSuccessCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ApplicationFormData>(INITIAL_FORM_DATA);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedShareId, setCopiedShareId] = useState<string | null>(null);

  // Custom startup-posted jobs persisted in localStorage
  const [customJobs, setCustomJobs] = useState<JobOpening[]>(() => {
    try {
      const saved = localStorage.getItem("unipod_posted_jobs");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const allJobs = useMemo(() => {
    return [...customJobs, ...JOB_OPENINGS];
  }, [customJobs]);

  const handleJobCreated = (newJob: JobOpening) => {
    setCustomJobs((prev) => {
      const updated = [newJob, ...prev];
      try {
        localStorage.setItem("unipod_posted_jobs", JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
    // Reset filters to ensure the newly posted job is shown
    setSearchQuery("");
    setSelectedSector("All");
    setSelectedType("All");
    setSelectedExperience("All");
    setSelectedWorkplace("All");
    setSelectedStartup("All");
    setShowSavedOnly(false);
    setSortBy("newest");
  };

  const handleDeleteCustomJob = (jobId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (window.confirm("Are you sure you want to remove this custom job posting?")) {
      setCustomJobs((prev) => {
        const updated = prev.filter((j) => j.id !== jobId);
        try {
          localStorage.setItem("unipod_posted_jobs", JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
      if (selectedJobForDetails?.id === jobId) setSelectedJobForDetails(null);
      if (selectedJobForApply?.id === jobId) setSelectedJobForApply(null);
    }
  };

  // Toggle saved job
  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const updated = prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId];
      try {
        localStorage.setItem("unipod_saved_jobs", JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  };

  const copyJobShareLink = (jobId: string) => {
    const url = `${window.location.origin}/jobs?job=${jobId}`;
    navigator.clipboard.writeText(url);
    setCopiedShareId(jobId);
    setTimeout(() => setCopiedShareId(null), 2000);
  };

  // Derive unique filter lists
  const sectors = useMemo(() => {
    return ["All", ...Array.from(new Set(allJobs.map((j) => j.sector)))];
  }, [allJobs]);

  const jobTypes = useMemo(() => {
    return ["All", "Full-time", "Fellowship", "Internship", "Contract", "Part-time"];
  }, []);

  const experienceLevels = useMemo(() => {
    return ["All", "Entry Level", "Mid-Level", "Senior", "Lead / Principal", "Fellowship"];
  }, []);

  const workplaces = useMemo(() => {
    return ["All", "On-site", "Hybrid", "Remote (Ethiopia)"];
  }, []);

  const startupsList = useMemo(() => {
    return ["All", ...Array.from(new Set(allJobs.map((j) => j.startupName)))];
  }, [allJobs]);

  // Filtered & sorted jobs
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      // Saved filter
      if (showSavedOnly && !savedJobIds.includes(job.id)) return false;

      // Text search
      if (deferredSearch.trim()) {
        const q = deferredSearch.toLowerCase();
        const matchTitle = job.title.toLowerCase().includes(q);
        const matchCompany = job.startupName.toLowerCase().includes(q);
        const matchSector = job.sector.toLowerCase().includes(q);
        const matchSummary = job.summary.toLowerCase().includes(q);
        const matchSkills = job.skills.some((s) => s.toLowerCase().includes(q));
        const matchReqs = job.requirements.some((r) => r.toLowerCase().includes(q));
        if (!matchTitle && !matchCompany && !matchSector && !matchSummary && !matchSkills && !matchReqs) {
          return false;
        }
      }

      // Dropdown filters
      if (selectedSector !== "All" && job.sector !== selectedSector) return false;
      if (selectedType !== "All" && job.type !== selectedType) return false;
      if (selectedExperience !== "All" && job.experienceLevel !== selectedExperience) return false;
      if (selectedWorkplace !== "All" && job.workplaceType !== selectedWorkplace) return false;
      if (selectedStartup !== "All" && job.startupName !== selectedStartup) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "featured") {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      }
      if (sortBy === "newest") {
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [
    deferredSearch,
    selectedSector,
    selectedType,
    selectedExperience,
    selectedWorkplace,
    selectedStartup,
    showSavedOnly,
    savedJobIds,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedSector("All");
    setSelectedType("All");
    setSelectedExperience("All");
    setSelectedWorkplace("All");
    setSelectedStartup("All");
    setShowSavedOnly(false);
    setSortBy("featured");
  };

  const openApplyModal = (job: JobOpening) => {
    setSelectedJobForApply(job);
    setApplicationStep(1);
    setApplicationSuccessCode(null);
    setIsSubmitting(false);
  };

  const handleNextStep = () => {
    if (applicationStep === 1) {
      if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
        alert("Please provide your full name, email address, and phone number to continue.");
        return;
      }
      setApplicationStep(2);
    } else if (applicationStep === 2) {
      setApplicationStep(3);
    }
  };

  const handlePrevStep = () => {
    if (applicationStep === 3) {
      setApplicationStep(2);
    } else if (applicationStep === 2) {
      setApplicationStep(1);
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (applicationStep < 3) {
      handleNextStep();
      return;
    }

    if (!formData.agreedToDataPolicy) {
      alert("Please review and check the data governance framework confirmation before submitting.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const code = `UNIPOD-AI-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      setApplicationSuccessCode(code);
    }, 1000);
  };

  const copyApplicationCode = () => {
    if (!applicationSuccessCode) return;
    navigator.clipboard.writeText(applicationSuccessCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const activeFilterCount =
    (selectedSector !== "All" ? 1 : 0) +
    (selectedType !== "All" ? 1 : 0) +
    (selectedExperience !== "All" ? 1 : 0) +
    (selectedWorkplace !== "All" ? 1 : 0) +
    (selectedStartup !== "All" ? 1 : 0) +
    (showSavedOnly ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="min-h-screen bg-background font-body text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      {/* 1. Global Navigation Header */}
      <LandingHeader />

      <main className="pt-24 sm:pt-28 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-linear-to-b from-primary/5 via-background to-background py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 contain-strict overflow-hidden">
            <div className="absolute -top-32 right-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl transform-gpu will-change-transform" />
            <div className="absolute bottom-0 left-10 h-64 w-64 rounded-full bg-secondary/60 blur-3xl transform-gpu will-change-transform" />
          </div>

          <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            {/* Breadcrumb back to Startups or Home */}
            <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
              <span>/</span>
              <Link to="/startups" className="transition-colors hover:text-foreground">
                Startups
              </Link>
              <span>/</span>
              <span className="font-medium text-foreground">Jobs & Fellowships</span>
            </div>

            <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">
              <div>

                <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Build the future of <span className="text-primary">African AI.</span>
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Join high-impact engineering teams, clinical researchers, and climate fellows across ventures incubated at <strong>AI UniPod Ethiopia</strong>. Build sovereign models with direct access to <strong>high-performance GPU workstations</strong> and the EAII central data center.
                </p>

                {/* Search Bar & Post a Job CTA in Hero */}
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-2xl">
                  <div className="flex flex-1 items-center rounded-2xl border border-border bg-card p-2 shadow-sm transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                    <Search className="ml-3 size-5 text-muted-foreground shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by role, skills (e.g. PyTorch, YOLOv9, Whisper), or startup..."
                      className="w-full bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="mr-2 rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                      >
                        <X className="size-4" />
                      </button>
                    )}
                    <Button size="sm" className="rounded-xl px-4 text-xs font-semibold">
                      Search
                    </Button>
                  </div>

                  <Button
                    type="button"
                    onClick={() => setIsPostJobModalOpen(true)}
                    className="h-12 rounded-2xl px-5 text-xs font-bold shadow-sm gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
                  >
                    <Plus className="size-4" />
                    Post a Job
                  </Button>
                </div>
              </div>

              {/* Ecosystem Quick Telemetry Card */}
              <div className="rounded-3xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur-md sm:p-8">
                <div className="flex items-center justify-between border-b border-border/80 pb-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="size-4 text-primary" />
                    <span className="font-display text-sm font-bold">Ecosystem Recruitment</span>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                    2026 Batch
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
                    <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                      {allJobs.length}
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">Active Openings</p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
                    <p className="font-display text-2xl font-bold text-primary sm:text-3xl">
                      {STARTUPS.length}
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">Hiring Startups</p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
                    <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                      10x
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">AI GPU Workstations</p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
                    <p className="font-display text-2xl font-bold text-emerald-600 sm:text-3xl">
                      30%
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">Women Target (Sec 3)</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/80 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-foreground">Hiring for your startup?</p>
                    <p className="text-[11px] text-muted-foreground">Free ecosystem listing for cohort ventures.</p>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setIsPostJobModalOpen(true)}
                    size="sm"
                    variant="outline"
                    className="rounded-xl text-xs font-semibold border-primary/30 text-primary hover:bg-primary/10 shrink-0"
                  >
                    Post an Opening <ChevronRight className="ml-1 size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Filter Tag Pills */}
        <section className="border-b border-border bg-muted/30 py-3">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
              <span className="font-semibold text-muted-foreground shrink-0 mr-1">Quick Filters:</span>
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                }}
                className={`shrink-0 rounded-full px-3 py-1 font-medium transition-colors ${activeFilterCount === 0 ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-accent"
                  }`}
              >
                All Openings ({allJobs.length})
              </button>
              {customJobs.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    resetFilters();
                  }}
                  className="shrink-0 inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-600 dark:text-emerald-400"
                >
                  <Sparkles className="size-3" /> Startup Posts ({customJobs.length})
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setSelectedSector("AgriTech");
                  setShowSavedOnly(false);
                }}
                className={`shrink-0 rounded-full px-3 py-1 font-medium transition-colors ${selectedSector === "AgriTech" ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-accent"
                  }`}
              >
                AgriTech
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedSector("Health AI");
                  setShowSavedOnly(false);
                }}
                className={`shrink-0 rounded-full px-3 py-1 font-medium transition-colors ${selectedSector === "Health AI" ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-accent"
                  }`}
              >
                Health AI
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedSector("Language AI");
                  setShowSavedOnly(false);
                }}
                className={`shrink-0 rounded-full px-3 py-1 font-medium transition-colors ${selectedSector === "Language AI" ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-accent"
                  }`}
              >
                Language AI
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedType("Fellowship");
                  setShowSavedOnly(false);
                }}
                className={`shrink-0 rounded-full px-3 py-1 font-medium transition-colors ${selectedType === "Fellowship" ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-accent"
                  }`}
              >
                Fellowships
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedType("Internship");
                  setShowSavedOnly(false);
                }}
                className={`shrink-0 rounded-full px-3 py-1 font-medium transition-colors ${selectedType === "Internship" ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-accent"
                  }`}
              >
                Internships
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("GPU Compute");
                  setShowSavedOnly(false);
                }}
                className={`shrink-0 inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium transition-colors ${searchQuery === "GPU Compute" ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-accent"
                  }`}
              >
                <Cpu className="size-3 text-primary" /> GPU Compute
              </button>
            </div>
          </div>
        </section>

        {/* Filter Controls & Views Bar */}
        <section className="sticky top-[56px] sm:top-[60px] z-30 border-b border-border bg-background/95 py-3.5 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Left: Filter Dropdowns */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Sector Filter */}
                <select
                  aria-label="Filter by sector"
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground focus:border-primary focus:outline-hidden"
                >
                  <option value="All">All Sectors ({sectors.length - 1})</option>
                  {sectors
                    .filter((s) => s !== "All")
                    .map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                </select>

                {/* Job Type Filter */}
                <select
                  aria-label="Filter by job type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground focus:border-primary focus:outline-hidden"
                >
                  <option value="All">All Types</option>
                  {jobTypes
                    .filter((t) => t !== "All")
                    .map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                </select>

                {/* Experience Filter */}
                <select
                  aria-label="Filter by experience level"
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground focus:border-primary focus:outline-hidden"
                >
                  <option value="All">All Experience</option>
                  {experienceLevels
                    .filter((exp) => exp !== "All")
                    .map((exp) => (
                      <option key={exp} value={exp}>
                        {exp}
                      </option>
                    ))}
                </select>

                {/* Workplace Filter */}
                <select
                  aria-label="Filter by workplace type"
                  value={selectedWorkplace}
                  onChange={(e) => setSelectedWorkplace(e.target.value)}
                  className="rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground focus:border-primary focus:outline-hidden"
                >
                  <option value="All">All Workplaces</option>
                  {workplaces
                    .filter((wp) => wp !== "All")
                    .map((wp) => (
                      <option key={wp} value={wp}>
                        {wp}
                      </option>
                    ))}
                </select>

                {/* Startup Filter */}
                <select
                  aria-label="Filter by startup or hub"
                  value={selectedStartup}
                  onChange={(e) => setSelectedStartup(e.target.value)}
                  className="rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground focus:border-primary focus:outline-hidden hidden md:block"
                >
                  <option value="All">All Companies</option>
                  {startupsList
                    .filter((s) => s !== "All")
                    .map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                </select>

                {/* Reset Filters */}
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1 rounded-xl bg-muted px-2.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <RotateCcw className="size-3.5" />
                    <span>Reset ({activeFilterCount})</span>
                  </button>
                )}
              </div>

              {/* Right: Post a Job CTA, Saved Tab & View Mode */}
              <div className="flex items-center gap-2 sm:gap-3">
                <Button
                  type="button"
                  onClick={() => setIsPostJobModalOpen(true)}
                  size="sm"
                  className="rounded-xl px-3 sm:px-3.5 py-2 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xs gap-1.5"
                >
                  <Plus className="size-3.5" />
                  <span className="hidden sm:inline">Post a Job</span>
                  <span className="sm:hidden">Post</span>
                </Button>

                {/* Bookmarked Filter Pill */}
                <button
                  type="button"
                  onClick={() => setShowSavedOnly(!showSavedOnly)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${showSavedOnly
                    ? "border-primary bg-primary text-primary-foreground shadow-xs"
                    : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                >
                  {showSavedOnly ? <BookmarkCheck className="size-3.5" /> : <Bookmark className="size-3.5" />}
                  <span>Saved ({savedJobIds.length})</span>
                </button>

                {/* Sort By */}
                <select
                  aria-label="Sort jobs by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground focus:border-primary focus:outline-hidden"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest First</option>
                  <option value="title">Title (A-Z)</option>
                </select>

                {/* View Mode Toggle */}
                <div className="hidden items-center rounded-xl border border-border bg-card p-1 sm:flex">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                    className={`rounded-lg p-1.5 transition-colors ${viewMode === "grid"
                      ? "bg-primary text-primary-foreground shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <Grid3X3 className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                    className={`rounded-lg p-1.5 transition-colors ${viewMode === "list"
                      ? "bg-primary text-primary-foreground shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <List className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Jobs Listing Section */}
        <section className="mt-8 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          {/* Startup Recruitment Acceleration Banner */}
          <div className="mb-8 rounded-3xl border border-primary/20 bg-linear-to-r from-primary/10 via-card to-background p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary">
                  <Rocket className="size-3.5" />
                  Venture Talent Accelerator
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                  Hiring for your startup or AI research team?
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Post openings directly to 2,400+ AAU and EAII engineers, data scientists, and African researchers. Every recruited candidate receives access to high-performance GPU workstations at the Addis Ababa Living Lab.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Button
                  type="button"
                  onClick={() => setIsPostJobModalOpen(true)}
                  className="rounded-2xl px-6 py-5 text-xs sm:text-sm font-bold shadow-md gap-2"
                >
                  <Plus className="size-4" />
                  Post a Startup Opening
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Showing <span className="text-foreground">{filteredJobs.length}</span> open{" "}
              {filteredJobs.length === 1 ? "position" : "positions"}
              {showSavedOnly && " in your saved list"}
            </p>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Priority consideration for Ethiopian nationals & female engineers (Sec 3)
            </p>
          </div>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <div className="mt-12 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-muted text-muted-foreground">
                <Search className="size-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-foreground">No matching positions found</h3>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                Try adjusting your search criteria, clearing sector filters, or disabling the saved jobs toggle.
              </p>
              <Button onClick={resetFilters} variant="outline" size="sm" className="mt-6 rounded-xl">
                Reset All Filters
              </Button>
            </div>
          )}

          {/* Grid View */}
          {viewMode === "grid" && filteredJobs.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => {
                const isSaved = savedJobIds.includes(job.id);
                const isShared = copiedShareId === job.id;
                return (
                  <div
                    key={job.id}
                    className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-7 shadow-xs transition-[transform,border-color,box-shadow] duration-150 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                            {job.sector}
                          </span>
                          {job.isCustomPosted && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                              <Sparkles className="size-2.5" /> Startup Posted
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          {job.featured && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600">
                              <Sparkles className="size-2.5" /> Featured
                            </span>
                          )}
                          {job.isCustomPosted && (
                            <button
                              type="button"
                              onClick={(e) => handleDeleteCustomJob(job.id, e)}
                              title="Delete this custom post"
                              aria-label="Delete job posting"
                              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="size-4 text-destructive/80" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => copyJobShareLink(job.id)}
                            title="Copy direct link"
                            aria-label="Share position"
                            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          >
                            {isShared ? <Check className="size-4 text-emerald-600" /> : <Share2 className="size-4" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleSaveJob(job.id)}
                            aria-label={isSaved ? "Unsave job" : "Save job"}
                            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          >
                            {isSaved ? (
                              <BookmarkCheck className="size-4 text-primary" />
                            ) : (
                              <Bookmark className="size-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Job Title & Company */}
                      <h3
                        onClick={() => setSelectedJobForDetails(job)}
                        className="mt-4 font-display text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors cursor-pointer"
                      >
                        {job.title}
                      </h3>

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 truncate">
                          <Building className="size-3.5 text-muted-foreground shrink-0" />
                          <span className="text-xs font-semibold text-foreground truncate">{job.startupName}</span>
                        </div>
                        {job.startupSlug !== "unipod-central" && (
                          <Link
                            to="/$startupSlug"
                            params={{ startupSlug: job.startupSlug }}
                            className="shrink-0 text-[11px] font-semibold text-primary hover:underline inline-flex items-center gap-1"
                          >
                            View Startup <ArrowUpRight className="size-3" />
                          </Link>
                        )}
                      </div>

                      {/* Key Attributes Tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5 text-[11px] font-medium text-muted-foreground">
                        <span className="inline-flex items-center gap-1 rounded-lg bg-muted px-2 py-0.5">
                          <MapPin className="size-3 text-primary" /> {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-lg bg-muted px-2 py-0.5">
                          <Briefcase className="size-3 text-primary" /> {job.type}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-lg bg-muted px-2 py-0.5">
                          <Globe2 className="size-3 text-primary" /> {job.workplaceType}
                        </span>
                      </div>

                      {/* Skills Tags */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {job.skills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md border border-border/80 bg-secondary/50 px-2 py-0.5 text-[10px] font-mono text-foreground/80"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 4 && (
                          <span className="rounded-md border border-border/80 bg-secondary/50 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                            +{job.skills.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Summary */}
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {job.summary}
                      </p>

                      {/* Compute Allocation Tag */}
                      <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-2.5 text-[11px] text-foreground/80 flex items-start gap-2">
                        <Cpu className="size-3.5 text-primary shrink-0 mt-0.5" />
                        <span className="line-clamp-2"><strong>Compute:</strong> {job.computeAllocation}</span>
                      </div>
                    </div>

                    {/* Card Footer: Compensation & Actions */}
                    <div className="mt-6 border-t border-border/70 pt-4">
                      <div className="flex items-center justify-between text-xs mb-3.5">
                        <span className="font-semibold text-foreground">{job.compensation}</span>
                        <span className="text-muted-foreground text-[11px]">Due: {job.deadline}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedJobForDetails(job)}
                          className="rounded-xl text-xs font-semibold"
                        >
                          <Eye className="mr-1.5 size-3.5" /> Details
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => openApplyModal(job)}
                          className="rounded-xl text-xs font-semibold shadow-xs"
                        >
                          Apply Now <ArrowUpRight className="ml-1 size-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* List View */}
          {viewMode === "list" && filteredJobs.length > 0 && (
            <div className="space-y-4">
              {filteredJobs.map((job) => {
                const isSaved = savedJobIds.includes(job.id);
                return (
                  <div
                    key={job.id}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-2xs transition-[border-color,box-shadow] duration-150 hover:border-primary/40 hover:shadow-xs md:flex-row md:items-center"
                  >
                    <div className="space-y-1.5 md:max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                          {job.sector}
                        </span>
                        {job.isCustomPosted && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                            <Sparkles className="size-2.5" /> Startup Posted
                          </span>
                        )}
                        <span className="text-xs font-bold text-foreground">{job.startupName}</span>
                        <span className="text-muted-foreground text-xs">·</span>
                        <span className="text-xs text-muted-foreground">{job.workplaceType}</span>
                        {job.featured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600">
                            <Sparkles className="size-2.5" /> Featured
                          </span>
                        )}
                      </div>

                      <h3
                        onClick={() => setSelectedJobForDetails(job)}
                        className="cursor-pointer font-display text-lg font-bold text-foreground hover:text-primary transition-colors"
                      >
                        {job.title}
                      </h3>

                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {job.summary}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground pt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3 text-primary" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="size-3 text-primary" /> {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Cpu className="size-3 text-primary" /> GPU Workstation
                        </span>
                        <span className="font-semibold text-foreground">{job.compensation}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {job.isCustomPosted && (
                        <button
                          type="button"
                          onClick={(e) => handleDeleteCustomJob(job.id, e)}
                          title="Delete this custom post"
                          aria-label="Delete job posting"
                          className="rounded-xl border border-border p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="size-4 text-destructive/80" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleSaveJob(job.id)}
                        aria-label={isSaved ? "Unsave job" : "Save job"}
                        className="rounded-xl border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {isSaved ? (
                          <BookmarkCheck className="size-4 text-primary" />
                        ) : (
                          <Bookmark className="size-4" />
                        )}
                      </button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedJobForDetails(job)}
                        className="rounded-xl text-xs"
                      >
                        Details
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => openApplyModal(job)}
                        className="rounded-xl text-xs font-semibold"
                      >
                        Apply <ArrowUpRight className="ml-1 size-3.5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Section 3: Women in AI Hiring Priority Callout */}
        <section className="mt-16 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/20 text-emerald-600 shrink-0">
                  <GraduationCap className="size-6" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-foreground">
                    Section 3 Mandate: 30%+ Women in AI Participation
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm max-w-2xl">
                    Per the Strategic Concept Note, AI UniPod Ethiopia actively prioritizes female machine learning engineers, data scientists, and startup co-founders. Female candidates receive dedicated mentorship from international faculty and computing allocations.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedExperience("Entry Level")}
                className="rounded-xl shrink-0 self-start md:self-auto text-xs"
              >
                View Entry & Fellow Roles
              </Button>
            </div>
          </div>
        </section>

        {/* Employer Hiring Callout */}
        <section className="mt-12 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="rounded-3xl border border-primary/20 bg-linear-to-br from-primary/5 via-background to-secondary/30 p-8 sm:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  For Incubated Founders & R&D Labs
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
                  Are you an AI UniPod startup ready to expand your engineering team?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Incubated ventures receive full recruitment facilitation through Addis Ababa University, the Ethiopian AI Institute talent network, and pan-African timbuktoo developer syndicates.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Button asChild size="lg" className="rounded-2xl px-6 text-sm font-semibold">
                  <Link to="/login">
                    Post a Position <ArrowUpRight className="ml-1.5 size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-2xl text-sm">
                  <Link to="/startups">View All Startups</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 2. Job Details Modal */}
      {selectedJobForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-2xl">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedJobForDetails(null)}
              aria-label="Close modal"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-border bg-background/80 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <X className="size-4" />
            </button>

            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-primary/10 px-3 py-1 font-bold text-primary">
                  {selectedJobForDetails.sector}
                </span>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 font-semibold text-foreground">
                  {selectedJobForDetails.type}
                </span>
                <span className="rounded-full bg-muted px-2.5 py-0.5 font-medium text-muted-foreground">
                  {selectedJobForDetails.workplaceType}
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">Posted {selectedJobForDetails.postedDate}</span>
              </div>

              <h2 className="mt-4 font-display text-2xl font-bold text-foreground sm:text-3xl">
                {selectedJobForDetails.title}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-semibold text-foreground/90">
                <div className="flex items-center gap-1.5">
                  <Building className="size-4 text-primary" />
                  <span>{selectedJobForDetails.startupName}</span>
                  {selectedJobForDetails.startupSlug !== "unipod-central" && (
                    <Link
                      to="/$startupSlug"
                      params={{ startupSlug: selectedJobForDetails.startupSlug }}
                      className="ml-1 text-[11px] font-semibold text-primary hover:underline inline-flex items-center gap-0.5"
                    >
                      (Visit Startup <ArrowUpRight className="size-3" />)
                    </Link>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-4 text-primary" />
                  <span>{selectedJobForDetails.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="size-4 text-primary" />
                  <span>{selectedJobForDetails.compensation}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <span>Experience: <strong className="text-foreground">{selectedJobForDetails.experienceLevel}</strong></span>
                </div>
              </div>
            </div>

            {/* Compute Environment Box */}
            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                <Cpu className="size-4" />
                <span>Computing Allocation & Hardware Environment</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-foreground sm:text-sm">
                {selectedJobForDetails.computeAllocation}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Located in the 800 m² living lab at EAII Headquarters, central Addis Ababa, equipped with high-performance GPU systems and 1 Petabyte secure government AI data center storage.
              </p>
            </div>

            {/* Tech Stack Chips */}
            <div className="mt-6">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Required Technical Stack & Frameworks
              </h4>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {selectedJobForDetails.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border bg-secondary/60 px-2.5 py-1 text-xs font-mono font-medium text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="mt-6">
              <h4 className="font-display text-base font-bold text-foreground">Role Overview</h4>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {selectedJobForDetails.summary}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="mt-6">
              <h4 className="font-display text-base font-bold text-foreground">Core Responsibilities</h4>
              <ul className="mt-3 space-y-2">
                {selectedJobForDetails.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="mt-6">
              <h4 className="font-display text-base font-bold text-foreground">Requirements & Qualifications</h4>
              <ul className="mt-3 space-y-2">
                {selectedJobForDetails.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nice to Have */}
            {selectedJobForDetails.niceToHave.length > 0 && (
              <div className="mt-6">
                <h4 className="font-display text-base font-bold text-foreground">Preferred / Nice-to-Have</h4>
                <ul className="mt-3 space-y-2">
                  {selectedJobForDetails.niceToHave.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            <div className="mt-6">
              <h4 className="font-display text-base font-bold text-foreground">Benefits & Hub Ecosystem Perks</h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {selectedJobForDetails.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-foreground/80">
                    <Sparkles className="size-3.5 shrink-0 text-amber-500 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>
                  Application Deadline: <strong>{selectedJobForDetails.deadline}</strong>
                </p>
                {selectedJobForDetails.contactEmail && (
                  <p>
                    Contact: <span className="font-semibold text-foreground">{selectedJobForDetails.contactEmail}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedJobForDetails(null)}
                  className="rounded-xl"
                >
                  Close
                </Button>
                {selectedJobForDetails.applicationUrl ? (
                  <Button
                    asChild
                    className="rounded-xl font-semibold shadow-sm"
                  >
                    <a
                      href={selectedJobForDetails.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply on Company Site <ExternalLink className="ml-1.5 size-4" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      const job = selectedJobForDetails;
                      setSelectedJobForDetails(null);
                      if (job) openApplyModal(job);
                    }}
                    className="rounded-xl font-semibold shadow-sm"
                  >
                    Apply for this Position <ArrowUpRight className="ml-1 size-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Multi-Step Application Submission Flow Modal */}
      {selectedJobForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-2xl">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedJobForApply(null)}
              aria-label="Close modal"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-border bg-background/80 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <X className="size-4" />
            </button>

            {/* If Application Succeeded */}
            {applicationSuccessCode ? (
              <div className="text-center py-6">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <Check className="size-8" />
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold text-foreground sm:text-3xl">
                  Application Submitted Successfully!
                </h3>

                <p className="mt-3 max-w-md mx-auto text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  Your application for <strong>{selectedJobForApply.title}</strong> at <strong>{selectedJobForApply.startupName}</strong> has been transmitted directly to the hiring committee and the AI UniPod Talent Office.
                </p>

                {/* Reference Code Box */}
                <div className="mt-6 max-w-sm mx-auto rounded-2xl border border-primary/20 bg-primary/5 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Application Tracking Code:
                  </p>
                  <p className="mt-1 font-mono text-xl font-bold text-primary">
                    {applicationSuccessCode}
                  </p>
                  <button
                    type="button"
                    onClick={copyApplicationCode}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="size-3.5 text-emerald-600" /> Copied to Clipboard!
                      </>
                    ) : (
                      <>
                        <Share2 className="size-3.5" /> Copy Tracking Reference
                      </>
                    )}
                  </button>
                </div>

                {/* Next Steps */}
                <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-5 text-left text-xs leading-relaxed text-muted-foreground">
                  <p className="font-semibold text-foreground text-sm mb-2">What happens next?</p>
                  <ol className="list-decimal list-inside space-y-1.5">
                    <li>Technical screening by {selectedJobForApply.startupName} lead engineers within 7 business days.</li>
                    <li>Shortlisted candidates will be invited for a practical coding & model benchmark on the UniPod's high-performance workstations at EAII headquarters.</li>
                    <li>Final cohort placement and formal onboarding through UNDP timbuktoo.</li>
                  </ol>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedJobForApply(null);
                      setApplicationSuccessCode(null);
                    }}
                    className="rounded-xl"
                  >
                    Browse More Openings
                  </Button>
                  <Button
                    asChild
                    className="rounded-xl"
                  >
                    <Link to="/startups">View All Startups</Link>
                  </Button>
                </div>
              </div>
            ) : (
              /* Multi-step Application Form */
              <div>
                <div className="border-b border-border pb-4">
                  {/* Interactive Step Navigator */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { step: 1, title: "1. Profile", desc: "Personal info" },
                      { step: 2, title: "2. Technical", desc: "Experience & CV" },
                      { step: 3, title: "3. Review", desc: "Statement & Submit" },
                    ].map((s) => {
                      const isActive = applicationStep === s.step;
                      const isCompleted = applicationStep > s.step;
                      const isClickable =
                        s.step <= applicationStep ||
                        (s.step === 2 && Boolean(formData.fullName.trim() && formData.email.trim() && formData.phone.trim()));

                      return (
                        <button
                          key={s.step}
                          type="button"
                          disabled={!isClickable}
                          onClick={() => {
                            if (isClickable) {
                              setApplicationStep(s.step as 1 | 2 | 3);
                            }
                          }}
                          className={`flex items-center gap-2 rounded-xl border p-2.5 text-left transition-all ${isActive
                            ? "border-primary bg-primary/10 text-primary font-semibold shadow-xs"
                            : isCompleted
                              ? "border-emerald-500/40 bg-emerald-500/5 text-foreground hover:bg-emerald-500/10 cursor-pointer"
                              : "border-border/60 bg-muted/20 text-muted-foreground opacity-60 cursor-not-allowed"
                            }`}
                        >
                          <div
                            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${isActive
                              ? "bg-primary text-primary-foreground"
                              : isCompleted
                                ? "bg-emerald-600 text-white"
                                : "bg-muted text-muted-foreground"
                              }`}
                          >
                            {isCompleted ? <Check className="size-3" /> : s.step}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold leading-tight">{s.title}</p>
                            <p className="hidden sm:block truncate text-[10px] text-muted-foreground leading-tight">
                              {s.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${(applicationStep / 3) * 100}%` }}
                    />
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-foreground sm:text-2xl">
                    {selectedJobForApply.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {selectedJobForApply.startupName} · {selectedJobForApply.location} ({selectedJobForApply.workplaceType})
                  </p>
                </div>

                <form
                  onSubmit={handleApplySubmit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "TEXTAREA") {
                      e.preventDefault();
                      if (applicationStep < 3) {
                        handleNextStep();
                      }
                    }
                  }}
                  className="mt-6 space-y-5"
                >
                  {/* Step 1: Personal Info */}
                  {applicationStep === 1 && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-xs font-semibold text-foreground">
                            Full Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="e.g. Bethlehem Tadesse"
                            className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-foreground">
                            Email Address <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="bethlehem@example.com"
                            className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-xs font-semibold text-foreground">
                            Phone Number <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+251 91 123 4567"
                            className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-foreground">
                            Current City / Location <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="Addis Ababa, Hawassa, Bahir Dar..."
                            className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Experience & Links */}
                  {applicationStep === 2 && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-xs font-semibold text-foreground">
                            Years of Relevant Experience
                          </label>
                          <select
                            value={formData.yearsExperience}
                            onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-hidden"
                          >
                            <option value="Recent Graduate / < 1 year">Recent Graduate / &lt; 1 year</option>
                            <option value="1-2 years">1-2 years</option>
                            <option value="2-4 years">2-4 years</option>
                            <option value="5+ years">5+ years</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-foreground">
                            Earliest Availability
                          </label>
                          <select
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-hidden"
                          >
                            <option value="Immediately">Immediately</option>
                            <option value="Within 2 weeks">Within 2 weeks</option>
                            <option value="Within 1 month">Within 1 month</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-foreground">
                          GitHub, LinkedIn, or Portfolio URL
                        </label>
                        <input
                          type="url"
                          value={formData.portfolioUrl}
                          onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                          placeholder="https://github.com/yourhandle or https://linkedin.com/in/..."
                          className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden"
                        />
                      </div>

                      {/* Resume Upload Simulation */}
                      <div>
                        <label className="text-xs font-semibold text-foreground">
                          Resume / Curriculum Vitae (PDF) <span className="text-rose-500">*</span>
                        </label>
                        <div className="mt-1.5 flex items-center justify-between rounded-xl border border-dashed border-border bg-muted/20 px-4 py-3">
                          <div className="flex items-center gap-2 text-xs text-foreground">
                            <FileCheck className="size-4 text-emerald-600" />
                            <span>{formData.resumeFileName}</span>
                          </div>
                          <label className="cursor-pointer rounded-lg bg-card px-3 py-1 text-xs font-semibold text-primary border border-border hover:bg-accent">
                            Choose File
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setFormData({ ...formData, resumeFileName: file.name });
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Cover Note & Review */}
                  {applicationStep === 3 && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      <div>
                        <label className="text-xs font-semibold text-foreground">
                          Statement of Interest / Research Motivation
                        </label>
                        <textarea
                          rows={4}
                          value={formData.coverNote}
                          onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                          placeholder="Why are you eager to build applied AI in Ethiopia? Mention relevant projects, coursework at AAU, or experience with high-performance GPU workstations..."
                          className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-hidden resize-none"
                        />
                      </div>

                      {/* Quick Inspiration Pills */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                        <span className="font-semibold">Quick insert:</span>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              coverNote: prev.coverNote + " Experienced in PyTorch and distributed training on GPU clusters.",
                            }))
                          }
                          className="rounded-md border border-border px-2 py-0.5 hover:bg-muted"
                        >
                          + PyTorch Experience
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              coverNote: prev.coverNote + " Addis Ababa University graduate specializing in artificial intelligence.",
                            }))
                          }
                          className="rounded-md border border-border px-2 py-0.5 hover:bg-muted"
                        >
                          + AAU Graduate
                        </button>
                      </div>

                      {/* Summary Review Card */}
                      <div className="rounded-2xl border border-border bg-muted/40 p-4 text-xs space-y-1.5">
                        <p className="font-bold text-foreground mb-1">Application Summary:</p>
                        <p><span className="text-muted-foreground">Position:</span> {selectedJobForApply.title} ({selectedJobForApply.startupName})</p>
                        <p><span className="text-muted-foreground">Candidate:</span> {formData.fullName || "Bethlehem Tadesse"}</p>
                        <p><span className="text-muted-foreground">Email:</span> {formData.email || "bethlehem@example.com"}</p>
                        <p><span className="text-muted-foreground">Phone:</span> {formData.phone || "+251 91 123 4567"}</p>
                        <p><span className="text-muted-foreground">Experience & Availability:</span> {formData.yearsExperience} · {formData.startDate}</p>
                        {formData.portfolioUrl && (
                          <p><span className="text-muted-foreground">Portfolio / GitHub:</span> {formData.portfolioUrl}</p>
                        )}
                        <p><span className="text-muted-foreground">Resume File:</span> {formData.resumeFileName}</p>
                        <p><span className="text-muted-foreground">Compute Lab Allocation:</span> High-Performance GPU Workstations at EAII</p>
                      </div>

                      {/* Privacy & Governance Confirmation */}
                      <label className="flex items-start gap-2.5 rounded-xl border border-border/80 bg-background/60 p-3 text-xs text-muted-foreground cursor-pointer transition-colors hover:bg-muted/40">
                        <input
                          type="checkbox"
                          checked={formData.agreedToDataPolicy}
                          onChange={(e) => setFormData({ ...formData, agreedToDataPolicy: e.target.checked })}
                          className="mt-0.5 size-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <span>
                          I agree that my application details will be processed under the AI UniPod Data Governance Framework, in alignment with the African Union Continental AI Strategy and Ethiopian privacy regulations.
                        </span>
                      </label>

                      {!formData.agreedToDataPolicy && (
                        <p className="text-[11px] text-amber-600 dark:text-amber-400">
                          Please check the data governance framework confirmation above to enable final submission.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                    {applicationStep > 1 ? (
                      <Button
                        key="btn-back"
                        type="button"
                        variant="outline"
                        onClick={handlePrevStep}
                        className="rounded-xl text-xs"
                      >
                        <ArrowLeft className="mr-1.5 size-3.5" /> Back
                      </Button>
                    ) : (
                      <Button
                        key="btn-cancel"
                        type="button"
                        variant="outline"
                        onClick={() => setSelectedJobForApply(null)}
                        className="rounded-xl text-xs"
                      >
                        Cancel
                      </Button>
                    )}

                    <div className="flex items-center gap-2">
                      {applicationStep < 3 ? (
                        <Button
                          key={`btn-next-${applicationStep}`}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleNextStep();
                          }}
                          className="rounded-xl text-xs font-semibold"
                        >
                          Next Step <ArrowRight className="ml-1.5 size-3.5" />
                        </Button>
                      ) : (
                        <Button
                          key="btn-submit"
                          type="submit"
                          disabled={isSubmitting || !formData.agreedToDataPolicy}
                          className="rounded-xl text-xs font-semibold shadow-sm"
                        >
                          {isSubmitting ? (
                            <>Submitting Application...</>
                          ) : (
                            <>
                              Submit Application <Send className="ml-1.5 size-3.5" />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Post a Startup Job Modal */}
      <PostJobModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        onJobCreated={handleJobCreated}
      />

      {/* 5. Comprehensive Enterprise Global Footer */}
      <LandingFooter />
    </div>
  );
}
