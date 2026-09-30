import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Filter,
  Grid3X3,
  HeartPulse,
  Leaf,
  List,
  MapPin,
  Search,
  Sparkles,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { STARTUPS } from "@/data/startups";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function VentureDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const sectors = ["All", "Health AI", "AgriTech", "Language AI", "Fintech AI", "Climate AI", "Logistics AI", "Vision AI"];

  const filteredStartups = STARTUPS.filter((startup) => {
    const matchesSector = selectedSector === "All" || startup.sector.toLowerCase() === selectedSector.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      startup.name.toLowerCase().includes(query) ||
      startup.tagline.toLowerCase().includes(query) ||
      startup.sector.toLowerCase().includes(query) ||
      startup.description.toLowerCase().includes(query) ||
      startup.products.some((p) => p.name.toLowerCase().includes(query) || p.stage.toLowerCase().includes(query)) ||
      startup.location.toLowerCase().includes(query);

    return matchesSector && matchesSearch;
  });

  return (
    <section id="directory" className="relative border-b border-border bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Header Title & Description */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Ideas in motion.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-start gap-4 sm:items-end"
          >
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-right sm:text-base">
              Explore {STARTUPS.length} vetted, investor-ready ventures currently accelerating within AI UNIPOD Ethiopia with bespoke white-labeled profiles.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button asChild variant="outline" className="rounded-full px-5 text-xs font-semibold shadow-xs">
                <Link to="/startups">
                  Full Startups Directory <ArrowUpRight className="ml-1.5 size-3.5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Filters, Search & View Controls */}
        <div className="mt-12 flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ventures, models, or keywords..."
              className="h-10.5 w-full rounded-full border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sector Filter Chips with Smooth Sliding Motion Layout Pill */}
          <div className="flex flex-wrap items-center gap-2">
            {sectors.map((sector) => {
              const isSelected = selectedSector === sector;
              return (
                <motion.button
                  key={sector}
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedSector(sector)}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    isSelected
                      ? "text-primary-foreground"
                      : "border border-border bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeSectorPill"
                      className="absolute inset-0 rounded-full bg-primary shadow-xs -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{sector}</span>
                </motion.button>
              );
            })}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1.5 self-end rounded-full border border-border bg-muted/40 p-1 lg:self-auto">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={`rounded-full p-2 transition-all duration-120 ${
                viewMode === "grid" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Grid3X3 className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-label="List view"
              className={`rounded-full p-2 transition-all duration-120 ${
                viewMode === "list" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="size-4" />
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing <strong className="text-foreground">{filteredStartups.length}</strong> of {STARTUPS.length} ventures
          </span>
          {selectedSector !== "All" && (
            <span>
              Filtered by: <strong className="text-primary">{selectedSector}</strong>
            </span>
          )}
        </div>

        {/* Grid View with Layout Animation */}
        {viewMode === "grid" && (
          <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filteredStartups.map((startup) => (
                <motion.div
                  key={startup.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="flex"
                >
                  <Link
                    to="/$startupSlug"
                    params={{ startupSlug: startup.slug }}
                    className="group flex w-full flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs transition-shadow hover:border-primary/40 hover:shadow-md"
                    style={{
                      borderTopColor: startup.theme.primary_color,
                      borderTopWidth: "3px",
                    }}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          {startup.sector}
                        </span>
                        <span className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-200 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                          <ArrowUpRight className="size-4" />
                        </span>
                      </div>

                      <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {startup.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-foreground/80">
                        {startup.tagline}
                      </p>
                      <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                        {startup.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {startup.products.map((product) => (
                          <span
                            key={product.name}
                            className="rounded-md border border-border bg-muted/30 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                          >
                            {product.name} · <span className="text-foreground/70">{product.stage}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 border-t border-border/70 pt-4">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Users className="size-3.5" />
                          <span>{startup.team_size} Team</span>
                        </div>
                        <div className="flex items-center gap-1 font-semibold text-foreground">
                          <Wallet className="size-3.5 text-primary" />
                          <span>
                            {currency.format(startup.investment_ask.amount_usd)} ({startup.investment_ask.round})
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* List View with Layout Animation */}
        {viewMode === "list" && (
          <motion.div layout className="mt-8 border-t border-border">
            <AnimatePresence mode="popLayout">
              {filteredStartups.map((startup, index) => (
                <motion.div
                  key={startup.slug}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to="/$startupSlug"
                    params={{ startupSlug: startup.slug }}
                    className="venture-row group !py-5"
                  >
                    <span className="font-display text-xs font-bold text-muted-foreground sm:text-sm">
                      0{index + 1}
                    </span>
                    <span className="venture-icon transition-transform duration-200 group-hover:scale-110">
                      <Sparkles className="size-4" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary sm:text-xl">
                        {startup.name}
                      </h3>
                      <p className="text-xs text-muted-foreground sm:text-sm">{startup.tagline}</p>
                    </div>
                    <div className="hidden text-right lg:block">
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                        {startup.sector}
                      </span>
                      <span className="mt-1 block font-mono text-xs text-muted-foreground">
                        Ask: {currency.format(startup.investment_ask.amount_usd)} ({startup.investment_ask.round})
                      </span>
                    </div>
                    <span className="venture-arrow">
                      <ArrowUpRight />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {filteredStartups.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 rounded-2xl border border-dashed border-border py-16 text-center"
          >
            <Filter className="mx-auto size-8 text-muted-foreground/60" />
            <p className="mt-4 font-display text-lg font-semibold text-foreground">No matching ventures found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search keywords or switching the sector filter to "All".
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedSector("All");
              }}
              className="mt-5 rounded-full"
            >
              Reset Filters
            </Button>
          </motion.div>
        )}

        {/* Directory Explorer Link Footer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/30 p-6"
        >
          <div>
            <h4 className="font-display text-base font-bold text-foreground">
              Looking for a specific stage, round, or product?
            </h4>
            <p className="text-xs text-muted-foreground">
              Access multi-attribute filters, investor table view, and live startup previews in the full directory.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button asChild className="rounded-full px-5 text-xs font-semibold">
              <Link to="/startups">
                Open Full Directory <ArrowUpRight className="ml-1.5 size-3.5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}