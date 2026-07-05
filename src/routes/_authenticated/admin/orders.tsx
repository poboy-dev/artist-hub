import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { getOrdersAdmin, updateOrderStatus } from "@/lib/admin.functions";
import { useServerFn } from "@tanstack/react-start";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const ordersQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "orders"],
    queryFn: () => getOrdersAdmin(),
  });

export const Route = createFileRoute("/_authenticated/admin/orders")({
  loader: ({ context }) => context.queryClient.ensureQueryData(ordersQueryOptions()),
  component: OrdersAdminPage,
});

const statusOptions = ["pending", "paid", "shipped", "cancelled"];

function OrdersAdminPage() {
  const { data: orders } = useSuspenseQuery(ordersQueryOptions());
  const queryClient = useQueryClient();
  const updateStatus = useServerFn(updateOrderStatus);

  async function handleStatusChange(id: string, status: string) {
    await updateStatus({ data: { id, status } });
    queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl uppercase tracking-tighter">Orders</h1>
        <span className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          <Package className="h-4 w-4" />
          {orders?.length ?? 0} orders
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Items</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Total</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {(orders ?? []).map((o) => (
              <tr key={o.id} className="border-t border-border transition-colors hover:bg-muted/30">
                <td className="px-4 py-3">{o.customer_email}</td>
                <td className="px-4 py-3">{Array.isArray(o.items) ? o.items.length : 0}</td>
                <td className="px-4 py-3 font-medium">{o.total}</td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    className="rounded border border-border bg-background px-2 py-1 text-xs"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">{new Date(o.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {(!orders || orders.length === 0) && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
