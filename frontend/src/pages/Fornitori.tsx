import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Fornitori: React.FC = () => {
  const navigate = useNavigate();
  const [dati, setDati] = useState<any[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

  useEffect(() => {
    axios
      .get(`${supabaseUrl}/rest/v1/fornitori`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      })
      .then((res) => setDati(res.data));
  }, [supabaseUrl, supabaseKey]);

  const filteredSortedData = useMemo(() => {
    let result = [...dati];
    for (const key in filters) {
      const value = filters[key]?.toLowerCase();
      if (value) {
        result = result.filter((row) =>
          String(row[key] || "").toLowerCase().includes(value)
        );
      }
    }
    if (sortField) {
      result.sort((a, b) => {
        const valA = String(a[sortField] || "");
        const valB = String(b[sortField] || "");
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
    }
    return result;
  }, [dati, filters, sortField, sortOrder]);

  const columns = [
    { key: "ragione_sociale", label: "Ragione Sociale" },
    { key: "piva", label: "Partita IVA" },
    { key: "telefono", label: "Telefono" },
    { key: "email", label: "Email" },
    { key: "tipologia_id", label: "Tipologia" },
  ];

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Archivio Fornitori</h1>
        <button
          onClick={() => navigate("/fornitorisearch")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          ➕ Aggiungi fornitore
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-2 cursor-pointer" onClick={() => toggleSort(col.key)}>
                  <div className="flex items-center gap-1">
                    {col.label}
                    {sortField === col.key && (sortOrder === "asc" ? "▲" : "▼")}
                  </div>
                </th>
              ))}
            </tr>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-2">
                  <input
                    type="text"
                    placeholder="Filtra..."
                    value={filters[col.key] || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        [col.key]: e.target.value,
                      }))
                    }
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredSortedData.length > 0 ? (
              filteredSortedData.map((row, index) => (
                <tr
                  key={row.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition duration-150 ease-in-out`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-2 text-gray-800">
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-gray-500 py-10"
                >
                  Nessun dato disponibile
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fornitori;