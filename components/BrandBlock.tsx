import Link from "next/link";
import Image from "next/image";

interface BrandBlockProps {
  href: string;
  currentLabel?: string;
  size?: "shell" | "compact";
  className?: string;
}

export function BrandBlock({
  href,
  currentLabel = "Workspace",
  size = "shell",
  className = ""
}: BrandBlockProps) {
  const isShell = size === "shell";

  return (
    <Link href={href} className={className}>
      <div className={`flex items-center gap-3 ${isShell ? "min-h-[60px]" : "min-h-[44px]"}`}>
        <div className="relative shrink-0">
          <Image
            src="/anchor-logo.png"
            alt="Anchor Systems logo"
            width={isShell ? 44 : 32}
            height={isShell ? 44 : 32}
            className={`${isShell ? "h-11 w-11" : "h-8 w-8"} object-contain`}
            priority
          />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Powered by Anchor Systems
          </p>
          <p className={`${isShell ? "text-sm" : "text-xs"} truncate font-semibold text-white`}>
            Service Launch Academy
          </p>
          {isShell && (
            <p className="mt-0.5 truncate text-xs text-slate-400">
              {currentLabel}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
