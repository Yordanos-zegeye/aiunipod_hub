import { useState } from "react";
import {
  Activity,
  AlertCircle,
  Check,
  Cpu,
  Database,
  Flame,
  Globe2,
  HeartPulse,
  Leaf,
  Mic,
  Play,
  RefreshCw,
  Sparkles,
  Volume2,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function AiSandboxShowcase() {
  const [activeTab, setActiveTab] = useState<"speech" | "agri" | "health">("speech");

  // 1. Language AI state
  const speechSamples = [
    {
      lang: "Amharic",
      native: "አማርኛ",
      input: "ጤና ይስጥልኝ፣ የሕዝብ አገልግሎት እና የጤና መድን መረጃ ማግኘት እፈልጋለሁ።",
      translation: "Hello, I would like to access public service and community health insurance information.",
      tokens: 18,
      latency: "42ms",
      confidence: "98.7%",
    },
    {
      lang: "Afaan Oromoo",
      native: "Afaan Oromoo",
      input: "Akkam jirtu, odeeffannoo tajaajila fayyaa fi inshuraansii hawaasaa argachuu barbaada.",
      translation: "Hello, I want to obtain information regarding community healthcare services and insurance.",
      tokens: 16,
      latency: "38ms",
      confidence: "99.1%",
    },
    {
      lang: "Tigrinya",
      native: "ትግርኛ",
      input: "ሰላም፣ ብዛዕባ ውሕስነት ጥዕናን ህዝባዊ ኣገልግሎታትን ሓበሬታ ክረክብ ይደልይ።",
      translation: "Greetings, I wish to obtain information about health insurance and municipal services.",
      tokens: 15,
      latency: "46ms",
      confidence: "97.9%",
    },
  ];
  const [selectedSpeech, setSelectedSpeech] = useState(0);
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);

  // 2. Agri AI state
  const cropSamples = [
    {
      crop: "Arabica Coffee",
      location: "Jimma Zone, Oromia",
      issue: "Coffee Leaf Rust (Hemileia vastatrix)",
      severity: "Stage 2 Moderate (Early Lesion)",
      confidence: "98.4%",
      ndvi: "0.58 (Stress Detected)",
      treatment: "Apply organic copper-based prophylactic spray; isolate affected seedling nursery.",
      isHealthy: false,
    },
    {
      crop: "White Teff (Magna)",
      location: "Debre Zeit Research Station",
      issue: "Shoot Fly Stem Borer (Atherigona soccata)",
      severity: "Stage 1 Localized Infestation",
      confidence: "96.8%",
      ndvi: "0.64 (Vegetative Vigour Drop)",
      treatment: "Early morning biological neem spray; increase field drainage around rows.",
      isHealthy: false,
    },
    {
      crop: "Specialty Sidama Coffee",
      location: "Bensa Woreda, Sidama",
      issue: "Healthy Canopy — Peak Chlorophyll",
      severity: "Optimal Vigour",
      confidence: "99.5%",
      ndvi: "0.82 (Excellent Biomass)",
      treatment: "Maintain shade-tree canopy density; schedule selective cherry harvest in 3 weeks.",
      isHealthy: true,
    },
  ];
  const [selectedCrop, setSelectedCrop] = useState(0);
  const [isScanningCrop, setIsScanningCrop] = useState(false);

  // 3. Health AI state
  const triageSamples = [
    {
      patient: "Pediatric Infant (9 months)",
      symptoms: "Stridor, respiratory rate 64/min, chest indrawing, high fever 39.4°C",
      tier: "Tier 1: Emergency Referral",
      color: "text-rose-500 bg-rose-500/10 border-rose-500/30",
      action: "Initiate emergency oxygen, administer pre-referral rectal artesunate, expedite dispatch to Zonal Hospital.",
      onDeviceLatency: "14ms (Offline SQLite-GGUF)",
      confidence: "99.2%",
    },
    {
      patient: "Maternal Postpartum (Day 4)",
      symptoms: "Severe fronto-temporal headache, scotoma (visual aura), BP 165/105 mmHg",
      tier: "Tier 1: Urgent Hypertensive Crisis",
      color: "text-amber-500 bg-amber-500/10 border-amber-500/30",
      action: "Immediate magnesium sulfate loading dose; transport to secondary maternal health center.",
      onDeviceLatency: "18ms (Offline SQLite-GGUF)",
      confidence: "97.8%",
    },
    {
      patient: "Adult Male (34 years)",
      symptoms: "Dry cough for 3 days, mild nasal congestion, afebrile, pulse 72 bpm",
      tier: "Tier 3: Community Extension Support",
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
      action: "Supportive oral hydration, honey & warm liquids, schedule routine follow-up if persisting > 7 days.",
      onDeviceLatency: "12ms (Offline SQLite-GGUF)",
      confidence: "98.6%",
    },
  ];
  const [selectedTriage, setSelectedTriage] = useState(0);

  const currentSpeech = speechSamples[selectedSpeech] ?? speechSamples[0]!;
  const currentCrop = cropSamples[selectedCrop] ?? cropSamples[0]!;
  const currentTriage = triageSamples[selectedTriage] ?? triageSamples[0]!;

  const simulateSpeechPlay = () => {
    setIsPlayingSpeech(true);
    setTimeout(() => setIsPlayingSpeech(false), 2400);
  };

  const simulateCropScan = (index: number) => {
    setIsScanningCrop(true);
    setSelectedCrop(index);
    setTimeout(() => setIsScanningCrop(false), 600);
  };

  return (
    <section id="sandbox" className="relative border-b border-border bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Zap className="size-3.5" />
              National Priority Sector Prototypes (Section 2 & 8)
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-6xl">
              Experience the models in action.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Interactive demonstrations of applied AI prototypes developed for Ethiopia’s national priority sectors—<strong>Agriculture, Healthcare, and Education</strong>—trained and benchmarked on <strong>high-performance GPU</strong> workstations.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="mt-12 flex flex-wrap gap-3 border-b border-border pb-4">
          <button
            type="button"
            onClick={() => setActiveTab("speech")}
            className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "speech"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <Mic className="size-4" />
            <span>Ethiopian Voice & NLP</span>
            <span className="rounded-full bg-primary-foreground/20 px-2 py-0.5 text-[10px] font-bold">
              VocalEye AI
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("agri")}
            className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "agri"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <Leaf className="size-4" />
            <span>Crop Vision & Satellite</span>
            <span className="rounded-full bg-primary-foreground/20 px-2 py-0.5 text-[10px] font-bold">
              EthioAgriSight
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("health")}
            className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "health"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <HeartPulse className="size-4" />
            <span>Offline Clinic Triage</span>
            <span className="rounded-full bg-primary-foreground/20 px-2 py-0.5 text-[10px] font-bold">
              HealUp
            </span>
          </button>
        </div>

        {/* Demo Content Shell */}
        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10 lg:p-12">
          {/* 1. Speech / NLP Showcase */}
          {activeTab === "speech" && (
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Model: VocalEye-Whisper-V3-Ethiopic · High-Performance GPU Benchmarked
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                    Multi-Lingual Acoustic & Speech Recognition
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Fine-tuned on the UniPod's high-performance GPU cluster and central data center corpora to advance personalized education, citizen services, and public information access across Ethiopia's major linguistic communities.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Select Language Sample:
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {speechSamples.map((sample, idx) => (
                      <button
                        key={sample.lang}
                        type="button"
                        onClick={() => setSelectedSpeech(idx)}
                        className={`rounded-xl border p-3 text-left transition-all ${
                          selectedSpeech === idx
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:bg-accent"
                        }`}
                      >
                        <p className="font-display text-sm font-semibold">{sample.lang}</p>
                        <p className="text-xs text-muted-foreground">{sample.native}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-muted/40 p-5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Input Acoustic Stream</span>
                    <span className="font-mono">{currentSpeech.lang} 16kHz</span>
                  </div>
                  <p className="mt-3 font-display text-lg font-medium leading-snug sm:text-xl">
                    "{currentSpeech.input}"
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <Button
                      type="button"
                      size="sm"
                      onClick={simulateSpeechPlay}
                      className="rounded-full px-4 text-xs"
                    >
                      {isPlayingSpeech ? (
                        <>
                          <RefreshCw className="mr-1.5 size-3.5 animate-spin" /> Synthesizing Audio...
                        </>
                      ) : (
                        <>
                          <Play className="mr-1.5 size-3.5" /> Play Voice Synthesis
                        </>
                      )}
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      Tokens: {currentSpeech.tokens}
                    </span>
                  </div>
                </div>
              </div>

              {/* Telemetry Output Pane */}
              <div className="flex flex-col justify-between rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
                <div>
                  <div className="flex items-center justify-between border-b border-primary/15 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-mono text-xs font-semibold text-primary">Inference Telemetry</span>
                    </div>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
                      RTF: 0.08x
                    </span>
                  </div>

                  {/* Simulated Acoustic Waveform */}
                  <div className="mt-6 flex h-14 items-end justify-between gap-1 rounded-xl bg-background/80 p-3">
                    {[40, 65, 80, 45, 95, 30, 85, 90, 60, 45, 75, 90, 35, 70, 85, 40, 95, 60, 30, 80].map(
                      (h, i) => (
                        <span
                          key={i}
                          style={{
                            height: isPlayingSpeech ? `${(h * ((i % 3) + 1)) % 100}%` : `${h}%`,
                            transition: "height 150ms ease",
                          }}
                          className="w-full rounded-full bg-primary/60"
                        />
                      )
                    )}
                  </div>

                  {/* Output Translation */}
                  <div className="mt-6 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Real-Time Neural English Translation:
                    </p>
                    <p className="rounded-xl border border-border bg-background p-4 text-sm leading-relaxed font-medium">
                      "{currentSpeech.translation}"
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-primary/15 pt-5 text-center">
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">Inference Latency</p>
                    <p className="font-display text-lg font-bold text-primary">
                      {currentSpeech.latency}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">Model Confidence</p>
                    <p className="font-display text-lg font-bold text-emerald-600">
                      {currentSpeech.confidence}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">Device Footprint</p>
                    <p className="font-display text-lg font-bold">142 MB INT8</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Agri AI Showcase */}
          {activeTab === "agri" && (
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Model: EthioAgriSight-CropVision-YOLOv9 · Regional Edge Node Tested
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                    Satellite Telemetry & Crop Pathology Vision
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Addressing national agricultural priorities (crop health monitoring and fertilizer distribution optimization) by combining multispectral Sentinel-2 satellite alerts with local vision models trained on high-performance GPU workstations.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Select Test Scenario:
                  </label>
                  <div className="space-y-2">
                    {cropSamples.map((sample, idx) => (
                      <button
                        key={sample.crop}
                        type="button"
                        onClick={() => simulateCropScan(idx)}
                        className={`w-full rounded-xl border p-3.5 text-left transition-all ${
                          selectedCrop === idx
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:bg-accent"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-display text-sm font-semibold">{sample.crop}</p>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              sample.isHealthy ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                            }`}
                          >
                            {sample.location}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{sample.issue}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Agri Telemetry Output */}
              <div className="flex flex-col justify-between rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
                <div>
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="font-mono text-xs font-semibold text-primary">Computer Vision Inference</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {isScanningCrop ? "Processing Sentinel Raster..." : "Inference Ready"}
                    </span>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-xl border border-border bg-card p-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Pathology Diagnosis:</span>
                        <span className="font-bold text-foreground">{currentCrop.issue}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Severity Tier:</span>
                        <span className="font-medium text-foreground">{currentCrop.severity}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Vegetation Index (NDVI):</span>
                        <span className="font-mono font-semibold text-emerald-600">
                          {currentCrop.ndvi}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Automated Agronomic Advisory:
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-foreground sm:text-sm">
                        {currentCrop.treatment}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border pt-4 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Classification Confidence</p>
                    <p className="font-display text-xl font-bold text-primary">
                      {currentCrop.confidence}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Ground Validation</p>
                    <p className="font-display text-xl font-bold text-emerald-600">SMS / USSD Alert Ready</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. Health AI Showcase */}
          {activeTab === "health" && (
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Model: HealUp-Clinical-Triage-Edge · National Health Priority
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                    Offline Clinical Diagnostics & Triage for Health Extension Workers
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Addressing national healthcare objectives (clinical diagnostics and automated screening) by executing offline on portable edge devices, guiding community health extension workers to prevent maternal and pediatric mortality.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Select Patient Case Presentation:
                  </label>
                  <div className="space-y-2">
                    {triageSamples.map((sample, idx) => (
                      <button
                        key={sample.patient}
                        type="button"
                        onClick={() => setSelectedTriage(idx)}
                        className={`w-full rounded-xl border p-3.5 text-left transition-all ${
                          selectedTriage === idx
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:bg-accent"
                        }`}
                      >
                        <p className="font-display text-sm font-semibold">{sample.patient}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{sample.symptoms}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Health Triage Telemetry */}
              <div className="flex flex-col justify-between rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
                <div>
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="font-mono text-xs font-semibold text-primary">Emergency Triage Decision</span>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
                      100% Offline Active
                    </span>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div
                      className={`rounded-xl border p-4 font-display text-base font-bold ${
                        currentTriage.color
                      }`}
                    >
                      {currentTriage.tier}
                    </div>

                    <div className="rounded-xl border border-border bg-card p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Recommended Clinical Directive:
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-foreground sm:text-sm">
                        {currentTriage.action}
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-background/80 p-3 text-xs text-muted-foreground">
                      <p>
                        <span className="font-semibold text-foreground">Local Language Audio Guidance:</span> Available in
                        Amharic & Afaan Oromoo voice prompts for extension health posts.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border pt-4 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">On-Device Inference</p>
                    <p className="font-mono text-sm font-bold text-foreground">
                      {currentTriage.onDeviceLatency}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Validation Accuracy</p>
                    <p className="font-display text-lg font-bold text-emerald-600">
                      {currentTriage.confidence}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
