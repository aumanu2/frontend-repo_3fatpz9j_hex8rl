import { useEffect, useState } from 'react'

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

export default function History() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = getOrCreateUserId()
    fetch(`${baseUrl}/history?user_id=${encodeURIComponent(id)}`)
      .then(r => r.json())
      .then(data => setItems(data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <h3 className="text-xl font-semibold text-slate-800">Your recent analyses</h3>
      <p className="text-slate-600 mt-2">Loading...</p>
    </section>
  )

  if (!items.length) return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <h3 className="text-xl font-semibold text-slate-800">Your recent analyses</h3>
      <p className="text-slate-600 mt-2">No history yet. Analyze an image to see it here.</p>
    </section>
  )

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <h3 className="text-xl font-semibold text-slate-800">Your recent analyses</h3>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white border rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="font-medium text-slate-800">{item.condition}</div>
              <div className="text-blue-700 text-sm">{item.confidence}%</div>
            </div>
            <div className="text-xs text-slate-500 mt-1">{item.created_at ? new Date(item.created_at).toLocaleString() : ''}</div>
            {item.image_name && <div className="text-xs text-slate-500 mt-1">{item.image_name}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
