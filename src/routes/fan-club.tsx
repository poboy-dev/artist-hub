import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";

export const Route = createFileRoute("/fan-club")({
  head: () => ({
    meta: [
      { title: "Fan Club — SOLARI" },
      { name: "description", content: "Join the SOLARI Circle for exclusive content, presale codes, and members-only drops." },
      { property: "og:title", content: "Fan Club — SOLARI" },
      { property: "og:description", content: "Exclusive content and presale access." },
    ],
  }),
  component: FanClubPage,
});

function FanClubPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const perks = [
    "48-hour ticket presale on every tour date",
    "First access to limited edition merch drops",
    "Members-only livestreams and Q&A sessions",
    "Unreleased demos, alternate takes and bonus content",
    "Exclusive video series shot behind the scenes",
    "Early listening parties before every release",
  ];

  return (
    <>
      <PageHeader eyebrow="08 · Circle" title="Join the Circle">
        The Solari fan club. Presale codes, exclusive content, and members-only drops
        delivered straight to your inbox.
      </PageHeader>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
          <ul className="space-y-6">
            {perks.map((p) => (
              <li key={p} className="flex gap-4 border-b border-border pb-6">
                <span className="mt-2 block h-1 w-8 shrink-0 bg-primary" />
                <span className="text-lg text-foreground">{p}</span>
              </li>
            ))}
          </ul>

          <div className="border border-primary p-10">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-primary">
              Membership · Free
            </p>
            <h2 className="mb-6 font-display text-4xl uppercase tracking-tighter">
              Sign up
            </h2>
            <p className="mb-8 text-muted">
              Enter your email and you're in. We'll send your welcome bundle within 24 hours.
            </p>
            {done ? (
              <div>
                <p className="mb-2 font-display text-2xl text-primary">You're in.</p>
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  Check your inbox.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.includes("@")) setDone(true);
                }}
                className="space-y-4"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full border border-border bg-background px-4 py-4 text-sm focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-primary py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  Join the Circle
                </button>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Family-friendly. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
