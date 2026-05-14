"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { CalendarDays, CheckCircle2, Mail, MapPin, PhoneCall } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PageHero } from "@/components/PageHero";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  company: z.string().min(2, "Enter company name"),
  focus: z.string().min(5, "Describe your request"),
  meetingDate: z.string().min(1, "Select a date"),
  message: z.string().min(10, "Please share more details"),
  captcha: z.boolean().refine((value) => value, "Please confirm anti-spam check"),
});

type ContactValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request Demo, Book Discovery, And Start Your FTAS Onboarding."
        description="Submit your requirements, choose a preferred meeting date, and our team will share a tailored implementation path."
      />

      <section className="section-shell pt-4">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            <article className="glass-panel rounded-lg p-5">
              <h2 className="text-lg font-semibold text-white">Direct channels</h2>
              <div className="mt-4 grid gap-3 text-sm text-slate-200">
                <a href="mailto:contact@ftas.in" className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-3 py-2">
                  <Mail className="h-4 w-4 text-cyan-100" />
                  contact@ftas.in
                </a>
                <a href="tel:+910000000000" className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-3 py-2">
                  <PhoneCall className="h-4 w-4 text-cyan-100" />
                  +91 00000 00000
                </a>
                <div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-3 py-2">
                  <MapPin className="h-4 w-4 text-cyan-100" />
                  India - Digital-first delivery model
                </div>
              </div>
            </article>

            <article id="demo" className="glass-panel rounded-lg p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-50">
                <CalendarDays className="h-4 w-4" />
                Request demo flow
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Demo includes product walkthrough, architecture review, onboarding milestones, and fit assessment.
              </p>
              <Link href="/pricing" className="holo-button holo-button-secondary mt-4">
                Review Plans Before Demo
              </Link>
            </article>

            <article className="glass-panel rounded-lg p-5">
              <h2 className="text-lg font-semibold text-white">Location map</h2>
              <div className="mt-4 overflow-hidden rounded-lg border border-white/10">
                <iframe
                  title="FTAS map placeholder"
                  src="https://www.google.com/maps?q=India&output=embed"
                  className="h-64 w-full"
                  loading="lazy"
                />
              </div>
            </article>
          </div>

          <form
            className="glass-panel-strong rounded-lg p-6"
            onSubmit={handleSubmit(async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 650));
              toast.success(`Thank you ${values.name}. FTAS team will contact you soon.`);
              reset();
              setSelectedDate(undefined);
            })}
          >
            <h2 className="text-xl font-semibold text-white">Lead capture form</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Name" error={errors.name?.message}>
                <input {...register("name")} className="form-field" placeholder="Your name" />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input {...register("email")} className="form-field" placeholder="you@company.com" />
              </Field>
              <Field label="Company" error={errors.company?.message}>
                <input {...register("company")} className="form-field" placeholder="Company name" />
              </Field>
            </div>

            <Field label="Preferred meeting date" error={errors.meetingDate?.message} className="mt-4">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <input type="hidden" {...register("meetingDate")} />
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setValue("meetingDate", date ? date.toISOString().slice(0, 10) : "", {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
            </Field>

            <Field label="Project focus" error={errors.focus?.message} className="mt-4">
              <input {...register("focus")} className="form-field" placeholder="Automation, dashboard, cloud, subscription..." />
            </Field>

            <Field label="Message" error={errors.message?.message} className="mt-4">
              <textarea
                {...register("message")}
                className="form-field min-h-32 resize-none"
                placeholder="Tell us what you want to build."
              />
            </Field>

            <label className="mt-4 flex items-start gap-2 text-xs text-slate-300">
              <input type="checkbox" {...register("captcha")} className="mt-1 h-4 w-4 rounded border border-white/20 bg-white/5" />
              CAPTCHA placeholder: I confirm this request is submitted by a human.
            </label>
            {errors.captcha && <div className="mt-1 text-xs text-rose-300">{errors.captcha.message}</div>}

            <button type="submit" disabled={isSubmitting} className="holo-button holo-button-primary mt-5 w-full">
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>

            <div className="mt-4 inline-flex items-center gap-2 text-xs text-signal">
              <CheckCircle2 className="h-4 w-4" />
              Secure intake and response workflow enabled
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

function Field({ label, error, className, children }: FieldProps) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-semibold text-cyan-50">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-rose-300">{error}</span>}
    </label>
  );
}
