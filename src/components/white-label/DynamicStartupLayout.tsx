import type { ReactNode } from "react";

import { themeToCssVars, resolveTheme, type WhiteLabelSettings } from "@/lib/white-label";
import { cn } from "@/lib/utils";

type Props = {
  theme?: Partial<WhiteLabelSettings> | null;
  /** Startup display name, used for the wordmark fallback. */
  name: string;
  logoUrl?: string;
  nav?: { label: string; href: string }[];
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
};

/**
 * Applies a tenant's white-label configuration to everything it wraps.
 *
 * The theme is injected as scoped CSS custom properties, so the same component
 * powers both the public `/[startup-slug]` page and the live preview pane in
 * the portal theme builder — pass in-progress form state and it re-renders.
 */
export function DynamicStartupLayout({
  theme,
  name,
  logoUrl,
  nav = [],
  footer,
  className,
  children,
}: Props) {
  const resolved = resolveTheme(theme);
  const logo = logoUrl ?? resolved.logo_url;

  return (
    <div
      data-layout={resolved.layout}
      style={themeToCssVars(resolved)}
      className={cn(
        "min-h-screen bg-brand-surface font-brand text-brand-text antialiased",
        className,
      )}
    >
      <header className="sticky top-0 z-30 border-b border-brand-primary/15 bg-brand-surface/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            {logo ? (
              <img src={logo} alt={`${name} logo`} className="h-9 w-auto object-contain" />
            ) : (
              <span
                className="grid h-9 w-9 place-items-center rounded-brand bg-brand-primary text-sm font-bold text-brand-primary-foreground"
                aria-hidden="true"
              >
                {name.slice(0, 1)}
              </span>
            )}
            <span className="font-brand-heading text-lg font-semibold tracking-tight">{name}</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-brand-text/70 transition-colors hover:text-brand-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#invest"
            className="rounded-brand bg-brand-primary px-4 py-2 text-sm font-medium text-brand-primary-foreground transition-opacity hover:opacity-90"
          >
            Invest
          </a>
        </div>
      </header>

      <main id="top">{children}</main>

      <footer className="mt-24 border-t border-brand-primary/15 bg-brand-secondary text-brand-secondary-foreground">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm">
          {footer ?? (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p>
                {name} — hosted at AI UNIPOD Ethiopia, a UNDP timbuktoo initiative.
              </p>
              <p className="opacity-70">© {new Date().getFullYear()} {name}</p>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
