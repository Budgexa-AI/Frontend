"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  BriefcaseBusiness,
  Bug,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  LogOut,
  PenLine,
  PiggyBank,
  Settings,
  ShieldCheck,
  Target,
  User,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/useUser";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

type Section = "profile" | "security" | "notifications" | "budget";

// ─────────────────────────────────────────────────────────────
// BUDGET METHOD DATA
// ─────────────────────────────────────────────────────────────

const budgetMethods = [
  {
    id: "50-30-20",
    title: "50 / 30 / 20",
    subtitle: "Best for beginners",
    description: "Split income into needs, wants, and savings using a simple percentage-based framework.",
    icon: Target,
  },
  {
    id: "envelope",
    title: "Envelope Budgeting",
    subtitle: "Balanced and flexible",
    description: "Allocate money into spending categories so you always know how much is left.",
    icon: Wallet,
  },
  {
    id: "zero-based",
    title: "Zero-Based Budgeting",
    subtitle: "Detailed financial control",
    description: "Assign every naira a purpose before the month begins for maximum control.",
    icon: PiggyBank,
  },
];

// ─────────────────────────────────────────────────────────────
// NAV ITEMS
// ─────────────────────────────────────────────────────────────

const navItems: { id: Section; label: string }[] = [
  { id: "profile",       label: "Profile"       },
  { id: "security",      label: "Security"      },
  { id: "notifications", label: "Notifications" },
  { id: "budget",        label: "Budget Method" },
];

