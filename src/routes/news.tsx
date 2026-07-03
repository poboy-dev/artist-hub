import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { news, formatDate } from "@/lib/site-data";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — SOLARI" },
      { name: "description", content: "Tour announcements, album drops, presale info and updates from SOLARI." },
      { property: "og:title", content: "News — SOLARI" },
      { property: "og:description", content: "Tour announcements, album drops and updates." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <>
      <PageHeader eyebrow="03 · News" title="Dispatch">
        Tour announcements, album drops, presale info and behind-the-scenes updates.
      </PageHeader>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          {news.map((n) => (
            <article
              key={n.slug}
              className="border-t border-border py-12 last:border-b"
            >
              <div className="mb-6 flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest">
                <span className="text-muted">{formatDate(n.date)}</span>
                <span className="border border-primary px-2 py-1 text-primary">{n.tag}</span>
              </div>
              <h2 className="mb-4 font-display text-4xl uppercase tracking-tighter md:text-5xl">
                {n.title}
              </h2>
              <p className="max-w-2xl leading-relaxed text-muted">{n.excerpt}</p>
              <a
                href="#"
                className="mt-6 inline-block border-b border-primary pb-1 text-xs font-bold uppercase tracking-widest text-primary"
              >
                Read more →
              </a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
