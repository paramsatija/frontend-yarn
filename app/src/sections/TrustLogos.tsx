const logos = [
  { name: 'BlackRock', width: 100 },
  { name: 'PwC', width: 50 },
  { name: 'Deloitte', width: 90 },
  { name: 'EY', width: 35 },
  { name: 'KPMG', width: 70 },
  { name: 'Morgan Stanley', width: 120 },
]

export default function TrustLogos() {
  return (
    <section className="bg-yarn-base py-16 lg:py-24 border-y border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <p className="text-caption text-[rgba(255,255,255,0.35)] uppercase tracking-widest text-center mb-10">
          Built for institutions. Trusted by leaders.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
          {logos.map((logo) => (
            <span
              key={logo.name}
              className="text-lg lg:text-xl font-medium text-[rgba(255,255,255,0.25)] hover:text-[rgba(255,255,255,0.5)] transition-colors cursor-default select-none"
              style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
