import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', authRoutes)

app.listen(3001, () => {
  console.log('Brickly backend con MFA avviato su http://localhost:3001')
})
