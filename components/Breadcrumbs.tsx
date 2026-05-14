"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const labelMap: Record<string, string> = {
  about: "About Us",
  services: "Services",
  features: "Features",
  dashboard: "Dashboard",
  pricing: "Pricing",
  blog: "Blog",
  contact: "Contact",
  faq: "FAQ",
  privacy: "Privacy Policy",
  terms: "Terms & Conditions",
  login: "Login",
  signup: "Signup",
  "forgot-password": "Forgot Password",
  profile: "Profile",
  search: "Search",
  "command-center": "AI Command Center",
  "organization-dashboard": "Organization Dashboard",
  "workflow-visualizer": "AI Workflow Visualizer",
  "admin-panel": "Admin Panel",
  "api-management": "API Management",
  "ai-chat-workspace": "AI Chat Workspace",
  "fintech-dashboard": "Fintech Dashboard",
  "ai-studio": "AI Studio",
  "voice-console": "Voice Console",
  "ocr-workspace": "OCR Workspace",
  "3d-studio": "3D Studio",
  "media-studio": "Media Studio",
  "knowledge-base": "Knowledge Base",
  "security-center": "Security Center",
  settings: "Settings",
};

export function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    return {
      href,
      label:
        labelMap[segment] ??
        segment
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" "),
    };
  });

  return (
    <div className="section-shell pb-0 pt-2">
      <nav
        aria-label="Breadcrumb"
        className="glass-panel inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs text-slate-300"
      >
        <Link href="/" className="transition hover:text-white">
          Home
        </Link>
        {crumbs.map((crumb, index) => (
          <span key={crumb.href} className="inline-flex items-center gap-2">
            <ChevronRight className="h-3.5 w-3.5 text-cyan-100/45" />
            {index === crumbs.length - 1 ? (
              <span className="font-semibold text-cyan-50">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="transition hover:text-white">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}
