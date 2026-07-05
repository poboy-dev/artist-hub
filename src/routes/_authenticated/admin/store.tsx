import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getMerchAdmin, createMerch, updateMerch, deleteMerch } from "@/lib/admin.functions";
import { useServerFn } from "@tanstack/react-start";

const merchQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "merch"],
    queryFn: () => getMerchAdmin(),
  });

export const Route = createFileRoute("/_authenticated/admin/store")({
  loader: ({ context }) => context.queryClient.ensureQueryData(merchQueryOptions()),
  component: StoreAdminPage,
});

function StoreAdminPage() {
  const { data: items } = useSuspenseQuery(merchQueryOptions());
  const queryClient = useQueryClient();
  const createFn = useServerFn(createMerch);
  const updateFn = useServerFn(updateMerch);
  const deleteFn = useServerFn(deleteMerch);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<null | typeof items[0]>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    cover_url: "",
    tag: "Apparel",
    sort_order: 0,
    active: true,
  });
  const [saving, setSaving] = useState(false);

  function openAdd() {
    setEditing(null);
    setForm({ name: "", price: "", cover_url: "", tag: "Apparel", sort_order: 0, active: true });
    setModalOpen(true);
  }

  function openEdit(item: typeof items[0]) {
    setEditing(item);
    setForm({
      name: item.name,
      price: item.price,
      cover_url: item.cover_url ?? "",
      tag: item.tag,
      sort_order: item.sort_order,
      active: item.active,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = { ...form, cover_url: form.cover_url || null };
      if (editing) {
        await updateFn({ data: { id: editing.id, ...payload } });
      } else {
        await createFn({ data: payload });
      }
      queryClient.invalidateQueries({ queryKey: ["admin", "merch"] });
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await deleteFn({ data: { id } });
    queryClient.invalidateQueries({ queryKey: ["admin", "merch"] });
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl uppercase tracking-tighter">Store</h1>
      </div>

      <DataTable
        data={items ?? []}
        columns={[
          { key: "name", label: "Name" },
          { key: "price", label: "Price" },
          { key: "tag", label: "Tag" },
          { key: "active", label: "Status", format: (v) => (v ? "Active" : "Hidden") },
        ]}
        onEdit={openEdit}
        onDelete={handleDelete}
        onAdd={openAdd}
        searchKeys={["name", "tag"]}
      />

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-xl uppercase tracking-tighter">
              {editing ? "Edit Item" : "Add Item"}
            </h2>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label>Price</Label>
                <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div>
                <Label>Tag</Label>
                <select
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.tag}
                  onChange={(e) => setForm({ ...form, tag: e.target.value })}
                >
                  <option>Apparel</option>
                  <option>Vinyl</option>
                  <option>Accessories</option>
                  <option>Prints</option>
                  <option>Collectibles</option>
                </select>
              </div>
              <div>
                <Label>Cover URL</Label>
                <Input value={form.cover_url} onChange={(e) => setForm({ ...form, cover_url: e.target.value })} />
              </div>
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
