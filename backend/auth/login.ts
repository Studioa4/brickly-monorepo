import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool } from '../db.js'
import { v4 as uuidv4 } from 'uuid'
import nodemailer from 'nodemailer'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const result = await pool.query('SELECT * FROM utenti_studio WHERE email = $1', [email])
    const utente = result.rows[0]

    if (!utente) {
      return res.status(401).json({ errore: 'Email o password non validi' })
    }

    const match = await bcrypt.compare(password, utente.password)

    if (!match) {
      return res.status(401).json({ errore: 'Email o password non validi' })
    }

    // MFA token
    const otp = Math.floor(100000 + Math.random() * 900000)
    const otp_id = uuidv4()

    await pool.query(
      'INSERT INTO otp_mfa (id, email, codice, scadenza) VALUES ($1, $2, $3, NOW() + INTERVAL '10 minutes')',
      [otp_id, email, otp.toString()]
    )

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Codice di verifica Brickly',
      text: `Il tuo codice OTP è: ${otp}`
    })

    return res.json({ mfa: true, otp_id })
  } catch (error) {
    console.error('Errore login:', error)
    return res.status(500).json({ errore: 'Errore durante l’accesso' })
  }
})

export default router
