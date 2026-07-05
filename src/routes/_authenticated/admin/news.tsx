import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getNewsAdmin, createNews, updateNews, deleteNews } from "@/lib/admin.functions";
import { useServerFn } from "@tanstack/react-start";

const newsQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "news"],
    queryFn: () => getNewsAdmin(),
  });

export const Route = createFileRoute("/_authenticated/admin/news")({
  loader: ({ context }) => context.queryClient.ensureQueryData(newsQueryOptions()),
  component: NewsAdminPage,
});

function NewsAdminPage() {
  const { data: news } = useSuspenseQuery(newsQueryOptions());
  const queryClient = useQueryClient();
  const createFn = useServerFn(createNews);
  const updateFn = useServerFn(updateNews);
  const deleteFn = useServerFn(deleteNews);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<null | typeof news[0]>(null);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    date: "",
    excerpt: "",
    content: "",
    tag: "News",
    published: true,
  });
  const [saving, setSaving] = useState(false);

  function openAdd() {
    setEditing(null);
    setForm({ slug: "", title: "", date: new Date().toISOString().split("T")[0], excerpt: "", content: "", tag: "News", published: true });
    setModalOpen(true);
  }

  function openEdit(item: typeof news[0]) {
    setEditing(item);
    setForm({
      slug: item.slug,
      title: item.title,
      date: item.date,
      excerpt: item.excerpt,
      content: item.content ?? "",
      tag: item.tag,
      published: item.published,
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
      queryClient.invalidateQueries({ queryKey: ["admin", "news"] });
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await deleteFn({ data: { id } });
    queryClient.invalidateQueries({ queryKey: ["admin", "news"] });
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl uppercase tracking-tighter">News</h1>
      </div>

      <DataTable
        data={news ?? []}
        columns={[
          { key: "title", label: "Title" },
          { key: "date", label: "Date" },
          { key: "tag", label: "Tag" },
          {
            key: "published",
            label: "Status",
            format: (v) => (v ? "Published" : "Draft"),
          },
        ]}
        onEdit={openEdit}
        onDelete={handleDelete}
        onAdd={openAdd}
        searchKeys={["title", "slug", "tag"]}
      />

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-xl uppercase tracking-tighter">
              {editing ? "Edit News" : "Add News"}
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
              <div>
                <Label>Date</Label>
                <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div>
                <Label>Tag</Label>
                <Input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} />
              </div>
              <div>
                <Label>Excerpt</Label>
                <Input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
              </div>
              <div>
                <Label>Content</Label>
                <textarea
                  className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
                  rows={4}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                />
                Published
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
