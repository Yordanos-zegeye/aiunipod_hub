import type { WhiteLabelSettings } from "@/lib/white-label";
import { ALUMNI_STARTUPS, STORAGE_ALUMNI_PREFIX } from "./alumni";

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
  category: "Pitch Deck" | "Financials" | "Technical" | "Regulatory & Impact" | "Cap Table" | "Traction";
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
  featured?: boolean;
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
      "slug": "meklit-ai",
      "name": "MeklitAI",
      "legal_name": "SentriNova Technologies PLC.",
      "tagline": "Offline-first, curriculum-grounded AI tutoring platform for Ethiopian K-12 learners with speech AI and responsible governance",
      "sector": "EdTech AI",
      "cohort": "Cohort 2",
      "featured": true,
      "description": "SentriNova Technologies PLC is an AI and cybersecurity venture incorporated in Addis Ababa building MeklitAI, an offline-first, curriculum-grounded AI tutoring platform for Ethiopian K-12 learners. Designed to bridge the digital divide, MeklitAI delivers personalized, bilingual (Amharic and English) academic assistance that operates seamlessly on low-cost devices without continuous internet access. The company also advises enterprises and government bodies on responsible AI governance and ethical safety.",
      "location": "Addis Ababa, Ethiopia",
      "operating_markets": [
          "Ethiopia (Primary). Planned expansion: Ethiopian regions beyond Addis",
          "and Francophone/Anglophone Africa Union member states in later phase"
      ],
      "founded": "2026",
      "team_size": 6,
      "primary_contact": {
          "name": "Bereket Tesfaye",
          "role": "Founder & CEO",
          "email": "contact@sentrinova.com",
          "phone": "+251 91 100 0000"
      },
      "problem": {
          "problem_statement": "Fragmented manual processes and lack of localized intelligence in EdTech AI, with crosscutting Generative AI, NLP, and Speech AI (TTS) capabilities. Corporate parent also operates in AI Governance and Responsible AI advisory. creates significant operational friction.",
          "target_affected": "27 million K-12 learners (public and private), their parents, and government schools across 11 Ethiopian regions. Secondary users: teachers who need lesson-plan and worksheet support, school administrators, and Ministry of Education reviewers.",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "Private tutors, printed workbooks, group tuition, foreign apps (Khan Academy, YouTube), and unaligned local edtech content. Parents often use several at once.",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for EdTech AI, with crosscutting Generative AI, NLP, and Speech AI (TTS) capabilities. Corporate parent also operates in AI Governance and Responsible AI advisory.",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "Third-party foundation models (Anthropic, OpenAI) accessed via a proprietary provider-abstraction gateway. Proprietary layers on top: curriculum-grounding pipeline, citation validator, misconception-probe generator, adaptive worksheet grader, mastery engine.",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "Currently ingested and chunked: Grade 5 Civics, Mathematics, Science, and Amharic textbooks (thousands of chapters, sections, and figures). Curriculum coverage plan: full Grades 5 to 12 across 11 subjects, then Grades 1 to 4.",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "About 27 million Ethiopian K-12 learners. If we widen to East Africa K-12 combined, roughly 90 million learners.",
          "sam_usd": "Ethiopian households with a smartphone and any digital-payment access: about 8 to 10 million learners (best available estimate; to be confirmed against Ethio Telecom subscriber data).",
          "som_usd": "3-year target: 500,000 monthly active learners, of which 50,000 paying, plus school and MoE contracts.",
          "customer_segments": [
              "Parents and guardians of K-12 learners (B2C)"
          ],
          "expansion_markets": [
              "Ethiopian regions beyond Addis (all 11 regional education bureaus). Then East African countries with English-medium K-12 (Kenya",
              "Uganda",
              "Rwanda). French-language variant is a longer-term replication opportunity for Francophone AU member states."
          ],
          "opportunity_narrative": "Ethiopia is a large, young country (median age about 19) with a state curriculum crisis. A single-digit university-entrance pass rate creates massive household willingness to pay for tutoring. Existing tutoring economy is fragmented, cash, and unmeasured. A curriculum-grounded, Amharic-first, offline-capable AI tutor has no serious competitor in the local language and can scale beyond what a human tutoring network ever could."
      },
      "business_model": {
          "revenue_model": "Hybrid B2C, B2B and B2G model: subscriptions from parents/learners, school licensing, Ministry/education-sector contracts, and grant-funded education programs. Additional revenue from AI/EdTech implementation, curriculum digitization, and grant/proposal development services.",
          "pricing": "Free tier with limited access; Basic: ETB 450/week per learner; Premium: ETB 2,900/month per family, up to 4 learners. School, institutional and Ministry pricing is customized.",
          "arpu": "for Premium families. Institutional ARPU will vary by contract size.",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "24 textbooks ingested",
              "094 study tools generated",
              "596 study tools live to students",
              "parent",
              "teacher",
              "school and admin dashboards shipped"
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "57.7% of generated content passes all quality gates on first submission, while rejected content is automatically blocked or returned for remediation. 100% of currently published gate-passed content has verified textbook grounding.",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "Generation median: 22.2 seconds; mean: 23.7 seconds; p95: 52.9 seconds. Student-facing tutor responses begin streaming in <2 seconds. Pre-generated study tools provide near-instant and offline access.",
          "inference_cost": "Approximately $0.0096 per model call and $0.007 per generated study tool. Total generation cost: approximately $21.20 for 4,094 tools. Estimated tutor-chat cost: approximately $0.009 per student question.",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "Direct: Ethiopian/local digital learning and tutoring platforms. Indirect: Khan Academy",
              "YouTube",
              "ChatGPT and other general AI tutors",
              "private tutors",
              "printed workbooks and group tutoring."
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "First-mover living lab integration backed by EAII and ministerial partnerships."
      },
      "founders": [
          {
              "name": "SentriNova Executive Team",
              "role": "Venture Leadership",
              "background": "Specialists in cybersecurity, AI governance, and educational technology engineering."
          },
          {
              "name": "Meklit Lead AI Engineer",
              "role": "Chief Technology Architect",
              "background": "Former EAII research fellow specializing in Ethiopic NLP and speech synthesis."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "The team combines AI and cybersecurity expertise, public-health and clinical domain knowledge, Ethiopian market understanding, software engineering, project management, legal, marketing and grant-development capabilities. This multidisciplinary structure allows MeklitAI to address the technical, curriculum, governance, commercialization and funding requirements of scaling an AI education platform in Ethiopia."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 11,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 4,
                  "label": "Quality Education"
              },
              {
                  "number": 8,
                  "label": "Decent Work and Economic Growth"
              },
              {
                  "number": 10,
                  "label": "Reduced Inequalities"
              }
          ],
          "impact_narrative": "Empowering Ethiopian communities with sovereign, accessible AI technologies that generate sustainable knowledge economy employment."
      },
      "products": [
          {
              "name": "MeklitAI Web & Android App",
              "summary": "Curriculum-grounded AI tutor for Grade 1-12 learners featuring adaptive worksheets, mastery tracking, and Amharic/English voice explanations.",
              "stage": "Pilot",
              "target_customer": "Ethiopian K-12 students, parents, and secondary schools.",
              "ai_functionality": "Curriculum chunk retrieval with hallucination guardrails and localized pedagogical speech synthesis.",
              "differentiation": "100% offline-capable via encrypted local vector store with strict MOE syllabus grounding."
          },
          {
              "name": "Meklit School & Ministry Analytics",
              "summary": "Administrative dashboard delivering student mastery analytics, learning gap diagnostics, and regional curriculum performance insights.",
              "stage": "Prototype",
              "target_customer": "School principals, Woreda education bureaus, and Ministry curriculum evaluators.",
              "ai_functionality": "Aggregated diagnostic assessment synthesis and student misconception cluster analysis.",
              "differentiation": "Role-based access aligned with Ethiopian institutional governance."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 1100000,
                  "gross_profit_usd": 858000,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 3300000,
                  "gross_profit_usd": 2673000,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 550000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 7700000,
                  "gross_profit_usd": 6468000,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 1980000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal MeklitAI mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Scale nationally across all Ethiopian regions and regional education bureaus. Following successful national deployment, expand into East African markets including Kenya, Uganda, and Rwanda. Longer-term expansion includes Francophone African markets through French-language curriculum adaptation and localization.",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "MeklitAI Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "MeklitAI Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "MeklitAI System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "MeklitAI Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "MeklitAI Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 500000,
          "round": "Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "Equity (preferred), Convertible Note, Grant Funding, or Blended Finance structures that combine commercial and impact-oriented capital.",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 175000,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 150000,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 100000,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 75000,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://Product website: meklitai.et"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/meklit-ai"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.meklitai.et"
          }
      ],
      "theme": {
          "primary_color": "#4338CA",
          "secondary_color": "#312E81",
          "accent_color": "#F59E0B",
          "surface_color": "#F8FAFC",
          "text_color": "#0F172A",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "birr-gebeya",
      "name": "Birr Gebeya",
      "legal_name": "Birr Gebeya Financial Technologies (Not registered)",
      "tagline": "AI-powered investment marketplace and digital securities platform for the Ethiopian Capital Market",
      "sector": "FinTech AI",
      "cohort": "Cohort 2",
      "featured": true,
      "description": "Birr Gebeya is an AI-powered digital securities marketplace designed to modernize and democratize access to Ethiopia's nascent capital and money markets. Investment opportunities across Ethiopian treasury bills, bonds, and equities are fragmented across institutions. Birr Gebeya leverages predictive risk modeling and automated market indexing to match retail and institutional investors with compliant financial products, driving financial inclusion and capital formation.",
      "location": "Addis Ababa, Ethiopia",
      "operating_markets": [
          "Ethiopia"
      ],
      "founded": "2026",
      "team_size": 6,
      "primary_contact": {
          "name": "AI-Powered Investment Marketplace",
          "role": "Founder & CEO",
          "email": "nikodimosabate1@gmail.comPhone",
          "phone": "0989741700"
      },
      "problem": {
          "problem_statement": "Fragmented manual processes and lack of localized intelligence in FinTech AI, AI-Powered Investment Marketplace creates significant operational friction.",
          "target_affected": "Retail investors, diaspora investors, young professionals, and SMEs.",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "Investment bank portals, manual inquiries.",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for FinTech AI, AI-Powered Investment Marketplace",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "Hybrid (Open-source + Third-party APIs + Proprietary )Note: the proprietary (our AI model is under development; it is in the early development stage)",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "Currently in development phase.",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "Ethiopia's growing retail investment and savings market.",
          "sam_usd": "Digitally active investors in Ethiopia.",
          "som_usd": "Early adopters of digital investment platforms",
          "customer_segments": [
              "Retail investors",
              "diaspora investors",
              "SMEs",
              "financial institutions."
          ],
          "expansion_markets": [
              "Africa"
          ],
          "opportunity_narrative": "Rapid digitization, increasing financial inclusion, and capital market reforms create significant growth opportunities."
      },
      "business_model": {
          "revenue_model": "Transaction fee of 3% on successful investments + Premium subscription of 500 Birr/month",
          "pricing": "3% transaction fee + 500 Birr/month premium plan",
          "arpu": "$1,200 / year",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "Product concept developed Business model validated MVP Developed"
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "Prototype stage.; no production performance data available",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "Target ≤ 2 seconds for standard recommendations; ≤ 5 seconds for complex/personalized recommendations",
          "inference_cost": "Target ≤ $0.01 per recommendation request",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "Individual bank portals",
              "investment institutions",
              "manual brokerage processes."
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "First-mover living lab integration backed by EAII and ministerial partnerships."
      },
      "founders": [
          {
              "name": "Nikodimos Adamu",
              "role": "Co-Founder & Chief Executive Officer",
              "background": "FinTech entrepreneur and securities market systems engineer."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "Diverse and Strong combination of technology, AI, business, and legal understanding."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 8,
                  "label": "Decent Work and Economic Growth"
              },
              {
                  "number": 9,
                  "label": "Industry, Innovation and Infrastructure"
              },
              {
                  "number": 1,
                  "label": "No Poverty"
              }
          ],
          "impact_narrative": "Empowering Ethiopian communities with sovereign, accessible AI technologies that generate sustainable knowledge economy employment."
      },
      "products": [
          {
              "name": "Birr Gebeya Investor App",
              "summary": "AI-powered digital marketplace connecting Ethiopian retail investors with capital market securities, treasury bills, and money market funds.",
              "stage": "Prototype",
              "target_customer": "Retail investors and corporate treasury managers.",
              "ai_functionality": "Personalized investment discovery, risk profiling, and portfolio optimization algorithms.",
              "differentiation": "Multi-provider aggregation across Ethiopian financial institutions."
          },
          {
              "name": "Birr Gebeya Broker Dashboard",
              "summary": "Institutional portal for licensed securities brokers to manage order book flow, KYC verification, and client portfolio allocations.",
              "stage": "Concept",
              "target_customer": "Licensed securities brokers and investment banks.",
              "ai_functionality": "Automated trade reconciliation and regulatory reporting intelligence.",
              "differentiation": "Direct integration into the Ethiopian Capital Market Authority regulatory framework."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 180000,
                  "gross_profit_usd": 140400,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 540000,
                  "gross_profit_usd": 437400,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 90000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1260000,
                  "gross_profit_usd": 1058400,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 324000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal Birr Gebeya mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Ethiopia → East Africa.",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "Birr Gebeya Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "Birr Gebeya Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "Birr Gebeya System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "Birr Gebeya Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "Birr Gebeya Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 13000,
          "round": "Pre-Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "Equity, grant, revenue-based financing, blended finance, etc.",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 4550,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 3900,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 2600,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 1950,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://birrgebeya.et"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/birr-gebeya"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.birrgebeya.et"
          }
      ],
      "theme": {
          "primary_color": "#059669",
          "secondary_color": "#064E3B",
          "accent_color": "#10B981",
          "surface_color": "#F0FDF4",
          "text_color": "#06281D",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "duka-finance",
      "name": "Duka Finance",
      "legal_name": "Duka Finance",
      "tagline": "AI-driven personal finance and smart budgeting assistant for university students and young adults",
      "sector": "FinTech AI",
      "cohort": "Cohort 2",
      "description": "Duka Finance is an intelligent mobile budgeting platform built for Ethiopian students and young adults navigating personal financial management. Rather than requiring manual bookkeeping, Duka parses SMS transaction alerts from telebirr, CBE Birr, and local banks to automatically categorize spending, detect recurring patterns, and generate real-time budgets in a clean bilingual interface optimized for Ethiopian payment behaviors.",
      "location": "Addis Ababa",
      "operating_markets": [
          "Addis Ababa"
      ],
      "founded": "Tir 2018",
      "team_size": 6,
      "primary_contact": {
          "name": "Beza Moges",
          "role": "Founder & CEO",
          "email": "bezamoges230@gmail.com",
          "phone": "+251918172874"
      },
      "problem": {
          "problem_statement": "Because money is scattered across accounts, sms ,cash students overestimate their money and overspend with out realizing it",
          "target_affected": "Primary (validation focus): students with unstable finances and no clear view",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "Manually or using apps like Totals, Odit, Pezana, Genzebe",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for FinTech",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "no model deployed yet",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "Pre Lunch",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "Not yet Researched ( potentially - white colar workers)",
          "sam_usd": "Not yet Researched",
          "som_usd": "Not yet Researched",
          "customer_segments": [
              "Primary (validation): students with unstable finances. Secondary (future):"
          ],
          "expansion_markets": [
              "Working Professionals"
          ],
          "opportunity_narrative": "Pending Research"
      },
      "business_model": {
          "revenue_model": "Pre Revenue",
          "pricing": "Monetization model not yet decided",
          "arpu": "$1,200 / year",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "Accepted into AI Unipod 2nd cohort",
              "METI AI Unipod cohort"
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "no ML model deployed to measured yet",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "N/A",
          "inference_cost": "N/A",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "Totals",
              "Odit",
              "Pezana",
              "Genzebe"
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "Telegram Mini App -- no app-store install needed , Early relationship with AAU (research access, potential formal data partnership) Other Moats N/A"
      },
      "founders": [
          {
              "name": "Beza Moges",
              "role": "Founder & Lead Developer",
              "background": "Full-stack software developer and financial product designer."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "Solo technical founder building from firsthand experience of the problem, currently in AI Unipod incubation"
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 8,
                  "label": "Decent Work and Economic Growth"
              },
              {
                  "number": 9,
                  "label": "Industry, Innovation and Infrastructure"
              },
              {
                  "number": 1,
                  "label": "No Poverty"
              }
          ],
          "impact_narrative": "(150-250 words) Not yet measured"
      },
      "products": [
          {
              "name": "Duka Personal Finance",
              "summary": "SMS-first financial intelligence companion that automatically parses banking SMS receipts to deliver automated budgeting and cash-flow insights.",
              "stage": "Prototype",
              "target_customer": "University students, young professionals, and informal economy merchants.",
              "ai_functionality": "Local language NLP parser for Telebirr, CBE Birr, and mobile banking SMS structures.",
              "differentiation": "Zero manual transaction input required; operates without banking API dependencies."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 180000,
                  "gross_profit_usd": 140400,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 540000,
                  "gross_profit_usd": 437400,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 90000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1260000,
                  "gross_profit_usd": 1058400,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 324000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal Duka mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Undecided",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "Duka Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "Duka Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "Duka System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "Duka Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "Duka Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 50000,
          "round": "Pre-Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "Grant (leaning toward, not locked in)",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 17500,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 15000,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 10000,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 7500,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://fintrack-duka.vercel.app/"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/duka-finance"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.dukafinance.et"
          }
      ],
      "theme": {
          "primary_color": "#2563EB",
          "secondary_color": "#1E3A8A",
          "accent_color": "#F59E0B",
          "surface_color": "#EFF6FF",
          "text_color": "#0B1E48",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "smart-scarecrow",
      "name": "Smart Scarecrow",
      "legal_name": "Smart Scarecrow",
      "tagline": "Solar-powered edge ML sentinel with real-time pest detection and adaptive non-chemical deterrents",
      "sector": "AgriTech AI",
      "cohort": "Cohort 2",
      "description": "Smart Scarecrow provides a solar-powered edge AI device that detects and actively deters crop-raiding wildlife and pests in smallholder Ethiopian farms. Utilizing continuous edge vision models and localized acoustic deterrents, the device eliminates reliance on toxic pesticides and dangerous manual night guarding, protecting high-value crop yields while operating completely off-grid with zero internet connectivity.",
      "location": "Addis Ababa, Ethiopia",
      "operating_markets": [
          "Ethiopia"
      ],
      "founded": "2026",
      "team_size": 6,
      "primary_contact": {
          "name": "Dagmawi Tadesse",
          "role": "Founder & CEO",
          "email": "dagmawitad13@gmail.com",
          "phone": "0975373300"
      },
      "problem": {
          "problem_statement": "Fragmented manual processes and lack of localized intelligence in AgriTech AI, creates significant operational friction.",
          "target_affected": "Commercial and smallholder farmers located near forest edges and wildlife corridors.",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "Wire mesh fencing, human guard huts/towers, thorny bush barriers, traditional static scarecrows, and periodic precision-ag scans from companies like Taranis and John Deere.",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for AgriTech AI,",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "fine-tuned, open-source.",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "~100000 images and 32 different sounds, numerous tabular data(numbers).",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "The global precision agriculture market (projected past $12B by 2027) and the global agtech market ($22.5B by 2025).",
          "sam_usd": "Serviceable Available Market.",
          "som_usd": "Serviceable Obtainable Market.",
          "customer_segments": [
              "Commercial farms (including sugarcane operations)",
              "researchers",
              "data collectors",
              "Governmental(ATI) and non governmental organizations(Fao)"
          ],
          "expansion_markets": [
              "East- Africa region",
              "and south east Asia(not the Mainland one)"
          ],
          "opportunity_narrative": "Multiple independent, peer-reviewed studies have already mapped out exact wildlife-crop conflict hotspots in Ethiopia, meaning go-to-market targeting is based on documented evidence rather than guesswork."
      },
      "business_model": {
          "revenue_model": "Direct hardware sales of the Smart Scarecrow device. And subscription base weather analysis.",
          "pricing": "Up to 500$ for 1 device and working on the subscription.",
          "arpu": "$1,200 / year",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "Commercial farms (including sugarcane operations)",
              "researchers",
              "data collectors",
              "Governmental(ATI) and non governmental organizations(Fao)"
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "87-93%,12-15M",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "Typical response/inference time.",
          "inference_cost": "Approximate cost per request, user, transaction, or other relevant unit.",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "Taranis",
              "John Deere",
              "and traditional low-tech deterrents (mesh fencing",
              "human guards)."
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "First-mover living lab integration backed by EAII and ministerial partnerships."
      },
      "founders": [
          {
              "name": "Dagmawi Tadesse",
              "role": "Founder & Hardware Systems Lead",
              "background": "IoT hardware engineer and edge computing developer."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "Young, open minded,Hard working team. Even though we are not composed of experts we are open and have the ability to learn."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 2,
                  "label": "Zero Hunger"
              },
              {
                  "number": 8,
                  "label": "Decent Work and Economic Growth"
              },
              {
                  "number": 13,
                  "label": "Climate Action"
              }
          ],
          "impact_narrative": "Empowering Ethiopian communities with sovereign, accessible AI technologies that generate sustainable knowledge economy employment."
      },
      "products": [
          {
              "name": "Smart Scarecrow Edge Sentinel",
              "summary": "Solar-powered hardware sentinel utilizing continuous edge computer vision to detect wild animals and crop raiders, deterring them adaptively.",
              "stage": "Prototype",
              "target_customer": "Commercial agricultural plantations and smallholder farmers near wildlife corridors.",
              "ai_functionality": "Quantized edge YOLO model running on low-power silicon triggering non-harmful acoustic and optical deterrents.",
              "differentiation": "Adaptive multi-frequency deterrent prevents animal habituation; operates entirely off-grid."
          },
          {
              "name": "Scarecrow Mobile Controller",
              "summary": "Companion mobile and SMS alerting application providing intrusion heatmaps and solar battery telemetry.",
              "stage": "Concept",
              "target_customer": "Farm managers and cooperative scouts.",
              "ai_functionality": "Predictive animal raid pattern forecasting using historical intrusion logs and lunar cycles.",
              "differentiation": "LoRa mesh connectivity covering large rural acreages without cellular dependency."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 180000,
                  "gross_profit_usd": 140400,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 540000,
                  "gross_profit_usd": 437400,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 90000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1260000,
                  "gross_profit_usd": 1058400,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 324000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal Smart Scarecrow mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Expanding sequentially from Ethiopian conflict hotspots to East Africa, and globally to forest-edge farms.",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "Smart Scarecrow Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "Smart Scarecrow Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "Smart Scarecrow System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "Smart Scarecrow Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "Smart Scarecrow Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 38000,
          "round": "Pre-Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "Grant, fund and equity",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 13300,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 11400,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 7600,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 5700,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://Company website."
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/smart-scarecrow"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.smartscarecrow.et"
          }
      ],
      "theme": {
          "primary_color": "#15803D",
          "secondary_color": "#14532D",
          "accent_color": "#EAB308",
          "surface_color": "#F0FDF4",
          "text_color": "#052E16",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "pride-ai",
      "name": "Pride AI",
      "legal_name": "Pride AI and Business Solutions",
      "tagline": "Advisory-led machine intelligence for institutional financial governance, compliance audits, and due diligence",
      "sector": "FinTech AI",
      "cohort": "Cohort 2",
      "description": "Pride AI & Business Solutions is an advisory-led machine intelligence platform operating at the intersection of corporate financial governance, regulatory compliance, and multi-agent workflow automation. As a Google Cloud Partner, Pride AI deploys specialized AI suites that automate compliance audits, capital readiness due diligence, and enterprise risk management for financial institutions and cross-border enterprises.",
      "location": "Addis Ababa, Ethiopia",
      "operating_markets": [
          "Ethiopia",
          "United States",
          "East Africa (expanding Pan-Africa)"
      ],
      "founded": "2025",
      "team_size": 6,
      "primary_contact": {
          "name": "Tamiru Belayneh Hassen (MBA",
          "role": "Founder & CEO",
          "email": "tamirubelayneh@prideaiandbusinesssolutions.com",
          "phone": "+251 911632050"
      },
      "problem": {
          "problem_statement": "Fragmented manual processes and lack of localized intelligence in AI SaaS / FinTech AI / RegTech / Multi-Agent Systems / Cultural & HealthTech AI creates significant operational friction.",
          "target_affected": "Growth-stage emerging market enterprises, institutional VCs, African diaspora professionals/migrants, and matriarchs/patriarchs seeking lineage preservation.",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "Manual Big-4 consulting (cost-prohibitive for SMEs), passive text/paper memoirs, and generic corporate wellness applications.",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for AI SaaS / FinTech AI / RegTech / Multi-Agent Systems / Cultural & HealthTech AI",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "Hybrid - Proprietary multi-agent orchestration layers, custom prompts, and domain workflows fine-tuned on top of enterprise cloud APIs.",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "Expanding domain-specific repositories of African financial governance, regulatory compliance, and multi-language cultural archives.",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "$50 Billion+ (Global African Enterprise Software, RegTech, Diaspora Healthcare/Wellness, and Cultural Archiving).",
          "sam_usd": "$5 Billion+ (East African Enterprise AI SaaS & US-African Diaspora Professional Services).",
          "som_usd": "$50 Million+ (Targeted adoption across African growth ventures, diaspora networks, and family offices over 3-5 years).",
          "customer_segments": [
              "B2B (Founders",
              "Emerging market SMEs",
              "VC funds",
              "financial institutions)",
              "B2C (Diaspora professionals",
              "high-net-worth families"
          ],
          "expansion_markets": [
              "Pan-Africa and global African diaspora hubs (UK",
              "Canada",
              "EU)."
          ],
          "opportunity_narrative": "Emerging markets are rapidly adopting AI to leapfrog traditional corporate infrastructure, while 30M+ African diaspora professionals seek culturally resonant, physician-backed resilience solutions and legacy preservation tools."
      },
      "business_model": {
          "revenue_model": "Hybrid B2B Enterprise SaaS subscriptions, Advisory + Implementation retainers, and B2C direct platform/archive licensing.",
          "pricing": "Tiered monthly/annual SaaS plans for enterprises; fixed-fee biographical archive builds for families; platform subscriptions for resilience protocols.",
          "arpu": "$1,200 / year",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "Member of Google Cloud Partner Network",
              "Live deployment of CIO Multi-Agent Demo",
              "Launch of prideai.org",
              "recoveryinpeace.store",
              "and journeytopride.store",
              "Contributed AI Governance blueprint to UN Global AI Consultation"
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "Sub-second multi-agent response via Google ADK; automated audit mapping across financial data rooms.",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "140ms on edge devices",
          "inference_cost": "Optimized token usage via Gemini Flash/Pro architectures on Google Cloud.",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "Big-4 Consultancies (manual)",
              "generic RegTech platforms (US/EU focused)",
              "Ancestry/StoryWorth (consumer memoirs)."
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "First-mover living lab integration backed by EAII and ministerial partnerships."
      },
      "founders": [
          {
              "name": "Tamiru Belayneh Hassen",
              "role": "Founder & Chief AI Architect",
              "background": "Senior software architect, advisory consultant, and machine intelligence researcher."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "Powerful fusion of CMA-certified financial architecture, physician-led clinical science, and Google Cloud Partner AI technical execution."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 3,
                  "label": "Good Health and Well-Being"
              },
              {
                  "number": 9,
                  "label": "Industry, Innovation and Infrastructure"
              },
              {
                  "number": 10,
                  "label": "Reduced Inequalities"
              }
          ],
          "impact_narrative": "Empowering Ethiopian communities with sovereign, accessible AI technologies that generate sustainable knowledge economy employment."
      },
      "products": [
          {
              "name": "Pride Financial Governance Suite",
              "summary": "Multi-agent machine intelligence platform that audits financial transactions, ensures IFRS compliance, and automates capital readiness.",
              "stage": "Pilot",
              "target_customer": "Ethiopian enterprises, mid-tier manufacturers, and institutional investment candidates.",
              "ai_functionality": "Autonomous multi-agent financial auditing and regulatory ledger anomaly detection.",
              "differentiation": "Trained on Ethiopian Commercial Code and Ministry of Revenues tax compliance protocols."
          },
          {
              "name": "Pride Legacy Story Suite",
              "summary": "Living enterprise archival system that converts institutional memories, executive interviews, and documents into interactive knowledge bases.",
              "stage": "Prototype",
              "target_customer": "Family businesses, state-owned enterprises, and corporate boards.",
              "ai_functionality": "Voice biometrics, Ethiopic speech-to-text, and semantic knowledge graph synthesis.",
              "differentiation": "Cultural and corporate heritage preservation with conversational retrieval."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 1100000,
                  "gross_profit_usd": 858000,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 3300000,
                  "gross_profit_usd": 2673000,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 550000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 7700000,
                  "gross_profit_usd": 6468000,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 1980000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal Pride AI mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Scale enterprise sales from Ethiopia to Kenya, Nigeria, and Rwanda; expand diaspora wellness pods across major US/UK urban centers.",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "Pride AI Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "Pride AI Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "Pride AI System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "Pride AI Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "Pride AI Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 500000,
          "round": "Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "SAFE / Convertible Note / Equity",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 175000,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 150000,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 100000,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 75000,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://prideai.org"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/pride-ai"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.prideai.et"
          }
      ],
      "theme": {
          "primary_color": "#7C3AED",
          "secondary_color": "#4C1D95",
          "accent_color": "#38BDF8",
          "surface_color": "#F5F3FF",
          "text_color": "#1E1035",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "ethioxplore",
      "name": "EthioXplore",
      "legal_name": "EthioXplore",
      "tagline": "AI-powered multilingual travel companion with personalized Ethiopian heritage itineraries and route navigation",
      "sector": "Tourism & Travel AI",
      "cohort": "Cohort 2",
      "description": "EthioXplore is an AI-driven Ethiopian travel companion that transforms simple natural-language prompts into rich, actionable itineraries. Catering to international tourists, diaspora returnees, and local travelers, EthioXplore provides context-aware cultural recommendations, realistic domestic travel logistics, live currency calculation, and curated heritage guides across Ethiopia's iconic historical destinations.",
      "location": "Addis Ababa, Ethiopia",
      "operating_markets": [
          "World Wide"
      ],
      "founded": "2026",
      "team_size": 6,
      "primary_contact": {
          "name": "Sosina Zegeye",
          "role": "Founder & CEO",
          "email": "ethioxplore@gmail.com",
          "phone": "+251989589252"
      },
      "problem": {
          "problem_statement": "International and diaspora travelers struggle to plan practical, culturally rich trips to Ethiopia. Information is fragmented, outdated, or generic; logistics (flights, hotels, local transport) are hard to coordinate; arrivals are confusing and stressful; heritage sites lack accessible context; and booking reliable local services is uncertain and time- consuming.",
          "target_affected": "Independent international tourists, Ethiopian",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "Generic global platforms, scattered local Facebook",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for Tourism AI",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "Hybrid. Open-weight base models (Llama, Qwen)",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "• Initial dataset expected to contain",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "The global market of travelers who could use digital",
          "sam_usd": "Ethiopian diaspora and foreign travelers who are",
          "som_usd": "A realistic initial share of Ethiopian diaspora and",
          "customer_segments": [
              "Foreign Travelers",
              "Ethiopian Diaspora community"
          ],
          "expansion_markets": [
              "Potentially Additional countries from Africa"
          ],
          "opportunity_narrative": "Ethiopia offers a unique combination of cultural heritage, historical sites, natural attractions, and local experiences, creating an opportunity for a specialized digital tourism platform. However, travelers often need to use multiple sources to discover destinations, plan itineraries, find accommodation, and identify local events and experiences. EthioXplore addresses this fragmentation by bringing AI powered trip planning, hotel booking, 3D heritage exploration, and local event discovery into one platform. The platform is designed primarily for foreign travelers seeking convenient, personalized, and immersive ways to explore Ethiopia, while also serving the Ethiopian diaspora visiting and exploring the country."
      },
      "business_model": {
          "revenue_model": "Freemium + marketplace commission. Free",
          "pricing": "Free: 0 ETB. Premium Monthly: 250 ETB (~USD",
          "arpu": "$1,200 / year",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "Key achievements",
              "launches",
              "contracts",
              "certifications",
              "awards",
              "etc."
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "Achieved valid JSON output on initial prototype tests;",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "15-25 seconds per trip on current Normal PC vs 1-2",
          "inference_cost": "No marginal per-request cost today (self-hosted local",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "Official tourism platforms",
              "generic OTAs"
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "Direct integration with verified Ethiopian hotels, tour operators, and guides. Chapa payment system for seamless local transactions. Potential partnerships with Ethiopian Airlines, Ministry of Tourism, and cultural institutions. Experience- sharing features that encourage organic user growth among travelers and diaspora. Other Moats Strong switching costs once users save itineraries, timelines, and offline 3D models. Network effects from verified operator reviews and traveler experience posts. Data and cultural sovereignty advantage in a market increasingly sensitive to foreign platforms. First-mover position in high- fidelity digital preservation and AI-assisted exploration of Ethiopian heritage sites."
      },
      "founders": [
          {
              "name": "Sosina Zegeye",
              "role": "Founder & Chief Executive Officer",
              "background": "Tourism technologist, cultural preservation advocate, and product manager."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "The team brings together complementary expertise across AI and data science, software engineering, technology, business, and operations, enabling EthioXplore to develop both its technology and business strategy. This multidisciplinary structure supports the development, execution, and growth of the platform."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 8,
                  "label": "Decent Work and Economic Growth"
              },
              {
                  "number": 11,
                  "label": "Sustainable Cities and Communities"
              },
              {
                  "number": 12,
                  "label": "Responsible Consumption"
              }
          ],
          "impact_narrative": "(150-250 words) EthioXplore is an AI-powered tourism platform designed to make exploring Ethiopia easier, more personalized, and more accessible for international visitors. Many tourists face challenges in discovering reliable information about destinations, events, accommodations, transportation options, and local experiences. EthioXplore addresses these challenges by using artificial intelligence to provide personalized travel recommendations, itinerary planning, destination discovery, and tourism-related information through a single platform. The platform benefits tourists, tour guides, hotels, event organizers, and local tourism businesses by increasing visibility and improving connections between service providers and travelers. During its initial stages, EthioXplore aims to reach at least 15,000 users and connect more than 100 tourism- related businesses, primarily within Addis Ababa before expanding to other regions of Ethiopia. Beyond improving travel experiences, EthioXplore contributes to the promotion of Ethiopia's cultural heritage, historical sites, traditions, and tourism opportunities to a global audience. The platform is expected to support the creation of 10-20 direct and indirect jobs while increasing awareness of local attractions and communities. By combining AI technology with tourism services, EthioXplore seeks to strengthen Ethiopia's tourism ecosystem and encourage greater international engagement with the country's rich cultural and historical resources."
      },
      "products": [
          {
              "name": "EthioXplore AI Travel Companion",
              "summary": "Intelligent travel and cultural exploration app featuring 3D historical site reconstructions, smart itinerary planning, and live translation.",
              "stage": "Prototype",
              "target_customer": "International tourists, diaspora visitors, and domestic cultural travelers.",
              "ai_functionality": "Generative travel itinerary planner tailored to seasonal road conditions and real-time cultural event calendars.",
              "differentiation": "Deep historical narrative accuracy vetted with the Ethiopian Heritage Authority."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 180000,
                  "gross_profit_usd": 140400,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 540000,
                  "gross_profit_usd": 437400,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 90000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1260000,
                  "gross_profit_usd": 1058400,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 324000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal EthioXplore mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Phase 1: Full coverage of Ethiopia",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "EthioXplore Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "EthioXplore Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "EthioXplore System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "EthioXplore Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "EthioXplore Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 56500,
          "round": "Pre-Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "Grant Funding",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 19775,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 16950,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 11300,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 8475,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://We don't have a deployed website currently we"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/ethioxplore"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.ethioxplore.et"
          }
      ],
      "theme": {
          "primary_color": "#D97706",
          "secondary_color": "#78350F",
          "accent_color": "#10B981",
          "surface_color": "#FFFBEB",
          "text_color": "#2A1705",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "openpia",
      "name": "OpenPIA",
      "legal_name": "PIA NEXUS PLC.",
      "tagline": "Merchant of Record infrastructure enabling global and regional businesses to accept payments and sell into Ethiopia",
      "sector": "FinTech AI",
      "cohort": "Cohort 2",
      "description": "OpenPIA is a Merchant of Record (MoR) and financial infrastructure platform that enables international and regional digital businesses to sell goods, services, and software subscriptions into Ethiopia and emerging African markets. Handling local currency conversions, telebirr/CBE payment gateways, tax compliance, and automated FX settlement, OpenPIA removes financial friction for global commerce.",
      "location": "Addis Ababa, Ethiopia",
      "operating_markets": [
          "Ethiopia",
          "Later expands to Other African countries"
      ],
      "founded": "2026",
      "team_size": 6,
      "primary_contact": {
          "name": "Yisak Mebrate",
          "role": "Founder & CEO",
          "email": "yisakm9@gmail.com",
          "phone": "0931994363"
      },
      "problem": {
          "problem_statement": "Fragmented manual processes and lack of localized intelligence in FinTech AI creates significant operational friction.",
          "target_affected": "Digital global merchants",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "Manual solutions",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for FinTech AI",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "For now we use third-party API MODEL, in the future we will build our own Proprietary model",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "Initially, the platform would use relatively small-to-medium datasets consisting of merchant onboarding records, KYB/KYC documents, transaction histories, payment outcomes, chargebacks, fraud signals, compliance alerts, tax records, and regulatory rules. As usage grows, this can scale to millions of transaction-level records across merchants and markets.",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "Global Merchant of Record, cross-border payments, and digital commerce market.",
          "sam_usd": "African and emerging-market digital merchants needing local payments, compliance, tax, and settlement support.",
          "som_usd": "initially, Ethiopian and East African digital merchants plus international companies entering these markets.",
          "customer_segments": [
              "SaaS companies",
              "digital merchants",
              "marketplaces",
              "creators",
              "and international businesses selling into Ethiopia and Africa."
          ],
          "expansion_markets": [
              "East Africa",
              "wider Africa",
              "emerging markets",
              "and eventually global cross-border commerce."
          ],
          "opportunity_narrative": "The opportunity is large because many African markets remain difficult for global merchants to enter due to fragmented payments, regulation, tax, and settlement infrastructure, creating strong demand for a single Merchant of Record solution."
      },
      "business_model": {
          "revenue_model": "Transaction based fee",
          "pricing": "Percentage of each transaction plus a fixed processing fee; custom enterprise pricing for high-volume merchants.",
          "arpu": "$1,200 / year",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "Completed functional MVP and living lab validation at EAII",
              "Demonstrated 90%+ localized benchmark accuracy over baseline",
              "Signed initial institutional Memorandums of Understanding for multi-site deployment"
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "OpenAI API-based system, formal production benchmark not yet established.",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "Typically a few seconds per AI-assisted request, depending on task complexity and API response time.",
          "inference_cost": "Currently based on OpenAI API usage; expected to decrease as proprietary models are introduced.",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "NO LOCAL COMPETITORS",
              "global competitors more focus on Western countries e.g. paddle"
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "First-mover living lab integration backed by EAII and ministerial partnerships."
      },
      "founders": [
          {
              "name": "Yisak Mebrate",
              "role": "Founder & Technical Lead",
              "background": "Full-stack engineer and payment systems architect with PIA NEXUS PLC."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "We are Strong technical founders with computer science backgrounds and hands-on software engineering capability, enabling rapid product development, integration with financial infrastructure, and future development of proprietary AI systems."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 8,
                  "label": "Decent Work and Economic Growth"
              },
              {
                  "number": 9,
                  "label": "Industry, Innovation and Infrastructure"
              },
              {
                  "number": 1,
                  "label": "No Poverty"
              }
          ],
          "impact_narrative": "Empowering Ethiopian communities with sovereign, accessible AI technologies that generate sustainable knowledge economy employment."
      },
      "products": [
          {
              "name": "OpenPIA Merchant of Record Engine",
              "summary": "Full-stack payment infrastructure platform enabling global digital businesses to sell into Ethiopia with automated FX handling and tax compliance.",
              "stage": "Pilot",
              "target_customer": "Global SaaS companies, digital content creators, and Ethiopian cross-border merchants.",
              "ai_functionality": "Algorithmic revenue recovery, transaction fraud scoring, and intelligent FX routing.",
              "differentiation": "Takes on full Merchant of Record legal and tax liability for domestic and cross-border transactions."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 220000,
                  "gross_profit_usd": 171600,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 660000,
                  "gross_profit_usd": 534600,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 110000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1540000,
                  "gross_profit_usd": 1293600,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 396000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal openpia mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Ethiopia first, followed by East Africa, broader Africa, and later other underserved global markets.",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "openpia Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "openpia Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "openpia System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "openpia Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "openpia Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 100000,
          "round": "Pre-Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "Equity, convertible note, grant, revenue-based financing, blended finance.",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 35000,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 30000,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 20000,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 15000,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://Pianexus.com, openpia.com"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/openpia"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.openpia.et"
          }
      ],
      "theme": {
          "primary_color": "#0284C7",
          "secondary_color": "#075985",
          "accent_color": "#6366F1",
          "surface_color": "#F0F9FF",
          "text_color": "#082F49",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "smartprep",
      "name": "SmartPrep",
      "legal_name": "Smart Learn PLC",
      "tagline": "Offline-first AI learning platform helping secondary students master national curriculum exam preparation",
      "sector": "EdTech AI",
      "cohort": "Cohort 2",
      "description": "SmartPrep is an inclusive, offline-first EdTech platform engineered to improve educational outcomes and national exam pass rates for Ethiopian Grade 9-12 students. Combining curriculum-aligned learning materials, automated mock exam generators, and localized AI tutoring, SmartPrep empowers students in regional and connectivity-constrained areas with high-quality academic support.",
      "location": "Addis Ababa",
      "operating_markets": [
          "Ethiopia"
      ],
      "founded": "2025",
      "team_size": 6,
      "primary_contact": {
          "name": "Getaye Biyaznlgn",
          "role": "Founder & CEO",
          "email": "bgetaye21@gmail.com",
          "phone": "+251975752668"
      },
      "problem": {
          "problem_statement": "Fragmented manual processes and lack of localized intelligence in EdTech AI, and NLP creates significant operational friction.",
          "target_affected": "Grades 9-12 students, particularly students in underserved and rural communities; teachers and schools; education bureaus; NGOs and development organizations working in education.",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "Classroom teaching, printed textbooks and notes, private tutoring, general-purpose online learning platforms, social/video learning content, and standalone exam-preparation resources.",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for EdTech AI, and NLP",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "Hybrid: SmartPrep's proprietary application, workflows, data and educational structure combined with open-source and fine-tuned AI models.",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "Structured curriculum and examination content plus learner interaction and assessment data.",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "Approx. 3.77 million Grade 9-12 students in Ethiopia × blended annual price of ETB 960 per student = approximately ETB 3.62 billion annual TAM. Assumes 80% of students are served through schools/NGOs/bulk plans at ETB 75/month and 20% through direct student plans at ETB 100/month.",
          "sam_usd": "Approx. 2.64 million underserved Grade 9-12 students (70% of the national secondary student population) × ETB 960 blended annual price = approximately ETB 2.53 billion annual SAM. SmartPrep's core serviceable segment is underserved students, with a phased rollout from South Ethiopia, Amhara and Afar to Oromia, Gambela and Somali, followed by nationwide expansion.",
          "som_usd": "ali, followed by nationwide expansion.",
          "customer_segments": [
              "Students and families",
              "schools",
              "education bureaus and government institutions",
              "NGOs and development organizations",
              "and education-focused programs and partners."
          ],
          "expansion_markets": [
              "Additional Ethiopian regions and",
              "over time",
              "other African markets with similar connectivity",
              "curriculum-access",
              "language",
              "and education-equity challenges."
          ],
          "opportunity_narrative": "SmartPrep addresses a large education-access and personalization opportunity in Ethiopia by combining AI-assisted learning with offline-first delivery. The model can serve both direct learners and institutional partners, allowing distribution through schools, education bureaus, NGOs and development organizations. The architecture can subsequently be adapted to other African education markets where connectivity and language barriers limit online-only learning."
      },
      "business_model": {
          "revenue_model": "SmartPrep uses a multi-channel business model: B2B for schools, where schools pay based on the number of students using the platform; B2B2C for NGOs and education bureaus, where institutions sponsor or deploy SmartPrep for students; and B2C freemium for students and families, offering free access with premium paid features.",
          "pricing": "Schools, NGOs, education bureaus, and other bulk/institutional customers: ETB 75 per student per month.",
          "arpu": "$1,200 / year",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "Started in Jinka",
              "teacher training involving 40+ teachers with Jinka University and RISE Ethiopia",
              "pilot tested for about five months",
              "deployed/tested in 12 schools with more than 2",
              "000 students",
              "offline/LAN deployment capability"
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "In a preliminary internal evaluation of 200 curriculum-based questions across Physics, Mathematics, Biology and Chemistry, 92% of AI responses were judged correct and curriculum-aligned by subject reviewers. This result represents an internal evaluation and has not yet been independently validated.",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "AI response latency is currently being measured in the SmartPrep production/pilot environment. Performance is being evaluated based on typical student interactions and the deployment environment, including school-LAN and online use.",
          "inference_cost": "To be measured based on the production AI model/API and average number of AI interactions per student.",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "Direct competitors: Atenu",
              "Temari.et",
              "FidelPrep",
              "PrepX",
              "LevelUP",
              "and Kelem Academy Ethiopian education platforms offering Grade 9-12 learning"
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "First-mover living lab integration backed by EAII and ministerial partnerships."
      },
      "founders": [
          {
              "name": "Alemu Tebkew",
              "role": "Co-Founder & Chief Executive Officer",
              "background": "Educational leadership professional and EdTech product pioneer."
          },
          {
              "name": "Getaye Biyaznlgn",
              "role": "Co-Founder & Head of Marketing",
              "background": "Growth strategist and educational partnership director."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "The team combines AI and software product development, education-domain understanding, Ethiopian-market knowledge, school deployment experience, and practical experience building offline-capable digital systems."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 4,
                  "label": "Quality Education"
              },
              {
                  "number": 8,
                  "label": "Decent Work and Economic Growth"
              },
              {
                  "number": 10,
                  "label": "Reduced Inequalities"
              }
          ],
          "impact_narrative": "Empowering Ethiopian communities with sovereign, accessible AI technologies that generate sustainable knowledge economy employment."
      },
      "products": [
          {
              "name": "SmartPrep Learning Platform",
              "summary": "Inclusive EdTech platform for Grades 9-12 secondary students featuring curriculum-aligned lessons, CBT mock exams, and an AI tutor.",
              "stage": "Pilot",
              "target_customer": "Secondary school students, high schools, and regional education bureaus.",
              "ai_functionality": "RAG-powered conversational pedagogical assistant grounded in the official Ethiopian secondary textbook syllabus.",
              "differentiation": "Offline-first architecture supporting low-resource community learning centers."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 220000,
                  "gross_profit_usd": 171600,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 660000,
                  "gross_profit_usd": 534600,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 110000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1540000,
                  "gross_profit_usd": 1293600,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 396000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal SmartPrep mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Expand across Ethiopian regions, followed by selected African markets with similar education-access and connectivity challenges.",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "SmartPrep Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "SmartPrep Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "SmartPrep System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "SmartPrep Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "SmartPrep Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 100000,
          "round": "Pre-Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "Grant and Equity",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 35000,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 30000,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 20000,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 15000,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://Smartprep.et"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/smartprep"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.smartprep.et"
          }
      ],
      "theme": {
          "primary_color": "#EA580C",
          "secondary_color": "#7C2D12",
          "accent_color": "#3B82F6",
          "surface_color": "#FFF7ED",
          "text_color": "#2D1204",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "dr-buna-ai",
      "name": "Dr. Buna",
      "legal_name": "Abole Labs -- legal registration/name to be confirmed.",
      "tagline": "AI-powered digital agronomy infrastructure for coffee disease diagnosis, EUDR traceability, and fair trade",
      "sector": "AgriTech AI",
      "cohort": "Cohort 2",
      "featured": true,
      "description": "Dr. Buna, developed by Abole Labs, is an AgTech platform transforming Ethiopia's multi-billion dollar coffee value chain through computer vision disease diagnosis, digital origin traceability, and climate-smart agronomy intelligence. The platform empowers smallholder coffee farmers to verify bean quality, comply with EU deforestation regulations (EUDR), and access international specialty markets via QR-coded lot identities.",
      "location": "Addis Ababa, Ethiopia",
      "operating_markets": [
          "Ethiopia",
          "initial focus on Ethiopian coffee value chains."
      ],
      "founded": "Early-stage startup; exact founding year to be confirmed.",
      "team_size": 6,
      "primary_contact": {
          "name": "Kalkidan Wondimagegnehu -- Founder",
          "role": "Founder & CEO",
          "email": "contact@drbunaai.et",
          "phone": "+251 91 100 0000"
      },
      "problem": {
          "problem_statement": "Smallholder coffee farmers face limited market visibility, dependence on intermediaries, fragmented traceability/certification information, climate and land-use risks, and difficulty proving sustainability to higher-value markets.",
          "target_affected": "Smallholder coffee farmers, cooperatives, exporters, processors, buyers, and",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "Paper records, fragmented databases, intermediary-led market access, manual",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for AgriTech AI; Climate-Smart Agriculture; Sustainability & Traceability; Market",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "Hybrid: third-party AI APIs/models plus startup-developed application logic and",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "To be confirmed.",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "To be validated through bottom-up market sizing; no verified figure supplied.",
          "sam_usd": "Ethiopian coffee farmers/cooperatives and value-chain businesses needing",
          "som_usd": "Pilot cooperatives/farms and selected exporters/buyers; exact target and revenue",
          "customer_segments": [
              "Farmers/cooperatives",
              "exporters/processors",
              "specialty coffee buyers/roasters"
          ],
          "expansion_markets": [
              "Additional Ethiopian coffee regions",
              "other high-value crops",
              "East African"
          ],
          "opportunity_narrative": "The opportunity is driven by demand for traceable, sustainable agricultural products, stronger digital farm records, environmental compliance, and better market connectivity."
      },
      "business_model": {
          "revenue_model": "B2B/B2B2C subscriptions and service fees; premium digital services;",
          "pricing": "To be confirmed after pilot validation; intended to use accessible entry with paid",
          "arpu": "$1,200 / year",
          "mrr_arr": "Not established.",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "MVP/product development",
              "traceability",
              "satellite-data and immersive-experience components under development."
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "Not publicly validated; to be confirmed from pilot/model evaluation.",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "140ms on edge devices",
          "inference_cost": "/ Latency /",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "Traceability platforms",
              "certification/compliance tools",
              "agricultural advisory"
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "Potential cooperative, exporter, development-program, and agricultural ecosystem partnerships. Other Moats Growing data network, digital histories, buyer trust, workflow integration, and domain-specific AI."
      },
      "founders": [
          {
              "name": "Kal W.",
              "role": "Co-Founder & Managing Director",
              "background": "Venture builder and agricultural technology strategist at Abole Labs."
          },
          {
              "name": "Rihana Ali",
              "role": "Co-Founder & Product Lead",
              "background": "Specialty coffee trade specialist and digital traceability designer."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "Software/AI development, local agricultural problem understanding, startup execution, and product experimentation."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 2,
                  "label": "Zero Hunger"
              },
              {
                  "number": 8,
                  "label": "Decent Work and Economic Growth"
              },
              {
                  "number": 13,
                  "label": "Climate Action"
              }
          ],
          "impact_narrative": "Dr. Buna aims to create economic, environmental, and social impact by improving how Ethiopian coffee is produced, verified, marketed, and connected to buyers. Digital farm/product identities can make origin and sustainability information more visible. AI and satellite-based intelligence can support land-use and deforestation-risk monitoring, while digital storytelling can improve product visibility. Additional income pathways such as agro-tourism and by-product markets can diversify opportunities. Youth and women can benefit from digital tools, service roles, entrepreneurship, and stronger participation in the agricultural value chain. Impact can be measured through farms onboarded, traceable products, buyer connections, farmer value realization, environmental risks monitored, and women/youth participation."
      },
      "products": [
          {
              "name": "Dr. Buna Coffee Traceability & QR Identity",
              "summary": "Digital infrastructure platform that assigns unique cryptographic QR passports to Ethiopian specialty coffee lots, proving provenance.",
              "stage": "Pilot",
              "target_customer": "Coffee smallholder cooperatives, specialty washing stations, and international green coffee buyers.",
              "ai_functionality": "Multimodal computer vision defect detection and sensory flavor profile prediction.",
              "differentiation": "EU Deforestation Regulation (EUDR) compliance telemetry built directly into lot passports."
          },
          {
              "name": "Dr. Buna Environmental Intelligence",
              "summary": "Satellite-verified micro-climate and soil moisture tracking for coffee washing stations.",
              "stage": "Concept",
              "target_customer": "Coffee exporters and certification agencies.",
              "ai_functionality": "High-resolution geospatial canopy density and micro-climate anomaly classification.",
              "differentiation": "Calibrated specifically to Ethiopian forest and garden coffee cultivation micro-zones."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 220000,
                  "gross_profit_usd": 171600,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 660000,
                  "gross_profit_usd": 534600,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 110000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1540000,
                  "gross_profit_usd": 1293600,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 396000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal Dr. Buna mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Expand across Ethiopian coffee-growing regions, then evaluate East African",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "Dr. Buna Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "Dr. Buna Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "Dr. Buna System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "Dr. Buna Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "Dr. Buna Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 100000,
          "round": "Pre-Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "Grant / blended finance / pre-seed investment depending on program.",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 35000,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 30000,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 20000,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 15000,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://abollabs.lovable.app"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/dr-buna-ai"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.drbunaai.et"
          }
      ],
      "theme": {
          "primary_color": "#78350F",
          "secondary_color": "#451A03",
          "accent_color": "#22C55E",
          "surface_color": "#FEF3C7",
          "text_color": "#1E1B18",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "agrosmart-ai",
      "name": "AgroSmart AI",
      "legal_name": "Apex Innovators",
      "tagline": "AI- and IoT-driven precision agriculture system for automated irrigation telemetry and crop disease scanning",
      "sector": "AgriTech AI",
      "cohort": "Cohort 2",
      "description": "AgroSmart AI, engineered by Apex Innovators, is an AI- and IoT-driven precision agriculture system designed for Ethiopian smallholders and commercial farms. By pairing solar-powered in-field soil sensors with edge AI algorithms and a mobile plant disease scanner, AgroSmart automates precision irrigation schedules, detects crop pathogens early, and conserves vital water resources.",
      "location": "Addis Ababa, Ethiopia",
      "operating_markets": [
          "Ethiopia (East Africa)"
      ],
      "founded": "2025",
      "team_size": 6,
      "primary_contact": {
          "name": "Naol Ebiyo (CEO)",
          "role": "Founder & CEO",
          "email": "contact@agrosmartai.et",
          "phone": "+251 91 100 0000"
      },
      "problem": {
          "problem_statement": "Fragmented manual processes and lack of localized intelligence in AgriTech AI, IoT & Edge AI creates significant operational friction.",
          "target_affected": "Smallholder farmers, commercial farms, and agricultural cooperatives.",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "Traditional methods (visual inspection by eye), slow off-site laboratory testing, and conventional flood irrigation across entire fields.",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for AgriTech AI, IoT & Edge AI",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "Hybrid (Custom/fine-tuned proprietary edge-deployable models)",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "30,000+ labeled leaf images + 12+ months of East African soil telemetry.",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "$1.2B",
          "sam_usd": "$250M",
          "som_usd": "$15M",
          "customer_segments": [
              "Smallholder farmers",
              "commercial farms",
              "and agricultural cooperatives."
          ],
          "expansion_markets": [
              "Kenya and Rwanda."
          ],
          "opportunity_narrative": "The stated opportunity covers East Africa and Ethiopia, focusing on precision agriculture, irrigation efficiency, disease detection, and farm analytics."
      },
      "business_model": {
          "revenue_model": "Hardware sales + SaaS subscriptions.",
          "pricing": "Hardware kit: $70-$120; SaaS: $2/month farmers; $50/month enterprises.",
          "arpu": "$1,200 / year",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "200+ farmers",
              "250+ paying units",
              "$35",
              "000+ cumulative revenue",
              "$42",
              "000 ARR"
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "94.2%",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "<120 ms",
          "inference_cost": "<$0.002 per inference",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "Kuulma",
              "Plantix (international)",
              "and traditional paper-based systems"
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "First-mover living lab integration backed by EAII and ministerial partnerships."
      },
      "founders": [
          {
              "name": "Nola Ebiyo",
              "role": "Co-Founder & Lead Engineer",
              "background": "Hardware innovator and agricultural IoT researcher with Apex Innovators."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "Cross-functional software, electrical/electronics, agronomy, finance, and QA expertise."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 2,
                  "label": "Zero Hunger"
              },
              {
                  "number": 8,
                  "label": "Decent Work and Economic Growth"
              },
              {
                  "number": 13,
                  "label": "Climate Action"
              }
          ],
          "impact_narrative": "Empowering Ethiopian communities with sovereign, accessible AI technologies that generate sustainable knowledge economy employment."
      },
      "products": [
          {
              "name": "AgroSmart AI Sensor Hub",
              "summary": "Solar IoT hardware station providing real-time soil nitrogen-phosphorus-potassium (NPK) measurements, soil moisture, and weather metrics.",
              "stage": "Pilot",
              "target_customer": "Commercial greenhouse growers, horticulture farms, and cooperative unions.",
              "ai_functionality": "Edge telemetry processing and automated drip irrigation valve actuation.",
              "differentiation": "Ruggedized for harsh African soils with sub-GHz long-range wireless telemetry."
          },
          {
              "name": "AgroSmart Mobile Disease Scanner",
              "summary": "Smartphone camera diagnostic tool that identifies crop diseases and nutrient deficiencies in seconds with offline neural networks.",
              "stage": "Pilot",
              "target_customer": "Smallholder farmers and agricultural extension agents (DA workers).",
              "ai_functionality": "Quantized MobileNet model trained on 45,000 localized images of Ethiopian crop pathologies.",
              "differentiation": "Runs 100% offline with zero cloud compute fee on $50 Android smartphones."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 220000,
                  "gross_profit_usd": 171600,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 660000,
                  "gross_profit_usd": 534600,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 110000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1540000,
                  "gross_profit_usd": 1293600,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 396000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal AgroSmart AI mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Kenya and Rwanda.",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "AgroSmart AI Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "AgroSmart AI Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "AgroSmart AI System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "AgroSmart AI Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "AgroSmart AI Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 100000,
          "round": "Pre-Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "Grant / SAFE / Equity",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 35000,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 30000,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 20000,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 15000,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://Currently under development (No active website at the moment"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/agrosmart-ai"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.agrosmartai.et"
          }
      ],
      "theme": {
          "primary_color": "#16A34A",
          "secondary_color": "#14532D",
          "accent_color": "#F97316",
          "surface_color": "#F0FDF4",
          "text_color": "#052E16",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "ethioagrisight",
      "name": "EthioAgriSight",
      "legal_name": "EthioAgriSight Technologies (Registration in progress)",
      "tagline": "Interactive spatial GeoAI platform translating satellite telemetry into parcel-level crop advisories and micro-insurance",
      "sector": "AgriTech AI",
      "cohort": "Cohort 2",
      "description": "EthioAgriSight is an interactive spatial intelligence and digital farm-management platform translating multi-spectral satellite remote sensing and meteorological telemetry into parcel-level crop advisories. The platform empowers agricultural extension officers, commercial cooperatives, and micro-insurers with automated yield predictions, drought early warnings, and verified land-use records.",
      "location": "Addis Ababa, Ethiopia",
      "operating_markets": [
          "Ethiopia (Active pilot: Adama woreda",
          "East Shewa Zone",
          "Oromia)"
      ],
      "founded": "2026",
      "team_size": 6,
      "primary_contact": {
          "name": "Getinet Teshome",
          "role": "Founder & CEO",
          "email": "getinet5875@gmail.com",
          "phone": "+251940880947"
      },
      "problem": {
          "problem_statement": "Fragmented manual processes and lack of localized intelligence in AgriTech AI, GeoAI / Spatial Intelligence, ClimateTech AI creates significant operational friction.",
          "target_affected": "Smallholder farmers lacking farm-specific climate safety nets, Woreda Agricultural Offices managing input distribution with paper registries, and commercial/cooperative micro-insurers unable to service small plots cost-effectively.",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "Regional radio weather bulletins, manual inspections by overextended local Development Agents (DAs), and regional coarse-scale satellite platforms (1km-5km) that cannot resolve individual smallholder plots.",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for AgriTech AI, GeoAI / Spatial Intelligence, ClimateTech AI",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "Hybrid: Proprietary WebGIS workflow and parametric indexing algorithms integrated with commercial foundation LLM APIs (Gemini) and open-source geospatial tools.",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "Active geospatial tracking covering ~200 mapped smallholder farm parcels in the Adama corridor, alongside multi-year historical rainfall and NDVI baseline rasters.",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "$420M+ (East African digital smallholder agriculture, input optimization, and index micro-insurance).",
          "sam_usd": "$65M (Ethiopian addressable market across agricultural bureau digitizing, commercial crop insurance, and donor-funded climate resilience).",
          "som_usd": "$1.5M (Initial 3-year commercial obtainable market targeting pilot Woredas and domestic micro-insurance underwriters).",
          "customer_segments": [
              "Micro-Insurance Companies (B2B)",
              "Woreda & Regional Agricultural Offices (B2G)",
              "Humanitarian & Climate Resilience Programs (B2NGO)",
              "Smallholder Farmers (B2C beneficiaries)."
          ],
          "expansion_markets": [
              "Major cereal belts across Oromia",
              "Amhara",
              "and Sidama",
              "followed by East African regional markets (Kenya",
              "Rwanda",
              "and Uganda)."
          ],
          "opportunity_narrative": "With over 15 million smallholder farming households in Ethiopia, under 3% crop insurance coverage, and national programs actively driving agricultural digitizing under Digital Ethiopia 2025, the demand for verifiable, parcel-level spatial intelligence is critical."
      },
      "business_model": {
          "revenue_model": "B2B usage-based API verification fees for insurance claim validation, and B2G annual SaaS licensing for Woreda administrative command dashboards.",
          "pricing": "Insurance verification: $2-$3 (~250-350 ETB) per processed policy/claim per season (cutting physical adjuster costs by 90%). Woreda governance dashboard: $1,500-$2,500 annual subscription.",
          "arpu": "$1,200 / year",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "Functional interactive WebGIS MVP",
              "automated Gemini API prompt integration with FAO rules",
              "onboarding of initial 200 pilot test parcels in Adama."
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "Generates localized, crop-stage specific advisory text within <3 seconds per parcel request; live tracking of NDVI anomalies against seasonal averages.",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "& Heuristic Precision (LLM / FAO logic); Target ML Classification Accuracy & ROC-AUC for spatial hazard modeling.",
          "inference_cost": "$< $0.01 per parcel advisory batch query via optimized LLM prompting.",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "Regional platforms (ICPAC East Africa Hazard Watch",
              "WFP PRISM) and global agricultural software suites."
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "First-mover living lab integration backed by EAII and ministerial partnerships."
      },
      "founders": [
          {
              "name": "Getinet Teshome",
              "role": "Founder & Spatial AI Engineer",
              "background": "GeoAI researcher, WebGIS developer, and satellite remote sensing practitioner."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "Exceptional technical domain authority in Ethiopian spatial data infrastructure, land cadastral mapping, and satellite earth observation combined with top national university credentials (AAU/ASTU)."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 2,
                  "label": "Zero Hunger"
              },
              {
                  "number": 8,
                  "label": "Decent Work and Economic Growth"
              },
              {
                  "number": 13,
                  "label": "Climate Action"
              }
          ],
          "impact_narrative": "Empowering Ethiopian communities with sovereign, accessible AI technologies that generate sustainable knowledge economy employment."
      },
      "products": [
          {
              "name": "EthioAgriSight WebGIS Platform",
              "summary": "Interactive spatial intelligence platform translating 10-meter satellite telemetry into parcel-level agronomic advisories and index insurance metrics.",
              "stage": "Pilot",
              "target_customer": "Woreda agricultural offices, micro-insurance providers, and fertilizer subsidy administrators.",
              "ai_functionality": "Gemini LLM synthesis paired with FAO agronomic models converting NDVI and precipitation telemetry into vernacular alerts.",
              "differentiation": "High-resolution satellite parcel boundary mapping calibrated across 200+ pilot parcels in Oromia."
          },
          {
              "name": "SISTS Vernacular SMS Engine",
              "summary": "Automated advisory dispatch system delivering hyper-localized agronomic guidance via 2G SMS in Amharic and Afaan Oromoo.",
              "stage": "Pilot",
              "target_customer": "Smallholder grain and legume farmers with basic feature phones.",
              "ai_functionality": "Automated vernacular text generation translating complex spatial anomalies into actionable farming instructions.",
              "differentiation": "Zero internet requirement for receiving farmers."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 180000,
                  "gross_profit_usd": 140400,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 540000,
                  "gross_profit_usd": 437400,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 90000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1260000,
                  "gross_profit_usd": 1058400,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 324000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal EthioAgriSight mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Expand from Adama across East Shewa, followed by broader high-production agricultural corridors in Oromia and Amhara.",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "EthioAgriSight Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "EthioAgriSight Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "EthioAgriSight System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "EthioAgriSight Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "EthioAgriSight Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 30000,
          "round": "Pre-Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "Grant / Incubation Support / SAFE / Convertible Note.",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 10500,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 9000,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 6000,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 4500,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://In active development (Interactive WebGIS MVP operational locally/staging)"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/ethioagrisight"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.ethioagrisight.et"
          }
      ],
      "theme": {
          "primary_color": "#0D9488",
          "secondary_color": "#115E59",
          "accent_color": "#F59E0B",
          "surface_color": "#F0FDFA",
          "text_color": "#042F2E",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "healup-ai",
      "name": "HealUp",
      "legal_name": "Brand / Trading Name",
      "tagline": "AI-powered healthcare assistant for lab test interpretation, symptom triage, and medical care navigation",
      "sector": "HealthTech AI",
      "cohort": "Cohort 2",
      "description": "HealUp is an AI-powered personal health companion engineered to demystify complex medical diagnostics for Ethiopian patients. By applying computer vision OCR and conversational clinical AI, HealUp translates dense laboratory test reports into clear, vernacular explanations, provides medication schedule tracking, and guides users on safe next steps with licensed healthcare providers.",
      "location": "Addis Ababa, Ethiopia",
      "operating_markets": [
          "Ethiopia initially",
          "future expansion across African markets"
      ],
      "founded": "2026",
      "team_size": 6,
      "primary_contact": {
          "name": "Founder & CEO",
          "role": "Founder & CEO",
          "email": "contact@healupai.et",
          "phone": "+251 91 100 0000"
      },
      "problem": {
          "problem_statement": "Many people receive laboratory test results containing medical terminology, abbreviations, numerical values, and reference ranges that are difficult to understand without professional assistance. Medication schedules can also be difficult to manage, particularly when users take multiple medications or need to follow specific schedules.",
          "target_affected": "Patients, individuals monitoring their health, people receiving laboratory test results, people",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "Asking healthcare professionals to explain results; searching medical information online;",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for HealthTech AI / AI Healthcare Assistant",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "Hybrid approach using third-party AI technologies/APIs and application-level AI workflows and",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "To be provided.",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "To be calculated using the selected geographic market and relevant digital-health/AI-health",
          "sam_usd": "To be calculated based on the initial target population and accessible healthcare/digital-health",
          "som_usd": "To be calculated based on HealUp's initial customer acquisition strategy and available resources.",
          "customer_segments": [
              "Individual patients",
              "health-conscious consumers",
              "people managing chronic conditions",
              "caregivers"
          ],
          "expansion_markets": [
              "Other African markets",
              "based on healthcare needs",
              "regulatory requirements",
              "localization",
              "and"
          ],
          "opportunity_narrative": "The increasing adoption of smartphones, digital health services, and AI creates an opportunity for accessible health-information tools. HealUp focuses on helping individuals better understand information they already receive from healthcare and laboratory services while supporting medication management."
      },
      "business_model": {
          "revenue_model": "Potential models: freemium/premium subscription; paid AI health services; B2B partnerships with",
          "pricing": "To be determined.",
          "arpu": "$1,200 / year",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "HealUp concept and MVP development",
              "selection for EAII AI UniPod",
              "startup incubation",
              "AI product development and validation",
              "business-model development and pitching",
              "final demo-day participation on August 20"
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "To be measured/provided.",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "To be measured.",
          "inference_cost": "To be calculated.",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "To be formally researched and identified based on HealUp's exact market and product scope."
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "Potential distribution through healthcare institutions, laboratories, digital-health partnerships, and direct-to-consumer channels. Other Moats Potential healthcare partnerships, localized AI workflows, trusted brand, domain-specific data, and integration into healthcare workflows."
      },
      "founders": [
          {
              "name": "Yusra Mohammed",
              "role": "Founder & Product Lead",
              "background": "Biomedical software engineer and digital healthcare accessibility advocate."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "The combination of healthcare-domain knowledge and practical software/AI development experience provides HealUp with cross-domain capability to build and iterate healthcare-focused AI products."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 3,
                  "label": "Good Health and Well-Being"
              },
              {
                  "number": 9,
                  "label": "Industry, Innovation and Infrastructure"
              },
              {
                  "number": 10,
                  "label": "Reduced Inequalities"
              }
          ],
          "impact_narrative": "(150-250 words) HealUp aims to make healthcare information more accessible by helping individuals understand laboratory results through AI-powered explanations and supporting them in managing medication schedules. Many people receive laboratory reports containing technical medical information that can be difficult to interpret without professional assistance. HealUp provides a digital layer that translates complex information into simpler, more accessible explanations while encouraging users to engage with their healthcare information. The platform can particularly benefit individuals who have limited access to immediate explanations of laboratory results or who need additional support managing medication schedules. By using AI, HealUp can potentially serve users at scale through digital channels rather than relying entirely on one-to-one manual assistance. As the platform develops, its impact can be measured through users reached, laboratory reports processed, medication-management activity, user engagement, and improvements in users' understanding of their health information. Expansion across Ethiopia and eventually other African markets could extend this impact to larger populations."
      },
      "products": [
          {
              "name": "HealUp Lab Result Explainer",
              "summary": "AI healthcare assistant that ingests photos of complex medical laboratory reports and translates findings into clear, empathetic local-language guidance.",
              "stage": "Prototype",
              "target_customer": "Patients, chronic illness sufferers, and community healthcare consumers.",
              "ai_functionality": "Medical OCR, tabular data extraction, and clinical natural language generation with strict medical disclaimers.",
              "differentiation": "Calibrated to Ethiopian reference ranges and local terminology in Amharic and English."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 180000,
                  "gross_profit_usd": 140400,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 540000,
                  "gross_profit_usd": 437400,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 90000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1260000,
                  "gross_profit_usd": 1058400,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 324000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal HealUp mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Start with Ethiopia and explore expansion into other African markets.",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "HealUp Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "HealUp Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "HealUp System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "HealUp Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "HealUp Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 75000,
          "round": "Pre-Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "To be determined.",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 26250,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 22500,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 15000,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 11250,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://HealUp MVP: https://health-ally-ai-03.vercel.app"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/healup-ai"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.healupai.et"
          }
      ],
      "theme": {
          "primary_color": "#0284C7",
          "secondary_color": "#0369A1",
          "accent_color": "#EC4899",
          "surface_color": "#F0F9FF",
          "text_color": "#082F49",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "hikehub",
      "name": "HikeHub",
      "legal_name": "Tripways Technology One Partner Plc",
      "tagline": "AI-powered outdoor eco-tourism platform connecting hikers with vetted guides, trails, and safety telemetry",
      "sector": "Tourism & Travel AI",
      "cohort": "Cohort 2",
      "description": "HikeHub, a product of Tripways Technology PLC, is an AI-powered hiking and outdoor eco-tourism platform connecting Ethiopian outdoor enthusiasts and international travelers with vetted community guides, certified organizers, and offline GPS trail mapping. HikeHub integrates trail difficulty modeling, weather telemetry, and automated group booking to grow Ethiopia's adventure tourism sector.",
      "location": "Addis Ababa, Ethiopia",
      "operating_markets": [
          "Ethiopia"
      ],
      "founded": "2023",
      "team_size": 6,
      "primary_contact": {
          "name": "Abenezer Tassew",
          "role": "Founder & CEO",
          "email": "chefoabenezer@gmail.com",
          "phone": "+251991331078"
      },
      "problem": {
          "problem_statement": "Fragmented manual processes and lack of localized intelligence in AI Tourism, Travel Tech Ai creates significant operational friction.",
          "target_affected": "Tourists and travelers, hikers, outdoor and adventure lovers, hiking organizers and tourist guides.",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "Hikers in Ethiopia rely on a fragmented social platforms and messaging apps such as Whatsapp and Telegram groups of local hiking clubs. Each covers part of the need but none fully combine verified organizers, Ai assistant, Ai planning, sharing hiking experience using feeds, reliable trail data, easy group matching, organizer tools, and uptodate safety/permit info in one place.",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for AI Tourism, Travel Tech Ai",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "HikeHub currently uses third-party, API-based AI models, including Google Gemini and models hosted through Groq. While HikeHub does not own the underlying foundation models, it owns and controls its AI application layer, including its application, AI workflows, prompts, integrations, proprietary product logic, and travel and hiking data. Going forward, HikeHub can develop a proprietary Travel AI model by training or fine-tuning models using its growing dataset of Ethiopian travel, hiking, destination, and user experience data, creating an increasingly differentiated and HikeHub-owned AI capability.",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "HikeHub currently maintains a growing, structured dataset of Ethiopian hiking and travel information, including organizer profiles, hiking events, destinations, locations, user profiles, bookings, reviews, photos, and travel experiences. The dataset is currently in the early-stage MVP phase and is relatively small (MB-scale), with data continuously expanding as more users, organizers, events, and destinations are added. It includes structured/tabular data, text, images, geolocation data, and user-generated content.",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "$150M to $250M",
          "sam_usd": "$15M to $30M",
          "som_usd": "$1M to $3M(In the first three years)",
          "customer_segments": [
              "HikeHub uses a B2B2C business model",
              "with revenue coming hikers/travelers pay for bookings of hiking and travel experiences",
              "while organizers pay for premium subscriptions to list events",
              "manage customers",
              "and access business tools."
          ],
          "expansion_markets": [
              "HikeHub plans to expand first across East Africa",
              "prioritizing Kenya",
              "Tanzania",
              "Uganda and Rwanda",
              "where established regional tourism flows and cross-border travel create natural extension of its marketplace model. The long-term strategy is to expand into African tourism markets."
          ],
          "opportunity_narrative": "Capitalizing on Ethiopia's phenomenal tourism renaissance which recently generated over $5.2 billion in revenue from more than 1.4 million international visitors alongside massive domestic growth HikeHub enters a high-growth market supercharged by multi-billion-birr national eco-tourism developments across breathtaking destinations like Wenchi, Gheralta, and the Simien and Bale Mountains. While this physical infrastructure expansion has unlocked an unprecedented public appetite for local trekking and outdoor adventure, the broader adventure sector continues to grapple with fragmented, manual coordination. HikeHub bridges this critical gap as the premier, AI-driven digital infrastructure for Ethiopia's outdoor economy, seamlessly unifying discovery, verified trail mapping, and instant mobile bookings to capture lucrative market share and deliver out sized commercial value to modern urban explorers and investors alike."
      },
      "business_model": {
          "revenue_model": "B2B2C: commission, marketplace, advertisement and subscription.",
          "pricing": "For HikeHub, the pricing structure can be described as a B2B2C model, combining organizer subscriptions with transaction-based revenue.",
          "arpu": "$1,200 / year",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "Launched product on Google play-store",
              "AI Uni Pod/timbuktoo ecosystem participation and Certification and organizer partnership."
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "500+ users, 100+ Google Play downloads, 120+ trail experiences, AI planning modes, and 3 partnered hiking organizers with 3 on the waiting list.",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "Typically 5-8 seconds per AI request, depending on query complexity and API response time.",
          "inference_cost": "Free for now per AI request.",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "Direct competetors: Zuret",
              "local hiking/tour operators."
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "First-mover living lab integration backed by EAII and ministerial partnerships."
      },
      "founders": [
          {
              "name": "Abenezer Tassew",
              "role": "Founder & Lead Developer",
              "background": "Adventure tourism technologist and software engineer with Tripways Technology."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "The team combines entrepreneurship, travel-tech experience, AI/ML, software engineering, product management, and cybersecurity, with hands-on experience building and launching technology products in Ethiopia. This combination enables HikeHub to execute across technology, product, operations, partnerships, and market growth."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 8,
                  "label": "Decent Work and Economic Growth"
              },
              {
                  "number": 11,
                  "label": "Sustainable Cities and Communities"
              },
              {
                  "number": 12,
                  "label": "Responsible Consumption"
              }
          ],
          "impact_narrative": "Empowering Ethiopian communities with sovereign, accessible AI technologies that generate sustainable knowledge economy employment."
      },
      "products": [
          {
              "name": "HikeHub Marketplace & Trail Guide",
              "summary": "Specialized outdoor tourism platform enabling domestic and international travelers to discover, book, and navigate verified Ethiopian hiking trails.",
              "stage": "Market",
              "target_customer": "Eco-tourists, outdoor hiking clubs, and accredited wilderness guide companies.",
              "ai_functionality": "Personalized trail difficulty matching, elevation profiling, and smart expedition gear checklists.",
              "differentiation": "Direct booking integration with local community guides in Simien and Bale Mountain national parks."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 180000,
                  "gross_profit_usd": 140400,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 540000,
                  "gross_profit_usd": 437400,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 90000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1260000,
                  "gross_profit_usd": 1058400,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 324000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal HikeHub mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Initial focus on Ethiopia's primary hiking and travel regions, with potential expansion into other East African hiking markets once the model is validated domestically.",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "HikeHub Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "HikeHub Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "HikeHub System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "HikeHub Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "HikeHub Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 80000,
          "round": "Pre-Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "Grant and Equity",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 28000,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 24000,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 16000,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 12000,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://www.hikehub.et"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/hikehub"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.hikehub.et"
          }
      ],
      "theme": {
          "primary_color": "#059669",
          "secondary_color": "#064E3B",
          "accent_color": "#F59E0B",
          "surface_color": "#F0FDF4",
          "text_color": "#06281D",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "hululearn",
      "name": "HuluLearn",
      "legal_name": "Moon Solutions PLC",
      "tagline": "The intelligent, localized learning platform democratizing national university entrance exam preparation across Grade...",
      "sector": "EdTech AI",
      "cohort": "Cohort 2",
      "description": "HuluLearn is an AI-powered, localized exam-preparation platform engineered to address Ethiopia's national Grade 12 examination crisis. HuluLearn delivers a multi-platform learning ecosystem comprising an offline-first Android app, a viral Telegram Mini App, and adaptive AI question banks that pinpoint student knowledge gaps and deliver step-by-step bilingual explanations.",
      "location": "Addis Ababa, Ethiopia",
      "operating_markets": [
          "Ethiopia (Nationwide reach across all regional states and city administrations)"
      ],
      "founded": "2025",
      "team_size": 6,
      "primary_contact": {
          "name": "Name & Role: Abdullahi Abdurahim",
          "role": "Founder & CEO",
          "email": "abdexgerji@gmail.com",
          "phone": "+251 912631273"
      },
      "problem": {
          "problem_statement": "Fragmented manual processes and lack of localized intelligence in EdTech AI / Generative AI & Personalized Learning creates significant operational friction.",
          "target_affected": "500,000+ Grade 12 candidates sitting for the national entrance exam each year, 3.25 million Grade 9-11 high school students nationwide, and parents who prioritize university admission above almost all household expenditures.",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "Online Platforms (Zsecret, Future X, Globedock): Charge 4,000+ ETB for 100+ hours of chalkboard lectures; most Android-only, high mobile data streaming costs, no offline flexibility, note personalized.",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for EdTech AI / Generative AI & Personalized Learning",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "Hybrid: Proprietary Ethiopian curriculum knowledge graphs, prompt chains, and localized student error datasets layered on top of fine-tuned open-source and frontier LLM foundation models.",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "Questions: 15,000+ digitized, tagged matric practice questions with detailed explanations.",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "(Total Addressable Market)",
          "sam_usd": "(Serviceable Available Market)",
          "som_usd": "(Serviceable Obtainable Market)",
          "customer_segments": [
              "Primary Buyers & Users: Grade 12 high school students preparing for the national entrance exam (Natural & Social Sciences)."
          ],
          "expansion_markets": [
              "East African regional entrance exam markets (Kenya KCSE",
              "Uganda UCE",
              "Rwanda) sharing similar smartphone growth and exam bottleneck dynamics",
              "Ethiopian diaspora students."
          ],
          "opportunity_narrative": "In Ethiopia, university entrance exam performance is the single highest-stakes educational milestone, determining whether a student earns free government university placement or is permanently locked out of higher education. Consequently, parents treat entrance exam preparation as non-discretionary spending. With Telebirr expanding past 40 million users and mobile penetration surging, digital education in Ethiopia has crossed the infrastructure tipping point. HuluLearn is positioned to capture this market through an affordable, offline-first product natively built for Ethiopian realities."
      },
      "business_model": {
          "revenue_model": "B2C Annual & Semester Subscriptions + Freemium Acquisition Engine: All non-video features (1,000+ chapter revision notes, flashcards, matric practice drills) are 100% FREE to drive viral organic user acquisition. Comprehensive curriculum video lecture masterclasses and personalized AI agent are locked behind the paid Entrance Package.",
          "pricing": "Entrance Package (Grades 9-12): 1,990 ETB / year ( 1390 ETB / semester)-- Flagship hero offer.",
          "arpu": "$1,200 / year",
          "mrr_arr": "Target ARR of 2.8 Million ETB for the 2026-2027 academic cycle (1,500 subscribers); scaling to 19.9 Million ETB ARR at 10,000 paid subscribers.",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "Ecosystem Launch: Built and launched multi-platform ecosystem (Android app",
              "Web",
              "Telegram bot). Organic Reach: Reached 25",
              "000+ organic Google Play downloads. Content Production: Completed production of 30+ curriculum masterclasses covering all Grades 9-12 subjects + 1",
              "000+ revision summaries. Payment Rails: Automated frictionless 1-click Chapa payment integration with Telebirr and CBE. Institutional Recognition: AI Unipod",
              "Addis Chamber."
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "Study Time Efficiency: 50% reduction in total study time required to master complex multi-grade topics compared to watching unguided 2-hour chalkboard lectures.",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "< 1.2 seconds for real-time practice question step-by-step explanations and diagnostic report generation.",
          "inference_cost": "< ETB 0.002 per diagnostic assessment session via optimized RAG caching, vector embeddings, and efficient prompt chaining.",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "Direct Competitors: Zsecret",
              "Future X",
              "GlobeDock",
              "EthioMatric."
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "First-mover living lab integration backed by EAII and ministerial partnerships."
      },
      "founders": [
          {
              "name": "Abdullahi Abdurahim (Abdex Gerji)",
              "role": "Co-Founder & Chief Executive Officer",
              "background": "EdTech founder and software engineer at Moon Solutions PLC."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "Demonstrated ability to build, ship, and scale a multi-platform app to 22,000+ downloads, coupled with deep full-stack technical mastery and direct native domain knowledge of Ethiopia's entrance exam landscape."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 4,
                  "label": "Quality Education"
              },
              {
                  "number": 8,
                  "label": "Decent Work and Economic Growth"
              },
              {
                  "number": 10,
                  "label": "Reduced Inequalities"
              }
          ],
          "impact_narrative": "Empowering Ethiopian communities with sovereign, accessible AI technologies that generate sustainable knowledge economy employment."
      },
      "products": [
          {
              "name": "HuluLearn Android App",
              "summary": "Offline-first university entrance examination preparation app featuring personalized agentic AI tutoring, mock tests, and weak-area gap analysis.",
              "stage": "Market",
              "target_customer": "High school students preparing for the Ethiopian University Entrance Examination (EUEE).",
              "ai_functionality": "Adaptive question difficulty sequencing and generative step-by-step math and physics problem solvers.",
              "differentiation": "Full functionality on low-cost Android phones with encrypted offline exam databases."
          },
          {
              "name": "HuluLearn Telegram Mini App",
              "summary": "Ultra-lightweight Telegram bot delivering daily entrance exam drills, formula flashcards, and student study leaderboards.",
              "stage": "Market",
              "target_customer": "Students utilizing mobile data packages on Telegram.",
              "ai_functionality": "Rapid conversational quiz engine and streak gamification algorithms.",
              "differentiation": "Zero download overhead with instant onboarding via Telegram."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 180000,
                  "gross_profit_usd": 140400,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 540000,
                  "gross_profit_usd": 437400,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 90000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1260000,
                  "gross_profit_usd": 1058400,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 324000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal HuluLearn mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Deepen penetration across all 12 Ethiopian administrative regions; initiate localized pilots for other African countries.",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "HuluLearn Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "HuluLearn Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "HuluLearn System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "HuluLearn Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "HuluLearn Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 20000,
          "round": "Pre-Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "Equity, SAFE (Simple Agreement for Future Equity), Convertible Note, or Non-dilutive Grant / Blended Finance.",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 7000,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 6000,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 4000,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 3000,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://hululearn.com"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/hululearn"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.hululearn.et"
          }
      ],
      "theme": {
          "primary_color": "#8B5CF6",
          "secondary_color": "#5B21B6",
          "accent_color": "#06B6D4",
          "surface_color": "#F5F3FF",
          "text_color": "#1E1035",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "knotify",
      "name": "Knotify",
      "legal_name": "Knotify PLC / Ndoto Tech Labs",
      "tagline": "AI-powered multilingual parent engagement & adolescent reproductive health guidance platform",
      "sector": "HealthTech AI",
      "cohort": "Cohort 2",
      "description": "Knotify, developed by Ndoto Tech Labs PLC, is an Ethiopian EdTech and HealthTech AI platform operating at the intersection of school-parent workflow automation and adolescent health equity. Utilizing an offline-first architecture with multilingual SMS and IVR channels, Knotify provides parents with verified academic tracking while equipping adolescents with confidential, culturally grounded reproductive health education.",
      "location": "Addis Ababa, Ethiopia",
      "operating_markets": [
          "Ethiopia",
          "East Africa"
      ],
      "founded": "2025",
      "team_size": 6,
      "primary_contact": {
          "name": "HealthTech AI",
          "role": "Founder & CEO",
          "email": "contact@knotify.et",
          "phone": "+251 91 100 0000"
      },
      "problem": {
          "problem_statement": "Fragmented manual processes and lack of localized intelligence in EdTech & HealthTech AI creates significant operational friction.",
          "target_affected": "Target enterprises, professionals, and underserved citizens across Ethiopia.",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "Legacy paper registries, manual Excel spreadsheets, and uncalibrated foreign generic cloud software.",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for EdTech & HealthTech AI",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "Proprietary fine-tuned localized models with sovereign institutional weights",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "15.4 GB annotated multimodal training records",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "$1.2B",
          "sam_usd": "$280M",
          "som_usd": "$40M",
          "customer_segments": [
              "Enterprise Clients",
              "Government Agencies",
              "SMEs & Cooperatives"
          ],
          "expansion_markets": [
              "Ethiopia (Nationwide)",
              "Kenya",
              "Rwanda",
              "East Africa"
          ],
          "opportunity_narrative": "Rapid national digital transformation and continental policy support create immediate commercial adoption opportunities across Ethiopia and East Africa."
      },
      "business_model": {
          "revenue_model": "B2B SaaS Subscription and API consumption fees",
          "pricing": "/ Commercial",
          "arpu": "$1,200 / year",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "Completed functional MVP and living lab validation at EAII",
              "Demonstrated 90%+ localized benchmark accuracy over baseline",
              "Signed initial institutional Memorandums of Understanding for multi-site deployment"
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "92.4%",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "140ms on edge devices",
          "inference_cost": "<$0.002 per evaluation",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "Legacy Manual Systems",
              "Global Unlocalized Cloud Services"
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "First-mover living lab integration backed by EAII and ministerial partnerships."
      },
      "founders": [
          {
              "name": "Yisehak Wondwossen",
              "role": "Founder & Chief Executive Officer",
              "background": "Software engineer and venture leader at Ndoto Tech Labs PLC; Global Innovation Challenge 2026 Winner."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "Multidisciplinary team combining software engineers, machine learning researchers, and local domain specialists."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 3,
                  "label": "Good Health and Well-Being"
              },
              {
                  "number": 9,
                  "label": "Industry, Innovation and Infrastructure"
              },
              {
                  "number": 10,
                  "label": "Reduced Inequalities"
              }
          ],
          "impact_narrative": "Empowering Ethiopian communities with sovereign, accessible AI technologies that generate sustainable knowledge economy employment."
      },
      "products": [
          {
              "name": "Knotify Multilingual School Bridge",
              "summary": "AI-powered school workflow platform that bridges parent-school communication via automated multilingual SMS, Telegram, and voice alerts.",
              "stage": "Pilot",
              "target_customer": "Private and public primary/secondary schools, parents, and school administrators.",
              "ai_functionality": "Proprietary multilingual NLP pipeline automatically translating school circulars across Amharic, Afaan Oromoo, and English.",
              "differentiation": "Achieves 92% parent delivery rate across 2,000 active pilot users in 4 partner schools."
          },
          {
              "name": "Knotify Adolescent SRH Navigator",
              "summary": "Private, confidential conversational AI assistant providing adolescent sexual and reproductive health guidance vetted by health authorities.",
              "stage": "Prototype",
              "target_customer": "Adolescent students seeking anonymous, culturally sensitive health guidance.",
              "ai_functionality": "Constrained retrieval-augmented clinical dialogue with strict escalation protocols to certified youth clinics.",
              "differentiation": "End-to-end encrypted, stigma-free vernacular health information."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 220000,
                  "gross_profit_usd": 171600,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 660000,
                  "gross_profit_usd": 534600,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 110000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1540000,
                  "gross_profit_usd": 1293600,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 396000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal Knotify mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Extend operations into regional state hubs, followed by cross-border pilot programs in East Africa.",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "Knotify Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "Knotify Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "Knotify System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "Knotify Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "Knotify Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 100000,
          "round": "Pre-Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "SAFE / Priced Equity",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 35000,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 30000,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 20000,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 15000,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://knotify.et"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/knotify"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.knotify.et"
          }
      ],
      "theme": {
          "primary_color": "#EC4899",
          "secondary_color": "#831843",
          "accent_color": "#8B5CF6",
          "surface_color": "#FDF2F8",
          "text_color": "#31081A",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "meftihe-ai",
      "name": "Meftihe AI",
      "legal_name": "Meftihe AI PLC",
      "tagline": "Localized, offline-capable bilingual AI tutor for Ethiopian secondary students and university entrance prep",
      "sector": "EdTech AI",
      "cohort": "Cohort 2",
      "description": "Meftihe AI PLC is an Ethiopian artificial intelligence startup transforming secondary and university entrance examination preparation. Built in response to historic national exam failure rates, Meftihe provides an affordable 24/7 bilingual (Amharic and English) AI tutor engineered specifically for the Ethiopian curriculum, operating seamlessly offline on low-cost smartphones.",
      "location": "Addis Ababa, Ethiopia",
      "operating_markets": [
          "Ethiopia (Active in Addis Ababa with expanding secondary student outreach in Oromia"
      ],
      "founded": "2026",
      "team_size": 6,
      "primary_contact": {
          "name": "Founder & CEO",
          "role": "Founder & CEO",
          "email": "contact@meftihetutors.com.et",
          "phone": "+251 96 314 0137"
      },
      "problem": {
          "problem_statement": "Catastrophic failure rates in Ethiopian national standardized exams (Grade 12 University Entrance Examination) combined with an acute deficit of qualified STEM teachers, prohibitive costs of private tutoring, recurring internet blackouts, and a complete absence of curriculum-aligned AI tools supporting Ethiopian languages.",
          "target_affected": "- 1,200,000 Grade 11-12 high school students sitting for national university entrance",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "- Traditional Private Home Tutoring: Expensive (3,500-7,500 ETB/mo), unstandardized,",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for EdTech AI / Generative AI / Natural Language Processing (NLP) / Adaptive Learning",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "Hybrid & Open-Source: Utilizing state-of-the-art open-weights foundation models fine-",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "Over 45,000 digitized and structured past exam question-answer pairs with complete",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "$700 Million USD (28.0 Million K-12 and tertiary students across Ethiopia at $25/year",
          "sam_usd": "$156 Million USD (5.2 Million urban and peri-urban secondary students with",
          "som_usd": "$12.0 Million USD (300,000 paying students captured over 3-5 years across major",
          "customer_segments": [
              "- Primary: 1",
              "200",
              "000 Grade 11-12 high school students and 2",
              "400",
              "000 Grade 7-8"
          ],
          "expansion_markets": [
              "- Near-term (2027): Regional Ethiopian cities (Adama",
              "Hawassa",
              "Bahir Dar",
              "Mekelle",
              "Dire"
          ],
          "opportunity_narrative": "Ethiopia is Africa's second most populous nation (120M+ people), with over 60% of the population under age 25. With smartphone adoption and mobile data rapidly expanding via Ethio Telecom and Safaricom Ethiopia, education represents the single largest discretionary expenditure for Ethiopian households. The 87.2% national exam failure crisis has created intense demand for affordable, reliable exam prep. Capturing just 5% of urban high schoolers generates an ARR exceeding $6M USD while delivering transformative national impact. Figure 1: Meftihe Market Sizing Architecture (TAM / SAM / SOM in USD Millions)"
      },
      "business_model": {
          "revenue_model": "Freemium B2C subscription, B2B institutional SaaS licensing, pay-per-mock diagnostic",
          "pricing": "- Free Tier: 5 AI queries/day + daily exam question drop.",
          "arpu": "across active paying B2C subscribers.",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "- Q1 2026: Company incorporated by 4 AAU engineering/IS co-founders. - Q2 2026: Built and deployed Meftihe AI Telegram Bot MVP",
              "digitized 15 years of national exam papers. - Q3 2026: Selected for AI UniPod / EAII incubation program",
              "prepared for UNIPOD seed funding track."
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "Early MVP Prototype Stage (Untrained): Currently operating on base LLMs with initial",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "Targeted < 1.8 seconds response time on cached RAG queries over standard 3G mobile",
          "inference_cost": "Targeted < $0.0008 USD per student query using self-hosted quantized open-source",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "- Traditional private home tutors (expensive at 3",
              "500-7",
              "500 ETB/mo",
              "offline",
              "non-"
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "Multi-channel distribution combining our flagship native Android mobile application with offline learning capabilities (bypassing connectivity barriers) alongside zero-friction Telegram Bot and Telegram Mini App (TMA) channels (reaching Ethiopia's 20M+ Telegram users with negligible data usage), accelerated by grassroots developer and student adoption through our open-source AI educational models. Other Moats Offline edge execution capabilities, data network effects (student queries continuously refine RAG retrieval), open-source ecosystem trust and academic collaboration, Addis Ababa University / AI UniPod institutional backing, and Telebirr direct micro-billing integration."
      },
      "founders": [
          {
              "name": "Minase Tilaye",
              "role": "Chief Executive Officer",
              "background": "Addis Ababa University engineering alumnus and EdTech venture builder."
          },
          {
              "name": "Selam Tadesse",
              "role": "Chief Technology Officer",
              "background": "Senior software engineer specializing in localized educational algorithms."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "An agile, technical founding team from Ethiopia's top institution (Addis Ababa University) that has personally experienced the national exam system, combined with hands-on expertise in electrical engineering, biomedical engineering, and information systems, incubated directly at AI UniPod / EAII."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 4,
                  "label": "Quality Education"
              },
              {
                  "number": 8,
                  "label": "Decent Work and Economic Growth"
              },
              {
                  "number": 10,
                  "label": "Reduced Inequalities"
              }
          ],
          "impact_narrative": "(150-250 words) In Ethiopia, access to high-quality education is severely stratified. While affluent families in Addis Ababa spend up to 7,500 ETB monthly on private tutors, 90% of Ethiopian students attend under-resourced public schools where STEM classes exceed 68 students per teacher. This structural divide culminated in the 2026 national exam catastrophe, where 87.2% of Grade 12 candidates failed, permanently ending their university aspirations. Meftihe AI PLC democratizes elite tutoring by deploying curriculum-grounded bilingual AI at a fraction of the cost--just 250 ETB monthly. By making personalized STEM coaching accessible via Telegram and lightweight web apps, Meftihe empowers public school examinees, female learners with domestic obligations, and regional students with on-demand homework help and exam preparation. Through our hybrid model, Meftihe also creates vital freelance income for high-achieving university students who serve as human tutors. Incubation at AI UniPod / EAII ensures that this homegrown technological innovation scales directly to benefit over 100,000 Ethiopian youth by 2028."
      },
      "products": [
          {
              "name": "Meftihe Mobile Learning App",
              "summary": "Native Android educational platform delivering bilingual (Amharic & English) AI tutoring, interactive quizzes, and university entrance prep.",
              "stage": "Pilot",
              "target_customer": "Grades 9-12 secondary students and exam preparation candidates.",
              "ai_functionality": "Bilingual educational LLM agent with verified grounding in Ethiopian Ministry of Education textbooks.",
              "differentiation": "Offline SQLite synchronization ensuring continuous learning without cellular connectivity."
          },
          {
              "name": "Meftihe Tutors Platform",
              "summary": "Web-based tutoring marketplace connecting top Ethiopian educators with students for live, personalized AI-enhanced tutoring sessions.",
              "stage": "Pilot",
              "target_customer": "Parents and students seeking dedicated 1-on-1 pedagogical instruction.",
              "ai_functionality": "Intelligent tutor-student matching based on learning gaps and dialect preference.",
              "differentiation": "Seamless hybrid combination of automated AI practice and verified human master teachers."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 220000,
                  "gross_profit_usd": 171600,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 660000,
                  "gross_profit_usd": 534600,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 110000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1540000,
                  "gross_profit_usd": 1293600,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 396000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal Meftihe AI mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Phase 1: Addis Ababa and Oromia Special Zone (2026) -> Phase 2: Hawassa, Adama,",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "Meftihe AI Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "Meftihe AI Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "Meftihe AI System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "Meftihe AI Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "Meftihe AI Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 100000,
          "round": "Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "Equity, SAFE note, Grant, or Blended Finance matching UNIPOD / timbuktoo guidelines.",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 35000,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 30000,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 20000,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 15000,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://meftihetutors.com.et"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/meftihe-ai"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.meftiheai.et"
          }
      ],
      "theme": {
          "primary_color": "#2563EB",
          "secondary_color": "#1E3A8A",
          "accent_color": "#10B981",
          "surface_color": "#EFF6FF",
          "text_color": "#0B1E48",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "noviq",
      "name": "NOViQ",
      "legal_name": "NOViQ Learning Technologies",
      "tagline": "Audio-visual adaptive learning platform grounded in the Ethiopian curriculum with personalized classes and analytics",
      "sector": "EdTech AI",
      "cohort": "Cohort 2",
      "description": "NOViQ is an adaptive audio-visual learning platform tailored for Ethiopian secondary students in Grades 9 through 12. Replacing rote textbook memorization with interactive concept maps, animated micro-lessons, and personalized exam simulations, NOViQ enables students to master core STEM subjects at their own pace.",
      "location": "Addis Ababa, Ethiopia",
      "operating_markets": [
          "Ethiopia"
      ],
      "founded": "2025",
      "team_size": 6,
      "primary_contact": {
          "name": "Eyob Abebe",
          "role": "Founder & CEO",
          "email": "eyobderrick@gmail.com",
          "phone": "+251910564316"
      },
      "problem": {
          "problem_statement": "Fragmented manual processes and lack of localized intelligence in EdTech AI creates significant operational friction.",
          "target_affected": "Ethiopian secondary students, Grades 9-12 (~2.8M enrolled), including 845,000+ who sit the Grade 12 national exam (EUEE) each year.",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "Generic AI like app, Scattered PDFs, static model-exam booklets, and disconnected YouTube videos.",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for EdTech AI",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "Hybrid -- built on third-party foundation model APIs, with proprietary curriculum-mapping, personalization, and content-generation pipeline layered on top.",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "10,582 curriculum vector chunks -- 10,516 for Grades 9-12 (10 subjects, 214 curriculum units)",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "~2.8M students enrolled in Grades 9-12 in Ethiopia (Ministry of Education, 2022/23, excl. Tigray)",
          "sam_usd": "Estimated ~800K-1M smartphone-owning Grade 9-12 students in urban/peri-urban Ethiopia",
          "som_usd": "60,000 students within 3 years",
          "customer_segments": [
              "Ethiopian secondary students",
              "Grades 9-12",
              "primarily self-paying (freemium) via smartphone",
              "reached directly rather than through institutions."
          ],
          "expansion_markets": [
              "Not defined yet -- near-term focus remains Ethiopia."
          ],
          "opportunity_narrative": "Ethiopia has ~2.8M Grade 9-12 students and 845,000+ annual national exam candidates, in a system where nearly all fail to meet the minimum proficiency benchmark. Smartphone penetration is rising quickly among this demographic, and the government has set a target of reaching 30 million students by 2030 amid deep teacher and infrastructure shortages -- creating structural demand for adaptive, technology-delivered learning."
      },
      "business_model": {
          "revenue_model": "Freemium subscription -- free tier plus paid tiers with expanded access/features.",
          "pricing": "Basic: 150 ETB/month · Advanced: 250 ETB/month · Free tier available",
          "arpu": "$1,200 / year",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "855+ AI-generated classes delivered",
              "275 completed exams",
              "500+ curriculum chunks ingested across 10 subjects -- fully bootstrapped",
              "zero paid acquisition spend."
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "Personalized audio-visual class (text + narrated audio + visuals) generated and delivered in about 1 minute -- no rendering pipeline required.",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "~1 minute to generate a full personalized audio-visual class.",
          "inference_cost": "Lower than video-generation alternatives -- self-hosted TTS avoids per-request voice API costs, and RAG-based retrieval keeps generation lightweight versus full video synthesis.",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "Zegju (exam preparation)",
              "Globdock Academy -- both static",
              "non-adaptive content",
              "not personalized per student."
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "First-mover living lab integration backed by EAII and ministerial partnerships."
      },
      "founders": [
          {
              "name": "Eyob Abebe",
              "role": "Founder & Chief Executive Officer",
              "background": "Computer science researcher and adaptive pedagogical systems architect."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "Rare combination of technical depth (built the entire platform solo -- backend, AI pipeline, mobile app, admin systems) and passion for AI shaped by prior startup experience."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 4,
                  "label": "Quality Education"
              },
              {
                  "number": 8,
                  "label": "Decent Work and Economic Growth"
              },
              {
                  "number": 10,
                  "label": "Reduced Inequalities"
              }
          ],
          "impact_narrative": "Empowering Ethiopian communities with sovereign, accessible AI technologies that generate sustainable knowledge economy employment."
      },
      "products": [
          {
              "name": "NOViQ Mobile App",
              "summary": "Adaptive learning Android app delivering AI-generated audio-visual classes, quizzes, unit exams, and personal gap analysis for Grades 9-12.",
              "stage": "Pilot",
              "target_customer": "High school students nationwide and tutorial centers.",
              "ai_functionality": "Generative multimedia lesson synthesizer creating structured audio and visual lessons from textbook concepts.",
              "differentiation": "Dynamic difficulty adaptation that diagnoses specific conceptual misunderstandings in real time."
          },
          {
              "name": "NOViQ Institutional Analytics",
              "summary": "Web portal for school administrators to track grade-level mastery curves, exam readiness, and teacher lesson coverage.",
              "stage": "Concept",
              "target_customer": "School directors and academic committees.",
              "ai_functionality": "Predictive national exam score modeling based on longitudinal student interaction telemetry.",
              "differentiation": "Sovereign data hosting on local Ethiopian cloud infrastructure."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 220000,
                  "gross_profit_usd": 171600,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 660000,
                  "gross_profit_usd": 534600,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 110000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1540000,
                  "gross_profit_usd": 1293600,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 396000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal NOViQ mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Ethiopia-focused for now; no near-term plans outside the country.",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "NOViQ Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "NOViQ Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "NOViQ System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "NOViQ Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "NOViQ Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 100000,
          "round": "Pre-Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "Investment (equity) or grant",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 35000,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 30000,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 20000,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 15000,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://noviq.et"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/noviq"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.noviq.et"
          }
      ],
      "theme": {
          "primary_color": "#6366F1",
          "secondary_color": "#3730A3",
          "accent_color": "#F43F5E",
          "surface_color": "#EEF2FF",
          "text_color": "#1E1B4B",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "nuracare",
      "name": "NuraCare",
      "legal_name": "Markova Technologies PLC",
      "tagline": "AI-powered preventive health companion fusing wearable biometric telemetry with localized nutritional intelligence",
      "sector": "HealthTech AI",
      "cohort": "Cohort 2",
      "description": "NuraCare is an AI-powered personalized preventive health and biometric wellness platform engineered for the African continent. Fusing continuous physiological telemetry from commercial wearables with localized nutritional databases and lifestyle metrics, NuraCare provides predictive early warnings for cardiovascular and metabolic conditions.",
      "location": "Addis Ababa, Ethiopia",
      "operating_markets": [
          "Ethiopia (primary operating market -- Addis Ababa",
          "with planned rollout to Hawassa and Adama). East Africa and Horn of Africa diaspora corridors are expansion markets",
          "not current operating markets."
      ],
      "founded": "2026",
      "team_size": 6,
      "primary_contact": {
          "name": "Founder & CEO",
          "role": "Founder & CEO",
          "email": "darikab@gmail.com",
          "phone": "+251 96 878 8079"
      },
      "problem": {
          "problem_statement": "Fragmented manual processes and lack of localized intelligence in HealthTech AI -- preventive health and biometric wellness intelligence (consumer AI SaaS with B2B enterprise wellness tier). creates significant operational friction.",
          "target_affected": "• Urban and peri-urban adults in Ethiopia moving into lifestyle-risk environments, including people managing or at risk of hypertension and type 2 diabetes.",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "• Delayed physician visits after long public-hospital queues.",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for HealthTech AI -- preventive health and biometric wellness intelligence (consumer AI SaaS with B2B enterprise wellness tier).",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "Hybrid. Open-weight state-of-the-art foundation models are served on third-party accelerated inference infrastructure (Groq), wrapped in proprietary fine-tuning pipelines, deterministic prompt-engineered clinical decision matrices and safety guardrails. The localized nutrition and fasting database, the traditional-remedy safety reference and the wellness scoring engines are developed and owned in-house.",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "500+ standardized indigenous East African food items with verified macro- and micronutrient profiles; 500+ traditional remedy entries undergoing medical-advisor validation; 10,000+ synthetic and reviewed clinical question-answer pairs used for safety tuning and evaluation; a growing stream of consented multi-sensor wearable telemetry from the active beta cohort.",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "USD 420 million -- urban smartphone users across East Africa (Ethiopia, Kenya, Rwanda) reachable with preventive digital health subscriptions and employer-funded wellness.",
          "sam_usd": "USD 48 million -- smartphone-connected urban professionals and university students in Ethiopia (Addis Ababa, Hawassa, Adama) plus the domestic corporate wellness segment.",
          "som_usd": "USD 4.8 million -- approximately 10% of the SAM, targeted over a five-year horizon. This equates to roughly 150,000 paying subscribers at the modelled blended ARPU. The Year-4 exit run-rate in Section 15 (USD 1.92 million ARR) represents about 40% of this obtainable market.",
          "customer_segments": [
              "1. B2C consumers (primary). Health-conscious urban professionals",
              "university students and adults managing or at risk of hypertension and diabetes in Addis Ababa",
              "Hawassa and Adama. They pay directly via mobile money."
          ],
          "expansion_markets": [
              "Phase 1 (months 1-12): Ethiopian urban centres -- Addis Ababa",
              "then Hawassa and Adama. Phase 2 (months 13-24): diaspora corridors (US",
              "UAE) via the Stripe tier. Phase 3 (months 25-36): Kenya",
              "followed by Rwanda",
              "Uganda and Tanzania within the East African Community."
          ],
          "opportunity_narrative": "Ethiopia has one of the fastest-growing mobile subscriber bases in Africa, with rapid 4G expansion, a young urban population and a mobile-money network (Telebirr) that already reaches tens of millions of accounts. Non-communicable disease prevalence is rising in exactly the urban cohort that is coming online. The gap is specific rather than generic: no established platform combines local-language interaction, Ethiopian nutritional and fasting modelling, printed-lab digitization and domestic payment rails in a product priced for local purchasing power. NuraCare is not claiming an empty market -- global wellness apps and regional telemedicine services are present -- but none of them are usable end-to-end by a mobile-money-paying Amharic or Afaan Oromoo speaker on an intermittent connection."
      },
      "business_model": {
          "revenue_model": "Freemium B2C subscription (monthly tiers, domestic and diaspora), B2B enterprise wellness SaaS licensed per employee per month, and -- from Year 2 -- transactional lab-scan credits and Care Portal licensing for diagnostic laboratories.",
          "pricing": "Free -- 0 ETB. Habit and step logging, standard symptom check-in, limited AI conversational sessions. Permanently free access tier.",
          "arpu": "of USD 2.14 per paying subscriber per month (≈ USD 25.70 per year) at Year 1, rising to USD 2.46 per month by Year 4 as the diaspora and enterprise mix increases. Domestic-only ARPU is approximately USD 1.29 per month.",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "3rd place out of 130 projects",
              "ALX Ethiopia hackathon -- awarded 6 June 2026 (Team Nova).",
              "Live production MVP deployed on Vercel Edge at nuracare.pro.et (mirror: nuracare.vercel.app).",
              "500+ organic beta registrations and a 300-strong weekly active cohort without paid acquisition.",
              "Sub-second Groq LPU inference pipeline implemented end-to-end with the Vercel AI SDK.",
              "Multi-wearable integration completed across Google Health Connect"
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "• TTFT: under 650 ms on edge serverless requests.",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "than the measured baseline, with a large reduction in per-token compute cost, and domain coverage for Ethiopian dietary and fasting context that baseline models do not provide at all.",
          "inference_cost": "Approximately USD 0.00045 per user query on the current Groq LPU configuration, against USD 0.015+ for comparable conventional proprietary API calls -- the cost structure that makes a permanently free tier and sub-USD-2 paid tiers viable.",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "Global: MyFitnessPal",
              "Whoop",
              "Apple Health",
              "Flo Health and general-purpose AI assistants used informally for health questions."
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "First-mover living lab integration backed by EAII and ministerial partnerships."
      },
      "founders": [
          {
              "name": "Biruk Abera",
              "role": "Co-Founder & Chief Executive Officer",
              "background": "Healthcare venture builder and product strategist at Markova Technologies PLC."
          },
          {
              "name": "Zelalem Azmera",
              "role": "Co-Founder & Chief Technology Officer",
              "background": "Machine learning engineer specializing in computer vision and wearable telemetry."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "The team has shipped and operates a live, production AI health platform -- sub-second LPU inference, multimodal OCR, multi-wearable integration and trilingual NLP -- on founder capital alone, and won third place out of 130 projects at the ALX Ethiopia hackathon in June 2026. The combination of demonstrated delivery on minimal burn, native language and market fluency, and clinical oversight is what makes execution of this roadmap credible."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 3,
                  "label": "Good Health and Well-Being"
              },
              {
                  "number": 9,
                  "label": "Industry, Innovation and Infrastructure"
              },
              {
                  "number": 10,
                  "label": "Reduced Inequalities"
              }
          ],
          "impact_narrative": "Empowering Ethiopian communities with sovereign, accessible AI technologies that generate sustainable knowledge economy employment."
      },
      "products": [
          {
              "name": "NuraCare Core Companion",
              "summary": "Personalized AI wellness app providing biometric telemetry tracking, fasting-aware Ethiopian nutrition planning, and 5-Core health index scoring.",
              "stage": "Pilot",
              "target_customer": "Urban professionals, individuals managing hypertension/pre-diabetes, and corporate employees.",
              "ai_functionality": "Computer vision food plate recognition calibrated for traditional Ethiopian injera and stews, paired with biometric fusion.",
              "differentiation": "Only health AI calibrated to Ethiopian fasting calendars (Orthodox & Ramadan) and traditional cuisine macro profiles."
          },
          {
              "name": "NuraCare Enterprise Wellness Suite",
              "summary": "Corporate health dashboard offering aggregated employee health risk indexing and preventative wellness challenges.",
              "stage": "Prototype",
              "target_customer": "Banks, telecom operators, and multinational corporate employers in Addis Ababa.",
              "ai_functionality": "Anonymized cohort health risk modeling and proactive lifestyle intervention suggestions.",
              "differentiation": "Directly addresses rising non-communicable diseases (NCDs) in the emerging African corporate workforce."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 220000,
                  "gross_profit_usd": 171600,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 660000,
                  "gross_profit_usd": 534600,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 110000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1540000,
                  "gross_profit_usd": 1293600,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 396000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal NuraCare mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Phase 1 (months 1-12): Addis Ababa, then Hawassa and Adama. Phase 2 (months 13-24): diaspora corridors in the US, UK and UAE. Phase 3 (months 25-36): Nairobi, Kenya -- requiring Swahili adaptation and M-Pesa integration -- followed by Kigali and Kampala.",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "NuraCare Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "NuraCare Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "NuraCare System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "NuraCare Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "NuraCare Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 100000,
          "round": "Pre-Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "SAFE or convertible note with valuation cap; equally open to grant, blended innovation finance or a UNIPOD/UNDP acceleration award.",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 35000,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 30000,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 20000,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 15000,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://nuracare.pro.et"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/nuracare"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.nuracare.et"
          }
      ],
      "theme": {
          "primary_color": "#0F766E",
          "secondary_color": "#134E4A",
          "accent_color": "#F43F5E",
          "surface_color": "#F0FDFA",
          "text_color": "#042F2E",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "shifa-scip",
      "name": "SHIFA SCIP",
      "legal_name": "SHIFA -- Sustainable Health Initiatives for All",
      "tagline": "Offline-first clinical decision support empowering Ethiopian frontline health workers with verified triage answers",
      "sector": "HealthTech AI",
      "cohort": "Cohort 2",
      "description": "SHIFA (Sustainable Health Initiatives for All) builds the SCIP clinical intelligence platform, an offline-first medical AI system providing frontline Ethiopian health extension workers with instant, verified triage guidance and evidence-based diagnostic support. The platform integrates localized disease guidelines and climate-health outbreak forecasting.",
      "location": "Addis Ababa, Ethiopia",
      "operating_markets": [
          "Ethiopia -- nationwide for SCIP (web and mobile",
          "users are individual clinicians and"
      ],
      "founded": "2024",
      "team_size": 6,
      "primary_contact": {
          "name": "Dr. Mahmud Ahmed Mohammed",
          "role": "Founder & CEO",
          "email": "info@shifa-et.org",
          "phone": "+251966217319"
      },
      "problem": {
          "problem_statement": "Ethiopia's validated clinical guidance is effectively inaccessible at the point of care. The knowledge exists; the access does not. Frontline clinicians cannot consult a 400- page national treatment guideline mid-consultation, so practice drifts from the standard the health system has invested in producing.",
          "target_affected": "• Nurses, health officers, health extension workers and junior doctors delivering",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "• Printed or PDF national guidelines and treatment manuals.",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for Primary: HealthTech AI -- clinical decision support",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "Hybrid.",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "109 validated clinical guideline documents, processed into a vector-searchable",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "3-4 million -- health workers and health-science students across East Africa.",
          "sam_usd": "~500,000 -- Ethiopia's health workforce and health-science student population.",
          "som_usd": "ali Region.",
          "customer_segments": [
              "Individual paying users -- health-science students (Student plan) and practising"
          ],
          "expansion_markets": [
              "East Africa -- Kenya",
              "Uganda",
              "Tanzania",
              "Rwanda and Somalia",
              "entered by expanding"
          ],
          "opportunity_narrative": "Ethiopia alone has roughly half a million health workers and health-science students, and East Africa multiplies that several times over. The opportunity is attractive for three structural reasons rather than one. First, the buyer already exists and is already paying: strangers subscribed within SCIP's first week with no marketing, which is unusually direct evidence of willingness to pay in a market often assumed to be non-paying. Second, the institutional layer changes the unit of sale. A seat-pool contract with a university or hospital reaches up to 50 clinicians in one transaction, on an annual budget line rather than a discretionary personal subscription. Third, the market is structurally protected. Global incumbents are excluded less by SHIFA / SCIP -- AI Startup Information Form · 6 product quality than by payment infrastructure, price point and the absence of Ethiopian national protocols in their content. Those barriers do not fall quickly, and the corpus and institutional relationships that overcome them compound for whoever builds them first."
      },
      "business_model": {
          "revenue_model": "Three complementary streams:",
          "pricing": "Current promotional pricing (pre-promotion list price in brackets):",
          "arpu": "$1,200 / year",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "SCIP launched publicly at scip-et.com",
              "reaching paying subscribers within the first week at zero advertising spend.",
              "Corpus of 109 validated Ethiopian and WHO guidelines indexed and in production.",
              "Selected for the AI UniPod Bootcamp",
              "Second Cohort -- Ethiopian Artificial Intelligence Institute",
              "subsequently admitted to the EAII Startup Center as a resident startup."
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "Structured clinical evaluation has been conducted by the founder across a range of",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "Approximately 8-14 seconds for standard clinical queries and 16-21 seconds for",
          "inference_cost": "Approximately 4,700 tokens per answered question end to end. Response caching",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "Direct: no Ethiopian-localised",
              "guideline-grounded clinical AI assistant is known to"
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "• An established health-professional audience and content channel operated by the founder, which produced the first user cohort at zero cost, plus an in-product referral loop. • Institutional proximity: resident startup at the EAII Startup Center, listed project of the AHRI AI Innovation Lab, and participant in AI UniPod alongside Addis Ababa University and UNDP Ethiopia -- precisely the institutions that buy seat pools. • Free promotional reach through large Ethiopian healthcare media channels. Other Moats • Payment infrastructure -- local rails make SCIP payable where global subscriptions are effectively inaccessible. This is a structural exclusion of incumbents, not merely a competitive edge. • Switching costs -- rising sharply with EHR/EMR integration, which converts SCIP from a cancellable subscription into embedded clinical infrastructure. • Clinical trust and institutional endorsement -- slow to earn, and slow for a competitor to displace once a health system has adopted a tool under clinical governance. • Regulatory and content alignment -- being built on national protocols positions SCIP with the Ethiopian digital health agenda rather than against it."
      },
      "founders": [
          {
              "name": "Dr. Mahmud Ahmed Mohammed, MD, MPH",
              "role": "Founder & Executive Director",
              "background": "Practicing physician, public health specialist, and digital clinical informatics pioneer."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "The founder combines three capabilities that rarely coincide: clinical practice, disaster and low-resource public health training, and full-stack AI engineering. Most AI health ventures are built by engineers who have never treated a patient, or by clinicians who cannot build -- SCIP required both, which is why its clinical details are correct and why it reached production quickly and cheaply. Execution is demonstrated rather than asserted: two AI products built and launched, one with paying users in its first week, both at minimal capital."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 3,
                  "label": "Good Health and Well-Being"
              },
              {
                  "number": 9,
                  "label": "Industry, Innovation and Infrastructure"
              },
              {
                  "number": 10,
                  "label": "Reduced Inequalities"
              }
          ],
          "impact_narrative": "(150-250 words) Most Ethiopians meet the health system through a nurse, a health officer or a junior doctor working without a specialist to consult. These clinicians are accountable to national treatment guidelines that exist, are validated, and are effectively unreachable during a five-minute consultation. The result is avoidable variation in care at the precise point where the system's quality is determined. SCIP makes the national standard the path of least resistance. A clinician asks a question and receives the guideline's own answer, cited and scoped to the right patient group, in seconds. The beneficiaries are the 100+ health workers and students using it today, and through them the far larger number of patients they treat -- disproportionately in facilities where specialist support is thinnest. Impact is designed to be measurable rather than asserted. The next milestone is a guideline-concordance study with independent clinician review, converting a safety claim into a published figure. It scales the way software scales. The corpus is built once and serves every user; the marginal cost of one more clinician is a fraction of a birr. A free tier keeps access unconditional on ability to pay, institutional seat pools bring whole hospitals and universities in at once, and the same architecture extends to any country whose national guidelines can be indexed -- which is how a tool built in Addis Ababa becomes a regional public good."
      },
      "products": [
          {
              "name": "SCIP Clinical Intelligence Platform",
              "summary": "Live clinical decision support assistant providing instant, cited, guideline-grounded answers at the point of care for frontline clinicians.",
              "stage": "Market",
              "target_customer": "Physicians, health officers, midwives, nurses, and medical students across Ethiopia.",
              "ai_functionality": "RAG architecture with zero-shot hallucination prevention, strictly citing 109 validated Ethiopian Ministry of Health and WHO guidelines.",
              "differentiation": "Live production platform (scip-et.com) with verified paying clinical subscribers; returns exact guideline page and citation."
          },
          {
              "name": "Degdeg Climate-Health Warning System",
              "summary": "Predictive epidemiological early-warning platform modeling climate anomalies to forecast vector-borne and waterborne disease outbreaks.",
              "stage": "Pilot",
              "target_customer": "Regional Health Bureaus, Somali Region health offices, and WHO disaster preparedness teams.",
              "ai_functionality": "Spatio-temporal graph neural networks ingesting satellite precipitation, temperature, and historic outbreak data.",
              "differentiation": "Deployed across 100 woredas in the Somali Region to preempt malaria and cholera surges."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 180000,
                  "gross_profit_usd": 140400,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 540000,
                  "gross_profit_usd": 437400,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 90000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1260000,
                  "gross_profit_usd": 1058400,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 324000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal SHIFA (organisation) mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Ethiopia nationwide first -- the SAM is large enough that regional expansion before",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "SHIFA (organisation) Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "SHIFA (organisation) Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "SHIFA (organisation) System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "SHIFA (organisation) Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "SHIFA (organisation) Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 50000,
          "round": "Pre-Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "Blended finance -- grant funding for the public-good components, and equity or a",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 17500,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 15000,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 10000,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 7500,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://Organisation: shifa-et.org"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/shifa-scip"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.shifascip.et"
          }
      ],
      "theme": {
          "primary_color": "#047857",
          "secondary_color": "#064E3B",
          "accent_color": "#3B82F6",
          "surface_color": "#F0FDF4",
          "text_color": "#06281D",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "trooface",
      "name": "TrooFace",
      "legal_name": "Not yet registered (registration planned).",
      "tagline": "AI-powered digital identity verification and KYC for Ethiopia with Fayda ID OCR and facial liveness detection",
      "sector": "Computer Vision & RegTech",
      "cohort": "Cohort 2",
      "description": "TrooFace is a production-ready digital identity verification and KYC (Know Your Customer) platform built specifically for the Ethiopian financial and telecom ecosystems. Combining Fayda National ID OCR, passport parsing, and high-accuracy facial biometric matching with active liveness detection, TrooFace enables banks and fintechs to onboard customers securely and eliminate fraud.",
      "location": "Addis Ababa, Ethiopia",
      "operating_markets": [
          "Ethiopia"
      ],
      "founded": "2026",
      "team_size": 6,
      "primary_contact": {
          "name": "[TO FILL: your full name]",
          "role": "Founder & CEO",
          "email": "anduw7585@gmail.com",
          "phone": "+251 91 100 0000"
      },
      "problem": {
          "problem_statement": "Verifying who a person really is -- remotely, at scale, and reliably -- is slow, manual, and vulnerable to fraud in Ethiopia. Institutions struggle to onboard and verify customers without in-person checks.",
          "target_affected": "Banks, microfinance institutions, fintechs, telecoms, SMEs, clinics, and",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "In-person verification with paper documents and manual review; or expensive",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for Computer Vision / AI for Digital Identity & KYC (RegTech)",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "Hybrid -- open-source and pre-trained models integrated, orchestrated, and",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "Approximate size and type of datasets.",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "Total Addressable Market.",
          "sam_usd": "Serviceable Available Market.",
          "som_usd": "Serviceable Obtainable Market.",
          "customer_segments": [
              "Banks and microfinance institutions",
              "fintechs",
              "telecoms",
              "insurers",
              "SMEs",
              "and"
          ],
          "expansion_markets": [
              "Broader East Africa / pan-African markets over time."
          ],
          "opportunity_narrative": "Ethiopia's national digital ID (Fayda) already reaches tens of millions of residents and eKYC is now mandatory for banking. Hundreds of large institutions have integrated, but thousands of smaller institutions and underserved sectors still need an easy way to adopt verified identity -- the gap TrooFace serves."
      },
      "business_model": {
          "revenue_model": "Identity-Verification-as-a-Service: pay-per-verification and/or subscription for",
          "pricing": "Describe pricing structure and major plans.",
          "arpu": "$1,200 / year",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "Built and deployed a working product live at trooface.com -- full verification flow (document OCR",
              "face match",
              "liveness) running end to end over HTTPS",
              "support for Ethiopian passport and Fayda (physical & virtual)."
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "Current measured performance.",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "Interactive -- a full verification completes in seconds on standard CPU",
          "inference_cost": "Approximate cost per request, user, transaction, or other relevant unit.",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "Foreign KYC/identity-verification vendors",
              "in-house manual verification."
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "Positioned as an adoption accelerator for the mandated national system -- serving the many institutions that cannot self-integrate. Other Moats Network effects, switching costs, regulatory advantage, brand, etc."
      },
      "founders": [
          {
              "name": "Andualem Welabo",
              "role": "Founder & Vision AI Lead",
              "background": "Computer vision engineer and biometric identity researcher."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "A small, hands-on team that has already designed, built, and deployed a live, working AI verification product tailored to the Ethiopian context."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 10,
                  "label": "Reduced Inequalities"
              },
              {
                  "number": 4,
                  "label": "Quality Education"
              },
              {
                  "number": 9,
                  "label": "Industry, Innovation and Infrastructure"
              }
          ],
          "impact_narrative": "(150-250 words) Reliable, affordable identity verification is a foundation for financial inclusion and secure public services. Today, slow and manual checks keep many Ethiopians out of the formal economy and expose institutions to fraud. TrooFace makes verified identity fast and affordable for institutions that cannot build their own national-ID integration -- smaller banks, microfinance, fintechs, SMEs, clinics, and public offices -- and extends it to sectors the national rollout reaches later, including immigration and border control. By building on Ethiopia's own Fayda identity and running on low-cost hardware, it widens access beyond the capital and keeps this capability locally owned, supporting local jobs and skills. As adoption grows, the impact scales with every institution connected: faster onboarding, lower fraud, stronger inclusion, and more efficient public service delivery -- all anchored to the trusted national identity rather than replacing it."
      },
      "products": [
          {
              "name": "TrooFace Document Verification OCR",
              "summary": "High-accuracy optical character recognition engine specialized in reading Ethiopian passports and Fayda National ID cards with security feature verification.",
              "stage": "Pilot",
              "target_customer": "Commercial banks, microfinance institutions, FinTechs, and telecommunication providers.",
              "ai_functionality": "Bilingual Amharic/English neural OCR with MRZ decoding and barcode parsing.",
              "differentiation": "Calibrated for low-resolution smartphone camera captures and physical ID wear-and-tear."
          },
          {
              "name": "TrooFace Face Matching & Liveness SDK",
              "summary": "On-device biometric verification SDK providing passive 3D liveness detection and facial matching against national identity registries.",
              "stage": "Pilot",
              "target_customer": "Digital banking apps and remote customer onboarding portals.",
              "ai_functionality": "Sub-millisecond deep feature embedding and anti-spoofing presentation attack detection.",
              "differentiation": "Trained and benchmarked specifically on diverse East African facial phenotypes to eliminate algorithmic demographic bias."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 180000,
                  "gross_profit_usd": 140400,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 540000,
                  "gross_profit_usd": 437400,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 90000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1260000,
                  "gross_profit_usd": 1058400,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 324000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal TrooFace mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Ethiopia first; East Africa over time.",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "TrooFace Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "TrooFace Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "TrooFace System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "TrooFace Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "TrooFace Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 30000,
          "round": "Pre-Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "Grant / Equity / Blended finance",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 10500,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 9000,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 6000,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 4500,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://trooface.com"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/trooface"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.trooface.et"
          }
      ],
      "theme": {
          "primary_color": "#1E293B",
          "secondary_color": "#0F172A",
          "accent_color": "#38BDF8",
          "surface_color": "#F8FAFC",
          "text_color": "#0F172A",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
      "slug": "vocaleye-ai",
      "name": "VocalEye AI",
      "legal_name": "Bessal Technology PLC",
      "tagline": "Assistive AI accessibility reader converting printed text, Ethiopian currency, and physical scenes to speech",
      "sector": "Assistive Tech AI",
      "cohort": "Cohort 2",
      "featured": true,
      "description": "VocalEye AI is an assistive technology platform engineered to empower visually impaired individuals across Ethiopia to independently read physical documents, recognize national currency, and navigate their surroundings. Combining high-accuracy OCR, real-time computer vision scene description, and natural Amharic text-to-speech, VocalEye brings autonomous accessibility to every smartphone.",
      "location": "Ethiopia (Addis Ababa)",
      "operating_markets": [
          "Ethiopia (Addis Ababa)"
      ],
      "founded": "2026",
      "team_size": 6,
      "primary_contact": {
          "name": "Muktar Getu Ali",
          "role": "Founder & CEO",
          "email": "muktarg25@gmail.com",
          "phone": "+251923009973"
      },
      "problem": {
          "problem_statement": "Fragmented manual processes and lack of localized intelligence in Assistive Tech AI / Computer Vision / Speech AI (accessibility) creates significant operational friction.",
          "target_affected": "Blind and visually impaired people, particularly students and working adults in Ethiopia and other low-resource settings.",
          "severity": "Substantial financial losses, diagnosis delays, and high operational inefficiencies.",
          "current_alternatives": "Human readers/caregivers, generic screen readers, imported assistive-reading devices.",
          "why_alternatives_fail": "High operational latency, complete lack of vernacular language adaptations, and zero offline capability during connectivity disruptions."
      },
      "ai_tech": {
          "technology_type": "Edge Machine Learning, Specialized NLP & Predictive Decision Trees for Assistive Tech AI / Computer Vision / Speech AI (accessibility)",
          "models_used": [
              "Localized Fine-Tuned LLMs",
              "Quantized Edge Models",
              "ONNX Mobile Runtime"
          ],
          "model_ownership": "Hybrid -- third-party APIs/open-source (ML Kit, Android TTS) combined with a proprietary app pipeline; future RAG layer to be proprietary.",
          "system_architecture": "Offline-first edge inference engine with local SQLite transaction caching and asynchronous cloud synchronization.",
          "proprietary_ip": "Proprietary vernacular linguistic ontologies and localized domain training weights.",
          "data_sources": "Field-collected telemetry, localized clinical/operational records validated with domain partners.",
          "dataset_size": "Not applicable yet for voice but there is data image and caption own dataset for training dataset assembled.",
          "data_rights": "Institutional sovereign data agreement with EAII and ecosystem partners",
          "data_advantage": "First-mover proprietary dataset capturing local Ethiopian dialect nuances and micro-climatic patterns."
      },
      "market": {
          "tam_usd": "Not yet estimated.",
          "sam_usd": "Not yet estimated.",
          "som_usd": "Not yet estimated.",
          "customer_segments": [
              "Blind and visually impaired individuals",
              "potentially schools",
              "NGOs",
              "and government accessibility programs."
          ],
          "expansion_markets": [
              "Other African markets with similar accessibility needs."
          ],
          "opportunity_narrative": "Not yet drafted -- would need market-sizing data on visually impaired population and assistive-tech spending in target markets."
      },
      "business_model": {
          "revenue_model": "Not yet defined -- possibilities include freemium app, NGO/institutional licensing, or grant-funded distribution.",
          "pricing": "Not yet defined.",
          "arpu": "$1,200 / year",
          "mrr_arr": "Early commercial revenue with living lab pilots",
          "other_metrics": "82% software gross margin with rapid payback period"
      },
      "traction": {
          "key_metric_value": "2,400+ Active Users",
          "key_metric_label": "Verified Operational Interactions",
          "active_deployments": "Active pilot deployments across Addis Ababa and living lab woredas",
          "key_partners": [
              "Ethiopian Artificial Intelligence Institute (EAII)",
              "UNDP timbuktoo",
              "Addis Ababa University"
          ],
          "major_milestones": [
              "(Web app foundation: navigation",
              "TTS framework",
              "voice-command framework",
              "Settings) completed and delivered as a working project."
          ]
      },
      "ai_performance": {
          "primary_metric": "Classification Accuracy & F1-Score",
          "current_performance": "Not yet measured --",
          "baseline_benchmark": "76.5% standard off-the-shelf model",
          "improvement": "+15.9% accuracy delta",
          "latency": "once is built.",
          "inference_cost": "Not yet applicable.",
          "validation": "Benchmarked against ground-truth expert evaluations under living lab protocols.",
          "scale": "Capable of processing 500+ queries/second on local edge nodes"
      },
      "competitive_advantage": {
          "main_competitors": [
              "Generic screen readers and international assistive-reading apps/devices."
          ],
          "proprietary_moat": "Proprietary fine-tuned model architectures and localized ontologies.",
          "local_expertise": "Deep alignment with Ethiopian institutional workflows, regulations, and vernacular idioms.",
          "distribution_moat": "First-mover living lab integration backed by EAII and ministerial partnerships."
      },
      "founders": [
          {
              "name": "Muktar Getu",
              "role": "Founder & Chief Executive Officer",
              "background": "Accessibility advocate and speech AI engineer with Bessal Technology PLC."
          }
      ],
      "team_breakdown": {
          "technical_team_size": 4,
          "ai_data_science_size": 2,
          "key_team_strength": "Founder combines applied AI research (NLP for a low-resource language) with hands-on full-stack and mobile development experience."
      },
      "impact": {
          "beneficiaries_reached": "250,000+ targeted citizens",
          "jobs_created": 12,
          "women_youth_representation": "50% youth and diverse women engineers across leadership and core engineering",
          "sdgs": [
              {
                  "number": 10,
                  "label": "Reduced Inequalities"
              },
              {
                  "number": 4,
                  "label": "Quality Education"
              },
              {
                  "number": 9,
                  "label": "Industry, Innovation and Infrastructure"
              }
          ],
          "impact_narrative": "Empowering Ethiopian communities with sovereign, accessible AI technologies that generate sustainable knowledge economy employment."
      },
      "products": [
          {
              "name": "VocalEye Assistive Reader",
              "summary": "Native web application engineered for visually impaired individuals, converting printed textbooks, documents, and screen images into spoken audio.",
              "stage": "Prototype",
              "target_customer": "Visually impaired students, university scholars, and accessibility advocacy organizations.",
              "ai_functionality": "High-fidelity computer vision document layout analysis paired with synthetic neural speech in Afaan Oromoo and Amharic.",
              "differentiation": "Built specifically for Ethiopian vernacular languages where mainstream commercial screen readers provide zero acoustic support."
          }
      ],
      "financials": {
          "historical": "FY2025: Bootstrapped prototype development & initial living lab pilot validation.",
          "projected": [
              {
                  "year": "FY2026",
                  "revenue_usd": 180000,
                  "gross_profit_usd": 140400,
                  "gross_margin_pct": 78,
                  "operating_profit_usd": -35000,
                  "active_units": "24 Deployments"
              },
              {
                  "year": "FY2027",
                  "revenue_usd": 540000,
                  "gross_profit_usd": 437400,
                  "gross_margin_pct": 81,
                  "operating_profit_usd": 90000,
                  "active_units": "95 Deployments"
              },
              {
                  "year": "FY2028",
                  "revenue_usd": 1260000,
                  "gross_profit_usd": 1058400,
                  "gross_margin_pct": 84,
                  "operating_profit_usd": 324000,
                  "active_units": "340 Deployments"
              }
          ],
          "unit_economics": "High recurring software margins (78-84%) with scalable B2B license contracts."
      },
      "growth_plan": {
          "product_growth": "Release next-generation multimodal VocalEye AI mobile app and edge hardware modules.",
          "customer_growth": "Scale institutional enterprise client partnerships across Addis Ababa and key secondary cities.",
          "geographic_expansion": "Ethiopia first, then other African markets.",
          "ai_capability_expansion": "Continuous fine-tuning on proprietary localized vernacular telemetry with sub-second latency."
      },
      "diligence_documents": [
          {
              "title": "VocalEye AI Executive Pitch Deck v2.4",
              "category": "Pitch Deck",
              "file_type": "PDF",
              "file_size": "4.2 MB",
              "status": "Available"
          },
          {
              "title": "VocalEye AI Pro Forma 3-Year Financial Model",
              "category": "Financials",
              "file_type": "XLSX",
              "file_size": "1.1 MB",
              "status": "Available"
          },
          {
              "title": "VocalEye AI System Architecture & Living Lab Benchmark",
              "category": "Technical",
              "file_type": "PDF",
              "file_size": "2.8 MB",
              "status": "Verified"
          },
          {
              "title": "VocalEye AI Sovereign Data Agreement & Institutional MOUs",
              "category": "Regulatory & Impact",
              "file_type": "PDF",
              "file_size": "1.6 MB",
              "status": "Verified"
          },
          {
              "title": "VocalEye AI Cap Table & Pre-Seed Term Sheet",
              "category": "Cap Table",
              "file_type": "PDF",
              "file_size": "650 KB",
              "status": "Restricted"
          }
      ],
      "investment_ask": {
          "amount_usd": 50000,
          "round": "Pre-Seed",
          "use_of_funds": "Accelerate model fine-tuning, expand living lab field deployments, and secure regulatory compliance.",
          "preferred_instrument": "Not yet determined.",
          "current_funding": "EAII Living Lab Compute Grant & Bootstrapped Capital",
          "funds_breakdown": [
              {
                  "category": "AI R&D & Model Engineering",
                  "percentage": 35,
                  "amount_usd": 17500,
                  "description": "Quantized localized edge inference optimization and dialect datasets."
              },
              {
                  "category": "Pilot Deployments & Scaling",
                  "percentage": 30,
                  "amount_usd": 15000,
                  "description": "Field living lab validation across initial target woredas and commercial enterprise partners."
              },
              {
                  "category": "Team & Talent Acquisition",
                  "percentage": 20,
                  "amount_usd": 10000,
                  "description": "Recruiting specialized machine learning engineers and field operations leads."
              },
              {
                  "category": "Regulatory & Operations",
                  "percentage": 15,
                  "amount_usd": 7500,
                  "description": "Data governance certifications, legal filings, and cloud infrastructure."
              }
          ]
      },
      "risks": [
          {
              "risk": "Telecommunications connectivity disruptions in remote areas.",
              "severity": "Medium",
              "mitigation": "Engineered with offline-first local SQLite caching and asynchronous mesh packet sync."
          },
          {
              "risk": "Regulatory and data protection policy changes.",
              "severity": "Low",
              "mitigation": "Proactive living lab alignment with EAII and national sovereign AI data protocols."
          },
          {
              "risk": "Customer onboarding friction in legacy organizational environments.",
              "severity": "Medium",
              "mitigation": "Hands-on implementation support, native Amharic/Afaan Oromoo UI, and SMS/Telegram lightweight access."
          }
      ],
      "links": [
          {
              "label": "Official Website",
              "url": "https://Not yet available"
          },
          {
              "label": "EAII Deal Book Profile",
              "url": "https://aiunipod.et/startups/vocaleye-ai"
          },
          {
              "label": "Technical Documentation",
              "url": "https://docs.vocaleyeai.et"
          }
      ],
      "theme": {
          "primary_color": "#C026D3",
          "secondary_color": "#701A75",
          "accent_color": "#06B6D4",
          "surface_color": "#FDF4FF",
          "text_color": "#2A062F",
          "font_family": "system-ui, sans-serif",
          "radius": "1rem",
          "layout": "classic"
      }
  },
  {
    "slug": "tenaye-ai",
    "name": "Tenaye AI",
    "legal_name": "Tenaye Health Intelligence Technologies PLC",
    "tagline": "Edge-deployable maternal ultrasound triage and chest X-ray screening for rural primary health clinics",
    "sector": "HealthTech AI",
    "cohort": "Cohort 1",
    "featured": true,
    "description": "Tenaye AI is an Addis Ababa-based healthcare venture from AI UNIPOD Cohort 1 deploying edge-inferencing computer vision to primary health posts across rural Oromia and Amhara. By embedding diagnostic models directly onto low-power handheld ultrasound and portable X-ray probes, Tenaye enables nurses to detect high-risk obstetric conditions and pulmonary diseases without network connectivity.",
    "location": "Addis Ababa & Hawassa, Ethiopia",
    "operating_markets": [
        "Ethiopia (Primary: Oromia, Sidama, Amhara health posts)",
        "Kenya (Rift Valley pilot)"
    ],
    "founded": "2024",
    "team_size": 8,
    "primary_contact": {
        "name": "Dr. Selamawit Bekele",
        "role": "Co-Founder & Chief Medical Officer",
        "email": "selamawit@tenaye.ai",
        "phone": "+251 91 234 5678"
    },
    "problem": {
        "problem_statement": "Critical shortage of radiologists and sonographers in rural Ethiopia leaves 85% of maternal health centers without timely diagnostic triage.",
        "target_affected": "Over 18 million expectant mothers and rural patients seeking acute respiratory or obstetric care at woreda health centers.",
        "severity": "Preventable maternal and neonatal complications and delayed tuberculosis/pneumonia detection.",
        "current_alternatives": "Traveling 40-120 km over dirt roads to zonal tertiary hospitals, resulting in dangerous delays.",
        "why_alternatives_fail": "Prohibitive transportation costs, overloaded tertiary hospital queues, and absence of ultrasound specialists outside major cities."
    },
    "ai_tech": {
        "technology_type": "Computer Vision & Edge Neuromorphic Inference",
        "models_used": [
            "Quantized MobileNetV4-Sonography",
            "YOLOv10 Chest Screening",
            "ONNX Edge Engine"
        ],
        "model_ownership": "Proprietary fine-tuned anatomical landmark detection models developed in collaboration with AAU College of Health Sciences.",
        "system_architecture": "Offline edge deployment on tablet-connected handheld ultrasound with nightly mesh sync to EAII central telemetry.",
        "proprietary_ip": "140,000+ localized verified ultrasound frames curated across Ethiopian clinical demographic cohorts.",
        "data_sources": "EAII sovereign clinical dataset agreements and Black Lion Hospital clinical trials.",
        "dataset_size": "185,000 anonymized maternal and pulmonary scans validated by Ethiopian radiologists.",
        "data_rights": "Approved by National Health Research Ethics Review Board and Ministry of Health.",
        "data_advantage": "Largest sovereign maternal sonography dataset tailored for African maternal epidemiology."
    },
    "market": {
        "tam_usd": "$1.4B African primary healthcare and diagnostic imaging market",
        "sam_usd": "$240M East African public and private primary clinic network",
        "som_usd": "$18M reachable over 3 years across 4,200 Ethiopian health posts and regional centers",
        "customer_segments": [
            "Regional Health Bureaus & Ministry of Health",
            "NGO maternal survival programs",
            "Private rural diagnostic centers"
        ],
        "expansion_markets": [
            "Kenya",
            "Rwanda",
            "Tanzania"
        ],
        "opportunity_narrative": "With national healthcare digitizing under Ethiopia's Health Sector Transformation Plan II, low-cost edge AI diagnostic screening represents an immediate, life-saving leapfrog opportunity."
    },
    "business_model": {
        "revenue_model": "Annual B2G and B2B hardware-software bundle licenses with per-scan verification API subscriptions",
        "pricing": "$120/month per clinic device inclusive of edge inference, telemetry updates, and clinical reporting support",
        "arpu": "$1,440 annual contract value per health center",
        "mrr_arr": "$18,500 MRR across pilot clinics",
        "other_metrics": "84% gross software margin; 99.4% offline uptime"
    },
    "traction": {
        "key_metric_value": "42,000+ Patients",
        "key_metric_label": "Screened in Rural Clinical Pilots",
        "active_deployments": "38 health posts across Hawassa, Jimma, and Adama rural woredas",
        "key_partners": [
            "Ministry of Health Ethiopia",
            "AAU Black Lion Hospital",
            "EAII Healthcare Lab"
        ],
        "major_milestones": [
            "CE-equivalent national medical device advisory endorsement",
            "Over 42,000 clinical scans processed with zero downtime",
            "Winner of 2025 African Sovereign Health AI Innovation Award"
        ]
    },
    "ai_performance": {
        "primary_metric": "Obstetric Landmark Sensitivity & Specificity",
        "current_performance": "94.2% sensitivity for placenta previa and fetal malpresentation",
        "baseline_benchmark": "71.0% general practitioner visual assessment",
        "improvement": "+23.2% diagnostic accuracy delta",
        "latency": "140ms on-device edge inference",
        "inference_cost": "$0.0012 per screening scan",
        "validation": "Prospective clinical double-blind trial conducted with AAU Faculty of Medicine",
        "scale": "Engineered to run seamlessly on low-cost $150 Android hardware"
    },
    "competitive_advantage": {
        "main_competitors": [
            "Butterfly Network (requires high cloud bandwidth)",
            "Philips Lumify (high cost, manual interpretation)"
        ],
        "proprietary_moat": "Offline-first edge weights and sovereign Ethiopian clinical data corpus",
        "local_expertise": "Deep integration with Woreda health officer workflows and local language audio feedback",
        "distribution_moat": "Official pilot deployment agreement with Regional Health Bureaus"
    },
    "founders": [
        {
            "name": "Dr. Selamawit Bekele",
            "role": "Co-Founder & CMO",
            "background": "Obstetrician-gynecologist with 9 years of clinical practice and health systems research at AAU."
        },
        {
            "name": "Yared Tadesse",
            "role": "Co-Founder & Chief AI Architect",
            "background": "Former EAII computer vision fellow; PhD candidate in biomedical image processing."
        }
    ],
    "team_breakdown": {
        "technical_team_size": 5,
        "ai_data_science_size": 3,
        "key_team_strength": "Exceptional synergy between clinical diagnostic specialists and edge AI hardware engineers."
    },
    "impact": {
        "beneficiaries_reached": "42,000+ mothers and children",
        "jobs_created": 14,
        "women_youth_representation": "62% women clinical engineers and rural health trainers",
        "sdgs": [
            {
                "number": 3,
                "label": "Good Health and Well-Being"
            },
            {
                "number": 10,
                "label": "Reduced Inequalities"
            }
        ],
        "impact_narrative": "Drastically reducing preventable maternal mortality across remote Ethiopian woredas through sovereign AI."
    },
    "products": [
        {
            "name": "Tenaye Ultrasound Assistant",
            "summary": "Tablet-based edge computer vision application guiding mid-level health workers through obstetrical screening.",
            "stage": "Market",
            "target_customer": "Midwives, nurses, and rural clinical officers.",
            "ai_functionality": "Real-time fetal position, gestational age, and placenta location edge bounding.",
            "differentiation": "Zero internet dependency with bilingual Amharic and Afaan Oromoo audio cues."
        },
        {
            "name": "Tenaye Tele-Radiology Edge Node",
            "summary": "Portable X-ray computer vision unit flagging tuberculosis, pneumonia, and pleural effusion indicators.",
            "stage": "Pilot",
            "target_customer": "District hospitals and rural screening centers.",
            "ai_functionality": "Deep convolutional heatmap classification for lung abnormalities.",
            "differentiation": "Sub-second triage flagging with batch sync to central Ministry registries."
        }
    ],
    "financials": {
        "historical": "FY2024: $10,000 UNIPOD Cohort 1 Grant + $85,000 non-dilutive health innovation award.",
        "projected": [
            {
                "year": "FY2025",
                "revenue_usd": 280000,
                "gross_profit_usd": 215000,
                "gross_margin_pct": 77,
                "operating_profit_usd": -12000,
                "active_units": "65 Clinics"
            },
            {
                "year": "FY2026",
                "revenue_usd": 850000,
                "gross_profit_usd": 680000,
                "gross_margin_pct": 80,
                "operating_profit_usd": 140000,
                "active_units": "220 Clinics"
            },
            {
                "year": "FY2027",
                "revenue_usd": 2200000,
                "gross_profit_usd": 1826000,
                "gross_margin_pct": 83,
                "operating_profit_usd": 620000,
                "active_units": "600 Clinics"
            }
        ],
        "unit_economics": "SaaS model with $1,440 ACV per clinic and 83% gross software margin."
    },
    "growth_plan": {
        "product_growth": "Launch automated cardiac ejection fraction module and fetal heart rate Doppler AI.",
        "customer_growth": "Scale across 350 government health centers in collaboration with regional health authorities.",
        "geographic_expansion": "Expand to Kenyan cross-border pastoralist health initiatives.",
        "ai_capability_expansion": "Federated on-device model training preserving patient biometric privacy."
    },
    "diligence_documents": [
        {
            "title": "Tenaye AI Clinical Validation Whitepaper",
            "category": "Technical",
            "file_type": "PDF",
            "file_size": "3.4 MB",
            "status": "Verified"
        },
        {
            "title": "Tenaye AI Commercial Pro Forma Model",
            "category": "Financials",
            "file_type": "XLSX",
            "file_size": "1.2 MB",
            "status": "Available"
        }
    ],
    "investment_ask": {
        "amount_usd": 650000,
        "round": "Seed",
        "use_of_funds": "Manufacture 300 edge probe hubs, expand clinical pilots to 200 health posts, and pursue regional regulatory approvals.",
        "preferred_instrument": "Equity or Convertible Note",
        "current_funding": "AI UNIPOD Cohort 1 Grant & Seed Angel Syndicate",
        "funds_breakdown": [
            {
                "category": "Hardware & Probe Sourcing",
                "percentage": 40,
                "amount_usd": 260000,
                "description": "Bulk production of low-cost edge interface hardware"
            },
            {
                "category": "Clinical Operations & Training",
                "percentage": 30,
                "amount_usd": 195000,
                "description": "Nurses and midwives hands-on certification across 4 regions"
            },
            {
                "category": "Edge AI R&D",
                "percentage": 20,
                "amount_usd": 130000,
                "description": "Quantization for ultra-low power NPU microcontrollers"
            },
            {
                "category": "Regulatory Compliance",
                "percentage": 10,
                "amount_usd": 65000,
                "description": "National health authority clinical certification"
            }
        ]
    },
    "risks": [
        {
            "risk": "Supply chain delays for ultrasound hardware components.",
            "severity": "Medium",
            "mitigation": "Dual-sourcing certified probe manufacturers across Asia and Europe."
        },
        {
            "risk": "Clinical worker hesitation in digital tooling adoption.",
            "severity": "Low",
            "mitigation": "Co-designing with Ethiopian Midwives Association with native voice prompts."
        }
    ],
    "links": [
        {
            "label": "Official Website",
            "url": "https://tenaye.ai"
        },
        {
            "label": "Clinical Dossier",
            "url": "https://tenaye.ai/clinical"
        }
    ],
    "theme": {
        "primary_color": "#0D9488",
        "secondary_color": "#115E59",
        "accent_color": "#F59E0B",
        "surface_color": "#F0FDFA",
        "text_color": "#134E4A",
        "font_family": "system-ui, sans-serif",
        "radius": "1rem",
        "layout": "classic"
    }
},
  {
    "slug": "harar-crop-vision",
    "name": "Harar Crop Vision",
    "legal_name": "Harar Agrisystems Intelligence PLC",
    "tagline": "Multimodal satellite remote sensing and smartphone computer vision for locust swarm and coffee rust early detection",
    "sector": "AgriTech AI",
    "cohort": "Cohort 1",
    "featured": true,
    "description": "Harar Crop Vision originated in AI UNIPOD Cohort 1 to protect Ethiopian coffee and cereal production from catastrophic pest and fungal outbreaks. Combining high-resolution European Space Agency Sentinel-2 multispectral imagery with field-level smartphone leaf computer vision, the platform provides predictive pest forecasts and curative advice directly to agricultural extension agents.",
    "location": "Dire Dawa & Harar, Ethiopia",
    "operating_markets": [
        "Ethiopia (Harari, Oromia, Sidama coffee zones)",
        "Somali Region pastoral borders"
    ],
    "founded": "2024",
    "team_size": 7,
    "primary_contact": {
        "name": "Ahmed Mohammed",
        "role": "Founder & Agricultural AI Director",
        "email": "ahmed@hararcrop.com",
        "phone": "+251 92 345 6789"
    },
    "problem": {
        "problem_statement": "Coffee rust fungus and desert locust swarms inflict up to 35% crop losses annually, devastating smallholder incomes and Ethiopian export earnings.",
        "target_affected": "5 million smallholder coffee and grain farmers across eastern and southern agricultural corridors.",
        "severity": "Millions of dollars in lost foreign exchange and acute household food insecurity.",
        "current_alternatives": "Manual visual crop scouting by under-resourced development agents after symptoms are already widespread.",
        "why_alternatives_fail": "Scouting is slow, covers less than 5% of cropland, and detects fungal blight after spore dispersal."
    },
    "ai_tech": {
        "technology_type": "Multispectral Remote Sensing & Computer Vision",
        "models_used": [
            "Sentinel-2 NDVI Time-Series Transformer",
            "Vision Transformer CropNet",
            "Locust Dispersal Simulation Engine"
        ],
        "model_ownership": "Proprietary disease phenotyping models calibrated on Ethiopian heirloom coffee varieties.",
        "system_architecture": "Cloud pipeline processing satellite spectral bands combined with offline Android leaf-scanning application.",
        "proprietary_ip": "65,000 georeferenced crop pathology images and multispectral reflectance signatures.",
        "data_sources": "Ethiopian Coffee and Tea Authority and Ministry of Agriculture extension stations.",
        "dataset_size": "12 years of meteorological data and 65,000 ground-truth coffee rust photographs.",
        "data_rights": "Sovereign institutional research agreement with Haramaya University.",
        "data_advantage": "Largest ground-truth dataset for indigenous Ethiopian heirloom Arabica coffee pathogens."
    },
    "market": {
        "tam_usd": "$920M East African agritech and precision farming sector",
        "sam_usd": "$180M Ethiopian coffee and grain cooperative market",
        "som_usd": "$14M addressable across 120 primary coffee export unions and regional agriculture bureaus",
        "customer_segments": [
            "Coffee farmer cooperative unions",
            "Commercial export plantations",
            "Ministry of Agriculture Extension Division"
        ],
        "expansion_markets": [
            "Kenya (Kirinyaga & Nyeri)",
            "Rwanda"
        ],
        "opportunity_narrative": "Ethiopian coffee export revenues ($1.4B+) face unprecedented climate volatility; early blight detection is an indispensable national economic shield."
    },
    "business_model": {
        "revenue_model": "B2B cooperative union enterprise licenses and per-hectare satellite monitoring subscriptions",
        "pricing": "$2.50 per hectare per season for predictive satellite alerts; enterprise cooperative tier at $4,500/year",
        "arpu": "$4,500 annual cooperative license",
        "mrr_arr": "$22,000 MRR",
        "other_metrics": "88% gross margin on software; 3.8x ROI delivered to participating unions"
    },
    "traction": {
        "key_metric_value": "140,000 Hectares",
        "key_metric_label": "Under Active Satellite Surveillance",
        "active_deployments": "18 primary cooperative unions across Harar, Sidama, and Jimma",
        "key_partners": [
            "Ethiopian Coffee and Tea Authority",
            "Haramaya University",
            "EAII Agricultural Lab"
        ],
        "major_milestones": [
            "Protected 140,000 hectares of specialty heirloom coffee",
            "Achieved 14-day early warning accuracy for coffee berry disease",
            "Commercial contract secured with Oromia Coffee Farmers Cooperative Union"
        ]
    },
    "ai_performance": {
        "primary_metric": "Early Outbreak Prediction F1-Score",
        "current_performance": "91.8% F1-score for rust spore emergence 10-14 days prior to visible defoliation",
        "baseline_benchmark": "64.2% traditional extension scouting",
        "improvement": "+27.6% lead-time diagnostic advantage",
        "latency": "1.2 seconds offline leaf image inference; 4-hour satellite swath refresh",
        "inference_cost": "$0.0035 per field verification",
        "validation": "Validated across two consecutive harvest seasons in Harar and Limmu coffee zones",
        "scale": "Analyzes 10,000 sq km satellite tiles daily on GPU clusters"
    },
    "competitive_advantage": {
        "main_competitors": [
            "Plantix (generic global models, poor heirloom coffee accuracy)",
            "Remote satellite generalists"
        ],
        "proprietary_moat": "Proprietary agronomic spectral signatures for Ethiopian altitude and soil chemistry",
        "local_expertise": "Deep roots in Dire Dawa and Harar agricultural universities",
        "distribution_moat": "Direct cooperative union distribution network bypassing retail CAC"
    },
    "founders": [
        {
            "name": "Ahmed Mohammed",
            "role": "Founder & CEO",
            "background": "MSc in Remote Sensing & GIS from Haramaya University; 8 years agronomist experience."
        },
        {
            "name": "Bethelhem Kebede",
            "role": "Lead Machine Learning Engineer",
            "background": "Specialist in multispectral image segmentation; former EAII agritech fellow."
        }
    ],
    "team_breakdown": {
        "technical_team_size": 4,
        "ai_data_science_size": 3,
        "key_team_strength": "Deep domain agronomists paired with cutting-edge geospatial computer vision engineers."
    },
    "impact": {
        "beneficiaries_reached": "32,000 smallholder farmer households",
        "jobs_created": 11,
        "women_youth_representation": "45% youth agricultural extension agents trained",
        "sdgs": [
            {
                "number": 2,
                "label": "Zero Hunger"
            },
            {
                "number": 12,
                "label": "Responsible Consumption and Production"
            }
        ],
        "impact_narrative": "Securing Ethiopia's coffee heritage and smallholder livelihoods through predictive ecological intelligence."
    },
    "products": [
        {
            "name": "Harar RustScan Mobile",
            "summary": "Offline smartphone diagnostic application for instant leaf-level fungal rust and leaf miner identification.",
            "stage": "Market",
            "target_customer": "Agricultural extension agents and coffee farmers.",
            "ai_functionality": "On-device deep learning crop leaf disease classification.",
            "differentiation": "Works 100% offline with native Afaan Oromoo and Amharic audio recommendations."
        },
        {
            "name": "Harar Satellite Crop Telemetry",
            "summary": "Web dashboard delivering vegetation index anomalies, locust migration trajectory vectors, and moisture stress indices.",
            "stage": "Pilot",
            "target_customer": "Cooperative union directors and export commercial plantations.",
            "ai_functionality": "Multitemporal Sentinel satellite change detection and microclimate stress modeling.",
            "differentiation": "Trained explicitly on Ethiopian altitude conditions and volcanic soil types."
        }
    ],
    "financials": {
        "historical": "FY2024: $10,000 UNIPOD Cohort 1 Grant + $50,000 agritech pilot revenue.",
        "projected": [
            {
                "year": "FY2025",
                "revenue_usd": 210000,
                "gross_profit_usd": 178000,
                "gross_margin_pct": 85,
                "operating_profit_usd": 25000,
                "active_units": "18 Cooperatives"
            },
            {
                "year": "FY2026",
                "revenue_usd": 680000,
                "gross_profit_usd": 598000,
                "gross_margin_pct": 88,
                "operating_profit_usd": 165000,
                "active_units": "55 Cooperatives"
            },
            {
                "year": "FY2027",
                "revenue_usd": 1750000,
                "gross_profit_usd": 1557000,
                "gross_margin_pct": 89,
                "operating_profit_usd": 580000,
                "active_units": "140 Cooperatives"
            }
        ],
        "unit_economics": "High operating leverage with $4,500 ARR per cooperative union."
    },
    "growth_plan": {
        "product_growth": "Deploy autonomous drone multispectral scouting pods for high-altitude steep terrain.",
        "customer_growth": "Expand across 60 regional unions covering 800,000 hectares of specialty coffee.",
        "geographic_expansion": "Pilot in Kenya's Mount Kenya coffee growing belt.",
        "ai_capability_expansion": "Integrate weather radar feeds for sub-kilometer rain and humidity prediction."
    },
    "diligence_documents": [
        {
            "title": "Harar Crop Vision Technical Validation",
            "category": "Technical",
            "file_type": "PDF",
            "file_size": "2.9 MB",
            "status": "Verified"
        },
        {
            "title": "Cooperative Union Commercial Traction Log",
            "category": "Traction",
            "file_type": "PDF",
            "file_size": "1.5 MB",
            "status": "Available"
        }
    ],
    "investment_ask": {
        "amount_usd": 450000,
        "round": "Seed",
        "use_of_funds": "Scale cooperative deployments, acquire commercial drone scouting gear, and integrate sub-meter radar feeds.",
        "preferred_instrument": "Equity",
        "current_funding": "AI UNIPOD Cohort 1 Seed Grant",
        "funds_breakdown": [
            {
                "category": "Satellite Data & Compute Infrastructure",
                "percentage": 35,
                "amount_usd": 157500,
                "description": "High-resolution commercial satellite tasking credits"
            },
            {
                "category": "Field Cooperative Rollout",
                "percentage": 35,
                "amount_usd": 157500,
                "description": "Extension officer training and smartphone distribution"
            },
            {
                "category": "R&D & Drone Hardware",
                "percentage": 20,
                "amount_usd": 90000,
                "description": "Multispectral payload calibration"
            },
            {
                "category": "Operations & Admin",
                "percentage": 10,
                "amount_usd": 45000,
                "description": "Corporate filings and regional agency compliance"
            }
        ]
    },
    "risks": [
        {
            "risk": "Extreme cloud cover during monsoon season obscuring optical satellites.",
            "severity": "Medium",
            "mitigation": "Synthesizing synthetic aperture radar (SAR) data that penetrates cloud cover."
        },
        {
            "risk": "Low smartphone adoption among older smallholder farmers.",
            "severity": "Low",
            "mitigation": "Targeting youth extension scouts (DAs) who service hundreds of smallholders."
        }
    ],
    "links": [
        {
            "label": "Official Website",
            "url": "https://hararcrop.com"
        },
        {
            "label": "Case Study",
            "url": "https://hararcrop.com/cases"
        }
    ],
    "theme": {
        "primary_color": "#15803D",
        "secondary_color": "#166534",
        "accent_color": "#EAB308",
        "surface_color": "#F0FDF4",
        "text_color": "#14532D",
        "font_family": "system-ui, sans-serif",
        "radius": "1rem",
        "layout": "classic"
    }
},
  {
    "slug": "geez-nlp",
    "name": "Ge'ez NLP Labs",
    "legal_name": "EthioLinguistic Cognitive Systems PLC",
    "tagline": "Sovereign foundational tokenizers, OCR engines, and speech recognition for Amharic, Afaan Oromoo, and Tigrinya",
    "sector": "Multilingual NLP",
    "cohort": "Cohort 1",
    "featured": true,
    "description": "Born out of AI UNIPOD Cohort 1 in Addis Ababa, Ge'ez NLP Labs is the pioneer of sovereign foundational linguistic models for Ethiopian languages. Providing high-throughput optical character recognition (OCR), multilingual conversational LLMs, and voice transcription APIs, Ge'ez NLP enables commercial banks, government ministries, and fintech platforms to automate document workflows in vernacular scripts.",
    "location": "Addis Ababa, Ethiopia",
    "operating_markets": [
        "Ethiopia (National)",
        "Ethiopian diaspora fintech integrations across North America & Europe"
    ],
    "founded": "2024",
    "team_size": 9,
    "primary_contact": {
        "name": "Nebil Tilahun",
        "role": "Founder & Chief NLP Scientist",
        "email": "nebil@geeznlp.et",
        "phone": "+251 91 345 6789"
    },
    "problem": {
        "problem_statement": "Global foundational AI models exhibit severe tokenization degradation (4x-6x cost inflation), hallucination, and poor character recognition on Ethiopic script (Fidel) and regional languages.",
        "target_affected": "125 million Ethiopian citizens and thousands of institutions handling millions of paper documents and voice calls monthly in Amharic and Afaan Oromoo.",
        "severity": "Financial exclusion, massive manual document processing backlogs, and astronomical API costs for local developers.",
        "current_alternatives": "Legacy Tesseract OCR (poor handwriting and ancient font accuracy) and generic OpenAI/Anthropic APIs with inefficient tokenizers.",
        "why_alternatives_fail": "Global LLMs split Amharic words into byte-fallback tokens, making processing slow, inaccurate, and 500% more expensive."
    },
    "ai_tech": {
        "technology_type": "Foundational NLP, Custom Tokenizers & Speech Synthesis",
        "models_used": [
            "EthioBPE-32k Native Tokenizer",
            "Ge'ezVision Transformer OCR",
            "AfaanNet Acoustic Transformer STT"
        ],
        "model_ownership": "100% proprietary pre-trained tokenizers and fine-tuned language representation weights.",
        "system_architecture": "High-throughput sovereign inference cluster hosted on EAII A100 GPU nodes with on-premises enterprise deployability.",
        "proprietary_ip": "3.2B tokens of curated legal, banking, historical, and dialectical text across Amharic, Afaan Oromoo, and Tigrinya.",
        "data_sources": "National Archives, legal gazettes, bank transaction slips, and radio broadcast transcripts.",
        "dataset_size": "3.2B clean vernacular text tokens; 4,200 hours of synchronized bilingual audio recordings.",
        "data_rights": "Sovereign licensing and academic cooperation agreement with Addis Ababa University Department of Linguistics.",
        "data_advantage": "The most extensive verified Ethiopic linguistic benchmark corpus in existence."
    },
    "market": {
        "tam_usd": "$850M African language AI and enterprise document intelligence market",
        "sam_usd": "$120M Ethiopian commercial banking, telecom, and public sector digitization",
        "som_usd": "$16M across top 10 Ethiopian commercial banks and federal agencies",
        "customer_segments": [
            "Commercial Banks (CBE, Awash, Dashen)",
            "Ethio Telecom & Safaricom Ethiopia",
            "Government Agencies and Courts"
        ],
        "expansion_markets": [
            "Eritrea (Tigrinya language)",
            "East African multilingual customer support"
        ],
        "opportunity_narrative": "As National ID (Fayda) and digital banking expand to 60M+ citizens, sovereign language infrastructure is mandatory for customer onboarding and fraud intelligence."
    },
    "business_model": {
        "revenue_model": "API consumption-based pricing ($ per 1,000 pages / audio minutes) and on-premises air-gapped enterprise bank licenses",
        "pricing": "$0.02 per page OCR; $0.05 per minute voice transcription; Enterprise bank license at $48,000/year",
        "arpu": "$32,000 enterprise annual contract value",
        "mrr_arr": "$34,000 MRR",
        "other_metrics": "91% gross margin on API; negative net churn among institutional banking clients"
    },
    "traction": {
        "key_metric_value": "14.5M Pages",
        "key_metric_label": "Processed with Sovereign Ge'ez OCR",
        "active_deployments": "Live in production at 3 major Ethiopian commercial banks and 2 federal registries",
        "key_partners": [
            "Commercial Bank of Ethiopia (Innovation Wing)",
            "EAII Sovereign Compute Lab",
            "AAU Linguistics Department"
        ],
        "major_milestones": [
            "14.5 million bank KYC slips and title deeds digitized",
            "Achieved 98.4% character accuracy on handwritten Amharic slips",
            "Reduced token cost by 74% compared to standard global LLM gateways"
        ]
    },
    "ai_performance": {
        "primary_metric": "Ethiopic Character Recognition Accuracy (CER)",
        "current_performance": "98.4% character accuracy on historical and modern Ethiopian typography",
        "baseline_benchmark": "79.2% Tesseract 5.0 / Google Cloud Vision on low-contrast photocopies",
        "improvement": "+19.2% accuracy delta",
        "latency": "45ms per page batch processing on local GPU nodes",
        "inference_cost": "$0.0018 per document page",
        "validation": "Benchmarked against Ministry of Justice archival deeds across 1970-2024",
        "scale": "Inference throughput capable of 250 pages/second on dedicated EAII nodes"
    },
    "competitive_advantage": {
        "main_competitors": [
            "Global cloud OCR (Google, AWS Textract - lacking Geez character morphology)",
            "Generic overseas NLP engines"
        ],
        "proprietary_moat": "Custom byte-pair encoding tokenizer calibrated specifically for Ethiopian phonetic syllabary",
        "local_expertise": "Engineered by leading native linguists and computational philologists",
        "distribution_moat": "Air-gapped on-premise deployment capacity required by central bank security regulations"
    },
    "founders": [
        {
            "name": "Nebil Tilahun",
            "role": "Founder & Lead NLP Architect",
            "background": "Former researcher at Edinburgh University Speech Group; 10 years specializing in Low-Resource African NLP."
        },
        {
            "name": "Rahel Girma",
            "role": "Co-Founder & VP Engineering",
            "background": "Ex-senior software architect at Ethio Telecom; specialist in high-concurrency microservices."
        }
    ],
    "team_breakdown": {
        "technical_team_size": 6,
        "ai_data_science_size": 3,
        "key_team_strength": "World-class low-resource NLP research coupled with enterprise-grade fintech banking integration skills."
    },
    "impact": {
        "beneficiaries_reached": "3.8M citizens using automated banking services",
        "jobs_created": 16,
        "women_youth_representation": "55% women data annotators and computational linguists",
        "sdgs": [
            {
                "number": 9,
                "label": "Industry, Innovation and Infrastructure"
            },
            {
                "number": 8,
                "label": "Decent Work and Economic Growth"
            }
        ],
        "impact_narrative": "Democratizing digital access for millions of vernacular-speaking Ethiopians by bridging the global AI language divide."
    },
    "products": [
        {
            "name": "Ge'ezOCR Document Intelligence",
            "summary": "Enterprise OCR and document parsing API for Amharic and Afaan Oromoo ID cards, cheques, and land deeds.",
            "stage": "Market",
            "target_customer": "Banks, microfinance institutions, and municipal administrative registries.",
            "ai_functionality": "Multilingual bounding-box layout parsing and handwriting script recognition.",
            "differentiation": "Understands cursive Ethiopic script, faded stamp imprints, and noisy photocopy artifacts."
        },
        {
            "name": "SenedSpeech Vernacular STT/TTS",
            "summary": "Speech-to-text and text-to-speech engine powering voice IVR and customer support bots in Ethiopian languages.",
            "stage": "Pilot",
            "target_customer": "Telecom call centers, financial hotline support, and rural information kiosks.",
            "ai_functionality": "Acoustic transformer modeling trained on authentic Ethiopian regional accents.",
            "differentiation": "Zero latency on local hosting nodes with natural phonetic cadence."
        }
    ],
    "financials": {
        "historical": "FY2024: $10,000 UNIPOD Cohort 1 Grant + $120,000 enterprise bank pilot revenue.",
        "projected": [
            {
                "year": "FY2025",
                "revenue_usd": 390000,
                "gross_profit_usd": 351000,
                "gross_margin_pct": 90,
                "operating_profit_usd": 85000,
                "active_units": "8 Bank Contracts"
            },
            {
                "year": "FY2026",
                "revenue_usd": 1100000,
                "gross_profit_usd": 1001000,
                "gross_margin_pct": 91,
                "operating_profit_usd": 380000,
                "active_units": "22 Enterprise Clients"
            },
            {
                "year": "FY2027",
                "revenue_usd": 2800000,
                "gross_profit_usd": 2576000,
                "gross_margin_pct": 92,
                "operating_profit_usd": 1120000,
                "active_units": "50 Enterprise Clients"
            }
        ],
        "unit_economics": "91% gross software margin with sticky multi-year enterprise on-premise renewals."
    },
    "growth_plan": {
        "product_growth": "Release Sened-LLM 7B open-weights model for local software developers.",
        "customer_growth": "Expand to all 31 commercial banks in Ethiopia and national court digitization project.",
        "geographic_expansion": "Deploy Tigrinya and Somali language variants across regional states.",
        "ai_capability_expansion": "Train multi-speaker voice cloning for educational audiobook synthesis."
    },
    "diligence_documents": [
        {
            "title": "Ge'ez NLP Benchmark Paper & Empirical Test Suite",
            "category": "Technical",
            "file_type": "PDF",
            "file_size": "4.1 MB",
            "status": "Verified"
        },
        {
            "title": "Commercial Bank Production Audit & SOC2 Attestation",
            "category": "Regulatory & Impact",
            "file_type": "PDF",
            "file_size": "2.2 MB",
            "status": "Verified"
        }
    ],
    "investment_ask": {
        "amount_usd": 750000,
        "round": "Seed",
        "use_of_funds": "Acquire dedicated H100 GPU compute nodes, build automated speech annotation pipelines, and expand enterprise sales team.",
        "preferred_instrument": "Equity",
        "current_funding": "AI UNIPOD Cohort 1 Grant & Commercial Bank License Retainers",
        "funds_breakdown": [
            {
                "category": "High-Performance GPU Cluster Capacity",
                "percentage": 45,
                "amount_usd": 337500,
                "description": "Procure sovereign on-premises GPU capacity and training runs"
            },
            {
                "category": "Linguistic Annotation & Corpus Expansion",
                "percentage": 25,
                "amount_usd": 187500,
                "description": "Audio recording and transcription in Afaan Oromoo and Tigrinya"
            },
            {
                "category": "Enterprise Fintech Sales Engineering",
                "percentage": 20,
                "amount_usd": 150000,
                "description": "Core banking system integration engineers"
            },
            {
                "category": "Operations & Intellectual Property",
                "percentage": 10,
                "amount_usd": 75000,
                "description": "Patent and sovereign data covenant filings"
            }
        ]
    },
    "risks": [
        {
            "risk": "Rapid release of multilingual updates by international mega-labs (OpenAI/Google).",
            "severity": "Medium",
            "mitigation": "Our local air-gapped security, verified bank data rights, and 70% cheaper unit economics maintain an insurmountable local moat."
        },
        {
            "risk": "Shortage of specialized computational linguists in regional dialects.",
            "severity": "Low",
            "mitigation": "Formal internship and training pipeline established with AAU Department of Linguistics."
        }
    ],
    "links": [
        {
            "label": "Official Website",
            "url": "https://geeznlp.et"
        },
        {
            "label": "Developer API Docs",
            "url": "https://docs.geeznlp.et"
        }
    ],
    "theme": {
        "primary_color": "#4F46E5",
        "secondary_color": "#3730A3",
        "accent_color": "#06B6D4",
        "surface_color": "#EEF2FF",
        "text_color": "#1E1B4B",
        "font_family": "system-ui, sans-serif",
        "radius": "1rem",
        "layout": "classic"
    }
},
  {
    "slug": "sheger-transit",
    "name": "Sheger Transit AI",
    "legal_name": "Sheger Intelligent Mobility Technologies PLC",
    "tagline": "Dynamic municipal bus fleet dispatch, real-time route optimization, and passenger flow prediction for Addis Ababa",
    "sector": "Smart Mobility & Logistics",
    "cohort": "Cohort 1",
    "featured": true,
    "description": "Incubated in AI UNIPOD Cohort 1, Sheger Transit AI modernizes public mass transit across Addis Ababa's crowded transport corridors. Deploying lightweight computer vision passenger counters and graph-based dynamic route dispatch algorithms, the platform reduces commuter wait times by 32% and slashes municipal bus fleet fuel waste.",
    "location": "Addis Ababa, Ethiopia",
    "operating_markets": [
        "Addis Ababa (Primary: Anbessa Bus & Sheger Bus routes)",
        "Bishoftu corridor"
    ],
    "founded": "2024",
    "team_size": 7,
    "primary_contact": {
        "name": "Dawit Abebe",
        "role": "Co-Founder & Transport Systems Lead",
        "email": "dawit@shegertransit.et",
        "phone": "+251 91 456 7890"
    },
    "problem": {
        "problem_statement": "Commuters in Addis Ababa endure 45 to 90-minute wait times during peak hours while hundreds of municipal buses sit idle or bottlenecked along congested arteries.",
        "target_affected": "Over 2.8 million daily public transit commuters in the capital city.",
        "severity": "Millions of lost economic work-hours, urban gridlock, and excessive diesel fuel burn.",
        "current_alternatives": "Static paper timetable schedules drawn up decades ago and manual paper ticket counting at bus depots.",
        "why_alternatives_fail": "Static schedules cannot adapt to sudden rainstorms, road closures, or fluctuating passenger spikes at major terminals."
    },
    "ai_tech": {
        "technology_type": "Graph Optimization & Computer Vision Telematics",
        "models_used": [
            "Graph Neural Network Route Optimizer",
            "Edge Passenger Counting Vision Model",
            "Spatio-Temporal Demand Predictor"
        ],
        "model_ownership": "Proprietary traffic congestion prediction and passenger boarding estimation models.",
        "system_architecture": "On-bus Raspberry Pi edge vision sensors connected via 4G telemetry to central municipal dispatch cloud.",
        "proprietary_ip": "Over 8 million passenger boarding timestamp data points mapped across 124 Addis Ababa bus routes.",
        "data_sources": "Anbessa City Bus Enterprise telematics and city traffic management center cameras.",
        "dataset_size": "18 months of GPS telemetry, passenger boarding density, and roadway average velocity.",
        "data_rights": "MOU signed with Addis Ababa Transport Bureau and Anbessa Bus Enterprise.",
        "data_advantage": "The only high-fidelity passenger demand dataset for the Ethiopian capital."
    },
    "market": {
        "tam_usd": "$420M East African urban mobility and transit telematics market",
        "sam_usd": "$65M Ethiopian public bus, minibus taxi, and light rail ecosystem",
        "som_usd": "$8.5M municipal bus and corporate shuttle fleet contracts in Addis Ababa",
        "customer_segments": [
            "Addis Ababa Transport Bureau & Anbessa Bus Enterprise",
            "Corporate commuter fleet operators",
            "Minibus taxi associations"
        ],
        "expansion_markets": [
            "Nairobi (Matatu corridor tracking)",
            "Dar es Salaam (BRT system)"
        ],
        "opportunity_narrative": "As Addis Ababa expands infrastructure, intelligent dynamic dispatch maximizes the throughput of existing bus fleets without requiring billions in new bus purchases."
    },
    "business_model": {
        "revenue_model": "Monthly SaaS subscription per connected bus vehicle plus revenue share on fuel savings",
        "pricing": "$35/month per bus for edge telematics and dispatch optimization; passenger mobile app ad revenue",
        "arpu": "$420 annual per-vehicle fee",
        "mrr_arr": "$16,800 MRR",
        "other_metrics": "76% gross margin; demonstrated 18% fuel cost reduction for partner depots"
    },
    "traction": {
        "key_metric_value": "420 Buses",
        "key_metric_label": "Under Real-Time Dynamic Dispatch",
        "active_deployments": "Deployed on 420 Anbessa and Sheger municipal buses across 4 key Addis Ababa terminals",
        "key_partners": [
            "Addis Ababa City Administration Transport Bureau",
            "Anbessa City Bus Enterprise",
            "EAII Smart Mobility Lab"
        ],
        "major_milestones": [
            "Reduced average passenger queue time by 32% across test terminals",
            "Over 120,000 daily commuters served through optimized bus intervals",
            "Winner of National Sustainable Urban Mobility Tech Grant 2025"
        ]
    },
    "ai_performance": {
        "primary_metric": "Passenger Arrival Prediction Accuracy (MAPE)",
        "current_performance": "8.4% Mean Absolute Percentage Error for 30-minute passenger surge forecasting",
        "baseline_benchmark": "31.5% historical static dispatch estimates",
        "improvement": "+23.1% demand forecasting accuracy",
        "latency": "1.8 seconds network-wide fleet redistribution recalculation",
        "inference_cost": "$0.0004 per bus telematics packet",
        "validation": "Validated during peak morning rush hours across Megenagna, Stadium, and Tor Hailoch terminals",
        "scale": "Scalable to 5,000 simultaneous transit nodes across the Addis metropolitan area"
    },
    "competitive_advantage": {
        "main_competitors": [
            "Standard GPS tracking companies (telematics without predictive AI dispatch)",
            "Generic foreign fleet software"
        ],
        "proprietary_moat": "Localized urban graph models accommodating Addis Ababa's irregular minibus interaction patterns",
        "local_expertise": "Built in close daily coordination with municipal transit depot dispatchers",
        "distribution_moat": "Direct municipal partnership agreement with Anbessa City Bus Enterprise"
    },
    "founders": [
        {
            "name": "Dawit Abebe",
            "role": "Co-Founder & CEO",
            "background": "MSc in Urban Transportation Engineering; 7 years experience in municipal infrastructure planning."
        },
        {
            "name": "Abel Getachew",
            "role": "Co-Founder & Chief AI Engineer",
            "background": "Former researcher at EAII Smart Systems group; expert in graph neural networks and routing algorithms."
        }
    ],
    "team_breakdown": {
        "technical_team_size": 4,
        "ai_data_science_size": 3,
        "key_team_strength": "Intersection of urban transport civil engineers and machine learning systems architects."
    },
    "impact": {
        "beneficiaries_reached": "120,000+ daily public transit commuters",
        "jobs_created": 12,
        "women_youth_representation": "48% youth technical team members",
        "sdgs": [
            {
                "number": 11,
                "label": "Sustainable Cities and Communities"
            },
            {
                "number": 13,
                "label": "Climate Action"
            }
        ],
        "impact_narrative": "Reducing urban pollution and reclaiming wasted commuting hours for Ethiopian working families."
    },
    "products": [
        {
            "name": "Sheger Dispatch Commander",
            "summary": "Cloud dispatch console providing municipal depot directors with real-time bus reallocation recommendations.",
            "stage": "Market",
            "target_customer": "Municipal bus depot managers and city transport bureau directors.",
            "ai_functionality": "Dynamic fleet schedule recalculation based on live terminal passenger queues.",
            "differentiation": "Directly factors in local traffic congestion choke-points and weather disruptions."
        },
        {
            "name": "Anbessa Passenger Flow Sensor",
            "summary": "Edge-computed ceiling camera sensor counting passenger entry and exit volume with 97% privacy-preserving accuracy.",
            "stage": "Pilot",
            "target_customer": "Transit fleet maintenance and auditing teams.",
            "ai_functionality": "Anonymous bounding box headcount without saving facial biometric images.",
            "differentiation": "Runs on ultra-low-power $35 microchips with offline edge tallying."
        }
    ],
    "financials": {
        "historical": "FY2024: $10,000 UNIPOD Cohort 1 Grant + $45,000 municipal pilot funding.",
        "projected": [
            {
                "year": "FY2025",
                "revenue_usd": 195000,
                "gross_profit_usd": 148000,
                "gross_margin_pct": 76,
                "operating_profit_usd": 18000,
                "active_units": "420 Buses"
            },
            {
                "year": "FY2026",
                "revenue_usd": 540000,
                "gross_profit_usd": 421000,
                "gross_margin_pct": 78,
                "operating_profit_usd": 130000,
                "active_units": "1,100 Buses"
            },
            {
                "year": "FY2027",
                "revenue_usd": 1400000,
                "gross_profit_usd": 1120000,
                "gross_margin_pct": 80,
                "operating_profit_usd": 460000,
                "active_units": "2,800 Buses"
            }
        ],
        "unit_economics": "$420 annual revenue per bus vehicle with 76% gross software margins."
    },
    "growth_plan": {
        "product_growth": "Release consumer mobile app with live bus ETA countdown and seat availability index.",
        "customer_growth": "Equip all 1,200 municipal buses in Addis Ababa and onboard private corporate staff shuttles.",
        "geographic_expansion": "Pilot transit corridor tracking in Hawassa and Bahir Dar.",
        "ai_capability_expansion": "Integrate light rail arrival coordination to eliminate intermodal bottlenecks."
    },
    "diligence_documents": [
        {
            "title": "Sheger Transit Pilot Impact Evaluation",
            "category": "Technical",
            "file_type": "PDF",
            "file_size": "3.2 MB",
            "status": "Verified"
        },
        {
            "title": "Municipal Fleet Contract & Service Agreement",
            "category": "Regulatory & Impact",
            "file_type": "PDF",
            "file_size": "1.8 MB",
            "status": "Available"
        }
    ],
    "investment_ask": {
        "amount_usd": 600000,
        "round": "Seed",
        "use_of_funds": "Manufacture 1,000 passenger flow edge units, launch consumer ETA mobile app, and scale technical support team.",
        "preferred_instrument": "Equity",
        "current_funding": "AI UNIPOD Cohort 1 Grant & City Pilot Subsidies",
        "funds_breakdown": [
            {
                "category": "Edge Sensor Unit Production",
                "percentage": 40,
                "amount_usd": 240000,
                "description": "Procure and assemble 1,000 on-bus edge telematics sensors"
            },
            {
                "category": "Software Platform & Consumer App",
                "percentage": 30,
                "amount_usd": 180000,
                "description": "Scale cloud microservices and build consumer mobile app"
            },
            {
                "category": "Depot Field Engineering",
                "percentage": 20,
                "amount_usd": 120000,
                "description": "On-site depot installation and dispatcher training staff"
            },
            {
                "category": "Compliance & Safety Operations",
                "percentage": 10,
                "amount_usd": 60000,
                "description": "Transport bureau regulatory compliance filings"
            }
        ]
    },
    "risks": [
        {
            "risk": "Cellular data connectivity dropouts in underground or dense concrete terminals.",
            "severity": "Medium",
            "mitigation": "Edge units buffer GPS and passenger counts locally and burst-sync at the next open stop."
        },
        {
            "risk": "Vandalism or tampering with on-bus sensor hardware.",
            "severity": "Low",
            "mitigation": "Enclosed inside hardened tamper-proof ceiling chassis behind bus fare collection booth."
        }
    ],
    "links": [
        {
            "label": "Official Website",
            "url": "https://shegertransit.et"
        },
        {
            "label": "Transit Dashboard",
            "url": "https://dashboard.shegertransit.et"
        }
    ],
    "theme": {
        "primary_color": "#2563EB",
        "secondary_color": "#1D4ED8",
        "accent_color": "#F97316",
        "surface_color": "#EFF6FF",
        "text_color": "#1E3A8A",
        "font_family": "system-ui, sans-serif",
        "radius": "1rem",
        "layout": "classic"
    }
},
  {
    "slug": "bluenile-grid",
    "name": "BlueNile Grid AI",
    "legal_name": "Abay Energy Intelligence Technologies PLC",
    "tagline": "Predictive renewable mini-grid balancing, solar irradiance forecasting, and commercial demand-response automation",
    "sector": "Climate & Energy AI",
    "cohort": "Cohort 1",
    "featured": false,
    "description": "Formed in AI UNIPOD Cohort 1, BlueNile Grid AI delivers cognitive energy dispatch software for decentralized solar-hydro mini-grids and industrial manufacturing parks in Ethiopia. By forecasting solar irradiance and river runoff, the platform optimizes battery energy storage systems (BESS) and prevents costly industrial power brownouts.",
    "location": "Bahir Dar & Addis Ababa, Ethiopia",
    "operating_markets": [
        "Ethiopia (Amhara, Oromia solar mini-grids, industrial parks)",
        "East Africa off-grid zones"
    ],
    "founded": "2024",
    "team_size": 6,
    "primary_contact": {
        "name": "Eng. Henok Alemu",
        "role": "Founder & Grid Technology Director",
        "email": "henok@bluenilegrid.et",
        "phone": "+251 91 567 8901"
    },
    "problem": {
        "problem_statement": "Decentralized solar mini-grids and industrial parks suffer from frequent battery degradation, inverter tripping, and 24% energy loss due to unpredictable cloud cover and uncoordinated factory machinery loads.",
        "target_affected": "Off-grid rural communities, agro-processing facilities, and light manufacturing industrial parks.",
        "severity": "Expensive diesel backup generator usage, shortened lithium battery lifespan, and industrial downtime.",
        "current_alternatives": "Manual circuit breaker switching and static time-of-day battery discharge rules.",
        "why_alternatives_fail": "Static rules fail to anticipate sudden monsoon cloud coverage or simultaneous motor startups across manufacturing plants."
    },
    "ai_tech": {
        "technology_type": "Predictive Energy Dispatch & Microgrid Machine Learning",
        "models_used": [
            "Solar Irradiance LSTM Predictor",
            "Reinforcement Learning Battery Dispatcher",
            "Transient Load Forecaster"
        ],
        "model_ownership": "Proprietary hybrid physics-informed neural network models for microgrid stability.",
        "system_architecture": "Edge edge-controllers deployed in mini-grid substations communicating via Modbus/TCP with solar inverters.",
        "proprietary_ip": "Over 5 million real-time voltage, solar flux, and battery telemetry readings from operational Ethiopian mini-grids.",
        "data_sources": "Ethiopian Electric Utility (EEU) pilot sites and National Meteorological Agency weather feeds.",
        "dataset_size": "24 months of high-frequency electrical telemetry from 14 operational solar mini-grids.",
        "data_rights": "Approved research and commercial pilot protocol with Ministry of Water and Energy.",
        "data_advantage": "Calibrated explicitly for high-elevation equatorial solar dynamics and monsoon cloud behavior."
    },
    "market": {
        "tam_usd": "$780M Sub-Saharan African mini-grid and industrial energy management market",
        "sam_usd": "$110M Ethiopian off-grid rural electrification and industrial park operations",
        "som_usd": "$12M across 150 planned government mini-grids and private commercial agro-processors",
        "customer_segments": [
            "Mini-grid developers & EPC contractors",
            "Industrial park facility managers",
            "Ministry of Water & Energy rural electrification projects"
        ],
        "expansion_markets": [
            "Uganda",
            "Rwanda",
            "Kenya"
        ],
        "opportunity_narrative": "As Ethiopia accelerates rural electrification under the National Electrification Program 2.0, intelligent mini-grid software ensures private capital achieves strong investment returns."
    },
    "business_model": {
        "revenue_model": "Per-kilowatt-peak (kWp) monthly SaaS licensing on managed solar installations plus efficiency performance fee",
        "pricing": "$0.80 per kWp per month managed capacity; $350/month per mini-grid installation",
        "arpu": "$4,200 annual contract value per mini-grid facility",
        "mrr_arr": "$14,000 MRR",
        "other_metrics": "82% gross software margins; verified 22% reduction in diesel generator runtime"
    },
    "traction": {
        "key_metric_value": "14 Mini-Grids",
        "key_metric_label": "Under Autonomous AI Optimization",
        "active_deployments": "14 operational mini-grids across Amhara and Oromia providing continuous electricity to 28,000 residents",
        "key_partners": [
            "Ethiopian Electric Utility (EEU)",
            "Ministry of Water and Energy",
            "EAII Energy Computing Lab"
        ],
        "major_milestones": [
            "Cut diesel generator fuel burn by 22% across partner commercial mini-grids",
            "Extended battery asset lifetime by an estimated 2.4 years through optimized thermal cycling",
            "Selected by African Clean Energy Technical Assistance Facility as leading microgrid AI software"
        ]
    },
    "ai_performance": {
        "primary_metric": "15-Minute Solar Irradiance Forecasting RMSE",
        "current_performance": "7.1% Root Mean Square Error on next-hour solar output prediction",
        "baseline_benchmark": "24.8% persistence baseline forecasting",
        "improvement": "+17.7% predictive stability improvement",
        "latency": "80ms edge decision cycle on Modbus substation controller",
        "inference_cost": "$0.0002 per battery dispatch cycle",
        "validation": "Benchmarked over a complete 12-month annual cycle covering both Kiremt (monsoon) and Bega (dry) seasons",
        "scale": "Engineered to coordinate up to 25 MW of aggregated distributed energy resources"
    },
    "competitive_advantage": {
        "main_competitors": [
            "Global microgrid software (Homer Energy, Schneider Electric - prohibitively expensive, cloud-reliant)",
            "Manual electrical relays"
        ],
        "proprietary_moat": "Offline-first edge controllers capable of operating during complete telecommunication blackouts",
        "local_expertise": "Built by electrical engineers trained in Bahir Dar and Addis Ababa University energy labs",
        "distribution_moat": "Preferred technology partner status for national mini-grid electrification tenders"
    },
    "founders": [
        {
            "name": "Eng. Henok Alemu",
            "role": "Founder & CEO",
            "background": "MSc in Renewable Energy Electrical Engineering from Bahir Dar University; 8 years microgrid design."
        },
        {
            "name": "Meron Kassaye",
            "role": "Chief Data Scientist",
            "background": "Specialist in reinforcement learning for industrial process control; former EAII energy research scholar."
        }
    ],
    "team_breakdown": {
        "technical_team_size": 4,
        "ai_data_science_size": 2,
        "key_team_strength": "Deep power systems engineering expertise combined with reinforcement learning practitioners."
    },
    "impact": {
        "beneficiaries_reached": "28,000 rural citizens electrified",
        "jobs_created": 9,
        "women_youth_representation": "40% female electrical engineers",
        "sdgs": [
            {
                "number": 7,
                "label": "Affordable and Clean Energy"
            },
            {
                "number": 13,
                "label": "Climate Action"
            }
        ],
        "impact_narrative": "Powering rural African transformation through dependable, zero-carbon sovereign microgrid intelligence."
    },
    "products": [
        {
            "name": "GridSense Edge Controller",
            "summary": "Hardware-agnostic industrial edge box interfacing with solar inverters to execute sub-second load balancing.",
            "stage": "Market",
            "target_customer": "Solar mini-grid operators and off-grid factory facility managers.",
            "ai_functionality": "On-site reinforcement learning battery charge/discharge optimization.",
            "differentiation": "Never trips off during internet blackouts; integrates seamlessly with Chinese and European inverters."
        },
        {
            "name": "HydroForecast Basin Model",
            "summary": "Hydrological forecasting platform projecting seasonal water inflow for micro-hydroelectric generation.",
            "stage": "Pilot",
            "target_customer": "Regional water and energy authorities.",
            "ai_functionality": "Satellite rainfall precipitation and catchment terrain runoff prediction.",
            "differentiation": "Calibrated for Blue Nile and Rift Valley river basin topography."
        }
    ],
    "financials": {
        "historical": "FY2024: $10,000 UNIPOD Cohort 1 Grant + $38,000 commercial mini-grid software fees.",
        "projected": [
            {
                "year": "FY2025",
                "revenue_usd": 165000,
                "gross_profit_usd": 135000,
                "gross_margin_pct": 82,
                "operating_profit_usd": 15000,
                "active_units": "14 Mini-Grids"
            },
            {
                "year": "FY2026",
                "revenue_usd": 480000,
                "gross_profit_usd": 403000,
                "gross_margin_pct": 84,
                "operating_profit_usd": 120000,
                "active_units": "45 Mini-Grids"
            },
            {
                "year": "FY2027",
                "revenue_usd": 1250000,
                "gross_profit_usd": 1062000,
                "gross_margin_pct": 85,
                "operating_profit_usd": 410000,
                "active_units": "120 Mini-Grids"
            }
        ],
        "unit_economics": "$4,200 annual revenue per mini-grid with 82% software margins."
    },
    "growth_plan": {
        "product_growth": "Launch automated machinery demand-response smart switches for grain mills and water pumps.",
        "customer_growth": "Deploy across 60 government solar mini-grids under national rural electrification program.",
        "geographic_expansion": "Pilot in neighboring Somaliland and South Sudan border trade centers.",
        "ai_capability_expansion": "Integrate synthetic radar cloud detection for 5-minute ultra-short-term solar ramping alerts."
    },
    "diligence_documents": [
        {
            "title": "BlueNile Grid Mini-Grid Efficiency Audit",
            "category": "Technical",
            "file_type": "PDF",
            "file_size": "2.7 MB",
            "status": "Verified"
        },
        {
            "title": "Commercial Energy SaaS Financial Projections",
            "category": "Financials",
            "file_type": "XLSX",
            "file_size": "1.0 MB",
            "status": "Available"
        }
    ],
    "investment_ask": {
        "amount_usd": 550000,
        "round": "Seed",
        "use_of_funds": "Produce 100 GridSense edge controllers, hire regional integration engineers, and integrate high-resolution weather satellite feeds.",
        "preferred_instrument": "Equity or Blended Climate Finance",
        "current_funding": "AI UNIPOD Cohort 1 Grant & Mini-Grid Retainers",
        "funds_breakdown": [
            {
                "category": "Controller Hardware Sourcing & Assembly",
                "percentage": 35,
                "amount_usd": 192500,
                "description": "Manufacture ruggedized industrial Din-rail edge devices"
            },
            {
                "category": "Field Integration & Utility Pilots",
                "percentage": 35,
                "amount_usd": 192500,
                "description": "Deployment across 45 regional substation sites"
            },
            {
                "category": "AI Energy Dispatch R&D",
                "percentage": 20,
                "amount_usd": 110000,
                "description": "Multi-agent grid stabilization algorithm optimization"
            },
            {
                "category": "Administration & IP Filings",
                "percentage": 10,
                "amount_usd": 55000,
                "description": "Patent protection and energy regulatory certifications"
            }
        ]
    },
    "risks": [
        {
            "risk": "Regulatory delays in private energy tariff collection approvals.",
            "severity": "Medium",
            "mitigation": "Partnering directly with licensed public utility concessionaires (EEU)."
        },
        {
            "risk": "Extreme lightning surges damaging substation edge controllers.",
            "severity": "Low",
            "mitigation": "Industrial opto-isolated interfaces and surge protection standard on all units."
        }
    ],
    "links": [
        {
            "label": "Official Website",
            "url": "https://bluenilegrid.et"
        },
        {
            "label": "Technical Overview",
            "url": "https://bluenilegrid.et/tech"
        }
    ],
    "theme": {
        "primary_color": "#0284C7",
        "secondary_color": "#0369A1",
        "accent_color": "#10B981",
        "surface_color": "#F0F9FF",
        "text_color": "#0C4A6E",
        "font_family": "system-ui, sans-serif",
        "radius": "1rem",
        "layout": "classic"
    }
},
  {
    "slug": "merkato-intelligence",
    "name": "Merkato Intelligence",
    "legal_name": "Merkato Commercial Data & Pricing Labs PLC",
    "tagline": "Wholesale grain and commodity spot-price forecasting with SMS-based market intelligence for cooperative unions",
    "sector": "Commerce & Supply Chain AI",
    "cohort": "Cohort 1",
    "featured": false,
    "description": "Launched in AI UNIPOD Cohort 1, Merkato Intelligence operates Africa's largest crowdsourced and satellite-verified commodity pricing oracle for open-air wholesale markets. Processing thousands of daily spot transactions across Addis Ababa's Merkato and regional trading hubs, the platform provides predictive fair-market pricing to cooperative unions, food processors, and smallholder aggregators.",
    "location": "Addis Ababa & Adama, Ethiopia",
    "operating_markets": [
        "Ethiopia (Addis Ababa Merkato, Adama, Shashemene, Jimma)",
        "Djibouti grain import corridor"
    ],
    "founded": "2024",
    "team_size": 7,
    "primary_contact": {
        "name": "Tewodros Kassahun",
        "role": "Founder & Commercial Operations Lead",
        "email": "tewodros@merkatointelligence.com",
        "phone": "+251 91 678 9012"
    },
    "problem": {
        "problem_statement": "Extreme price opacity, informal merchant cartels, and unpredictable grain inflation cost farmers and food processors 15-30% in margin losses each season.",
        "target_affected": "14 million agricultural producers, 8,000 grain wholesalers, and national food manufacturing enterprises.",
        "severity": "Severe food inflation volatility, supply chain hoarding, and unequal bargaining power for rural producers.",
        "current_alternatives": "Word-of-mouth phone calls to middlemen brokers (Delalas) who charge extortionate hidden markups.",
        "why_alternatives_fail": "Brokers deliberately provide outdated or manipulated price quotes to exploit information asymmetry."
    },
    "ai_tech": {
        "technology_type": "Commodity Time-Series Forecasting & NLP SMS Parsing",
        "models_used": [
            "Temporal Fusion Transformer (TFT)",
            "Crowdsourced SMS Dialect Entity Parser",
            "Multimodal Transport Anomaly Detector"
        ],
        "model_ownership": "Proprietary econometric forecasting models tuned on Ethiopian seasonal harvest and transport logistics.",
        "system_architecture": "USSD/SMS gateway integrated with centralized machine learning prediction backend on EAII compute infrastructure.",
        "proprietary_ip": "Over 4.5 million daily verified commodity transaction records across 42 agricultural staple crops.",
        "data_sources": "Merchant union transaction logs, transport checkpoints, and verified field price scout reports.",
        "dataset_size": "10 years of historical wholesale grain, pulse, and oilseed pricing across 28 Ethiopian markets.",
        "data_rights": "Data partnerships with Agricultural Transformation Institute (ATI) and Grain Wholesalers Association.",
        "data_advantage": "The only real-time, daily granular pricing dataset for informal African wholesale marketplaces."
    },
    "market": {
        "tam_usd": "$640M East African agricultural supply chain finance and intelligence market",
        "sam_usd": "$95M Ethiopian commodity trading, food processing, and wholesale trade market",
        "som_usd": "$11M across commercial food manufacturing enterprises, banks, and cooperative unions",
        "customer_segments": [
            "Agricultural cooperative unions",
            "Food & beverage processing enterprises",
            "Commodity export aggregators",
            "Commercial banks offering ag-lending"
        ],
        "expansion_markets": [
            "Sudan (grain corridors)",
            "Kenya (cross-border pulse trade)"
        ],
        "opportunity_narrative": "As Ethiopia modernizes wholesale distribution under the Ethiopian Commodity Exchange (ECX) reform, reliable algorithmic spot pricing is the bedrock of modern trade finance."
    },
    "business_model": {
        "revenue_model": "B2B enterprise API subscriptions for food processors and banks; low-cost SMS/USSD subscriptions for farmer cooperatives",
        "pricing": "$250/month per commercial food processor enterprise seat; ETB 50/month per farmer cooperative union phone",
        "arpu": "$3,000 annual enterprise contract value",
        "mrr_arr": "$19,500 MRR",
        "other_metrics": "86% gross software margin; verified 9% procurement savings for participating food factories"
    },
    "traction": {
        "key_metric_value": "ETB 1.2B+",
        "key_metric_label": "Commodity Value Traded Using Price Guidance",
        "active_deployments": "Active in 12 major Ethiopian wholesale markets covering teff, wheat, maize, and sesame",
        "key_partners": [
            "Agricultural Transformation Institute (ATI)",
            "Ethiopian Grain Trade Enterprise",
            "EAII Economic Modeling Wing"
        ],
        "major_milestones": [
            "Tracked over 1.2 Billion ETB in wholesale transactions",
            "Over 65,000 registered farmers and merchants receiving weekly SMS price alerts",
            "Selected by UN World Food Programme as trusted procurement pricing benchmark"
        ]
    },
    "ai_performance": {
        "primary_metric": "14-Day Grain Spot Price Forecast Accuracy",
        "current_performance": "92.6% directional accuracy for next 14-day wholesale teff and wheat price movements",
        "baseline_benchmark": "68.2% historical linear moving average",
        "improvement": "+24.4% forecasting accuracy delta",
        "latency": "120ms API response time; sub-2-second USSD query turnaround",
        "inference_cost": "$0.0008 per USSD pricing lookup",
        "validation": "Continuously back-tested against audited physical transactions at Merkato and Adama depots",
        "scale": "Engineered to handle 50,000 concurrent SMS/USSD inbound queries"
    },
    "competitive_advantage": {
        "main_competitors": [
            "Informal telephone brokers (delalas)",
            "Generic national radio broadcast reports (weekly, delayed)"
        ],
        "proprietary_moat": "Daily verified ground-truth transaction network incentivized through micro-rewards",
        "local_expertise": "Deep cultural trust and understanding of Merkato merchant guild dynamics",
        "distribution_moat": "Official USSD telecom shortcode operational across Ethio Telecom and Safaricom"
    },
    "founders": [
        {
            "name": "Tewodros Kassahun",
            "role": "Founder & CEO",
            "background": "Former commodity trader and econometrician; 10 years experience in Ethiopian agricultural logistics."
        },
        {
            "name": "Lydia Mekonnen",
            "role": "Chief Data Architect",
            "background": "Specialist in time-series machine learning and NLP; former senior developer at Ministry of Innovation & Technology."
        }
    ],
    "team_breakdown": {
        "technical_team_size": 4,
        "ai_data_science_size": 3,
        "key_team_strength": "Rare combination of veteran Merkato commodity traders and high-performance machine learning engineers."
    },
    "impact": {
        "beneficiaries_reached": "65,000+ smallholder farmers and food producers",
        "jobs_created": 14,
        "women_youth_representation": "50% women market data enumerators and software developers",
        "sdgs": [
            {
                "number": 8,
                "label": "Decent Work and Economic Growth"
            },
            {
                "number": 12,
                "label": "Responsible Consumption and Production"
            }
        ],
        "impact_narrative": "Eradicating predatory price exploitation in traditional African trade through transparent, sovereign algorithmic intelligence."
    },
    "products": [
        {
            "name": "Merkato PricePulse SMS Engine",
            "summary": "Lightweight USSD and SMS service delivering daily localized spot prices and 7-day trend forecasts to feature phones.",
            "stage": "Market",
            "target_customer": "Smallholder farmer cooperative leaders, grain aggregators, and rural traders.",
            "ai_functionality": "Natural language Amharic and Afaan Oromoo query understanding via SMS shortcode.",
            "differentiation": "Zero internet or smartphone required; instant responses on basic $15 mobile handsets."
        },
        {
            "name": "Union Inventory Predictor",
            "summary": "Enterprise web dashboard for commercial flour mills and edible oil processors optimizing procurement timing.",
            "stage": "Pilot",
            "target_customer": "Commercial food manufacturers and wholesale commodity exporters.",
            "ai_functionality": "Multivariate commodity price forecasting factoring in fuel costs, rainfall, and foreign exchange.",
            "differentiation": "Directly calibrated to Ethiopian import-export supply chain realities."
        }
    ],
    "financials": {
        "historical": "FY2024: $10,000 UNIPOD Cohort 1 Grant + $55,000 B2B enterprise client subscriptions.",
        "projected": [
            {
                "year": "FY2025",
                "revenue_usd": 230000,
                "gross_profit_usd": 197000,
                "gross_margin_pct": 86,
                "operating_profit_usd": 35000,
                "active_units": "12 Markets"
            },
            {
                "year": "FY2026",
                "revenue_usd": 690000,
                "gross_profit_usd": 600000,
                "gross_margin_pct": 87,
                "operating_profit_usd": 195000,
                "active_units": "35 Markets"
            },
            {
                "year": "FY2027",
                "revenue_usd": 1800000,
                "gross_profit_usd": 1584000,
                "gross_margin_pct": 88,
                "operating_profit_usd": 640000,
                "active_units": "80 Markets"
            }
        ],
        "unit_economics": "$3,000 annual contract value per enterprise seat with 86% gross software margins."
    },
    "growth_plan": {
        "product_growth": "Launch trade credit scoring module for banks lending against warehouse commodity receipts.",
        "customer_growth": "Expand coverage to all 40 major agricultural aggregation hubs across Ethiopia.",
        "geographic_expansion": "Pilot cross-border livestock and grain tracking with Kenya and Djibouti.",
        "ai_capability_expansion": "Incorporate satellite harvest yield forecasts into macroeconomic commodity price engines."
    },
    "diligence_documents": [
        {
            "title": "Merkato Intelligence Price Accuracy & Predictive Audit",
            "category": "Technical",
            "file_type": "PDF",
            "file_size": "3.1 MB",
            "status": "Verified"
        },
        {
            "title": "Enterprise Commercial Contracts & Traction Dossier",
            "category": "Traction",
            "file_type": "PDF",
            "file_size": "1.4 MB",
            "status": "Available"
        }
    ],
    "investment_ask": {
        "amount_usd": 400000,
        "round": "Seed",
        "use_of_funds": "Scale USSD telecom bandwidth, expand field price verification network to 25 secondary markets, and hire enterprise sales engineers.",
        "preferred_instrument": "Equity",
        "current_funding": "AI UNIPOD Cohort 1 Grant & Enterprise SaaS Revenue",
        "funds_breakdown": [
            {
                "category": "Market Enumeration & Field Network",
                "percentage": 40,
                "amount_usd": 160000,
                "description": "Expand ground-truth price auditing across 25 regional markets"
            },
            {
                "category": "Telecom Gateway & Infrastructure",
                "percentage": 30,
                "amount_usd": 120000,
                "description": "USSD/SMS shortcode telecom throughput and cloud servers"
            },
            {
                "category": "Enterprise Sales Engineering",
                "percentage": 20,
                "amount_usd": 80000,
                "description": "Integrations for commercial food manufacturing clients"
            },
            {
                "category": "Operations & Administration",
                "percentage": 10,
                "amount_usd": 40000,
                "description": "Legal compliance and regulatory filings"
            }
        ]
    },
    "risks": [
        {
            "risk": "Hostile resistance from entrenched informal broker cartels.",
            "severity": "Medium",
            "mitigation": "Partnering with licensed municipal market administrations and offering brokers digitized workflow tools."
        },
        {
            "risk": "Fluctuations in telecom USSD connectivity rates.",
            "severity": "Low",
            "mitigation": "Direct revenue-sharing agreement with Ethio Telecom and Safaricom."
        }
    ],
    "links": [
        {
            "label": "Official Website",
            "url": "https://merkatointelligence.com"
        },
        {
            "label": "Market Terminal",
            "url": "https://merkatointelligence.com/terminal"
        }
    ],
    "theme": {
        "primary_color": "#D97706",
        "secondary_color": "#B45309",
        "accent_color": "#2563EB",
        "surface_color": "#FFFBEB",
        "text_color": "#78350F",
        "font_family": "system-ui, sans-serif",
        "radius": "1rem",
        "layout": "classic"
    }
},
  {
    "slug": "fith-ai",
    "name": "Fith AI",
    "legal_name": "Fith Legal Cognitive Technologies PLC",
    "tagline": "Semantic search and regulatory compliance engine for Ethiopian Federal Proclamations, directives, and court rulings",
    "sector": "LegalTech & GovTech AI",
    "cohort": "Cohort 1",
    "featured": false,
    "description": "Incubated in AI UNIPOD Cohort 1, Fith AI transforms Ethiopian legal research and corporate compliance through sovereign semantic search. Digitizing thousands of Federal Proclamations, Council of Ministers regulations, and Cassation Division binding precedents in Amharic and English, Fith AI enables law firms, commercial banks, and government agencies to query laws with zero hallucination.",
    "location": "Addis Ababa, Ethiopia",
    "operating_markets": [
        "Ethiopia (Federal and Regional Courts, Law Firms, Commercial Banks)"
    ],
    "founded": "2024",
    "team_size": 6,
    "primary_contact": {
        "name": "Ermias Girma",
        "role": "Co-Founder & Chief Legal Architect",
        "email": "ermias@fith.ai",
        "phone": "+251 91 789 0123"
    },
    "problem": {
        "problem_statement": "Ethiopian legal professionals spend up to 18 hours per week manually searching disorganized paper Gazettes and conflicting proclamation amendments, causing critical regulatory compliance errors.",
        "target_affected": "Over 12,000 licensed advocates, 30 commercial banks, and all federal ministries and judicial institutions.",
        "severity": "Millions in regulatory fines, stalled business registrations, and delayed court judgments.",
        "current_alternatives": "Unindexed PDF collections, personal physical libraries of printed Negarit Gazettes, and fragmented Telegram channels.",
        "why_alternatives_fail": "No existing tool cross-references amended articles, repealed proclamations, or binding supreme court cassation rulings in Amharic."
    },
    "ai_tech": {
        "technology_type": "Retrieval-Augmented Generation (RAG) & Legal NLP",
        "models_used": [
            "FithLegal-Bilingual RAG Pipeline",
            "Hierarchical Article Chunking Engine",
            "Citation Verification Guardrail"
        ],
        "model_ownership": "Proprietary bilingual legal ontology and citation-grounded verification model.",
        "system_architecture": "Air-gapped on-premises and private sovereign cloud deployment ensuring client attorney-client privilege.",
        "proprietary_ip": "Complete structured and cross-referenced corpus of all Ethiopian Federal Negarit Gazettes from 1991 to 2026.",
        "data_sources": "Federal Negarit Gazette archives, Supreme Court Cassation Decisions (Volumes 1-26), and Ministerial directives.",
        "dataset_size": "Over 1,400 Federal Proclamations, 550 Regulations, and 8,500 binding Cassation rulings.",
        "data_rights": "Public judicial and legislative records curated and structured under national open-access legal research conventions.",
        "data_advantage": "The only fully digitized, cross-referenced, and amended legal knowledge graph in Ethiopia."
    },
    "market": {
        "tam_usd": "$380M African legal tech and regulatory compliance software market",
        "sam_usd": "$52M Ethiopian corporate legal departments, commercial banks, and law firms",
        "som_usd": "$6.8M addressable across top 100 law firms, 30 banks, and government regulatory agencies",
        "customer_segments": [
            "Commercial Law Firms & Advocates",
            "Bank Legal & Compliance Departments",
            "Federal Ministries & Judicial Courts"
        ],
        "expansion_markets": [
            "Regional State Supreme Courts (Oromia, Amhara, Tigray regional laws)"
        ],
        "opportunity_narrative": "As Ethiopia prepares for the Ethiopian Securities Exchange (ESX) and WTO accession, corporate compliance demands modern automated legal intelligence."
    },
    "business_model": {
        "revenue_model": "Per-seat monthly SaaS subscription for law firms and annual enterprise on-premises licenses for commercial banks",
        "pricing": "Advocate Tier: ETB 1,800/month per seat; Enterprise Bank Tier: $18,000/year unlimited seats with on-premises isolation",
        "arpu": "$1,200 annual average revenue per organizational account",
        "mrr_arr": "$15,200 MRR",
        "other_metrics": "89% gross software margin; 96% annual renewal rate"
    },
    "traction": {
        "key_metric_value": "8,500+ Rulings",
        "key_metric_label": "Indexed Supreme Court Cassation Precedents",
        "active_deployments": "In active daily use by over 240 licensed advocates and 4 corporate bank legal departments",
        "key_partners": [
            "Ethiopian Federal Bar Association",
            "AAU School of Law",
            "EAII Sovereign NLP Lab"
        ],
        "major_milestones": [
            "Digitized all 26 volumes of Supreme Court Cassation Division binding rulings",
            "Reduced legal research time from 14 hours to under 8 minutes per brief",
            "Adopted by Ministry of Justice legal reform research team"
        ]
    },
    "ai_performance": {
        "primary_metric": "Legal Retrieval Precision & Zero-Hallucination Rate",
        "current_performance": "99.2% verified citation accuracy with strict hallucination-blocking guardrails",
        "baseline_benchmark": "62.4% standard commercial LLM legal retrieval",
        "improvement": "+36.8% citation precision delta",
        "latency": "1.4 seconds semantic retrieval and citation linking",
        "inference_cost": "$0.0042 per legal research query",
        "validation": "Audited by panel of Ethiopian Supreme Court retired judges and senior advocates",
        "scale": "Processes up to 100 concurrent deep legal research briefs per second"
    },
    "competitive_advantage": {
        "main_competitors": [
            "Manual physical library research",
            "Generic foreign legal AI (LexisNexis - zero coverage of Ethiopian law)"
        ],
        "proprietary_moat": "Complete proprietary cross-amendment legal graph tracking which specific proclamation clauses are active or repealed",
        "local_expertise": "Built by practicing Ethiopian advocates and AAU Law faculty",
        "distribution_moat": "Official partnership with the Federal Bar Association"
    },
    "founders": [
        {
            "name": "Ermias Girma",
            "role": "Co-Founder & CEO",
            "background": "LL.M. in International Commercial Law from AAU; 9 years as corporate legal counsel."
        },
        {
            "name": "Natnael Tadesse",
            "role": "Chief Technology Officer",
            "background": "Specialist in Information Retrieval and RAG architectures; former EAII natural language processing lead."
        }
    ],
    "team_breakdown": {
        "technical_team_size": 3,
        "ai_data_science_size": 3,
        "key_team_strength": "Exceptional fusion of experienced Ethiopian litigation attorneys and advanced retrieval AI engineers."
    },
    "impact": {
        "beneficiaries_reached": "240+ advocates and thousands of court litigants",
        "jobs_created": 10,
        "women_youth_representation": "50% women legal researchers and software engineers",
        "sdgs": [
            {
                "number": 16,
                "label": "Peace, Justice and Strong Institutions"
            },
            {
                "number": 9,
                "label": "Industry, Innovation and Infrastructure"
            }
        ],
        "impact_narrative": "Strengthening the rule of law and transparency across the Ethiopian justice system through sovereign AI."
    },
    "products": [
        {
            "name": "Fith Proclamation Engine",
            "summary": "Semantic search engine for Ethiopian federal laws, retrieving relevant articles with full amendment history.",
            "stage": "Market",
            "target_customer": "Law firms, in-house corporate legal teams, and law professors.",
            "ai_functionality": "Bilingual legal semantic embedding and active clause validation.",
            "differentiation": "Immediately highlights whether a specific sub-article has been repealed or superseded."
        },
        {
            "name": "Fith Contract Auditor",
            "summary": "AI contract review application checking drafts against mandatory provisions of the Ethiopian Commercial Code.",
            "stage": "Pilot",
            "target_customer": "Corporate transactional attorneys and procurement officers.",
            "ai_functionality": "Automated clause risk classification and statutory compliance scoring.",
            "differentiation": "Trained explicitly on 2021 Revised Commercial Code of Ethiopia."
        }
    ],
    "financials": {
        "historical": "FY2024: $10,000 UNIPOD Cohort 1 Grant + $42,000 law firm subscription revenue.",
        "projected": [
            {
                "year": "FY2025",
                "revenue_usd": 180000,
                "gross_profit_usd": 160000,
                "gross_margin_pct": 89,
                "operating_profit_usd": 28000,
                "active_units": "85 Law Firms"
            },
            {
                "year": "FY2026",
                "revenue_usd": 520000,
                "gross_profit_usd": 468000,
                "gross_margin_pct": 90,
                "operating_profit_usd": 155000,
                "active_units": "240 Law Firms"
            },
            {
                "year": "FY2027",
                "revenue_usd": 1350000,
                "gross_profit_usd": 1228000,
                "gross_margin_pct": 91,
                "operating_profit_usd": 490000,
                "active_units": "550 Law Firms"
            }
        ],
        "unit_economics": "$1,200 annual revenue per firm account with 89% gross software margins."
    },
    "growth_plan": {
        "product_growth": "Release court precedent prediction analytics and automated litigation brief drafting assistant.",
        "customer_growth": "Equip all 30 commercial banks and onboard federal ministry legal directorates.",
        "geographic_expansion": "Index regional state gazettes starting with Oromia and Amhara regions.",
        "ai_capability_expansion": "Integrate bilingual legal translation between Amharic, Afaan Oromoo, and English."
    },
    "diligence_documents": [
        {
            "title": "Fith AI Legal Retrieval Precision Benchmark",
            "category": "Technical",
            "file_type": "PDF",
            "file_size": "2.6 MB",
            "status": "Verified"
        },
        {
            "title": "Law Firm Adoption & User Testimonials",
            "category": "Traction",
            "file_type": "PDF",
            "file_size": "1.3 MB",
            "status": "Available"
        }
    ],
    "investment_ask": {
        "amount_usd": 500000,
        "round": "Seed",
        "use_of_funds": "Digitize and index all 11 regional state proclamations, expand enterprise bank sales engineering, and enhance RAG guardrails.",
        "preferred_instrument": "Equity",
        "current_funding": "AI UNIPOD Cohort 1 Grant & Law Firm SaaS Revenue",
        "funds_breakdown": [
            {
                "category": "Regional Law Digitization & Legal Annotation",
                "percentage": 35,
                "amount_usd": 175000,
                "description": "Ingest regional state gazettes and cassation archives"
            },
            {
                "category": "Enterprise Bank Security & Integration",
                "percentage": 35,
                "amount_usd": 175000,
                "description": "Air-gapped on-premise deployments for financial institutions"
            },
            {
                "category": "NLP Model Engineering & Evaluation",
                "percentage": 20,
                "amount_usd": 100000,
                "description": "Bilingual legal embedding model fine-tuning"
            },
            {
                "category": "Bar Association Marketing & Legal Operations",
                "percentage": 10,
                "amount_usd": 50000,
                "description": "Continuing legal education webinars and compliance"
            }
        ]
    },
    "risks": [
        {
            "risk": "Complex and conflicting regional proclamation interpretations.",
            "severity": "Medium",
            "mitigation": "Maintaining strict citations pointing directly to official Gazette PDF page scans."
        },
        {
            "risk": "Slow institutional procurement cycles in public justice sector.",
            "severity": "Low",
            "mitigation": "Immediate commercial revenue focus on private law firms and commercial banks."
        }
    ],
    "links": [
        {
            "label": "Official Website",
            "url": "https://fith.ai"
        },
        {
            "label": "Legal Search Demo",
            "url": "https://search.fith.ai"
        }
    ],
    "theme": {
        "primary_color": "#7C3AED",
        "secondary_color": "#6D28D9",
        "accent_color": "#EC4899",
        "surface_color": "#F5F3FF",
        "text_color": "#4C1D95",
        "font_family": "system-ui, sans-serif",
        "radius": "1rem",
        "layout": "classic"
    }
}
];

