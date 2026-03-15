"use client";

import Image from "next/image";
import Link from "next/link";

type BrandBlockSize = "shell" | "login" | "compact";

interface BrandBlockProps {
  href?: string;
  size?: BrandBlockSize;
  currentLabel?: string;
  showPill?: boolean;
  className?: string;
}

const sizeClasses: Record<BrandBlockSize, { frame: string; image: number; title: string; subtitle: string; gap: string }> = {
  shell: {
    frame: "h-16 w-16 rounded-[22px]",
    image: 42,
    title: "text-base",
    subtitle: "text-xs",
    gap: "gap-4"
  },
  login: {
    frame: "h-20 w-20 rounded-[26px]",
    image: 54,
    title: "text-2xl sm:text-3xl",
    subtitle: "text-sm",
    gap: "gap-5"
  },
  compact: {
    frame: "h-12 w-12 rounded-[18px]",
    image: 30,
    title: "text-sm",
    subtitle: "text-[11px]",
    gap: "gap-3"
  }
};

export function BrandBlock({
  href,
  size = "shell",
  currentLabel,
  showPill = true,
  className = ""
}: BrandBlockProps) {
  const config = sizeClasses[size];
  const content = (
    <div className={`flex items-center ${config.gap}`}>
      <div className={`flex shrink-0 items-center justify-center border border-accent/25 bg-white/10 shadow-[0_12px_40px_rgba(4,12,24,0.28)] ${config.frame}`}>
        <Image
          src="/logo.png"
          alt="Anchor Systems logo"
          width={config.image}
          height={config.image}
          className="h-auto w-auto object-contain"
          priority={size !== "compact"}
        />
      </div>
      <div className="min-w-0">
        {showPill && (
          <p className={`font-semibold uppercase tracking-[0.18em] text-accent ${size === "login" ? "text-xs" : "text-[10px]"}`}>
            Powered by Anchor Systems
          </p>
        )}
        <p className={`truncate font-semibold text-white ${config.title}`}>Service Launch Academy</p>
        <p className={`truncate text-muted ${config.subtitle}`}>{currentLabel ?? "Launch operating system for service businesses"}</p>
      </div>
    </div>
  );

  if (!href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
