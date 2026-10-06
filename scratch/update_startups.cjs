const fs = require('fs');
const path = require('path');

const targetPath = path.resolve('c:/Users/yordanos.zegeye/OneDrive - United Nations Development Programme/Desktop/aiunipod_hub/src/data/startups.ts');

const startupsData = `import type { WhiteLabelSettings } from "@/lib/white-label";

export type Product = {
  name: string;
  summary: string;
  stage: "Concept" | "Prototype" | "Pilot" | "Market";
  target_customer?: string;
  ai_functionality?: string;
  differentiation?: string;
};

export type Founder = {
  name: string;
  role: string;
  background: string;
};

export type StartupProblem = {
  problem_statement: string;
  target_affected: string;
  severity: string;
  current_alternatives: string;
  why_alternatives_fail: string;
};

export type StartupAITech = {
  technology_type: string;
  models_used: string[];
  model_ownership: string;
  system_architecture: string;
  proprietary_ip: string;
  data_sources: string;
  dataset_size: string;
  data_rights: string;
  data_advantage: string;
};

export type StartupMarket = {
  tam_usd: string;
  sam_usd: string;
  som_usd: string;
  customer_segments: string[];
  expansion_markets: string[];
  opportunity_narrative: string;
};

export type StartupBusinessModel = {
  revenue_model: string;
  pricing: string;
  arpu?: string;
  mrr_arr?: string;
  other_metrics?: string;
};

export type StartupTraction = {
  key_metric_value: string;
  key_metric_label: string;
  active_deployments: string;
  key_partners: string[];
  major_milestones: string[];
};

export type StartupAIPerformance = {
  primary_metric: string;
  current_performance: string;
  baseline_benchmark: string;
  improvement: string;
  latency: string;
  inference_cost: string;
  validation: string;
  scale?: string;
};

export type StartupCompetitiveAdvantage = {
  main_competitors: string[];
  proprietary_moat: string;
  local_expertise: string;
  distribution_moat: string;
};

export type TeamBreakdown = {
  technical_team_size: number;
  ai_data_science_size: number;
  key_team_strength: string;
};

export type StartupFinancialYear = {
  year: string;
  revenue_usd: number;
  gross_profit_usd: number;
  gross_margin_pct: number;
  operating_profit_usd: number;
  active_units?: string;
};

export type StartupFinancials = {
  historical?: string;
  projected: StartupFinancialYear[];
  unit_economics?: string;
};

export type StartupGrowthPlan = {
  product_growth: string;
  customer_growth: string;
  geographic_expansion: string;
  ai_capability_expansion: string;
};

export type StartupDiligenceDoc = {
  title: string;
  category: "Pitch Deck" | "Financials" | "Technical" | "Regulatory & Impact" | "Cap Table";
  file_type: "PDF" | "XLSX" | "DOCX";
  file_size: string;
  status: "Available" | "Verified" | "Restricted";
};

export type StartupImpact = {
  beneficiaries_reached: string;
  jobs_created: number;
  women_youth_representation: string;
  sdgs: { number: number; label: string }[];
  impact_narrative: string;
};

export type UseOfFundsItem = {
  category: string;
  percentage: number;
  amount_usd: number;
  description: string;
};

export type StartupRisk = {
  risk: string;
  severity: "Low" | "Medium" | "High";
  mitigation: string;
};

export type Startup = {
  slug: string;
  name: string;
  legal_name?: string;
  tagline: string;
  sector: string;
  cohort?: string;
  description: string;
  location: string;
  operating_markets?: string[];
  founded: string;
  team_size: number;
  primary_contact?: {
    name: string;
    role: string;
    email: string;
    phone: string;
  };
  problem?: StartupProblem;
  ai_tech?: StartupAITech;
  market?: StartupMarket;
  business_model?: StartupBusinessModel;
  traction?: StartupTraction;
  ai_performance?: StartupAIPerformance;
  competitive_advantage?: StartupCompetitiveAdvantage;
  founders?: Founder[];
  team_breakdown?: TeamBreakdown;
  impact?: StartupImpact;
  products: Product[];
  financials?: StartupFinancials;
  growth_plan?: StartupGrowthPlan;
  diligence_documents?: StartupDiligenceDoc[];
  investment_ask: {
    amount_usd: number;
    round: string;
    use_of_funds: string;
    preferred_instrument?: string;
    current_funding?: string;
    funds_breakdown?: UseOfFundsItem[];
  };
  risks?: StartupRisk[];
  links: { label: string; url: string }[];
  theme: WhiteLabelSettings;
};

export const STARTUPS: Startup[] = [
  {
    slug: "sela-health",
    name: "Sela Health",
    legal_name: "Sela Digital Health Technologies PLC",
    tagline: "Offline-first clinical AI triage for rural community health posts",
    sector: "Health AI",
    cohort: "Cohort 3",
    description:
      "Sela Health builds an offline-first clinical triage assistant that helps frontline health extension workers in rural Ethiopia prioritize critical patients. Powered by quantized language models trained on localized symptom vocabularies in Amharic, Afaan Oromoo, and Tigrinya, Sela operates on $60 Android devices with zero cloud dependency.",
    location: "Addis Ababa, Ethiopia",
    operating_markets: ["Ethiopia (Oromia & Amhara Regional States)", "East Africa"],
    founded: "2024",
    team_size: 9,
    primary_contact: {
      name: "Dr. Selamawit Bekele",
      role: "Co-Founder & Chief Medical Officer",
      email: "selam@selahealth.et",
      phone: "+251 91 142 8821",
    },
    problem: {
      problem_statement:
        "Over 80% of Ethiopians live in rural areas served by 40,000+ Health Extension Workers who lack clinical diagnostic support, leading to late-stage triage of preventable infectious and maternal complications.",
      target_affected: "Rural primary health posts, community health extension workers, and 60M+ rural citizens.",
      severity:
        "Over 45% of critical patient transfers arrive at district hospitals with severe complications that could have been identified 72 hours earlier at primary health posts.",
      current_alternatives: "Paper-based integrated management of childhood illness (IMCI) booklets and unguided manual referrals.",
      why_alternatives_fail: "Complex decision trees are difficult to parse under emergency conditions, paper logs lack analytics, and cloud health apps fail due to frequent telecom blackouts.",
    },
    ai_tech: {
      technology_type: "Edge NLP, Multi-Lingual Speech AI & Quantized Diagnostic Decision Trees",
      models_used: ["Quantized Llama-3 8B (4-bit GGML on ARM)", "Ethiopic Whisper Small (Acoustic ASR)", "Localized IMCI Clinical Graph"],
      model_ownership: "Proprietary fine-tuned localized models with sovereign clinical weights",
      system_architecture:
        "Edge-first architecture executing on local Android NPU; local SQLite transaction ledger; asynchronous mesh sync over Wi-Fi Direct or weekly cellular packet bursts.",
      proprietary_ip:
        "Proprietary 14,000-concept clinical ontology mapping colloquial Amharic and Afaan Oromoo somatic idioms to standardized ICD-11 diagnostic codes.",
      data_sources: "400,000+ de-identified triage interaction transcripts from 42 Woreda clinics, validated with Tikur Anbessa Specialized Hospital clinicians.",
      dataset_size: "18.4 GB annotated clinical speech and bilingual symptom evaluation logs.",
      data_rights: "Full sovereign institutional data agreement co-signed with Ethiopian Artificial Intelligence Institute (EAII) and Regional Health Bureaus.",
      data_advantage:
        "Only dataset capturing vernacular symptom descriptions (e.g. 'hot stomach' or 'lung stiffness') translated into calibrated triage urgencies.",
    },
    market: {
      tam_usd: "$1.4B",
      sam_usd: "$320M",
      som_usd: "$45M",
      customer_segments: ["Ministry of Health & Regional Health Bureaus", "International NGOs & UNICEF", "Private Rural Clinic Cooperatives"],
      expansion_markets: ["Kenya (Northern Frontier)", "Rwanda", "Uganda"],
      opportunity_narrative:
        "Primary healthcare digitization across Sub-Saharan Africa is accelerating under national universal healthcare mandates, creating high demand for offline-capable sovereign AI tools.",
    },
    business_model: {
      revenue_model: "B2G Enterprise Annual Licensing + Per-Clinic Subscription",
      pricing: "$120 / clinic / year base tier + $450 / district hospital analytics tier",
      arpu: "$1,850 / Woreda Health Office / year",
      mrr_arr: "ARR: $95,000 | MRR: $8,200",
      other_metrics: "84% gross software margin; 118% net revenue retention across pilot health bureaus",
    },
    traction: {
      key_metric_value: "148,000+",
      key_metric_label: "Rural Patients Triaged",
      active_deployments: "42 Primary Clinics across East Shewa & Arsi Zones",
      key_partners: ["Ethiopian Artificial Intelligence Institute (EAII)", "Oromia Regional Health Bureau", "Tikur Anbessa Hospital", "UNDP timbuktoo"],
      major_milestones: [
        "EFDA Phase 1 Software as Medical Device (SaMD) exemption granted",
        "Clinical pilot completed across 42 clinics with 89.4% triage agreement",
        "EAII GPU cluster allocation for continuous model quantization",
      ],
    },
    ai_performance: {
      primary_metric: "Triage Diagnostic Agreement with Senior Clinicians",
      current_performance: "89.4% Concordance",
      baseline_benchmark: "61.2% (Standard General LLMs without colloquial adaptation)",
      improvement: "+28.2% higher emergency triage accuracy in rural field conditions",
      latency: "< 42ms on MediaTek Helio G85 chipset",
      inference_cost: "$0.000 (100% on-device zero cloud inference fee)",
      validation: "Blinded prospective validation study against 1,200 physician-adjudicated emergency cases.",
      scale: "148,000+ triage consultations; 45M edge tokens processed/month; zero cloud egress costs",
    },
    competitive_advantage: {
      main_competitors: ["Babylon Health (Legacy)", "Ada Health", "Generic Paper IMCI Protocols"],
      proprietary_moat: "Offline-first quantized edge models and culturally aligned bilingual somatic ontology.",
      local_expertise: "Founded by EAII NLP research fellows and practicing Ethiopian emergency physicians.",
      distribution_moat: "Direct institutional pilot integration through the Ministry of Health Primary Health Care Directorate.",
    },
    founders: [
      {
        name: "Dr. Selamawit Bekele, MD",
        role: "Chief Executive Officer",
        background: "Former emergency physician at Tikur Anbessa Hospital; MPH Harvard Chan School of Public Health.",
      },
      {
        name: "Kidus Hailu, MSc",
        role: "Chief Technology Officer",
        background: "Ex-EAII Senior NLP Researcher; lead contributor to open Ethiopic language tokenization benchmarks.",
      },
    ],
    team_breakdown: {
      technical_team_size: 5,
      ai_data_science_size: 3,
      key_team_strength: "Unique clinical MD + EAII NLP research fellowship combination with published benchmarks at NeurIPS and ICLR workshops.",
    },
    impact: {
      beneficiaries_reached: "148,000+ rural patients screened; 18,200 maternal complications flagged early",
      jobs_created: 14,
      women_youth_representation: "62% women-led management and 85% youth health worker adoption",
      sdgs: [
        { number: 3, label: "Good Health and Well-Being" },
        { number: 10, label: "Reduced Inequalities" },
        { number: 9, label: "Industry, Innovation and Infrastructure" },
      ],
      impact_narrative:
        "Sela transforms primary health posts from isolated outposts into AI-guided living laboratories, eliminating preventable rural triage delays and cutting maternal transfer times by 3.8 days.",
    },
    products: [
      {
        name: "Sela Triage Core",
        summary: "Zero-latency offline symptom triage assistant for low-end Android handsets with voice input.",
        stage: "Pilot",
        target_customer: "Frontline health extension workers and rural nurses.",
        ai_functionality: "Speech-to-text intake in Amharic & Afaan Oromoo paired with a 4-bit clinical decision graph.",
        differentiation: "Runs 100% offline without cell service; battery life optimized for 14 hours continuous field shifts.",
      },
      {
        name: "Sela Sentinel Dashboard",
        summary: "Epidemiological caseload heatmaps and disease outbreak syndromic surveillance for Woreda Health Offices.",
        stage: "Prototype",
        target_customer: "Woreda Health Officers and Ministry epidemiologists.",
        ai_functionality: "Spatio-temporal anomaly detection identifying atypical clusters of fever and diarrheal illness.",
        differentiation: "Aggregates offline clinic records via opportunistic Bluetooth synchronization.",
      },
    ],
    financials: {
      historical: "FY2024: $42,000 revenue (EAII living lab grant & pilot deployment fees across 42 clinics)",
      projected: [
        { year: "FY2025", revenue_usd: 280000, gross_profit_usd: 224000, gross_margin_pct: 80, operating_profit_usd: -90000, active_units: "140 Clinics" },
        { year: "FY2026", revenue_usd: 890000, gross_profit_usd: 730000, gross_margin_pct: 82, operating_profit_usd: 110000, active_units: "520 Clinics" },
        { year: "FY2027", revenue_usd: 2450000, gross_profit_usd: 2058000, gross_margin_pct: 84, operating_profit_usd: 680000, active_units: "1,850 Clinics" },
      ],
      unit_economics: "$120 customer acquisition cost per clinic, 5.8x LTV/CAC ratio, and 3.4 months payback period.",
    },
    growth_plan: {
      product_growth: "Multimodal acoustic cough diagnostic & low-power thermal sensor integration for fever triage.",
      customer_growth: "Expand from 42 Woreda clinics to 450 primary healthcare centers across 4 regional states.",
      geographic_expansion: "Cross-border corridor expansion into Kenya Northern Frontier and Rwanda Community Health programs.",
      ai_capability_expansion: "Continuous federated on-device fine-tuning without centralized clinical data transfer.",
    },
    diligence_documents: [
      { title: "Sela Health Executive Pitch Deck v2.4", category: "Pitch Deck", file_type: "PDF", file_size: "4.8 MB", status: "Available" },
      { title: "Sela 3-Year Pro Forma Financial Model & Unit Economics", category: "Financials", file_type: "XLSX", file_size: "1.2 MB", status: "Available" },
      { title: "EAII Living Lab Benchmark & Quantization Audit", category: "Technical", file_type: "PDF", file_size: "2.1 MB", status: "Verified" },
      { title: "EFDA Class I Software-as-a-Medical-Device Clearance Dossier", category: "Regulatory & Impact", file_type: "PDF", file_size: "3.4 MB", status: "Verified" },
      { title: "Sela Health Cap Table & SAFE Round Summary", category: "Cap Table", file_type: "PDF", file_size: "650 KB", status: "Restricted" },
    ],
    investment_ask: {
      amount_usd: 450000,
      round: "Pre-seed",
      preferred_instrument: "SAFE (Post-Money Valuation Cap) or Equity",
      current_funding: "$120,000 non-dilutive grant from EAII & UNDP timbuktoo",
      use_of_funds: "Clinical validation across 120 additional health centers, EFDA Class II certification, and language model fine-tuning team expansion.",
      funds_breakdown: [
        { category: "Clinical Trials & EFDA Regulatory Approval", percentage: 35, amount_usd: 157500, description: "Multi-center clinical validation across 3 regional states." },
        { category: "Model Engineering & GPU Workstations", percentage: 30, amount_usd: 135000, description: "On-device quantization and Somali/Sidama language expansion." },
        { category: "Field Operations & Device Subsidies", percentage: 20, amount_usd: 90000, description: "Procurement of 500 certified Android handsets for health extension workers." },
        { category: "Core Team Hiring", percentage: 15, amount_usd: 67500, description: "2 senior ML engineers and 1 clinical operations lead." },
      ],
    },
    risks: [
      { risk: "Regulatory delay in Ethiopian Food and Drug Authority (EFDA) SaMD certification.", severity: "Medium", mitigation: "Co-sponsored living lab trials with EAII and AAU School of Public Health." },
      { risk: "Hardware obsolescence in rural clinics.", severity: "Low", mitigation: "Strict design target of Android 9+ and 2GB RAM minimum hardware requirement." },
      { risk: "Dialect drift across varied highland regions.", severity: "Medium", mitigation: "Active learning loop that prompts health workers for clarification and flags unknown idioms." },
    ],
    links: [
      { label: "Website", url: "https://example.org/sela" },
      { label: "LinkedIn", url: "https://example.org/sela-linkedin" },
      { label: "Clinical Whitepaper", url: "https://example.org/sela-whitepaper" },
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
    legal_name: "Kuraz Agricultural Intelligence Technologies SC",
    tagline: "Satellite Earth observation & edge AI for smallholder yield optimization",
    sector: "AgriTech",
    cohort: "Cohort 2",
    description:
      "Kuraz Agri pairs optical and synthetic aperture radar (SAR) satellite imagery with farmer telemetry to forecast crop yields, detect coffee rust and maize streak viruses, and de-risk bank loans for smallholder agricultural cooperatives.",
    location: "Hawassa, Ethiopia",
    operating_markets: ["Ethiopia (Sidama, Oromia, SNNPR)", "Kenya"],
    founded: "2023",
    team_size: 14,
    primary_contact: {
      name: "Tewodros Girma",
      role: "Founder & Chief Executive Officer",
      email: "tewodros@kurazagri.com",
      phone: "+251 92 344 9912",
    },
    problem: {
      problem_statement:
        "15M smallholder Ethiopian farmers lose up to 35% of their seasonal harvest to undetected crop blight and microclimate volatility, leaving them uninsurable by formal commercial lenders.",
      target_affected: "Smallholder coffee, teff, and maize farmers, agrarian cooperatives, and microfinance institutions.",
      severity: "$1.8B annual economic loss in agricultural output and systemic inability of smallholders to access uncollateralized credit.",
      current_alternatives: "Infrequent visual field surveys by overburdened agricultural extension agents.",
      why_alternatives_fail: "Field agents visit plots at most once per season; cloud cover blinds standard optical satellites during key rainy seasons.",
    },
    ai_tech: {
      technology_type: "Multi-Modal Earth Observation & Spatio-Temporal Convolutional Transformers",
      models_used: ["Sentinel-1 SAR / Sentinel-2 Optical Fusion Network", "YOLOv8 Edge Pest Detector", "Crop Phenology LSTM"],
      model_ownership: "Proprietary fine-tuned Earth observation pipeline tailored for Ethiopian micro-topography",
      system_architecture:
        "Automated daily ingest of ESA Sentinel radar telemetry; cloud preprocessing pipelines at EAII; USSD SMS push notifications to feature phones.",
      proprietary_ip:
        "Multi-spectral soil moisture calibration model tuned on 22,000 physical soil sample boreholes across the Great Rift Valley.",
      data_sources: "5 years of Sentinel SAR data paired with ground-truth harvest yield logs from 110 Ethiopian agricultural cooperatives.",
      dataset_size: "4.2 TB geospatial imagery tiles and agronomic sensor readings.",
      data_rights: "Full proprietary rights and licensing partnership with Ethiopian Space Science and Geospatial Institute (SSGI).",
      data_advantage: "Largest ground-truthed smallholder plot boundary database in East Africa with 88,000 georeferenced smallholdings.",
    },
    market: {
      tam_usd: "$2.6B",
      sam_usd: "$540M",
      som_usd: "$68M",
      customer_segments: ["Agricultural Cooperatives", "Commercial Coffee Exporters", "Microfinance & Commercial Banks", "Crop Insurers"],
      expansion_markets: ["Uganda", "Tanzania", "Kenya"],
      opportunity_narrative:
        "EU Deforestation Regulation (EUDR) compliance requires 100% farm-level geospatial traceability for Ethiopian specialty coffee, driving urgent B2B software adoption.",
    },
    business_model: {
      revenue_model: "B2B SaaS per-hectare fee + Enterprise EUDR Traceability Platform Licensing",
      pricing: "$1.20 / hectare / season for cooperative scouting + $15,000 / exporter annual EUDR platform",
      arpu: "$14,500 / coffee cooperative union / year",
      mrr_arr: "ARR: $240,000 | MRR: $21,500",
      other_metrics: "88% annual recurring contract renewal rate; zero customer churn among coffee export houses",
    },
    traction: {
      key_metric_value: "88,000+",
      key_metric_label: "Farms Mapped & Monitored",
      active_deployments: "110 Cooperatives across Sidama, Yirgacheffe, and Jimma",
      key_partners: ["Ethiopian Coffee and Tea Authority", "Cooperative Bank of Oromia", "SSGI", "UNDP timbuktoo"],
      major_milestones: [
        "First EUDR-compliant digital plot registry completed for 12,000 Sidama coffee growers",
        "42% average increase in cooperative contract fulfillment yield accuracy",
        "Commercial pilot contract signed with leading Ethiopian export union",
      ],
    },
    ai_performance: {
      primary_metric: "Pre-Harvest Yield Forecast Mean Absolute Error (MAE)",
      current_performance: "92.6% Accuracy (7.4% MAE)",
      baseline_benchmark: "71.0% (Manual agronomic survey estimation)",
      improvement: "+21.6% yield forecasting reliability 60 days before harvest",
      latency: "Real-time crop risk scoring API (< 120ms response time)",
      inference_cost: "$0.003 per smallholder plot scan per month",
      validation: "Verified against audited weighing station receipts at 45 coffee washing stations in Hawassa.",
      scale: "88,000+ smallholder plots analyzed weekly; 4.2 TB geospatial radar tiles processed/month",
    },
    competitive_advantage: {
      main_competitors: ["Cropin", "Acre Africa", "Local manual field inspectors"],
      proprietary_moat: "Synthetic Aperture Radar (SAR) fusion that penetrates cloud cover during the Ethiopian rainy season.",
      local_expertise: "Deep regional agronomy research team stationed in the heart of the Sidama coffee basin.",
      distribution_moat: "Exclusive integration with regional cooperative unions and local USSD telecommunications lines.",
    },
    founders: [
      {
        name: "Tewodros Girma, MSc",
        role: "Chief Executive Officer",
        background: "Former geospatial analyst at SSGI; 8+ years remote sensing engineering experience.",
      },
      {
        name: "Bethlehem Tadesse",
        role: "Chief Operating Officer",
        background: "Former cooperative supply chain director at Sidama Coffee Farmers Cooperative Union.",
      },
    ],
    team_breakdown: {
      technical_team_size: 8,
      ai_data_science_size: 4,
      key_team_strength: "Ex-SSGI remote sensing engineers paired with seasoned cooperative supply chain leadership in Hawassa.",
    },
    impact: {
      beneficiaries_reached: "88,000 smallholders; 31% average reduction in post-infection crop loss",
      jobs_created: 22,
      women_youth_representation: "48% female smallholder cooperative members reached",
      sdgs: [
        { number: 2, label: "Zero Hunger" },
        { number: 8, label: "Decent Work and Economic Growth" },
        { number: 13, label: "Climate Action" },
      ],
      impact_narrative:
        "Kuraz Agri equips smallholder farming families with sovereign space intelligence, shielding coffee growers from climate shocks and securing European export compliance.",
    },
    products: [
      {
        name: "Kuraz Scout",
        summary: "Weekly plot-level crop health and drought stress alert delivered by SMS in Amharic, Oromo, and Sidama.",
        stage: "Market",
        target_customer: "Smallholder farmers and local extension officers.",
        ai_functionality: "Automated vegetation index trend analysis with microclimate anomaly detection.",
        differentiation: "Operates on basic $10 feature phones via 2G SMS without requiring smartphone access.",
      },
      {
        name: "Kuraz Trace EUDR",
        summary: "End-to-end deforestation risk verification and GPS polygon validation platform for coffee exporters.",
        stage: "Pilot",
        target_customer: "Commercial coffee washing stations and international buyers.",
        ai_functionality: "Deep learning forest loss temporal segmentation on high-resolution Planet and Sentinel imagery.",
        differentiation: "Generates one-click audit dossiers compliant with strict European Union import laws.",
      },
    ],
    financials: {
      historical: "FY2024: $115,000 revenue (cooperative pilot contracts + EUDR verification audits)",
      projected: [
        { year: "FY2025", revenue_usd: 580000, gross_profit_usd: 475000, gross_margin_pct: 82, operating_profit_usd: -120000, active_units: "180,000 Hectares" },
        { year: "FY2026", revenue_usd: 1650000, gross_profit_usd: 1386000, gross_margin_pct: 84, operating_profit_usd: 340000, active_units: "650,000 Hectares" },
        { year: "FY2027", revenue_usd: 4200000, gross_profit_usd: 3612000, gross_margin_pct: 86, operating_profit_usd: 1450000, active_units: "1,800,000 Hectares" },
      ],
      unit_economics: "$0.18 CAC per smallholder farm mapped, lifetime value of $6.40, LTV/CAC ratio of 35x.",
    },
    growth_plan: {
      product_growth: "Automated drone hyperspectral swarm integration and micro-weather station telemetry API.",
      customer_growth: "Scale from 110 coffee cooperatives to 650 agricultural unions across Oromia, Sidama, and SNNPR.",
      geographic_expansion: "East African specialty coffee belt rollout into Uganda and Rwanda.",
      ai_capability_expansion: "Radar-optical transformer model forecasting coffee yield 90 days before cherry harvest.",
    },
    diligence_documents: [
      { title: "Kuraz Agri Seed Investor Deck v3.1", category: "Pitch Deck", file_type: "PDF", file_size: "6.2 MB", status: "Available" },
      { title: "Kuraz Agri Pro Forma Financial Model (2025-2028)", category: "Financials", file_type: "XLSX", file_size: "1.5 MB", status: "Available" },
      { title: "Sentinel Radar Fusion & EUDR Geospatial Technical Whitepaper", category: "Technical", file_type: "PDF", file_size: "3.8 MB", status: "Verified" },
      { title: "Ethiopian Coffee & Tea Authority Partnership & Data License", category: "Regulatory & Impact", file_type: "PDF", file_size: "1.1 MB", status: "Verified" },
      { title: "Kuraz Agricultural Technologies SC Equity Ledger", category: "Cap Table", file_type: "PDF", file_size: "520 KB", status: "Restricted" },
    ],
    investment_ask: {
      amount_usd: 1200000,
      round: "Seed",
      preferred_instrument: "Priced Equity Round or Convertible Note",
      current_funding: "$250,000 previous investment from angel syndicate & UNDP timbuktoo",
      use_of_funds: "National expansion across 500,000 hectares, edge drone sensor deployment, and commercial bank credit score API scaling.",
      funds_breakdown: [
        { category: "Engineering & Multi-Spectral Pipeline", percentage: 40, amount_usd: 480000, description: "Daily radar fusion compute and automated polygon validation." },
        { category: "Cooperative Field Onboarding", percentage: 30, amount_usd: 360000, description: "Field mapping teams across Jimma, Keffa, and Harar." },
        { category: "Bank Lending API Integrations", percentage: 20, amount_usd: 240000, description: "Automated risk rating engine for commercial bank micro-loans." },
        { category: "Regulatory Compliance & Security", percentage: 10, amount_usd: 120000, description: "ISO 27001 certification and EUDR verification auditing." },
      ],
    },
    risks: [
      { risk: "Satellite data pricing shifts from commercial constellation providers.", severity: "Low", mitigation: "Primary reliance on open Copernicus Sentinel radar combined with targeted Planet tasking." },
      { risk: "Cooperative administrative turnover.", severity: "Medium", mitigation: "Long-term master service agreements signed directly with regional cooperative unions." },
    ],
    links: [
      { label: "Website", url: "https://example.org/kuraz" },
      { label: "EUDR Platform Demo", url: "https://example.org/kuraz-eudr" },
    ],
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
    legal_name: "Adera Artificial Intelligence Laboratories PLC",
    tagline: "Foundational speech & language models for Ethiopian public service delivery",
    sector: "Language AI",
    cohort: "Cohort 3",
    description:
      "Adera Labs develops sovereign acoustic speech-to-text (ASR) and expressive text-to-speech (TTS) foundational models tailored specifically for Ethiopic languages. The company powers high-volume citizen service lines, judicial transcription, and telecom voice automation.",
    location: "Addis Ababa, Ethiopia",
    operating_markets: ["Ethiopia", "Horn of Africa"],
    founded: "2025",
    team_size: 6,
    primary_contact: {
      name: "Nahom Mengistu",
      role: "Lead Research Scientist & Co-Founder",
      email: "nahom@aderalabs.ai",
      phone: "+251 91 199 4321",
    },
    problem: {
      problem_statement:
        "Global speech systems fail on Ethiopic phonetic morphology and tonal inflections, excluding 120M people from digital public services and automated judicial transcription.",
      target_affected: "Federal service agencies, commercial call centers, court transcriptionists, and illiterate citizen populations.",
      severity: "Millions of hours wasted in manual court transcription backlogs and over 80% abandonment rates on government call centers.",
      current_alternatives: "Expensive manual stenography and generic Western speech APIs with word error rates exceeding 45%.",
      why_alternatives_fail: "Global models lack training on Ge'ez script phonology, gemination, and regional acoustic background noise.",
    },
    ai_tech: {
      technology_type: "Conformer-CTC Speech Recognition & Neural Waveform Vocoder Synthesis",
      models_used: ["Adera-Conformer-XL (Amharic & Afaan Oromoo)", "HiFi-GAN Ethiopic Neural Vocoder", "Ge'ez Script Grapheme-to-Phoneme Engine"],
      model_ownership: "100% proprietary foundational model weights trained on sovereign EAII GPU clusters",
      system_architecture: "FastAPI microservice cluster supporting streaming WebSocket audio recognition and edge Android SDK.",
      proprietary_ip: "Patented acoustic gemination classifier resolving ambiguous consonant lengthening in spoken Amharic.",
      data_sources: "12,000+ hours of studio and field acoustic recordings across 14 Ethiopian accents and background noise profiles.",
      dataset_size: "1.8 TB curated parallel speech-text corpus.",
      data_rights: "Wholly owned acoustic datasets co-recorded with Addis Ababa University Department of Linguistics.",
      data_advantage: "The single largest curated multi-speaker acoustic corpus for Ethiopian languages in existence.",
    },
    market: {
      tam_usd: "$950M",
      sam_usd: "$210M",
      som_usd: "$28M",
      customer_segments: ["Telecommunications Operators (Ethio Telecom, Safaricom)", "Federal Court Systems", "Commercial Banking IVR Call Centers"],
      expansion_markets: ["Eritrea", "Djibouti", "Sudan"],
      opportunity_narrative:
        "The national Digital Ethiopia 2025 mandate requires automated multi-lingual access for all federal e-government service portals.",
    },
    business_model: {
      revenue_model: "API Usage-Based Pricing ($/minute audio) + Enterprise On-Premises Annual Licensing",
      pricing: "$0.004 / minute for cloud API; $45,000 / year for air-gapped court & bank server deployments",
      arpu: "$38,000 / enterprise client / year",
      mrr_arr: "ARR: $140,000 | MRR: $12,800",
      other_metrics: "92% gross software API margin; 4 enterprise contracts in multi-year lock-in",
    },
    traction: {
      key_metric_value: "3,200,000+",
      key_metric_label: "Minutes Transcribed",
      active_deployments: "3 Federal Agency Pilots + 2 Enterprise Banks",
      key_partners: ["Ethiopian Artificial Intelligence Institute (EAII)", "Addis Ababa University", "Ministry of Innovation & Technology"],
      major_milestones: [
        "Surpassed OpenAI Whisper Large v3 on Amharic conversational benchmarks by 18.4% WER",
        "Live deployment on pilot citizen query lines for Addis Ababa City Administration",
        "Completed 50,000 hours GPU compute on living lab cluster",
      ],
    },
    ai_performance: {
      primary_metric: "Word Error Rate (WER) on Conversational Telephony Speech",
      current_performance: "11.2% WER",
      baseline_benchmark: "38.6% WER (OpenAI Whisper Large v3 baseline on Amharic)",
      improvement: "Over 3x reduction in word errors on real-world telephony audio",
      latency: "< 180ms streaming chunk latency",
      inference_cost: "$0.0012 per audio minute",
      validation: "Evaluated on public EAII benchmark test sets with multi-speaker acoustic validation.",
      scale: "3.2M+ minutes transcribed; 120 concurrent real-time audio streams supported per GPU node",
    },
    competitive_advantage: {
      main_competitors: ["OpenAI Whisper", "Google Cloud Speech-to-Text", "Manual Court Stenographers"],
      proprietary_moat: "Proprietary phonetic tokenizer specifically crafted for Ge'ez syllabary and Ethiopic linguistic roots.",
      local_expertise: "Founded by Addis Ababa University computational linguists and EAII speech lab leads.",
      distribution_moat: "Integrated into government IT procurement channels via Ministry of Innovation and Technology.",
    },
    founders: [
      {
        name: "Nahom Mengistu, MSc",
        role: "Chief Executive Officer & Lead Scientist",
        background: "Ex-EAII Speech Lab Lead; primary author on low-resource African ASR benchmarks.",
      },
      {
        name: "Eden Girma",
        role: "Head of Language Data",
        background: "Computational linguist from Addis Ababa University; specialist in Ge'ez phonology and dialects.",
      },
    ],
    team_breakdown: {
      technical_team_size: 4,
      ai_data_science_size: 3,
      key_team_strength: "Core authors of landmark Ethiopic speech recognition papers with deep Ge'ez phonology expertise.",
    },
    impact: {
      beneficiaries_reached: "850,000 citizens served through automated public inquiry voice hotlines",
      jobs_created: 11,
      women_youth_representation: "50% women NLP research team; expanding audio access for non-literate youth",
      sdgs: [
        { number: 9, label: "Industry, Innovation and Infrastructure" },
        { number: 10, label: "Reduced Inequalities" },
        { number: 16, label: "Peace, Justice and Strong Institutions" },
      ],
      impact_narrative:
        "Adera bridges the digital linguistic divide, ensuring every Ethiopian can access legal, financial, and government services in their native tongue without literacy barriers.",
    },
    products: [
      {
        name: "Adera Voice API",
        summary: "Ultra-low-latency real-time speech recognition for Amharic and Afaan Oromoo telephony streams.",
        stage: "Pilot",
        target_customer: "Telecom contact centers, commercial banks, and fintech interactive voice response (IVR).",
        ai_functionality: "Conformer-based acoustic modeling tuned for mobile network compression artifacts.",
        differentiation: "Achieves sub-200ms latency on CPU servers, eliminating costly GPU dependency.",
      },
      {
        name: "Adera LexCourt",
        summary: "Automated legal transcription suite with speaker diarization tailored for federal courtrooms.",
        stage: "Prototype",
        target_customer: "Federal Supreme Court of Ethiopia and regional judicial tribunals.",
        ai_functionality: "Multi-speaker acoustic diarization paired with legal vocabulary semantic correction.",
        differentiation: "Processes confidential legal audio 100% on-premises on sovereign government hardware.",
      },
    ],
    financials: {
      historical: "FY2024: $65,000 revenue (telecom pilot & federal agency proof-of-concepts)",
      projected: [
        { year: "FY2025", revenue_usd: 420000, gross_profit_usd: 365000, gross_margin_pct: 87, operating_profit_usd: -75000, active_units: "8 Enterprise Clients" },
        { year: "FY2026", revenue_usd: 1280000, gross_profit_usd: 1139000, gross_margin_pct: 89, operating_profit_usd: 280000, active_units: "28 Enterprise Clients" },
        { year: "FY2027", revenue_usd: 3450000, gross_profit_usd: 3140000, gross_margin_pct: 91, operating_profit_usd: 1250000, active_units: "75 Enterprise Clients" },
      ],
      unit_economics: "Direct inference cost of $0.0012/min yielding 70%+ gross margin even on low-tier volume.",
    },
    growth_plan: {
      product_growth: "Multilingual real-time speech translation across Amharic, Afaan Oromoo, Tigrinya, and Somali.",
      customer_growth: "Integrate with Ethio Telecom call centers and federal judicial recording systems.",
      geographic_expansion: "Horn of Africa public sector expansion into Djibouti and regional diaspora media.",
      ai_capability_expansion: "Foundational speech LLM trained natively on 50,000 hours of multi-dialect Ethiopic audio.",
    },
    diligence_documents: [
      { title: "Adera Labs Seed Round Investor Memorandum", category: "Pitch Deck", file_type: "PDF", file_size: "5.1 MB", status: "Available" },
      { title: "Adera Labs Unit Economics & Pro Forma Revenue Projections", category: "Financials", file_type: "XLSX", file_size: "1.1 MB", status: "Available" },
      { title: "Adera-Conformer-XL Speech Architecture & Benchmark Report", category: "Technical", file_type: "PDF", file_size: "2.7 MB", status: "Verified" },
      { title: "MInT E-Government Multi-Lingual Integration Authorization", category: "Regulatory & Impact", file_type: "PDF", file_size: "850 KB", status: "Verified" },
      { title: "Adera AI Laboratories PLC Shareholding Structure", category: "Cap Table", file_type: "PDF", file_size: "480 KB", status: "Restricted" },
    ],
    investment_ask: {
      amount_usd: 600000,
      round: "Pre-seed",
      preferred_instrument: "SAFE or Convertible Note",
      current_funding: "$180,000 grant from EAII Compute Fellowship & UNDP timbuktoo",
      use_of_funds: "Expanding speech data acquisition to Somali, Sidama, and Wolaytta, GPU infrastructure, and enterprise sales team.",
      funds_breakdown: [
        { category: "Regional Acoustic Field Recordings", percentage: 35, amount_usd: 210000, description: "Collecting 20,000 hours of native speech across 5 southern regions." },
        { category: "High-Performance GPU Compute", percentage: 30, amount_usd: 180000, description: "EAII cluster reservation and dedicated Nvidia H100 fine-tuning." },
        { category: "Engineering Talent Hiring", percentage: 20, amount_usd: 120000, description: "3 senior ASR research engineers and 1 audio pipeline specialist." },
        { category: "Enterprise Sales & Integrations", percentage: 15, amount_usd: 90000, description: "B2B integration engineering for financial sector clients." },
      ],
    },
    risks: [
      { risk: "Extreme acoustic noise in public marketplace phone calls.", severity: "Medium", mitigation: "Trained specialized noise-suppression denoiser on 2,000 hours of Ethiopian street market recordings." },
      { risk: "Compute resource constraints during peak hours.", severity: "Low", mitigation: "Hybrid architecture that offloads non-critical transcription batches to overnight living lab compute cycles." },
    ],
    links: [
      { label: "Website", url: "https://example.org/adera" },
      { label: "ASR Amharic Demo", url: "https://example.org/adera-demo" },
    ],
    theme: {
      primary_color: "#4338CA",
      secondary_color: "#1E1B4B",
      accent_color: "#06B6D4",
      surface_color: "#F8FAFC",
      text_color: "#0F172A",
      font_family: "system-ui, sans-serif",
      radius: "0.75rem",
      layout: "classic",
    },
  },
  {
    slug: "enku-credit",
    name: "Enku Credit",
    legal_name: "Enku Financial Intelligence Technologies PLC",
    tagline: "Alternative graph neural network credit scoring for unbanked micro-merchants",
    sector: "Fintech AI",
    cohort: "Cohort 3",
    description:
      "Enku Credit develops graph neural network scoring engines that convert non-traditional data—including telecommunications airtime recharges, utility bill settlements, and supplier invoice flows—into predictive credit scores, unlocking uncollateralized working capital for informal retail merchants.",
    location: "Addis Ababa, Ethiopia",
    operating_markets: ["Ethiopia", "Kenya"],
    founded: "2024",
    team_size: 11,
    primary_contact: {
      name: "Ermias Kassahun",
      role: "Founder & Chief Executive Officer",
      email: "ermias@enkucredit.com",
      phone: "+251 91 220 5410",
    },
    problem: {
      problem_statement:
        "Over 85% of Ethiopia’s 2.4M micro-merchants operate strictly in the informal economy without collateral or traditional credit histories, facing predatory interest rates from loan sharks to buy inventory.",
      target_affected: "Corner shop owners (souqs), market stall operators, micro-wholesalers, and microfinance institutions.",
      severity: "An estimated $4.2B working capital credit deficit stifles retail micro-enterprises across urban and peri-urban Ethiopia.",
      current_alternatives: "Physical land or vehicle title deeds required by banks; informal community lenders charging 15-20% monthly interest.",
      why_alternatives_fail: "Informal merchants do not own titled fixed assets; microfinance lenders cannot afford manual in-person field audits.",
    },
    ai_tech: {
      technology_type: "Graph Neural Networks (GNN) & Alternative Transaction Telemetry Scoring",
      models_used: ["Heterogeneous Graph Transformer (HGT)", "LightGBM Default Predictor", "Behavioral Cash Flow Anomaly Isolation"],
      model_ownership: "Proprietary credit scoring architecture with localized risk parameters",
      system_architecture: "Secure microservice pipeline interfacing with telecommunication CDR streams and core banking systems (Flexcube, Finacle).",
      proprietary_ip: "Dynamic liquidity velocity algorithm calculating merchant working capital turnover cycles from wholesale inventory scans.",
      data_sources: "Over 8.5M anonymized micro-transaction flows, utility payment histories, and FMCG wholesale delivery receipts.",
      dataset_size: "1.2 TB relational and graph transaction metadata.",
      data_rights: "Full borrower consent protocols compliant with National Bank of Ethiopia consumer protection directives.",
      data_advantage: "Proprietary wholesale merchant supplier repayment graph linking 45,000 retail kiosks to Tier-1 distributors.",
    },
    market: {
      tam_usd: "$3.1B",
      sam_usd: "$680M",
      som_usd: "$74M",
      customer_segments: ["Microfinance Institutions (MFIs)", "Commercial Banks", "Fintech Payment Providers", "FMCG Distributors"],
      expansion_markets: ["Kenya", "Tanzania", "Rwanda"],
      opportunity_narrative:
        "The National Bank of Ethiopia’s Open Banking and Digital Payment directives are compelling commercial banks to issue digital loans to MSMEs.",
    },
    business_model: {
      revenue_model: "Origination Fee (% of loan disbursed) + API Query Fee per Scored Merchant",
      pricing: "1.25% loan underwriting success fee + $0.15 per API credit report",
      arpu: "$3,200 / financial institution partner / month",
      mrr_arr: "ARR: $310,000 | MRR: $27,400",
      other_metrics: "Average portfolio loan default rate of 1.9% vs 6.5% traditional bank average",
    },
    traction: {
      key_metric_value: "$4,800,000+",
      key_metric_label: "Disbursed via Enku Score",
      active_deployments: "3 Partner Microfinance Banks & 12 FMCG Wholesalers",
      key_partners: ["National Bank of Ethiopia Sandbox", "EthSwitch", "Wegagen Bank", "UNDP timbuktoo"],
      major_milestones: [
        "Underwrote 18,500 uncollateralized loans with < 2.1% default rate (well below industry average of 6.5%)",
        "Graduated from National Bank of Ethiopia FinTech Regulatory Sandbox",
        "Integrated live API score generation for 45,000 Addis Ababa souq merchants",
      ],
    },
    ai_performance: {
      primary_metric: "Gini Coefficient / Area Under ROC Curve (AUC) for Default Prediction",
      current_performance: "0.78 AUC (Gini: 56.4)",
      baseline_benchmark: "0.58 AUC (Standard subjective bank loan officer scoring)",
      improvement: "+34.5% precision improvement in distinguishing creditworthy borrowers",
      latency: "Underwriting decision generated in < 850 milliseconds",
      inference_cost: "$0.04 per underwritten loan assessment",
      validation: "Audited across 18,500 completed loan repayment cycles over 12 months.",
      scale: "$4.8M+ loans underwritten; 45,000 active retail kiosk nodes in graph; 850ms decision latency",
    },
    competitive_advantage: {
      main_competitors: ["Tala", "Branch International", "Traditional Collateral Banks"],
      proprietary_moat: "Graph network analysis tracking supplier-buyer counterparty reliability rather than individual balance sheets.",
      local_expertise: "Leadership team with prior executive roles at Commercial Bank of Ethiopia and Ethio Telecom Telebirr.",
      distribution_moat: "Exclusive underwriting integrations with FMCG distributor supply chains in Mercato.",
    },
    founders: [
      {
        name: "Ermias Kassahun",
        role: "Chief Executive Officer",
        background: "Former Head of Digital Lending at leading private Ethiopian bank; 12+ years financial systems experience.",
      },
      {
        name: "Yared Wolde, MSc",
        role: "Chief Data Scientist",
        background: "Ex-fintech quantitative risk researcher; published author on graph neural networks in financial inclusion.",
      },
    ],
    team_breakdown: {
      technical_team_size: 6,
      ai_data_science_size: 3,
      key_team_strength: "Former banking risk directors paired with quantitative graph ML engineers.",
    },
    impact: {
      beneficiaries_reached: "18,500 micro-merchants financed; 68% received their first-ever formal financial loan",
      jobs_created: 18,
      women_youth_representation: "54% female merchant borrowers; average 28% increase in retail business revenue",
      sdgs: [
        { number: 1, label: "No Poverty" },
        { number: 8, label: "Decent Work and Economic Growth" },
        { number: 10, label: "Reduced Inequalities" },
      ],
      impact_narrative:
        "Enku dismantles the collateral barrier that has historically held back Ethiopian micro-entrepreneurs, providing capital that allows small shops to stock inventory and build generational wealth.",
    },
    products: [
      {
        name: "Enku Score API",
        summary: "Instant creditworthiness rating engine for banks, microfinance institutions, and digital wallets.",
        stage: "Market",
        target_customer: "Commercial banks and licensed microfinance institutions.",
        ai_functionality: "Real-time graph neural network analyzing 120 alternative behavioral attributes.",
        differentiation: "Evaluates unbanked borrowers in < 1 second using USSD and mobile wallet flows.",
      },
      {
        name: "Merchant Stock Ledger",
        summary: "Lightweight USSD inventory and wholesale ordering portal that automatically builds credit history.",
        stage: "Pilot",
        target_customer: "Neighborhood corner kiosks and informal market traders.",
        ai_functionality: "Cash flow prediction recommending ideal re-order quantities and automated overdraft limits.",
        differentiation: "Operates 100% via basic feature phones without mobile data connection.",
      },
    ],
    financials: {
      historical: "FY2024: $145,000 revenue (FinTech sandbox originations & scoring fees)",
      projected: [
        { year: "FY2025", revenue_usd: 720000, gross_profit_usd: 590000, gross_margin_pct: 82, operating_profit_usd: -140000, active_units: "45,000 Merchants" },
        { year: "FY2026", revenue_usd: 2100000, gross_profit_usd: 1785000, gross_margin_pct: 85, operating_profit_usd: 490000, active_units: "160,000 Merchants" },
        { year: "FY2027", revenue_usd: 5600000, gross_profit_usd: 4872000, gross_margin_pct: 87, operating_profit_usd: 2100000, active_units: "480,000 Merchants" },
      ],
      unit_economics: "$4.50 merchant acquisition cost, generating $38 in annual origination fees (8.4x 1-yr ROI).",
    },
    growth_plan: {
      product_growth: "Automated working capital revolving lines embedded in mobile wallets (Telebirr, CBE Birr).",
      customer_growth: "Expand merchant network from 45,000 to 200,000 retail kiosks across 10 major Ethiopian cities.",
      geographic_expansion: "Cross-border retail supply chain scoring in Kenya and Tanzania.",
      ai_capability_expansion: "Real-time behavioral graph neural network detecting informal inventory velocity shifts.",
    },
    diligence_documents: [
      { title: "Enku Credit Seed Institutional Deck v2.2", category: "Pitch Deck", file_type: "PDF", file_size: "5.4 MB", status: "Available" },
      { title: "Enku Credit Financial Model & Loan Loss Reserve Simulation", category: "Financials", file_type: "XLSX", file_size: "1.8 MB", status: "Available" },
      { title: "Graph Neural Network Underwriting Architecture Audit", category: "Technical", file_type: "PDF", file_size: "3.2 MB", status: "Verified" },
      { title: "National Bank of Ethiopia Sandbox Graduation Certificate", category: "Regulatory & Impact", file_type: "PDF", file_size: "920 KB", status: "Verified" },
      { title: "Enku Financial Intelligence PLC Cap Table & SAFE Notes", category: "Cap Table", file_type: "PDF", file_size: "540 KB", status: "Restricted" },
    ],
    investment_ask: {
      amount_usd: 750000,
      round: "Seed",
      preferred_instrument: "Priced Equity Round or SAFE",
      current_funding: "$200,000 pre-seed from angel investors & EAII Fintech Incubator",
      use_of_funds: "Onboarding 8 additional financial institutions, risk reserve co-financing facility, and regulatory compliance scaling.",
      funds_breakdown: [
        { category: "Risk Modeling & Graph Compute", percentage: 35, amount_usd: 262500, description: "Continuous GNN model retraining on 500,000 new merchant accounts." },
        { category: "Financial Institution Integration", percentage: 30, amount_usd: 225000, description: "Direct API connectors into regional MFI legacy banking cores." },
        { category: "Market Acquisition in Secondary Cities", percentage: 20, amount_usd: 150000, description: "Merchant acquisition teams in Hawassa, Adama, and Dire Dawa." },
        { category: "Compliance & Data Security Auditing", percentage: 15, amount_usd: 112500, description: "NBE regulatory audits and SOC2 / ISO 27001 certifications." },
      ],
    },
    risks: [
      { risk: "Macroeconomic inflation pressure impacting retail consumer spending.", severity: "Medium", mitigation: "Dynamic loan terms restricted to 14-30 day inventory cycles with fast turnover." },
      { risk: "Regulatory policy shifts on mobile money open APIs.", severity: "Low", mitigation: "Co-chairing National Bank FinTech advisory roundtables." },
    ],
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
    legal_name: "Awash Hydro-Climate Intelligence Technologies PLC",
    tagline: "Hydrological forecasting & drought resilience digital twin for the Great Rift Valley",
    sector: "Climate AI",
    cohort: "Cohort 2",
    description:
      "Awash Climate pairs edge telemetry water sensors, satellite soil moisture observations, and spatio-temporal transformers to simulate river discharge, forecast flash floods 72 hours in advance, and predict localized drought indices across the Great Rift Valley.",
    location: "Adama, Ethiopia",
    operating_markets: ["Ethiopia (Awash River Basin)", "Djibouti"],
    founded: "2023",
    team_size: 8,
    primary_contact: {
      name: "Eng. Dawit Alemayehu",
      role: "Lead Hydrologist & Co-Founder",
      email: "dawit@awashclimate.org",
      phone: "+251 92 110 9940",
    },
    problem: {
      problem_statement:
        "The Awash River Basin—home to 18M people and 65% of Ethiopia’s commercial agro-industry—suffers alternating cycles of destructive flash floods and devastating droughts without an automated hydrological warning system.",
      target_affected: "Downstream pastoralists, commercial sugarcane and cotton estates, dam operators, and disaster prevention agencies.",
      severity: "Periodic floods inflict > $120M in seasonal infrastructure damage and displace up to 150,000 vulnerable pastoralist families.",
      current_alternatives: "Manual gauge reading stations transmitting data via paper logs or delayed telephone calls once per day.",
      why_alternatives_fail: "Heavy rainfall in upper highland catchments takes 48 hours to surge downstream; manual monitoring fails to provide timely evacuations.",
    },
    ai_tech: {
      technology_type: "Physics-Informed Neural Networks (PINN) & Spatio-Temporal Hydrological Transformers",
      models_used: ["AwashHydro-Transformer", "GRACE Satellite Soil Groundwater Regressor", "FloodInundation-UNet"],
      model_ownership: "Proprietary hydrological model weights calibrated with Ethiopian river gauge telemetry",
      system_architecture: "Solar-powered ultrasonic water level sensors transmitting LoRa/GSM packets into a cloud hydro-simulation digital twin.",
      proprietary_ip: "Physics-constrained hydraulic loss equations preventing model drift in extreme flash runoff events.",
      data_sources: "40 years of Ethiopian Ministry of Water hydrological records combined with Copernicus ECMWF precipitation forecasts.",
      dataset_size: "860 GB historical discharge time-series and high-resolution digital elevation models (DEM).",
      data_rights: "Exclusive collaborative research and data access agreement with Awash Basin Development Authority.",
      data_advantage: "The only continuous digital twin mapping the complex micro-topography of the Awash River catchment.",
    },
    market: {
      tam_usd: "$1.2B",
      sam_usd: "$280M",
      som_usd: "$35M",
      customer_segments: ["Disaster Risk Management Commission (EDRMC)", "Commercial Sugar & Cotton Agro-Estates", "Hydropower Dam Operators", "Parametric Insurance Underwriters"],
      expansion_markets: ["Kenya (Turkana Basin)", "Somalia (Shabelle River)"],
      opportunity_narrative:
        "Climate change is intensifying hydrological volatility across the Horn of Africa, creating national urgency for AI early warning infrastructure under the UN Early Warnings for All initiative.",
    },
    business_model: {
      revenue_model: "Annual B2G Disaster Resilience Subscriptions + Commercial Agro-Estate Licensing",
      pricing: "$120,000 / year regional basin agency tier; $15,000 / year commercial sugarcane/cotton plantation tier",
      arpu: "$45,000 / enterprise client / year",
      mrr_arr: "ARR: $190,000 | MRR: $16,500",
      other_metrics: "95% renewal rate; mandated institutional early warning partner for Awash Basin",
    },
    traction: {
      key_metric_value: "1,200,000+",
      key_metric_label: "Residents Protected by Early Warning",
      active_deployments: "35 Solar Telemetry Stations along 1,200 km of River",
      key_partners: ["Awash Basin Development Authority", "Ethiopian Disaster Risk Management Commission", "Ministry of Water & Energy", "UNDP timbuktoo"],
      major_milestones: [
        "Predicted September 2024 downstream flash flood with 72-hour lead time, enabling zero casualty evacuation",
        "Deployed 35 self-powered IoT river sensors with 99.4% uptime through severe flood surges",
        "Integrated direct SMS broadcast alerts for 150,000 pastoralists in Afar Regional State",
      ],
    },
    ai_performance: {
      primary_metric: "72-Hour River Discharge Forecast Mean Square Error (RMSE)",
      current_performance: "0.84 Nash-Sutcliffe Efficiency (NSE)",
      baseline_benchmark: "0.48 NSE (Traditional statistical gauge regression)",
      improvement: "+75% improvement in flood peak arrival timing and inundation area boundary prediction",
      latency: "< 3 minutes to simulate entire basin inundation scenario",
      inference_cost: "$0.008 per forecasted catchment grid hour",
      validation: "Continuously validated against official river stage gauges across 6 major flood events.",
      scale: "1.2M citizens protected by alert network; 35 live river telemetry stations; 72-hr lead time",
    },
    competitive_advantage: {
      main_competitors: ["Global Flood Awareness System (GloFAS)", "Manual river observation posts"],
      proprietary_moat: "Physics-informed neural networks that combine real-time sensor streams with strict conservation-of-mass laws.",
      local_expertise: "Founded by senior Adama Science and Technology University hydrologists and hydraulic engineers.",
      distribution_moat: "Direct institutional integration into the national emergency response operations center.",
    },
    founders: [
      {
        name: "Eng. Dawit Alemayehu, MSc",
        role: "Chief Executive Officer & Chief Hydrologist",
        background: "Former Senior Water Resources Engineer at Ministry of Water; 14+ years river modeling experience.",
      },
      {
        name: "Dr. Biruk Tesfaye, PhD",
        role: "Chief AI Scientist",
        background: "Postdoctoral fellow in physics-informed machine learning at ASTU; specialist in spatio-temporal modeling.",
      },
    ],
    team_breakdown: {
      technical_team_size: 5,
      ai_data_science_size: 2,
      key_team_strength: "Senior hydrologists with 15+ years field experience in the Rift Valley and physics-informed ML.",
    },
    impact: {
      beneficiaries_reached: "1.2M river basin residents protected; $14M in estimated agro-estate crop damage prevented",
      jobs_created: 15,
      women_youth_representation: "40% female environmental engineers; 70% youth field maintenance teams in Afar",
      sdgs: [
        { number: 13, label: "Climate Action" },
        { number: 6, label: "Clean Water and Sanitation" },
        { number: 11, label: "Sustainable Cities and Communities" },
      ],
      impact_narrative:
        "Awash Climate turns unpredictable climate chaos into actionable mathematical foresight, giving vulnerable pastoralists and vital agro-industries the precious time needed to protect lives and livelihoods.",
    },
    products: [
      {
        name: "HydroCast Basin",
        summary: "72-hour automated flood warning and inundation mapping digital twin for regional authorities.",
        stage: "Market",
        target_customer: "River basin authorities and emergency disaster management commissions.",
        ai_functionality: "Physics-informed neural network simulating river depth, flow velocity, and embankment breach points.",
        differentiation: "Combines real-time IoT river telemetry with satellite rainfall forecasts with zero manual calibration.",
      },
      {
        name: "AgriDrought Index",
        summary: "High-resolution soil moisture depletion forecast for commercial cotton and sugarcane plantations.",
        stage: "Pilot",
        target_customer: "Commercial farm managers and irrigation scheme operators.",
        ai_functionality: "Satellite microwave soil moisture downscaling coupled with evapotranspiration forecasting.",
        differentiation: "Reduces commercial irrigation pumping diesel consumption by 24%.",
      },
    ],
    financials: {
      historical: "FY2024: $90,000 revenue (basin authority early warning contracts)",
      projected: [
        { year: "FY2025", revenue_usd: 380000, gross_profit_usd: 304000, gross_margin_pct: 80, operating_profit_usd: -90000, active_units: "12 Agro-Estates" },
        { year: "FY2026", revenue_usd: 1150000, gross_profit_usd: 954500, gross_margin_pct: 83, operating_profit_usd: 220000, active_units: "38 Agro-Estates" },
        { year: "FY2027", revenue_usd: 2900000, gross_profit_usd: 2465000, gross_margin_pct: 85, operating_profit_usd: 980000, active_units: "95 Agro-Estates" },
      ],
      unit_economics: "Hardware sensor cost amortized over 36 months yielding 82% software recurring margin.",
    },
    growth_plan: {
      product_growth: "Automated sluice gate actuator integration and solar-powered radar water velocity stations.",
      customer_growth: "Expand from Awash Basin to Blue Nile (Abay) and Omo-Gibe river basins.",
      geographic_expansion: "Horn of Africa transboundary flood forecasting in Djibouti and Somalia.",
      ai_capability_expansion: "Hydrodynamic digital twin simulating dam breach scenarios and 14-day rainfall runoff.",
    },
    diligence_documents: [
      { title: "Awash Climate Investment Brief & Digital Twin Deck", category: "Pitch Deck", file_type: "PDF", file_size: "4.6 MB", status: "Available" },
      { title: "Awash Hydro-Climate Pro Forma Financial Projections", category: "Financials", file_type: "XLSX", file_size: "1.3 MB", status: "Available" },
      { title: "Spatio-Temporal Flood Simulation & Sensor Telemetry Whitepaper", category: "Technical", file_type: "PDF", file_size: "4.1 MB", status: "Verified" },
      { title: "Ministry of Water & Energy Data Exchange Agreement", category: "Regulatory & Impact", file_type: "PDF", file_size: "1.0 MB", status: "Verified" },
      { title: "Awash Hydro-Climate Technologies PLC Cap Table", category: "Cap Table", file_type: "PDF", file_size: "430 KB", status: "Restricted" },
    ],
    investment_ask: {
      amount_usd: 500000,
      round: "Seed",
      preferred_instrument: "SAFE or Grant Co-Financing",
      current_funding: "$150,000 climate resilience grant from UNDP timbuktoo & EAII",
      use_of_funds: "Deploying 100 additional solar IoT river sensors, digital twin expansion to Blue Nile basin, and commercial plantation sales.",
      funds_breakdown: [
        { category: "Sensor Fabrication & Solar Hardware", percentage: 40, amount_usd: 200000, description: "Manufacture of 100 ruggedized ultrasonic river telemetry pods." },
        { category: "Model Engineering & Hydrological Compute", percentage: 30, amount_usd: 150000, description: "Blue Nile digital twin simulation and satellite data pipelines." },
        { category: "Field Installation & Regional Hubs", percentage: 20, amount_usd: 100000, description: "Maintenance bases in Semera, Adama, and Bahir Dar." },
        { category: "Commercial Sales & Enterprise Pilots", percentage: 10, amount_usd: 50000, description: "Pilot contracts with major agro-industrial estates." },
      ],
    },
    risks: [
      { risk: "Sensor vandalism or flash flood hardware washouts.", severity: "Medium", mitigation: "Sensors mounted 8 meters above flood crest on concrete bridge pilings with steel armor." },
      { risk: "Intermittent GSM cellular coverage in deep river canyons.", severity: "Low", mitigation: "LoRaWAN mesh networking with satellite fallback on critical gauging stations." },
    ],
    links: [
      { label: "Website", url: "https://example.org/awash" },
      { label: "Basin Sensor Map", url: "https://example.org/awash-sensors" },
    ],
    theme: {
      primary_color: "#0D9488",
      secondary_color: "#115E59",
      accent_color: "#38BDF8",
      surface_color: "#F0FDFA",
      text_color: "#134E4A",
      font_family: "system-ui, sans-serif",
      radius: "0.5rem",
      layout: "editorial",
    },
  },
  {
    slug: "sheba-logistics",
    name: "Sheba Fleet",
    legal_name: "Sheba Fleet Logistics Intelligence Technologies SC",
    tagline: "Dynamic routing & cold-chain AI telematics for the Addis–Djibouti freight corridor",
    sector: "Logistics AI",
    cohort: "Cohort 3",
    description:
      "Sheba Fleet deploys low-cost edge telematics transponders and reinforcement-learning route optimizers to slash diesel fuel consumption, prevent cargo pilferage, and guarantee unbroken cold-chain temperature audit logs along the vital Addis Ababa to Djibouti port logistics artery.",
    location: "Dire Dawa, Ethiopia",
    operating_markets: ["Ethiopia (Addis–Djibouti Corridor)", "Djibouti"],
    founded: "2024",
    team_size: 12,
    primary_contact: {
      name: "Kalkidan Yilma",
      role: "Co-Founder & Chief Operating Officer",
      email: "kalkidan@shebafleet.com",
      phone: "+251 92 441 0022",
    },
    problem: {
      problem_statement:
        "The 900 km Addis–Djibouti trade corridor—carrying 95% of Ethiopia’s import-export trade—suffers chronic transit delays, 22% diesel fuel waste, and severe pharmaceutical cold-chain spoilage due to unpredictable checkpoint bottlenecks and mountainous terrain.",
      target_affected: "Long-haul heavy truck owners, freight forwarders, pharmaceutical distributors, and perishable export houses.",
      severity: "$340M wasted annually in excess fuel, freight demurrage penalties, and spoiled temperature-sensitive vaccines and medicines.",
      current_alternatives: "Basic 2G GPS vehicle tracking dots with zero predictive fuel optimization or cold-chain compliance alerts.",
      why_alternatives_fail: "Traditional GPS systems drop out in desert areas, lack terrain elevation fuel curves, and do not integrate cargo temperature telemetry.",
    },
    ai_tech: {
      technology_type: "Reinforcement Learning Dynamic Routing & IoT Cold-Chain Thermal Telematics",
      models_used: ["ShebaRoute Deep Q-Network (DQN)", "Predictive Engine Thermal Dissipation Model", "Cellular-Mesh Edge Telemetry"],
      model_ownership: "Proprietary logistics optimization models trained on real corridor freight telematics",
      system_architecture: "Tamper-proof Bluetooth temperature beacons paired with an in-cab edge GPS transponder with offline memory.",
      proprietary_ip: "Algorithmic corridor congestion predictor factoring customs clearance checkpoint queues and mountain elevation fuel curves.",
      data_sources: "Telemetry from 450 cross-country freight haulers over 1.2M kilometers along the Addis–Djibouti corridor.",
      dataset_size: "420 GB vehicular CAN-bus data, road elevation contours, and thermal tracking records.",
      data_rights: "Proprietary commercial telematics contracts with Ethiopian freight transport associations.",
      data_advantage: "Only real-time road condition and temperature telemetry database covering the entire Djibouti trade route.",
    },
    market: {
      tam_usd: "$1.9B",
      sam_usd: "$410M",
      som_usd: "$52M",
      customer_segments: ["Cross-Country Heavy Truck Fleets", "Pharmaceutical Distributors & UNICEF", "Perishable Flower & Meat Exporters", "Freight Forwarders"],
      expansion_markets: ["Kenya (Mombasa–Nairobi corridor)", "Somaliland (Berbera corridor)"],
      opportunity_narrative:
        "The expansion of the Dire Dawa Free Trade Zone and AfCFTA integration is creating massive demand for certified, audit-proof freight tracking.",
    },
    business_model: {
      revenue_model: "Hardware + Monthly SaaS Telematics Subscription per Vehicle",
      pricing: "$180 hardware installation + $28 / truck / month cloud telematics subscription",
      arpu: "$420 / truck / year",
      mrr_arr: "ARR: $165,000 | MRR: $14,200",
      other_metrics: "99.1% hardware uptime across desert corridors; 18.5% audited customer fuel savings",
    },
    traction: {
      key_metric_value: "1,200,000+",
      key_metric_label: "Tracked Corridor Kilometers",
      active_deployments: "450 Heavy Haulers across 14 Commercial Fleet Operators",
      key_partners: ["Ethiopian Freight Forwarding and Shipping Services", "Dire Dawa Free Trade Zone", "Ethiopian Pharmaceuticals Supply Service (EPSS)"],
      major_milestones: [
        "Zero spoiled vaccine shipments recorded across 140 pharmaceutical freight runs",
        "18.5% average diesel fuel savings achieved through terrain-aware momentum cruise guidance",
        "Opened hardware assembly facility in Dire Dawa Free Trade Zone",
      ],
    },
    ai_performance: {
      primary_metric: "Transit Time Variance & Cold-Chain Violation Prevention",
      current_performance: "99.4% Cold-Chain Compliance",
      baseline_benchmark: "78.2% (Industry average unmonitored cold-chain baseline)",
      improvement: "Over 3x reduction in perishable shipment write-offs and spoiled vaccines",
      latency: "Sub-second edge alert triggered upon container temperature excursion",
      inference_cost: "$0.02 per shipment trip routing optimization",
      validation: "Audited by EPSS cold-chain certification inspectors on live insulin transfers.",
      scale: "1.2M+ kilometers tracked; 450 active trucks; 380,000 pharmaceutical cold-chain doses protected",
    },
    competitive_advantage: {
      main_competitors: ["Traditional GPS fleet tracking companies", "Manual log books", "Samsara (Unaffordable in Africa)"],
      proprietary_moat: "Offline-first telematics transponders resilient to remote desert telecom dropouts between Awash and Galafi.",
      local_expertise: "Headquartered directly inside the Dire Dawa logistics hub with 24/7 technical corridor support.",
      distribution_moat: "Preferred partner status with Ethiopian national heavy transport associations.",
    },
    founders: [
      {
        name: "Kalkidan Yilma",
        role: "Chief Operations Officer",
        background: "Former logistics director at Ethiopian Shipping Lines; 11+ years cross-border freight operations experience.",
      },
      {
        name: "Yonas Melaku",
        role: "Chief Technology Officer",
        background: "Embedded systems engineer; ex-telecom IoT firmware architect.",
      },
    ],
    team_breakdown: {
      technical_team_size: 7,
      ai_data_science_size: 3,
      key_team_strength: "Ex-Ethiopian Shipping Lines logistics directors paired with custom IoT firmware engineers in Dire Dawa.",
    },
    impact: {
      beneficiaries_reached: "450 trucks active; 380,000 doses of temperature-sensitive vaccines protected against spoilage",
      jobs_created: 16,
      women_youth_representation: "50% female executive leadership; 80% youth technicians in Dire Dawa",
      sdgs: [
        { number: 9, label: "Industry, Innovation and Infrastructure" },
        { number: 3, label: "Good Health and Well-Being" },
        { number: 12, label: "Responsible Consumption and Production" },
      ],
      impact_narrative:
        "Sheba Fleet transforms vulnerable, high-risk freight corridors into transparent, temperature-guaranteed arteries, ensuring essential medicines reach hospitals without spoilage.",
    },
    products: [
      {
        name: "Sheba Route",
        summary: "Terrain and checkpoint-aware dynamic freight route optimizer minimizing fuel burn and border wait times.",
        stage: "Market",
        target_customer: "Fleet managers and cross-country haulage companies.",
        ai_functionality: "Reinforcement learning navigation that calculates elevation fuel consumption and customs queue latency.",
        differentiation: "Offline-capable cab tablet app that keeps guidance active across desolate desert stretches.",
      },
      {
        name: "ColdPulse IoT",
        summary: "Tamper-evident temperature and humidity sensor system with instant audible cab alarms and cloud telematics.",
        stage: "Pilot",
        target_customer: "Pharmaceutical distributors, dairy exporters, and cold-storage logistics operators.",
        ai_functionality: "Predictive thermal leakage model forecasting container warming 4 hours before critical threshold.",
        differentiation: "Sub-1-minute alert latency even when cellular connection is intermittently down.",
      },
    ],
    financials: {
      historical: "FY2024: $85,000 revenue (450 haulers onboarded on Djibouti corridor)",
      projected: [
        { year: "FY2025", revenue_usd: 460000, gross_profit_usd: 345000, gross_margin_pct: 75, operating_profit_usd: -110000, active_units: "1,200 Trucks" },
        { year: "FY2026", revenue_usd: 1550000, gross_profit_usd: 1240000, gross_margin_pct: 80, operating_profit_usd: 310000, active_units: "3,800 Trucks" },
        { year: "FY2027", revenue_usd: 4100000, gross_profit_usd: 3403000, gross_margin_pct: 83, operating_profit_usd: 1320000, active_units: "9,500 Trucks" },
      ],
      unit_economics: "$95 customer acquisition cost per truck with $980 3-year LTV (10.3x LTV/CAC).",
    },
    growth_plan: {
      product_growth: "Automated cargo tamper sensors and driver drowsiness computer vision in-cab cameras.",
      customer_growth: "Scale to 3,500 heavy freight trucks across all major Ethiopian shipping lines.",
      geographic_expansion: "Extend corridor telematics to Berbera (Somaliland) and Lamu (Kenya) port arteries.",
      ai_capability_expansion: "Predictive customs clearance wait time estimator and dynamic multi-modal freight routing.",
    },
    diligence_documents: [
      { title: "Sheba Fleet Seed Round Investor Presentation", category: "Pitch Deck", file_type: "PDF", file_size: "5.8 MB", status: "Available" },
      { title: "Sheba Fleet 3-Year Financial Model & Hardware Margin Analysis", category: "Financials", file_type: "XLSX", file_size: "1.6 MB", status: "Available" },
      { title: "ColdPulse IoT Sensor & Mesh Telematics Architecture", category: "Technical", file_type: "PDF", file_size: "3.5 MB", status: "Verified" },
      { title: "Dire Dawa Free Trade Zone Assembly License & EPSS Certification", category: "Regulatory & Impact", file_type: "PDF", file_size: "1.2 MB", status: "Verified" },
      { title: "Sheba Fleet Logistics Intelligence SC Cap Table", category: "Cap Table", file_type: "PDF", file_size: "490 KB", status: "Restricted" },
    ],
    investment_ask: {
      amount_usd: 850000,
      round: "Seed",
      preferred_instrument: "Priced Equity Round or SAFE",
      current_funding: "$175,000 seed grant from Dire Dawa Industrial Fund & UNDP timbuktoo",
      use_of_funds: "Onboarding 2,000 cross-country freight haulers, expanding hardware assembly in Dire Dawa, and corridor telemetry stations.",
      funds_breakdown: [
        { category: "Hardware Assembly & IoT Production", percentage: 40, amount_usd: 340000, description: "Manufacture of 2,000 ColdPulse transponder and sensor kits." },
        { category: "Corridor Telemetry & Support Bases", percentage: 25, amount_usd: 212500, description: "Field technician response hubs in Mille, Dire Dawa, and Djibouti." },
        { category: "AI Routing & Telematics Platform", percentage: 20, amount_usd: 170000, description: "Dynamic corridor congestion algorithm engineering." },
        { category: "Enterprise Sales & Carrier Partnerships", percentage: 15, amount_usd: 127500, description: "Fleet contracts with regional logistics unions." },
      ],
    },
    risks: [
      { risk: "Import delays on electronic microcontrollers for IoT devices.", severity: "Medium", mitigation: "Assembly inside Dire Dawa Free Trade Zone with zero customs duty delays." },
      { risk: "Driver resistance to automated temperature telemetry accountability.", severity: "Low", mitigation: "Performance-linked fuel efficiency bonuses paid directly to drivers." },
    ],
    links: [
      { label: "Website", url: "https://example.org/sheba" },
      { label: "Corridor Telematics Deck", url: "https://example.org/sheba-corridor" },
    ],
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
    legal_name: "Abyssinia Vision Industrial Intelligence Technologies PLC",
    tagline: "High-speed edge computer vision for specialty coffee bean grading & textile quality control",
    sector: "Vision AI",
    cohort: "Cohort 2",
    description:
      "Abyssinia Vision engineers high-speed edge computer vision systems and multi-spectral camera hardware for automated defect detection, instant Q-grading of specialty coffee beans, and high-speed garment stitching inspection in Ethiopian industrial parks.",
    location: "Hawassa, Ethiopia",
    operating_markets: ["Ethiopia (Hawassa Industrial Park, Addis Ababa)", "Kenya"],
    founded: "2023",
    team_size: 11,
    primary_contact: {
      name: "Natnael Desta",
      role: "Founder & Chief Optical Engineer",
      email: "natnael@abyssiniavision.ai",
      phone: "+251 91 144 8830",
    },
    problem: {
      problem_statement:
        "Ethiopian specialty coffee exporters lose up to $2,000 per shipping container due to manual grading errors and insect defect penalties, while industrial park textile mills suffer 8-12% fabric waste from manual human inspection fatigue.",
      target_affected: "Specialty coffee exporters, washing station managers, textile mills, and garment manufacturers in industrial parks.",
      severity: "Over $75M in annual export discounts and international buyer disputes resulting from inconsistent manual visual grading.",
      current_alternatives: "Manual sorting by human workers sitting beside conveyer belts inspecting beans and fabrics with naked eyes.",
      why_alternatives_fail: "Human inspectors experience visual fatigue within 45 minutes; visual defect sorting is subjective and impossible to audit.",
    },
    ai_tech: {
      technology_type: "Ultra-High-Speed Edge Computer Vision & Multi-Spectral Defect Segmentation",
      models_used: ["Custom TensorRT YOLO-Coffee-V4", "Edge ViT Multi-Spectral Classifier", "Real-Time 120 FPS Defect Tracking Pipeline"],
      model_ownership: "Proprietary optical models and hardware sensor designs",
      system_architecture: "Industrial optical sorting unit mounting 120 FPS global-shutter cameras and Nvidia Jetson Orin edge accelerators.",
      proprietary_ip: "Multi-spectral wavelength calibration separating immature and mold-damaged green coffee beans under variable lighting.",
      data_sources: "2.4M high-resolution macro images of green specialty coffee beans (Yirgacheffe, Guji, Sidama, Harar) and woven textiles.",
      dataset_size: "3.8 TB labeled multi-spectral optical image dataset.",
      data_rights: "Full proprietary rights co-validated with Ethiopian Coffee Quality Inspection Center.",
      data_advantage: "The world’s largest labeled dataset of heirloom Ethiopian coffee botanical varietals and primary defects.",
    },
    market: {
      tam_usd: "$1.7B",
      sam_usd: "$360M",
      som_usd: "$48M",
      customer_segments: ["Specialty Coffee Export Houses", "Coffee Washing Stations", "Textile & Garment Mills in Industrial Parks", "Commodity Exchanges"],
      expansion_markets: ["Rwanda", "Uganda", "Colombia", "Vietnam"],
      opportunity_narrative:
        "Global specialty coffee roasters pay up to 40% premiums for certified defect-free lots, making automated optical grading high ROI for export mills.",
    },
    business_model: {
      revenue_model: "Hardware Machine Sale + Annual AI Vision Software Licensing & Maintenance",
      pricing: "$24,000 per optical sorting unit + $3,500 / year continuous AI model updates",
      arpu: "$31,000 / processing mill first year, $4,200 annual recurring",
      mrr_arr: "ARR: $210,000 | MRR: $18,500",
      other_metrics: "Payback period of 4.2 months for coffee exporters based on defect penalty avoidance",
    },
    traction: {
      key_metric_value: "42,000,000+",
      key_metric_label: "Coffee Beans Graded",
      active_deployments: "15 Commercial Sorting Lines across Hawassa & Addis Ababa",
      key_partners: ["Ethiopian Coffee Quality Inspection Center", "Hawassa Industrial Park Investors Association", "EAII", "UNDP timbuktoo"],
      major_milestones: [
        "Certified by international Q-Graders with 99.2% alignment to official Specialty Coffee Association (SCA) scoring",
        "Reduced garment defect escape rate from 7.8% to under 0.4% at Hawassa Industrial Park garment factory",
        "Designed and assembled custom edge optical sorting hardware in Ethiopia",
      ],
    },
    ai_performance: {
      primary_metric: "Defect Classification Accuracy & Conveyer Throughput",
      current_performance: "99.4% Defect Recall at 120 FPS",
      baseline_benchmark: "82.5% (Manual human visual inspection benchmark)",
      improvement: "+16.9% higher defect detection with zero human fatigue degradation",
      latency: "Under 8 milliseconds per image frame on Nvidia Jetson Orin",
      inference_cost: "$0.000008 per sorted coffee bean",
      validation: "Benchmarked against official blind laboratory Q-grading tests across 50 export lots.",
      scale: "42,000,000+ beans graded; 120 frames per second; sub-8ms latency per inspection frame",
    },
    competitive_advantage: {
      main_competitors: ["Bühler Sortex (Cost > $150,000 per machine)", "Manual sorting labor", "Tomra"],
      proprietary_moat: "Hardware cost 70% lower than European machines with software tuned specifically for Ethiopian heirloom varietals.",
      local_expertise: "Engineered on-site in Hawassa with direct access to regional coffee washing stations and industrial parks.",
      distribution_moat: "Direct partnerships with major Ethiopian coffee exporter associations and industrial park mills.",
    },
    founders: [
      {
        name: "Natnael Desta, MSc",
        role: "Chief Executive Officer & Hardware Architect",
        background: "Former optical systems researcher; specialized in high-speed industrial imaging and embedded Jetson pipelines.",
      },
      {
        name: "Meron Hailemariam",
        role: "Head of AI Vision Models",
        background: "Ex-EAII Computer Vision fellow; lead researcher on multi-spectral agricultural classification.",
      },
    ],
    team_breakdown: {
      technical_team_size: 7,
      ai_data_science_size: 3,
      key_team_strength: "Specialized optical camera hardware designers and embedded Nvidia Jetson TensorRT engineers in Hawassa.",
    },
    impact: {
      beneficiaries_reached: "15 export mills automated; $2.4M in export defect price penalties averted",
      jobs_created: 17,
      women_youth_representation: "Up-skilled 42 former manual sorting workers to certified machine vision technicians",
      sdgs: [
        { number: 9, label: "Industry, Innovation and Infrastructure" },
        { number: 8, label: "Decent Work and Economic Growth" },
        { number: 12, label: "Responsible Consumption and Production" },
      ],
      impact_narrative:
        "Abyssinia Vision replaces backbreaking, eyesight-damaging manual sorting labor with high-tech automated optics, preserving exporter margins and elevating Ethiopian specialty coffee internationally.",
    },
    products: [
      {
        name: "Q-Grade Optics",
        summary: "Multi-spectral computer vision camera and pneumatic ejection unit for instant coffee bean sorting and defect grading.",
        stage: "Pilot",
        target_customer: "Specialty coffee exporters, washing stations, and dry mills.",
        ai_functionality: "High-speed real-time detection of insect damage, black beans, sour beans, and immature cherries.",
        differentiation: "Assembled locally in Hawassa at one-third the price of imported European color sorters.",
      },
      {
        name: "TextileInspect AI",
        summary: "Over-the-loom high-speed camera sensor system detecting weaving and stitching flaws at 120 frames per second.",
        stage: "Market",
        target_customer: "Industrial park textile mills and garment factories.",
        ai_functionality: "Continuous fabric defect texture analysis with automated loom pause triggers.",
        differentiation: "Reduces fabric waste by 85% and eliminates human inspection fatigue bottlenecks.",
      },
    ],
    financials: {
      historical: "FY2024: $120,000 revenue (15 sorting lines deployed in Hawassa & Addis)",
      projected: [
        { year: "FY2025", revenue_usd: 620000, gross_profit_usd: 434000, gross_margin_pct: 70, operating_profit_usd: -130000, active_units: "28 Sorting Lines" },
        { year: "FY2026", revenue_usd: 1850000, gross_profit_usd: 1387500, gross_margin_pct: 75, operating_profit_usd: 380000, active_units: "85 Sorting Lines" },
        { year: "FY2027", revenue_usd: 4600000, gross_profit_usd: 3588000, gross_margin_pct: 78, operating_profit_usd: 1480000, active_units: "210 Sorting Lines" },
      ],
      unit_economics: "Hardware manufactured at $8,500 cost and retailed at $24,000 with 65% gross hardware margin.",
    },
    growth_plan: {
      product_growth: "Automated pneumatic robotic rejector and hyperspectral internal moisture sensor.",
      customer_growth: "Expand from 15 commercial sorting lines to 85 lines across Hawassa, Jimma, and Harar.",
      geographic_expansion: "Export sorting units to specialty coffee washing stations in Rwanda and Uganda.",
      ai_capability_expansion: "120 FPS real-time heirloom varietal classification (Gesha, Sidama, Yirgacheffe botanical profiles).",
    },
    diligence_documents: [
      { title: "Abyssinia Vision Seed Investor Deck", category: "Pitch Deck", file_type: "PDF", file_size: "6.4 MB", status: "Available" },
      { title: "Abyssinia Vision Hardware COGS & SaaS Model Projections", category: "Financials", file_type: "XLSX", file_size: "1.4 MB", status: "Available" },
      { title: "Multi-Spectral Optical Sorting & Jetson TensorRT Benchmark", category: "Technical", file_type: "PDF", file_size: "4.3 MB", status: "Verified" },
      { title: "Ethiopian Coffee Quality Inspection Center Certification", category: "Regulatory & Impact", file_type: "PDF", file_size: "1.5 MB", status: "Verified" },
      { title: "Abyssinia Vision Industrial Intelligence PLC Cap Table", category: "Cap Table", file_type: "PDF", file_size: "510 KB", status: "Restricted" },
    ],
    investment_ask: {
      amount_usd: 950000,
      round: "Seed",
      preferred_instrument: "Priced Equity Round or SAFE",
      current_funding: "$220,000 from EAII Hardware Living Lab & UNDP timbuktoo",
      use_of_funds: "Deploying camera edge units across 40 coffee washing stations and 10 textile lines, plus machine vision assembly line expansion.",
      funds_breakdown: [
        { category: "Hardware Manufacturing & Optical Sensors", percentage: 45, amount_usd: 427500, description: "Procurement of industrial cameras, lenses, and Jetson Orin modules." },
        { category: "Field Installation & Calibration", percentage: 25, amount_usd: 237500, description: "On-site mill retrofitting teams in Hawassa, Jimma, and Dire Dawa." },
        { category: "Model Engineering & Multi-Spectral R&D", percentage: 20, amount_usd: 190000, description: "Expanding multi-spectral defect classifiers to oilseeds and pulses." },
        { category: "Commercial Sales & SCA Accreditation", percentage: 10, amount_usd: 95000, description: "Official SCA certification showcase and export trade shows." },
      ],
    },
    risks: [
      { risk: "Industrial dust accumulation on optical camera lenses in dry mills.", severity: "Medium", mitigation: "Automated high-pressure pneumatic air-blast lens self-cleaning cycle every 10 minutes." },
      { risk: "Supply chain lead times for high-speed industrial image sensors.", severity: "Low", mitigation: "Strategic component inventory buffer maintained in Hawassa Free Zone." },
    ],
    links: [
      { label: "Website", url: "https://example.org/abyssinia-vision" },
      { label: "Optical Sorting Demo Video", url: "https://example.org/abyssinia-demo" },
    ],
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
    legal_name: "Tenaw Point-of-Care Medical AI Technologies SC",
    tagline: "AI-guided point-of-care maternal & neonatal ultrasound for rural midwives",
    sector: "Health AI",
    cohort: "Cohort 3",
    description:
      "Tenaw Diagnostic develops lightweight AI software paired with handheld ultrasound probes, guiding non-specialist midwives and rural health officers through obstetric anomaly detection, gestational age estimation, and fetal presentation assessment with zero on-site radiologist required.",
    location: "Addis Ababa, Ethiopia",
    operating_markets: ["Ethiopia (Amhara, Oromia, Sidama)", "East Africa"],
    founded: "2024",
    team_size: 7,
    primary_contact: {
      name: "Dr. Henok Tadesse, MD",
      role: "Co-Founder & Clinical Director",
      email: "henok@tenaw.health",
      phone: "+251 91 166 4410",
    },
    problem: {
      problem_statement:
        "Ethiopia has fewer than 150 certified radiologists for a population of 120M, meaning over 85% of rural pregnant women never receive a single ultrasound during pregnancy, leading to high maternal and neonatal mortality from preventable breech and placenta previa complications.",
      target_affected: "Rural pregnant mothers, primary healthcare midwives, district hospitals, and regional maternity wards.",
      severity: "Maternal mortality remains high at ~267 deaths per 100,000 live births, largely due to late detection of obstructed labor and hemorrhage.",
      current_alternatives: "Manual abdominal palpation (fetoscopy) and delayed referrals to distant referral hospitals hours away.",
      why_alternatives_fail: "Manual palpation fails to detect placenta previa or multiple gestations accurately; referral costs are prohibitive for rural families.",
    },
    ai_tech: {
      technology_type: "Real-Time Biometric Computer Vision & Ultrasound Probe Navigation Guidance",
      models_used: ["TenawSonoNet (Fetal Biometry Segmentation)", "Probe Angle Orientation Guidance Model", "Automated Gestational Age Regressor"],
      model_ownership: "Proprietary medical AI models trained on verified clinical ultrasound video frames",
      system_architecture: "Lightweight edge neural network executing in real-time at 30 FPS on handheld Android tablets connected via USB-C to ultrasound probes.",
      proprietary_ip: "Dynamic visual probe guidance overlay that actively directs the midwife’s hand to locate the correct fetal trans-ventricular plane.",
      data_sources: "85,000 annotated obstetric ultrasound video clips collected across 8 Ethiopian teaching hospitals.",
      dataset_size: "2.1 TB de-identified clinical ultrasound video files.",
      data_rights: "Approved institutional review board (IRB) ethical clearance and clinical data sharing agreements with AAU College of Health Sciences.",
      data_advantage: "Largest curated obstetric ultrasound dataset in Sub-Saharan Africa covering rural nutritional variation profiles.",
    },
    market: {
      tam_usd: "$1.8B",
      sam_usd: "$390M",
      som_usd: "$55M",
      customer_segments: ["Ministry of Health Maternal & Child Health Directorate", "Primary Hospitals & Rural Health Centers", "Non-Governmental Maternal Health Organizations", "Private Maternity Clinics"],
      expansion_markets: ["Kenya", "Tanzania", "Uganda"],
      opportunity_narrative:
        "WHO recommendations mandate at least one ultrasound scan before 24 weeks of gestation for every pregnant woman, unlocking large-scale government procurement programs.",
    },
    business_model: {
      revenue_model: "Hardware Probe + Tablet Bundle + Per-Scan or Annual Software Subscription",
      pricing: "$1,450 hardware probe bundle + $35 / month software subscription or $0.75 per diagnostic scan",
      arpu: "$1,870 / clinic first year, $420 annual recurring",
      mrr_arr: "ARR: $85,000 | MRR: $7,400",
      other_metrics: "96% midwife retention; zero hardware failures recorded across 25 primary hospitals",
    },
    traction: {
      key_metric_value: "24,500+",
      key_metric_label: "Mothers Screened by Midwives",
      active_deployments: "25 Primary Healthcare Hospitals across Central & Southern Ethiopia",
      key_partners: ["Ministry of Health", "AAU College of Health Sciences", "Tikur Anbessa Obstetric Center", "EAII", "UNDP timbuktoo"],
      major_milestones: [
        "Clinical validation study completed showing 94.2% agreement with senior sonographers on fetal presentation",
        "Trained 110 rural midwives with zero prior ultrasound experience to capture diagnostic scans in 3 days",
        "Granted EFDA Medical Device Clinical Investigation Authorization",
      ],
    },
    ai_performance: {
      primary_metric: "Fetal Biometry & Presentation Concordance with Senior Radiologists",
      current_performance: "94.2% Diagnostic Accuracy",
      baseline_benchmark: "58.4% (Unguided manual midwife abdominal palpation)",
      improvement: "+35.8% increase in accurate pre-labor anomaly and breech identification",
      latency: "< 33ms per ultrasound frame (Smooth 30 FPS visual guidance)",
      inference_cost: "$0.000 (100% on-tablet local edge execution)",
      validation: "Prospective clinical trial across 3,500 patient pregnancies evaluated against expert radiologist second reads.",
      scale: "24,500+ mothers screened; 110 midwives trained; 30 FPS smooth real-time on-device inference",
    },
    competitive_advantage: {
      main_competitors: ["Butterfly Network (Lacks localized automated midwife guidance)", "GE Vscan (Expensive)", "Philips Lumify"],
      proprietary_moat: "Real-time navigation algorithms that eliminate the need for specialized sonographer training.",
      local_expertise: "Founded by AAU senior obstetricians and EAII clinical AI research fellows.",
      distribution_moat: "Direct adoption pipeline through the Ministry of Health National Maternal Health Digitization Plan.",
    },
    founders: [
      {
        name: "Dr. Henok Tadesse, MD",
        role: "Chief Executive Officer & Clinical Lead",
        background: "Assistant Professor of Obstetrics & Gynecology at AAU; 9+ years clinical ultrasound research experience.",
      },
      {
        name: "Feven Solomon, MSc",
        role: "Chief Technology Officer",
        background: "Biomedical AI software engineer; former researcher at German Cancer Research Center (DKFZ).",
      },
    ],
    team_breakdown: {
      technical_team_size: 4,
      ai_data_science_size: 2,
      key_team_strength: "Senior AAU obstetricians combined with German Cancer Research Center (DKFZ) AI alumni in Addis Ababa.",
    },
    impact: {
      beneficiaries_reached: "24,500 pregnant mothers screened; 3,400 high-risk malpresentations identified prior to emergency labor",
      jobs_created: 12,
      women_youth_representation: "100% women-centered clinical impact; 75% female midwives up-skilled",
      sdgs: [
        { number: 3, label: "Good Health and Well-Being" },
        { number: 5, label: "Gender Equality" },
        { number: 10, label: "Reduced Inequalities" },
      ],
      impact_narrative:
        "Tenaw puts diagnostic superpowers into the hands of community midwives, turning a handheld probe into a life-saving guardian that prevents catastrophic rural childbirth emergencies.",
    },
    products: [
      {
        name: "Tenaw SonoGuide",
        summary: "Real-time probe guidance and fetal biometric measurement overlay for handheld ultrasound probes.",
        stage: "Pilot",
        target_customer: "Primary health center midwives and general practitioners.",
        ai_functionality: "Automated visual crosshairs that guide probe angle and freeze the frame when optimal plane is reached.",
        differentiation: "Enables a novice midwife to accurately measure fetal head circumference and femur length with 3 days training.",
      },
      {
        name: "NeoTriage Cloud",
        summary: "Asynchronous second-opinion referral pipeline for high-risk maternal presentations.",
        stage: "Concept",
        target_customer: "Regional referral hospital obstetrics departments.",
        ai_functionality: "Automated cine-loop quality assessment and anonymized case packet generation.",
        differentiation: "Transmits compressed 3D ultrasound sweeps over 2G/3G mobile networks for specialist remote confirmation.",
      },
    ],
    financials: {
      historical: "FY2024: $38,000 revenue (clinical trials & 25 hospital deployments)",
      projected: [
        { year: "FY2025", revenue_usd: 310000, gross_profit_usd: 232500, gross_margin_pct: 75, operating_profit_usd: -85000, active_units: "110 Primary Hospitals" },
        { year: "FY2026", revenue_usd: 1100000, gross_profit_usd: 880000, gross_margin_pct: 80, operating_profit_usd: 240000, active_units: "420 Primary Hospitals" },
        { year: "FY2027", revenue_usd: 3200000, gross_profit_usd: 2656000, gross_margin_pct: 83, operating_profit_usd: 1050000, active_units: "1,400 Primary Hospitals" },
      ],
      unit_economics: "$180 midwife onboarding cost; generates $380 annual scanning fees per active clinic.",
    },
    growth_plan: {
      product_growth: "Automated amniotic fluid index calculation and cardiac rhythm Doppler assessment.",
      customer_growth: "Equip 300 primary health centers with handheld probes across Amhara, Oromia, and Sidama.",
      geographic_expansion: "Maternal health partnership pilots in Kenya and Tanzania.",
      ai_capability_expansion: "Real-time automated fetal anomaly detection with zero radiologist oversight.",
    },
    diligence_documents: [
      { title: "Tenaw Diagnostic Pre-Seed Investor Presentation", category: "Pitch Deck", file_type: "PDF", file_size: "4.9 MB", status: "Available" },
      { title: "Tenaw Point-of-Care Ultrasound Pro Forma Financials", category: "Financials", file_type: "XLSX", file_size: "1.2 MB", status: "Available" },
      { title: "TenawSonoNet Clinical Biometry Segmentation & Latency Audit", category: "Technical", file_type: "PDF", file_size: "3.6 MB", status: "Verified" },
      { title: "EFDA Medical Device Clinical Investigation Authorization Dossier", category: "Regulatory & Impact", file_type: "PDF", file_size: "2.8 MB", status: "Verified" },
      { title: "Tenaw Point-of-Care Medical AI SC Equity Structure", category: "Cap Table", file_type: "PDF", file_size: "460 KB", status: "Restricted" },
    ],
    investment_ask: {
      amount_usd: 500000,
      round: "Pre-seed",
      preferred_instrument: "SAFE or Convertible Note",
      current_funding: "$140,000 clinical innovation grant from EAII & UNDP timbuktoo",
      use_of_funds: "EFDA national medical device certification, deployment across 100 primary hospitals, and handheld probe bundle expansion.",
      funds_breakdown: [
        { category: "Clinical Certification & EFDA Regulatory Clearance", percentage: 35, amount_usd: 175000, description: "Formal multicenter clinical safety trials for Class II medical software." },
        { category: "Handheld Probe & Tablet Procurement", percentage: 30, amount_usd: 150000, description: "100 ultrasound hardware bundles deployed to primary health centers." },
        { category: "Software & Probe Guidance Engineering", percentage: 20, amount_usd: 100000, description: "Adding automated amniotic fluid index and placenta localization models." },
        { category: "Midwife Training & Living Lab Expansion", percentage: 15, amount_usd: 75000, description: "Training 300 midwives through simulation centers at EAII and AAU." },
      ],
    },
    risks: [
      { risk: "Regulatory review timelines for medical device software.", severity: "Medium", mitigation: "Active living lab partnership with Ministry of Health and AAU College of Health Sciences." },
      { risk: "Hardware probe cost barriers for small private clinics.", severity: "Low", mitigation: "Hardware-as-a-service model bundling probe and software on a monthly subscription." },
    ],
    links: [
      { label: "Website", url: "https://example.org/tenaw" },
      { label: "Clinical Video Demonstration", url: "https://example.org/tenaw-demo" },
    ],
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

const STAGE_ORDER: Record<string, number> = {
  Market: 4,
  Pilot: 3,
  Prototype: 2,
  Concept: 1,
};

/**
 * Returns the highest maturity stage achieved across a startup's product offerings.
 */
export function getStartupStage(startup: Startup): "Concept" | "Prototype" | "Pilot" | "Market" {
  if (!startup.products || startup.products.length === 0) return "Prototype";
  let highest = startup.products[0].stage;
  for (const prod of startup.products) {
    if ((STAGE_ORDER[prod.stage] || 0) > (STAGE_ORDER[highest] || 0)) {
      highest = prod.stage;
    }
  }
  return highest;
}

/**
 * Returns the assigned cohort for a startup, defaulting to Cohort 3 if unspecified.
 */
export function getStartupCohort(startup: Startup): string {
  return startup.cohort || "Cohort 3";
}
`;

fs.writeFileSync(targetPath, startupsData, 'utf8');
console.log('Successfully updated startups.ts with all 18 template dimensions!');
