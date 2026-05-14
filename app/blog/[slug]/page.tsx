import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { PageHero } from "@/components/PageHero";
import { blogPosts } from "@/data/blog";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) notFound();

  return (
    <>
      <PageHero eyebrow={post.category} title={post.title} description={post.excerpt} />

      <section className="section-shell pt-4">
        <article className="glass-panel-strong rounded-lg p-6 sm:p-8">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-50">
            <ChevronLeft className="h-4 w-4" />
            Back to updates
          </Link>
          <div className="markdown-content max-w-none text-slate-200">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </section>

      <section className="section-shell pt-4">
        <div className="premium-card p-6 sm:p-7">
          <h2 className="text-2xl font-semibold text-white">Related updates</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {blogPosts
              .filter((entry) => entry.slug !== post.slug)
              .slice(0, 2)
              .map((entry) => (
                <Link key={entry.slug} href={`/blog/${entry.slug}`} className="rounded-lg border border-white/10 bg-white/5 p-4 hover:border-cyan-200/40">
                  <h3 className="text-lg font-semibold text-white">{entry.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{entry.excerpt}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}
