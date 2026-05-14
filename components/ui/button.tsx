"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40",
  {
    variants: {
      variant: {
        default:
          "border border-cyan-200/35 bg-cyan-200/15 text-cyan-50 shadow-neon hover:border-cyan-100/80 hover:bg-cyan-200/20",
        secondary:
          "border border-white/15 bg-white/5 text-slate-100 hover:border-violet-200/60 hover:bg-violet-300/10",
        ghost: "text-slate-200 hover:bg-white/10 hover:text-white",
        destructive: "border border-rose-400/40 bg-rose-500/20 text-rose-100 hover:bg-rose-500/30",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
