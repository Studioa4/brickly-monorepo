import React, { useEffect, useState } from 'react'

interface Provincia {
  id: number
  sigla: string
  nome: string
}

interface Comune {
  id: number
  nome_comune: string
}

export default function CatastoSearch() {
  const [province, setProvince] = useState<Provincia[]>([])
  const [comuni, setComuni] = useState<Comune[]>([])
  const [provinciaSelezionata, setProvinciaSelezionata] = useState<string>('')
  const [comuneSelezionato, setComuneSelezionato] = useState<string>('')
  const [sezione, setSezione] = useState('')
  const [foglio, setFoglio] = useState('')
  const [particella, setParticella] = useState('')

  useEffect(() => {
    fetch('/api/catasto/province')
      .then((res) => res.json())
      .then(setProvince)
  }, [])

  useEffect(() => {
    if (provinciaSelezionata) {
      fetch(`/api/catasto/comuni?sigla=${provinciaSelezionata}`)
        .then((res) => res.json())
        .then(setComuni)
    } else {
      setComuni([])
    }
  }, [provinciaSelezionata])

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-6">Ricerca Immobile</h1>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Provincia</label>
          <select
            value={provinciaSelezionata}
            onChange={(e) => setProvinciaSelezionata(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Seleziona una provincia</option>
            {province
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map((prov) => (
                <option key={prov.sigla} value={prov.sigla}>
                  {prov.nome}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Comune</label>
          <select
            value={comuneSelezionato}
            onChange={(e) => setComuneSelezionato(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            disabled={!provinciaSelezionata}
          >
            <option value="">Seleziona un comune</option>
            {comuni
              .sort((a, b) => a.nome_comune.localeCompare(b.nome_comune))
              .map((comune) => (
                <option key={comune.id} value={comune.id}>
                  {comune.nome_comune}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Sezione</label>
          <input
            type="text"
            value={sezione}
            onChange={(e) => setSezione(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Foglio</label>
          <input
            type="text"
            value={foglio}
            onChange={(e) => setFoglio(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Particella</label>
          <input
            type="text"
            value={particella}
            onChange={(e) => setParticella(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>
    </div>
  )
}
