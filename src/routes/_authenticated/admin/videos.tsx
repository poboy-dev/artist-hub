import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getVideosAdmin, createVideo, updateVideo, deleteVideo } from "@/lib/admin.functions";
import { useServerFn } from "@tanstack/react-start";

const videosQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "videos"],
    queryFn: () => getVideosAdmin(),
  });

export const Route = createFileRoute("/_authenticated/admin/videos")({
  loader: ({ context }) => context.queryClient.ensureQueryData(videosQueryOptions()),
  component: VideosAdminPage,
});

function VideosAdminPage() {
  const { data: videos } = useSuspenseQuery(videosQueryOptions());
  const queryClient = useQueryClient();
  const createFn = useServerFn(createVideo);
  const updateFn = useServerFn(updateVideo);
  const deleteFn = useServerFn(deleteVideo);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<null | typeof videos[0]>(null);
  const [form, setForm] = useState({
    title: "",
    youtube_id: "",
    thumb_url: "",
    era: "",
    director: "",
    sort_order: 0,
    active: true,
  });
  const [saving, setSaving] = useState(false);

  function openAdd() {
    setEditing(null);
    setForm({ title: "", youtube_id: "", thumb_url: "", era: "", director: "", sort_order: 0, active: true });
    setModalOpen(true);
  }

  function openEdit(item: typeof videos[0]) {
    setEditing(item);
    setForm({
      title: item.title,
      youtube_id: item.youtube_id,
      thumb_url: item.thumb_url ?? "",
      era: item.era ?? "",
      director: item.director ?? "",
      sort_order: item.sort_order,
      active: item.active,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = { ...form, thumb_url: form.thumb_url || null, era: form.era || null, director: form.director || null };
      if (editing) {
        await updateFn({ data: { id: editing.id, ...payload } });
      } else {
        await createFn({ data: payload });
      }
      queryClient.invalidateQueries({ queryKey: ["admin", "videos"] });
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await deleteFn({ data: { id } });
    queryClient.invalidateQueries({ queryKey: ["admin", "videos"] });
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl uppercase tracking-tighter">Videos</h1>
      </div>

      <DataTable
        data={videos ?? []}
        columns={[
          { key: "title", label: "Title" },
          { key: "youtube_id", label: "YouTube ID" },
          { key: "era", label: "Era" },
          { key: "active", label: "Status", format: (v) => (v ? "Active" : "Hidden") },
        ]}
        onEdit={openEdit}
        onDelete={handleDelete}
        onAdd={openAdd}
        searchKeys={["title", "youtube_id", "era"]}
      />

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-xl uppercase tracking-tighter">
              {editing ? "Edit Video" : "Add Video"}
            </h2>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <Label>YouTube ID</Label>
                <Input value={form.youtube_id} onChange={(e) => setForm({ ...form, youtube_id: e.target.value })} />
              </div>
              <div>
                <Label>Thumb URL</Label>
                <Input value={form.thumb_url} onChange={(e) => setForm({ ...form, thumb_url: e.target.value })} />
              </div>
              <div>
                <Label>Era</Label>
                <Input value={form.era} onChange={(e) => setForm({ ...form, era: e.target.value })} />
              </div>
              <div>
                <Label>Director</Label>
                <Input value={form.director} onChange={(e) => setForm({ ...form, director: e.target.value })} />
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
