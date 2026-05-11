import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FTAS - Fintech Automated Solutions",
  description:
    "FTAS builds intelligent digital infrastructure through AI automation, web systems, cloud infrastructure, support, R&D, and digital transformation.",
  keywords: [
    "FTAS",
    "Fintech Automated Solutions",
    "AI Automation",
    "Web Development",
    "Cloud Infrastructure",
    "MSME Technology Company",
  ],
  openGraph: {
    title: "FTAS - Fintech Automated Solutions",
    description:
      "AI automation, digital infrastructure, web systems, cloud/server solutions, software support, and R&D for modern businesses.",
    type: "website",
    siteName: "FTAS",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#030508",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
