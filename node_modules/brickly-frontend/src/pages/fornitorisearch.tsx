import { useState } from "react";

export default function FornitoriSearch() {
  const [piva, setPiva] = useState("");

  const handleSearch = () => {
    if (piva.trim().length === 11) {
      window.open(`https://www.ufficiocamerale.it/visure/visura-camera-commercio?cf_piva=${piva}`, "_blank");
    } else {
      alert("Inserisci una Partita IVA valida (11 cifre)");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ricerca Fornitore per Partita IVA</h1>
      <p className="mb-4 text-sm text-gray-600">
        Inserisci una partita IVA per cercare informazioni dal sito <strong>ufficiocamerale.it</strong>.
        Questo strumento usa un collegamento esterno non ufficiale. I dati visualizzati sono pubblici, ma forniti da un servizio esterno.
      </p>
      <input
        type="text"
        value={piva}
        onChange={(e) => setPiva(e.target.value)}
        placeholder="Partita IVA (11 cifre)"
        className="w-full border px-3 py-2 rounded mb-4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Cerca fornitore
      </button>
    </div>
  );
}