import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { tourDates, vipTiers, formatDate } from "@/lib/site-data";
import { useState } from "react";

export const Route = createFileRoute("/tour")({
  head: () => ({
    meta: [
      { title: "Tour & VIP Packages — SOLARI" },
      { name: "description", content: "SOLARI world tour dates, ticket links and VIP packages including premium seated F&B and Gold Circle experiences." },
      { property: "og:title", content: "Tour & VIP Packages — SOLARI" },
      { property: "og:description", content: "Tour dates, tickets and VIP experiences." },
    ],
  }),
  component: TourPage,
});

function TourPage() {
  const [presaleEmail, setPresaleEmail] = useState("");
  const [presaleDone, setPresaleDone] = useState(false);

  return (
    <>
      <PageHeader eyebrow="04 · Tour" title="World Tour">
        Full 2024/25 dates with ticket links and VIP packages. Circle members get 48-hour presale.
      </PageHeader>

      {/* Presale registration */}
      <section className="border-b border-border bg-secondary/40 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-primary">
                Presale Registration
              </p>
              <h2 className="font-display text-3xl uppercase tracking-tighter">
                Get first access to tickets
              </h2>
            </div>
            {presaleDone ? (
              <p className="font-mono text-xs uppercase tracking-widest text-primary">
                Registered. Code arriving by email.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (presaleEmail.includes("@")) setPresaleDone(true);
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  required
                  value={presaleEmail}
                  onChange={(e) => setPresaleEmail(e.target.value)}
                  placeholder="Email address"
                  className="border border-border bg-background px-4 py-3 text-xs uppercase tracking-widest focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground"
                >
                  Register
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Tour dates */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 font-display text-4xl uppercase tracking-tighter">Dates</h2>
          {tourDates.map((t, i) => (
            <div
              key={i}
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
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted">
                {t.venue}
              </div>
              <div className="flex items-center gap-4">
                {t.vip && (
                  <span className="border border-primary px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-primary">
                    VIP Available
                  </span>
                )}
                {t.status === "soldout" && (
                  <span className="text-xs font-bold uppercase tracking-widest text-muted">
                    Sold Out
                  </span>
                )}
                {t.status === "presale" && (
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    Presale
                  </span>
                )}
                {t.status !== "soldout" && (
                  <a
                    href={t.ticketUrl}
                    className="bg-foreground px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-background transition-colors hover:bg-primary"
                  >
                    Find Tickets →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIP tiers */}
      <section className="border-t border-border bg-secondary/40 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              VIP Packages
            </p>
            <h2 className="font-display text-5xl uppercase tracking-tighter md:text-7xl">
              Experience Tiers
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {vipTiers.map((tier) => (
              <div
                key={tier.name}
                className="group flex flex-col justify-between border border-border p-8 transition-colors hover:border-primary"
              >
                <div>
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl uppercase tracking-tighter">
                      {tier.name}
                    </h3>
                    <span className="whitespace-nowrap font-mono text-sm font-bold text-primary">
                      from {tier.price}
                    </span>
                  </div>
                  <ul className="mb-8 space-y-3 text-sm text-muted">
                    {tier.includes.map((inc) => (
                      <li key={inc} className="flex gap-3">
                        <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#"
                  className="mt-4 border border-border py-3 text-center text-[10px] font-bold uppercase tracking-widest transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  Reserve Package →
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-muted">
            All packages subject to availability. Ticket fulfillment via Ticketmaster.
          </p>
        </div>
      </section>
    </>
  );
}