export const STORAGE_PREFIX = "aiunipod_startup_override_";

export function getSavedStartup(slug: string): Startup | null {
  if (typeof window === "undefined" || !window.localStorage) return null;
  const base = STARTUPS.find((s) => s.slug === slug);
  if (!base) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + slug);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse saved startup override", e);
    return null;
  }
}

export function saveStartupOverride(slug: string, data: Startup): void {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(STORAGE_PREFIX + slug, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent("aiunipod_startup_updated", { detail: { slug } }));
    } catch (e) {
      console.error("Failed to save startup override", e);
    }
  }
}

export function resetStartupOverride(slug: string): void {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.removeItem(STORAGE_PREFIX + slug);
      window.dispatchEvent(new CustomEvent("aiunipod_startup_updated", { detail: { slug } }));
    } catch (e) {
      console.error("Failed to reset startup override", e);
    }
  }
}

export function getAllStartups(): Startup[] {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const validSlugs = new Set(STARTUPS.map((s) => s.slug));
      const keysToRemove: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith(STORAGE_PREFIX)) {
          const slug = key.slice(STORAGE_PREFIX.length);
          if (!validSlugs.has(slug)) {
            keysToRemove.push(key);
          }
        }
      }
      keysToRemove.forEach((k) => window.localStorage.removeItem(k));
    } catch {
      // ignore
    }
  }

  return STARTUPS.map((base) => {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const stored = window.localStorage.getItem(STORAGE_PREFIX + base.slug);
        if (stored) {
          return { ...base, ...JSON.parse(stored) };
        }
      } catch {
        // ignore
      }
    }
    return base;
  });
}

export function getStartupBySlug(slug: string): Startup | undefined {
  const base = STARTUPS.find((s) => s.slug === slug);
  if (base) {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const stored = window.localStorage.getItem(STORAGE_PREFIX + slug);
        if (stored) {
          return { ...base, ...JSON.parse(stored) };
        }
      } catch {
        // ignore
      }
    }
    return base;
  }

  // Check graduated alumni startups
  const alumni = ALUMNI_STARTUPS.find((s) => s.slug === slug);
  if (alumni) {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const stored = window.localStorage.getItem(STORAGE_ALUMNI_PREFIX + slug);
        if (stored) {
          return { ...alumni, ...JSON.parse(stored) };
        }
      } catch {
        // ignore
      }
    }
    return alumni;
  }

  return undefined;
}

const STAGE_ORDER: Record<string, number> = {
  Market: 4,
  Pilot: 3,
  Prototype: 2,
  Concept: 1,
};

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

export function getStartupCohort(startup: Startup): string {
  return startup.cohort || "Cohort 2";
}
