"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { BrandBlock } from "@/components/BrandBlock";
import {
  AccessProfile,
  getCheckoutHref,
  getPricingHref,
  getLockedCopy,
  hasTierAccess,
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
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const normalizedPathname = pathname ?? "";
  const coreCheckoutHref = getCheckoutHref("core");
  const currentLabel = navItems.find((item) => normalizedPathname.startsWith(item.href))?.label ?? "Workspace";

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

  useEffect(() => {
    const scroller = mobileNavRef.current;

    if (!scroller || typeof window === "undefined" || window.innerWidth >= 1024) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      if (scroller.scrollWidth > scroller.clientWidth + 12) {
        scroller.scrollTo({ left: 18, behavior: "smooth" });
      }
    }, 180);

    return () => window.clearTimeout(timeoutId);
  }, []);

  function renderNavItem(
    href: string,
    label: string,
    minTier: AccessProfile["tier"],
    compact = false
  ) {
    const active = normalizedPathname.startsWith(href);
    const enabled = hasTierAccess(profile.tier, minTier);
    const baseClass = compact
      ? "whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium"
      : "rounded-2xl px-4 py-3 text-sm font-medium";

    if (!enabled) {
      return (
        <button
          key={href}
          type="button"
          disabled
          title={getLockedCopy(minTier)}
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
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[19rem] lg:block">
        <div className="flex h-full flex-col border-r border-white/10 bg-slate-950/88 px-4 pb-5 pt-4 backdrop-blur">
          <div>
            <BrandBlock
              href="/dashboard"
              size="shell"
              currentLabel={currentLabel}
              className="block rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-4 py-3 shadow-card transition hover:border-accent/40 hover:bg-white/10"
            />
          </div>

          <div className="mt-5 rounded-[24px] border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Access Tier
            </p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                {tierLabels[profile.tier]}
              </span>
              <Link
                href="/dashboard"
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
              >
                Dashboard
              </Link>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">
              {tierDescriptions[profile.tier]}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href={getPricingHref()}
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
              >
                Compare Plans
              </Link>

              {profile.tier === "preview" && (
                <a
                  href={coreCheckoutHref}
                  className="inline-flex items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/20"
                >
                  Upgrade to Core
                </a>
              )}
            </div>
          </div>

          <nav className="mt-5 grid gap-2">
            {navItems.map((item) => renderNavItem(item.href, item.label, item.minTier))}
          </nav>

          <div className="mt-auto rounded-[24px] border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold text-white">Anchor Systems</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Pipeline, follow-up automation, scheduling, invoicing, and review requests in one
              premium operating layer.
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

      <header className="fixed left-0 right-0 top-0 z-50 lg:left-[19rem]">
        <div className="border-b border-accent/10 bg-slate-950/88 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <BrandBlock
                href="/dashboard"
                size="compact"
                currentLabel={currentLabel}
                className="block lg:hidden"
              />
              <div className="hidden min-w-0 lg:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                  Anchor Systems Workspace
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-white">{currentLabel}</p>
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
        </div>

        <div className="border-t border-white/5 bg-slate-950/88 px-4 pb-3 pt-2 backdrop-blur lg:hidden">
          <div className="relative">
            <div
              ref={mobileNavRef}
              className="flex flex-nowrap gap-2 overflow-x-auto scroll-smooth pb-1 pr-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
            {navItems.map((item) => renderNavItem(item.href, item.label, item.minTier, true))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex w-14 items-center justify-end bg-gradient-to-l from-slate-950/95 via-slate-950/78 to-transparent">
              <span className="pr-2 text-base text-slate-300/80">→</span>
            </div>
          </div>
        </div>
      </header>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="pointer-events-auto w-full max-w-2xl rounded-[28px] border border-accent/30 bg-panel-gradient p-6 shadow-premium"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Run This on Anchor Systems</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                  Anchor Systems is the CRM layer for this playbook. It helps operators capture
                  leads, automate follow-up, schedule work, and send invoices without juggling
                  multiple tools.
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
                <div
                  key={point}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200"
                >
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
