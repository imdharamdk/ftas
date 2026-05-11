"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "./LogoMark";

export function LoadingSequence() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1450);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="fixed inset-0 z-50 grid place-items-center bg-void"
        >
          <div className="absolute inset-0 background-grid opacity-40" />
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.04, opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="relative flex flex-col items-center gap-6"
          >
            <LogoMark animated />
            <div className="h-1 w-64 overflow-hidden rounded-md border border-cyan-200/20 bg-white/5">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.15, ease: "easeInOut" }}
                className="h-full w-2/3 bg-gradient-to-r from-transparent via-cyan-200 to-transparent"
              />
            </div>
            <div className="text-xs font-semibold uppercase text-cyan-100/70">
              Initializing intelligent infrastructure
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
