// Maps DB content to static image assets while the back office does not yet have image uploads.
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import video1 from "@/assets/video-1.jpg";
import video2 from "@/assets/video-2.jpg";
import video3 from "@/assets/video-3.jpg";
import merch1 from "@/assets/merch-1.jpg";
import merch2 from "@/assets/merch-2.jpg";
import merch3 from "@/assets/merch-3.jpg";
import merch4 from "@/assets/merch-4.jpg";

const albumCovers: Record<string, string> = {
  "golden-horizon": album1,
  "lagos-after-dark": album2,
  "echoes-of-sahel": album3,
};

const videoThumbs: Record<string, string> = {
  "dQw4w9WgXcQ": video1, // fallback
};

const merchCovers: Record<string, string> = {
  "Golden Horizon Hoodie": merch1,
  "Solari Tee — Black": merch1,
  "Golden Horizon 2LP (Gold Vinyl)": merch2,
  "Lagos After Dark LP": merch2,
  "Circle Bucket Hat": merch3,
  "Enamel Pin Set": merch3,
  "Tour Poster (Limited)": merch4,
  "Limited Box Set": merch4,
};

export function getAlbumCover(slug: string, dbUrl: string | null): string {
  return dbUrl || albumCovers[slug] || "";
}

export function getVideoThumb(youtubeId: string, dbUrl: string | null): string {
  return dbUrl || videoThumbs[youtubeId] || "";
}

export function getMerchCover(name: string, dbUrl: string | null): string {
  return dbUrl || merchCovers[name] || "";
}
