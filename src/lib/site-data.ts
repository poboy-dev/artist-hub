import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import merch1 from "@/assets/merch-1.jpg";
import merch2 from "@/assets/merch-2.jpg";
import merch3 from "@/assets/merch-3.jpg";
import merch4 from "@/assets/merch-4.jpg";
import video1 from "@/assets/video-1.jpg";
import video2 from "@/assets/video-2.jpg";
import video3 from "@/assets/video-3.jpg";

export const albums = [
  {
    slug: "golden-horizon",
    title: "Golden Horizon",
    year: 2024,
    type: "LP",
    cover: album1,
    tracks: 12,
    buy: "#",
    stream: "#",
    tagline: "The new era. Out now.",
  },
  {
    slug: "lagos-after-dark",
    title: "Lagos After Dark",
    year: 2022,
    type: "EP",
    cover: album2,
    tracks: 6,
    buy: "#",
    stream: "#",
    tagline: "Nocturnal grooves from the city.",
  },
  {
    slug: "echoes-of-sahel",
    title: "Echoes of Sahel",
    year: 2021,
    type: "LP",
    cover: album3,
    tracks: 11,
    buy: "#",
    stream: "#",
    tagline: "A journey through desert rhythms.",
  },
];

// Public YouTube video ids — swap for the artist's own uploads later.
export const videos = [
  {
    id: "v1",
    title: "Golden Horizon (Official Video)",
    era: "Golden Horizon",
    youtubeId: "dQw4w9WgXcQ",
    thumb: video1,
    director: "Directed by K. Adebayo",
  },
  {
    id: "v2",
    title: "Midnight Fire (Live at The O2)",
    era: "Lagos After Dark",
    youtubeId: "dQw4w9WgXcQ",
    thumb: video2,
    director: "Live capture",
  },
  {
    id: "v3",
    title: "Sahel Dreams (Lyric Video)",
    era: "Echoes of Sahel",
    youtubeId: "dQw4w9WgXcQ",
    thumb: video3,
    director: "Lyric visual",
  },
];

export const news = [
  {
    slug: "world-tour-announced",
    date: "2024-08-14",
    title: "World Tour 2024/25 — Dates announced",
    excerpt:
      "The Golden Horizon world tour is confirmed across 24 cities. Presale for Circle members opens Friday.",
    tag: "Tour",
  },
  {
    slug: "golden-horizon-out-now",
    date: "2024-07-01",
    title: "Golden Horizon is out now",
    excerpt: "The new album is live on all platforms. Vinyl and limited box sets available in the store.",
    tag: "Release",
  },
  {
    slug: "vip-packages-live",
    date: "2024-06-18",
    title: "VIP experiences and premium packages",
    excerpt: "Nine tiers ranging from early entry to full seated F&B packages. Details on the tour page.",
    tag: "Tour",
  },
];

export const tourDates = [
  {
    date: "2024-10-12",
    city: "London",
    country: "UK",
    venue: "The O2 Arena",
    status: "onsale" as const,
    ticketUrl: "#",
    vip: true,
  },
  {
    date: "2024-10-15",
    city: "Paris",
    country: "FR",
    venue: "Accor Arena",
    status: "soldout" as const,
    ticketUrl: "#",
    vip: false,
  },
  {
    date: "2024-10-22",
    city: "New York",
    country: "NY",
    venue: "Madison Square Garden",
    status: "onsale" as const,
    ticketUrl: "#",
    vip: true,
  },
  {
    date: "2024-11-04",
    city: "Lagos",
    country: "NG",
    venue: "Eko Convention Centre",
    status: "onsale" as const,
    ticketUrl: "#",
    vip: true,
  },
  {
    date: "2024-11-18",
    city: "Toronto",
    country: "CA",
    venue: "Scotiabank Arena",
    status: "presale" as const,
    ticketUrl: "#",
    vip: true,
  },
  {
    date: "2024-12-02",
    city: "Los Angeles",
    country: "CA",
    venue: "Kia Forum",
    status: "onsale" as const,
    ticketUrl: "#",
    vip: true,
  },
];

export const vipTiers = [
  {
    name: "Premium Seated F&B Package",
    price: "$1,250",
    includes: [
      "Premium seated ticket in reserved section",
      "Access to VIP lounge with hosted bar",
      "Curated food & beverage menu",
      "Dedicated concierge entry",
      "Limited edition tour gift & laminate",
      "Commemorative lanyard",
    ],
  },
  {
    name: "Gold Circle Standing",
    price: "$725",
    includes: [
      "Priority standing in Gold Circle pit",
      "Early entry access (60 min before doors)",
      "VIP lounge with welcome drink",
      "Pre-show merch shopping window",
      "Limited edition tour gift & laminate",
    ],
  },
  {
    name: "Silver Seated Package",
    price: "$495",
    includes: [
      "Reserved seated ticket, tier 1",
      "Early entry (30 min before doors)",
      "Exclusive tour poster",
      "Commemorative laminate",
    ],
  },
  {
    name: "Bronze Seated Package",
    price: "$295",
    includes: [
      "Reserved seated ticket, tier 2",
      "Commemorative laminate",
      "Digital download of live show",
    ],
  },
];

export const merch = [
  { name: "Golden Horizon Hoodie", price: "$85", cover: merch1, tag: "Apparel" },
  { name: "Golden Horizon 2LP (Gold Vinyl)", price: "$39", cover: merch2, tag: "Vinyl" },
  { name: "Circle Bucket Hat", price: "$45", cover: merch3, tag: "Accessories" },
  { name: "Tour Poster (Limited)", price: "$25", cover: merch4, tag: "Prints" },
  { name: "Solari Tee — Black", price: "$40", cover: merch1, tag: "Apparel" },
  { name: "Lagos After Dark LP", price: "$25", cover: merch2, tag: "Vinyl" },
  { name: "Limited Box Set", price: "$120", cover: merch4, tag: "Collectibles" },
  { name: "Enamel Pin Set", price: "$18", cover: merch3, tag: "Accessories" },
];

export const compositions = [
  { title: "Golden Horizon — Piano Solo", key: "F# minor", pages: 6, difficulty: "Advanced" },
  { title: "Midnight Fire — Lead Sheet", key: "D minor", pages: 3, difficulty: "Intermediate" },
  { title: "Sahel Dreams — Full Score", key: "A minor", pages: 14, difficulty: "Advanced" },
  { title: "Rooftop Anthem — Chord Chart", key: "G major", pages: 2, difficulty: "Beginner" },
  { title: "Ocean Between — String Arrangement", key: "C minor", pages: 9, difficulty: "Advanced" },
];

export function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}
