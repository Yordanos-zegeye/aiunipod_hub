import React, { createContext, useContext, useEffect, useState } from "react";
import type { UserRole, InvestorVettingStatus } from "@/lib/rbac";
import { STARTUPS } from "@/data/startups";

export interface InvestorProfileData {
  organization: string;
  investorType: "VC" | "Angel" | "DFI" | "Corporate" | "Family Office";
  ticketSize: string;
  focusSectors: string[];
  vettingStatus: InvestorVettingStatus;
  notes?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  startupSlug?: string | undefined;
  startupName?: string | undefined;
  avatarUrl?: string | undefined;
  title?: string | undefined;
  investorProfile?: InvestorProfileData | undefined;
  createdAt: string;
}

export interface InvestorRegisterData {
  fullName: string;
  email: string;
  organization: string;
  investorType: "VC" | "Angel" | "DFI" | "Corporate" | "Family Office";
  ticketSize: string;
  focusSectors: string[];
}

export const DEMO_USERS: Record<string, AuthUser> = {
  super_admin: {
    id: "usr_admin_01",
    email: "admin@admin.com",
    name: "Admin User",
    title: "Super Administrator",
    role: "SUPER_ADMIN",
    avatarUrl: "/avatars/admin.svg",
    createdAt: "2025-01-10",
  },
  startup_admin: {
    id: "usr_founder_01",
    email: "founder@founder.com",
    name: "Startup Founder",
    title: "Founder & CEO",
    role: "STARTUP_ADMIN",
    startupSlug: "sela-health",
    startupName: "Sela Health",
    avatarUrl: "/avatars/founder.svg",
    createdAt: "2025-03-15",
  },
  startup_editor: {
    id: "usr_editor_01",
    email: "editor@founder.com",
    name: "Startup Editor",
    title: "Product Lead",
    role: "STARTUP_EDITOR",
    startupSlug: "kuraz-agri",
    startupName: "Kuraz Agri",
    avatarUrl: "/avatars/editor.svg",
    createdAt: "2025-04-20",
  },
  investor_vetted: {
    id: "usr_inv_vetted_01",
    email: "investor@investor.com",
    name: "Vetted Investor",
    title: "Partner · Venture Capital",
    role: "INVESTOR",
    avatarUrl: "/avatars/investor.svg",
    investorProfile: {
      organization: "Venture Capital Partner",
      investorType: "VC",
      ticketSize: "$150k – $500k",
      focusSectors: ["Health AI", "AgriTech", "Fintech AI"],
      vettingStatus: "VETTED",
    },
    createdAt: "2025-02-01",
  },
  investor_pending: {
    id: "usr_inv_pending_01",
    email: "angel@investor.com",
    name: "Angel Investor",
    title: "Syndicate Member",
    role: "INVESTOR",
    avatarUrl: "/avatars/angel.svg",
    investorProfile: {
      organization: "Angel Investor Network",
      investorType: "Angel",
      ticketSize: "$25k – $50k",
      focusSectors: ["Language AI", "AgriTech"],
      vettingStatus: "PENDING",
    },
    createdAt: "2025-05-18",
  },
};

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string, requestedRole?: UserRole, startupSlug?: string) => Promise<AuthUser>;
  registerInvestor: (data: InvestorRegisterData) => Promise<AuthUser>;
  logout: () => void;
  switchDemoRole: (demoKey: keyof typeof DEMO_USERS) => void;
  updateProfile: (updates: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "unipod_auth_user_v2";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load auth state from localStorage", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUserSession = (newUser: AuthUser | null) => {
    setUser(newUser);
    try {
      if (newUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error("Failed to persist user session", e);
    }
  };

  const login = async (
    email: string,
    _password?: string,
    requestedRole?: UserRole,
    startupSlug?: string
  ): Promise<AuthUser> => {
    // Check if it matches any demo users by email
    const matchedDemo = Object.values(DEMO_USERS).find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    let authUser: AuthUser;

    if (matchedDemo) {
      authUser = { ...matchedDemo };
    } else {
      // Create user session based on provided credentials
      const role: UserRole = requestedRole || "GUEST";
      const slug = startupSlug || (role === "STARTUP_ADMIN" ? "sela-health" : undefined);
      const startup = slug ? STARTUPS.find((s) => s.slug === slug) : undefined;

      const avatar =
        role === "SUPER_ADMIN"
          ? "/avatars/admin.svg"
          : role === "INVESTOR"
          ? "/avatars/investor.svg"
          : role === "STARTUP_EDITOR"
          ? "/avatars/editor.svg"
          : "/avatars/founder.svg";

      authUser = {
        id: `usr_${Date.now()}`,
        email,
        name: email.split("@")[0] || "User",
        role,
        startupSlug: slug,
        startupName: startup?.name,
        avatarUrl: avatar,
        createdAt: new Date().toISOString(),
      };
    }

    saveUserSession(authUser);
    return authUser;
  };

  const registerInvestor = async (data: InvestorRegisterData): Promise<AuthUser> => {
    const newInvestor: AuthUser = {
      id: `usr_inv_${Date.now()}`,
      email: data.email,
      name: data.fullName,
      role: "INVESTOR",
      title: `${data.investorType} Investor · ${data.organization}`,
      avatarUrl: "/avatars/investor.svg",
      investorProfile: {
        organization: data.organization,
        investorType: data.investorType,
        ticketSize: data.ticketSize,
        focusSectors: data.focusSectors,
        vettingStatus: "PENDING", // PRD FR-16: Accounts require vetting before access
      },
      createdAt: new Date().toISOString(),
    };

    saveUserSession(newInvestor);
    return newInvestor;
  };

  const logout = () => {
    saveUserSession(null);
  };

  const switchDemoRole = (demoKey: keyof typeof DEMO_USERS) => {
    const demo = DEMO_USERS[demoKey];
    if (demo) {
      saveUserSession({ ...demo });
    }
  };

  const updateProfile = (updates: Partial<AuthUser>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    saveUserSession(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && user.role !== "GUEST",
        isLoading,
        login,
        registerInvestor,
        logout,
        switchDemoRole,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
