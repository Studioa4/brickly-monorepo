import express from 'express';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { fetch } from 'undici';

globalThis.fetch = fetch;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

router.get('/province', async (req, res) => {
  const { data, error } = await supabase.from('province').select('id, nome').order('nome');
  if (error) {
    console.error('Errore Supabase province:', error);
    return res.status(500).json({ message: 'Errore nel recupero province', error });
  }
  res.json(data);
});

router.get('/comuni', async (req, res) => {
  const { provincia_id } = req.query;

  if (!provincia_id) {
    return res.status(400).json({ message: 'Parametro provincia_id mancante' });
  }

  const { data, error } = await supabase
    .from('comuni')
    .select('id, nome, provincia_id')
    .eq('provincia_id', provincia_id)
    .order('nome');

  if (error) {
    console.error('Errore Supabase comuni:', error);
    return res.status(500).json({ message: 'Errore nel recupero comuni', error });
  }

  res.json(data);
});

export default router;