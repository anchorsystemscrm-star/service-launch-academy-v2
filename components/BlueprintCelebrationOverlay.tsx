import Link from "next/link";

type CelebrationVariant = "week" | "blueprint";

interface CelebrationAction {
  label: string;
  onClick?: () => void;
  href?: string;
  primary?: boolean;
}

interface CelebrationStat {
  label: string;
  value: string;
}

interface BlueprintCelebrationOverlayProps {
  open: boolean;
  variant: CelebrationVariant;
  eyebrow: string;
  title: string;
  message: string;
  stats: CelebrationStat[];
  actions: CelebrationAction[];
}

const particlePositions = [
  { top: "14%", left: "22%", delay: "0ms" },
  { top: "22%", left: "72%", delay: "120ms" },
  { top: "38%", left: "14%", delay: "220ms" },
  { top: "32%", left: "82%", delay: "160ms" },
  { top: "64%", left: "18%", delay: "260ms" },
  { top: "58%", left: "78%", delay: "80ms" },
  { top: "78%", left: "32%", delay: "140ms" },
  { top: "74%", left: "70%", delay: "300ms" }
] as const;

export function BlueprintCelebrationOverlay({
  open,
  variant,
  eyebrow,
  title,
  message,
  stats,
  actions
}: BlueprintCelebrationOverlayProps) {
  if (!open) {
    return null;
  }

  const isBlueprint = variant === "blueprint";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(83,180,255,0.16),transparent_40%),rgba(3,8,18,0.86)] px-4 backdrop-blur-xl lg:hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl ${isBlueprint ? "animate-blueprint-overlay-glow-strong" : "animate-blueprint-overlay-glow"}`} />
        <div className={`absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accentSecondary/20 blur-3xl ${isBlueprint ? "animate-blueprint-overlay-glow" : "animate-blueprint-overlay-glow-soft"}`} />
        {particlePositions.map((particle, index) => (
          <span
            key={`${particle.top}-${particle.left}`}
            className={`absolute h-2 w-2 rounded-full bg-white/80 ${isBlueprint ? "animate-blueprint-celebration-particle-strong" : "animate-blueprint-celebration-particle"}`}
            style={{ top: particle.top, left: particle.left, animationDelay: particle.delay, opacity: 0 }}
          />
        ))}
        {Array.from({ length: isBlueprint ? 10 : 6 }).map((_, index) => (
          <span
            key={index}
            className={`absolute left-1/2 top-1/2 h-px w-20 origin-left bg-gradient-to-r from-white/70 to-transparent ${isBlueprint ? "animate-blueprint-celebration-ray-strong" : "animate-blueprint-celebration-ray"}`}
            style={{
              transform: `translate(-50%, -50%) rotate(${index * (360 / (isBlueprint ? 10 : 6))}deg)`,
              animationDelay: `${index * 70}ms`,
              opacity: 0
            }}
          />
        ))}
      </div>

      <div className={`relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-panel-gradient p-6 shadow-premium animate-blueprint-overlay-enter ${isBlueprint ? "sm:p-7" : ""}`}>
        <div className="relative">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/5">
            <div className={`flex h-14 w-14 items-center justify-center rounded-full border text-2xl text-white ${isBlueprint ? "border-accent/40 bg-accent/20 animate-blueprint-success-seal-strong" : "border-accentSecondary/40 bg-accentSecondary/20 animate-blueprint-success-seal"}`}>
              ✓
            </div>
          </div>

          <p className="mt-5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-accentSecondary">{eyebrow}</p>
          <h3 className="mt-3 text-center text-3xl font-semibold text-white">{title}</h3>
          <p className="mt-3 text-center text-sm leading-6 text-slate-200">{message}</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[22px] border border-white/10 bg-black/20 p-4 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{stat.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3">
            {actions.map((action) =>
              action.href ? (
                <Link
                  key={action.label}
                  href={action.href}
                  className={`inline-flex items-center justify-center rounded-[22px] px-4 py-3 text-sm font-semibold transition ${
                    action.primary
                      ? "border border-accent/50 bg-accent/10 text-white"
                      : "border border-white/10 bg-white/5 text-slate-100"
                  }`}
                >
                  {action.label}
                </Link>
              ) : (
                <button
                  key={action.label}
                  type="button"
                  onClick={action.onClick}
                  className={`inline-flex items-center justify-center rounded-[22px] px-4 py-3 text-sm font-semibold transition ${
                    action.primary
                      ? "border border-accent/50 bg-accent/10 text-white"
                      : "border border-white/10 bg-white/5 text-slate-100"
                  }`}
                >
                  {action.label}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
