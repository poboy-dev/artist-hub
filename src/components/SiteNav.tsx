import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const links = [
  { to: "/music", label: "Music" },
  { to: "/videos", label: "Videos" },
  { to: "/news", label: "News" },
  { to: "/tour", label: "Tour" },
  { to: "/store", label: "Store" },
  { to: "/compositions", label: "Compositions" },
  { to: "/bio", label: "Bio" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<ReturnType<typeof supabase.auth.getUser> extends Promise<infer R> ? R["data"]["user"] : null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="font-display text-2xl tracking-tighter">
          SOLARI
        </Link>
        <div className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-muted md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
          {user && (
            <Link
              to="/admin"
              className="text-primary transition-colors hover:text-primary/80"
            >
              Admin
            </Link>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/fan-club"
            className="bg-primary px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
          >
            Fan Club
          </Link>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(!open)}
            className="text-foreground md:hidden"
          >
            <span className="block h-px w-6 bg-foreground" />
            <span className="mt-1.5 block h-px w-6 bg-foreground" />
            <span className="mt-1.5 block h-px w-6 bg-foreground" />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-background/95 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4 text-[11px] font-bold uppercase tracking-widest">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-muted hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
            {user && (
              <Link to="/admin" onClick={() => setOpen(false)} className="text-primary">
                Admin
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
