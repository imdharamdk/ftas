"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, Clock3, Search, Share2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.toLowerCase();
    return blogPosts.filter((post) => {
      return (
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.tags.join(" ").toLowerCase().includes(term)
      );
    });
  }, [query]);

  return (
    <>
      <PageHero
        eyebrow="Blog / Updates"
        title="Product Updates, Automation Notes, And Fintech Infrastructure Insights."
        description="Follow FTAS release notes, case-style updates, and technical posts with syntax-highlighted snippets."
      />

      <section className="section-shell pt-4">
        <div className="glass-panel rounded-lg p-4">
          <div className="flex h-11 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3">
            <Search className="h-4 w-4 text-cyan-100/65" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search updates..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>
        </div>
      </section>

      <section className="section-shell pt-4">
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((post) => (
            <article key={post.slug} className="premium-card p-5">
              <div className="flex items-center gap-2 text-xs text-cyan-100/65">
                <CalendarDays className="h-4 w-4" />
                {post.publishedAt}
                <span className="mx-1">•</span>
                <Clock3 className="h-4 w-4" />
                {post.readTime}
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-white">
                <Link href={`/blog/${post.slug}`} className="hover:text-cyan-100">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <Link href={`/blog/${post.slug}`} className="holo-button holo-button-primary">
                  Read Update
                </Link>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://ftas.in/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/5 text-slate-200"
                    aria-label="Share on X"
                  >
                    <Share2 className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
