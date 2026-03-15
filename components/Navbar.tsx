"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { BrandBlock } from "@/components/BrandBlock";
import {
  AccessProfile,
  getPricingHref,
  getLockedCopy,
  hasTierAccess,
  isSetupComplete,
  navItems,
  tierDescriptions,
  tierLabels
} from "@/utils/access";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabaseClient";
import { clearAccessCookie } from "@/utils/storage";

interface NavbarProps {
  profile: AccessProfile;
}

export function Navbar({ profile }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const setupComplete = isSetupComplete(profile);
  const currentLabel = useMemo(() => {
    if (pathname.startsWith("/start")) {
      return "Get Started";
    }
    return navItems.find((item) => pathname.startsWith(item.href))?.label ?? "Workspace";
  }, [pathname]);

  async function handleLogout() {
    setLoggingOut(true);

    try {
      if (isSupabaseConfigured()) {
        const supabase = getSupabaseBrowserClient();
        await supabase.auth.signOut();
      }
    } finally {
      clearAccessCookie();
      router.replace("/login");
      router.refresh();
      setLoggingOut(false);
    }
  }

  function renderNavItem(href: string, label: string, minTier: AccessProfile["tier"], compact = false) {
    const active = pathname.startsWith(href);
    const enabled = setupComplete && hasTierAccess(profile.tier, minTier);
    const baseClass = compact
      ? "rounded-xl px-3 py-2 text-sm font-medium"
      : "rounded-2xl px-4 py-3 text-sm font-medium";

    if (!enabled) {
      return (
        <button
          key={href}
          type="button"
          disabled
          title={!setupComplete ? "Complete setup first" : getLockedCopy(minTier)}
          className={`${baseClass} cursor-not-allowed border border-white/10 bg-white/5 text-slate-500`}
        >
          {label}
        </button>
      );
    }

    return (
      <Link
        key={href}
        href={href}
        className={`${baseClass} transition ${
          active
            ? "border border-accent/60 bg-accent/10 text-white shadow-[inset_0_0_0_1px_rgba(83,180,255,0.18)]"
            : "border border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
        }`}
      >
        {label}
      </Link>
    );
  }

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[20rem] border-r border-white/10 bg-slate-950/88 backdrop-blur lg:block">
        <div className="flex h-full flex-col px-5 pb-6 pt-8">
          <div className="px-1">
            <BrandBlock
              href={setupComplete ? "/dashboard" : "/start"}
              size="shell"
              currentLabel={currentLabel}
              className="block rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-5 py-5 shadow-card transition hover:border-accent/40 hover:bg-white/10"
            />
          </div>

          <div className="mt-7 rounded-[28px] border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Access Tier</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                {tierLabels[profile.tier]}
              </span>
              <Link
                href="/start"
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
              >
                {setupComplete ? "Adjust setup" : "Finish setup"}
              </Link>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              {setupComplete ? tierDescriptions[profile.tier] : "Complete setup to choose a business before entering the workspace."}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href={getPricingHref()}
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
              >
                Compare Plans
              </Link>
              {profile.tier === "preview" && (
                <Link
                  href={getPricingHref("core")}
                  className="inline-flex items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/20"
                >
                  Upgrade to Core
                </Link>
              )}
            </div>
          </div>

          <nav className="mt-7 grid gap-2">
            <Link
              href="/start"
              className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                pathname.startsWith("/start")
                  ? "border border-accent/60 bg-accent/10 text-white shadow-[inset_0_0_0_1px_rgba(83,180,255,0.18)]"
                  : "border border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
              }`}
            >
              Get Started
            </Link>
            {navItems.map((item) => renderNavItem(item.href, item.label, item.minTier))}
          </nav>

          <div className="mt-auto rounded-[28px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white">Anchor Systems</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Pipeline, follow-up automation, scheduling, invoicing, and review requests in one premium operating layer.
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-4 w-full rounded-xl border border-accentSecondary/40 bg-accentSecondary/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accentSecondary/70 hover:bg-accentSecondary/15"
            >
              Run this on Anchor Systems
            </button>
          </div>
        </div>
      </aside>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-accent/10 bg-slate-950/88 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:pl-[22rem] lg:pr-8">
          <div className="flex min-w-0 items-center gap-3">
            <BrandBlock
              href={setupComplete ? "/dashboard" : "/start"}
              size="compact"
              currentLabel={currentLabel}
              className="block lg:hidden"
            />
            <div className="hidden min-w-0 lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Anchor Systems Workspace</p>
              <p className="mt-1 truncate text-base font-semibold text-white">{currentLabel}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 sm:inline-flex">
              {tierLabels[profile.tier]}
            </span>
            <Link
              href={getPricingHref()}
              className="hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 sm:inline-flex"
            >
              Pricing
            </Link>
            <Link
              href="/start"
              className="hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 sm:inline-flex"
            >
              Setup
            </Link>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="hidden rounded-xl border border-accentSecondary/40 bg-accentSecondary/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-accentSecondary/70 hover:bg-accentSecondary/15 sm:inline-flex"
            >
              Anchor Systems
            </button>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>

        <div className="border-t border-white/5 px-4 pb-3 pt-2 lg:hidden">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <Link
              href="/start"
              className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition ${
                pathname.startsWith("/start")
                  ? "border border-accent/60 bg-accent/10 text-white"
                  : "border border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              Get Started
            </Link>
            {navItems.map((item) => renderNavItem(item.href, item.label, item.minTier, true))}
          </div>
        </div>
      </header>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-[28px] border border-accent/30 bg-panel-gradient p-6 shadow-premium"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Run This on Anchor Systems</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                  Anchor Systems is the CRM layer for this playbook. It helps operators capture leads, automate follow-up,
                  schedule work, and send invoices without juggling multiple tools.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-white transition hover:border-white/20 hover:bg-white/10"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Pipeline management for every lead and quote",
                "Missed-call text-back so opportunities are not lost",
                "Automated follow-up reminders and nurture sequences",
                "Calendar scheduling with confirmations and reminders",
                "Invoices, payment tracking, and review request workflows",
                "A clean operating system for launch-stage service teams"
              ].map((point) => (
                <div key={point} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
