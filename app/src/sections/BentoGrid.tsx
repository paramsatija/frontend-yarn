import { useEffect, useRef } from 'react'
import {
  TrendingUp,
  Scale,
  Server,
  Vote,
  Vault,
  Brain,
  ArrowUpRight,
} from 'lucide-react'

const bentoCards = [
  {
    id: 'capital',
    title: 'Capital Markets',
    description: 'Real-time price feeds, volatility surfaces, and risk metrics — all cryptographically attested and delivered with sub-second latency.',
    accent: '#00ff9d',
    colSpan: 'lg:col-span-8',
    rowSpan: 'lg:row-span-2',
    icon: TrendingUp,
    image: '/images/ecosystem-capital.jpg',
    stats: [
      { label: 'Price Feeds', value: '2,400+' },
      { label: 'Avg Latency', value: '<50ms' },
    ],
  },
  {
    id: 'legal',
    title: 'Legal Intelligence',
    description: 'AI-powered legal research, contract analysis, and compliance monitoring.',
    accent: '#ffb800',
    colSpan: 'lg:col-span-4',
    rowSpan: 'lg:row-span-1',
    icon: Scale,
    image: '/images/ecosystem-legal.jpg',
    stats: [],
  },
  {
    id: 'enterprise',
    title: 'Enterprise Suite',
    description: 'Operational intelligence and workflow automation for complex organizations.',
    accent: '#a855f7',
    colSpan: 'lg:col-span-4',
    rowSpan: 'lg:row-span-1',
    icon: Server,
    image: '/images/ecosystem-enterprise.jpg',
    stats: [],
  },
  {
    id: 'governance',
    title: 'Governance',
    description: 'Transparent governance and on-chain voting with real-time participation tracking.',
    accent: '#ff6b35',
    colSpan: 'lg:col-span-4',
    rowSpan: 'lg:row-span-1',
    icon: Vote,
    image: '/images/ecosystem-governance.jpg',
    stats: [],
  },
  {
    id: 'treasury',
    title: 'Treasury Operations',
    description: 'Real-time treasury management with automated reconciliation and reporting.',
    accent: '#00d4ff',
    colSpan: 'lg:col-span-4',
    rowSpan: 'lg:row-span-1',
    icon: Vault,
    image: '/images/ecosystem-treasury.jpg',
    stats: [],
  },
  {
    id: 'ai',
    title: 'AI Intelligence Engine',
    description: 'Continuously learning intelligence layer that compounds with every interaction across the ecosystem.',
    accent: '#ccff00',
    colSpan: 'lg:col-span-4',
    rowSpan: 'lg:row-span-1',
    icon: Brain,
    image: '/images/ecosystem-ai.jpg',
    stats: [
      { label: 'AI Decisions', value: '186K+' },
      { label: 'Models', value: '47' },
    ],
  },
]

export default function BentoGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll('.bento-card')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement
            const index = parseInt(card.dataset.index || '0')
            setTimeout(() => {
              card.style.opacity = '1'
              card.style.transform = 'translateY(0)'
            }, index * 80)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-yarn-base py-24 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <span className="eyebrow text-yarn-neon block mb-4">
            THE ECOSYSTEM
          </span>
          <h2 className="font-display text-display-l text-white max-w-[600px]">
            One Intelligence Platform. Infinite Possibilities.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1">
          {bentoCards.map((card, index) => (
            <div
              key={card.id}
              data-index={index}
              className={`bento-card relative overflow-hidden bg-yarn-surface p-8 lg:p-10 transition-all duration-500 cursor-pointer group hover:bg-yarn-elevated ${card.colSpan} ${card.rowSpan}`}
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease, background-color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.borderColor = `${card.accent}30`
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.borderColor = 'transparent'
              }}
            >
              {/* Top accent border */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: card.accent }}
              />

              {/* Background Image */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-10 h-10 flex items-center justify-center border"
                    style={{ borderColor: `${card.accent}40` }}
                  >
                    <card.icon size={18} style={{ color: card.accent }} />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-[rgba(255,255,255,0.35)] group-hover:text-white transition-colors"
                  />
                </div>

                {/* Eyebrow */}
                <span
                  className="eyebrow block mb-3"
                  style={{ color: card.accent }}
                >
                  {card.title.toUpperCase()}
                </span>

                {/* Description */}
                <p className="text-body-small text-[rgba(255,255,255,0.6)] max-w-[360px]">
                  {card.description}
                </p>

                {/* Stats if available */}
                {card.stats.length > 0 && (
                  <div className="flex gap-8 mt-8">
                    {card.stats.map((stat) => (
                      <div key={stat.label}>
                        <span
                          className="text-heading-m block"
                          style={{ color: card.accent }}
                        >
                          {stat.value}
                        </span>
                        <span className="text-caption text-[rgba(255,255,255,0.35)]">
                          {stat.label.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
