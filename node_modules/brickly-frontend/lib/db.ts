import { Client } from 'pg'
import path from 'path'
import dotenv from 'dotenv'

// Carica il file .env dalla root del progetto Brickly
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') })

export const clientCatastoCore = new Client({
  connectionString: process.env.DB_CAT_CORE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})
