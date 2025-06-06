import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@/styles/tableStyles.css";

interface RecordCatasto {
  id: number;
  provincia: string;
  comune: string;
  foglio: string;
  particella: string;
  subalterno: string;
  intestatari: string;
}

const Catasto: React.FC = () => {
  const [dati, setDati] = useState<RecordCatasto[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortField, setSortField] = useState<keyof RecordCatasto | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/catasto").then((res) => {
      setDati(res.data);
    });
  }, []);

  const filteredSortedData = useMemo(() => {
    let result = [...dati];

    for (const key in filters) {
      const value = filters[key]?.toLowerCase();
      if (value) {
        result = result.filter((row) =>
          String(row[key as keyof RecordCatasto])
            .toLowerCase()
            .includes(value)
        );
      }
    }

    if (sortField) {
      result.sort((a, b) => {
        const valA = String(a[sortField]);
        const valB = String(b[sortField]);
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
    }

    return result;
  }, [dati, filters, sortField, sortOrder]);

  const columns: { key: keyof RecordCatasto; label: string }[] = [
    { key: "provincia", label: "Provincia" },
    { key: "comune", label: "Comune" },
    { key: "foglio", label: "Foglio" },
    { key: "particella", label: "Particella" },
    { key: "subalterno", label: "Subalterno" },
    { key: "intestatari", label: "Intestatari" },
  ];

  const toggleSort = (field: keyof RecordCatasto) => {
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
        <h1 className="text-2xl font-bold">Archivio Catasto</h1>
        <button
          onClick={() => navigate("/catastosearch")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          🔍 Ricerca in catasto
        </button>
      </div>

      <div className="table-wrapper">
        <table className="table-base">
          <thead className="table-header">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="table-header-cell cursor-pointer" onClick={() => toggleSort(col.key)}>
                  <div className="flex items-center gap-1">
                    {col.label}
                    {sortField === col.key && (
                      <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="table-header-cell">
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
            {filteredSortedData.map((row) => (
              <tr key={row.id} className="table-row">
                {columns.map((col) => (
                  <td key={col.key} className="table-cell">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
            {filteredSortedData.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="table-cell text-center text-gray-500">
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

export default Catasto;