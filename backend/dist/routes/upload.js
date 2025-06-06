import express from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
const { S3 } = AWS;
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ errore: 'Nessun file ricevuto' });
    }
    const s3 = new S3({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const nomeUnivoco = `${uuidv4()}_${file.originalname}`;
    try {
        await s3
            .upload({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: nomeUnivoco,
            Body: file.buffer,
            ContentType: file.mimetype,
        })
            .promise();
        return res.json({ messaggio: 'Upload completato', file: nomeUnivoco });
    }
    catch (error) {
        console.error('Errore upload:', error);
        return res.status(500).json({ errore: 'Errore durante l’upload' });
    }
});
export default router;
