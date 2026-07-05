import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import sheetImg from "@/assets/sheet.jpg";
import { formatDate } from "@/lib/site-data";
import { getPublicAlbums, getPublicNews, getPublicTourDates, getPublicVideos } from "@/lib/public-data.functions";
import { getAlbumCover, getVideoThumb } from "@/lib/db-images";
import { queryOptions } from "@tanstack/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

const homeQueryOptions = () =>
  queryOptions({
    queryKey: ["home"],
    queryFn: async () => {
      const [albumsData, newsData, tourData, videosData] = await Promise.all([
        getPublicAlbums(),
        getPublicNews(),
        getPublicTourDates(),
        getPublicVideos(),
      ]);
      return { albums: albumsData, news: newsData, tour: tourData, videos: videosData };
    },
  });

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(homeQueryOptions()),
  component: Index,
});

function Index() {
  const { data } = useSuspenseQuery(homeQueryOptions());
  const albums = data?.albums ?? [];
  const news = data?.news ?? [];
  const tourDates = data?.tour ?? [];
  const videos = data?.videos ?? [];

  const latest = albums[0];
  const upcoming = tourDates.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative flex h-screen min-h-[640px] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Solari performing under a spotlight"
            width={1920}
            height={1280}
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24">
          <div className="animate-reveal">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              The New Era · {latest?.type ?? "LP"} · {latest?.year ?? 2024}
            </p>
            <h1 className="mb-6 text-balance font-display text-[15vw] uppercase leading-[0.85] tracking-tighter md:text-[10rem]">
              Golden <br />
              Horizon
            </h1>
            <p className="mb-8 max-w-xl text-muted">{latest?.tagline ?? "The new era. Out now."}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={latest?.stream_url ?? "#"}
                className="bg-foreground px-8 py-4 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-primary"
              >
                Listen Now
              </a>
              <Link
                to="/tour"
                className="border border-foreground px-8 py-4 text-xs font-bold uppercase tracking-widest text-foreground transition-all hover:bg-foreground hover:text-background"
              >
                Tour Dates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK NAV */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-6">
          {[
            { to: "/music", label: "Music" },
            { to: "/videos", label: "Videos" },
            { to: "/news", label: "News" },
            { to: "/tour", label: "Tour" },
            { to: "/store", label: "Store" },
            { to: "/bio", label: "Bio" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group border-r border-border px-6 py-8 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted transition-colors last:border-r-0 hover:bg-primary hover:text-primary-foreground"
            >
              <span className="block transition-transform group-hover:-translate-y-0.5">
                {l.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* MUSIC PREVIEW */}
      <section className="bg-secondary/40 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                01 · Music
              </p>
              <h2 className="font-display text-6xl uppercase tracking-tighter">Discography</h2>
            </div>
            <Link
              to="/music"
              className="border-b border-primary pb-1 text-xs font-bold uppercase tracking-widest text-primary"
            >
              All albums →
            </Link>
          </div>
          <div className="flex snap-x gap-8 overflow-x-auto pb-8 no-scrollbar">
            {albums.map((a) => (
              <div key={a.slug} className="group min-w-[300px] snap-start">
                <div className="relative mb-6 aspect-square overflow-hidden bg-neutral-900">
                  <img
                    src={getAlbumCover(a.slug, a.cover_url)}
                    alt={a.title}
                    width={800}
                    height={800}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground">
                      <div className="ml-1 h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-background" />
                    </div>
                  </div>
                </div>
                <h3 className="mb-1 text-lg font-bold">{a.title}</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  {a.year} · {a.type} · {a.tracks} Tracks
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST VIDEO */}
      <section className="border-t border-border px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                02 · Videos
              </p>
              <h2 className="font-display text-6xl uppercase tracking-tighter">Latest Visual</h2>
            </div>
            <Link
              to="/videos"
              className="border-b border-primary pb-1 text-xs font-bold uppercase tracking-widest text-primary"
            >
              All videos →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {videos[0] && (
              <a
                href={`https://youtube.com/watch?v=${videos[0].youtube_id}`}
                target="_blank"
                rel="noreferrer"
                className="group relative col-span-1 aspect-video overflow-hidden bg-neutral-900 md:col-span-2 md:row-span-2 md:aspect-auto"
              >
                <img
                  src={getVideoThumb(videos[0].youtube_id, videos[0].thumb_url)}
                  alt={videos[0].title}
                  width={1280}
                  height={720}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-primary">
                    Now playing
                  </p>
                  <h3 className="font-display text-3xl uppercase tracking-tighter">
                    {videos[0].title}
                  </h3>
                </div>
              </a>
            )}
            {videos.slice(1, 3).map((v) => (
              <a
                key={v.id}
                href={`https://youtube.com/watch?v=${v.youtube_id}`}
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-video overflow-hidden bg-neutral-900"
              >
                <img
                  src={getVideoThumb(v.youtube_id, v.thumb_url)}
                  alt={v.title}
                  width={1280}
                  height={720}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-bold">{v.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS PREVIEW */}
      <section className="bg-secondary/40 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                03 · News
              </p>
              <h2 className="font-display text-6xl uppercase tracking-tighter">Dispatch</h2>
            </div>
            <Link
              to="/news"
              className="border-b border-primary pb-1 text-xs font-bold uppercase tracking-widest text-primary"
            >
              All updates →
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {news.map((n) => (
              <article key={n.slug} className="group border-t border-border pt-6">
                <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
                  <span>{formatDate(n.date)}</span>
                  <span className="text-primary">{n.tag}</span>
                </div>
                <h3 className="mb-3 text-xl font-bold leading-tight transition-colors group-hover:text-primary">
                  {n.title}
                </h3>
                <p className="text-sm text-muted">{n.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TOUR PREVIEW */}
      <section id="tour" className="border-t border-border px-6 py-32">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-center font-mono text-xs uppercase tracking-[0.3em] text-primary">
            04 · Tour
          </p>
          <h2 className="mb-16 text-center font-display text-6xl uppercase tracking-tighter md:text-8xl">
            World Tour
          </h2>
          <div>
            {upcoming.map((t, i) => (
              <div
                key={t.id ?? i}
                className="group flex flex-wrap items-center justify-between gap-4 border-t border-border px-4 py-8 transition-colors last:border-b hover:bg-white/5"
              >
                <div className="flex flex-col">
                  <span className="mb-1 font-mono text-xs uppercase tracking-widest text-primary">
                    {formatDate(t.date)}
                  </span>
                  <span className="text-2xl font-bold">
                    {t.city}, {t.country}
                  </span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted transition-colors group-hover:text-foreground">
                  {t.venue}
                </div>
                <div className="flex items-center gap-4">
                  {t.vip && (
                    <span className="border border-primary px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-primary">
                      VIP Available
                    </span>
                  )}
                  {t.status === "soldout" ? (
                    <span className="text-xs font-bold uppercase tracking-widest text-muted">
                      Sold Out
                    </span>
                  ) : (
                    <a
                      href={t.ticket_url ?? "#"}
                      className="text-xs font-bold uppercase tracking-widest underline-offset-4 group-hover:underline"
                    >
                      Tickets →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/tour"
              className="border-b border-primary pb-1 text-xs font-bold uppercase tracking-widest text-primary"
            >
              Full tour + VIP packages →
            </Link>
          </div>
        </div>
      </section>

      {/* COMPOSITIONS */}
      <section className="bg-secondary/40 px-6 py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-20 md:grid-cols-2">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              05 · Compositions
            </p>
            <h2 className="mb-8 font-display text-6xl uppercase tracking-tighter">
              The Archive
            </h2>
            <p className="mb-10 max-w-md leading-relaxed text-muted">
              Official sheet music, lead sheets and full scores from the Solari catalogue.
              Available for study, performance and licensing.
            </p>
            <Link
              to="/compositions"
              className="inline-block border-b-2 border-primary pb-2 text-xs font-bold uppercase tracking-widest"
            >
              Browse compositions →
            </Link>
          </div>
          <div className="relative">
            <img
              src={sheetImg}
              alt="Sheet music"
              width={800}
              height={1000}
              loading="lazy"
              className="aspect-[4/5] w-full rotate-2 object-cover shadow-2xl transition-transform duration-700 hover:rotate-0"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary p-8">
              <span className="font-display text-4xl text-background">NO. 04</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
