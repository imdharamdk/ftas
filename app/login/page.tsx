"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import Link from "next/link";
import { LockKeyhole, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PageHero } from "@/components/PageHero";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "admin"]),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "user",
    },
  });

  return (
    <>
      <PageHero
        eyebrow="Authentication"
        title="Login To FTAS Platform"
        description="Access user or admin workflows, monitor analytics, and manage SaaS operations securely."
      />

      <section className="section-shell pt-4">
        <div className="mx-auto max-w-xl">
          <form
            className="glass-panel-strong rounded-lg p-6"
            onSubmit={handleSubmit(async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              toast.success(`Logged in as ${values.role}. Redirecting to dashboard preview.`);
            })}
          >
            <div className="mb-5 flex items-center gap-2 text-lg font-semibold text-white">
              <LockKeyhole className="h-5 w-5 text-cyan-100" />
              Secure login
            </div>
            <Field label="Email" error={errors.email?.message}>
              <input {...register("email")} className="form-field" placeholder="you@company.com" />
            </Field>
            <Field label="Password" error={errors.password?.message} className="mt-4">
              <input {...register("password")} type="password" className="form-field" placeholder="Password" />
            </Field>
            <Field label="Role" error={errors.role?.message} className="mt-4">
              <select {...register("role")} className="form-field">
                <option value="user" className="bg-[#041226]">
                  User
                </option>
                <option value="admin" className="bg-[#041226]">
                  Admin
                </option>
              </select>
            </Field>
            <button type="submit" disabled={isSubmitting} className="holo-button holo-button-primary mt-5 w-full">
              <LogIn className="h-4 w-4" />
              {isSubmitting ? "Authenticating..." : "Login"}
            </button>
            <div className="mt-4 flex flex-wrap justify-between gap-2 text-xs text-slate-300">
              <Link href="/forgot-password" className="hover:text-cyan-100">
                Forgot password?
              </Link>
              <Link href="/signup" className="hover:text-cyan-100">
                Create account
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
