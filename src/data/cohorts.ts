export interface CohortProgram {
  id: string;
  name: string;
  edition: string;
  status: "ACCEPTING_APPLICATIONS" | "UNDER_REVIEW" | "ACTIVE_INCUBATION" | "COMPLETED";
  applicationDeadline: string;
  programStartDate: string;
  programEndDate: string;
  targetVentures: number;
  grantPool: string;
  computeHours: string;
  sectors: string[];
  description: string;
  eligibility: string;
  applicantsCount: number;
  acceptedCount: number;
}

export const INITIAL_COHORTS: CohortProgram[] = [
  {
    id: "cohort-03",
    name: "AI UNIPOD Cohort 3: Sovereign Intelligence",
    edition: "Cohort 3",
    status: "ACTIVE_INCUBATION",
    applicationDeadline: "2026-08-30",
    programStartDate: "2026-09-15",
    programEndDate: "2027-03-15",
    targetVentures: 12,
    grantPool: "$120,000 Equity-Free Seed ($10,000/venture)",
    computeHours: "50,000 GPU Node Hours on A100 & RTX 6000 Ada",
    sectors: ["Health AI", "AgriTech", "Multilingual NLP", "Logistics AI"],
    description: "Flagship 6-month national AI incubator bridging university laboratories, sovereign GPU infrastructure, and pan-African market entry.",
    eligibility: "Ethiopian AI-first founders with working MVP, university or EAII affiliation, and minimum 2 technical co-founders.",
    applicantsCount: 48,
    acceptedCount: 8,
  },
  {
    id: "cohort-04",
    name: "AI UNIPOD Cohort 4: Frontier Edge & Sovereign Foundational Models",
    edition: "Cohort 4",
    status: "ACCEPTING_APPLICATIONS",
    applicationDeadline: "2026-11-30",
    programStartDate: "2027-01-10",
    programEndDate: "2027-07-10",
    targetVentures: 15,
    grantPool: "$150,000 Equity-Free Seed ($10,000/venture) + Timbuktoo follow-on",
    computeHours: "75,000 GPU Node Hours + High-Throughput NVMe Storage",
    sectors: ["Foundation Models", "Edge AI", "Climate & Earth Observation", "FinTech AI"],
    description: "Expanded call for ventures deploying sovereign AI inference on local hardware, edge devices, and offline-first community deployments.",
    eligibility: "Early-stage or seed-stage African AI ventures with working prototypes solving critical development or sovereign technical hurdles.",
    applicantsCount: 19,
    acceptedCount: 0,
  },
  {
    id: "cohort-02",
    name: "AI UNIPOD Cohort 2: Applied Vision & NLP",
    edition: "Cohort 2",
    status: "COMPLETED",
    applicationDeadline: "2025-12-15",
    programStartDate: "2026-01-10",
    programEndDate: "2026-07-10",
    targetVentures: 10,
    grantPool: "$100,000 Equity-Free Seed",
    computeHours: "35,000 GPU Node Hours",
    sectors: ["Health AI", "Language AI", "Logistics AI"],
    description: "Pioneer cohort graduating ventures currently in commercial production across Addis Ababa and Hawassa.",
    eligibility: "Completed program cycle with 8 successful seed or venture follow-on rounds.",
    applicantsCount: 62,
    acceptedCount: 10,
  },
];
