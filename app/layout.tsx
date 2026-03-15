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
      <body className="min-h-screen bg-background text-white antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
