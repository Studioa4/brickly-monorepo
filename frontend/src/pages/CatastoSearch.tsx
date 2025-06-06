import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Comune {
  id: number;
  nome: string;
  provincia_id: number;
}

interface Provincia {
  id: number;
  nome: string;
}

const CatastoSearch: React.FC = () => {
  const [province, setProvince] = useState<Provincia[]>([]);
  const [comuni, setComuni] = useState<Comune[]>([]);
  const [provinciaId, setProvinciaId] = useState<number | null>(null);
  const [comuneId, setComuneId] = useState<number | null>(null);
  const [sezione, setSezione] = useState("");
  const [foglio, setFoglio] = useState("");
  const [particella, setParticella] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/catasto/province").then((res) => setProvince(res.data));
  }, []);

  useEffect(() => {
    if (provinciaId) {
      axios.get(`/api/catasto/comuni?provincia_id=${provinciaId}`).then((res) => {
        setComuni(res.data);
      });
    } else {
      setComuni([]);
    }
  }, [provinciaId]);

  const handleSearch = () => {
    if (!comuneId || !sezione || !particella) {
      alert("Compila tutti i campi obbligatori.");
      return;
    }

    axios.post("/api/catasto/search", {
      comune_id: comuneId,
      sezione,
      foglio: foglio || null,
      particella
    }).then(() => {
      navigate("/catasto");
    }).catch(() => {
      alert("Errore nella richiesta.");
    });
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white shadow rounded mt-10">
      <h1 className="text-xl font-bold mb-6 text-center">🔍 Ricerca in catasto</h1>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm mb-1 font-medium">Provincia</label>
          <select
            value={provinciaId || ""}
            onChange={(e) => setProvinciaId(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Seleziona provincia</option>
            {province.map((prov) => (
              <option key={prov.id} value={prov.id}>{prov.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">Comune</label>
          <select
            value={comuneId || ""}
            onChange={(e) => setComuneId(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
            disabled={!provinciaId}
          >
            <option value="">Seleziona comune</option>
            {comuni.map((comune) => (
              <option key={comune.id} value={comune.id}>{comune.nome}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm mb-1 font-medium">Sezione *</label>
            <input
              value={sezione}
              onChange={(e) => setSezione(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Es. A"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm mb-1 font-medium">Foglio</label>
            <input
              value={foglio}
              onChange={(e) => setFoglio(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Es. 123"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm mb-1 font-medium">Particella *</label>
            <input
              value={particella}
              onChange={(e) => setParticella(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Es. 456"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => navigate("/catasto")}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Annulla
          </button>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ricerca
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatastoSearch;