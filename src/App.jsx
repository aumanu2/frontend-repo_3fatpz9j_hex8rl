import { useState } from 'react'
import Hero from './components/Hero'
import Uploader from './components/Uploader'
import Results from './components/Results'
import History from './components/History'

function App() {
  const [result, setResult] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50">
      <Hero />
      <main className="py-10">
        <section className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800">Understand your skin, quickly and privately</h2>
          <p className="mt-3 text-slate-600">Upload a photo and our AI suggests possible common conditions with confidence scores and care tips.</p>
        </section>
        <Uploader onResult={setResult} />
        <Results result={result} />
        <History />
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-xl font-semibold text-slate-800">Important disclaimer</h3>
            <p className="mt-2 text-slate-700 text-sm">This tool is for informational purposes only and does not provide medical advice or diagnosis. Always consult a qualified healthcare professional.</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
