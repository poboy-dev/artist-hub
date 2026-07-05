import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getTourDatesAdmin, createTourDate, updateTourDate, deleteTourDate } from "@/lib/admin.functions";
import { useServerFn } from "@tanstack/react-start";

const tourQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "tour"],
    queryFn: () => getTourDatesAdmin(),
  });

export const Route = createFileRoute("/_authenticated/admin/tour")({
  loader: ({ context }) => context.queryClient.ensureQueryData(tourQueryOptions()),
  component: TourAdminPage,
});

function TourAdminPage() {
  const { data: dates } = useSuspenseQuery(tourQueryOptions());
  const queryClient = useQueryClient();
  const createFn = useServerFn(createTourDate);
  const updateFn = useServerFn(updateTourDate);
  const deleteFn = useServerFn(deleteTourDate);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<null | typeof dates[0]>(null);
  const [form, setForm] = useState({
    date: "",
    city: "",
    country: "",
    venue: "",
    status: "onsale",
    ticket_url: "",
    vip: false,
    active: true,
  });
  const [saving, setSaving] = useState(false);

  function openAdd() {
    setEditing(null);
    setForm({ date: "", city: "", country: "", venue: "", status: "onsale", ticket_url: "", vip: false, active: true });
    setModalOpen(true);
  }

  function openEdit(item: typeof dates[0]) {
    setEditing(item);
    setForm({
      date: item.date,
      city: item.city,
      country: item.country,
      venue: item.venue,
      status: item.status,
      ticket_url: item.ticket_url ?? "",
      vip: item.vip,
      active: item.active,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = { ...form, ticket_url: form.ticket_url || null };
      if (editing) {
        await updateFn({ data: { id: editing.id, ...payload } });
      } else {
        await createFn({ data: payload });
      }
      queryClient.invalidateQueries({ queryKey: ["admin", "tour"] });
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await deleteFn({ data: { id } });
    queryClient.invalidateQueries({ queryKey: ["admin", "tour"] });
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl uppercase tracking-tighter">Tour</h1>
      </div>

      <DataTable
        data={dates ?? []}
        columns={[
          { key: "date", label: "Date" },
          { key: "city", label: "City" },
          { key: "country", label: "Country" },
          { key: "venue", label: "Venue" },
          { key: "status", label: "Status" },
          { key: "active", label: "Status", format: (v) => (v ? "Active" : "Hidden") },
        ]}
        onEdit={openEdit}
        onDelete={handleDelete}
        onAdd={openAdd}
        searchKeys={["city", "country", "venue"]}
      />

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-xl uppercase tracking-tighter">
              {editing ? "Edit Date" : "Add Date"}
            </h2>
            <div className="space-y-4">
              <div>
                <Label>Date</Label>
                <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>Venue</Label>
                <Input value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
              </div>
              <div>
                <Label>Status</Label>
                <select
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="onsale">On Sale</option>
                  <option value="presale">Presale</option>
                  <option value="soldout">Sold Out</option>
                </select>
              </div>
              <div>
                <Label>Ticket URL</Label>
                <Input value={form.ticket_url} onChange={(e) => setForm({ ...form, ticket_url: e.target.value })} />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.vip} onChange={(e) => setForm({ ...form, vip: e.target.checked })} />
                VIP Available
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
                Active
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
