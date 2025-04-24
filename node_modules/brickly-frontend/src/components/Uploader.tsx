import React, { useState } from 'react'
import axios from 'axios'

export default function Uploader() {
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [errore, setErrore] = useState('')

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setErrore('')
    setUrl('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const token = localStorage.getItem('token')

      await axios.post('/api/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      setUrl(res.data.fileUrl)
    } catch (err) {
      console.error(err)
      setErrore('Errore durante l’upload')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Upload documento</h2>

      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />

      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {uploading ? 'Caricamento…' : 'Carica'}
      </button>

      {errore && <div className="text-red-500">{errore}</div>}

      {url && (
        <div className="text-green-600">
          ✅ Upload completato! <br />
          <a href={url} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
            Visualizza file
          </a>
        </div>
      )}
    </div>
  )
}
