import { useEffect, useRef } from 'react'
import { useDecrypt } from '../hooks/useDecrypt'

const utilityExamples = [
  { service: 'Institutional Due Diligence', cost: '18 YRN' },
  { service: 'Generate Evidence Bundle', cost: '11 YRN' },
  { service: 'Portfolio Intelligence Analysis', cost: '14.2 YRN' },
  { service: 'Enterprise Workflow', cost: '8.5 YRN' },
  { service: 'Contract Intelligence Review', cost: '22 YRN' },
]

export default function YRNUtility() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useDecrypt('Utility, not speculation.', {})

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const animatedElements = section.querySelectorAll('.yrn-animate')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const index = parseInt(el.dataset.index || '0')
            setTimeout(() => {
              el.classList.add('animate-fade-in-up')
            }, index * 80)
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
    <section ref={sectionRef} className="bg-yarn-surface py-24 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div>
            <span className="eyebrow text-yarn-neon block mb-4">
              YRN UTILITY
            </span>
            <h2
              ref={headlineRef}
              className="font-display text-display-l text-white"
            >
              Utility, not speculation.
            </h2>
            <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[400px] mt-6">
              YRN is platform infrastructure. Every premium capability displays
              transparent utility consumption. The experience resembles
              cloud-computing credits rather than token speculation.
            </p>

            {/* Consumption Example */}
            <div className="yrn-animate opacity-0 mt-10 p-6 bg-yarn-base border border-[rgba(255,255,255,0.06)]">
              <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase block mb-4">
                Transaction Example
              </span>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-body-small text-[rgba(255,255,255,0.6)]">
                    Reserved
                  </span>
                  <span className="text-data text-yarn-neon">18 YRN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body-small text-[rgba(255,255,255,0.6)]">
                    Consumed
                  </span>
                  <span className="text-data text-yarn-neon">14.6 YRN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-body-small text-[rgba(255,255,255,0.6)]">
                    Returned
                  </span>
                  <span className="text-data text-yarn-neon">3.4 YRN</span>
                </div>
                <div className="pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  <span className="text-caption text-[rgba(255,255,255,0.35)]">
                    Evidence Record Created
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Utility Pricing */}
          <div className="flex flex-col gap-1">
            {utilityExamples.map((example, index) => (
              <div
                key={example.service}
                data-index={index}
                className="yrn-animate opacity-0 flex items-center justify-between py-6 px-6 bg-yarn-base hover:bg-yarn-elevated transition-colors cursor-pointer group"
              >
                <div>
                  <span className="text-body-small text-white block">
                    {example.service}
                  </span>
                  <span className="text-caption text-[rgba(255,255,255,0.35)]">
                    Estimated Usage
                  </span>
                </div>
                <span className="text-data text-yarn-neon group-hover:brightness-110 transition-all">
                  {example.cost}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
