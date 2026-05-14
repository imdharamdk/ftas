import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/command-center",
    "/organization-dashboard",
    "/workflow-visualizer",
    "/admin-panel",
    "/api-management",
    "/ai-chat-workspace",
    "/fintech-dashboard",
    "/ai-studio",
    "/voice-console",
    "/ocr-workspace",
    "/3d-studio",
    "/media-studio",
    "/knowledge-base",
    "/security-center",
    "/settings",
    "/about",
    "/services",
    "/features",
    "/dashboard",
    "/pricing",
    "/blog",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
    "/login",
    "/signup",
    "/forgot-password",
    "/profile",
    "/search",
  ].map((path) => ({
    url: `https://ftas.in${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `https://ftas.in/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
