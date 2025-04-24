
import { Router } from 'express'
import { supabase } from '../supabase.js'

const router = Router()

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('utenti_studio').select('*')

  if (error) {
    return res.status(500).json({ errore: 'Errore dal DB Supabase', dettagli: error.message })
  }

  res.json(data)
})

export default router
