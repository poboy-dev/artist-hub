import { useState } from "react";
import { Pencil, Trash2, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: { key: keyof T; label: string; format?: (value: unknown) => string }[];
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  searchKeys: (keyof T)[];
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
  onAdd,
  searchKeys,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = search
    ? data.filter((row) =>
        searchKeys.some((key) => {
          const val = String(row[key] ?? "").toLowerCase();
          return val.includes(search.toLowerCase());
        })
      )
    : data;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={onAdd} size="sm">
          <Plus className="mr-1 h-4 w-4" />
          Add
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className="px-4 py-3 text-left font-medium text-muted-foreground">
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-t border-border transition-colors hover:bg-muted/30">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3">
                    {col.format ? col.format(row[col.key]) : String(row[col.key] ?? "—")}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(row)}
                      className="rounded p-1 text-muted-foreground transition-colors hover:text-primary"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(row.id)}
                      className="rounded p-1 text-muted-foreground transition-colors hover:text-destructive"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-muted-foreground">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">Confirm Delete</h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Are you sure you want to delete this item? This cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  onDelete(deleteId);
                  setDeleteId(null);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
