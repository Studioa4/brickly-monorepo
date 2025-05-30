import express from 'express'
import jwt from 'jsonwebtoken'
import speakeasy from 'speakeasy'
import { users } from '../mock/users'

const router = express.Router()
const JWT_SECRET = 'brickly_secret'

router.post('/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email && u.password === password)

  if (!user) return res.status(401).json({ error: 'Credenziali errate' })

  if (user.mfa_attiva) {
    return res.json({ mfa: true, userId: user.id }) // MFA richiesta
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' })
  return res.json({ token })
})

router.post('/mfa/verify', (req, res) => {
  const { userId, code } = req.body
  const user = users.find(u => u.id === userId)

  if (!user || !user.mfa_secret) return res.status(400).json({ error: 'MFA non configurato' })

  const verified = speakeasy.totp.verify({
    secret: user.mfa_secret,
    encoding: 'base32',
    token: code,
  })

  if (!verified) return res.status(401).json({ error: 'Codice non valido' })

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' })
  return res.json({ token })
})

export default router
