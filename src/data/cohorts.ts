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
    id: "cohort-02",
    name: "AI UNIPOD Cohort 2: Sovereign Intelligence & Living Lab Acceleration",
    edition: "Cohort 2",
    status: "ACTIVE_INCUBATION",
    applicationDeadline: "2026-01-15",
    programStartDate: "2026-02-01",
    programEndDate: "2026-08-31",
    targetVentures: 21,
    grantPool: "$210,000 Equity-Free Seed ($10,000/venture)",
    computeHours: "75,000 GPU Node Hours on NVIDIA A100 & RTX 6000 Ada",
    sectors: ["EdTech AI", "FinTech AI", "AgriTech AI", "HealthTech AI", "Computer Vision", "Assistive Tech AI"],
    description: "Flagship living lab incubation cycle accelerating 21 sovereign Ethiopian AI ventures with high-performance compute and commercial pilot deployment.",
    eligibility: "Ethiopian AI-first founders with working MVP, university or EAII affiliation, and minimum 2 technical co-founders.",
    applicantsCount: 68,
    acceptedCount: 21,
  },
  {
    id: "cohort-01",
    name: "AI UNIPOD Cohort 1: Foundational Systems & Frontier Engineering",
    edition: "Cohort 1",
    status: "COMPLETED",
    applicationDeadline: "2024-11-30",
    programStartDate: "2025-01-10",
    programEndDate: "2025-07-10",
    targetVentures: 7,
    grantPool: "$70,000 Equity-Free Seed ($10,000/venture)",
    computeHours: "35,000 GPU Node Hours",
    sectors: ["HealthTech AI", "AgriTech AI", "Multilingual NLP", "Smart Mobility", "Climate AI", "GovTech AI"],
    description: "Inaugural pioneer cohort of 7 sovereign ventures graduating foundational AI models now in active commercial and public deployment.",
    eligibility: "Completed program cycle with commercial market traction and institutional follow-on rounds.",
    applicantsCount: 54,
    acceptedCount: 7,
  },
];
