import { createFileRoute, Link, useRouter, redirect } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Newspaper,
  Music,
  Video,
  MapPin,
  ShoppingBag,
  FileMusic,
  Users,
  Package,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/news", label: "News", icon: Newspaper },
  { to: "/admin/music", label: "Music", icon: Music },
  { to: "/admin/videos", label: "Videos", icon: Video },
  { to: "/admin/tour", label: "Tour", icon: MapPin },
  { to: "/admin/store", label: "Store", icon: ShoppingBag },
  { to: "/admin/compositions", label: "Compositions", icon: FileMusic },
  { to: "/admin/fan-club", label: "Fan Club", icon: Users },
  { to: "/admin/orders", label: "Orders", icon: Package },
];

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async ({ context }) => {
    const { data } = await supabase.rpc("has_role", {
      _user_id: context.user.id,
      _role: "admin",
    });
    if (!data) throw redirect({ to: "/" });
  },
  component: AdminLayout,
});

function AdminLayout() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 flex-col border-r border-border bg-secondary/40 md:flex">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link to="/" className="font-display text-xl tracking-tighter">
            SOLARI
          </Link>
          <span className="ml-2 rounded bg-primary px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground">
            Admin
          </span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "bg-primary/10 text-primary border-r-2 border-primary" }}
              className="flex items-center gap-3 border-r-2 border-transparent px-6 py-3 text-sm text-muted transition-colors hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border p-4">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-muted transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4 md:hidden">
          <Link to="/" className="font-display text-xl tracking-tighter">
            SOLARI
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="border-b border-border bg-secondary/40 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-muted"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-muted"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        )}

        <main className="flex-1 p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
