import { createFileRoute, Link } from "@tanstack/react-router";
import { getPublicAlbums } from "@/lib/public-data.functions";
import { getAlbumCover } from "@/lib/db-images";
import { queryOptions } from "@tanstack/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { albums as staticAlbums } from "@/lib/site-data";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";

const staticCovers: Record<string, string> = {
  "golden-horizon": album1,
  "lagos-after-dark": album2,
  "echoes-of-sahel": album3,
};

const albumsQueryOptions = () =>
  queryOptions({
    queryKey: ["public", "albums"],
    queryFn: () => getPublicAlbums(),
  });

export const Route = createFileRoute("/music")({
  loader: ({ context }) => context.queryClient.ensureQueryData(albumsQueryOptions()),
  component: MusicPage,
});

function MusicPage() {
  const { data: dbAlbums } = useSuspenseQuery(albumsQueryOptions());
  const albums = dbAlbums ?? [];

  return (
    <div className="px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">Music</p>
          <h1 className="font-display text-6xl uppercase tracking-tighter md:text-8xl">Discography</h1>
        </div>
        <div className="space-y-24">
          {albums.map((album) => (
            <div key={album.slug} className="grid items-center gap-12 md:grid-cols-2">
              <div className="relative aspect-square overflow-hidden bg-neutral-900">
                <img
                  src={getAlbumCover(album.slug, album.cover_url) || staticCovers[album.slug] || ""}
                  alt={album.title}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                  {album.year} · {album.type} · {album.tracks} Tracks
                </p>
                <h2 className="mb-6 font-display text-5xl uppercase tracking-tighter">
                  {album.title}
                </h2>
                <p className="mb-8 max-w-md text-muted">{album.tagline}</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={album.stream_url ?? "#"}
                    className="bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground"
                  >
                    Stream
                  </a>
                  <a
                    href={album.buy_url ?? "#"}
                    className="border border-foreground px-6 py-3 text-xs font-bold uppercase tracking-widest text-foreground"
                  >
                    Buy
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
