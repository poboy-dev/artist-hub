import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { vipTiers, formatDate } from "@/lib/site-data";
import { getPublicTourDates } from "@/lib/public-data.functions";
import { queryOptions } from "@tanstack/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const tourQueryOptions = () =>
  queryOptions({
    queryKey: ["public", "tour"],
    queryFn: () => getPublicTourDates(),
  });

export const Route = createFileRoute("/tour")({
  head: () => ({
    meta: [
      { title: "Tour Dates — SOLARI" },
      { name: "description", content: "Upcoming tour dates, ticket links and VIP experiences for SOLARI." },
      { property: "og:title", content: "Tour Dates — SOLARI" },
      { property: "og:description", content: "World tour dates and VIP packages." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(tourQueryOptions()),
  component: TourPage,
});

function TourPage() {
  const { data: tourDates } = useSuspenseQuery(tourQueryOptions());
  const dates = tourDates ?? [];
  const [email, setEmail] = useState("");

  return (
    <>
      <PageHeader eyebrow="04 · Tour" title="World Tour" />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          {dates.map((t, i) => (
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
      </section>

      {/* VIP */}
      <section className="border-t border-border bg-secondary/40 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">VIP</p>
          <h2 className="mb-16 font-display text-5xl uppercase tracking-tighter md:text-7xl">
            Premium Experiences
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {vipTiers.map((tier) => (
              <div
                key={tier.name}
                className="flex flex-col border border-border bg-card p-6 transition-colors hover:border-primary/30"
              >
                <h3 className="mb-2 text-lg font-bold">{tier.name}</h3>
                <p className="mb-6 font-display text-3xl tracking-tighter text-primary">
                  {tier.price}
                </p>
                <ul className="flex-1 space-y-3 text-sm text-muted">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="mt-8 border border-primary px-6 py-3 text-center text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Select
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Presale */}
      <section className="border-t border-border px-6 py-24">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="mb-4 font-display text-3xl uppercase tracking-tighter">Presale Access</h2>
          <p className="mb-8 text-muted">
            Sign up with your email to get early access to tickets before the general public.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Get Presale</Button>
          </form>
        </div>
      </section>
    </>
  );
}
