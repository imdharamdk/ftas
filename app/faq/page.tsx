"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { faqItems } from "@/data/faq";

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(faqItems[0]?.id ?? "");

  const filteredFaqs = useMemo(() => {
    const term = query.toLowerCase();
    return faqItems.filter((faq) => {
      return (
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term) ||
        faq.category.toLowerCase().includes(term)
      );
    });
  }, [query]);

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Answers To Product, Pricing, Security, And Support Questions."
        description="Use the searchable FAQ to quickly find details on FTAS onboarding, plan selection, integrations, and operational models."
        actions={
          <Link href="/contact" className="holo-button holo-button-primary">
            Contact Support
          </Link>
        }
      />

      <section className="section-shell pt-4">
        <div className="glass-panel rounded-lg p-4">
          <div className="flex h-11 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3">
            <Search className="h-4 w-4 text-cyan-100/65" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search FAQ..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="grid gap-3">
          {filteredFaqs.map((faq) => {
            const expanded = activeId === faq.id;
            return (
              <article key={faq.id} className="premium-card p-5">
                <button
                  type="button"
                  onClick={() => setActiveId(expanded ? "" : faq.id)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <div>
                    <div className="text-xs font-semibold uppercase text-cyan-100/60">{faq.category}</div>
                    <h2 className="mt-2 text-lg font-semibold text-white">{faq.question}</h2>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-cyan-100/70 transition ${expanded ? "rotate-180" : ""}`} />
                </button>
                {expanded && <p className="mt-4 text-sm leading-7 text-slate-300">{faq.answer}</p>}
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="premium-card p-6 text-center sm:p-7">
          <HelpCircle className="mx-auto h-6 w-6 text-cyan-100" />
          <h2 className="mt-4 text-2xl font-semibold text-white">Need a custom answer for your use case?</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            FTAS can review your stack and share a tailored architecture and onboarding path.
          </p>
          <Link href="/contact#demo" className="holo-button holo-button-primary mt-5 inline-flex">
            Ask FTAS Team
          </Link>
        </div>
      </section>
    </>
  );
}
