import type { Startup } from "@/data/startups";

export type FounderJourney = {
  quote: string;
  headline: string;
  story?: string;
  problem_tackled: string;
  unipod_acceleration: string;
  commercial_breakthrough: string;
  where_they_are_now: string;
  advice_to_cohort3: string;
};

export type AlumniMilestone = {
  date: string;
  title: string;
  description: string;
  type: "Funding" | "Product" | "Partnership" | "Award";
};

export interface AlumniStartup extends Startup {
  graduation_year: string;
  cohort: "Cohort 1" | "Cohort 2";
  graduation_stage: "Market" | "Scale-up" | "Series A Ready";
  follow_on_funding_usd: number;
  follow_on_round: string;
  jobs_created_post_grad: number;
  commercial_partners: string[];
  founder_journey: FounderJourney;
  milestones: AlumniMilestone[];
  spotlight_featured?: boolean;
}

export const ALUMNI_STARTUPS: AlumniStartup[] = [
  {
    slug: "adwa-logistics",
    name: "Adwa Logistics AI",
    legal_name: "Adwa Intermodal Freight Intelligence PLC",
    tagline: "Autonomous container dispatch and freight consolidation along the Ethio-Djibouti Trade Corridor",
    sector: "Logistics AI",
    cohort: "Cohort 2",
    graduation_year: "2025",
    graduation_stage: "Scale-up",
    follow_on_funding_usd: 750000,
    follow_on_round: "Pre-Series A",
    jobs_created_post_grad: 34,
    commercial_partners: [
      "Ethiopian Shipping and Logistics Services Enterprise (ESLSE)",
      "Modjo Dry Port Authority",
      "Ethio Telecom Logistics",
      "Bolloré Transport & Logistics Ethiopia"
    ],
    spotlight_featured: true,
    description:
      "Graduating from AI UniPod Cohort 2 in 2025, Adwa Logistics AI built East Africa's leading intermodal freight optimization engine. Utilizing graph optimization and computer vision container tracking, Adwa reduces port dwell time and empty return runs along the critical 750km Addis-Djibouti trade corridor.",
    location: "Addis Ababa & Modjo Dry Port, Ethiopia",
    operating_markets: ["Ethiopia", "Djibouti", "Kenya Corridor (Mombasa-Moyale)"],
    founded: "2023",
    team_size: 22,
    primary_contact: {
      name: "Henok Tesfaye",
      role: "Co-Founder & Chief Executive Officer",
      email: "henok@adwalogistics.et",
      phone: "+251 91 188 4210",
    },
    founder_journey: {
      headline: "From AAiT Simulation Lab to Powering 18,000+ Container Freight Routes",
      quote:
        "Before AI UniPod, our routing models were theoretical algorithms on campus laptops. The high-performance compute clusters and living lab testing in Modjo Dry Port allowed us to validate container turnarounds in live freight lanes.",
      problem_tackled:
        "Over 90% of Ethiopian import/export freight flows through the Djibouti corridor, yet empty return runs and 8-day port bottlenecks were costing cross-border logistics operators millions of dollars annually.",
      unipod_acceleration:
        "During Cohort 2 incubation, Adwa received 24/7 access to high-performance GPU nodes at EAII to train combinatorial fleet allocation models and was paired with ESLSE port operational engineers to test live container telemetry.",
      commercial_breakthrough:
        "Signed a national multi-year concession with Modjo Dry Port to deploy automated gate optical character recognition (OCR) and predictive chassis staging, reducing truck dwell times by 28%.",
      where_they_are_now:
        "Operating across 6 dry port nodes, processing 18,000+ container shipments monthly, and closing a $750k Pre-Series A round led by pan-African supply chain venture syndicates.",
      advice_to_cohort3:
        "Anchor your AI models in physical industrial friction from day one. Do not train models in a vacuum; go stand on the port terminal or the farm and understand the manual workflow you are automating."
    },
    milestones: [
      {
        date: "May 2024",
        title: "Joined AI UniPod Cohort 2",
        description: "Accepted into living lab incubation with seed compute and EAII mentorship.",
        type: "Product"
      },
      {
        date: "December 2024",
        title: "Modjo Dry Port Concession Agreement",
        description: "Executed pilot deployment for 5,000 container movements.",
        type: "Partnership"
      },
      {
        date: "February 2025",
        title: "Cohort 2 Demo Day & Graduation",
        description: "Graduated with commercial contracts and awarded timbuktoo Top Venture honor.",
        type: "Award"
      },
      {
        date: "July 2025",
        title: "$750,000 Pre-Series A Financing",
        description: "Secured follow-on institutional round to expand along Kenya Northern Corridor.",
        type: "Funding"
      }
    ],
    products: [
      {
        name: "Adwa Corridor Dispatch Core",
        summary: "Dynamic fleet scheduling and empty return backhaul matching for heavy commercial haulage.",
        stage: "Market",
        target_customer: "Fleet operators, 3PL providers, and dry port management.",
        ai_functionality: "Constrained combinatorial reinforcement learning and real-time GPS telemetry routing.",
        differentiation: "Pre-trained on Ethiopian highland gradients and dry-port customs clearance delays."
      },
      {
        name: "PortEye Gate OCR",
        summary: "Computer vision container ISO code reader executing at truck gate check-ins.",
        stage: "Market",
        target_customer: "Customs authorities and bonded terminal yards.",
        ai_functionality: "Edge-quantized YOLOv9 model recognizing weathered steel container markings in sub-80ms.",
        differentiation: "99.4% accuracy on dusty and repainted ISO codes with zero cloud connectivity requirement."
      }
    ],
    investment_ask: {
      amount_usd: 1500000,
      round: "Series A",
      use_of_funds: "Expanding cross-border IoT tracking devices and port automation into Mombasa and Berbera corridors.",
    },
    links: [
      { label: "Website", url: "https://example.org/adwa-logistics" },
      { label: "Case Study Video", url: "https://example.org/adwa-case-study" }
    ],
    theme: {
      primary_color: "#1E3A8A",
      secondary_color: "#172554",
      accent_color: "#F59E0B",
      surface_color: "#F8FAFC",
      text_color: "#0F172A",
      font_family: "system-ui, sans-serif",
      radius: "1rem",
      layout: "classic"
    }
  },
  {
    slug: "hager-health",
    name: "Hager Health AI",
    legal_name: "Hager Digital Pathology & Biomedical AI SC",
    tagline: "Point-of-care digital pathology and automated tuberculosis screening for regional hospitals",
    sector: "Health AI",
    cohort: "Cohort 1",
    graduation_year: "2024",
    graduation_stage: "Scale-up",
    follow_on_funding_usd: 620000,
    follow_on_round: "Seed",
    jobs_created_post_grad: 28,
    commercial_partners: [
      "Tikur Anbessa Specialized Hospital",
      "Ethiopian Public Health Institute (EPHI)",
      "Ministry of Health - National TB Program",
      "The Global Fund"
    ],
    spotlight_featured: true,
    description:
      "Graduating in Cohort 1 (2024), Hager Health AI developed an automated whole-slide image analysis workstation for microscopic tuberculosis and cervical cytology screening in rural district hospitals lacking specialist pathologists.",
    location: "Addis Ababa & Hawassa, Ethiopia",
    operating_markets: ["Ethiopia (Oromia, Amhara, Sidama Regional States)", "Rwanda"],
    founded: "2023",
    team_size: 19,
    primary_contact: {
      name: "Dr. Dawit Mengistu",
      role: "Co-Founder & Chief Medical Officer",
      email: "dawit@hagerhealth.et",
      phone: "+251 91 230 7715",
    },
    founder_journey: {
      headline: "Overcoming Ethiopia's 1:1,000,000 Pathologist Deficit with Edge AI Scanners",
      quote:
        "In Ethiopia, fewer than 100 practicing pathologists serve 125 million people. Biopsy results used to take 4 to 8 weeks. Through AI UniPod's living lab certification, our models screen slides in 90 seconds right in regional clinics.",
      problem_tackled:
        "Rural health centers routinely ship physical glass slides over rough roads to central laboratories in Addis Ababa, leading to broken samples, lost patient records, and late-stage diagnostic delays for treatable infections.",
      unipod_acceleration:
        "The AI UniPod enabled Hager Health to bridge medical researchers at Tikur Anbessa with machine learning engineers at EAII. Seed grants supported the 3D-printing and motorization of local microscope slide scanners.",
      commercial_breakthrough:
        "Achieved formal regulatory authorization under the EFDA Class II medical software pilot, unlocking deployment across 18 regional hospital laboratories backed by the Global Fund.",
      where_they_are_now:
        "Over 64,000 diagnostic slide scans analyzed with a 94.2% sensitivity rate, saving an estimated 14,000 patient-travel days and scaling across Southern Ethiopia.",
      advice_to_cohort3:
        "Clinical AI requires clinical trust. Co-design your solution alongside senior Ethiopian physicians who will defend your product to regulators."
    },
    milestones: [
      {
        date: "October 2023",
        title: "Selected for AI UniPod Cohort 1",
        description: "Began incubation at EAII living lab focusing on medical imaging edge-quantization.",
        type: "Product"
      },
      {
        date: "June 2024",
        title: "Cohort 1 Graduation & EFDA Pilot Clearance",
        description: "Demonstrated 94%+ diagnostic agreement in blinded multicenter hospital trials.",
        type: "Award"
      },
      {
        date: "November 2024",
        title: "$620,000 Seed Round",
        description: "Backed by health-focused impact investors and international grant syndicates.",
        type: "Funding"
      },
      {
        date: "April 2025",
        title: "60,000 Patients Screened Milestone",
        description: "National rollout across 18 regional hospital laboratories in 3 regional states.",
        type: "Partnership"
      }
    ],
    products: [
      {
        name: "Hager SlideScan Edge",
        summary: "Motorized microscope attachment and edge inferencing box for acid-fast bacilli detection.",
        stage: "Market",
        target_customer: "Zonal referral hospitals, regional public health laboratories.",
        ai_functionality: "Multiscale Vision Transformer detecting micro-colonies on Ziehl-Neelsen stained slides.",
        differentiation: "Runs 100% offline on a low-cost embedded GPU workstation."
      }
    ],
    investment_ask: {
      amount_usd: 1200000,
      round: "Series A",
      use_of_funds: "Scaling hardware production to 100 hospital laboratories and expanding cervical screening models.",
    },
    links: [
      { label: "Website", url: "https://example.org/hager-health" },
      { label: "Clinical Whitepaper", url: "https://example.org/hager-clinical-report" }
    ],
    theme: {
      primary_color: "#0D9488",
      secondary_color: "#115E59",
      accent_color: "#10B981",
      surface_color: "#F0FDFA",
      text_color: "#134E4A",
      font_family: "system-ui, sans-serif",
      radius: "1rem",
      layout: "classic"
    }
  },
  {
    slug: "zemen-vision",
    name: "Zemen Vision AI",
    legal_name: "Zemen Edge Intelligence & Smart Systems PLC",
    tagline: "Sovereign edge computer vision for traffic flow optimization and municipal infrastructure management",
    sector: "Computer Vision",
    cohort: "Cohort 1",
    graduation_year: "2024",
    graduation_stage: "Scale-up",
    follow_on_funding_usd: 480000,
    follow_on_round: "Seed",
    jobs_created_post_grad: 24,
    commercial_partners: [
      "Addis Ababa City Traffic Management Agency",
      "Ethio Telecom Smart City Initiative",
      "Addis Ababa Police Commission"
    ],
    spotlight_featured: false,
    description:
      "Graduating from Cohort 1 in 2024, Zemen Vision AI manufactures ruggedized roadside edge camera units running sovereign computer vision models. Their platform dynamically controls traffic signals and detects accidents across 24 high-density intersections in Addis Ababa.",
    location: "Addis Ababa, Ethiopia",
    operating_markets: ["Ethiopia (Addis Ababa, Adama, Dire Dawa)"],
    founded: "2023",
    team_size: 16,
    primary_contact: {
      name: "Hilina Tamrat",
      role: "Founder & Chief Technology Officer",
      email: "hilina@zemenvision.et",
      phone: "+251 91 305 6620",
    },
    founder_journey: {
      headline: "Engineering Hardware + Neural Edge Vision to Unclog Addis Ababa's Major Roundabouts",
      quote:
        "Commercial cloud video streams were impossible due to fiber bandwidth limitations. We designed sub-15W edge neural units that calculate vehicle densities directly on the traffic light mast without streaming raw video.",
      problem_tackled:
        "Static timer traffic lights caused chronic gridlock during peak hours across major roundabouts (Meskel Square, Mexico Square, Megenagna), wasting an estimated 1.8M liters of fuel monthly.",
      unipod_acceleration:
        "The makerspace and hardware prototyping shop at AI UniPod gave Zemen access to industrial CNC machines, solder stations, and thermal testing chambers to build weatherproof roadside housings.",
      commercial_breakthrough:
        "Won a competitive tender with the Addis Ababa City Traffic Management Agency to deploy adaptive signal timing across the Bole-Airport corridor, cutting travel delays by 22%.",
      where_they_are_now:
        "Managing 24 primary traffic nodes, counting over 2.4 million vehicle journeys daily, and manufacturing edge camera devices locally in Addis Ababa.",
      advice_to_cohort3:
        "If you build for Africa, build for infrastructure realities. High availability on solar and battery power will always beat a cloud model that crashes when the line drops."
    },
    milestones: [
      {
        date: "September 2023",
        title: "Admitted to AI UniPod Cohort 1",
        description: "Began hardware prototyping of roadside edge vision compute clusters.",
        type: "Product"
      },
      {
        date: "May 2024",
        title: "Bole Corridor Municipal Pilot Success",
        description: "Completed 6-month trial demonstrating 22% traffic delay reduction.",
        type: "Partnership"
      },
      {
        date: "July 2024",
        title: "Cohort 1 Graduation",
        description: "Showcased live intersection telematics at National AI Exhibition.",
        type: "Award"
      },
      {
        date: "January 2025",
        title: "$480,000 Seed Round",
        description: "Closed equity round to scale domestic manufacturing and sensor assembly.",
        type: "Funding"
      }
    ],
    products: [
      {
        name: "Zemen FlowController",
        summary: "Adaptive intersection signal controller optimizing traffic green-time based on real-time vehicle density.",
        stage: "Market",
        target_customer: "Municipal transport bureaus and highway authorities.",
        ai_functionality: "Edge vehicle classification and multi-lane queue length estimation using quantized ONNX runtime.",
        differentiation: "Operates with 12V solar backup and zero external internet dependency."
      }
    ],
    investment_ask: {
      amount_usd: 1000000,
      round: "Series A",
      use_of_funds: "Expanding to 60 additional roundabouts and launching smart parking vision models.",
    },
    links: [
      { label: "Website", url: "https://example.org/zemen-vision" },
      { label: "Intersection Live Demo", url: "https://example.org/zemen-demo" }
    ],
    theme: {
      primary_color: "#7C3AED",
      secondary_color: "#5B21B6",
      accent_color: "#EC4899",
      surface_color: "#FAF5FF",
      text_color: "#2E1065",
      font_family: "system-ui, sans-serif",
      radius: "1rem",
      layout: "classic"
    }
  },
  {
    slug: "abba-finai",
    name: "Abba FinAI",
    legal_name: "Abba Intelligent Credit Technologies PLC",
    tagline: "Alternative credit scoring and micro-merchant transaction underwriting for unbanked retailers",
    sector: "FinTech AI",
    cohort: "Cohort 2",
    graduation_year: "2025",
    graduation_stage: "Scale-up",
    follow_on_funding_usd: 520000,
    follow_on_round: "Pre-Series A",
    jobs_created_post_grad: 31,
    commercial_partners: [
      "Cooperative Bank of Oromia (Coopbank)",
      "Awash Bank",
      "Dashen Bank (Amole)",
      "National Bank of Ethiopia Sandbox"
    ],
    spotlight_featured: false,
    description:
      "Graduating in Cohort 2 (2025), Abba FinAI developed graph neural network scoring engines that convert airtime top-ups, mobile money trails, and merchant ledger transactions into calibrated credit scores for uncollateralized working capital loans.",
    location: "Addis Ababa & Bishoftu, Ethiopia",
    operating_markets: ["Ethiopia"],
    founded: "2024",
    team_size: 18,
    primary_contact: {
      name: "Rediet Shiferaw",
      role: "Co-Founder & Chief Product Officer",
      email: "rediet@abbafinai.et",
      phone: "+251 91 144 8830",
    },
    founder_journey: {
      headline: "Enabling $14.2M in Micro-Merchant Loans with 98.4% On-Time Repayment",
      quote:
        "Over 85% of small retailers across Ethiopia cannot obtain a bank loan because they lack formal land titles or tax filings. By analyzing daily mobile inventory turnover through Telebirr and Coopbank APIs, we gave banks the confidence to lend to kiosk owners.",
      problem_tackled:
        "Informal micro-merchants were forced into predatory informal loan rates (15-20% per month) to restock inventory because commercial banks had zero visibility into their actual daily cash flow.",
      unipod_acceleration:
        "During AI UniPod Cohort 2, Abba accessed secure computing environments at EAII to benchmark graph neural network risk models under strict National Bank of Ethiopia data privacy standards.",
      commercial_breakthrough:
        "Partnered with Cooperative Bank of Oromia to underwrite instant 30-day working capital loans for 22,000 neighborhood shopkeepers directly on USSD/mobile app.",
      where_they_are_now:
        "Over $14.2M in working capital disbursed through partner financial institutions with an industry-leading 98.4% on-time repayment rate.",
      advice_to_cohort3:
        "Focus on regulatory compliance before building proprietary models. If you don't understand the Central Bank directives, your fintech model cannot launch commercially."
    },
    milestones: [
      {
        date: "March 2024",
        title: "Selected for AI UniPod Cohort 2",
        description: "Began sandbox testing of alternative credit scoring algorithms.",
        type: "Product"
      },
      {
        date: "November 2024",
        title: "Coopbank Commercial Pilot Launch",
        description: "Underwrote first 2,500 kiosk loans with 99% repayment.",
        type: "Partnership"
      },
      {
        date: "February 2025",
        title: "Cohort 2 Demo Day Graduation",
        description: "Named Winner of Fintech Excellence Award at UniPod Summit.",
        type: "Award"
      },
      {
        date: "August 2025",
        title: "$520,000 Pre-Series A Financing",
        description: "Closed funding to scale credit lines with two additional commercial banks.",
        type: "Funding"
      }
    ],
    products: [
      {
        name: "Abba Score Engine",
        summary: "API-driven risk assessment engine converting mobile money and ledger history into instant credit scores.",
        stage: "Market",
        target_customer: "Commercial banks, microfinance institutions, and agricultural cooperatives.",
        ai_functionality: "Graph Neural Networks and gradient boosting evaluating financial resilience and cash velocity.",
        differentiation: "Trained explicitly on Ethiopian informal merchant retail cycles and holiday demand spikes."
      }
    ],
    investment_ask: {
      amount_usd: 1200000,
      round: "Series A",
      use_of_funds: "Expanding scoring into agricultural input dealers and scaling loan guarantees.",
    },
    links: [
      { label: "Website", url: "https://example.org/abba-finai" },
      { label: "Product API Docs", url: "https://example.org/abba-api" }
    ],
    theme: {
      primary_color: "#059669",
      secondary_color: "#065F46",
      accent_color: "#FBBF24",
      surface_color: "#ECFDF5",
      text_color: "#064E3B",
      font_family: "system-ui, sans-serif",
      radius: "1rem",
      layout: "classic"
    }
  },
  {
    slug: "geda-climate",
    name: "Geda Climate AI",
    legal_name: "Geda Geointelligence and Climate Analytics PLC",
    tagline: "Multispectral drought forecasting and micro-insurance index underwriting for pastoralist communities",
    sector: "AgriTech",
    cohort: "Cohort 1",
    graduation_year: "2024",
    graduation_stage: "Scale-up",
    follow_on_funding_usd: 350000,
    follow_on_round: "Seed",
    jobs_created_post_grad: 18,
    commercial_partners: [
      "Oromia Insurance Company",
      "Ministry of Water and Energy",
      "World Food Programme (WFP)",
      "Borena Pastoralist Cooperatives"
    ],
    spotlight_featured: false,
    description:
      "Graduating in Cohort 1 in 2024, Geda Climate AI combines Sentinel-2 vegetation indices, GRACE groundwater satellite gravimetry, and historical weather patterns to forecast severe pasture deficit 45 days before livestock starvation.",
    location: "Addis Ababa & Moyale, Ethiopia",
    operating_markets: ["Ethiopia (Borena, Somali, Afar Zones)", "Kenya (Marsabit)"],
    founded: "2023",
    team_size: 14,
    primary_contact: {
      name: "Solomon Kebede",
      role: "Founder & Lead Geospatial Scientist",
      email: "solomon@gedaclimate.et",
      phone: "+251 91 122 3904",
    },
    founder_journey: {
      headline: "Protecting 110,000 Hectares of Pastoral Rangeland with Predictive Satellite Indexing",
      quote:
        "In the dry lowlands of Borena and Somali regions, when drought hits, herders lose their entire livelihood. Traditional aid arrives 3 months too late. Geda's satellite AI triggers automated payouts and animal feed vouchers weeks before cattle perish.",
      problem_tackled:
        "Climate change causes erratic monsoon seasons in the Horn of Africa, creating recurrent forage failure. Manual pasture inspection is impossible across hundreds of thousands of square kilometers of remote terrain.",
      unipod_acceleration:
        "At AI UniPod, Geda tapped into the central data center's 1 PB storage to ingest 10 years of multi-satellite radar and optical rasters, building machine learning pipelines that accurately predict biomass collapse.",
      commercial_breakthrough:
        "Contracted by Oromia Insurance Company and international humanitarian partners to underwrite index-based livestock micro-insurance for 8,500 pastoralist households.",
      where_they_are_now:
        "Monitoring 110,000 hectares of grazing land and providing monthly briefings to the Ethiopian Disaster Risk Management Commission.",
      advice_to_cohort3:
        "Combine technology with deep cultural respect for local elders and cooperative leaders. Satellite data without community trust cannot save a single cow."
    },
    milestones: [
      {
        date: "November 2023",
        title: "Selected for AI UniPod Cohort 1",
        description: "Began satellite ingestion pipeline development at EAII computing cluster.",
        type: "Product"
      },
      {
        date: "April 2024",
        title: "First Automated Payout Pilot in Borena",
        description: "Verified 88% correlation between satellite forage index and ground pasture health.",
        type: "Partnership"
      },
      {
        date: "July 2024",
        title: "Cohort 1 Graduation",
        description: "Honored with the National Climate Innovation Award at UniPod Demo Day.",
        type: "Award"
      },
      {
        date: "March 2025",
        title: "$350,000 Seed Investment",
        description: "Secured impact funding from pan-African climate resilience funds.",
        type: "Funding"
      }
    ],
    products: [
      {
        name: "Geda ForageWatch Index",
        summary: "Weekly 10-meter resolution pasture density and surface water availability dashboard.",
        stage: "Market",
        target_customer: "Agricultural insurers, disaster risk commissions, and livestock ministries.",
        ai_functionality: "Multimodal fusion of synthetic aperture radar (SAR) and optical NDVI time-series.",
        differentiation: "Penetrates cloud cover using radar interferometry to monitor rangelands throughout rainy seasons."
      }
    ],
    investment_ask: {
      amount_usd: 800000,
      round: "Series A",
      use_of_funds: "Expanding rangeland monitoring across Kenya and Somalia border pastoral corridors.",
    },
    links: [
      { label: "Website", url: "https://example.org/geda-climate" },
      { label: "Satellite Atlas Demo", url: "https://example.org/geda-atlas" }
    ],
    theme: {
      primary_color: "#2563EB",
      secondary_color: "#1E40AF",
      accent_color: "#10B981",
      surface_color: "#EFF6FF",
      text_color: "#1E3A8A",
      font_family: "system-ui, sans-serif",
      radius: "1rem",
      layout: "classic"
    }
  },
  {
    slug: "kaffa-agritech",
    name: "Kaffa AgriTech",
    legal_name: "Kaffa Smart Agricultural Technologies PLC",
    tagline: "Spectroscopic green coffee bean grading and export provenance verification with sovereign AI",
    sector: "AgriTech",
    cohort: "Cohort 2",
    graduation_year: "2025",
    graduation_stage: "Scale-up",
    follow_on_funding_usd: 410000,
    follow_on_round: "Seed",
    jobs_created_post_grad: 21,
    commercial_partners: [
      "Ethiopian Coffee and Tea Authority",
      "Ethiopian Commodity Exchange (ECX)",
      "Jimma Agricultural Research Center (JARC)",
      "Yirgacheffe Coffee Farmers Cooperative Union"
    ],
    spotlight_featured: false,
    description:
      "Graduating from Cohort 2 in 2025, Kaffa AgriTech built hand-held near-infrared (NIR) spectral analyzers paired with localized machine learning models to assess moisture, defect count, and cup score of Ethiopian specialty coffee beans in under 30 seconds.",
    location: "Addis Ababa & Jimma, Ethiopia",
    operating_markets: ["Ethiopia (Jimma, Yirgacheffe, Sidama, Guji)", "International Export Buyers"],
    founded: "2024",
    team_size: 15,
    primary_contact: {
      name: "Yonas Tadesse",
      role: "Co-Founder & Chief Operations Officer",
      email: "yonas@kaffaagritech.et",
      phone: "+251 91 199 0041",
    },
    founder_journey: {
      headline: "Digitizing the Cradle of Coffee: Instant Grading for 4,200 Metric Tons of Specialty Beans",
      quote:
        "Ethiopian coffee is celebrated worldwide, but smallholder washing stations often sell Grade 1 beans at lower commodity prices because traditional lab cup testing takes days in Addis Ababa. Our handheld spectral sensor gives washing stations export-grade verification on the spot.",
      problem_tackled:
        "Over 5 million Ethiopian families depend on coffee. Washing stations and farmers lost 15-25% of premium export price due to subjective visual grading and multi-day delays waiting for central sensory lab results.",
      unipod_acceleration:
        "The living lab team at AI UniPod connected Kaffa AgriTech with Jimma Agricultural Research Center to calibrate spectral reflectance curves across 2,400 authenticated Arabica heirloom varieties.",
      commercial_breakthrough:
        "Deployed 12 handheld devices across cooperative washing stations in Yirgacheffe and Sidama during the 2024/2025 harvest, verifying $11.5M in export coffee batches with 98.2% agreement with Q-graders.",
      where_they_are_now:
        "Graded over 4,200 metric tons of coffee, partnering with the Ethiopian Coffee and Tea Authority to pilot digital provenance certificates.",
      advice_to_cohort3:
        "Leverage Ethiopia's global heritage. When you combine unique local domain assets—like Ethiopian heirloom coffee—with deep AI engineering, you build an unbeatable global advantage."
    },
    milestones: [
      {
        date: "February 2024",
        title: "Joined AI UniPod Cohort 2",
        description: "Began spectral database collection across Ethiopian heirloom coffee beans.",
        type: "Product"
      },
      {
        date: "November 2024",
        title: "Yirgacheffe Washing Station Field Trials",
        description: "Evaluated 1,200 coffee batches with instant 30-second grading turnaround.",
        type: "Partnership"
      },
      {
        date: "February 2025",
        title: "Cohort 2 Demo Day Graduation",
        description: "Presented export provenance platform to international specialty coffee buyers.",
        type: "Award"
      },
      {
        date: "June 2025",
        title: "$410,000 Seed Investment",
        description: "Backed by pan-African agritech syndicates and diaspora angel investors.",
        type: "Funding"
      }
    ],
    products: [
      {
        name: "Kaffa SpectroGrade Handheld",
        summary: "Portable optical spectrometer device grading green coffee bean moisture, density, and defect class.",
        stage: "Market",
        target_customer: "Coffee washing stations, cooperative unions, and export grading laboratories.",
        ai_functionality: "Chemometric neural regression models predicting Specialty Coffee Association (SCA) scores.",
        differentiation: "Pre-calibrated specifically for Ethiopian highland heirloom genetics."
      }
    ],
    investment_ask: {
      amount_usd: 900000,
      round: "Series A",
      use_of_funds: "Deploying 100 devices across Jimma, Sidama, and Harar washing stations and integrating traceability software.",
    },
    links: [
      { label: "Website", url: "https://example.org/kaffa-agritech" },
      { label: "SCA Benchmark Whitepaper", url: "https://example.org/kaffa-sca-benchmark" }
    ],
    theme: {
      primary_color: "#B45309",
      secondary_color: "#78350F",
      accent_color: "#10B981",
      surface_color: "#FFFBEB",
      text_color: "#451A03",
      font_family: "system-ui, sans-serif",
      radius: "1rem",
      layout: "classic"
    }
  }
];

