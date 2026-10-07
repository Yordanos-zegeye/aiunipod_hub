export type JobType = "Full-time" | "Part-time" | "Contract" | "Fellowship" | "Internship";
export type ExperienceLevel = "Entry Level" | "Mid-Level" | "Senior" | "Lead / Principal" | "Fellowship";
export type WorkplaceType = "On-site" | "Hybrid" | "Remote (Ethiopia)";

export interface JobOpening {
  id: string;
  title: string;
  startupSlug: string;
  startupName: string;
  startupTagline: string;
  startupLogo?: string;
  sector: string;
  location: string;
  type: JobType;
  experienceLevel: ExperienceLevel;
  workplaceType: WorkplaceType;
  compensation: string;
  postedDate: string;
  deadline: string;
  featured?: boolean;
  computeAllocation: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  department: string;
  skills: string[];
  isCustomPosted?: boolean | undefined;
  contactEmail?: string | undefined;
  applicationUrl?: string | undefined;
}

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: "job-kuraz-cv-01",
    title: "Senior Computer Vision Engineer (Crop Pathology & Satellite)",
    startupSlug: "ethioagrisight",
    startupName: "EthioAgriSight",
    startupTagline: "Spatial AI and satellite telemetry for parcel-level yield resilience",
    sector: "AgriTech",
    location: "Addis Ababa (EAII HQ) & Adama Hub",
    type: "Full-time",
    experienceLevel: "Senior",
    workplaceType: "Hybrid",
    compensation: "$1,400 – $2,400 / month + Equity",
    postedDate: "2026-09-15",
    deadline: "2026-10-25",
    featured: true,
    department: "Machine Learning Engineering",
    computeAllocation: "Dedicated High-Performance GPU Workstation (256 GB RAM, NVMe) + 1 PB EAII Data Center Storage",
    skills: ["PyTorch", "YOLOv9", "Sentinel-2", "OpenCV", "GDAL", "Docker"],
    summary:
      "EthioAgriSight is hiring a Senior Computer Vision Engineer to develop multi-resolution crop health monitoring and disease detection pipelines combining Sentinel-2 satellite imagery with smartphone-level phenotyping across Ethiopian farming cooperatives.",
    responsibilities: [
      "Train, fine-tune, and quantize YOLOv9 and vision transformer models for field crop pathology diagnosis (rust, blight, stem borer).",
      "Develop satellite raster ingestion and NDVI anomaly scoring pipelines leveraging the EAII central data center.",
      "Optimize models for deployment to edge devices and low-bandwidth rural mobile applications.",
      "Collaborate with agricultural scientists from Addis Ababa University and regional research stations.",
      "Conduct regular benchmarking on the lab's high-performance GPU workstations.",
    ],
    requirements: [
      "3+ years of production experience in computer vision using PyTorch or TensorFlow.",
      "Strong background in convolutional neural networks, vision transformers, and multi-spectral satellite raster processing.",
      "Demonstrated experience with OpenCV, GDAL/Rasterio, and distributed model training.",
      "Solid Python programming skills and experience with containerized deployment (Docker, Kubernetes).",
      "BSc or MSc in Computer Science, Electrical Engineering, Data Science, or related STEM discipline.",
    ],
    niceToHave: [
      "Experience with agronomic telemetry or drone photography datasets in East Africa.",
      "Familiarity with edge quantization (ONNX Runtime, TensorRT, TFLite).",
      "Contributions to open-source agricultural or geospatial machine learning libraries.",
    ],
    benefits: [
      "Dedicated high-performance GPU workstation access.",
      "Stock option plan (ESOP) in an accelerated timbuktoo-backed venture.",
      "Health insurance covering inpatient and outpatient care in Addis Ababa.",
      "Annual technical conference and research publication budget.",
      "Flexible hybrid working arrangements.",
    ],
  },
  {
    id: "job-sela-nlp-02",
    title: "Clinical NLP Research Scientist (Ethiopic Languages)",
    startupSlug: "sela-health",
    startupName: "Sela Health",
    startupTagline: "AI triage for community clinics",
    sector: "Health AI",
    location: "Addis Ababa (EAII Headquarters)",
    type: "Full-time",
    experienceLevel: "Mid-Level",
    workplaceType: "On-site",
    compensation: "$1,200 – $2,000 / month + Equity",
    postedDate: "2026-09-18",
    deadline: "2026-10-30",
    featured: true,
    department: "Applied Research",
    computeAllocation: "High-Performance GPU Cluster & EAII Clinical Corpus Storage",
    skills: ["NLP", "Transformers", "LoRA / QLoRA", "Amharic NLP", "GGUF Quantization", "PyTorch"],
    summary:
      "Join Sela Health to build and calibrate lightweight, offline-first clinical decision support models that process patient case presentations in Amharic and Afaan Oromoo to assist rural health extension workers.",
    responsibilities: [
      "Curate, clean, and augment bilingual medical corpora in Amharic and Afaan Oromoo in compliance with patient privacy frameworks.",
      "Fine-tune parameter-efficient language models (LoRA/QLoRA) for clinical triage classification and emergency severity grading.",
      "Quantize neural models to sub-150MB footprints capable of sub-20ms inference on entry-level Android devices.",
      "Work alongside public health officers and pediatric clinical specialists to validate decision trees.",
      "Adhere strictly to AU Continental AI Data Governance guidelines and EAII ethics protocols.",
    ],
    requirements: [
      "2+ years of hands-on experience in Natural Language Processing with deep learning frameworks.",
      "Fluency or high proficiency in Amharic or Afaan Oromoo with deep understanding of vernacular medical phrasing.",
      "Experience with Hugging Face transformers, PyTorch, and quantization techniques (GGUF, bitsandbytes).",
      "Familiarity with clinical terminology, patient confidentiality, and responsible AI practices.",
      "Bachelor's or Master's degree in Computer Science, Linguistics, Biomedical Informatics, or related field.",
    ],
    niceToHave: [
      "Previous work with healthcare IT, DHIS2, or community health worker workflows in Ethiopia.",
      "Experience deploying speech-to-text frontends for mobile triage.",
    ],
    benefits: [
      "Direct social impact preventing maternal and child mortality across 40+ pilot health posts.",
      "Unrestricted access to high-performance GPU training nodes at EAII.",
      "Mentorship from leading international AI faculty through the UNDP timbuktoo network.",
      "Generous health coverage and annual performance bonus.",
    ],
  },
  {
    id: "job-adera-asr-03",
    title: "Computer Vision Research Engineer (Biometrics & Identity)",
    startupSlug: "trooface",
    startupName: "TrooFace",
    startupTagline: "AI identity verification and Fayda KYC for Ethiopia",
    sector: "RegTech AI",
    location: "Addis Ababa (EAII Headquarters)",
    type: "Full-time",
    experienceLevel: "Senior",
    workplaceType: "Hybrid",
    compensation: "$1,500 – $2,500 / month + Equity",
    postedDate: "2026-09-12",
    deadline: "2026-10-20",
    featured: true,
    department: "Computer Vision & Identity",
    computeAllocation: "Dedicated High-Performance GPU Nodes + 10 Gbps Data Center Backbone",
    skills: ["Computer Vision", "Facial Recognition", "Liveness Detection", "PyTorch", "C++", "ONNX"],
    summary:
      "TrooFace is pioneering sovereign biometric verification and Fayda National ID authentication models for Ethiopia. We are seeking an experienced Computer Vision Engineer to build robust face matching and document OCR models.",
    responsibilities: [
      "Train and benchmark state-of-the-art face embedding models and anti-spoofing presentation attack detection systems.",
      "Design robust neural document OCR models for physical and virtual Fayda ID cards.",
      "Develop low-latency streaming inference servers optimized for banking KYC onboarding.",
      "Collaborate with EAII and national identity regulators on demographic fairness and ethical validation.",
    ],
    requirements: [
      "3+ years building and deploying automated computer vision and biometric authentication systems.",
      "Strong expertise in PyTorch, TensorRT, and ONNX Runtime.",
      "Fluency in Python and C++ for high-performance inference engines.",
      "Understanding of facial biometric standards and anti-spoofing techniques.",
    ],
    niceToHave: [
      "Experience with national identity registry integrations or e-KYC platforms.",
      "Track record of scientific publications in CVPR, ICCV, or ECCV.",
    ],
    benefits: [
      "Work on the national biometric verification infrastructure for Ethiopia.",
      "Dedicated high-performance GPU workstation with 256 GB RAM.",
      "Competitive salary indexed to USD and timbuktoo hub equity.",
      "Continuous professional training and global conference sponsorships.",
    ],
  },
  {
    id: "job-enku-gnn-04",
    title: "Financial Market Machine Learning & Portfolio Modeler",
    startupSlug: "birr-gebeya",
    startupName: "Birr Gebeya",
    startupTagline: "AI-powered marketplace for Ethiopian capital markets",
    sector: "FinTech AI",
    location: "Addis Ababa, Ethiopia",
    type: "Full-time",
    experienceLevel: "Mid-Level",
    workplaceType: "Hybrid",
    compensation: "$1,300 – $2,100 / month + ESOP",
    postedDate: "2026-09-14",
    deadline: "2026-10-28",
    featured: false,
    department: "Risk Analytics & Modeling",
    computeAllocation: "High-Memory GPU Workstation (256 GB RAM)",
    skills: ["Financial Machine Learning", "Portfolio Optimization", "Time Series", "SQL", "MLflow"],
    summary:
      "Birr Gebeya builds algorithmic marketplace and securities intelligence tools for the newly launched Ethiopian Capital Market. We are hiring an ML Modeler to develop investor matching and asset discovery algorithms.",
    responsibilities: [
      "Construct predictive models for capital market yield curves and treasury instruments.",
      "Train personalized investor risk-profiling and portfolio allocation algorithms.",
      "Implement algorithmic transparency metrics ensuring regulatory compliance with the Ethiopian Capital Market Authority.",
      "Work closely with licensed brokerages and commercial asset managers.",
    ],
    requirements: [
      "2+ years experience in statistical machine learning, financial risk modeling, or quantitative finance.",
      "Proficiency with Python, scikit-learn, and PyTorch.",
      "Strong understanding of feature engineering on relational transactional datasets.",
      "Experience with SQL and data pipelining tools (dbt, MLflow).",
    ],
    niceToHave: [
      "Background in capital markets, treasury bills, or securities exchanges.",
      "Knowledge of Ethiopian banking regulatory directives and National Bank of Ethiopia compliance.",
    ],
    benefits: [
      "Competitive compensation and early-stage startup equity.",
      "Flexible hybrid working environment in central Addis Ababa.",
      "Comprehensive medical and life insurance.",
      "Direct mentorship from timbuktoo pan-African fintech mentors.",
    ],
  },
  {
    id: "job-sheba-edge-05",
    title: "FinTech Platform & Cross-Border Payment Infrastructure Engineer",
    startupSlug: "openpia",
    startupName: "OpenPIA",
    startupTagline: "Merchant of Record and cross-border payment infrastructure",
    sector: "FinTech AI",
    location: "Addis Ababa, Ethiopia",
    type: "Full-time",
    experienceLevel: "Senior",
    workplaceType: "Hybrid",
    compensation: "$1,400 – $2,300 / month",
    postedDate: "2026-09-17",
    deadline: "2026-10-31",
    featured: false,
    department: "Infrastructure & Systems",
    computeAllocation: "Regional Edge Node Testbed & High-Performance GPU Workstation",
    skills: ["TypeScript", "Golang", "Distributed Systems", "Payment APIs", "PostgreSQL", "Docker"],
    summary:
      "OpenPIA is seeking a Senior Backend Engineer to build robust Merchant of Record infrastructure enabling global sellers to accept payments in Ethiopian Birr with automated FX and tax compliance.",
    responsibilities: [
      "Develop high-throughput payment orchestration services in Go and TypeScript.",
      "Deploy risk scoring and anomaly detection models for fraud prevention.",
      "Integrate local payment rails (Telebirr, CBE Birr) with international card networks.",
      "Ensure adherence to PCI-DSS and national payment system standards.",
    ],
    requirements: [
      "3+ years experience in payment gateways, financial infrastructure, or distributed systems.",
      "Strong programming skills in Go, TypeScript/Node.js, and SQL.",
      "Experience with PostgreSQL transaction isolation, Redis caching, and idempotency patterns.",
      "Familiarity with financial auditing and accounting ledger systems.",
    ],
    niceToHave: [
      "Experience with cross-border remittance or FX settlement workflows.",
      "Knowledge of Ethiopian tax compliance and electronic invoicing requirements.",
    ],
    benefits: [
      "Direct engagement with Ethiopia's rapidly liberalizing digital economy.",
      "Equity stock options in an accelerated venture.",
      "Comprehensive health insurance and continuous education budget.",
      "Flexible hybrid working arrangements.",
    ],
  },
  {
    id: "job-scarecrow-edge-06",
    title: "Edge Embedded AI & Hardware Firmware Fellow",
    startupSlug: "smart-scarecrow",
    startupName: "Smart Scarecrow",
    startupTagline: "Solar edge AI deterrents for crop yield protection",
    sector: "AgriTech AI",
    location: "Addis Ababa & Field Pilot Sites",
    type: "Fellowship",
    experienceLevel: "Fellowship",
    workplaceType: "Hybrid",
    compensation: "$1,200 / month Stipend + Research Grant",
    postedDate: "2026-09-10",
    deadline: "2026-10-15",
    featured: false,
    department: "Embedded Edge AI",
    computeAllocation: "High-Performance GPU Workstation & Hardware Prototyping Lab",
    skills: ["Embedded C/C++", "Edge Vision", "YOLO Quantization", "Solar IoT", "LoRa", "PyTorch"],
    summary:
      "Smart Scarecrow invites graduate engineers to join our 12-month Fellowship deploying edge computer vision models onto solar-powered deterrent hardware deployed across Ethiopian agricultural zones.",
    responsibilities: [
      "Train spatio-temporal neural networks fusing weather radar, satellite precipitation (CHIRPS), and streamflow sensors.",
      "Develop probabilistic early-warning models for flash floods and drought severity.",
      "Publish peer-reviewed findings in partnership with Addis Ababa University Water Institute.",
      "Present actionable briefings to the Ministry of Water and Energy and regional disaster prevention commissions.",
    ],
    requirements: [
      "Master's or PhD (completed or near completion) in Hydrology, Civil Engineering, Geoinformatics, or Computer Science.",
      "Experience analyzing geospatial raster datasets and temporal climate time series in Python.",
      "Familiarity with hydrological modeling (SWAT, HEC-HMS) or deep learning time-series models (LSTM, Transformers).",
      "Publication track record or strong academic portfolio in environmental data analysis.",
    ],
    niceToHave: [
      "Experience with the Awash River Basin or East African hydrological dynamics.",
      "Fluency in Oromo or Amharic for stakeholder fieldwork.",
    ],
    benefits: [
      "Fully sponsored fellowship by UNDP Ethiopia & timbuktoo hub.",
      "Access to high-performance GPU workstations.",
      "Pathway to co-found or join Awash Climate as full-time Research Lead upon fellowship completion.",
      "Conference travel allowance.",
    ],
  },
  {
    id: "job-unipod-ethics-07",
    title: "AI Ethics & Governance Research Fellow",
    startupSlug: "unipod-central",
    startupName: "AI UniPod Central Hub",
    startupTagline: "National Center of Excellence in Applied AI",
    sector: "Sovereign AI & Governance",
    location: "Addis Ababa (EAII Headquarters)",
    type: "Fellowship",
    experienceLevel: "Fellowship",
    workplaceType: "On-site",
    compensation: "Fully Subsidized Fellowship + $1,000 / month Stipend",
    postedDate: "2026-09-19",
    deadline: "2026-11-05",
    featured: true,
    department: "Policy & Ethical Frameworks",
    computeAllocation: "Full Access to UniPod R&D Resources & Ethics Advisory Board Archives",
    skills: ["AI Policy", "Data Sovereignty", "UNESCO AI Ethics", "AU Continental Strategy", "Algorithmic Auditing"],
    summary:
      "Supported by UNDP Ethiopia and the Ethiopian Artificial Intelligence Institute (EAII), this flagship Fellowship anchors Ethiopia's algorithmic transparency and data protection guidelines in the African Union Continental AI Strategy and UNESCO ethics frameworks.",
    responsibilities: [
      "Draft policy briefs and algorithmic audit guidelines for AI solutions deployed in federal health and agricultural systems.",
      "Conduct digital readiness and data governance assessments for Ethiopian public sector institutions.",
      "Serve as technical secretariat to the AI UniPod Ethics Advisory Board.",
      "Collaborate with the parallel UniPod node in Nigeria on cross-border data protection harmonisation.",
    ],
    requirements: [
      "Graduate degree in Law, Public Policy, Data Ethics, Science & Technology Studies, or Computer Science.",
      "Demonstrated understanding of algorithmic accountability, data sovereignty, and international AI governance treaties.",
      "Strong writing and presentation skills in English and Amharic for ministerial audiences.",
      "Commitment to ethical, inclusive, and gender-equitable technology adoption in Africa.",
    ],
    niceToHave: [
      "Experience advising government ministries or international organizations (UNDP, AU, ITU, UNESCO).",
      "Familiarity with GDPR, the Malabo Convention, and national data protection legislations.",
    ],
    benefits: [
      "Direct contribution to Ethiopia's National Artificial Intelligence Strategy.",
      "Office space in the 800 m² living lab at EAII Headquarters in Addis Ababa.",
      "Participation in the Trans-African AI Alliance meetings.",
      "Comprehensive insurance and research stipend.",
    ],
  },
  {
    id: "job-unipod-intern-08",
    title: "Foundational Machine Learning Engineering Intern",
    startupSlug: "unipod-central",
    startupName: "AI UniPod Central Hub",
    startupTagline: "National Center of Excellence in Applied AI",
    sector: "AI & Robotics Lab",
    location: "Addis Ababa (EAII HQ / AAU)",
    type: "Internship",
    experienceLevel: "Entry Level",
    workplaceType: "On-site",
    compensation: "$500 / month Stipend + 100% Lab Training",
    postedDate: "2026-09-20",
    deadline: "2026-10-31",
    featured: false,
    department: "AI & Robotics Lab",
    computeAllocation: "Daily Workstation Slots on High-Performance GPU Systems",
    skills: ["Python", "PyTorch Basics", "Linux CLI", "Data Preprocessing", "Git", "Docker"],
    summary:
      "A competitive 6-month hands-on engineering internship for recent Ethiopian university graduates. Selected interns will rotate through the AI & Robotics Lab, Design Lab, and startup incubator clinics, receiving intensive training in PyTorch, MLOps, and hardware deployment.",
    responsibilities: [
      "Assist startup teams with model benchmarking, dataset preparation, and automated unit testing.",
      "Participate in foundational bootcamps covering Python for data science, neural networks, and computer vision.",
      "Maintain lab environments, Docker containers, and MLflow experiment tracking workflows.",
      "Help coordinate community hackathons, mobile lab demonstrations, and school outreach sprints.",
    ],
    requirements: [
      "Final year student or recent graduate (within 18 months) in Computer Science, Software Engineering, IT, or Electrical Engineering from an Ethiopian university.",
      "Proficiency in Python and basic understanding of linear algebra, calculus, and machine learning principles.",
      "Eager to learn modern deep learning stacks (PyTorch, Hugging Face, Linux CLI).",
      "Priority given to female candidates (supporting the 30% women target defined in Section 3 of the Concept Note).",
    ],
    niceToHave: [
      "Completed academic capstone project in machine learning or robotics.",
      "Active GitHub profile showcasing data science assignments or personal experiments.",
    ],
    benefits: [
      "Intensive 1-on-1 mentorship from resident AI Institute researchers and startup CTOs.",
      "Hands-on daily experience on high-performance GPU workstations.",
      "Certificate of Completion co-certified by UNDP Ethiopia, EAII, and Addis Ababa University.",
      "Direct hiring pipeline into accelerated startups upon graduation.",
    ],
  },
  {
    id: "job-tto-associate-09",
    title: "Technology Transfer & IP Commercialization Associate",
    startupSlug: "unipod-central",
    startupName: "AI UniPod Technology Transfer Office (TTO)",
    startupTagline: "IP protection & commercialization pathways",
    sector: "Technology Transfer",
    location: "Addis Ababa (EAII Headquarters)",
    type: "Full-time",
    experienceLevel: "Mid-Level",
    workplaceType: "On-site",
    compensation: "$1,100 – $1,800 / month",
    postedDate: "2026-09-16",
    deadline: "2026-10-25",
    featured: false,
    department: "Technology Transfer Office (TTO)",
    computeAllocation: "Dedicated Office at EAII HQ & IP Management Suite",
    skills: ["IP Strategy", "Patent Filing", "Tech Transfer", "Commercial Law", "Licensing Agreements"],
    summary:
      "The Technology Transfer Office (TTO) at AI UniPod Ethiopia is seeking an IP & Commercialization Associate to help university researchers and student founders navigate intellectual property protection, patent applications, and industry licensing.",
    responsibilities: [
      "Review invention disclosures from Addis Ababa University researchers and UniPod startup teams.",
      "Assist founders in filing patent, copyright, and trademark applications with the Ethiopian Intellectual Property Authority (EIPA).",
      "Draft technology transfer licensing terms, non-disclosure agreements (NDAs), and university equity-sharing arrangements.",
      "Facilitate matchmaking between mature AI prototypes and corporate or public-sector buyers.",
    ],
    requirements: [
      "2+ years experience in intellectual property management, technology transfer, or commercial law.",
      "Degree in Law (LLB), Technology Management, Engineering, or Business Administration.",
      "Familiarity with Ethiopian intellectual property statutes and university patenting policies.",
      "Strong negotiation and contract drafting abilities in English and Amharic.",
    ],
    niceToHave: [
      "Experience working in a university technology transfer office or venture incubator.",
      "Understanding of open-source AI licensing models (Apache 2.0, MIT, OpenRAIL).",
    ],
    benefits: [
      "Pivotal role building Ethiopia's first specialized AI Technology Transfer Office.",
      "Close collaboration with the Prime Minister's Office and Ministry of Innovation & Technology.",
      "Health insurance and annual training stipends.",
      "Prime location in central Addis Ababa at EAII Headquarters.",
    ],
  },
];
