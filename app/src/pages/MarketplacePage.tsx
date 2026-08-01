import { useEffect, useRef, useState } from 'react'
import {
  TrendingUp,
  Scale,
  Server,
  Vote,
  Vault,
  Brain,
  Search,
  Star,
  ArrowRight,
  Check,
} from 'lucide-react'
import { useDecrypt } from '../hooks/useDecrypt'

const modules = [
  {
    icon: TrendingUp,
    name: 'Capital Price Feeds',
    category: 'Capital Intelligence',
    description: 'Real-time price feeds for 2,400+ trading pairs with sub-50ms delivery and cryptographic attestation.',
    price: '0.5',
    unit: 'YRN / 1K requests',
    uptime: '99.999%',
    rating: 4.9,
    accent: '#00ff9d',
    tags: ['Real-time', 'Attested', 'Multi-chain'],
  },
  {
    icon: TrendingUp,
    name: 'Volatility Oracle',
    category: 'Capital Intelligence',
    description: 'On-chain volatility surfaces, Greeks calculation, and risk metric generation for derivatives.',
    price: '2.0',
    unit: 'YRN / request',
    uptime: '99.99%',
    rating: 4.8,
    accent: '#00ff9d',
    tags: ['Derivatives', 'Risk'],
  },
  {
    icon: Scale,
    name: 'Contract Intelligence',
    category: 'Legal Intelligence',
    description: 'AI-powered contract analysis, clause extraction, risk scoring, and compliance verification.',
    price: '12',
    unit: 'YRN / contract',
    uptime: '99.95%',
    rating: 4.9,
    accent: '#ffb800',
    tags: ['AI', 'Compliance'],
  },
  {
    icon: Scale,
    name: 'Legal Research Engine',
    category: 'Legal Intelligence',
    description: 'Cross-jurisdictional legal research with precedent analysis and regulatory tracking across 45 jurisdictions.',
    price: '8',
    unit: 'YRN / query',
    uptime: '99.9%',
    rating: 4.7,
    accent: '#ffb800',
    tags: ['Research', 'Global'],
  },
  {
    icon: Server,
    name: 'Workflow Engine',
    category: 'Enterprise Suite',
    description: 'Intelligent workflow automation with 200+ pre-built connectors and custom trigger logic.',
    price: '5',
    unit: 'YRN / execution',
    uptime: '99.99%',
    rating: 4.8,
    accent: '#a855f7',
    tags: ['Automation', 'Enterprise'],
  },
  {
    icon: Server,
    name: 'Data Integration Hub',
    category: 'Enterprise Suite',
    description: 'Unified data ingestion, transformation, and distribution across your entire technology stack.',
    price: '3',
    unit: 'YRN / 1K events',
    uptime: '99.99%',
    rating: 4.6,
    accent: '#a855f7',
    tags: ['ETL', 'Real-time'],
  },
  {
    icon: Vote,
    name: 'Governance Module',
    category: 'Governance',
    description: 'On-chain voting, delegation management, quorum tracking, and proposal lifecycle management.',
    price: '1',
    unit: 'YRN / vote',
    uptime: '99.999%',
    rating: 4.9,
    accent: '#ff6b35',
    tags: ['Voting', 'DAO'],
  },
  {
    icon: Vote,
    name: 'Treasury Controls',
    category: 'Governance',
    description: 'Multi-signature treasury management with spending limits, approval workflows, and real-time monitoring.',
    price: '3',
    unit: 'YRN / transaction',
    uptime: '99.99%',
    rating: 4.8,
    accent: '#ff6b35',
    tags: ['Multi-sig', 'Security'],
  },
  {
    icon: Vault,
    name: 'Cash Intelligence',
    category: 'Treasury Operations',
    description: 'Real-time cash position tracking, liquidity forecasting, and automated reconciliation across all wallets.',
    price: '4',
    unit: 'YRN / reconcile',
    uptime: '99.95%',
    rating: 4.7,
    accent: '#00d4ff',
    tags: ['Cash', 'Real-time'],
  },
  {
    icon: Brain,
    name: 'Predictive Analytics',
    category: 'AI Intelligence Engine',
    description: 'Machine learning models for risk prediction, opportunity scoring, and trend analysis across all data types.',
    price: '15',
    unit: 'YRN / inference',
    uptime: '99.9%',
    rating: 4.9,
    accent: '#ccff00',
    tags: ['ML', 'Predictive'],
  },
  {
    icon: Brain,
    name: 'NLP Document Engine',
    category: 'AI Intelligence Engine',
    description: 'Natural language processing for document classification, entity extraction, and semantic analysis.',
    price: '10',
    unit: 'YRN / document',
    uptime: '99.9%',
    rating: 4.8,
    accent: '#ccff00',
    tags: ['NLP', 'Documents'],
  },
]

