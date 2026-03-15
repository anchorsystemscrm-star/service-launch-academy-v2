import type { Metadata } from "next";

import "./globals.css";

import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Service Launch Academy",
  description: "Premium launch operating system for service businesses, powered by Anchor Systems."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
