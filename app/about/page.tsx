import Link from "next/link";
import { Building2, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { timeline, valuePillars } from "@/data/content";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About FTAS"
        title="Engineering High-Trust Fintech Systems With Product Discipline."
        description="FTAS (Fintech Automated Solutions) is an MSME technology company focused on AI automation, enterprise-grade infrastructure, and scalable SaaS execution."
        actions={
          <>
            <Link href="/services" className="holo-button holo-button-primary">
              Explore Services
            </Link>
            <Link href="/contact#demo" className="holo-button holo-button-secondary">
              Request Demo
            </Link>
          </>
        }
      />

      <section className="section-shell pt-4">
        <div className="grid gap-4 lg:grid-cols-3">
          {valuePillars.map((pillar) => (
            <article key={pillar.title} className="premium-card p-5">
              <div className="grid h-11 w-11 place-items-center rounded-lg border border-cyan-200/25 bg-cyan-200/10 text-cyan-100">
                <pillar.Icon className="h-5 w-5" />
              </div>
              <div className="hud-label mt-4">{pillar.meta}</div>
              <h2 className="mt-4 text-xl font-semibold text-white">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="glass-panel-strong rounded-lg p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="section-kicker">
                <Building2 className="h-4 w-4" />
                Company timeline
              </div>
              <h2 className="display-title mt-5 text-3xl font-semibold text-white sm:text-4xl">
                Built as an innovation lab, operated like a production partner.
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-md border border-signal/25 bg-signal/10 px-3 py-2 text-xs font-semibold text-signal">
              <ShieldCheck className="h-4 w-4" />
              Enterprise-ready posture
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {timeline.map((item) => (
              <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-md border border-cyan-200/25 bg-cyan-200/10 text-sm font-black text-cyan-50">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="premium-card p-6 text-center sm:p-9">
          <Sparkles className="mx-auto h-6 w-6 text-cyan-100" />
          <h2 className="display-title mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Need a long-term fintech technology partner?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            FTAS can own architecture, delivery, and platform operations so your team can focus on product and growth.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/contact#demo" className="holo-button holo-button-primary">
              Start With A Discovery Call
            </Link>
            <Link href="/pricing" className="holo-button holo-button-secondary">
              Review Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
