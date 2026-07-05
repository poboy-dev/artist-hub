import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { getFanClubMembers } from "@/lib/admin.functions";
import { Users } from "lucide-react";

const membersQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "fan-club"],
    queryFn: () => getFanClubMembers(),
  });

export const Route = createFileRoute("/_authenticated/admin/fan-club")({
  loader: ({ context }) => context.queryClient.ensureQueryData(membersQueryOptions()),
  component: FanClubAdminPage,
});

function FanClubAdminPage() {
  const { data: members } = useSuspenseQuery(membersQueryOptions());

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl uppercase tracking-tighter">Fan Club</h1>
        <span className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          <Users className="h-4 w-4" />
          {members?.length ?? 0} members
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Joined</th>
            </tr>
          </thead>
          <tbody>
            {(members ?? []).map((m) => (
              <tr key={m.id} className="border-t border-border transition-colors hover:bg-muted/30">
                <td className="px-4 py-3">{m.email}</td>
                <td className="px-4 py-3">{m.name ?? "—"}</td>
                <td className="px-4 py-3">{new Date(m.joined_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {(!members || members.length === 0) && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                  No members yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
