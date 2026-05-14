import Link from "next/link";
import { Search } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { blogPosts } from "@/data/blog";
import { ecosystemDepartments } from "@/data/ecosystem";
import { services } from "@/data/content";
import { faqItems } from "@/data/faq";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const term = query.toLowerCase();

  const serviceResults = query
    ? services.filter(
        (service) =>
          service.title.toLowerCase().includes(term) ||
          service.description.toLowerCase().includes(term) ||
          service.signal.toLowerCase().includes(term),
      )
    : [];

  const blogResults = query
    ? blogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.tags.join(" ").toLowerCase().includes(term),
      )
    : [];

  const faqResults = query
    ? faqItems.filter(
        (item) =>
          item.question.toLowerCase().includes(term) ||
          item.answer.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term),
      )
    : [];

  const ecosystemResults = query
    ? ecosystemDepartments.filter(
        (department) =>
          department.name.toLowerCase().includes(term) ||
          department.designation.toLowerCase().includes(term) ||
          department.models.join(" ").toLowerCase().includes(term),
      )
    : [];

  return (
    <>
      <PageHero
        eyebrow="Search"
        title="Search Across Services, Blog, And FAQs."
        description="Find capabilities, documentation, updates, and support knowledge in one place."
      />

      <section className="section-shell pt-4">
        <div className="glass-panel rounded-lg p-5">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Search className="h-4 w-4 text-cyan-100/70" />
            Query: <span className="font-semibold text-cyan-50">{query || "No query provided"}</span>
          </div>
        </div>
      </section>

      <section className="section-shell pt-4">
        <SearchResultBlock
          title="Services"
          emptyText="No matching services."
          items={serviceResults.map((item) => ({
            label: item.title,
            detail: item.description,
            href: "/services",
          }))}
        />
        <SearchResultBlock
          title="Blog updates"
          emptyText="No matching blog posts."
          items={blogResults.map((item) => ({
            label: item.title,
            detail: item.excerpt,
            href: `/blog/${item.slug}`,
          }))}
        />
        <SearchResultBlock
          title="AI Departments"
          emptyText="No matching AI departments."
          items={ecosystemResults.map((item) => ({
            label: item.designation,
            detail: `${item.name} • Models: ${item.models.join(", ")}`,
            href: item.route,
          }))}
        />
        <SearchResultBlock
          title="FAQ"
          emptyText="No matching FAQ entries."
          items={faqResults.map((item) => ({
            label: item.question,
            detail: item.answer,
            href: "/faq",
          }))}
        />
      </section>
    </>
  );
}

type SearchBlockItem = {
  label: string;
  detail: string;
  href: string;
};

function SearchResultBlock({
  title,
  emptyText,
  items,
}: {
  title: string;
  emptyText: string;
  items: SearchBlockItem[];
}) {
  return (
    <article className="mb-4 rounded-lg border border-white/10 bg-white/[0.03] p-5">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-slate-400">{emptyText}</p>
      ) : (
        <div className="mt-3 grid gap-3">
          {items.map((item) => (
            <Link key={`${title}-${item.label}`} href={item.href} className="rounded-md border border-white/10 bg-white/5 p-3 hover:border-cyan-200/40">
              <div className="text-sm font-semibold text-white">{item.label}</div>
              <div className="mt-1 text-xs leading-6 text-slate-300">{item.detail}</div>
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
