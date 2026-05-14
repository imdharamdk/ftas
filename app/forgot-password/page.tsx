"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PageHero } from "@/components/PageHero";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
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
        title="Forgot Password"
        description="Submit your email and FTAS will trigger a secure password reset workflow."
      />

      <section className="section-shell pt-4">
        <div className="mx-auto max-w-xl">
          <form
            className="glass-panel-strong rounded-lg p-6"
            onSubmit={handleSubmit(async (values) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              toast.success(`Password reset link sent to ${values.email}.`);
              reset();
            })}
          >
            <div className="mb-5 flex items-center gap-2 text-lg font-semibold text-white">
              <KeyRound className="h-5 w-5 text-cyan-100" />
              Reset request
            </div>
            <label>
              <span className="mb-2 block text-sm font-semibold text-cyan-50">Email</span>
              <input {...register("email")} className="form-field" placeholder="you@company.com" />
              {errors.email && <span className="mt-1 block text-xs text-rose-300">{errors.email.message}</span>}
            </label>
            <button type="submit" disabled={isSubmitting} className="holo-button holo-button-primary mt-5 w-full">
              {isSubmitting ? "Sending reset..." : "Send Reset Link"}
            </button>
            <div className="mt-4 text-xs text-slate-300">
              Back to{" "}
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