export const STORAGE_ALUMNI_PREFIX = "aiunipod_alumni_override_";

export function getSavedAlumni(slug: string): AlumniStartup | null {
  if (typeof window === "undefined" || !window.localStorage) return null;
  const base = ALUMNI_STARTUPS.find((s) => s.slug === slug);
  if (!base) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_ALUMNI_PREFIX + slug);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse saved alumni override", e);
    return null;
  }
}

export function saveAlumniOverride(slug: string, data: AlumniStartup): void {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(STORAGE_ALUMNI_PREFIX + slug, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent("aiunipod_alumni_updated", { detail: { slug } }));
    } catch (e) {
      console.error("Failed to save alumni override", e);
    }
  }
}

export function getAllAlumni(): AlumniStartup[] {
  return ALUMNI_STARTUPS.map((base) => {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const stored = window.localStorage.getItem(STORAGE_ALUMNI_PREFIX + base.slug);
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

export function getAlumniBySlug(slug: string): AlumniStartup | undefined {
  const base = ALUMNI_STARTUPS.find((s) => s.slug === slug);
  if (!base) return undefined;
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const stored = window.localStorage.getItem(STORAGE_ALUMNI_PREFIX + slug);
      if (stored) {
        return { ...base, ...JSON.parse(stored) };
      }
    } catch {
      // ignore
    }
  }
  return base;
}
