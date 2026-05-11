"use client";

import { motion } from "framer-motion";

type LogoMarkProps = {
  compact?: boolean;
  animated?: boolean;
};

export function LogoMark({ compact = false, animated = true }: LogoMarkProps) {
  const size = compact ? "h-9 w-9" : "h-14 w-14";

  return (
    <div className="flex items-center gap-3">
      <motion.div
        animate={
          animated
            ? {
                boxShadow: [
                  "0 0 18px rgba(0, 231, 255, 0.22)",
                  "0 0 38px rgba(138, 92, 255, 0.34)",
                  "0 0 18px rgba(0, 231, 255, 0.22)",
                ],
              }
            : undefined
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className={`${size} relative grid place-items-center overflow-hidden rounded-lg border border-cyan-200/35 bg-black/45`}
      >
        <span className="absolute inset-0 fine-grid opacity-50" />
        <motion.span
          animate={animated ? { rotate: 360 } : undefined}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute h-3/4 w-3/4 border border-cyan-200/40"
          style={{ clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }}
        />
        <span className="absolute h-1/2 w-1/2 border border-violet-300/50" />
        <span className="relative text-sm font-black text-white sm:text-base">F</span>
        <span className="absolute bottom-1.5 left-1.5 h-1 w-5 bg-cyan-300 shadow-neon" />
        <span className="absolute right-1.5 top-1.5 h-5 w-1 bg-violet-300 shadow-plasma" />
      </motion.div>
      {!compact && (
        <div>
          <div className="text-xl font-semibold text-white">FTAS</div>
          <div className="text-xs text-cyan-100/75">Fintech Automated Solutions</div>
        </div>
      )}
    </div>
  );
}
