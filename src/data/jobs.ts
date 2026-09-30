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
    startupSlug: "kuraz-agri",
    startupName: "Kuraz Agri",
    startupTagline: "Satellite intelligence for smallholder yields",
    sector: "AgriTech",
    location: "Addis Ababa (EAII HQ) & Hawassa Hub",
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
      "Kuraz Agri is hiring a Senior Computer Vision Engineer to develop multi-resolution crop health monitoring and disease detection pipelines combining Sentinel-2 satellite imagery with smartphone-level phenotyping across Ethiopian farming cooperatives.",
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
    title: "Speech Recognition (ASR) Research Engineer",
    startupSlug: "adera-labs",
    startupName: "Adera Labs",
    startupTagline: "Amharic speech models for public services",
    sector: "Language AI",
    location: "Addis Ababa (EAII Headquarters)",
    type: "Full-time",
    experienceLevel: "Senior",
    workplaceType: "Hybrid",
    compensation: "$1,500 – $2,500 / month + Equity",
    postedDate: "2026-09-12",
    deadline: "2026-10-20",
    featured: true,
    department: "Acoustic Modeling",
    computeAllocation: "Dedicated High-Performance GPU Nodes + 10 Gbps Data Center Backbone",
    skills: ["Speech Recognition", "Whisper", "Conformer", "PyTorch", "C++", "Audio DSP"],
    summary:
      "Adera Labs is pioneering sovereign acoustic foundation models for Ethiopian languages. We are seeking an experienced ASR Engineer to build robust multi-speaker acoustic models that power automated municipal and public emergency hotlines.",
    responsibilities: [
      "Train and benchmark state-of-the-art end-to-end ASR models (Conformer, Whisper, Wav2Vec2) on 5,000+ hours of Ethiopic speech.",
      "Design robust acoustic data augmentation pipelines addressing background noise, telephonic codecs, and dialectal variations.",
      "Develop low-latency streaming inference servers optimized for concurrent municipal call-center sessions.",
      "Collaborate with Addis Ababa University linguists on phonetic alignment and Ge'ez script tokenizers.",
    ],
    requirements: [
      "3+ years building and deploying automated speech recognition (ASR) or speech synthesis (TTS) systems.",
      "Strong expertise in Kaldi, ESPnet, NeMo, or Hugging Face Speech pipelines.",
      "Fluency in Python and C++ for high-performance audio preprocessing and inference engines.",
      "Understanding of Ethiopian linguistic phonology and Ge'ez syllabary tokenization challenges.",
    ],
    niceToHave: [
      "Experience with telephony systems (SIP, Asterisk, WebRTC).",
      "Track record of scientific publications in INTERSPEECH, ICASSP, or ACL.",
    ],
    benefits: [
      "Work with the largest curated Ethiopic voice dataset on the continent.",
      "Dedicated high-performance GPU workstation with 256 GB RAM.",
      "Competitive salary indexed to USD and timbuktoo hub equity.",
      "Continuous professional training and global conference sponsorships.",
    ],
  },
  {
    id: "job-enku-gnn-04",
    title: "Graph Neural Network & Alternative Risk Modeler",
    startupSlug: "enku-credit",
    startupName: "Enku Credit",
    startupTagline: "Alternative credit intelligence for micro-merchants",
    sector: "Fintech AI",
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
    skills: ["Graph Neural Networks", "PyTorch Geometric", "Financial Modeling", "SQL", "MLflow"],
    summary:
      "Enku Credit builds graph-based alternative underwriting algorithms for informal merchants. We are hiring a Risk Modeler to develop Graph Neural Networks on mobile money and cooperative trade transaction graphs.",
    responsibilities: [
      "Construct heterogeneous transactional graph topologies representing merchant-supplier commercial relations.",
      "Train Graph Convolutional Networks (GCN) and Graph Attention Networks (GAT) to forecast default probabilities without collateral.",
      "Implement algorithmic fairness metrics to prevent socioeconomic, geographic, or gender bias in credit scoring.",
      "Work closely with partner microfinance institutions and SACCOs across Addis Ababa and Oromia.",
    ],
    requirements: [
      "2+ years experience in statistical machine learning, credit scoring, or financial risk modeling.",
      "Proficiency with PyTorch Geometric (PyG), DGL, or NetworkX.",
      "Strong understanding of feature engineering on relational transactional datasets.",
      "Experience with SQL and data pipelining tools (dbt, MLflow).",
    ],
    niceToHave: [
      "Background in financial inclusion, microfinance, or telecommunications data analytics.",
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
    title: "Edge AI & IoT Telematics Firmware Engineer",
    startupSlug: "sheba-logistics",
    startupName: "Sheba Fleet",
    startupTagline: "AI dynamic routing & cold-chain optimization",
    sector: "Logistics AI",
    location: "Dire Dawa / Addis Ababa, Ethiopia",
    type: "Full-time",
    experienceLevel: "Senior",
    workplaceType: "Hybrid",
    compensation: "$1,400 – $2,300 / month",
    postedDate: "2026-09-17",
    deadline: "2026-10-31",
    featured: false,
    department: "Hardware & Edge Systems",
    computeAllocation: "Regional Edge Node Testbed & High-Performance GPU Workstation",
    skills: ["Embedded C/C++", "Rust", "FreeRTOS", "TinyML", "CAN-bus", "Edge AI"],
    summary:
      "Sheba Fleet is seeking a Firmware & Edge AI Engineer to build offline-tolerant telematics units for pharmaceutical cold-chains and cross-border freight corridors between Addis Ababa, Dire Dawa, and Djibouti.",
    responsibilities: [
      "Develop embedded C/C++ and Rust firmware for ARM Cortex-M and Linux edge gateways.",
      "Deploy quantized lightweight neural networks on edge hardware for driver drowsiness and temperature anomaly prediction.",
      "Integrate GPS, CAN-bus, and multi-sensor digital temperature probes with offline caching.",
      "Optimize data compression over cellular 2G/3G/4G networks with intermittent connectivity.",
    ],
    requirements: [
      "3+ years experience in embedded systems, IoT hardware, and telematics firmware development.",
      "Strong programming skills in modern C, C++, or Rust, plus Python for scripting.",
      "Experience with RTOS (FreeRTOS, Zephyr) and embedded Linux platforms.",
      "Familiarity with hardware communication protocols (I2C, SPI, UART, CAN).",
    ],
    niceToHave: [
      "Experience deploying TinyML models on microcontrollers.",
      "Knowledge of cold-chain pharmaceutical transportation standards (WHO PQS).",
    ],
    benefits: [
      "Direct engagement with Ethiopia's primary trade transport corridor.",
      "Relocation support between Addis Ababa and Dire Dawa Free Trade Zone.",
      "Hardware lab equipment and prototyping components budget.",
      "Health insurance and annual bonus.",
    ],
  },
  {
    id: "job-awash-climate-06",
    title: "Spatio-Temporal Hydrological Modeling Fellow",
    startupSlug: "awash-climate",
    startupName: "Awash Climate",
    startupTagline: "Hydrological forecasting & drought resilience",
    sector: "Climate AI",
    location: "Adama & Addis Ababa (EAII)",
    type: "Fellowship",
    experienceLevel: "Fellowship",
    workplaceType: "Hybrid",
    compensation: "$1,200 / month Stipend + Research Grant",
    postedDate: "2026-09-10",
    deadline: "2026-10-15",
    featured: false,
    department: "Environmental Intelligence",
    computeAllocation: "High-Performance GPU Workstation & EAII Climate Data Ingest",
    skills: ["Time Series", "Transformers", "Geospatial Python", "Hydrology", "CHIRPS", "PyTorch"],
    summary:
      "Awash Climate invites graduate researchers and environmental data scientists to join our 12-month Fellowship developing spatio-temporal transformer models for river discharge and drought indexing in the Awash River Basin.",
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