const categories = ['All', 'Capital Intelligence', 'Legal Intelligence', 'Enterprise Suite', 'Governance', 'Treasury Operations', 'AI Intelligence Engine']

export default function MarketplacePage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const headlineRef = useDecrypt('The Intelligence Marketplace.', {})

  const filteredModules = modules.filter((m) => {
    const matchesCategory = activeCategory === 'All' || m.category === activeCategory
    const matchesSearch =
      searchQuery === '' ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  useEffect(() => {
    window.scrollTo(0, 0)

    const section = sectionRef.current
    if (!section) return

    const animatedElements = section.querySelectorAll('.marketplace-animate')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const index = parseInt(el.dataset.index || '0')
            setTimeout(() => {
              el.classList.add('animate-fade-in-up')
            }, index * 60)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [activeCategory])

  return (
    <div ref={sectionRef}>
      {/* Hero */}
      <section className="min-h-[50vh] bg-yarn-base flex items-center justify-center pt-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 text-center">
          <span className="eyebrow text-yarn-neon block mb-6">
            MARKETPLACE
          </span>
          <h1
            ref={headlineRef}
            className="font-display text-display-xl text-white"
          >
            The Intelligence Marketplace.
          </h1>
          <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[520px] mx-auto mt-6">
            Composable intelligence modules. Pay per use. No lock-in. Each
            module strengthens the entire ecosystem.
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="bg-yarn-surface py-6 border-y border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-[400px]">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.35)]"
              />
              <input
                type="text"
                placeholder="Search modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-yarn-base border border-[rgba(255,255,255,0.06)] py-2.5 pl-10 pr-4 text-body-small text-white placeholder:text-[rgba(255,255,255,0.35)] focus:outline-none focus:border-[rgba(255,255,255,0.12)] transition-colors"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-caption uppercase tracking-widest px-4 py-2 transition-all ${
                    activeCategory === cat
                      ? 'bg-yarn-neon text-yarn-base'
                      : 'bg-yarn-base text-[rgba(255,255,255,0.5)] hover:text-white border border-[rgba(255,255,255,0.06)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module Grid */}
      <section className="bg-yarn-base py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {filteredModules.map((module, index) => (
              <div
                key={module.name}
                data-index={index}
                className="marketplace-animate opacity-0 bg-yarn-surface p-6 lg:p-8 hover:bg-yarn-elevated transition-all duration-300 cursor-pointer group"
              >
                {/* Top accent */}
                <div
                  className="h-[2px] w-12 mb-6 transition-all group-hover:w-20"
                  style={{ backgroundColor: module.accent }}
                />

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <module.icon
                    size={22}
                    style={{ color: module.accent }}
                  />
                  <div className="flex items-center gap-1">
                    <Star
                      size={12}
                      className="text-yarn-neon fill-yarn-neon"
                    />
                    <span className="text-caption text-[rgba(255,255,255,0.6)]">
                      {module.rating}
                    </span>
                  </div>
                </div>

                {/* Category */}
                <span
                  className="eyebrow block mb-2"
                  style={{ color: module.accent }}
                >
                  {module.category.toUpperCase()}
                </span>

                {/* Name */}
                <h3 className="text-heading-s text-white mb-2">
                  {module.name}
                </h3>

                {/* Description */}
                <p className="text-body-small text-[rgba(255,255,255,0.5)] mb-4">
                  {module.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {module.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-caption text-[rgba(255,255,255,0.35)] bg-yarn-base px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price & Uptime */}
                <div className="flex items-end justify-between pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  <div>
                    <span
                      className="text-heading-m block"
                      style={{ color: module.accent }}
                    >
                      {module.price}
                    </span>
                    <span className="text-caption text-[rgba(255,255,255,0.35)]">
                      {module.unit.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-caption text-[rgba(255,255,255,0.35)] block">
                      UPTIME
                    </span>
                    <span className="text-body-small text-yarn-green">
                      {module.uptime}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                  <span
                    className="text-caption uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all"
                    style={{ color: module.accent }}
                  >
                    Integrate
                    <ArrowRight size={12} />
                  </span>
                  <Check size={14} className="text-[rgba(255,255,255,0.2)]" />
                </div>
              </div>
            ))}
          </div>

          {filteredModules.length === 0 && (
            <div className="text-center py-20">
              <p className="text-body text-[rgba(255,255,255,0.5)]">
                No modules match your search.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: 'rgba(204, 255, 0, 0.04)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-display text-display-l text-white mb-4">
            Need a custom module?
          </h2>
          <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[480px] mx-auto mb-8">
            Our team can build bespoke intelligence modules tailored to your
            exact operational requirements.
          </p>
          <button className="btn-outline">Request Custom Module</button>
        </div>
      </section>
    </div>
  )
}
