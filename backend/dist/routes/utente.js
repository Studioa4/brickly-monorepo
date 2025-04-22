import express from 'express';
const router = express.Router();
router.get('/', (req, res) => {
    res.json({ messaggio: 'Utenti API attiva!' });
});
export default router;
