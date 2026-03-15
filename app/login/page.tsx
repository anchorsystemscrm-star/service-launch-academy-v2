```tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabaseClient";
import { setAccessCookie } from "@/utils/storage";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const configured = isSupabaseConfigured();

  useEffect(() => {
    if (!configured) return;

    const supabase = getSupabaseBrowserClient();

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.access_token) {
        setAccessCookie(data.session.access_token, data.session.expires_at);
        router.replace("/dashboard");
      }
    });
  }, [configured, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!configured) {
      setError("Supabase is not configured correctly.");
      return;
    }

    setLoading(true);

    try {
      const supabase = getSupabaseBrowserClient();

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (data.session?.access_token) {
        setAccessCookie(data.session.access_token, data.session.expires_at);
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateAccount() {
    setError(null);
    setSuccess(null);

    if (!configured) {
      setError("Supabase is not configured correctly.");
      return;
    }

    if (!email || !password) {
      setError("Enter your email and password first.");
      return;
    }

    setLoading(true);

    try {
      const supabase = getSupabaseBrowserClient();

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.session?.access_token) {
        setAccessCookie(data.session.access_token, data.session.expires_at);
        router.push("/dashboard");
        router.refresh();
        return;
      }

      setSuccess("Account created. Check your email to confirm your account, then sign in.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(83,180,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(58,212,166,0.12),transparent_30%)]" />

      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/60 shadow-premium backdrop-blur xl:grid-cols-[1.15fr_0.85fr]">
        <section className="border-b border-white/10 p-8 sm:p-10 xl:border-b-0 xl:border-r">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-accent/30 bg-accent/10">
              <Image
                src="/logo.png"
                alt="Anchor Systems logo"
                width={34}
                height={34}
                className="rounded-2xl"
              />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                Anchor Systems
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
                Service Launch Academy
              </h1>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              Launch with structure
            </p>
            <p className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
              A premium operating system for building a real service business in 90 days.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
              Choose a business model, work the weekly blueprint, benchmark your progress,
              and use the built-in AI coach to tighten pricing, follow-up, and delivery.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Business Models", value: "20+" },
              { label: "Weekly Milestones", value: "13" },
              { label: "Launch Horizon", value: "90 Days" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] border border-white/10 bg-white/5 p-5"
              >
                <p className="text-2xl font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-sm text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 sm:p-10">
          <div className="mx-auto w-full max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              Member Login
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Welcome back</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Sign in with your email and password to access your dashboard, blueprint,
              benchmarks, and AI coach.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-200">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="founder@example.com"
                  className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-accent/70 focus:ring-2 focus:ring-accent/20"
                  required
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-200">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-accent/70 focus:ring-2 focus:ring-accent/20"
                  required
                />
              </label>

              {error && (
                <p className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              )}

              {success && (
                <p className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                  {success}
                </p>
              )}

              <div className="grid gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl border border-accent/40 bg-accent/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/15 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Processing..." : "Sign in"}
                </button>

                <button
                  type="button"
                  onClick={handleCreateAccount}
                  disabled={loading}
                  className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Processing..." : "Create Account"}
                </button>
              </div>
            </form>

            {!configured && (
              <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-white">Supabase setup</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Configure{" "}
                  <code className="rounded bg-black/20 px-1.5 py-0.5">
                    NEXT_PUBLIC_SUPABASE_URL
                  </code>{" "}
                  and{" "}
                  <code className="rounded bg-black/20 px-1.5 py-0.5">
                    NEXT_PUBLIC_SUPABASE_ANON_KEY
                  </code>{" "}
                  in Vercel and your local environment for email/password authentication.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
```
