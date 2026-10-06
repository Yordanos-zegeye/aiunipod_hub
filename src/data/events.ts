export interface EcosystemEvent {
  id: string;
  title: string;
  category: "Hackathon" | "Workshop" | "Demo Day" | "Symposium" | "Masterclass" | "Office Hours";
  date: string;
  time: string;
  venue: string;
  isVirtual: boolean;
  audience: string;
  capacity: number;
  rsvpCount: number;
  status: "PUBLISHED" | "DRAFT" | "COMPLETED";
  description: string;
  registrationUrl?: string;
  tags: string[];
}

export const INITIAL_EVENTS: EcosystemEvent[] = [
  {
    id: "evt-01",
    title: "National Sovereign AI Hackathon 2026",
    category: "Hackathon",
    date: "2026-10-18",
    time: "09:00 AM – 06:00 PM EAT",
    venue: "EAII Innovation Center & Sovereign Compute Hall, Addis Ababa",
    isVirtual: false,
    audience: "AI Engineers, University Researchers, University Cohort Teams",
    capacity: 250,
    rsvpCount: 184,
    status: "PUBLISHED",
    description: "48-hour intensive building hackathon focused on fine-tuning multilingual Ethiopian foundation models and offline medical edge inference.",
    registrationUrl: "https://aii.et/hackathon-2026",
    tags: ["Foundation Models", "EAII Compute", "Hackathon", "Healthcare AI"],
  },
  {
    id: "evt-02",
    title: "Sovereign AI Research & Compute Symposium",
    category: "Symposium",
    date: "2026-11-04",
    time: "10:00 AM – 04:00 PM EAT",
    venue: "Addis Ababa University Ras Mekonnen Hall & Virtual Stream",
    isVirtual: true,
    audience: "Faculty, PhD Scholars, Policy Makers, Global AI Fellows",
    capacity: 400,
    rsvpCount: 295,
    status: "PUBLISHED",
    description: "Joint EAII and AAU academic symposium unveiling state-of-the-art benchmark results for local language tokenizers and geospatial agriculture vision datasets.",
    registrationUrl: "https://aau.edu.et/events/ai-symposium",
    tags: ["Academic Research", "AAU", "EAII", "NLP"],
  },
  {
    id: "evt-03",
    title: "Cohort 3 Institutional Investor Demo Day",
    category: "Demo Day",
    date: "2026-11-20",
    time: "02:00 PM – 06:30 PM EAT",
    venue: "UNIPOD Main Exhibition Pavilion & Virtual Deal Room",
    isVirtual: true,
    audience: "Accredited Venture Capital, Angel Networks, DFIs",
    capacity: 120,
    rsvpCount: 88,
    status: "PUBLISHED",
    description: "Private diligence showcase featuring top 8 incubated Ethiopian AI ventures pitching to regional and pan-African venture investors with verified deal rooms.",
    registrationUrl: "https://unipod.et/investor/demoday",
    tags: ["Deal Room", "Demo Day", "Venture Capital", "Timbuktoo"],
  },
  {
    id: "evt-04",
    title: "Distributed GPU Training & Optimization Masterclass",
    category: "Masterclass",
    date: "2026-12-02",
    time: "01:30 PM – 05:00 PM EAT",
    venue: "EAII AI Lab 2 & Hybrid Stream",
    isVirtual: true,
    audience: "Senior Machine Learning Engineers & DevOps Leads",
    capacity: 75,
    rsvpCount: 62,
    status: "DRAFT",
    description: "Hands-on deep dive into PyTorch FSDP, DeepSpeed, and vLLM acceleration architectures on national sovereign GPU infrastructure.",
    tags: ["Deep Learning", "Compute Optimization", "PyTorch"],
  },
];
