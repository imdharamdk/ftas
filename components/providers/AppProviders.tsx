"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          style: {
            border: "1px solid rgba(0, 231, 255, 0.2)",
            background: "rgba(4, 10, 20, 0.9)",
            color: "#ecfeff",
          },
        }}
      />
    </ThemeProvider>
  );
}
