import { Check, Copy, ExternalLink, Eye, Palette, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DEFAULT_WHITE_LABEL, luminance, readableOn, type WhiteLabelSettings } from "@/lib/white-label";

interface ThemeEditorProps {
  startupName: string;
  theme: WhiteLabelSettings;
  onChange: (updatedTheme: WhiteLabelSettings) => void;
  onSave?: () => void;
}

const PRESET_PALETTES = [
  {
    name: "Sovereign Blue",
    primary: "#0468B1",
    secondary: "#111827",
    accent: "#F5C518",
    surface: "#FFFFFF",
    text: "#0B1220",
  },
  {
    name: "Emerald AgriTech",
    primary: "#059669",
    secondary: "#064E3B",
    accent: "#10B981",
    surface: "#F0FDF4",
    text: "#022C22",
  },
  {
    name: "Addis Indigo",
    primary: "#4F46E5",
    secondary: "#1E1B4B",
    accent: "#818CF8",
    surface: "#EEF2FF",
    text: "#0F172A",
  },
  {
    name: "Frontier Amber",
    primary: "#D97706",
    secondary: "#451A03",
    accent: "#F59E0B",
    surface: "#FFFBEB",
    text: "#1C1917",
  },
  {
    name: "Living Lab Crimson",
    primary: "#E11D48",
    secondary: "#4C0519",
    accent: "#FB7185",
    surface: "#FFF1F2",
    text: "#1E293B",
  },
  {
    name: "Cyber Teal",
    primary: "#0D9488",
    secondary: "#134E4A",
    accent: "#2DD4BF",
    surface: "#F0FDFA",
    text: "#042F2E",
  },
];

const RADIUS_OPTIONS = [
  { label: "Compact (0.5rem)", value: "0.5rem" },
  { label: "Standard (0.75rem)", value: "0.75rem" },
  { label: "Modern (1.0rem)", value: "1rem" },
  { label: "Generous (1.25rem)", value: "1.25rem" },
  { label: "Soft Pill (1.5rem)", value: "1.5rem" },
];

