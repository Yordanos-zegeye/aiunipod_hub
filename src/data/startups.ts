import type { WhiteLabelSettings } from "@/lib/white-label";

export type Product = {
  name: string;
  summary: string;
  stage: "Concept" | "Prototype" | "Pilot" | "Market";
};

export type Startup = {
  slug: string;
  name: string;
  tagline: string;
  sector: string;
  description: string;
  location: string;
  founded: string;
  team_size: number;
  products: Product[];
  investment_ask: {
    amount_usd: number;
    round: string;
    use_of_funds: string;
  };
  links: { label: string; url: string }[];
  theme: WhiteLabelSettings;
};

/**
 * Placeholder tenant records. These stand in for the backend
 * `startups` + `White_Label_Settings` tables until Cloud is enabled.
 */
export const STARTUPS: Startup[] = [
  {
    slug: "sela-health",
    name: "Sela Health",
    tagline: "AI triage for community clinics",
    sector: "Health AI",
    description:
      "Sela Health builds an offline-first triage assistant that helps health extension workers in rural Ethiopia prioritise patients using locally trained models in Amharic and Afaan Oromoo.",
    location: "Addis Ababa, Ethiopia",
    founded: "2024",
    team_size: 9,
    products: [
      { name: "Sela Triage", summary: "Offline symptom triage on low-end Android devices.", stage: "Pilot" },
      { name: "Sela Insights", summary: "Clinic-level caseload dashboards for regional health bureaus.", stage: "Prototype" },
    ],
    investment_ask: {
      amount_usd: 450000,
      round: "Pre-seed",
      use_of_funds: "Clinical validation across 40 clinics and expansion of the language model team.",
    },
    links: [
      { label: "Website", url: "https://example.org/sela" },
      { label: "LinkedIn", url: "https://example.org/sela-linkedin" },
    ],
    theme: {
      primary_color: "#0F766E",
      secondary_color: "#134E4A",
      accent_color: "#F59E0B",
      surface_color: "#F8FAF9",
      text_color: "#0B1F1C",
      font_family: "system-ui, sans-serif",
      radius: "1rem",
      layout: "classic",
    },
  },
  {
    slug: "kuraz-agri",
    name: "Kuraz Agri",
    tagline: "Satellite intelligence for smallholder yields",
    sector: "AgriTech",
    description:
      "Kuraz Agri combines satellite imagery with farmer-reported data to forecast yields, flag crop disease early, and connect cooperatives to fair offtake contracts.",
    location: "Hawassa, Ethiopia",
    founded: "2023",
    team_size: 14,
    products: [
      { name: "Kuraz Scout", summary: "Weekly plot-level crop health alerts by SMS.", stage: "Market" },
      { name: "Kuraz Market", summary: "Cooperative-to-buyer contract matching.", stage: "Pilot" },
    ],
    investment_ask: {
      amount_usd: 1200000,
      round: "Seed",
      use_of_funds: "Regional expansion to three additional zones and hardware for ground sensors.",
    },
    links: [{ label: "Website", url: "https://example.org/kuraz" }],
    theme: {
      primary_color: "#B45309",
      secondary_color: "#78350F",
      accent_color: "#65A30D",
      surface_color: "#FFFBF5",
      text_color: "#1C1207",
      font_family: "system-ui, sans-serif",
      radius: "0.5rem",
      layout: "editorial",
    },
  },
  {
    slug: "adera-labs",
    name: "Adera Labs",
    tagline: "Amharic speech models for public services",
    sector: "Language AI",
    description:
      "Adera Labs develops speech-to-text and text-to-speech models for Ethiopian languages, powering accessible government service lines and call-centre automation.",
    location: "Addis Ababa, Ethiopia",
    founded: "2025",
    team_size: 6,
    products: [
      { name: "Adera Voice", summary: "Amharic and Tigrinya speech recognition API.", stage: "Prototype" },
    ],
    investment_ask: {
      amount_usd: 300000,
      round: "Pre-seed",
      use_of_funds: "Dataset licensing, annotation, and GPU compute for model training.",
    },
    links: [{ label: "Website", url: "https://example.org/adera" }],
    theme: {
      primary_color: "#4338CA",
      secondary_color: "#1E1B4B",
      accent_color: "#22D3EE",
      surface_color: "#FAFAFF",
      text_color: "#0C0A2B",
      font_family: "system-ui, sans-serif",
      radius: "1.25rem",
      layout: "showcase",
    },
  },
  {
    slug: "enku-credit",
    name: "Enku Credit",
    tagline: "Alternative credit intelligence for micro-merchants",
    sector: "Fintech AI",
    description:
      "Enku Credit develops graph neural network scoring models using telecommunications and utility transaction flows to unlock uncollateralized working capital for informal merchants across urban Ethiopia.",
    location: "Addis Ababa, Ethiopia",
    founded: "2024",
    team_size: 11,
    products: [
      { name: "Enku Score", summary: "API-driven risk profiling for SACCOs and microfinance banks.", stage: "Pilot" },
      { name: "Merchant Terminal", summary: "Lightweight USSD & web ledger for retail inventory tracking.", stage: "Market" },
    ],
    investment_ask: {
      amount_usd: 750000,
      round: "Seed",
      use_of_funds: "Integration with 12 regional microfinance institutions and core risk modeling team.",
    },
    links: [
      { label: "Website", url: "https://example.org/enku" },
      { label: "LinkedIn", url: "https://example.org/enku-linkedin" },
    ],
    theme: {
      primary_color: "#0284C7",
      secondary_color: "#0F172A",
      accent_color: "#10B981",
      surface_color: "#F8FAFC",
      text_color: "#0F172A",
      font_family: "system-ui, sans-serif",
      radius: "0.875rem",
      layout: "classic",
    },
  },
  {
    slug: "awash-climate",
    name: "Awash Climate",
    tagline: "Hydrological forecasting & drought resilience",
    sector: "Climate AI",
    description:
      "Awash Climate pairs real-time basin telemetry with spatio-temporal transformers to forecast river discharge, flash floods, and drought indices across the Great Rift Valley.",
    location: "Adama, Ethiopia",
    founded: "2023",
    team_size: 8,
    products: [
      { name: "RiftWatch", summary: "Automated early warning SMS alerts for pastoralist communities.", stage: "Pilot" },
      { name: "Basin Digital Twin", summary: "Hydrological scenario simulation for irrigation authorities.", stage: "Prototype" },
    ],
    investment_ask: {
      amount_usd: 600000,
      round: "Pre-seed",
      use_of_funds: "Deploying 80 additional edge telemetry sensors and satellite imagery ingest pipeline.",
    },
    links: [{ label: "Website", url: "https://example.org/awash" }],
    theme: {
      primary_color: "#059669",
      secondary_color: "#064E3B",
      accent_color: "#38BDF8",
      surface_color: "#F0FDF4",
      text_color: "#022C22",
      font_family: "system-ui, sans-serif",
      radius: "0.75rem",
      layout: "editorial",
    },
  },
  {
    slug: "sheba-logistics",
    name: "Sheba Fleet",
    tagline: "AI dynamic routing & cold-chain optimization",
    sector: "Logistics AI",
    description:
      "Sheba Fleet deploys reinforcement learning models for dynamic route planning, road condition forecasting, and cold-chain temperature telemetry for pharmaceutical and agricultural freight.",
    location: "Dire Dawa, Ethiopia",
    founded: "2024",
    team_size: 10,
    products: [
      { name: "Sheba Route", summary: "Offline-capable route optimizer considering terrain and checkpoints.", stage: "Market" },
      { name: "ColdPulse IoT", summary: "Real-time vaccine and dairy freight temperature telemetry.", stage: "Pilot" },
    ],
    investment_ask: {
      amount_usd: 850000,
      round: "Seed",
      use_of_funds: "Onboarding 500 cross-country freight haulers and hardware assembly in Dire Dawa Free Trade Zone.",
    },
    links: [{ label: "Website", url: "https://example.org/sheba" }],
    theme: {
      primary_color: "#7C3AED",
      secondary_color: "#2E1065",
      accent_color: "#F43F5E",
      surface_color: "#FAF5FF",
      text_color: "#1E1B4B",
      font_family: "system-ui, sans-serif",
      radius: "1rem",
      layout: "showcase",
    },
  },
  {
    slug: "abyssinia-vision",
    name: "Abyssinia Vision",
    tagline: "Computer vision for agro-processing & textile manufacturing",
    sector: "Vision AI",
    description:
      "Abyssinia Vision engineers high-speed edge computer vision systems for automated defect detection, grade sorting for Ethiopian specialty coffee cherries, and garment stitching quality assurance in industrial parks.",
    location: "Hawassa, Ethiopia",
    founded: "2023",
    team_size: 11,
    products: [
      { name: "Q-Grade Optics", summary: "Multi-spectral computer vision for instant specialty coffee bean sorting and defect grading.", stage: "Pilot" },
      { name: "TextileInspect AI", summary: "High-speed camera sensor system detecting weaving flaws at 120 frames per second.", stage: "Market" },
    ],
    investment_ask: {
      amount_usd: 950000,
      round: "Seed",
      use_of_funds: "Deploying camera edge units across 15 coffee washing stations and 4 textile manufacturing lines.",
    },
    links: [{ label: "Website", url: "https://example.org/abyssinia-vision" }],
    theme: {
      primary_color: "#EA580C",
      secondary_color: "#7C2D12",
      accent_color: "#FBBF24",
      surface_color: "#FFF7ED",
      text_color: "#431407",
      font_family: "system-ui, sans-serif",
      radius: "0.75rem",
      layout: "editorial",
    },
  },
  {
    slug: "tenaw-med",
    name: "Tenaw Diagnostic",
    tagline: "AI-guided point-of-care maternal & neonatal ultrasound",
    sector: "Health AI",
    description:
      "Tenaw Diagnostic develops lightweight AI software paired with handheld ultrasound probes, guiding midwives and nurses through obstetric anomaly detection and gestational age estimation with no specialist required on-site.",
    location: "Addis Ababa, Ethiopia",
    founded: "2024",
    team_size: 7,
    products: [
      { name: "Tenaw SonoGuide", summary: "Real-time probe guidance and fetal biometric measurement overlay.", stage: "Pilot" },
      { name: "NeoTriage Cloud", summary: "Asynchronous second-opinion referral pipeline for high-risk maternal presentations.", stage: "Concept" },
    ],
    investment_ask: {
      amount_usd: 500000,
      round: "Pre-seed",
      use_of_funds: "Clinical trial certification with Ethiopian Food and Drug Authority (EFDA) across 25 primary hospitals.",
    },
    links: [{ label: "Website", url: "https://example.org/tenaw" }],
    theme: {
      primary_color: "#0284C7",
      secondary_color: "#0369A1",
      accent_color: "#14B8A6",
      surface_color: "#F0F9FF",
      text_color: "#082F49",
      font_family: "system-ui, sans-serif",
      radius: "1rem",
      layout: "classic",
    },
  },
];

export function getStartupBySlug(slug: string): Startup | undefined {
  return STARTUPS.find((s) => s.slug === slug);
}
