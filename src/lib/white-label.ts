/**
 * White-label theming engine.
 *
 * A startup's `White_Label_Settings` object is fetched at runtime and turned
 * into CSS custom properties. Those properties are registered as Tailwind
 * tokens in `src/styles.css` (`--color-brand`, `--color-brand-secondary`,
 * `--font-brand`, ...), so utilities like `bg-brand` / `font-brand` re-render
 * with the tenant's identity without any rebuild.
 */

export type WhiteLabelSettings = {
  primary_color: string;
  secondary_color: string;
  accent_color?: string;
  surface_color?: string;
  text_color?: string;
  logo_url?: string;
  font_family?: string;
  heading_font_family?: string;
  radius?: string;
  layout?: "classic" | "editorial" | "showcase";
  brand_font?: string;
  brand_heading_font?: string;
  brand_radius?: string;
};

export const DEFAULT_WHITE_LABEL: WhiteLabelSettings = {
  primary_color: "#0468B1",
  secondary_color: "#111827",
  accent_color: "#F5C518",
  surface_color: "#FFFFFF",
  text_color: "#0B1220",
  font_family: "system-ui, sans-serif",
  heading_font_family: "system-ui, sans-serif",
  radius: "0.75rem",
  layout: "classic",
};

/** Accepts #rgb / #rrggbb and returns [r, g, b] in 0-255, or null. */
function parseHex(hex: string): [number, number, number] | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  let h = m[1] ?? "";
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

/** Relative luminance (WCAG) — used to pick readable foreground colors. */
export function luminance(hex: string): number {
  const rgb = parseHex(hex);
  if (!rgb) return 0;
  const [r, g, b] = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Readable on-color for any brand hex. */
export function readableOn(hex: string): string {
  return luminance(hex) > 0.42 ? "#0B1220" : "#FFFFFF";
}

/** `#0468B1` -> `4 104 177`, so alpha utilities can use `rgb(var(--x) / 12%)`. */
export function toRgbChannels(hex: string): string {
  const rgb = parseHex(hex);
  return rgb ? rgb.join(" ") : "0 0 0";
}

export function isValidHex(hex: string): boolean {
  return parseHex(hex) !== null;
}

/** Merge partial settings from the API over safe defaults. */
export function resolveTheme(
  settings?: Partial<WhiteLabelSettings> | null,
): WhiteLabelSettings {
  const merged = { ...DEFAULT_WHITE_LABEL, ...(settings ?? {}) };
  if (!isValidHex(merged.primary_color)) {
    merged.primary_color = DEFAULT_WHITE_LABEL.primary_color;
  }
  if (!isValidHex(merged.secondary_color)) {
    merged.secondary_color = DEFAULT_WHITE_LABEL.secondary_color;
  }
  return merged;
}

/**
 * Build the inline CSS-variable style object for a themed subtree.
 * Applied to a wrapper element, it scopes the tenant theme to its children,
 * which is what makes the live preview pane in the theme builder work.
 */
export function themeToCssVars(
  settings?: Partial<WhiteLabelSettings> | null,
): React.CSSProperties {
  const t = resolveTheme(settings);
  const accent = t.accent_color && isValidHex(t.accent_color) ? t.accent_color : t.secondary_color;

  return {
    "--brand-primary": t.primary_color,
    "--brand-primary-rgb": toRgbChannels(t.primary_color),
    "--brand-primary-foreground": readableOn(t.primary_color),
    "--brand-secondary": t.secondary_color,
    "--brand-secondary-rgb": toRgbChannels(t.secondary_color),
    "--brand-secondary-foreground": readableOn(t.secondary_color),
    "--brand-accent": accent,
    "--brand-accent-foreground": readableOn(accent),
    "--brand-surface": t.surface_color ?? "#FFFFFF",
    "--brand-text": t.text_color ?? "#0B1220",
    "--brand-font": t.font_family ?? DEFAULT_WHITE_LABEL.font_family!,
    "--brand-heading-font":
      t.heading_font_family ?? t.font_family ?? DEFAULT_WHITE_LABEL.font_family!,
    "--brand-radius": t.radius ?? DEFAULT_WHITE_LABEL.radius!,
  } as React.CSSProperties;
}
