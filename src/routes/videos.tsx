import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { videos, albums } from "@/lib/site-data";
import { useState } from "react";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos & Galleries — SOLARI" },
      { name: "description", content: "Official music videos, lyric videos and per-era galleries from SOLARI." },
      { property: "og:title", content: "Videos & Galleries — SOLARI" },
      { property: "og:description", content: "Music videos and era galleries." },
    ],
  }),
  component: VideosPage,
});

function VideosPage() {
  const [era, setEra] = useState<string>("All");
  const eras = ["All", ...albums.map((a) => a.title)];
  const filtered = era === "All" ? videos : videos.filter((v) => v.era === era);

  return (
    <>
      <PageHeader eyebrow="02 · Videos" title="Videos & Galleries">
        Music videos, lyric visuals and photo galleries organised by album era.
      </PageHeader>

      {/* Era filter */}
      <section className="border-b border-border px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
          {eras.map((e) => (
            <button
              key={e}
              onClick={() => setEra(e)}
              className={`border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                era === e
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted hover:border-primary hover:text-primary"
              }`}
            >
              {e}
            </button>
          ))}
        </div>
      </section>

      {/* Video grid */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            {filtered.map((v) => (
              <div key={v.id} className="group">
                <div className="relative mb-4 aspect-video overflow-hidden bg-neutral-900">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.youtubeId}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                  {v.era}
                </p>
                <h3 className="text-xl font-bold">{v.title}</h3>
                <p className="text-sm text-muted">{v.director}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Era galleries */}
      <section className="border-t border-border bg-secondary/40 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-16 font-display text-4xl uppercase tracking-tighter md:text-6xl">
            Era Galleries
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {albums.map((a) => (
              <div key={a.slug} className="group relative aspect-[4/5] overflow-hidden bg-neutral-900">
                <img
                  src={a.cover}
                  alt={a.title}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-primary">
                    Era {a.year}
                  </p>
                  <h3 className="font-display text-3xl uppercase tracking-tighter">{a.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
