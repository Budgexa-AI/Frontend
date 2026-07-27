"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  BriefcaseBusiness,
  Check,
  Clock,
  Eye,
  EyeOff,
  Loader2,
  LogOut,
  PenLine,
  PiggyBank,
  Settings,
  ShieldCheck,
  Target,
  User,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchBudgetMethod, getCurrentUser, updateBudget, updateBudgetMethod, updateProfile, UserProfile } from "@/lib/api-client/src";
import { enablePushNotifications } from "@/lib/push-notification";

// TYPES

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

const navItems: { id: Section; label: string }[] = [
  { id: "profile",       label: "Profile"       },
  { id: "security",      label: "Security"      },
  { id: "notifications", label: "Notifications" },
  { id: "budget",        label: "Budget Method" },
];

// Small reusable "not available yet" badge for stubbed sections
function ComingSoonBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-rayo-orange/10 px-2.5 py-1 text-[11px] font-semibold text-rayo-orange">
      <Clock size={11} />
      Coming soon
    </span>
  );
}

// SETTINGS PAGE

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<Section>("profile");

  // ── Initial load state ──────────────────────────────────────
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileLoadError, setProfileLoadError] = useState<string | null>(null);

  // Profile state (populated from getCurrentUser)
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  // Not yet returned/accepted by the backend's AuthMeResponse / UpdateMeBody —
  // kept editable locally but NOT sent on save until the backend supports them.
  const [phone,         setPhone]         = useState("");
  const [incomeSource,  setIncomeSource]  = useState("");

  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved,  setProfileSaved]  = useState(false);
  const [profileError,  setProfileError]  = useState<string | null>(null);

  // Security state — UI only, no backing endpoint yet (see TODOs in data-service.ts)
  const [twoFactor,       setTwoFactor]       = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword,     setNewPassword]     = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent,     setShowCurrent]     = useState(false);
  const [showNew,         setShowNew]         = useState(false);
  const [showConfirm,     setShowConfirm]     = useState(false);

  // Notifications state — UI only, no backing endpoint yet
  const [notifications, setNotifications] = useState({
    budgetAlerts:    true,
    weeklyReport:    true,
    savingsReminder: false,
    aiInsights:      true,
    securityAlerts:  true,
  });

  // Budget method state
  const [selectedMethod,     setSelectedMethod]     = useState("envelope");
  const [budgetMethodLoaded, setBudgetMethodLoaded] = useState(false);
  const [budgetSaving,       setBudgetSaving]       = useState(false);
  const [budgetSaved,        setBudgetSaved]        = useState(false);
  const [budgetError,        setBudgetError]        = useState<string | null>(null);

  // ── Load current user on mount ──────────────────────────────
  useEffect(() => {
    getCurrentUser()
      .then((user: UserProfile) => {
        const [first, ...rest] = (user.name ?? "").trim().split(/\s+/);
        setFirstName(first ?? "");
        setLastName(rest.join(" "));
        setEmail(user.email ?? "");
      })
      .catch((e: Error) => setProfileLoadError(e.message || "Failed to load profile"))
      .finally(() => setProfileLoading(false));
  }, []);

  // ── Load current budget method lazily when that tab is opened ──
  useEffect(() => {
    if (activeSection !== "budget" || budgetMethodLoaded) return;
    fetchBudgetMethod()
      .then((method) => {
        if (method) setSelectedMethod(method);
      })
      .catch(() => {
        // Non-fatal: fall back to the default selection
      })
      .finally(() => setBudgetMethodLoaded(true));
  }, [activeSection, budgetMethodLoaded]);

  // ── Handlers ──────────────────────────────────────────────

  async function handleProfileSave() {
    setProfileSaving(true);
    setProfileError(null);
    try {
      await updateProfile({
        name: `${firstName} ${lastName}`.trim(),
        email,
      });
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 2500);
    } catch (e: any) {
      setProfileError(e.message || "Failed to save profile");
    } finally {
      setProfileSaving(false);
    }
  }

  async function handleBudgetSave() {
    setBudgetSaving(true);
    setBudgetError(null);
    try {
      await updateBudgetMethod(selectedMethod);
      setBudgetSaved(true);
      setTimeout(() => setBudgetSaved(false), 2500);
    } catch (e: any) {
      setBudgetError(e.message || "Failed to save budget method");
    } finally {
      setBudgetSaving(false);
    }
  }

  const [pushEnabled, setPushEnabled] = useState(false);
  const [pushBusy, setPushBusy] = useState(false);
  const [pushError, setPushError] = useState<string | null>(null);

  async function handleEnablePush() {
    setPushBusy(true);
    setPushError(null);
    try {
      const result = await enablePushNotifications();
      if (result.success) setPushEnabled(true);
      else setPushError(result.error ?? "Something went wrong");
    } catch (err: any) {
      setPushError(err?.message ?? "Something went wrong");
    } finally {
      setPushBusy(false);
    }
  }

  function toggleNotification(key: keyof typeof notifications) {
    // Local-only preview — not persisted until the notifications
    // endpoint exists. Toggle stays disabled in the UI below.
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const activeLabel = navItems.find((n) => n.id === activeSection)?.label;
  const initials = ((firstName[0] ?? "") + (lastName[0] ?? "")).toUpperCase() || "?";

  const passwordFormValid =
    currentPassword.length > 0 &&
    newPassword.length >= 8 &&
    newPassword === confirmPassword;

  return (
    <main className="min-h-screen bg-rayo-beige">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* ── PAGE HEADER ── */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rayo-green/5 text-rayo-green">
              <Settings size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-rayo-green">Settings</h1>
              <p className="text-sm text-rayo-green/60">Manage your account and preferences</p>
            </div>
          </div>
        </div>

        {profileLoadError && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Couldn't load your profile: {profileLoadError}
          </div>
        )}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

          {/* ── SIDEBAR ── */}
          <aside className="w-full lg:sticky lg:top-6 lg:w-64 lg:shrink-0">
            <div className="rounded-[28px] border border-rayo-green/5 bg-white p-4 shadow-sm">

              {/* Profile card */}
              <div className="mb-4 flex items-center gap-3 rounded-2xl bg-rayo-beige/60 p-4">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rayo-green text-white text-lg font-semibold">
                    {profileLoading ? <Loader2 size={16} className="animate-spin" /> : initials}
                  </div>
                  <button className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-rayo-orange text-white shadow-sm">
                    <PenLine size={10} />
                  </button>
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-rayo-green">
                    {profileLoading ? "Loading…" : `${firstName} ${lastName}`.trim() || "Your name"}
                  </p>
                  <p className="truncate text-xs text-rayo-green/60">
                    {profileLoading ? " " : email}
                  </p>
                </div>
              </div>

              {/* Nav */}
              <div className="mb-4">
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-rayo-green/40">
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
                          ? "bg-rayo-green text-white"
                          : "text-rayo-green/70 hover:bg-rayo-beige hover:text-rayo-green"
                      )}
                    >
                      <span className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        activeSection === item.id ? "bg-white" : "bg-rayo-green/30"
                      )} />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Logout */}
              <button className="flex w-full items-center gap-2 rounded-2xl border border-rayo-orange/20 px-3 py-2.5 text-sm font-medium text-rayo-orange transition-all hover:bg-rayo-orange/5">
                <LogOut size={16} />
                Log Out
              </button>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 space-y-5 min-w-0">

            {/* Mobile section label */}
            <div className="flex items-center justify-between lg:hidden">
              <p className="text-sm font-semibold text-rayo-green/60 uppercase tracking-widest">
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
                        ? "bg-rayo-green text-white"
                        : "border border-rayo-green/10 text-rayo-green/70"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── PROFILE ── */}
            {activeSection === "profile" && (
              <>
                <section className="rounded-[28px] border border-rayo-green/5 bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative shrink-0">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rayo-green text-white text-2xl font-semibold">
                          {profileLoading ? <Loader2 size={20} className="animate-spin" /> : initials}
                        </div>
                        <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-rayo-orange text-white shadow-md transition-all hover:scale-105">
                          <PenLine size={13} />
                        </button>
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-semibold text-rayo-green">
                            {profileLoading ? "Loading…" : `${firstName} ${lastName}`.trim() || "Your name"}
                          </h2>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-rayo-green/10 px-3 py-1 text-xs font-semibold text-rayo-green">
                            <Check size={11} />
                            Verified
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-rayo-green/60">{profileLoading ? " " : email}</p>
                        {phone && <p className="mt-0.5 text-sm text-rayo-green/50">{phone}</p>}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Personal info form */}
                <section className="rounded-[28px] border border-rayo-green/5 bg-white p-6 shadow-sm">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-rayo-green">Personal Information</h3>
                    <p className="mt-1 text-sm text-rayo-green/60">
                      Update your personal details and contact information.
                    </p>
                  </div>

                  {profileLoading ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-12 rounded-2xl bg-rayo-beige/60 animate-pulse" />
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-rayo-green">
                            First Name
                          </label>
                          <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="h-12 w-full rounded-2xl border border-rayo-green/10 bg-rayo-beige/30 px-4 text-rayo-green outline-none transition-all placeholder:text-rayo-green/40 focus:border-rayo-green/30 focus:ring-2 focus:ring-rayo-green/10"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-rayo-green">
                            Last Name
                          </label>
                          <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="h-12 w-full rounded-2xl border border-rayo-green/10 bg-rayo-beige/30 px-4 text-rayo-green outline-none transition-all focus:border-rayo-green/30 focus:ring-2 focus:ring-rayo-green/10"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-rayo-green">
                            Email Address
                          </label>
                          <div className="relative">
                            <input
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="h-12 w-full rounded-2xl border border-rayo-green/10 bg-rayo-beige/30 pl-10 pr-4 text-rayo-green outline-none transition-all focus:border-rayo-green/30 focus:ring-2 focus:ring-rayo-green/10"
                            />
                            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rayo-green/40" />
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-rayo-green">
                            Phone Number
                            <span className="text-[11px] font-normal text-rayo-green/40">(not saved yet)</span>
                          </label>
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+234 800 000 0000"
                            className="h-12 w-full rounded-2xl border border-rayo-green/10 bg-rayo-beige/30 px-4 text-rayo-green outline-none transition-all focus:border-rayo-green/30 focus:ring-2 focus:ring-rayo-green/10"
                          />
                        </div>

                        <div>
                          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-rayo-green">
                            Income Source
                            <span className="text-[11px] font-normal text-rayo-green/40">(not saved yet)</span>
                          </label>
                          <input
                            value={incomeSource}
                            onChange={(e) => setIncomeSource(e.target.value)}
                            placeholder="e.g. Salary"
                            className="h-12 w-full rounded-2xl border border-rayo-green/10 bg-rayo-beige/30 px-4 text-rayo-green outline-none transition-all focus:border-rayo-green/30 focus:ring-2 focus:ring-rayo-green/10"
                          />
                        </div>
                      </div>

                      {profileError && (
                        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                          {profileError}
                        </div>
                      )}

                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={handleProfileSave}
                          disabled={profileSaving}
                          className={cn(
                            "inline-flex h-11 items-center gap-2 rounded-2xl px-6 text-sm font-medium text-white transition-all disabled:opacity-60",
                            profileSaved ? "bg-rayo-green/70" : "bg-rayo-green hover:bg-rayo-green/90"
                          )}
                        >
                          {profileSaving ? (
                            <><Loader2 size={15} className="animate-spin" /> Saving...</>
                          ) : profileSaved ? (
                            <><Check size={15} /> Saved!</>
                          ) : "Save Changes"}
                        </button>
                      </div>
                    </>
                  )}
                </section>

                {/* KYC banner */}
                <section className="flex flex-col gap-4 rounded-[28px] border border-rayo-green/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rayo-green/10 text-rayo-green">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-rayo-green">KYC Identity Verification Complete</p>
                      <p className="mt-0.5 text-sm text-rayo-green/60">
                        Your identity has been verified. You have full access to all features.
                      </p>
                    </div>
                  </div>
                  <button className="shrink-0 text-sm font-semibold text-rayo-green transition-colors hover:text-rayo-orange">
                    View Documents
                  </button>
                </section>
              </>
            )}

            {/* ── SECURITY ── */}
            {activeSection === "security" && (
              <section className="rounded-[28px] border border-rayo-green/5 bg-white p-6 shadow-sm">
                <div className="mb-7 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rayo-green text-white">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-rayo-green">Security Preferences</h3>
                      <p className="text-sm text-rayo-green/60">
                        Manage your password and 2-step verification methods.
                      </p>
                    </div>
                  </div>
                  <ComingSoonBadge />
                </div>

                {/* 2FA */}
                <div className="mb-8 flex items-start justify-between gap-6 rounded-2xl border border-rayo-green/5 bg-rayo-beige/40 p-5 opacity-60">
                  <div>
                    <p className="font-semibold text-rayo-green">Two-Factor Authentication (2FA)</p>
                    <p className="mt-1 text-sm leading-relaxed text-rayo-green/60">
                      Add an extra layer of security to your account by requiring a code when signing in.
                    </p>
                  </div>
                  <button
                    disabled
                    title="Coming soon"
                    className={cn(
                      "relative mt-0.5 h-7 w-12 shrink-0 cursor-not-allowed rounded-full transition-all duration-300",
                      twoFactor ? "bg-rayo-green" : "bg-rayo-green/20"
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
                  <h4 className="mb-5 font-semibold text-rayo-green">Change Password</h4>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-rayo-green/50">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrent ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="h-12 w-full rounded-2xl border border-rayo-green/10 bg-rayo-beige/30 px-4 pr-12 text-rayo-green outline-none transition-all focus:border-rayo-green/30 focus:ring-2 focus:ring-rayo-green/10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrent((v) => !v)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-rayo-green/40"
                        >
                          {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-rayo-green/50">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNew ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="h-12 w-full rounded-2xl border border-rayo-green/10 bg-rayo-beige/30 px-4 pr-12 text-rayo-green outline-none transition-all focus:border-rayo-green/30 focus:ring-2 focus:ring-rayo-green/10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNew((v) => !v)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-rayo-green/40"
                          >
                            {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-rayo-green/50">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirm ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="h-12 w-full rounded-2xl border border-rayo-green/10 bg-rayo-beige/30 px-4 pr-12 text-rayo-green outline-none transition-all focus:border-rayo-green/30 focus:ring-2 focus:ring-rayo-green/10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirm((v) => !v)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-rayo-green/40"
                          >
                            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        {confirmPassword.length > 0 && confirmPassword !== newPassword && (
                          <p className="mt-1.5 text-xs text-red-500">Passwords don't match</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-3">
                    <p className="text-xs text-rayo-green/40">
                      Password changes will be enabled once the backend endpoint ships.
                    </p>
                    <button
                      disabled
                      title="Coming soon"
                      className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-2xl bg-rayo-green px-6 text-sm font-medium text-white opacity-50"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* ── NOTIFICATIONS ── */}
            {activeSection === "notifications" && (
              <section className="rounded-[28px] border border-rayo-green/5 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between gap-4 rounded-2xl border border-rayo-green/10 bg-rayo-beige/40 p-4">
                  <div>
                    <p className="font-medium text-rayo-green">Browser Notifications</p>
                    <p className="mt-0.5 text-sm text-rayo-green/60">
                      Get real-time alerts on this device, even when Rayo isn't open.
                    </p>
                    {pushError && <p className="mt-1 text-xs text-red-500">{pushError}</p>}
                  </div>
                  <button
                    onClick={handleEnablePush}
                    disabled={pushBusy || pushEnabled}
                    className="h-10 shrink-0 rounded-xl bg-rayo-green px-4 text-xs font-semibold text-white disabled:opacity-60"
                  >
                    {pushEnabled ? "Enabled" : pushBusy ? "Enabling…" : "Enable"}
                  </button>
                </div>

                <div className="space-y-3 opacity-60">
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
                        className="flex items-center justify-between gap-6 rounded-2xl border border-rayo-green/5 bg-rayo-beige/30 p-4"
                      >
                        <div>
                          <p className="font-medium text-rayo-green">{label}</p>
                          <p className="mt-0.5 text-sm text-rayo-green/60">{desc}</p>
                        </div>
                        <button
                          disabled
                          title="Coming soon"
                          className={cn(
                            "relative h-7 w-12 shrink-0 cursor-not-allowed rounded-full transition-all duration-300",
                            on ? "bg-rayo-green" : "bg-rayo-green/20"
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
              <section className="rounded-[28px] border border-rayo-green/5 bg-white p-6 shadow-sm">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rayo-green/5 text-rayo-green">
                    <BriefcaseBusiness size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-rayo-green">Budget Method</h3>
                    <p className="text-sm text-rayo-green/60">
                      Change how your spending and budgets are tracked.
                    </p>
                  </div>
                </div>

                <div className="mb-6 mt-4 rounded-2xl border border-rayo-orange/15 bg-rayo-orange/5 px-4 py-3 text-sm text-rayo-green/70">
                  Changing your budget method will affect how your categories and spending limits are calculated going forward. Existing transactions won't be affected.
                </div>

                {!budgetMethodLoaded ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-24 rounded-[20px] bg-rayo-beige/60 animate-pulse" />
                    ))}
                  </div>
                ) : (
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
                              ? "border-rayo-green bg-rayo-green text-white shadow-lg shadow-rayo-green/10"
                              : "border-rayo-green/10 hover:border-rayo-green/20 hover:bg-rayo-beige/40"
                          )}
                        >
                          <div className="flex items-start gap-4">
                            <div className={cn(
                              "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all",
                              active ? "bg-white/15" : "bg-rayo-green/5 text-rayo-green"
                            )}>
                              <Icon size={22} className={active ? "text-white" : ""} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className={cn(
                                  "font-semibold",
                                  active ? "text-white" : "text-rayo-green"
                                )}>
                                  {method.title}
                                </p>
                                <span className={cn(
                                  "rounded-full px-2 py-0.5 text-xs font-medium",
                                  active ? "bg-white/15 text-white" : "bg-rayo-orange/10 text-rayo-orange"
                                )}>
                                  {method.subtitle}
                                </span>
                              </div>
                              <p className={cn(
                                "mt-1 text-sm leading-relaxed",
                                active ? "text-white/80" : "text-rayo-green/60"
                              )}>
                                {method.description}
                              </p>
                            </div>

                            <div className={cn(
                              "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all",
                              active
                                ? "border-white bg-white"
                                : "border-rayo-green/20"
                            )}>
                              {active && <Check size={13} className="text-rayo-green" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {budgetError && (
                  <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {budgetError}
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleBudgetSave}
                    disabled={budgetSaving || !budgetMethodLoaded}
                    className={cn(
                      "inline-flex h-11 items-center gap-2 rounded-2xl px-6 text-sm font-medium text-white transition-all disabled:opacity-60",
                      budgetSaved ? "bg-rayo-green/70" : "bg-rayo-green hover:bg-rayo-green/90"
                    )}
                  >
                    {budgetSaving ? (
                      <><Loader2 size={15} className="animate-spin" /> Saving...</>
                    ) : budgetSaved ? (
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