import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { merch } from "@/lib/site-data";
import { useState } from "react";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "Official Store — SOLARI" },
      { name: "description", content: "Official SOLARI merch. Apparel, vinyl, accessories, limited edition box sets and album-specific drops." },
      { property: "og:title", content: "Official Store — SOLARI" },
      { property: "og:description", content: "Apparel, vinyl, accessories and limited edition drops." },
    ],
  }),
  component: StorePage,
});

function StorePage() {
  const [cat, setCat] = useState("All");
  const cats = ["All", "Our Favourites", "Apparel", "Vinyl", "Accessories", "Prints", "Collectibles"];
  const filtered =
    cat === "All" || cat === "Our Favourites"
      ? merch
      : merch.filter((m) => m.tag === cat);

  return (
    <>
      <PageHeader eyebrow="06 · Store" title="Official Store">
        Apparel, vinyl, accessories and limited edition drops. Ships worldwide.
      </PageHeader>

      <section className="border-b border-border px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                cat === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {filtered.map((m) => (
              <div key={m.name} className="group cursor-pointer">
                <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-neutral-900">
                  <img
                    src={m.cover}
                    alt={m.name}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 bg-background/80 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-primary">
                    {m.tag}
                  </span>
                </div>
                <h3 className="mb-1 text-sm font-bold">{m.name}</h3>
                <p className="font-mono text-xs text-muted">{m.price}</p>
                <button className="mt-3 w-full border border-border py-2 text-[10px] font-bold uppercase tracking-widest transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
