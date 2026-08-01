import { useEffect, useRef } from 'react'
import {
  FileText,
  BarChart3,
  Cpu,
  Scale,
  TrendingUp,
  ArrowRight,
  Download,
  Clock,
} from 'lucide-react'
import { useDecrypt } from '../hooks/useDecrypt'

const featuredResearch = [
  {
    icon: FileText,
    title: 'The Evidence Economy: How Cryptographic Attestation is Reshaping Institutional Trust',
    category: 'White Paper',
    date: 'June 2025',
    accent: '#ccff00',
    description: 'A comprehensive analysis of how verifiable evidence layers are replacing traditional audit and compliance frameworks across capital markets, legal systems, and enterprise operations.',
    pages: 42,
  },
  {
    icon: BarChart3,
    title: 'Capital Intelligence in 2025: The State of Real-Time Price Infrastructure',
    category: 'Market Analysis',
    date: 'May 2025',
    accent: '#00ff9d',
    description: 'Benchmarking study of latency, reliability, and attestation quality across major oracle providers and institutional data vendors.',
    pages: 28,
  },
]

const researchPapers = [
  {
    icon: Cpu,
    title: 'Continuous Learning in Decentralized Intelligence Networks',
    category: 'Technical',
    date: 'July 2025',
    accent: '#a855f7',
    readTime: '18 min',
  },
  {
    icon: Scale,
    title: 'Legal Smart Contracts: Jurisdictional Challenges and Solutions',
    category: 'Legal',
    date: 'June 2025',
    accent: '#ffb800',
    readTime: '14 min',
  },
  {
    icon: TrendingUp,
    title: 'MEV Protection in Institutional Price Feeds',
    category: 'Technical',
    date: 'May 2025',
    accent: '#00ff9d',
    readTime: '12 min',
  },
  {
    icon: FileText,
    title: 'The YARN Protocol Architecture: A Technical Deep-Dive',
    category: 'Technical',
    date: 'April 2025',
    accent: '#ccff00',
    readTime: '25 min',
  },
  {
    icon: BarChart3,
    title: 'Treasury Operations in the Age of Real-Time Reconciliation',
    category: 'Market Analysis',
    date: 'April 2025',
    accent: '#00d4ff',
    readTime: '16 min',
  },
  {
    icon: Cpu,
    title: 'Zero-Knowledge Proofs for Privacy-Preserving Attestation',
    category: 'Technical',
    date: 'March 2025',
    accent: '#a855f7',
    readTime: '20 min',
  },
]

export default function ResearchPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useDecrypt('Research & Insights.', {})

  useEffect(() => {
    window.scrollTo(0, 0)

    const section = sectionRef.current
    if (!section) return

    const animatedElements = section.querySelectorAll('.research-animate')

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
      <section className="min-h-[50vh] bg-yarn-base flex items-center justify-center pt-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 text-center">
          <span className="eyebrow text-yarn-neon block mb-6">
            RESEARCH
          </span>
          <h1
            ref={headlineRef}
            className="font-display text-display-xl text-white"
          >
            Research & Insights.
          </h1>
          <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[520px] mx-auto mt-6">
            Deep analysis, technical papers, and market intelligence from the
            team building the future of institutional data infrastructure.
          </p>
        </div>
      </section>

      {/* Featured Research */}
      <section className="bg-yarn-surface py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <span className="eyebrow text-yarn-neon block mb-8">
            FEATURED
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
            {featuredResearch.map((paper, index) => (
              <div
                key={paper.title}
                data-index={index}
                className="research-animate opacity-0 bg-yarn-base p-8 lg:p-10 hover:bg-yarn-elevated transition-colors cursor-pointer group"
              >
                <div
                  className="h-[3px] w-16 mb-6"
                  style={{ backgroundColor: paper.accent }}
                />
                <div className="flex items-center gap-3 mb-4">
                  <paper.icon
                    size={20}
                    style={{ color: paper.accent }}
                  />
                  <span
                    className="eyebrow"
                    style={{ color: paper.accent }}
                  >
                    {paper.category.toUpperCase()}
                  </span>
                  <span className="text-caption text-[rgba(255,255,255,0.35)]">
                    {paper.date}
                  </span>
                </div>
                <h3 className="text-heading-m text-white mb-3 group-hover:brightness-110 transition-all">
                  {paper.title}
                </h3>
                <p className="text-body-small text-[rgba(255,255,255,0.5)] mb-6">
                  {paper.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  <span className="text-caption text-[rgba(255,255,255,0.35)]">
                    {paper.pages} PAGES
                  </span>
                  <span
                    className="text-caption uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all"
                    style={{ color: paper.accent }}
                  >
                    <Download size={12} />
                    Download
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Papers Grid */}
      <section className="bg-yarn-base py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <span className="eyebrow text-yarn-neon block mb-8">
            ALL PAPERS
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {researchPapers.map((paper, index) => (
              <div
                key={paper.title}
                data-index={index}
                className="research-animate opacity-0 bg-yarn-surface p-6 lg:p-8 hover:bg-yarn-elevated transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <paper.icon
                    size={18}
                    style={{ color: paper.accent }}
                  />
                  <span
                    className="eyebrow"
                    style={{ color: paper.accent }}
                  >
                    {paper.category.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-heading-s text-white mb-3 group-hover:brightness-110 transition-all">
                  {paper.title}
                </h3>
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  <span className="text-caption text-[rgba(255,255,255,0.35)] flex items-center gap-1">
                    <Clock size={10} />
                    {paper.readTime}
                  </span>
                  <span className="text-caption text-[rgba(255,255,255,0.35)]">
                    {paper.date}
                  </span>
                  <ArrowRight
                    size={12}
                    className="text-[rgba(255,255,255,0.2)] ml-auto group-hover:text-white transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: 'rgba(204, 255, 0, 0.04)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-display text-display-l text-white mb-4">
            Collaborate with our research team.
          </h2>
          <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[480px] mx-auto mb-8">
            We partner with leading academic institutions and industry
            researchers on cutting-edge intelligence infrastructure.
          </p>
          <button className="btn-outline">Contact Research Team</button>
        </div>
      </section>
    </div>
  )
}
