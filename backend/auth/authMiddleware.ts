import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ errore: 'Token mancante o non valido' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!)
    // @ts-ignore
    req.user = payload
    next()
  } catch (err) {
    return res.status(403).json({ errore: 'Accesso negato' })
  }
}
