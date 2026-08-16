"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export type DataTableItem = {
  id: string;
  title: string;
  status: string;
  category?: string | null;
  createdAt: string | Date;
};

export function DataTable({
  items,
  basePath,
  deleteEndpoint,
}: {
  items: DataTableItem[];
  basePath: string;
  deleteEndpoint: string;
}) {
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este registro? Esta acción no se puede deshacer.")) return;
    const res = await fetch(`${deleteEndpoint}/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("No se pudo eliminar el registro.");
    }
  }

  if (items.length === 0) {
    return <p className="text-sm text-slate-500">Todavía no hay registros.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Título</th>
            <th className="px-4 py-3">Categoría</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Creado</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-3 font-medium text-ink">{item.title}</td>
              <td className="px-4 py-3 text-slate-600">{item.category || "—"}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-500">{formatDate(item.createdAt)}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`${basePath}/${item.id}/editar`}
                    className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-primary-700"
                    aria-label="Editar"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                    aria-label="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
