import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ImpostazioniUtente() {
  const [loading, setLoading] = useState(true)
  const [emailNotifiche, setEmailNotifiche] = useState(true)
  const [tema, setTema] = useState<'light' | 'dark'>('light')
  const [lingua, setLingua] = useState<'it' | 'en'>('it')
  const [messaggio, setMessaggio] = useState('')

  useEffect(() => {
    const fetchUtente = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('/api/utente', {
          headers: { Authorization: `Bearer ${token}` }
        })

        // Imposta valori ricevuti
        setEmailNotifiche(res.data.email_notifiche)
        setTema(res.data.tema_preferito)
        setLingua(res.data.lingua)
      } catch (err) {
        console.error('Errore caricamento preferenze:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUtente()
  }, [])

  const handleSalva = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(
        '/api/utente',
        {
          email_notifiche: emailNotifiche,
          tema_preferito: tema,
          lingua
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setMessaggio('Preferenze salvate con successo ✅')
    } catch (err) {
      console.error(err)
      setMessaggio('Errore nel salvataggio ❌')
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4">Impostazioni utente</h2>

      {loading ? (
        <div className="text-gray-500">Caricamento…</div>
      ) : (
        <form className="space-y-4">
          <label className="block">
            <input
              type="checkbox"
              checked={emailNotifiche}
              onChange={() => setEmailNotifiche(!emailNotifiche)}
              className="mr-2"
            />
            Ricevi email di notifica
          </label>

          <div>
            <label className="block font-semibold">Tema preferito</label>
            <select
              value={tema}
              onChange={(e) => setTema(e.target.value as 'light' | 'dark')}
              className="border p-2 rounded w-full"
            >
              <option value="light">Chiaro</option>
              <option value="dark">Scuro</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Lingua</label>
            <select
              value={lingua}
              onChange={(e) => setLingua(e.target.value as 'it' | 'en')}
              className="border p-2 rounded w-full"
            >
              <option value="it">Italiano</option>
              <option value="en">English</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleSalva}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Salva impostazioni
          </button>

          {messaggio && <p className="text-sm text-green-600">{messaggio}</p>}
        </form>
      )}
    </div>
  )
}
