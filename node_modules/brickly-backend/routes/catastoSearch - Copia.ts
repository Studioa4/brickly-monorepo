import { Router } from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { fetch } from 'undici'; // 👈 Fix per Node.js moderno

globalThis.fetch = fetch; // 👈 Impostiamo fetch globale

dotenv.config({ path: "../../../.env" }); // Manteniamo corretto il percorso

const router = Router();

const supabaseUrl = process.env.DB_CAT_CORE_URL ?? "";
const supabaseKey = process.env.DB_CAT_CORE_KEY ?? "";

const supabase = createClient(supabaseUrl, supabaseKey);

// Rotta per ottenere tutte le province
router.get("/province", async (req, res) => {
  try {
    console.log("✅ [API] Chiamata a /province ricevuta");
    const { data, error } = await supabase.from("province").select("*").order("nome", { ascending: true });

    if (error) {
      console.error("❌ Errore Supabase province:", error);
      return res.status(500).json({ message: "Errore nel recupero province", error });
    }

    res.json(data);
  } catch (err) {
    console.error("❌ Errore nel server:", err);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

// Rotta per ottenere i comuni di una provincia
router.get("/comuni/:provincia", async (req, res) => {
  try {
    const provincia = req.params.provincia;
    console.log(`✅ [API] Chiamata a /comuni/${provincia} ricevuta`);

    const { data, error } = await supabase
      .from("comuni")
      .select("*")
      .eq("provincia", provincia)
      .order("nome", { ascending: true });

    if (error) {
      console.error("❌ Errore Supabase comuni:", error);
      return res.status(500).json({ message: "Errore nel recupero comuni", error });
    }

    res.json(data);
  } catch (err) {
    console.error("❌ Errore nel server:", err);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

export default router;
