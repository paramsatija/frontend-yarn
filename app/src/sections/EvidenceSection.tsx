import { useEffect, useRef } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import { useDecrypt } from '../hooks/useDecrypt'

const evidencePoints = [
  'Verifiable',
  'Immutable',
  'AI-Processed',
  'Continuously Improving',
]

const ecosystemFlow = [
  { label: 'User', color: '#ccff00' },
  { label: 'Action', color: '#00ff9d' },
  { label: 'Evidence', color: '#ffb800' },
  { label: 'Collective Intelligence', color: '#a855f7' },
  { label: 'Improved Decision Making', color: '#ff6b35' },
  { label: 'Improved Platform', color: '#00d4ff' },
  { label: 'Higher Quality Evidence', color: '#ccff00' },
  { label: 'Greater Institutional Value', color: '#ffffff' },
]

export default function EvidenceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useDecrypt('Evidence is the foundation.', {})

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const animatedElements = section.querySelectorAll('.evidence-animate')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const index = parseInt(el.dataset.index || '0')
            setTimeout(() => {
              el.classList.add('animate-fade-in-up')
            }, index * 100)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-yarn-base py-24 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Content */}
          <div>
            <span className="eyebrow text-yarn-neon block mb-4">
              EVIDENCE ENGINE
            </span>
            <h2
              ref={headlineRef}
              className="font-display text-display-l text-white"
            >
              Evidence is the foundation.
            </h2>
            <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[440px] mt-6">
              Every action generates evidence. Every piece of evidence strengthens
              the intelligence of the ecosystem. This network effect is the true
              competitive advantage of YARN.
            </p>

            <ul className="mt-8 space-y-4">
              {evidencePoints.map((point, index) => (
                <li
                  key={point}
                  data-index={index}
                  className="evidence-animate opacity-0 flex items-center gap-3"
                >
                  <span className="w-5 h-5 flex items-center justify-center border border-yarn-neon">
                    <Check size={12} className="text-yarn-neon" />
                  </span>
                  <span className="text-body-small text-white">{point}</span>
                </li>
              ))}
            </ul>

            <span className="evidence-animate opacity-0 inline-flex items-center gap-2 mt-10 text-heading-s text-white cursor-pointer group">
              Explore Evidence Engine
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>

          {/* Right Column - Flow Visualization */}
          <div className="relative">
            <div className="flex flex-col gap-0">
              {ecosystemFlow.map((item, index) => (
                <div
                  key={item.label}
                  data-index={index + 4}
                  className="evidence-animate opacity-0 flex items-center gap-4 py-4 border-l-2 border-[rgba(255,255,255,0.06)] pl-6 relative"
                  style={{
                    borderLeftColor: `${item.color}30`,
                  }}
                >
                  {/* Node dot */}
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[5px] w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />

                  <span
                    className="text-heading-s"
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Connecting lines glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute left-[5px] top-0 bottom-0 w-px opacity-30"
                style={{
                  background:
                    'linear-gradient(to bottom, #ccff00, #00ff9d, #ffb800, #a855f7, #ff6b35, #00d4ff, #ccff00, #ffffff)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
