import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { joinFanClub } from "@/lib/public-data.functions";

export function FanClubBar() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const signup = useServerFn(joinFanClub);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signup({ data: { email } });
      setDone(true);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

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
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
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
              disabled={loading}
              className="bg-background px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-primary transition-transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? "..." : "Subscribe"}
            </button>
          </form>
        )}
        {error && <p className="text-[10px] text-background/80">{error}</p>}
      </div>
    </section>
  );
}
