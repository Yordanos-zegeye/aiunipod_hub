import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ExternalLink } from "lucide-react";

import { JOB_OPENINGS } from "@/data/jobs";

export function LandingFooter() {
  const partnerLogos = [
    {
      name: "Ethiopian Artificial Intelligence Institute",
      short: "EAII",
      role: "Host Institute & Sovereign AI Research",
      logo: "/partners/eaii-logo.webp",
      fallbackLogo: "/partners/eaii-logo.png",
      url: "https://aii.et/",
    },
    {
      name: "Addis Ababa University",
      short: "AAU",
      role: "Host University, Talent & Academic Labs",
      logo: "/partners/aau-logo.webp",
      fallbackLogo: "/partners/aau-logo.png",
      url: "http://www.aau.edu.et/",
    },
    {
      name: "UNDP · timbuktoo",
      short: "timbuktoo",
      role: "Pan-African Innovation Initiative",
      logo: "/partners/undp-logo.webp",
      fallbackLogo: "/partners/undp-logo.png",
      url: "https://www.undp.org/africa/projects/timbuktoo",
    },
  ];

  return (
    <footer className="border-t border-on-ink/15 bg-ink text-on-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        {/* 1. Main Navigation Columns */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Col 1: Brand & Overview */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block">
              <img
                src="/aiunipod-logo.webp"
                alt="AI UniPod powered by timbuktoo"
                loading="lazy"
                decoding="async"
                width="160"
                height="40"
                className="h-10 w-auto rounded-lg bg-white/95 p-1.5 shadow-sm object-contain"
              />
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-on-ink/65 sm:text-sm">
              AI UNIPOD Ethiopia is a national center of excellence and living lab powered by the{" "}
              <strong>timbuktoo</strong> initiative, in partnership with the Ethiopian Artificial Intelligence Institute (EAII)
              and Addis Ababa University (AAU).
            </p>
          </div>

          {/* Col 2: Hub Capabilities */}
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-wider text-brand-blue">The Hub</p>
            <ul className="mt-4 space-y-2.5 text-xs text-on-ink/70 sm:text-sm">
              <li>
                <a href="/#mission" className="transition-colors hover:text-on-ink">
                  Mission & Mandate
                </a>
              </li>
              <li>
                <a href="/#pillars" className="transition-colors hover:text-on-ink">
                  Compute Infrastructure
                </a>
              </li>
              <li>
                <a href="/#impact" className="transition-colors hover:text-on-ink">
                  Ecosystem Impact
                </a>
              </li>
              <li>
                <a href="/#faq" className="transition-colors hover:text-on-ink">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Platform Access */}
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-wider text-brand-blue">Startups & Jobs</p>
            <ul className="mt-4 space-y-2.5 text-xs text-on-ink/70 sm:text-sm">
              <li>
                <Link to="/startups" className="font-medium text-brand-blue transition-colors hover:underline">
                  Startups Directory →
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="font-medium text-brand-blue transition-colors hover:underline">
                  Jobs & Fellowships ({JOB_OPENINGS.length}) →
                </Link>
              </li>
              <li>
                <Link to="/cohort-3" className="transition-colors hover:text-on-ink">
                  Apply for Cohort 3
                </Link>
              </li>
              <li>
                <Link to="/login" className="transition-colors hover:text-on-ink">
                  Startup Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Governance & Partners */}
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-wider text-brand-blue">Governance</p>
            <ul className="mt-4 space-y-2.5 text-xs text-on-ink/70 sm:text-sm">
              <li>
                <a
                  href="https://aii.et/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-on-ink"
                >
                  EAII Ethiopia <ExternalLink className="size-3" />
                </a>
              </li>
              <li>
                <a
                  href="http://www.aau.edu.et/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-on-ink"
                >
                  Addis Ababa University <ExternalLink className="size-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.timbuktoo.africa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-on-ink"
                >
                  timbuktoo Africa <ExternalLink className="size-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 2. Bottom Legal & Partner Logos Bar */}
        <div className="mt-14 flex flex-col justify-between gap-8 border-t border-on-ink/10 pt-8 sm:flex-row sm:items-end">
          {/* Left: Copyright & Quick Links */}
          <div className="space-y-3 text-xs text-on-ink/50">
            <p>© {new Date().getFullYear()} AI UNIPOD Ethiopia · Powered by timbuktoo initiative. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/startups" className="hover:text-on-ink transition-colors">
                Startups Directory
              </Link>
              <span>·</span>
              <Link to="/cohort-3" className="hover:text-on-ink transition-colors">
                Cohort 3 Applications
              </Link>
              <span>·</span>
              <Link to="/login" className="hover:text-on-ink transition-colors">
                Startup Sign In
              </Link>
              <span>·</span>
              <span className="text-on-ink/40">Privacy & Terms</span>
            </div>
          </div>

          {/* Right: Partner Logos positioned in Bottom Right Corner */}
          <div className="flex flex-col items-start sm:items-end gap-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-on-ink/50">
              Joint Initiative Partners
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {partnerLogos.map((partner) => (
                <a
                  key={partner.short}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${partner.name} (${partner.role})`}
                  aria-label={`${partner.name} (${partner.role})`}
                  className="group flex items-center gap-2 rounded-xl  px-2.5 py-1.5 transition-all duration-200 hover:border-brand-blue/40 hover:bg-on-ink/10"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    decoding="async"
                    width="32"
                    height="32"
                    onError={(e) => {
                      if (partner.fallbackLogo && e.currentTarget.src !== partner.fallbackLogo) {
                        e.currentTarget.src = partner.fallbackLogo;
                      }
                    }}
                    className="size-7 object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
