import type { NextApiRequest, NextApiResponse } from 'next'
import { clientCatastoCore } from '../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await clientCatastoCore.connect()
    const { rows } = await clientCatastoCore.query(
      'SELECT id, sigla, nome FROM province ORDER BY nome ASC'
    )
    await clientCatastoCore.end()
    res.status(200).json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Errore nel recupero province' })
  }
}
