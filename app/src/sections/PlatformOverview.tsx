import { useEffect, useRef } from 'react'
import { TrendingUp, Scale, Server, Vote, Vault, ArrowRight } from 'lucide-react'
import { useDecrypt } from '../hooks/useDecrypt'

const domains = [
  {
    number: '01',
    name: 'Capital Markets',
    description: 'Real-time price feeds, volatility surfaces, and risk metrics.',
    icon: TrendingUp,
    accent: '#00ff9d',
  },
  {
    number: '02',
    name: 'Legal Systems',
    description: 'Smart contract attestation and compliance verification.',
    icon: Scale,
    accent: '#ffb800',
  },
  {
    number: '03',
    name: 'Enterprise Infrastructure',
    description: 'Operational intelligence and workflow automation.',
    icon: Server,
    accent: '#a855f7',
  },
  {
    number: '04',
    name: 'Governance',
    description: 'Transparent governance and on-chain voting.',
    icon: Vote,
    accent: '#ff6b35',
  },
  {
    number: '05',
    name: 'Treasury Operations',
    description: 'Real-time treasury and cash intelligence.',
    icon: Vault,
    accent: '#00d4ff',
  },
]

export default function PlatformOverview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useDecrypt('Five Domains. One Verified Layer.', {})

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll('.domain-card')
    const leftCol = section.querySelector('.left-column')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === leftCol) {
              entry.target.classList.add('animate-fade-in-up')
              observer.unobserve(entry.target)
            } else {
              const card = entry.target as HTMLElement
              const index = parseInt(card.dataset.index || '0')
              setTimeout(() => {
                card.classList.add('animate-fade-in-up')
              }, index * 100)
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold: 0.15 }
    )

    if (leftCol) observer.observe(leftCol)
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-yarn-surface py-24 lg:py-48"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left Column - Sticky */}
          <div className="left-column lg:w-[40%] lg:sticky lg:top-32 lg:self-start opacity-0">
            <span className="eyebrow text-yarn-neon block mb-6">
              THE PLATFORM
            </span>
            <h2
              ref={headlineRef}
              className="font-display text-display-l text-white"
            >
              Five Domains. One Verified Layer.
            </h2>
            <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[360px] mt-6">
              YARN Protocol provides cryptographically verified data across
              capital, legal, enterprise, governance, and treasury operations.
              Every data point is attested, every source is transparent, every
              result is auditable.
            </p>
            <span className="inline-flex items-center gap-2 mt-8 text-heading-s text-white cursor-pointer group">
              View Architecture
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>

          {/* Right Column - Scrollable */}
          <div className="lg:w-[60%] flex flex-col">
            {domains.map((domain, index) => (
              <div
                key={domain.number}
                data-index={index}
                className="domain-card opacity-0 flex items-center gap-6 lg:gap-10 py-10 lg:py-12 border-b border-[rgba(255,255,255,0.06)] cursor-pointer transition-all duration-300 hover:bg-yarn-elevated group"
                style={{ paddingLeft: '24px', paddingRight: '24px', marginLeft: '-24px', marginRight: '-24px' }}
              >
                <span className="text-caption text-[rgba(255,255,255,0.35)] w-8 shrink-0">
                  {domain.number}
                </span>
                <div className="flex-1">
                  <h3 className="text-heading-m text-white">{domain.name}</h3>
                  <p className="text-body-small text-[rgba(255,255,255,0.6)] mt-1">
                    {domain.description}
                  </p>
                </div>
                <div
                  className="w-12 h-12 shrink-0 flex items-center justify-center border transition-colors duration-300"
                  style={{
                    borderColor: 'rgba(255,255,255,0.06)',
                  }}
                >
                  <domain.icon
                    size={20}
                    className="transition-colors duration-300"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