// ─────────────────────────────────────────────────────────────
// SETTINGS PAGE
// ─────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const { profile } = useCurrentUser();
  const [activeSection, setActiveSection] = useState<Section>("profile");
  const [mobileNavOpen, setMobileNavOpen]  = useState(false);

  // Profile state
  const [firstName,   setFirstName]   = useState("");
  const [lastName,    setLastName]    = useState("");
  const [email,       setEmail]       = useState("");
  const [phone,       setPhone]       = useState("");
  const [incomeSource, setIncomeSource] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);

  // Security state
  const [twoFactor,       setTwoFactor]       = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword,     setNewPassword]     = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent,     setShowCurrent]     = useState(false);
  const [showNew,         setShowNew]         = useState(false);
  const [showConfirm,     setShowConfirm]     = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState({
    budgetAlerts:    true,
    weeklyReport:    true,
    savingsReminder: false,
    aiInsights:      true,
    securityAlerts:  true,
  });

  // Budget state
  const [selectedMethod, setSelectedMethod] = useState("envelope");
  const [budgetSaved,    setBudgetSaved]    = useState(false);

  useEffect(() => {
    const profileData = profile as (typeof profile & {
      firstName?: string;
      lastName?: string;
      fullName?: string;
      phone?: string;
      phoneNumber?: string;
      incomeSource?: string;
    }) | null;

    const displayName =
      profileData?.fullName?.trim() ||
      profileData?.name?.trim() ||
      "";
    const nameParts = displayName.split(/\s+/).filter(Boolean);

    setFirstName(profileData?.firstName || nameParts[0] || "");
    setLastName(profileData?.lastName || nameParts.slice(1).join(" "));
    setEmail(profileData?.email || "");
    setPhone(profileData?.phone || profileData?.phoneNumber || "");
    setIncomeSource(profileData?.incomeSource || "");
  }, [profile]);

  // ── Handlers ──────────────────────────────────────────────

  function handleProfileSave() {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  }

  function handleBudgetSave() {
    setBudgetSaved(true);
    setTimeout(() => setBudgetSaved(false), 2500);
  }

  function toggleNotification(key: keyof typeof notifications) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const activeLabel = navItems.find((n) => n.id === activeSection)?.label;

  return (
    <main className="min-h-screen bg-Budgexa-beige">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* ── PAGE HEADER ── */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-Budgexa-green/5 text-Budgexa-green">
              <Settings size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-Budgexa-green">Settings</h1>
              <p className="text-sm text-Budgexa-green/60">Manage your account and preferences</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

          {/* ── SIDEBAR ── */}
          <aside className="w-full lg:sticky lg:top-6 lg:w-64 lg:shrink-0">
            <div className="rounded-[28px] border border-Budgexa-green/5 bg-white p-4 shadow-sm mt-5">

              {/* Profile card */}
              <div className="mb-4 flex items-center gap-3 rounded-2xl bg-Budgexa-beige/60 p-4">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-Budgexa-green text-white text-lg font-semibold">
                    {firstName?.[0] || lastName?.[0] || "?"}
                  </div>
                  <button className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-Budgexa-orange text-white shadow-sm">
                    <PenLine size={10} />
                  </button>
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-Budgexa-green">{firstName} {lastName}</p>
                  <p className="truncate text-xs text-Budgexa-green/60">{email}</p>
                </div>
              </div>

              {/* Nav */}
              <div className="mb-4">
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-Budgexa-green/40">
                  Account
                </p>
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                        activeSection === item.id
                          ? "bg-Budgexa-green text-white"
                          : "text-Budgexa-green/70 hover:bg-Budgexa-beige hover:text-Budgexa-green"
                      )}
                    >
                      <span className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        activeSection === item.id ? "bg-white" : "bg-Budgexa-green/30"
                      )} />
                      {item.label}
                    </button>
                  ))}
                  <Link
                    href="/contact?category=bug"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-Budgexa-green/70 transition-all hover:bg-Budgexa-beige hover:text-Budgexa-green"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-Budgexa-green/30" />
                    Report a Problem
                  </Link>
                </nav>
              </div>

              {/* Logout */}
              <button className="flex w-full items-center gap-2 rounded-2xl border border-Budgexa-orange/20 px-3 py-2.5 text-sm font-medium text-Budgexa-orange transition-all hover:bg-Budgexa-orange/5">
                <LogOut size={16} />
                Log Out
              </button>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 space-y-5 min-w-0">

            {/* Mobile section label */}
            <div className="flex items-center justify-between lg:hidden">
              <p className="text-sm font-semibold text-Budgexa-green/60 uppercase tracking-widest">
                {activeLabel}
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                      activeSection === item.id
                        ? "bg-Budgexa-green text-white"
                        : "border border-Budgexa-green/10 text-Budgexa-green/70"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <Link
                  href="/contact?category=bug"
                  className="shrink-0 rounded-full border border-Budgexa-green/10 px-3 py-1.5 text-xs font-medium text-Budgexa-green/70 transition-all hover:bg-Budgexa-beige"
                >
                  Report a Problem
                </Link>
              </div>
            </div>

            {/* ── PROFILE ── */}
            {activeSection === "profile" && (
              <>
                {/* Profile hero card */}
                <section className="rounded-[28px] border border-Budgexa-green/5 bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-Budgexa-green text-white text-2xl font-semibold">
                                {firstName?.[0] || lastName?.[0] || "?"}
                        </div>
                        <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-Budgexa-orange text-white shadow-md transition-all hover:scale-105">
                          <PenLine size={13} />
                        </button>
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-semibold text-Budgexa-green">
                            {firstName} {lastName}
                          </h2>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-Budgexa-green/10 px-3 py-1 text-xs font-semibold text-Budgexa-green">
                            <Check size={11} />
                            Verified
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-Budgexa-green/60">{email}</p>
                        <p className="mt-0.5 text-sm text-Budgexa-green/50">{phone}</p>
                      </div>
                    </div>

                    <button className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-Budgexa-green/15 px-5 text-sm font-medium text-Budgexa-green transition-all hover:border-Budgexa-green/30 hover:bg-Budgexa-beige">
                      <PenLine size={14} />
                      Edit Profile
                    </button>
                  </div>
                </section>

                {/* Personal info form */}
                <section className="rounded-[28px] border border-Budgexa-green/5 bg-white p-6 shadow-sm">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-Budgexa-green">Personal Information</h3>
                    <p className="mt-1 text-sm text-Budgexa-green/60">
                      Update your personal details and contact information.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-Budgexa-green">
                        First Name
                      </label>
                      <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="h-12 w-full rounded-2xl border border-Budgexa-green/10 bg-Budgexa-beige/30 px-4 text-Budgexa-green outline-none transition-all placeholder:text-Budgexa-green/40 focus:border-Budgexa-green/30 focus:ring-2 focus:ring-Budgexa-green/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-Budgexa-green">
                        Last Name
                      </label>
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="h-12 w-full rounded-2xl border border-Budgexa-green/10 bg-Budgexa-beige/30 px-4 text-Budgexa-green outline-none transition-all focus:border-Budgexa-green/30 focus:ring-2 focus:ring-Budgexa-green/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-Budgexa-green">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12 w-full rounded-2xl border border-Budgexa-green/10 bg-Budgexa-beige/30 pl-10 pr-4 text-Budgexa-green outline-none transition-all focus:border-Budgexa-green/30 focus:ring-2 focus:ring-Budgexa-green/10"
                        />
                        <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-Budgexa-green/40" />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-Budgexa-green">
                        Phone Number
                      </label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-12 w-full rounded-2xl border border-Budgexa-green/10 bg-Budgexa-beige/30 px-4 text-Budgexa-green outline-none transition-all focus:border-Budgexa-green/30 focus:ring-2 focus:ring-Budgexa-green/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-Budgexa-green">
                        Income Source
                      </label>
                      <input
                        value={incomeSource}
                        onChange={(e) => setIncomeSource(e.target.value)}
                        className="h-12 w-full rounded-2xl border border-Budgexa-green/10 bg-Budgexa-beige/30 px-4 text-Budgexa-green outline-none transition-all focus:border-Budgexa-green/30 focus:ring-2 focus:ring-Budgexa-green/10"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleProfileSave}
                      className={cn(
                        "inline-flex h-11 items-center gap-2 rounded-2xl px-6 text-sm font-medium text-white transition-all",
                        profileSaved ? "bg-Budgexa-green/70" : "bg-Budgexa-green hover:bg-Budgexa-green/90"
                      )}
                    >
                      {profileSaved ? (
                        <><Check size={15} /> Saved!</>
                      ) : "Save Changes"}
                    </button>
                  </div>
                </section>

                {/* KYC banner */}
                {/* <section className="flex flex-col gap-4 rounded-[28px] border border-Budgexa-green/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-Budgexa-green/10 text-Budgexa-green">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-Budgexa-green">KYC Identity Verification Complete</p>
                      <p className="mt-0.5 text-sm text-Budgexa-green/60">
                        Your identity has been verified. You have full access to all features.
                      </p>
                    </div>
                  </div>
                  <button className="shrink-0 text-sm font-semibold text-Budgexa-green transition-colors hover:text-Budgexa-orange">
                    View Documents
                  </button>
                </section> */}
              </>
            )}

            {/* ── SECURITY ── */}
            {activeSection === "security" && (
              <section className="rounded-[28px] border border-Budgexa-green/5 bg-white p-6 shadow-sm">
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-Budgexa-green text-white">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-Budgexa-green">Security Preferences</h3>
                    <p className="text-sm text-Budgexa-green/60">
                      Manage your password and 2-step verification methods.
                    </p>
                  </div>
                </div>

                {/* 2FA */}
                <div className="mb-8 flex items-start justify-between gap-6 rounded-2xl border border-Budgexa-green/5 bg-Budgexa-beige/40 p-5">
                  <div>
                    <p className="font-semibold text-Budgexa-green">Two-Factor Authentication (2FA)</p>
                    <p className="mt-1 text-sm leading-relaxed text-Budgexa-green/60">
                      Add an extra layer of security to your account by requiring a code when signing in.
                    </p>
                  </div>
                  <button
                    onClick={() => setTwoFactor((v) => !v)}
                    className={cn(
                      "relative mt-0.5 h-7 w-12 shrink-0 rounded-full transition-all duration-300",
                      twoFactor ? "bg-Budgexa-green" : "bg-Budgexa-green/20"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300",
                        twoFactor ? "left-6" : "left-1"
                      )}
                    />
                  </button>
                </div>

                {/* Change password */}
                <div>
                  <h4 className="mb-5 font-semibold text-Budgexa-green">Change Password</h4>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-Budgexa-green/50">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrent ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="h-12 w-full rounded-2xl border border-Budgexa-green/10 bg-Budgexa-beige/30 px-4 pr-12 text-Budgexa-green outline-none transition-all focus:border-Budgexa-green/30 focus:ring-2 focus:ring-Budgexa-green/10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrent((v) => !v)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-Budgexa-green/40"
                        >
                          {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-Budgexa-green/50">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNew ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="h-12 w-full rounded-2xl border border-Budgexa-green/10 bg-Budgexa-beige/30 px-4 pr-12 text-Budgexa-green outline-none transition-all focus:border-Budgexa-green/30 focus:ring-2 focus:ring-Budgexa-green/10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNew((v) => !v)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-Budgexa-green/40"
                          >
                            {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-Budgexa-green/50">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirm ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="h-12 w-full rounded-2xl border border-Budgexa-green/10 bg-Budgexa-beige/30 px-4 pr-12 text-Budgexa-green outline-none transition-all focus:border-Budgexa-green/30 focus:ring-2 focus:ring-Budgexa-green/10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirm((v) => !v)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-Budgexa-green/40"
                          >
                            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button className="inline-flex h-11 items-center gap-2 rounded-2xl bg-Budgexa-green px-6 text-sm font-medium text-white transition-all hover:bg-Budgexa-green/90">
                      Update Password
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* ── NOTIFICATIONS ── */}
            {activeSection === "notifications" && (
              <section className="rounded-[28px] border border-Budgexa-green/5 bg-white p-6 shadow-sm">
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-Budgexa-green/5 text-Budgexa-green">
                    <Bell size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-Budgexa-green">Notifications</h3>
                    <p className="text-sm text-Budgexa-green/60">
                      Choose what updates you want to receive.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { key: "budgetAlerts",    label: "Budget Alerts",      desc: "Get notified when you're close to a budget limit."       },
                    { key: "weeklyReport",    label: "Weekly Report",      desc: "Receive a summary of your weekly financial activity."    },
                    { key: "savingsReminder", label: "Savings Reminders",  desc: "Reminders to contribute toward your savings goals."      },
                    { key: "aiInsights",      label: "AI Insights",        desc: "Personalized financial tips based on your spending."     },
                    { key: "securityAlerts",  label: "Security Alerts",    desc: "Alerts for sign-ins and account activity."               },
                  ].map(({ key, label, desc }) => {
                    const on = notifications[key as keyof typeof notifications];
                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between gap-6 rounded-2xl border border-Budgexa-green/5 bg-Budgexa-beige/30 p-4"
                      >
                        <div>
                          <p className="font-medium text-Budgexa-green">{label}</p>
                          <p className="mt-0.5 text-sm text-Budgexa-green/60">{desc}</p>
                        </div>
                        <button
                          onClick={() => toggleNotification(key as keyof typeof notifications)}
                          className={cn(
                            "relative h-7 w-12 shrink-0 rounded-full transition-all duration-300",
                            on ? "bg-Budgexa-green" : "bg-Budgexa-green/20"
                          )}
                        >
                          <span
                            className={cn(
                              "absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300",
                              on ? "left-6" : "left-1"
                            )}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ── BUDGET METHOD ── */}
            {activeSection === "budget" && (
              <section className="rounded-[28px] border border-Budgexa-green/5 bg-white p-6 shadow-sm">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-Budgexa-green/5 text-Budgexa-green">
                    <BriefcaseBusiness size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-Budgexa-green">Budget Method</h3>
                    <p className="text-sm text-Budgexa-green/60">
                      Change how your spending and budgets are tracked.
                    </p>
                  </div>
                </div>

                <div className="mb-6 mt-4 rounded-2xl border border-Budgexa-orange/15 bg-Budgexa-orange/5 px-4 py-3 text-sm text-Budgexa-green/70">
                  Changing your budget method will affect how your categories and spending limits are calculated going forward. Existing transactions won't be affected.
                </div>

                <div className="space-y-4">
                  {budgetMethods.map((method) => {
                    const Icon = method.icon;
                    const active = selectedMethod === method.id;

                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={cn(
                          "group w-full rounded-[20px] border p-5 text-left transition-all",
                          active
                            ? "border-Budgexa-green bg-Budgexa-green text-white shadow-lg shadow-Budgexa-green/10"
                            : "border-Budgexa-green/10 hover:border-Budgexa-green/20 hover:bg-Budgexa-beige/40"
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all",
                            active ? "bg-white/15" : "bg-Budgexa-green/5 text-Budgexa-green"
                          )}>
                            <Icon size={22} className={active ? "text-white" : ""} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className={cn(
                                "font-semibold",
                                active ? "text-white" : "text-Budgexa-green"
                              )}>
                                {method.title}
                              </p>
                              <span className={cn(
                                "rounded-full px-2 py-0.5 text-xs font-medium",
                                active ? "bg-white/15 text-white" : "bg-Budgexa-orange/10 text-Budgexa-orange"
                              )}>
                                {method.subtitle}
                              </span>
                            </div>
                            <p className={cn(
                              "mt-1 text-sm leading-relaxed",
                              active ? "text-white/80" : "text-Budgexa-green/60"
                            )}>
                              {method.description}
                            </p>
                          </div>

                          <div className={cn(
                            "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all",
                            active
                              ? "border-white bg-white"
                              : "border-Budgexa-green/20"
                          )}>
                            {active && <Check size={13} className="text-Budgexa-green" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleBudgetSave}
                    className={cn(
                      "inline-flex h-11 items-center gap-2 rounded-2xl px-6 text-sm font-medium text-white transition-all",
                      budgetSaved ? "bg-Budgexa-green/70" : "bg-Budgexa-green hover:bg-Budgexa-green/90"
                    )}
                  >
                    {budgetSaved ? (
                      <><Check size={15} /> Saved!</>
                    ) : "Save Budget Method"}
                  </button>
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}