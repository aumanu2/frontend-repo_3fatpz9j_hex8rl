import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/D17NpA0ni2BTjUzp/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white pointer-events-none" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 h-full flex items-center">
        <div className="text-white drop-shadow-lg">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">AI Skin Health Check</h1>
          <p className="mt-4 text-sm md:text-lg max-w-2xl">
            Upload a close-up photo of your skin and get instant insights on common conditions like acne, eczema, or psoriasis.
          </p>
          <p className="mt-3 text-xs md:text-sm opacity-80">This is not a medical diagnosis. Always consult a dermatologist.</p>
          <a href="#analyze" className="inline-block mt-6 md:mt-8 bg-white/90 hover:bg-white text-slate-900 font-semibold px-5 py-3 rounded-lg transition">
            Try it now
          </a>
        </div>
      </div>
    </section>
  )
}
