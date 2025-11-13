import { useState } from 'react'
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function getOrCreateUserId() {
  const key = 'skinai_user_id'
  let id = localStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(key, id)
  }
  return id
}

export default function Uploader({ onResult }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files?.[0]
    if (f) handleFile(f)
  }

  const handleFile = (f) => {
    if (!f.type.startsWith('image/')) {
      setError('Please upload an image file (jpg, png, jpeg).')
      return
    }
    setError('')
    setFile(f)
    const url = URL.createObjectURL(f)
    setPreview(url)
  }

  const onChange = (e) => {
    const f = e.target.files?.[0]
    if (f) handleFile(f)
  }

  const analyze = async () => {
    if (!file) return
    try {
      setLoading(true)
      setError('')
      const form = new FormData()
      form.append('file', file)
      const uid = getOrCreateUserId()
      form.append('user_id', uid)
      const res = await fetch(`${baseUrl}/analyze`, {
        method: 'POST',
        body: form
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || 'Analysis failed')
      }
      const data = await res.json()
      onResult?.(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="analyze" className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-800">Upload a photo</h2>
      <p className="text-slate-600 mt-2">Drag and drop or select a clear, well-lit image of the affected area.</p>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`mt-6 border-2 border-dashed rounded-xl p-8 bg-white transition ${dragOver ? 'border-blue-400 bg-blue-50' : 'border-slate-300'}`}
      >
        {!preview ? (
          <div className="flex flex-col items-center justify-center text-slate-600">
            <Upload className="w-10 h-10" />
            <p className="mt-3">Drag & drop image here</p>
            <p className="text-xs opacity-70">or</p>
            <label className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
              <ImageIcon className="w-4 h-4" /> Choose file
              <input type="file" accept="image/*" className="hidden" onChange={onChange} />
            </label>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <img src={preview} alt="preview" className="w-full rounded-lg shadow" />
              <button onClick={() => { setFile(null); setPreview('') }} className="mt-3 text-sm text-blue-600 hover:underline">Choose another image</button>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-800">Ready to analyze</h3>
              <p className="text-sm text-slate-600 mt-1">We send the image securely to our AI for a quick check.</p>
              <button onClick={analyze} disabled={loading} className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">
                {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>) : 'Analyze Image'}
              </button>
              {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
