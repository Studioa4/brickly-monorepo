import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import catastoSearchRoutes from './routes/catastoSearch';

dotenv.config({ path: "../../../../.env" });  // ✅ corretto

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/catasto', catastoSearchRoutes);

const PORT = 10000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});