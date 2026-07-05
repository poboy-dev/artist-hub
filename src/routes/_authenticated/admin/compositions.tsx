import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCompositionsAdmin, createComposition, updateComposition, deleteComposition } from "@/lib/admin.functions";
import { useServerFn } from "@tanstack/react-start";

const compositionsQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "compositions"],
    queryFn: () => getCompositionsAdmin(),
  });

export const Route = createFileRoute("/_authenticated/admin/compositions")({
  loader: ({ context }) => context.queryClient.ensureQueryData(compositionsQueryOptions()),
  component: CompositionsAdminPage,
});

function CompositionsAdminPage() {
  const { data: compositions } = useSuspenseQuery(compositionsQueryOptions());
  const queryClient = useQueryClient();
  const createFn = useServerFn(createComposition);
  const updateFn = useServerFn(updateComposition);
  const deleteFn = useServerFn(deleteComposition);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<null | typeof compositions[0]>(null);
  const [form, setForm] = useState({
    title: "",
    key: "",
    pages: 1,
    difficulty: "Intermediate",
    sort_order: 0,
    active: true,
  });
  const [saving, setSaving] = useState(false);

  function openAdd() {
    setEditing(null);
    setForm({ title: "", key: "", pages: 1, difficulty: "Intermediate", sort_order: 0, active: true });
    setModalOpen(true);
  }

  function openEdit(item: typeof compositions[0]) {
    setEditing(item);
    setForm({
      title: item.title,
      key: item.key,
      pages: item.pages,
      difficulty: item.difficulty,
      sort_order: item.sort_order,
      active: item.active,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editing) {
        await updateFn({ data: { id: editing.id, ...form } });
      } else {
        await createFn({ data: form });
      }
      queryClient.invalidateQueries({ queryKey: ["admin", "compositions"] });
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await deleteFn({ data: { id } });
    queryClient.invalidateQueries({ queryKey: ["admin", "compositions"] });
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl uppercase tracking-tighter">Compositions</h1>
      </div>

      <DataTable
        data={compositions ?? []}
        columns={[
          { key: "title", label: "Title" },
          { key: "key", label: "Key" },
          { key: "pages", label: "Pages" },
          { key: "difficulty", label: "Difficulty" },
          { key: "active", label: "Status", format: (v) => (v ? "Active" : "Hidden") },
        ]}
        onEdit={openEdit}
        onDelete={handleDelete}
        onAdd={openAdd}
        searchKeys={["title", "key", "difficulty"]}
      />

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-xl uppercase tracking-tighter">
              {editing ? "Edit Composition" : "Add Composition"}
            </h2>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <Label>Key</Label>
                <Input value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })} />
              </div>
              <div>
                <Label>Pages</Label>
                <Input type="number" value={form.pages} onChange={(e) => setForm({ ...form, pages: Number(e.target.value) })} />
              </div>
              <div>
                <Label>Difficulty</Label>
                <select
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.difficulty}
                  onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
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
