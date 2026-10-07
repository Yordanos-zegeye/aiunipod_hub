import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Building,
  Check,
  ChevronDown,
  Globe,
  Layers,
  LogOut,
  Menu,
  Rocket,
  Shield,
  Sparkles,
  User,
  UserCheck,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAuth, DEMO_USERS } from "@/lib/auth";
import { getRoleBadgeClass, getRoleDashboardUrl, getRoleLabel } from "@/lib/rbac";

export function LandingHeader() {
  const { user, isAuthenticated, logout, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 15;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "Startups", href: "/startups" },
    { label: "Jobs", href: "/jobs" },
    { label: "Mission", href: "/#mission" },
    { label: "Pillars", href: "/#pillars" },
    { label: "Cohort 3", href: "/cohort-3" },
    { label: "Investors", href: "/investor" },
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    toast.success("Signed out successfully");
    navigate({ to: "/" });
  };

  const handleSwitchRole = (demoKey: keyof typeof DEMO_USERS) => {
    switchDemoRole(demoKey);
    const demo = DEMO_USERS[demoKey];
    if (!demo) return;
    toast.success(`Switched active view to ${demo.name} (${getRoleLabel(demo.role)})`);
    setUserDropdownOpen(false);
    if (demo.role === "SUPER_ADMIN") {
      navigate({ to: "/admin" });
    } else if (demo.role === "STARTUP_ADMIN" || demo.role === "STARTUP_EDITOR") {
      navigate({ to: "/portal" });
    } else if (demo.role === "INVESTOR") {
      navigate({ to: "/investor" });
    }
  };

  const getDashboardLink = () => {
    if (!user) return "/login";
    return getRoleDashboardUrl(user.role, user.startupSlug);
  };

  const getDashboardActionLabel = () => {
    if (!user) return "Sign In";
    if (user.role === "SUPER_ADMIN") return "Admin Console";
    if (user.role === "STARTUP_ADMIN" || user.role === "STARTUP_EDITOR") return "Founder Portal";
    if (user.role === "INVESTOR") return "Deal Pipeline";
    return "Dashboard";
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 w-full max-w-full overflow-x-hidden py-3 sm:py-3.5 transition-[background-color,border-color,box-shadow] duration-200 ${
        isScrolled
          ? "border-b border-border/80 bg-background/90 shadow-2xs backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Brand Logo */}
        <div className="flex items-center gap-3.5">
          <Link to="/" aria-label="AI UNIPOD Ethiopia home" className="relative z-10 block">
            <motion.img
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              src="/aiunipod-logo.webp"
              alt="AI UniPod powered by timbuktoo"
              width="144"
              height="36"
              decoding="async"
              className="h-8 w-auto sm:h-9 object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation with Hover Indicator */}
        <nav
          className="hidden items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-sm font-medium backdrop-blur-md lg:flex"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {navItems.map((item) => {
            const isHovered = hoveredNav === item.href;
            const isInternal = item.href.startsWith("/") && !item.href.includes("#");

            return isInternal ? (
              <Link
                key={item.href}
                to={item.href as any}
                onMouseEnter={() => setHoveredNav(item.href)}
                className="relative rounded-full px-3.5 py-1 text-foreground/80 transition-colors hover:text-foreground"
              >
                {isHovered && (
                  <motion.span
                    layoutId="navHoverPill"
                    className="absolute inset-0 rounded-full bg-accent/80 -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredNav(item.href)}
                className="relative rounded-full px-3.5 py-1 text-foreground/80 transition-colors hover:text-foreground"
              >
                {isHovered && (
                  <motion.span
                    layoutId="navHoverPill"
                    className="absolute inset-0 rounded-full bg-accent/80 -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop Actions & Authentication State */}
        <div className="hidden items-center gap-3 sm:flex">
          {isAuthenticated && user ? (
            <div className="relative flex items-center gap-2" ref={dropdownRef}>
              {/* Role-specific Dashboard Direct Link */}
              <Button asChild size="sm" className="h-9 rounded-full px-4 text-xs font-semibold shadow-xs">
                <Link to={getDashboardLink() as any}>
                  {getDashboardActionLabel()} <ArrowUpRight className="ml-1 size-3.5" />
                </Link>
              </Button>

              {/* User Avatar & Dropdown Trigger */}
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-border/80 bg-background/80 p-1.5 pr-2.5 transition-all hover:bg-accent focus:outline-hidden"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="size-7 rounded-full object-cover ring-1 ring-border"
                  />
                ) : (
                  <div className="grid size-7 place-items-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="text-left hidden md:block max-w-[120px]">
                  <p className="text-xs font-semibold text-foreground truncate leading-tight">{user.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate leading-tight">{getRoleLabel(user.role)}</p>
                </div>
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-border bg-card p-4 shadow-xl backdrop-blur-xl"
                  >
                    {/* User Profile Summary */}
                    <div className="border-b border-border pb-3">
                      <p className="font-display text-sm font-bold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      {user.title && <p className="mt-1 text-[11px] text-foreground/80 font-medium">{user.title}</p>}
                      <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${getRoleBadgeClass(user.role)}`}>
                          {getRoleLabel(user.role)}
                        </span>
                        {user.startupName && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                            {user.startupName}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Workspace Direct Links */}
                    <div className="py-2.5 space-y-1 border-b border-border text-xs">
                      {user.role === "SUPER_ADMIN" && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between rounded-xl px-2.5 py-1.5 text-foreground hover:bg-accent font-medium transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <Shield className="size-3.5 text-purple-600" /> Admin Console
                          </span>
                          <ArrowUpRight className="size-3 text-muted-foreground" />
                        </Link>
                      )}

                      {(user.role === "STARTUP_ADMIN" || user.role === "STARTUP_EDITOR") && (
                        <Link
                          to="/portal"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between rounded-xl px-2.5 py-1.5 text-foreground hover:bg-accent font-medium transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <Rocket className="size-3.5 text-blue-600" /> Founder Portal
                          </span>
                          <ArrowUpRight className="size-3 text-muted-foreground" />
                        </Link>
                      )}

                      {user.role === "INVESTOR" && (
                        <Link
                          to="/investor"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center justify-between rounded-xl px-2.5 py-1.5 text-foreground hover:bg-accent font-medium transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <Wallet className="size-3.5 text-amber-600" /> Deal Pipeline
                          </span>
                          <ArrowUpRight className="size-3 text-muted-foreground" />
                        </Link>
                      )}
                    </div>

                    {/* Quick Demo Persona Switcher */}
                    <div className="py-2.5 border-b border-border">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Switch Persona (Testing)
                      </p>
                      <div className="space-y-1 text-xs">
                        <button
                          type="button"
                          onClick={() => handleSwitchRole("super_admin")}
                          className="w-full text-left rounded-lg px-2 py-1 text-[11px] hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-between"
                        >
                          <span>Super Admin (admin@admin.com)</span>
                          {user.role === "SUPER_ADMIN" && <Check className="size-3 text-primary" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSwitchRole("startup_admin")}
                          className="w-full text-left rounded-lg px-2 py-1 text-[11px] hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-between"
                        >
                          <span>Startup Founder (founder@founder.com)</span>
                          {user.role === "STARTUP_ADMIN" && <Check className="size-3 text-primary" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSwitchRole("investor_vetted")}
                          className="w-full text-left rounded-lg px-2 py-1 text-[11px] hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-between"
                        >
                          <span>Vetted Investor (investor@investor.com)</span>
                          {user.role === "INVESTOR" && <Check className="size-3 text-primary" />}
                        </button>
                      </div>
                    </div>

                    {/* Sign Out Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut className="size-3.5" /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="hidden text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground md:inline-flex"
                >
                  <Link to="/cohort-3">
                    <Sparkles className="mr-1.5 size-3.5 text-amber-500" />
                    Apply Cohort 3
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
                <Button asChild className="h-9 rounded-full px-5 text-sm shadow-sm">
                  <Link to="/login">
                    Sign In <ArrowUpRight className="ml-1 size-3.5" />
                  </Link>
                </Button>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          {!isAuthenticated && (
            <Button asChild size="sm" className="h-8 rounded-full px-3 text-xs sm:hidden">
              <Link to="/login">Sign In</Link>
            </Button>
          )}
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground transition-colors hover:bg-accent"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 60px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[56px] z-40 flex flex-col justify-between overflow-y-auto border-t border-border bg-background/95 px-6 py-8 backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-6">
              {/* Authenticated User Status or Ecosystem Badge */}
              <div className="border-b border-border/60 pb-4">
                {isAuthenticated && user ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display font-bold text-foreground text-sm">{user.name}</p>
                      <p className="text-xs text-primary font-semibold">{getRoleLabel(user.role)}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="rounded-xl text-xs h-8"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-medium text-muted-foreground">Active Incubation Hub</span>
                    </div>
                    <span className="text-xs font-semibold text-primary">Powered by timbuktoo</span>
                  </div>
                )}
              </div>

              {/* Navigation Links */}
              <motion.nav
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
                  closed: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
                }}
                className="flex flex-col space-y-4"
              >
                {navItems.map((item) => {
                  const isInternal = item.href.startsWith("/") && !item.href.includes("#");
                  return isInternal ? (
                    <motion.div
                      key={item.href}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: -16 },
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    >
                      <Link
                        to={item.href as any}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between py-2 font-display text-2xl font-semibold text-foreground transition-colors hover:text-primary"
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight className="size-5 text-muted-foreground" />
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.a
                      key={item.href}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: -16 },
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-2 font-display text-2xl font-semibold text-foreground transition-colors hover:text-primary"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="size-5 text-muted-foreground" />
                    </motion.a>
                  );
                })}

                {/* Direct Dashboard link in mobile nav if logged in */}
                {isAuthenticated && user && (
                  <div className="pt-2 border-t border-border">
                    <Link
                      to={getDashboardLink() as any}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-2 font-display text-xl font-bold text-primary"
                    >
                      <span>Open {getDashboardActionLabel()}</span>
                      <ArrowUpRight className="size-5" />
                    </Link>
                  </div>
                )}
              </motion.nav>
            </div>

            <div className="mt-8 space-y-3 border-t border-border/60 pt-6">
              {!isAuthenticated ? (
                <>
                  <Button asChild size="lg" className="h-12 w-full rounded-xl text-base font-semibold">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      Sign In to Platform <ArrowUpRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 w-full rounded-xl border-border bg-secondary/50 text-base"
                  >
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      Join as Investor (FR-15)
                    </Link>
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full rounded-xl h-11 text-xs text-destructive border-destructive/30"
                >
                  <LogOut className="size-4 mr-2" /> Sign Out
                </Button>
              )}
              <p className="pt-2 text-center text-xs text-muted-foreground">
                Powered by timbuktoo initiative · EAII · AAU
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}