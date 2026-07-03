import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import bioImg from "@/assets/bio.jpg";

export const Route = createFileRoute("/bio")({
  head: () => ({
    meta: [
      { title: "Biography — SOLARI" },
      { name: "description", content: "The story of SOLARI — from Lagos rooftops to arenas around the world." },
      { property: "og:title", content: "Biography — SOLARI" },
      { property: "og:description", content: "The story of SOLARI." },
    ],
  }),
  component: BioPage,
});

function BioPage() {
  return (
    <>
      <PageHeader eyebrow="07 · Bio" title="The Story" />
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
          <div className="relative">
            <img
              src={bioImg}
              alt="Portrait of Solari"
              width={1000}
              height={1200}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted">
            <p className="text-foreground">
              Solari came up on the rooftops of Lagos with a borrowed keyboard and a
              cassette recorder. That sound — nocturnal, rhythmic, unmistakably West
              African — became the backbone of a catalogue that now spans four albums
              and three continents.
            </p>
            <p>
              After releases like <em>Echoes of Sahel</em> and <em>Lagos After Dark</em>,
              the new record <em>Golden Horizon</em> marks a shift into a bigger,
              cinematic register: horn sections, sweeping strings, and the same relentless
              groove.
            </p>
            <p>
              Solari has headlined the O2, sold out Madison Square Garden and been named
              one of the defining voices of the current Afrobeats movement. The work
              continues in the studio, on the stage, and in the archive.
            </p>
            <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
              <div>
                <p className="font-display text-4xl text-primary">4</p>
                <p className="font-mono text-[10px] uppercase tracking-widest">Albums</p>
              </div>
              <div>
                <p className="font-display text-4xl text-primary">2B+</p>
                <p className="font-mono text-[10px] uppercase tracking-widest">Streams</p>
              </div>
              <div>
                <p className="font-display text-4xl text-primary">42</p>
                <p className="font-mono text-[10px] uppercase tracking-widest">Cities</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
