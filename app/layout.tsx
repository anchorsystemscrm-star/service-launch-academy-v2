import type { Metadata } from "next";

import "./globals.css";

import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Service Launch Academy",
  description: "Premium launch operating system for service businesses, powered by Anchor Systems."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="max-w-full overflow-x-hidden">
      <body className="min-h-screen max-w-full overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(83,180,255,0.14),transparent_24%),radial-gradient(circle_at_top_right,rgba(58,212,166,0.08),transparent_20%),linear-gradient(180deg,#060b14_0%,#08111e_38%,#070d17_100%)] text-white antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
