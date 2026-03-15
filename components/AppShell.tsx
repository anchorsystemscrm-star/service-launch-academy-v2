"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabaseClient";
import { canAccessPath, getFirstAvailableAppPath } from "@/utils/access";
import { clearAccessCookie, readClientAccessProfile, setAccessCookie, syncTierFromSession, useAccessProfile } from "@/utils/storage";

import { Navbar } from "./Navbar";

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();
  const { hydrated, profile } = useAccessProfile();
  const [sessionResolved, setSessionResolved] = useState(!isSupabaseConfigured());
  const isLoginPage = pathname === "/login";

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setSessionResolved(true);
      return;
    }

    const supabase = getSupabaseBrowserClient();
    let active = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) {
          return;
        }

        if (data.session?.access_token) {
          setAccessCookie(data.session.access_token, data.session.expires_at);
          syncTierFromSession(data.session);
        } else {
          clearAccessCookie();
          if (!isLoginPage) {
            router.replace("/login");
          }
        }

        setSessionResolved(true);
      })
      .catch(() => {
        clearAccessCookie();
        setSessionResolved(true);
        if (!isLoginPage) {
          router.replace("/login");
        }
      });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token) {
        setAccessCookie(session.access_token, session.expires_at);
        syncTierFromSession(session);
      } else {
        clearAccessCookie();
      }

      if (event === "SIGNED_OUT") {
        router.replace("/login");
        router.refresh();
      }

      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        const nextProfile = readClientAccessProfile();
        if (pathname === "/login") {
          router.replace(getFirstAvailableAppPath(nextProfile));
        }
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [isLoginPage, pathname, router]);

  useEffect(() => {
    if (!sessionResolved || !hydrated || isLoginPage) {
      return;
    }

    if (!canAccessPath(pathname, profile)) {
      router.replace(getFirstAvailableAppPath(profile));
    }
  }, [hydrated, isLoginPage, pathname, profile, router, sessionResolved]);

  if (!isLoginPage && (!sessionResolved || !hydrated)) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-lg rounded-[28px] border border-white/10 bg-panel-gradient p-8 text-center shadow-premium">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Service Launch Academy</p>
          <h1 className="mt-4 text-2xl font-semibold text-white">Loading your workspace</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Validating your session, onboarding state, and tier access before the app shell mounts.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      {!isLoginPage && <Navbar profile={profile} />}
      <main className={isLoginPage ? "min-h-screen" : "min-h-screen lg:pl-[20rem]"}>
        <div className={isLoginPage ? "" : "px-4 pb-12 pt-40 sm:px-6 lg:px-8 lg:pt-32"}>{children}</div>
      </main>
    </>
  );
}
