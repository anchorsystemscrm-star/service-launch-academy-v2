"use client";

import { PropsWithChildren, useEffect } from "react";
import { usePathname } from "next/navigation";

import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabaseClient";
import { clearAccessCookie, setAccessCookie } from "@/utils/storage";

import { Navbar } from "./Navbar";

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return;
    }

    const supabase = getSupabaseBrowserClient();

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (data.session?.access_token) {
          setAccessCookie(data.session.access_token, data.session.expires_at);
        } else {
          clearAccessCookie();
        }
      })
      .catch(() => {
        clearAccessCookie();
      });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.access_token) {
        setAccessCookie(session.access_token, session.expires_at);
      } else {
        clearAccessCookie();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      {!isLoginPage && <Navbar />}
      <main className={isLoginPage ? "min-h-screen" : "min-h-screen lg:pl-72"}>
        <div className={isLoginPage ? "" : "px-4 pb-8 pt-24 sm:px-6 lg:px-8"}>{children}</div>
      </main>
    </>
  );
}
