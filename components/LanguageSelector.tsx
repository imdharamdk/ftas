"use client";

import { useEffect, useState } from "react";
import { Languages } from "lucide-react";

const languageOptions = ["EN", "HI", "AR"] as const;
type Language = (typeof languageOptions)[number];
const storageKey = "ftas_language";

export function LanguageSelector() {
  const [language, setLanguage] = useState<Language>("EN");

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey) as Language | null;
    if (stored && languageOptions.includes(stored)) {
      setLanguage(stored);
      document.documentElement.lang = stored === "HI" ? "hi" : "en";
    }
  }, []);

  return (
    <label className="relative inline-flex h-10 items-center rounded-md border border-white/10 bg-white/5 pl-3 pr-2">
      <Languages className="h-4 w-4 text-slate-300" />
      <select
        aria-label="Language selector"
        value={language}
        onChange={(event) => {
          const nextLanguage = event.target.value as Language;
          setLanguage(nextLanguage);
          window.localStorage.setItem(storageKey, nextLanguage);
          document.documentElement.lang = nextLanguage === "HI" ? "hi" : "en";
        }}
        className="h-full bg-transparent px-2 text-xs font-semibold text-slate-200 outline-none"
      >
        {languageOptions.map((option) => (
          <option key={option} value={option} className="bg-[#041226] text-white">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
