import type { NextApiRequest, NextApiResponse } from 'next'
import { clientCatastoCore } from '../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await clientCatastoCore.connect()
    const result = await clientCatastoCore.query(`
      SELECT
        immobili.id,
        comuni.nome_comune AS comune,
        province.sigla AS provincia,
        comuni.codice_catastale,
        immobili.sezione_urbana,
        immobili.foglio,
        immobili.particella,
        immobili.subalterno,
        immobili.categoria,
        immobili.consistenza,
        immobili.rendita
      FROM immobili
      LEFT JOIN comuni ON immobili.comune_id = comuni.id
      LEFT JOIN province ON comuni.provincia_id = province.id
      ORDER BY comuni.nome_comune ASC
    `)
    await clientCatastoCore.end()
    res.status(200).json(result.rows)
  } catch (err) {
    console.error('❌ Errore API immobili:', err)
    res.status(500).json({ error: 'Errore nel recupero immobili' })
  }
}
