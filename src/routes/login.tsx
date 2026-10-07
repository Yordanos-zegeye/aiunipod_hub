import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, Shield, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DEMO_USERS, useAuth } from "@/lib/auth";
import type { UserRole } from "@/lib/rbac";

const TITLE = "Sign in — AI UNIPOD Ethiopia Portal";
const DESCRIPTION =
  "Sign in to the AI UNIPOD portal to manage your startup profile, access the admin console, or review investor pipeline.";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, login, switchDemoRole } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Determine default role based on email if not already mapped
      let requestedRole: UserRole = "GUEST";
      if (email.includes("admin") || email === "admin@admin.com") {
        requestedRole = "SUPER_ADMIN";
      } else if (email.includes("founder") || email === "founder@founder.com") {
        requestedRole = "STARTUP_ADMIN";
      } else if (email.includes("investor") || email.includes("angel") || email === "investor@investor.com") {
        requestedRole = "INVESTOR";
      }

      const signedInUser = await login(email, password, requestedRole);
      toast.success(`Welcome back, ${signedInUser.name}!`);

      // Route to appropriate destination based on role
      if (signedInUser.role === "SUPER_ADMIN") {
        navigate({ to: "/admin" });
      } else if (signedInUser.role === "STARTUP_ADMIN" || signedInUser.role === "STARTUP_EDITOR") {
        navigate({ to: "/portal" });
      } else if (signedInUser.role === "INVESTOR") {
        navigate({ to: "/investor" });
      } else {
        navigate({ to: "/admin" });
      }
    } catch (err) {
      toast.error("Failed to sign in. Please verify your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemo = (demoKey: keyof typeof DEMO_USERS) => {
    const demo = DEMO_USERS[demoKey];
    if (!demo) return;
    switchDemoRole(demoKey);
    toast.success(`Signed in as ${demo.name} (${demo.role})`);
    if (demo.role === "SUPER_ADMIN") {
      navigate({ to: "/admin" });
    } else if (demo.role === "STARTUP_ADMIN" || demo.role === "STARTUP_EDITOR") {
      navigate({ to: "/portal" });
    } else if (demo.role === "INVESTOR") {
      navigate({ to: "/investor" });
    }
  };

  return (
    <main className="portal-canvas min-h-screen w-full max-w-full overflow-x-hidden text-portal-foreground">
      <div className="portal-grid" aria-hidden="true" />
      <div className="portal-shape portal-shape-ring" aria-hidden="true" />
      <div className="portal-shape portal-shape-wave" aria-hidden="true" />
      <div className="portal-shape portal-shape-loop" aria-hidden="true" />

      <Link
        to="/"
        className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 text-sm text-portal-foreground/70 transition-colors hover:text-portal-foreground sm:left-8 sm:top-8"
      >
        <ArrowLeft className="size-4" /> Back to UNIPOD
      </Link>

      <div className="relative z-10 grid min-h-screen place-items-center px-5 py-20">
        <section className="portal-panel w-full max-w-[460px] animate-rise" aria-labelledby="login-heading">
          <div className="text-center">
            <div className="mx-auto inline-flex rounded-md bg-portal-foreground p-2.5 shadow-sm">
              <img
                src="/aiunipod-logo.webp"
                onError={(e) => {
                  e.currentTarget.src = "/aiunipod-logo.png";
                }}
                alt="AI UNIPOD"
                width="144"
                height="40"
                decoding="async"
                className="h-10 w-auto sm:h-12 object-contain"
              />
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-portal-accent">
              <Sparkles className="size-3.5" /> Sovereign AI Ecosystem
            </div>
            <h1 id="login-heading" className="mt-2 font-display text-3xl font-semibold tracking-normal sm:text-4xl">
              Welcome back
            </h1>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-portal-foreground/65">
              Sign in to manage program incubation, venture profiles, or review deal flow.
            </p>
          </div>

          {/* Quick Demo Personas */}
          <div className="mt-6 rounded-2xl border border-portal-foreground/15 bg-portal-foreground/5 p-3.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-portal-accent">
              One-Click Demo Roles:
            </p>
            <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("super_admin")}
                className="group flex flex-col items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 p-2 text-center transition-all hover:bg-purple-500/20 hover:scale-[1.02]"
              >
                <Shield className="size-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="mt-1 text-[11px] font-bold text-portal-foreground leading-tight">Super Admin</span>
                <span className="text-[9px] text-portal-foreground/60 truncate max-w-full">admin@admin.com</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo("startup_admin")}
                className="group flex flex-col items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 p-2 text-center transition-all hover:bg-blue-500/20 hover:scale-[1.02]"
              >
                <Sparkles className="size-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="mt-1 text-[11px] font-bold text-portal-foreground leading-tight">Founder</span>
                <span className="text-[9px] text-portal-foreground/60 truncate max-w-full">founder@founder.com</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo("investor_vetted")}
                className="group flex flex-col items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 p-2 text-center transition-all hover:bg-amber-500/20 hover:scale-[1.02]"
              >
                <UserCheck className="size-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="mt-1 text-[11px] font-bold text-portal-foreground leading-tight">Investor</span>
                <span className="text-[9px] text-portal-foreground/60 truncate max-w-full">investor@investor.com</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form className="mt-6 space-y-4" onSubmit={handleSignIn}>
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email address
              </label>
              <div className="portal-input-wrap mt-1.5">
                <Mail className="size-4" aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="admin@admin.com"
                  required
                  className="portal-input"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <span className="text-xs text-portal-foreground/45">Demo mode enabled</span>
              </div>
              <div className="portal-input-wrap mt-1.5">
                <LockKeyhole className="size-4" aria-hidden="true" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  className="portal-input"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full text-portal-foreground/60 hover:bg-portal-foreground/10 hover:text-portal-foreground"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full rounded-xl bg-portal-accent text-portal-accent-foreground font-semibold shadow-md transition-all hover:bg-portal-accent/90 hover:scale-[1.01]"
            >
              {isSubmitting ? "Authenticating..." : "Sign in to Console"}
            </Button>
          </form>

          {isAuthenticated && user && (
            <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                <span>Currently active as <strong>{user.name}</strong> ({user.role})</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs rounded-lg border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20"
                onClick={() => {
                  if (user.role === "SUPER_ADMIN") navigate({ to: "/admin" });
                  else if (user.role === "INVESTOR") navigate({ to: "/investor" });
                  else navigate({ to: "/portal" });
                }}
              >
                Go to Dashboard →
              </Button>
            </div>
          )}

          <div className="mt-5 flex items-start gap-2.5 border-t border-portal-foreground/15 pt-4 text-xs leading-5 text-portal-foreground/55">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-portal-accent" />
            <p>
              Administrative accounts are secured by sovereign role-based access control (RBAC). Passwords or demo quick-links provide immediate entrance.
            </p>
          </div>

          {/* Institutional Partners Footer */}
          <div className="mt-6 border-t border-portal-foreground/15 pt-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-portal-foreground/50">
              Joint National Initiative Partners
            </p>
            <div className="mt-3 flex items-center justify-center gap-6">
              <img
                src="/partners/eaii-logo.webp"
                alt="EAII"
                title="Ethiopian Artificial Intelligence Institute"
                className="h-8 w-auto object-contain opacity-75 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.currentTarget.src = "/partners/eaii-logo.png";
                }}
              />
              <img
                src="/partners/aau-logo.webp"
                alt="AAU"
                title="Addis Ababa University"
                className="h-8 w-auto object-contain opacity-75 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.currentTarget.src = "/partners/aau-logo.png";
                }}
              />
              <img
                src="/partners/undp-logo.webp"
                alt="UNDP"
                title="UNDP · timbuktoo"
                className="h-8 w-auto object-contain opacity-75 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.currentTarget.src = "/partners/undp-logo.png";
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
