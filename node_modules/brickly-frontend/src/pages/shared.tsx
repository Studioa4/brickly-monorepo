import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "../styles/tableStyles.css";

interface RecordItem {
  id: string;
  [key: string]: any;
}

interface Column {
  key: string;
  label: string;
}

interface Props {
  title: string;
  apiUrl: string;
  columns: Column[];
}

const DataTable: React.FC<Props> = ({ title, apiUrl, columns }) => {
  const [dati, setDati] = useState<RecordItem[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

  useEffect(() => {
    axios
      .get(`${supabaseUrl}/rest/v1/${apiUrl}`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      })
      .then((res) => {
        setDati(res.data);
      });
  }, [apiUrl, supabaseKey, supabaseUrl]);

  const filteredSortedData = useMemo(() => {
    let result = [...dati];

    for (const key in filters) {
      const value = filters[key]?.toLowerCase();
      if (value) {
        result = result.filter((row) =>
          String(row[key])
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
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="table-wrapper">
        <table className="table-base">
          <thead className="table-header">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="table-header-cell cursor-pointer"
                  onClick={() => toggleSort(col.key)}
                >
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
            {filteredSortedData.length > 0 ? (
              filteredSortedData.map((row) => (
                <tr
                  key={row.id}
                  className="table-row hover:bg-blue-50 transition duration-150 ease-in-out"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="table-cell">
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="table-cell text-center text-gray-500 py-10"
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

export default DataTable;