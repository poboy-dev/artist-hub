import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { compositions } from "@/lib/site-data";
import sheetImg from "@/assets/sheet.jpg";

export const Route = createFileRoute("/compositions")({
  head: () => ({
    meta: [
      { title: "Compositions & Sheet Music — SOLARI" },
      { name: "description", content: "Official sheet music, lead sheets and full scores from the SOLARI catalogue." },
      { property: "og:title", content: "Compositions & Sheet Music — SOLARI" },
      { property: "og:description", content: "Sheet music and full scores." },
    ],
  }),
  component: CompositionsPage,
});

function CompositionsPage() {
  return (
    <>
      <PageHeader eyebrow="05 · Compositions" title="The Archive">
        Official sheet music and full scores. Available for study, performance, and licensing enquiries.
      </PageHeader>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[1fr_2fr]">
          <div className="relative">
            <img
              src={sheetImg}
              alt="Sheet music"
              width={800}
              height={1000}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div>
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-border pb-3 font-mono text-[10px] uppercase tracking-widest text-muted">
              <span>Title</span>
              <span className="hidden md:block">Key</span>
              <span className="hidden md:block">Pages</span>
              <span>Level</span>
            </div>
            {compositions.map((c) => (
              <div
                key={c.title}
                className="group grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-border py-6 transition-colors hover:bg-white/5"
              >
                <div>
                  <h3 className="text-lg font-bold group-hover:text-primary">{c.title}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted md:hidden">
                    {c.key} · {c.pages}pp
                  </p>
                </div>
                <span className="hidden font-mono text-xs text-muted md:block">{c.key}</span>
                <span className="hidden font-mono text-xs text-muted md:block">{c.pages}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  {c.difficulty}
                </span>
              </div>
            ))}

            <div className="mt-8 border border-border p-6">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-primary">
                Licensing
              </p>
              <p className="text-sm text-muted">
                For sync, cover, or educational licensing enquiries, contact management via
                the footer link.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
