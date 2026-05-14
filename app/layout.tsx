import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import "react-day-picker/style.css";
import "highlight.js/styles/github-dark.css";
import "@xyflow/react/dist/style.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { AppShell } from "@/components/AppShell";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ftas.in"),
  title: {
    default: "FTAS AI Ecosystem - Fintech Automated Solutions",
    template: "%s | FTAS AI Ecosystem",
  },
  description:
    "FTAS AI Ecosystem is an enterprise multi-agent AI operating system for orchestration, automation, analytics, and fintech intelligence.",
  keywords: [
    "FTAS AI Ecosystem",
    "Fintech Automated Solutions",
    "Multi-Agent AI",
    "AI Orchestration Platform",
    "Enterprise AI Operating System",
    "AI Command Center",
    "Fintech Intelligence",
    "Workflow Automation",
  ],
  openGraph: {
    title: "FTAS AI Ecosystem",
    description:
      "Enterprise multi-agent AI platform with routing engine, admin controls, workflow orchestration, memory, safety, voice, OCR, and media departments.",
    type: "website",
    url: "https://ftas.in",
    siteName: "FTAS AI Ecosystem",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030508" },
    { media: "(prefers-color-scheme: light)", color: "#e9f7ff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
