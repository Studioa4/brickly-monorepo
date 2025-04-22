import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './auth/login.js'
import utenteRoutes from './routes/utente.js'
import uploadRoutes from './routes/upload.js'
import { authMiddleware } from './auth/authMiddleware.js'

dotenv.config()

const PORT = process.env.PORT || 10000
const app = express()
app.use(cors())
app.use(express.json())

// Rotte pubbliche
app.use('/api', authRoutes)

// Rotte protette
app.use('/api/utente', authMiddleware, utenteRoutes)
app.use('/api/upload', authMiddleware, uploadRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`✅ Server avviato su http://localhost:${PORT}`)
})
