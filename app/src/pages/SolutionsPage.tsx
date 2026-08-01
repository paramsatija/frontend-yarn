import { useEffect, useRef } from 'react'
import {
  TrendingUp,
  Scale,
  Building2,
  Users,
  Vault,
  ArrowRight,
  BarChart3,
  Clock,
  Shield,
  Zap,
} from 'lucide-react'
import { useDecrypt } from '../hooks/useDecrypt'

const solutions = [
  {
    icon: TrendingUp,
    title: 'For Asset Managers',
    subtitle: 'Capital Intelligence',
    accent: '#00ff9d',
    problem: 'Fragmented data sources, manual reconciliation, delayed risk reporting.',
    solution: 'Unified capital intelligence with real-time price feeds, automated risk metrics, and cryptographically attested settlement verification.',
    metrics: [
      { label: 'Data Sources Consolidated', value: '12→1' },
      { label: 'Reporting Time', value: '-85%' },
      { label: 'Settlement Errors', value: '-99%' },
    ],
  },
  {
    icon: Scale,
    title: 'For Law Firms',
    subtitle: 'Legal Intelligence',
    accent: '#ffb800',
    problem: 'Contract review bottlenecks, compliance gaps, evidence collection inefficiencies.',
    solution: 'AI-powered contract intelligence with automated clause analysis, regulatory tracking, and verifiable evidence trails.',
    metrics: [
      { label: 'Review Speed', value: '6x' },
      { label: 'Compliance Accuracy', value: '99.2%' },
      { label: 'Hours Saved/Quarter', value: '200+' },
    ],
  },
  {
    icon: Building2,
    title: 'For Enterprises',
    subtitle: 'Enterprise Suite',
    accent: '#a855f7',
    problem: 'Siloed operational data, manual workflows, limited cross-system visibility.',
    solution: 'End-to-end operational intelligence with automated workflows, real-time analytics, and seamless system integration.',
    metrics: [
      { label: 'Workflow Automation', value: '94%' },
      { label: 'System Integration', value: '<48h' },
      { label: 'Operational Visibility', value: 'Real-time' },
    ],
  },
  {
    icon: Users,
    title: 'For DAOs',
    subtitle: 'Governance',
    accent: '#ff6b35',
    problem: 'Opaque voting, low participation, governance capture risks.',
    solution: 'Transparent on-chain governance with real-time participation tracking, delegation analytics, and immutable vote verification.',
    metrics: [
      { label: 'Participation Rate', value: '87%' },
      { label: 'Vote Verification', value: '100%' },
      { label: 'Proposal Throughput', value: '3x' },
    ],
  },
  {
    icon: Vault,
    title: 'For Treasury Departments',
    subtitle: 'Treasury Operations',
    accent: '#00d4ff',
    problem: 'Multi-wallet complexity, delayed reconciliation, compliance reporting burden.',
    solution: 'Automated treasury management with real-time position tracking, instant reconciliation, and comprehensive audit trails.',
    metrics: [
      { label: 'Reconciliation Time', value: '-90%' },
      { label: 'Audit Readiness', value: 'Always' },
      { label: 'Security Score', value: 'A+' },
    ],
  },
]

const benefits = [
  { icon: Shield, title: 'Cryptographically Verified', desc: 'Every data point attested, every action auditable' },
  { icon: Zap, title: 'Sub-50ms Latency', desc: 'Global edge network for real-time delivery' },
  { icon: Clock, title: 'Deploy in Hours', desc: 'Not months. Full SDKs, documentation, sandbox' },
  { icon: BarChart3, title: 'Continuous Improvement', desc: 'Every interaction makes the platform smarter' },
]

export default function SolutionsPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useDecrypt('Built for Institutions. Trusted by Leaders.', {})

  useEffect(() => {
    window.scrollTo(0, 0)

    const section = sectionRef.current
    if (!section) return

    const animatedElements = section.querySelectorAll('.solutions-animate')

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
            SOLUTIONS
          </span>
          <h1
            ref={headlineRef}
            className="font-display text-display-xl text-white max-w-[900px]"
          >
            Built for Institutions. Trusted by Leaders.
          </h1>
          <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[560px] mt-6">
            YARN Protocol provides purpose-built intelligence solutions for the
            world's most demanding institutions. Every deployment strengthens
            the collective intelligence of the entire ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
            <button className="btn-primary">Schedule a Demo</button>
            <button className="btn-outline">View Case Studies</button>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="bg-yarn-surface py-12 border-y border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, index) => (
              <div
                key={b.title}
                data-index={index}
                className="solutions-animate opacity-0 flex items-start gap-4"
              >
                <b.icon size={22} className="text-yarn-neon shrink-0 mt-0.5" />
                <div>
                  <span className="text-body-small text-white block mb-1">
                    {b.title}
                  </span>
                  <span className="text-caption text-[rgba(255,255,255,0.35)]">
                    {b.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Cards */}
      {solutions.map((solution, index) => (
        <section
          key={solution.title}
          className={`py-20 lg:py-28 ${
            index % 2 === 0 ? 'bg-yarn-base' : 'bg-yarn-surface'
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left - Info */}
              <div
                data-index={index}
                className="solutions-animate opacity-0"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center border mb-6"
                  style={{ borderColor: `${solution.accent}40` }}
                >
                  <solution.icon size={22} style={{ color: solution.accent }} />
                </div>
                <span
                  className="eyebrow block mb-3"
                  style={{ color: solution.accent }}
                >
                  {solution.subtitle.toUpperCase()}
                </span>
                <h2 className="font-display text-display-l text-white mb-6">
                  {solution.title}
                </h2>

                <div className="mb-6">
                  <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase tracking-widest block mb-2">
                    The Problem
                  </span>
                  <p className="text-body text-[rgba(255,255,255,0.5)]">
                    {solution.problem}
                  </p>
                </div>

                <div className="mb-8">
                  <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase tracking-widest block mb-2">
                    The Solution
                  </span>
                  <p className="text-body text-[rgba(255,255,255,0.6)]">
                    {solution.solution}
                  </p>
                </div>

                <button
                  className="inline-flex items-center gap-2 text-heading-s cursor-pointer group"
                  style={{ color: solution.accent }}
                >
                  Learn More
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>

              {/* Right - Metrics */}
              <div className="bg-yarn-elevated p-8 lg:p-10">
                <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase tracking-widest block mb-8">
                  Impact Metrics
                </span>
                <div className="space-y-8">
                  {solution.metrics.map((metric, mIndex) => (
                    <div
                      key={metric.label}
                      data-index={mIndex + 2}
                      className="solutions-animate opacity-0"
                    >
                      <span
                        className="text-heading-m block mb-1"
                        style={{ color: solution.accent }}
                      >
                        {metric.value}
                      </span>
                      <span className="text-body-small text-[rgba(255,255,255,0.5)]">
                        {metric.label}
                      </span>
                      {mIndex < solution.metrics.length - 1 && (
                        <div className="h-px bg-[rgba(255,255,255,0.06)] mt-8" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: 'rgba(204, 255, 0, 0.04)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-display text-display-l text-white mb-8">
            Every institution is unique.
          </h2>
          <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[480px] mx-auto mb-8">
            Let us design a custom intelligence solution for your specific
            operational requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-primary">Schedule a Demo</button>
            <button className="btn-outline">Contact Sales</button>
          </div>
        </div>
      </section>
    </div>
  )
}
