import { useState } from "react";

export function FanClubBar() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="sticky bottom-0 z-40 border-t border-primary/20 bg-primary px-6 py-4 text-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-4">
          <span className="font-display text-xl uppercase tracking-tighter">Join the Circle</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest opacity-70 md:block">
            Early Access · Exclusive Content · Presale
          </span>
        </div>
        {done ? (
          <p className="font-mono text-[10px] uppercase tracking-widest">You're in. Welcome.</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setDone(true);
            }}
            className="flex w-full gap-2 md:w-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full border-b border-background/30 bg-background/10 px-4 py-2 text-xs font-bold uppercase tracking-widest placeholder:text-background/50 focus:outline-none md:w-64"
            />
            <button
              type="submit"
              className="bg-background px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-primary transition-transform hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
