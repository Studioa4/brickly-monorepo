import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.json({ messaggio: 'Utenti API attiva!' });
});
export default router;
