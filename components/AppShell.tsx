"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { AIAssistantWidget } from "./AIAssistantWidget";
import { BackgroundSystem } from "./BackgroundSystem";
import { Breadcrumbs } from "./Breadcrumbs";
import { CursorSystem } from "./CursorSystem";
import { Footer } from "./Footer";
import { LoadingSequence } from "./LoadingSequence";
import { MotionDirector } from "./MotionDirector";
import { Navigation } from "./Navigation";
import { QuickActions } from "./QuickActions";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <>
      <LoadingSequence />
      <MotionDirector />
      <CursorSystem />
      <BackgroundSystem />
      <Navigation />
      <main className="relative z-10 min-h-screen pt-24 sm:pt-28">
        {pathname !== "/" && <Breadcrumbs />}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20, filter: "blur(7px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(7px)" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <QuickActions />
      <AIAssistantWidget />
    </>
  );
}
