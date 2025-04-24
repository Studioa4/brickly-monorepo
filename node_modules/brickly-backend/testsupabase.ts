import { createClient } from '@supabase/supabase-js';

// Le tue credenziali Supabase
const supabaseUrl = 'https://bizlnfdqwpdcvlwrisme.supabase.co';  // Cambia con il tuo URL se diverso
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpemxuZmRxd3BkY3Zsd3Jpc21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNjA1NTMsImV4cCI6MjA2MDYzNjU1M30.Drv9kzpNfwknlalKz59rwgIOk2iG1pvfpJjFNxx8bK8";  // Inserisci qui la tua API key anonima

// Crea client Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Funzione per testare la connessione e leggere i dati
async function testSupabase() {
  try {
    const { data, error } = await supabase
      .from('province')  // La tua tabella "province"
      .select('*');  // Recupera tutte le province

    if (error) {
      throw error;
    }

    console.log('Dati recuperati:', data);
  } catch (err) {
    console.error('Errore nella connessione a Supabase:', err);
  }
}

testSupabase();
