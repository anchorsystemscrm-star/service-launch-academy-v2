"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabaseClient";
import { clearAccessCookie } from "@/utils/storage";

const navItems = [
  { href: "/dashboard", label: "Businesses" },
  { href: "/blueprint", label: "My Blueprint" },
  { href: "/benchmarks", label: "Benchmarks" },
  { href: "/ai-coach", label: "AI Coach" }
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const currentLabel = useMemo(
    () => navItems.find((item) => pathname.startsWith(item.href))?.label ?? "Workspace",
    [pathname]
  );

  async function handleLogout() {
    setLoggingOut(true);

    try {
      if (isSupabaseConfigured()) {
        const supabase = getSupabaseBrowserClient();
        await supabase.auth.signOut();
      }
    } finally {
      clearAccessCookie();
      router.push("/login");
      router.refresh();
      setLoggingOut(false);
    }
  }

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-slate-950/75 backdrop-blur xl:block">
        <div className="flex h-full flex-col px-5 py-6">
          <Link href="/dashboard" className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-card transition hover:border-accent/40 hover:bg-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
                <Image src="/logo.png" alt="Anchor Systems logo" width={30} height={30} className="rounded-xl" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Service Launch Academy</p>
                <p className="text-xs text-muted">Powered by Anchor Systems</p>
              </div>
            </div>
          </Link>

          <nav className="mt-8 grid gap-2">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "border border-accent/60 bg-accent/10 text-white shadow-[inset_0_0_0_1px_rgba(83,180,255,0.18)]"
                      : "border border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold text-white">Launch Stack</p>
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

      <header className="fixed inset-x-0 top-0 z-50 border-b border-accent/10 bg-slate-950/75 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:pl-80">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 xl:hidden">
              <Image src="/logo.png" alt="Anchor Systems logo" width={28} height={28} className="rounded-xl" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">Service Launch Academy</p>
              <p className="text-xs text-muted">{currentLabel}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
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
      </header>

      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
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
