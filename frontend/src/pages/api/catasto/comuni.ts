import type { NextApiRequest, NextApiResponse } from 'next'
import { clientCatastoCore } from '../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sigla = req.query.sigla?.toString().toUpperCase()

  if (!sigla) {
    return res.status(400).json({ error: 'Sigla provincia mancante' })
  }

  try {
    await clientCatastoCore.connect()
    const result = await clientCatastoCore.query(
      `SELECT comuni.id, comuni.nome_comune
       FROM comuni
       JOIN province ON comuni.provincia_id = province.id
       WHERE province.sigla = $1
       ORDER BY comuni.nome_comune ASC`,
      [sigla]
    )
    await clientCatastoCore.end()
    res.status(200).json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Errore nel recupero comuni' })
  }
}