export function ThemeEditor({ startupName, theme, onChange, onSave }: ThemeEditorProps) {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleColorChange = (key: keyof WhiteLabelSettings, value: string) => {
    onChange({
      ...theme,
      [key]: value,
    });
  };

  const handleApplyPalette = (palette: typeof PRESET_PALETTES[0]) => {
    onChange({
      ...theme,
      primary_color: palette.primary,
      secondary_color: palette.secondary,
      accent_color: palette.accent,
      surface_color: palette.surface,
      text_color: palette.text,
    });
    toast.success(`Applied "${palette.name}" brand palette!`);
  };

  const handleCopyHex = (colorHex: string, label: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(colorHex);
      setCopiedToken(label);
      setTimeout(() => setCopiedToken(null), 1500);
      toast.success(`Copied ${label} (${colorHex})`);
    }
  };

  const primaryLum = luminance(theme.primary_color);
  const primaryOnColor = readableOn(theme.primary_color);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header explanation */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 text-xs font-bold text-purple-600 dark:text-purple-400">
                <Palette className="size-3.5" /> White-Label Theming Engine (FR-6 &amp; FR-7)
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Tenant Brand Tokens &amp; Live CSS Scope
            </h2>
            <p className="text-xs text-muted-foreground max-w-2xl">
              Changes here directly override CSS variables (`--color-brand`, `--color-brand-secondary`, `--font-brand`, `--radius`) on your public Deal Book profile without requiring a rebuild.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                onChange({ ...DEFAULT_WHITE_LABEL });
                toast.info("Reset brand theme to default AI UNIPOD styling.");
              }}
              className="text-xs rounded-xl h-9 gap-1.5"
            >
              <RotateCcw className="size-3.5" /> Reset Theme
            </Button>
            {onSave && (
              <Button
                type="button"
                size="sm"
                onClick={onSave}
                className="text-xs rounded-xl h-9 bg-primary text-primary-foreground font-semibold"
              >
                Save Theme Tokens
              </Button>
            )}
          </div>
        </div>

        {/* 1-Click Brand Palettes Strip */}
        <div className="mt-6 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
            Curated Venture Palettes (1-Click Presets)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {PRESET_PALETTES.map((pal) => (
              <button
                key={pal.name}
                type="button"
                onClick={() => handleApplyPalette(pal)}
                className="rounded-2xl border border-border bg-background p-2.5 text-left hover:border-primary/50 transition-all cursor-pointer group hover:shadow-sm"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="size-4 rounded-full shadow-xs" style={{ backgroundColor: pal.primary }} />
                  <div className="size-4 rounded-full shadow-xs" style={{ backgroundColor: pal.secondary }} />
                  <div className="size-4 rounded-full shadow-xs" style={{ backgroundColor: pal.accent }} />
                </div>
                <p className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">
                  {pal.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Color Controls & Live Preview Split */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider">
              Color Tokens &amp; Geometry
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Primary Brand Color */}
              <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground">Primary Brand Color</label>
                  <button
                    type="button"
                    onClick={() => handleCopyHex(theme.primary_color, "Primary")}
                    className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
                  >
                    {copiedToken === "Primary" ? <Check className="size-2.5 text-emerald-600" /> : <Copy className="size-2.5" />}
                    <span>{copiedToken === "Primary" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.primary_color}
                    onChange={(e) => handleColorChange("primary_color", e.target.value)}
                    className="size-9 rounded-xl border border-border cursor-pointer bg-transparent p-0.5 shrink-0"
                  />
                  <input
                    type="text"
                    value={theme.primary_color}
                    onChange={(e) => handleColorChange("primary_color", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-1.5 font-mono text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Applied to primary buttons, hero badges, and active accents. Luminance: {primaryLum.toFixed(2)}.
                </p>
              </div>

              {/* Secondary Brand Color */}
              <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground">Secondary / Dark Base</label>
                  <button
                    type="button"
                    onClick={() => handleCopyHex(theme.secondary_color, "Secondary")}
                    className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
                  >
                    {copiedToken === "Secondary" ? <Check className="size-2.5 text-emerald-600" /> : <Copy className="size-2.5" />}
                    <span>{copiedToken === "Secondary" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.secondary_color}
                    onChange={(e) => handleColorChange("secondary_color", e.target.value)}
                    className="size-9 rounded-xl border border-border cursor-pointer bg-transparent p-0.5 shrink-0"
                  />
                  <input
                    type="text"
                    value={theme.secondary_color}
                    onChange={(e) => handleColorChange("secondary_color", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-1.5 font-mono text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Used for investment banner backgrounds and dark surfaces.
                </p>
              </div>

              {/* Accent Color */}
              <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground">Accent Highlight</label>
                  <button
                    type="button"
                    onClick={() => handleCopyHex(theme.accent_color || "#F5C518", "Accent")}
                    className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
                  >
                    {copiedToken === "Accent" ? <Check className="size-2.5 text-emerald-600" /> : <Copy className="size-2.5" />}
                    <span>{copiedToken === "Accent" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.accent_color || "#F5C518"}
                    onChange={(e) => handleColorChange("accent_color", e.target.value)}
                    className="size-9 rounded-xl border border-border cursor-pointer bg-transparent p-0.5 shrink-0"
                  />
                  <input
                    type="text"
                    value={theme.accent_color || "#F5C518"}
                    onChange={(e) => handleColorChange("accent_color", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-1.5 font-mono text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Highlights capital ask numbers and progress bars.
                </p>
              </div>

              {/* Surface Color */}
              <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-2">
                <label className="text-xs font-bold text-foreground">Card Surface Tint</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.surface_color || "#FFFFFF"}
                    onChange={(e) => handleColorChange("surface_color", e.target.value)}
                    className="size-9 rounded-xl border border-border cursor-pointer bg-transparent p-0.5 shrink-0"
                  />
                  <input
                    type="text"
                    value={theme.surface_color || "#FFFFFF"}
                    onChange={(e) => handleColorChange("surface_color", e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-1.5 font-mono text-xs text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Subtle card background tint for section modules.
                </p>
              </div>
            </div>

            {/* Geometry & Typography Tokens */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div>
                <label className="text-xs font-semibold text-foreground">Corner Radius Geometry</label>
                <select
                  value={theme.radius || "0.75rem"}
                  onChange={(e) => handleColorChange("radius", e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                >
                  {RADIUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Layout Architecture</label>
                <select
                  value={theme.layout || "classic"}
                  onChange={(e) => handleColorChange("layout", e.target.value as any)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                >
                  <option value="classic">Classic Institutional Grid (Default)</option>
                  <option value="editorial">Editorial Narrative Flow</option>
                  <option value="showcase">High-Density Deal Showcase</option>
                </select>
              </div>
            </div>
          </div>

          {/* Live Preview Column (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Eye className="size-3.5 text-primary" /> Live Public Profile Simulation
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">WCAG 2.1 AAA</span>
            </div>

            {/* Preview Card styled with tenant's dynamic tokens */}
            <div
              className="rounded-3xl border p-6 transition-all duration-300 shadow-md space-y-4"
              style={{
                borderRadius: theme.radius || "0.75rem",
                backgroundColor: theme.surface_color || "#FFFFFF",
                borderColor: `${theme.primary_color}30`,
                color: theme.text_color || "#0B1220",
              }}
            >
              {/* Badges */}
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 text-[11px] font-bold shadow-2xs"
                  style={{
                    backgroundColor: theme.primary_color,
                    color: primaryOnColor,
                    borderRadius: theme.radius || "0.75rem",
                  }}
                >
                  Health AI
                </span>
                <span
                  className="px-2 py-0.5 text-[11px] font-bold border"
                  style={{
                    color: theme.primary_color,
                    borderColor: `${theme.primary_color}40`,
                    backgroundColor: `${theme.primary_color}10`,
                    borderRadius: theme.radius || "0.75rem",
                  }}
                >
                  Cohort 3 · EAII Living Lab
                </span>
              </div>

              {/* Startup Title */}
              <div>
                <h4 className="text-xl font-bold tracking-tight" style={{ color: theme.text_color || "#0B1220" }}>
                  {startupName}
                </h4>
                <p className="text-xs font-semibold mt-0.5" style={{ color: theme.primary_color }}>
                  Offline-first clinical AI triage for rural health posts
                </p>
                <p className="text-[11px] opacity-80 mt-2 leading-relaxed">
                  Demonstrates how cards, primary buttons, badges, and background tints adjust in real-time according to your brand identity.
                </p>
              </div>

              {/* Themed Simulated Metric Card */}
              <div
                className="p-3 border space-y-1"
                style={{
                  borderRadius: theme.radius || "0.75rem",
                  borderColor: `${theme.primary_color}25`,
                  backgroundColor: `${theme.primary_color}08`,
                }}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Empirical Accuracy</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-bold" style={{ color: theme.primary_color }}>
                    94.6% AUC-ROC
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600">+16.4% over baseline</span>
                </div>
              </div>

              {/* Simulated Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  className="flex-1 py-2 px-3 text-xs font-bold transition-all shadow-xs cursor-pointer"
                  style={{
                    backgroundColor: theme.primary_color,
                    color: primaryOnColor,
                    borderRadius: theme.radius || "0.75rem",
                  }}
                >
                  Request Diligence
                </button>
                <button
                  type="button"
                  className="py-2 px-3 text-xs font-semibold border transition-all cursor-pointer"
                  style={{
                    borderColor: `${theme.primary_color}40`,
                    color: theme.text_color || "#0B1220",
                    borderRadius: theme.radius || "0.75rem",
                  }}
                >
                  Copy Memo
                </button>
              </div>

              {/* Dark Investment Card Simulation */}
              <div
                className="p-4 text-white space-y-2 mt-3"
                style={{
                  backgroundColor: theme.secondary_color || "#111827",
                  borderRadius: theme.radius || "0.75rem",
                }}
              >
                <span
                  className="px-2 py-0.5 text-[10px] font-bold rounded"
                  style={{
                    backgroundColor: `${theme.accent_color || "#F5C518"}30`,
                    color: theme.accent_color || "#F5C518",
                  }}
                >
                  Investment Ask
                </span>
                <p className="text-lg font-bold">
                  $750,000 <span className="text-xs font-normal opacity-80">Seed Round</span>
                </p>
                <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "65%",
                      backgroundColor: theme.accent_color || "#F5C518",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
