import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "border-cyan-200/30 bg-cyan-200/10 text-cyan-50",
        success: "border-signal/30 bg-signal/10 text-signal",
        warning: "border-amber-300/30 bg-amber-300/10 text-amber-100",
        danger: "border-rose-300/30 bg-rose-300/10 text-rose-100",
        neutral: "border-white/15 bg-white/5 text-slate-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
