import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
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
    default: "FTAS - Fintech Automated Solutions",
    template: "%s | FTAS",
  },
  description:
    "FTAS is a premium fintech SaaS platform delivering AI-driven automation, cloud infrastructure, secure analytics, and enterprise digital operations.",
  keywords: [
    "FTAS",
    "Fintech Automated Solutions",
    "Fintech SaaS",
    "AI Platform",
    "Automation Platform",
    "AI Automation",
    "Cloud Infrastructure SaaS",
    "Digital Operations",
    "Enterprise Technology",
  ],
  openGraph: {
    title: "FTAS - Fintech Automated Solutions",
    description:
      "Premium fintech SaaS experience with AI workflows, automation, product analytics, and enterprise-ready cloud operations.",
    type: "website",
    url: "https://ftas.in",
    siteName: "FTAS",
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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
