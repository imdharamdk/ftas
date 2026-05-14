"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Search, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PageHero } from "@/components/PageHero";
import { services } from "@/data/content";

const leadSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  company: z.string().min(2, "Enter company name"),
  focus: z.string().min(5, "Describe your service focus"),
});

type LeadFormValues = z.infer<typeof leadSchema>;
const favoritesKey = "ftas_service_favorites";

export default function ServicesPage() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"signal" | "alpha">("signal");
  const [favorites, setFavorites] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
  });

  useEffect(() => {
    const stored = window.localStorage.getItem(favoritesKey);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const filteredServices = useMemo(() => {
    const searched = services.filter((service) => {
      const term = query.toLowerCase();
      return (
        service.title.toLowerCase().includes(term) ||
        service.description.toLowerCase().includes(term) ||
        service.signal.toLowerCase().includes(term)
      );
    });

    const sorted = [...searched];
    if (sortBy === "alpha") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      sorted.sort((a, b) => a.signal.localeCompare(b.signal));
    }
    return sorted;
  }, [query, sortBy]);

  const toggleFavorite = (title: string) => {
    setFavorites((current) => {
      const next = current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title];
      window.localStorage.setItem(favoritesKey, JSON.stringify(next));
      return next;
    });
  };

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Product Engineering, AI Automation, And Fintech Infrastructure Under One Roof."
        description="Search and filter service modules, save favorites, and submit your requirements for a solution blueprint."
        actions={
          <>
            <Link href="/pricing" className="holo-button holo-button-primary">
              Compare Plans
            </Link>
            <Link href="/contact#demo" className="holo-button holo-button-secondary">
              Request Demo
            </Link>
          </>
        }
      />

      <section className="section-shell pt-4">
        <div className="glass-panel rounded-lg p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex h-11 flex-1 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3">
              <Search className="h-4 w-4 text-cyan-100/65" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search service modules..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
            <label className="inline-flex h-11 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3">
              <span className="text-xs font-semibold text-slate-300">Sort</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as "signal" | "alpha")}
                className="bg-transparent text-sm text-white outline-none"
              >
                <option value="signal" className="bg-[#041226]">
                  Signal
                </option>
                <option value="alpha" className="bg-[#041226]">
                  Alphabetical
                </option>
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredServices.map((service) => {
            const isFavorite = favorites.includes(service.title);
            return (
              <article key={service.title} className="premium-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-lg border border-cyan-200/25 bg-cyan-200/10 text-cyan-100 shadow-neon">
                    <service.Icon className="h-6 w-6" />
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(service.title)}
                    className={`grid h-9 w-9 place-items-center rounded-md border ${
                      isFavorite
                        ? "border-solar/50 bg-solar/20 text-solar"
                        : "border-white/10 bg-white/5 text-slate-300"
                    }`}
                    aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
                  >
                    <Star className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                  </button>
                </div>
                <span className="mt-5 inline-flex rounded-md border border-violet-200/20 bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-100">
                  {service.signal}
                </span>
                <h2 className="mt-4 text-2xl font-semibold text-white">{service.title}</h2>
                <p className="mt-3 leading-7 text-slate-300">{service.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="glass-panel-strong rounded-lg p-6 sm:p-8">
          <h2 className="display-title text-3xl font-semibold text-white">Lead Capture: Build Your Service Blueprint</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Share your requirements and FTAS will map a phased implementation plan with product, automation, and infrastructure milestones.
          </p>
          <form
            onSubmit={handleSubmit(async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 600));
              toast.success(`Thank you ${values.name}. FTAS will contact you shortly.`);
              reset();
            })}
            className="mt-6 grid gap-4 sm:grid-cols-2"
          >
            <FormField label="Name" error={errors.name?.message}>
              <input {...register("name")} className="form-field" placeholder="Your name" />
            </FormField>
            <FormField label="Email" error={errors.email?.message}>
              <input {...register("email")} className="form-field" placeholder="you@company.com" />
            </FormField>
            <FormField label="Company" error={errors.company?.message}>
              <input {...register("company")} className="form-field" placeholder="Company name" />
            </FormField>
            <FormField label="Service Focus" error={errors.focus?.message}>
              <input {...register("focus")} className="form-field" placeholder="Automation, dashboard, cloud..." />
            </FormField>
            <button type="submit" disabled={isSubmitting} className="holo-button holo-button-primary sm:col-span-2 sm:max-w-xs">
              Submit Requirements
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

type FormFieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-cyan-50">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-rose-300">{error}</span>}
    </label>
  );
}
