import { useEffect, useRef } from 'react'
import {
  TrendingUp,
  Scale,
  Server,
  Vote,
  Vault,
  Shield,
  Zap,
  Globe,
  Lock,
  Clock,
  ArrowRight,
} from 'lucide-react'
import { useDecrypt } from '../hooks/useDecrypt'

const domains = [
  {
    number: '01',
    title: 'Capital Markets',
    description:
      'Real-time price feeds, volatility surfaces, and risk metrics — all cryptographically attested and delivered with sub-50ms latency.',
    icon: TrendingUp,
    accent: '#00ff9d',
    features: [
      'Price Feeds',
      'Volatility Oracles',
      'Risk Metrics',
      'Settlement Verification',
      'Cross-Chain Bridges',
      'MEV Protection',
    ],
  },
  {
    number: '02',
    title: 'Legal Systems',
    description:
      'AI-powered legal research, contract analysis, and compliance monitoring with full audit trails.',
    icon: Scale,
    accent: '#ffb800',
    features: [
      'Contract Intelligence',
      'Legal Research',
      'Compliance Monitoring',
      'Dispute Resolution',
      'Regulatory Tracking',
      'Case Analysis',
    ],
  },
  {
    number: '03',
    title: 'Enterprise Infrastructure',
    description:
      'Operational intelligence and workflow automation for complex organizations.',
    icon: Server,
    accent: '#a855f7',
    features: [
      'Workflow Automation',
      'Data Integration',
      'Process Orchestration',
      'Real-time Analytics',
      'Custom Connectors',
      'SLA Monitoring',
    ],
  },
  {
    number: '04',
    title: 'Governance',
    description:
      'Transparent governance and on-chain voting with real-time participation tracking.',
    icon: Vote,
    accent: '#ff6b35',
    features: [
      'On-chain Voting',
      'Proposal Management',
      'Delegation',
      'Quorum Tracking',
      'Vote Verification',
      'Treasury Controls',
    ],
  },
  {
    number: '05',
    title: 'Treasury Operations',
    description:
      'Real-time treasury management with automated reconciliation and reporting.',
    icon: Vault,
    accent: '#00d4ff',
    features: [
      'Cash Management',
      'Reconciliation',
      'Reporting',
      'Risk Monitoring',
      'Multi-sig Controls',
      'Audit Trails',
    ],
  },
]

const architecturePoints = [
  { icon: Shield, label: 'Cryptographic Attestation', desc: 'Every data point is signed and verifiable' },
  { icon: Zap, label: 'Sub-50ms Latency', desc: 'Global edge network for real-time delivery' },
  { icon: Globe, label: 'Multi-Chain Support', desc: 'Ethereum, Solana, Avalanche, and more' },
  { icon: Lock, label: 'Zero-Knowledge Proofs', desc: 'Privacy-preserving verification' },
  { icon: Clock, label: '99.999% Uptime SLA', desc: 'Enterprise-grade reliability guarantee' },
]

export default function PlatformPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useDecrypt('The Operating System for Institutional Intelligence.', {})

  useEffect(() => {
    window.scrollTo(0, 0)

    const section = sectionRef.current
    if (!section) return

    const animatedElements = section.querySelectorAll('.platform-animate')

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
      <section className="min-h-[70vh] bg-yarn-base flex items-center pt-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
          <span className="eyebrow text-yarn-neon block mb-6">
            PLATFORM
          </span>
          <h1
            ref={headlineRef}
            className="font-display text-display-xl text-white max-w-[900px]"
          >
            The Operating System for Institutional Intelligence.
          </h1>
          <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[560px] mt-6">
            Capital. Enterprise. Legal. Governance. Treasury. Evidence. AI.
            Connected through one continuously learning intelligence platform.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
            <button className="btn-primary">Explore Documentation</button>
            <button className="btn-outline">View Architecture</button>
          </div>
        </div>
      </section>

      {/* Architecture Points */}
      <section className="bg-yarn-surface py-16 border-y border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {architecturePoints.map((point, index) => (
              <div
                key={point.label}
                data-index={index}
                className="platform-animate opacity-0 flex flex-col items-center text-center"
              >
                <point.icon size={24} className="text-yarn-neon mb-3" />
                <span className="text-body-small text-white block mb-1">
                  {point.label}
                </span>
                <span className="text-caption text-[rgba(255,255,255,0.35)]">
                  {point.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domain Sections */}
      {domains.map((domain, domainIndex) => (
        <section
          key={domain.number}
          className={`py-24 lg:py-32 ${
            domainIndex % 2 === 0 ? 'bg-yarn-base' : 'bg-yarn-surface'
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left - Domain Info */}
              <div
                data-index={domainIndex}
                className="platform-animate opacity-0"
              >
                <span className="text-caption text-[rgba(255,255,255,0.35)] block mb-4">
                  {domain.number}
                </span>
                <div
                  className="w-12 h-12 flex items-center justify-center border mb-6"
                  style={{ borderColor: `${domain.accent}40` }}
                >
                  <domain.icon size={22} style={{ color: domain.accent }} />
                </div>
                <h2
                  className="font-display text-display-l mb-4"
                  style={{ color: domain.accent }}
                >
                  {domain.title}
                </h2>
                <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[440px]">
                  {domain.description}
                </p>
                <button
                  className="inline-flex items-center gap-2 mt-8 text-heading-s cursor-pointer group"
                  style={{ color: domain.accent }}
                >
                  Explore {domain.title}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>

              {/* Right - Feature Grid */}
              <div className="grid grid-cols-2 gap-1">
                {domain.features.map((feature, featureIndex) => (
                  <div
                    key={feature}
                    data-index={featureIndex + 2}
                    className="platform-animate opacity-0 bg-yarn-elevated p-6 hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer group"
                  >
                    <div
                      className="w-8 h-1 mb-4 transition-all group-hover:w-12"
                      style={{ backgroundColor: `${domain.accent}60` }}
                    />
                    <span className="text-body-small text-white">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Integration CTA */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: 'rgba(204, 255, 0, 0.04)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-display text-display-l text-white mb-8">
            Integrate in hours, not months.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-primary">View API Docs</button>
            <button className="btn-outline">Schedule Demo</button>
          </div>
        </div>
      </section>
    </div>
  )
}
