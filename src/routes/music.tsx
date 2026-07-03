import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { albums } from "@/lib/site-data";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Music — SOLARI" },
      { name: "description", content: "Full discography, streaming links and purchase options for every SOLARI release." },
      { property: "og:title", content: "Music — SOLARI" },
      { property: "og:description", content: "Full discography from SOLARI. Stream and buy." },
    ],
  }),
  component: MusicPage,
});

function MusicPage() {
  return (
    <>
      <PageHeader eyebrow="01 · Music" title="Discography">
        Every era. Every release. Stream, download or order physical formats.
      </PageHeader>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl space-y-24">
          {albums.map((a, i) => (
            <article
              key={a.slug}
              className={`grid items-center gap-12 md:grid-cols-2 ${
                i % 2 ? "md:[direction:rtl]" : ""
              }`}
            >
              <div className="[direction:ltr]">
                <img
                  src={a.cover}
                  alt={a.title}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="[direction:ltr]">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                  {a.year} · {a.type} · {a.tracks} Tracks
                </p>
                <h2 className="mb-6 font-display text-5xl uppercase tracking-tighter md:text-7xl">
                  {a.title}
                </h2>
                <p className="mb-10 max-w-md text-muted">{a.tagline}</p>
                {/* Audio streaming */}
                <div className="mb-8">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted">
                    Preview
                  </p>
                  <audio
                    controls
                    className="w-full max-w-md"
                    preload="none"
                  >
                    <source src="" type="audio/mpeg" />
                    Your browser does not support audio playback.
                  </audio>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={a.stream}
                    className="bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground"
                  >
                    Spotify
                  </a>
                  <a
                    href={a.stream}
                    className="border border-border px-6 py-3 text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary"
                  >
                    Apple Music
                  </a>
                  <a
                    href={a.stream}
                    className="border border-border px-6 py-3 text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary"
                  >
                    YouTube
                  </a>
                  <a
                    href={a.buy}
                    className="border border-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary"
                  >
                    Buy Album →
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
