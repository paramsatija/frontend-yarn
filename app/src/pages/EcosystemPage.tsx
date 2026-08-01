import { useEffect, useRef } from 'react'
import {
  TrendingUp,
  Scale,
  Server,
  Vote,
  Vault,
  Brain,
  ArrowRight,
  Activity,
  BarChart3,
  Users,
  FileCheck,
  Wallet,
  Cpu,
} from 'lucide-react'
import { useDecrypt } from '../hooks/useDecrypt'

const ecosystems = [
  {
    id: 'capital',
    title: 'Capital Intelligence',
    subtitle: 'AI-powered investing and portfolio optimization',
    description:
      'Real-time price feeds, volatility surfaces, and risk metrics — all cryptographically attested and delivered with sub-second latency. Capital Intelligence transforms how institutions access and verify market data.',
    accent: '#00ff9d',
    icon: TrendingUp,
    image: '/images/ecosystem-capital.jpg',
    stats: [
      { label: 'Price Feeds', value: '2,400+' },
      { label: 'Avg Latency', value: '<50ms' },
      { label: 'Institutions', value: '180+' },
    ],
    features: [
      { icon: Activity, title: 'Real-time Feeds', desc: 'Sub-50ms price delivery' },
      { icon: BarChart3, title: 'Risk Analytics', desc: 'Volatility surfaces & Greeks' },
      { icon: FileCheck, title: 'Attestation', desc: 'Cryptographic proof of origin' },
      { icon: Wallet, title: 'Settlement', desc: 'Cross-chain verification' },
    ],
  },
  {
    id: 'legal',
    title: 'Legal Intelligence',
    subtitle: 'AI-powered legal research, contracts and compliance',
    description:
      'Transform legal operations with AI-driven contract analysis, regulatory tracking, and compliance monitoring. Every analysis is backed by verifiable evidence trails.',
    accent: '#ffb800',
    icon: Scale,
    image: '/images/ecosystem-legal.jpg',
    stats: [
      { label: 'Contracts Analysed', value: '50K+' },
      { label: 'Jurisdictions', value: '45' },
      { label: 'Accuracy', value: '99.2%' },
    ],
    features: [
      { icon: FileCheck, title: 'Contract Review', desc: 'AI-powered clause analysis' },
      { icon: Users, title: 'Compliance', desc: 'Regulatory monitoring' },
      { icon: Activity, title: 'Risk Scoring', desc: 'Predictive legal risk' },
      { icon: Scale, title: 'Dispute Resolution', desc: 'Evidence-backed arbitration' },
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise Suite',
    subtitle: 'Operational intelligence and workflow automation',
    description:
      'Streamline complex organizational workflows with intelligent automation, real-time analytics, and seamless integration across your existing infrastructure.',
    accent: '#a855f7',
    icon: Server,
    image: '/images/ecosystem-enterprise.jpg',
    stats: [
      { label: 'Workflows', value: '31K+' },
      { label: 'Enterprises', value: '85' },
      { label: 'Uptime', value: '99.99%' },
    ],
    features: [
      { icon: Cpu, title: 'Automation', desc: 'Intelligent workflow engine' },
      { icon: BarChart3, title: 'Analytics', desc: 'Real-time operational insights' },
      { icon: Users, title: 'Integration', desc: 'Seamless system connectivity' },
      { icon: Activity, title: 'Monitoring', desc: 'Proactive SLA management' },
    ],
  },
  {
    id: 'governance',
    title: 'Governance',
    subtitle: 'Transparent governance and on-chain voting',
    description:
      'Enable transparent, auditable governance with on-chain voting, delegation, and real-time participation tracking. Every vote is verifiable and immutable.',
    accent: '#ff6b35',
    icon: Vote,
    image: '/images/ecosystem-governance.jpg',
    stats: [
      { label: 'Votes Cast', value: '12K+' },
      { label: 'Participation', value: '87%' },
      { label: 'Proposals', value: '340' },
    ],
    features: [
      { icon: Vote, title: 'On-chain Voting', desc: 'Transparent decision making' },
      { icon: Users, title: 'Delegation', desc: 'Flexible voting delegation' },
      { icon: FileCheck, title: 'Verification', desc: 'Immutable vote records' },
      { icon: Activity, title: 'Analytics', desc: 'Participation insights' },
    ],
  },
  {
    id: 'treasury',
    title: 'Treasury',
    subtitle: 'Real-time treasury and cash intelligence',
    description:
      'Automated treasury management with real-time reconciliation, multi-sig controls, and comprehensive audit trails. Manage digital assets with institutional-grade security.',
    accent: '#00d4ff',
    icon: Vault,
    image: '/images/ecosystem-treasury.jpg',
    stats: [
      { label: 'Assets Managed', value: '$2.4B' },
      { label: 'Reconciliations', value: '12K+' },
      { label: 'Security Score', value: 'A+' },
    ],
    features: [
      { icon: Wallet, title: 'Cash Management', desc: 'Real-time position tracking' },
      { icon: FileCheck, title: 'Reconciliation', desc: 'Automated matching' },
      { icon: Activity, title: 'Risk Monitor', desc: 'Exposure & liquidity alerts' },
      { icon: Lock, title: 'Multi-sig', desc: 'Institutional custody' },
    ],
  },
  {
    id: 'ai',
    title: 'AI Intelligence Engine',
    subtitle: 'Continuously learning intelligence layer',
    description:
      'The neural core of YARN Protocol. Every interaction, workflow, document, and decision strengthens the collective intelligence of the platform through advanced machine learning.',
    accent: '#ccff00',
    icon: Brain,
    image: '/images/ecosystem-ai.jpg',
    stats: [
      { label: 'Decisions', value: '186K+' },
      { label: 'Models', value: '47' },
      { label: 'Accuracy', value: '97.8%' },
    ],
    features: [
      { icon: Brain, title: 'Machine Learning', desc: 'Continuous model training' },
      { icon: BarChart3, title: 'Predictions', desc: 'Risk & opportunity scoring' },
      { icon: Activity, title: 'NLP Engine', desc: 'Document intelligence' },
      { icon: Cpu, title: 'Optimization', desc: 'Resource allocation AI' },
    ],
  },
]

// Need to import Lock for treasury features
import { Lock } from 'lucide-react'

export default function EcosystemPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useDecrypt('One Ecosystem. Infinite Intelligence.', {})

  useEffect(() => {
    window.scrollTo(0, 0)

    const section = sectionRef.current
    if (!section) return

    const animatedElements = section.querySelectorAll('.ecosystem-animate')

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
    <div ref={sectionRef}>
      {/* Hero */}
      <section className="min-h-[60vh] bg-yarn-base flex items-center pt-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
          <span className="eyebrow text-yarn-neon block mb-6">
            ECOSYSTEM
          </span>
          <h1
            ref={headlineRef}
            className="font-display text-display-xl text-white max-w-[900px]"
          >
            One Ecosystem. Infinite Intelligence.
          </h1>
          <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[560px] mt-6">
            Six interconnected domains. One continuously learning intelligence
            platform. Every interaction strengthens every future interaction.
          </p>
        </div>
      </section>

      {/* Ecosystem Cards */}
      {ecosystems.map((ecosystem, ecoIndex) => (
        <section
          key={ecosystem.id}
          className={`py-24 lg:py-32 ${
            ecoIndex % 2 === 0 ? 'bg-yarn-base' : 'bg-yarn-surface'
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image Side - Alternates */}
              <div
                data-index={ecoIndex}
                className={`ecosystem-animate opacity-0 relative ${
                  ecoIndex % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={ecosystem.image}
                    alt={ecosystem.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to ${
                        ecoIndex % 2 === 0 ? 'right' : 'left'
                      }, transparent 40%, ${
                        ecoIndex % 2 === 0 ? '#0a0a0a' : '#141414'
                      } 100%)`,
                    }}
                  />
                </div>

                {/* Stats overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-6">
                  {ecosystem.stats.map((stat) => (
                    <div key={stat.label}>
                      <span
                        className="text-heading-m block"
                        style={{ color: ecosystem.accent }}
                      >
                        {stat.value}
                      </span>
                      <span className="text-caption text-[rgba(255,255,255,0.5)]">
                        {stat.label.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Side */}
              <div
                className={`${ecoIndex % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                <div
                  data-index={ecoIndex + 1}
                  className="ecosystem-animate opacity-0"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center border mb-6"
                    style={{ borderColor: `${ecosystem.accent}40` }}
                  >
                    <ecosystem.icon
                      size={22}
                      style={{ color: ecosystem.accent }}
                    />
                  </div>
                  <span
                    className="eyebrow block mb-3"
                    style={{ color: ecosystem.accent }}
                  >
                    {ecosystem.title.toUpperCase()}
                  </span>
                  <h2 className="font-display text-display-l text-white mb-4">
                    {ecosystem.subtitle}
                  </h2>
                  <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[440px]">
                    {ecosystem.description}
                  </p>
                  <button
                    className="inline-flex items-center gap-2 mt-8 text-heading-s cursor-pointer group"
                    style={{ color: ecosystem.accent }}
                  >
                    Learn More
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>

                {/* Feature Mini-Grid */}
                <div className="grid grid-cols-2 gap-3 mt-10">
                  {ecosystem.features.map((feature, fIndex) => (
                    <div
                      key={feature.title}
                      data-index={fIndex + 3}
                      className="ecosystem-animate opacity-0 p-4 bg-yarn-elevated hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer"
                    >
                      <feature.icon
                        size={18}
                        className="mb-2"
                        style={{ color: ecosystem.accent }}
                      />
                      <span className="text-body-small text-white block">
                        {feature.title}
                      </span>
                      <span className="text-caption text-[rgba(255,255,255,0.35)]">
                        {feature.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
