"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PageHero } from "@/components/PageHero";

const schema = z
  .object({
    fullName: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email"),
    company: z.string().min(2, "Enter company name"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <PageHero
        eyebrow="Authentication"
        title="Create Your FTAS Workspace"
        description="Set up account access for your fintech team and start onboarding your platform workflows."
      />

      <section className="section-shell pt-4">
        <div className="mx-auto max-w-xl">
          <form
            className="glass-panel-strong rounded-lg p-6"
            onSubmit={handleSubmit(async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 650));
              toast.success(`Workspace created for ${values.company}.`);
              reset();
            })}
          >
            <div className="mb-5 flex items-center gap-2 text-lg font-semibold text-white">
              <UserPlus className="h-5 w-5 text-cyan-100" />
              Signup flow
            </div>
            <Field label="Full name" error={errors.fullName?.message}>
              <input {...register("fullName")} className="form-field" placeholder="Your name" />
            </Field>
            <Field label="Email" error={errors.email?.message} className="mt-4">
              <input {...register("email")} className="form-field" placeholder="you@company.com" />
            </Field>
            <Field label="Company" error={errors.company?.message} className="mt-4">
              <input {...register("company")} className="form-field" placeholder="Company name" />
            </Field>
            <Field label="Password" error={errors.password?.message} className="mt-4">
              <input {...register("password")} type="password" className="form-field" placeholder="Create password" />
            </Field>
            <Field label="Confirm password" error={errors.confirmPassword?.message} className="mt-4">
              <input
                {...register("confirmPassword")}
                type="password"
                className="form-field"
                placeholder="Confirm password"
              />
            </Field>
            <button type="submit" disabled={isSubmitting} className="holo-button holo-button-primary mt-5 w-full">
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
            <div className="mt-4 text-xs text-slate-300">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-cyan-100">
                Login
              </Link>
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
    <label className={`block ${className ?? ""}`}>
      <span className="mb-2 block text-sm font-semibold text-cyan-50">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-rose-300">{error}</span>}
    </label>
  );
}
