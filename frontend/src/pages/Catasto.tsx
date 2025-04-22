import React, { useEffect, useState } from 'react'
import DataTable from '../components/tables/DataTable'

// oppure
// import DataTable from '../../components/tables/DataTable'


interface Immobile {
  id: number
  comune: string
  provincia: string
  codice_catastale: string
  sezione_urbana: string | null
  foglio: string
  particella: string
  subalterno: string
  categoria: string
  consistenza: string
  rendita: number | null
}

export default function Catasto() {
  const [dati, setDati] = useState<Immobile[]>([])

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/catasto/immobili')
      const json = await res.json()
      setDati(json)
    }
    load()
  }, [])

  const columns = [
    { accessor: 'comune', Header: 'Comune' },
    { accessor: 'provincia', Header: 'Provincia' },
    { accessor: 'codice_catastale', Header: 'Cod. Catastale' },
    { accessor: 'sezione_urbana', Header: 'Sezione' },
    { accessor: 'foglio', Header: 'Foglio' },
    { accessor: 'particella', Header: 'Particella' },
    { accessor: 'subalterno', Header: 'Sub' },
    { accessor: 'categoria', Header: 'Categoria' },
    { accessor: 'consistenza', Header: 'Consistenza' },
    { accessor: 'rendita', Header: 'Rendita' }
  ]
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Catasto</h1>
        <a href="/CatastoSearch" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          🔍 Ricerca
        </a>
      </div>

      <DataTable
        data={dati}
        columns={columns}
        defaultSortKey="comune"
        colFilter
      />
    </div>
  )
}
