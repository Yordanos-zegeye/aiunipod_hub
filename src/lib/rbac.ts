/**
 * Role-Based Access Control (RBAC) System
 * Aligned with AI UNIPOD Ethiopia Multi-Tenant Ecosystem Platform Requirements Document (Sept 2026)
 *
 * Roles:
 * - SUPER_ADMIN: UNIPOD program staff (provisions startups, manages cohorts/events, vets investors, runs reports)
 * - STARTUP_ADMIN: Founder / team lead of member startup (manages profile, team, pitch decks, investor access)
 * - STARTUP_EDITOR: Team member with limited edit rights (updates content without full admin control)
 * - INVESTOR: Vetted external stakeholder (discovers startups, requests access, tracks pipeline, logs commitments)
 * - GUEST: General public, prospective partners, press (browses startups, alumni, events, jobs)
 */

export type UserRole =
  | "SUPER_ADMIN"
  | "STARTUP_ADMIN"
  | "STARTUP_EDITOR"
  | "INVESTOR"
  | "GUEST";

export type InvestorVettingStatus = "PENDING" | "VETTED" | "REJECTED";

export interface RoleConfig {
  role: UserRole;
  label: string;
  description: string;
  badgeClass: string;
  primaryDashboardUrl: string;
}

export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  SUPER_ADMIN: {
    role: "SUPER_ADMIN",
    label: "Program Admin",
    description: "UNIPOD program staff managing cohorts, startups, events, and reports",
    badgeClass: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    primaryDashboardUrl: "/admin",
  },
  STARTUP_ADMIN: {
    role: "STARTUP_ADMIN",
    label: "Startup Founder",
    description: "Startup founder managing business profile, pitch deck, and investor access",
    badgeClass: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    primaryDashboardUrl: "/portal",
  },
  STARTUP_EDITOR: {
    role: "STARTUP_EDITOR",
    label: "Startup Editor",
    description: "Team member with content and product update permissions",
    badgeClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    primaryDashboardUrl: "/portal",
  },
  INVESTOR: {
    role: "INVESTOR",
    label: "Investor",
    description: "Vetted investor discovering AI ventures and tracking pipeline deals",
    badgeClass: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    primaryDashboardUrl: "/investor",
  },
  GUEST: {
    role: "GUEST",
    label: "Public / Guest",
    description: "Ecosystem guest browsing startups, jobs, and events",
    badgeClass: "bg-muted text-muted-foreground border-border",
    primaryDashboardUrl: "/",
  },
};

export function canAccessAdmin(role: UserRole): boolean {
  return role === "SUPER_ADMIN";
}

export function canAccessPortal(role: UserRole): boolean {
  return role === "STARTUP_ADMIN" || role === "STARTUP_EDITOR" || role === "SUPER_ADMIN";
}

export function canAccessInvestor(role: UserRole): boolean {
  return role === "INVESTOR" || role === "SUPER_ADMIN";
}

export function getRoleLabel(role: UserRole): string {
  return ROLE_CONFIGS[role]?.label || role;
}

export function getRoleBadgeClass(role: UserRole): string {
  return ROLE_CONFIGS[role]?.badgeClass || "bg-muted text-muted-foreground";
}

export function getRoleDashboardUrl(role: UserRole, startupSlug?: string): string {
  if (role === "STARTUP_ADMIN" || role === "STARTUP_EDITOR") {
    return startupSlug ? `/portal?tenant=${startupSlug}` : "/portal";
  }
  return ROLE_CONFIGS[role]?.primaryDashboardUrl || "/";
}
