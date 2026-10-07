import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Menu,
  Shield,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { resolveTheme, themeToCssVars, type WhiteLabelSettings } from "@/lib/white-label";

export type NavItem = {
  label: string;
  href: string;
  category?: string;
  badge?: string;
};

type Props = {
  theme?: Partial<WhiteLabelSettings> | null;
  /** Startup display name, used for the wordmark fallback. */
  name: string;
  legalName?: string;
  logoUrl?: string;
  cohort?: string;
  sector?: string;
  askAmount?: string;
  onRequestDiligence?: () => void;
  nav?: NavItem[];
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
};

/**
 * Applies a tenant's white-label configuration to everything it wraps.
 * Includes a responsive, sticky investor-grade header with section tracking,
 * quick-jump dropdown, horizontal scrollable pills, and mobile drawer.
 */
export function DynamicStartupLayout({
  theme,
  name,
  legalName,
  logoUrl,
  cohort,
  sector,
  askAmount,
  onRequestDiligence,
  nav = [],
  footer,
  className,
  children,
}: Props) {
  const resolved = resolveTheme(theme);
  const logo = logoUrl ?? resolved.logo_url;

  const [activeSection, setActiveSection] = useState<string>(nav[0]?.href || "#overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active section scroll tracking
  useEffect(() => {
    if (!nav.length) return;

    const handleScroll = () => {
      const sectionElements = nav
        .map((item) => {
          const id = item.href.replace("#", "");
          return document.getElementById(id);
        })
        .filter(Boolean) as HTMLElement[];

      const scrollPosition = window.scrollY + 160; // offset for sticky headers

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.offsetTop <= scrollPosition) {
          setActiveSection(`#${section.id}`);
          return;
        }
      }
      setActiveSection(nav[0].href);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nav]);

  return (
    <div
      data-layout={resolved.layout}
      style={themeToCssVars(resolved)}
      className={cn(
        "min-h-screen w-full max-w-full overflow-x-hidden bg-brand-surface font-brand text-brand-text antialiased",
        className,
      )}
    >
      {/* 2-TIER STICKY INVESTOR HEADER */}
      <header className="sticky top-0 z-40 w-full max-w-full border-b border-brand-primary/15 bg-brand-surface/90 backdrop-blur-md transition-all">
        {/* Tier 1: Main Brand, Navigation Pillars & Investor Actions */}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          {/* Left: Back to Hub + Startup Identity */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <Link
              to="/startups"
              className="inline-flex items-center gap-1 rounded-brand border border-brand-primary/20 bg-brand-primary/5 px-2.5 py-1 text-xs font-semibold text-brand-primary hover:bg-brand-primary/15 transition-all shrink-0 cursor-pointer"
              title="Return to Startups Directory"
            >
              <ArrowLeft className="size-3.5" />
              <span className="hidden sm:inline">Startups</span>
            </Link>

            <span className="h-4 w-px bg-brand-primary/20 shrink-0" aria-hidden="true" />

            <a href="#overview" className="flex items-center gap-2 min-w-0 group" title={legalName || name}>
              {logo ? (
                <img src={logo} alt={`${name} logo`} className="h-7 w-auto object-contain shrink-0" />
              ) : (
                <span
                  className="grid size-7 place-items-center rounded-brand bg-brand-primary text-xs font-bold text-brand-primary-foreground shadow-2xs shrink-0"
                  aria-hidden="true"
                >
                  {name.slice(0, 1)}
                </span>
              )}
              <div className="flex items-baseline gap-2 min-w-0 truncate">
                <span className="font-brand-heading text-base font-bold tracking-tight text-brand-text group-hover:text-brand-primary transition-colors truncate">
                  {name}
                </span>
                {sector && (
                  <span className="hidden md:inline-block rounded-brand bg-brand-primary/10 px-2 py-0.5 text-[10px] font-bold text-brand-primary shrink-0">
                    {sector}
                  </span>
                )}
                {cohort && (
                  <span className="hidden lg:inline-block text-[11px] font-medium text-brand-text/60 shrink-0">
                    {cohort}
                  </span>
                )}
              </div>
            </a>
          </div>

          {/* Center (Desktop): Curated Core Pillars + Sections Dropdown */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs">
            <a
              href="#overview"
              className={cn(
                "rounded-brand px-2.5 py-1.5 font-semibold transition-all",
                activeSection === "#overview" || activeSection === "#deal-memo"
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-brand-text/75 hover:text-brand-primary hover:bg-brand-primary/5"
              )}
            >
              Overview
            </a>
            <a
              href="#problem"
              className={cn(
                "rounded-brand px-2.5 py-1.5 font-semibold transition-all",
                activeSection === "#problem"
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-brand-text/75 hover:text-brand-primary hover:bg-brand-primary/5"
              )}
            >
              Problem
            </a>
            <a
              href="#ai-tech"
              className={cn(
                "rounded-brand px-2.5 py-1.5 font-semibold transition-all",
                activeSection === "#ai-tech" || activeSection === "#ai-performance" || activeSection === "#moats"
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-brand-text/75 hover:text-brand-primary hover:bg-brand-primary/5"
              )}
            >
              AI &amp; Data
            </a>
            <a
              href="#products"
              className={cn(
                "rounded-brand px-2.5 py-1.5 font-semibold transition-all",
                activeSection === "#products" || activeSection === "#market-sizing" || activeSection === "#business-model"
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-brand-text/75 hover:text-brand-primary hover:bg-brand-primary/5"
              )}
            >
              Offerings
            </a>
            <a
              href="#traction"
              className={cn(
                "rounded-brand px-2.5 py-1.5 font-semibold transition-all",
                activeSection === "#traction"
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-brand-text/75 hover:text-brand-primary hover:bg-brand-primary/5"
              )}
            >
              Traction
            </a>
            <a
              href="#financial-projections"
              className={cn(
                "rounded-brand px-2.5 py-1.5 font-semibold transition-all",
                activeSection === "#financial-projections" || activeSection === "#growth-roadmap"
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-brand-text/75 hover:text-brand-primary hover:bg-brand-primary/5"
              )}
            >
              Financials
            </a>

            {/* Quick-Jump Dropdown Menu for all 17 Sections */}
            {nav.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 rounded-brand px-2 py-1.5 font-semibold text-brand-text/70 hover:text-brand-primary hover:bg-brand-primary/5 transition-all cursor-pointer">
                    <span>Sections</span>
                    <ChevronDown className="size-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-brand border-brand-primary/20 bg-brand-surface p-1.5 shadow-xl max-h-80 overflow-y-auto">
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-text/50">
                    All Deal Book Sections
                  </div>
                  {nav.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <a
                        href={item.href}
                        className="flex items-center justify-between px-2 py-1.5 text-xs rounded-brand hover:bg-brand-primary/10 hover:text-brand-primary cursor-pointer"
                      >
                        <span className="truncate">{item.label}</span>
                        {activeSection === item.href && (
                          <span className="size-1.5 rounded-full bg-brand-primary shrink-0 ml-1.5" />
                        )}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Right: Actions & Mobile Hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            {onRequestDiligence && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRequestDiligence}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-brand border-brand-primary/25 bg-brand-primary/5 text-brand-primary text-xs font-bold hover:bg-brand-primary/15 h-8 px-3 cursor-pointer shadow-2xs"
              >
                <Shield className="size-3.5" />
                <span className="hidden md:inline">Diligence Room</span>
                <span className="md:hidden">Diligence</span>
              </Button>
            )}

            <Button
              asChild
              size="sm"
              className="rounded-brand bg-brand-primary text-brand-primary-foreground text-xs font-bold h-8 px-3.5 hover:opacity-90 shadow-2xs cursor-pointer"
            >
              <a href="#invest" className="inline-flex items-center gap-1.5">
                <Wallet className="size-3.5" />
                <span>{askAmount ? `Invest ${askAmount}` : "Invest"}</span>
              </a>
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden grid size-8 place-items-center rounded-brand border border-brand-primary/20 bg-brand-surface text-brand-text hover:bg-brand-primary/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {/* Tier 2: Horizontal Scrollable Section Pills Strip (All 17 Sections) */}
        {nav.length > 0 && (
          <div className="relative w-full max-w-full overflow-hidden border-t border-brand-primary/10 bg-brand-surface/75 px-4 sm:px-6">
            <div className="mx-auto max-w-7xl w-full min-w-0">
              <nav
                className="flex items-center gap-1.5 overflow-x-auto py-2 scroll-smooth w-full no-scrollbar overscroll-x-contain"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                aria-label="Section shortcuts"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text/50 mr-1 hidden sm:inline shrink-0">
                  Jump To:
                </span>
                {nav.map((item) => {
                  const isActive = activeSection === item.href;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap transition-all shrink-0",
                        isActive
                          ? "bg-brand-primary text-brand-primary-foreground shadow-2xs font-bold"
                          : "text-brand-text/70 hover:text-brand-primary hover:bg-brand-primary/10"
                      )}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Mobile Slide-Down Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-brand-primary/15 bg-brand-surface p-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-brand-primary/10 text-xs">
              <span className="font-bold text-brand-text">{name} · Deal Book Menu</span>
              <Link
                to="/startups"
                className="text-brand-primary font-semibold hover:underline inline-flex items-center gap-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ArrowLeft className="size-3" /> Directory
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 py-3 text-xs max-h-[55vh] overflow-y-auto">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-brand transition-colors text-xs font-medium",
                    activeSection === item.href
                      ? "bg-brand-primary/15 text-brand-primary font-bold"
                      : "text-brand-text/80 hover:bg-brand-primary/10 hover:text-brand-primary"
                  )}
                >
                  <span className="truncate">{item.label}</span>
                  {activeSection === item.href && <Check className="size-3 text-brand-primary shrink-0 ml-1" />}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-brand-primary/10 flex flex-col gap-2">
              {onRequestDiligence && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onRequestDiligence();
                  }}
                  className="w-full text-xs h-9 rounded-brand border-brand-primary/25 text-brand-primary font-bold cursor-pointer"
                >
                  <Shield className="size-3.5 mr-1.5" /> Request Deal Room Diligence
                </Button>
              )}
              <Button
                asChild
                size="sm"
                className="w-full text-xs h-9 rounded-brand bg-brand-primary text-brand-primary-foreground font-bold cursor-pointer"
              >
                <a href="#invest" onClick={() => setMobileMenuOpen(false)}>
                  <Wallet className="size-3.5 mr-1.5" /> View Investment Terms ({askAmount || "Details"})
                </a>
              </Button>
            </div>
          </div>
        )}
      </header>

      <main id="top" className="w-full max-w-full overflow-x-hidden">{children}</main>

      <footer className="mt-24 w-full max-w-full overflow-x-hidden border-t border-brand-primary/15 bg-brand-secondary text-brand-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 text-sm">
          {footer ?? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">{name}</p>
                <p className="text-xs opacity-75 mt-0.5">
                  Incubated at AI UNIPOD Ethiopia (EAII Living Lab) · UNDP timbuktoo Initiative
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs opacity-80">
                <Link to="/startups" className="hover:underline">Startups Directory</Link>
                <span>·</span>
                <Link to="/cohort-3" className="hover:underline">Cohort 3</Link>
                <span>·</span>
                <Link to="/investor" className="hover:underline font-semibold">Investor Portal</Link>
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
