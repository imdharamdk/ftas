"use client";

import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  Icon: LucideIcon;
  align?: "left" | "center";
  className?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  copy,
  Icon,
  align = "left",
  className = "",
}: SectionIntroProps) {
  const centered = align === "center";

  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} ${className}`}>
      <div className={`section-kicker ${centered ? "mx-auto" : ""}`}>
        <Icon className="h-4 w-4" />
        {eyebrow}
      </div>
      <h2 className={`section-title ${centered ? "mx-auto" : ""}`}>{title}</h2>
      <p className={`section-copy ${centered ? "mx-auto" : ""}`}>{copy}</p>
    </Reveal>
  );
}
