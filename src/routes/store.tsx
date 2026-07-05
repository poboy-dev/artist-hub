import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";
import { getPublicMerch } from "@/lib/public-data.functions";
import { getMerchCover } from "@/lib/db-images";
import { queryOptions } from "@tanstack/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

const merchQueryOptions = () =>
  queryOptions({
    queryKey: ["public", "merch"],
    queryFn: () => getPublicMerch(),
  });

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "Store — SOLARI" },
      { name: "description", content: "Official SOLARI merchandise, vinyl, apparel and limited collectibles." },
      { property: "og:title", content: "Store — SOLARI" },
      { property: "og:description", content: "Official merch and vinyl." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(merchQueryOptions()),
  component: StorePage,
});

const tags = ["All", "Apparel", "Vinyl", "Accessories", "Prints", "Collectibles"];

function StorePage() {
  const { data: merch } = useSuspenseQuery(merchQueryOptions());
  const [filter, setFilter] = useState("All");
  const items = merch ?? [];
  const filtered = filter === "All" ? items : items.filter((m) => m.tag === filter);

  return (
    <>
      <PageHeader eyebrow="05 · Store" title="Official Merch">
        Vinyl, apparel, accessories and limited collectibles from SOLARI.
      </PageHeader>

      <section className="border-b border-border px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                filter === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted hover:border-primary hover:text-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((item) => (
              <div key={item.id} className="group">
                <div className="relative mb-4 aspect-square overflow-hidden bg-neutral-900">
                  <img
                    src={getMerchCover(item.name, item.cover_url)}
                    alt={item.name}
                    width={600}
                    height={600}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                  {item.tag}
                </p>
                <h3 className="mb-1 text-sm font-bold">{item.name}</h3>
                <p className="text-sm font-medium">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
