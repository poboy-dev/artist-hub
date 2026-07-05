import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAlbumsAdmin, createAlbum, updateAlbum, deleteAlbum } from "@/lib/admin.functions";
import { useServerFn } from "@tanstack/react-start";

const albumsQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "albums"],
    queryFn: () => getAlbumsAdmin(),
  });

export const Route = createFileRoute("/_authenticated/admin/music")({
  loader: ({ context }) => context.queryClient.ensureQueryData(albumsQueryOptions()),
  component: MusicAdminPage,
});

function MusicAdminPage() {
  const { data: albums } = useSuspenseQuery(albumsQueryOptions());
  const queryClient = useQueryClient();
  const createFn = useServerFn(createAlbum);
  const updateFn = useServerFn(updateAlbum);
  const deleteFn = useServerFn(deleteAlbum);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<null | typeof albums[0]>(null);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    year: new Date().getFullYear(),
    type: "LP",
    tracks: 0,
    buy_url: "",
    stream_url: "",
    tagline: "",
    sort_order: 0,
    active: true,
  });
  const [saving, setSaving] = useState(false);

  function openAdd() {
    setEditing(null);
    setForm({ slug: "", title: "", year: new Date().getFullYear(), type: "LP", tracks: 0, buy_url: "", stream_url: "", tagline: "", sort_order: 0, active: true });
    setModalOpen(true);
  }

  function openEdit(item: typeof albums[0]) {
    setEditing(item);
    setForm({
      slug: item.slug,
      title: item.title,
      year: item.year,
      type: item.type,
      tracks: item.tracks,
      buy_url: item.buy_url ?? "",
      stream_url: item.stream_url ?? "",
      tagline: item.tagline ?? "",
      sort_order: item.sort_order,
      active: item.active,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = { ...form, buy_url: form.buy_url || null, stream_url: form.stream_url || null, tagline: form.tagline || null };
      if (editing) {
        await updateFn({ data: { id: editing.id, ...payload } });
      } else {
        await createFn({ data: payload });
      }
      queryClient.invalidateQueries({ queryKey: ["admin", "albums"] });
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await deleteFn({ data: { id } });
    queryClient.invalidateQueries({ queryKey: ["admin", "albums"] });
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl uppercase tracking-tighter">Music</h1>
      </div>

      <DataTable
        data={albums ?? []}
        columns={[
          { key: "title", label: "Title" },
          { key: "year", label: "Year" },
          { key: "type", label: "Type" },
          {
            key: "active",
            label: "Status",
            format: (v) => (v ? "Active" : "Hidden"),
          },
        ]}
        onEdit={openEdit}
        onDelete={handleDelete}
        onAdd={openAdd}
        searchKeys={["title", "slug"]}
      />

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-xl uppercase tracking-tighter">
              {editing ? "Edit Album" : "Add Album"}
            </h2>
            <div className="space-y-4">
              <div>
                <Label>Slug</Label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
              </div>
              <div>
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Year</Label>
                  <Input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
                </div>
                <div>
                  <Label>Type</Label>
                  <Input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>Tracks</Label>
                <Input type="number" value={form.tracks} onChange={(e) => setForm({ ...form, tracks: Number(e.target.value) })} />
              </div>
              <div>
                <Label>Buy URL</Label>
                <Input value={form.buy_url} onChange={(e) => setForm({ ...form, buy_url: e.target.value })} />
              </div>
              <div>
                <Label>Stream URL</Label>
                <Input value={form.stream_url} onChange={(e) => setForm({ ...form, stream_url: e.target.value })} />
              </div>
              <div>
                <Label>Tagline</Label>
                <Input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                />
                Active
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
