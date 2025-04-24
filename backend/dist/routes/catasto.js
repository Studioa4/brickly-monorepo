import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');
// Ritorna tutte le unità catastali archiviate
router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('catasto').select('*');
    if (error) {
        console.error('Errore Supabase:', error.message);
        return res.status(500).json({ message: 'Errore nel recupero dati catastali' });
    }
    res.json(data);
});
export default router;
