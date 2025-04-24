import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errore, setErrore] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://api.brickly.cloud/api/login', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      setErrore('Email o password errati')
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-4 border rounded shadow text-center space-y-4">
      <h2 className="text-xl font-semibold">Login Brickly</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Accedi
        </button>
      </form>
      {errore && <div className="text-red-600 text-sm">{errore}</div>}
    </div>
  )
}
