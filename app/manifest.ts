import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FTAS AI Ecosystem",
    short_name: "FTAS AI",
    description: "Enterprise multi-agent AI operating system for orchestration, fintech intelligence, and department-level automation.",
    start_url: "/",
    display: "standalone",
    background_color: "#030508",
    theme_color: "#030508",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
