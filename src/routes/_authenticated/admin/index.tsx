import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import {
  Disc3,
  Newspaper,
  MapPin,
  ShoppingBag,
  FileMusic,
  Users,
  Package,
  Video,
} from "lucide-react";
import { getAdminStats } from "@/lib/admin.functions";
import { useServerFn } from "@tanstack/react-start";

const statsQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "stats"],
    queryFn: () => getAdminStats(),
  });

export const Route = createFileRoute("/_authenticated/admin/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(statsQueryOptions()),
  component: DashboardPage,
});

const statCards = [
  { key: "albums" as const, label: "Albums", icon: Disc3 },
  { key: "news" as const, label: "News", icon: Newspaper },
  { key: "tour" as const, label: "Tour Dates", icon: MapPin },
  { key: "videos" as const, label: "Videos", icon: Video },
  { key: "merch" as const, label: "Merch", icon: ShoppingBag },
  { key: "compositions" as const, label: "Compositions", icon: FileMusic },
  { key: "members" as const, label: "Fan Club", icon: Users },
  { key: "orders" as const, label: "Orders", icon: Package },
];

function DashboardPage() {
  const { data: stats } = useSuspenseQuery(statsQueryOptions());

  return (
    <div>
      <h1 className="mb-8 font-display text-4xl uppercase tracking-tighter">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.key}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30"
          >
            <div className="flex items-center justify-between">
              <card.icon className="h-5 w-5 text-primary" />
              <span className="font-display text-3xl tracking-tighter">
                {stats?.[card.key] ?? 0}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
