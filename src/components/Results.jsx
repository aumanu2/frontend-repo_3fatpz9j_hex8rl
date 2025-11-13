export default function Results({ result }) {
  if (!result) return null
  const { condition, confidence, about, care, alternatives, disclaimer } = result
  return (
    <section className="max-w-4xl mx-auto px-6 pb-16">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h3 className="text-2xl font-semibold text-slate-800">Most likely: {condition}</h3>
          <div className="text-blue-700 font-semibold">Confidence: {confidence}%</div>
        </div>
        <p className="mt-3 text-slate-700 leading-relaxed">{about}</p>

        {alternatives?.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-slate-800">Other possibilities</h4>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {alternatives.map((a, idx) => (
                <div key={idx} className="border rounded-lg p-3 bg-slate-50">
                  <div className="text-sm font-medium">{a.condition}</div>
                  <div className="text-xs text-slate-600">{a.confidence}%</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <h4 className="font-semibold text-slate-800">Suggested care</h4>
          <ul className="list-disc pl-5 text-slate-700 mt-2 space-y-1">
            {care.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-amber-50 text-amber-800 text-sm">
          {disclaimer}
        </div>
      </div>
    </section>
  )
}
