import { useEffect, useRef, useState } from 'react'
import {
  ChevronDown,
  Play,
  BookOpen,
  MessageCircle,
  ArrowRight,
  Zap,
  Shield,
  Cpu,
  Wallet,
  Layers,
} from 'lucide-react'
import { useDecrypt } from '../hooks/useDecrypt'

const faqs = [
  {
    question: 'What is the Evidence Engine?',
    answer: 'The Evidence Engine is the core intelligence layer of YARN Protocol. Every action, transaction, workflow, and decision generates cryptographically attested evidence. This evidence feeds back into the platform, continuously improving every service. The result is a self-reinforcing intelligence loop where every interaction makes the platform smarter.',
    icon: Cpu,
  },
  {
    question: 'How does YRN utility work?',
    answer: 'YRN is platform infrastructure, not a speculative asset. Think of it like cloud-computing credits. Each premium capability displays transparent YRN consumption before execution. After execution, you see exactly what was reserved, consumed, and returned. Unused YRN is always returned to your balance.',
    icon: Wallet,
  },
  {
    question: 'Is YARN Protocol secure for institutional use?',
    answer: 'Yes. YARN Protocol uses cryptographic attestation for every data point, zero-knowledge proofs for privacy-preserving verification, and multi-signature controls for treasury operations. Our infrastructure maintains a 99.999% uptime SLA with enterprise-grade security auditing.',
    icon: Shield,
  },
  {
    question: 'How quickly can we integrate YARN?',
    answer: 'Most institutions complete initial integration within hours, not months. We provide comprehensive SDKs in JavaScript, Python, Rust, and Go, along with detailed API documentation, a real-time sandbox environment, and dedicated onboarding support for Enterprise customers.',
    icon: Zap,
  },
  {
    question: 'What makes YARN different from other oracle providers?',
    answer: 'YARN is not an oracle provider — it is an integrated intelligence ecosystem. While oracle providers deliver single data points, YARN connects Capital, Legal, Enterprise, Governance, Treasury, and AI into one continuously learning platform where every service shares evidence and improves every other service.',
    icon: Layers,
  },
  {
    question: 'How does the continuous learning loop work?',
    answer: 'Every action on YARN generates evidence. This evidence is processed by the AI Intelligence Engine, which extracts patterns and insights. These insights improve decision-making across all domains, which leads to better platform performance, which generates higher quality evidence. This is the true network effect of YARN Protocol.',
    icon: Cpu,
  },
]

const gettingStartedSteps = [
  {
    number: '01',
    title: 'Create Your Account',
    description: 'Sign up for a free Starter account. No credit card required. Instant access to the sandbox environment.',
  },
  {
    number: '02',
    title: 'Generate API Keys',
    description: 'Create your first API key from the developer dashboard. Full access to documentation and SDKs.',
  },
  {
    number: '03',
    title: 'Start Building',
    description: 'Integrate YARN intelligence into your applications using our SDKs. Deploy to production when ready.',
  },
]

const videoTutorials = [
  {
    title: 'Getting Started with YARN SDK',
    duration: '8:24',
    category: 'Developer',
  },
  {
    title: 'Capital Intelligence: Price Feeds Integration',
    duration: '12:15',
    category: 'Capital',
  },
  {
    title: 'Legal Intelligence: Contract Analysis Setup',
    duration: '10:45',
    category: 'Legal',
  },
  {
    title: 'Understanding YRN Utility Consumption',
    duration: '6:30',
    category: 'Platform',
  },
  {
    title: 'Governance Module: On-chain Voting',
    duration: '9:12',
    category: 'Governance',
  },
  {
    title: 'Enterprise Workflow Automation',
    duration: '14:20',
    category: 'Enterprise',
  },
]

function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      data-index={index}
      className="knowledge-animate opacity-0 border-b border-[rgba(255,255,255,0.06)]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <div className="flex items-center gap-4">
          <faq.icon
            size={18}
            className="text-yarn-neon shrink-0"
          />
          <span className="text-body-small text-white group-hover:brightness-110 transition-all">
            {faq.question}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={`text-[rgba(255,255,255,0.35)] transition-transform duration-300 shrink-0 ml-4 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-body-small text-[rgba(255,255,255,0.6)] pb-6 pl-10">
          {faq.answer}
        </p>
      </div>
    </div>
  )
}

export default function KnowledgeCentrePage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useDecrypt('Knowledge Centre.', {})

  useEffect(() => {
    window.scrollTo(0, 0)

    const section = sectionRef.current
    if (!section) return

    const animatedElements = section.querySelectorAll('.knowledge-animate')

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
      { threshold: 0.1 }
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
            KNOWLEDGE CENTRE
          </span>
          <h1
            ref={headlineRef}
            className="font-display text-display-xl text-white"
          >
            Knowledge Centre.
          </h1>
          <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[520px] mx-auto mt-6">
            Everything you need to understand, integrate, and operate YARN
            Protocol at institutional scale.
          </p>
        </div>
      </section>

      {/* Getting Started */}
      <section className="bg-yarn-surface py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <span className="eyebrow text-yarn-neon block mb-8">
            GETTING STARTED
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {gettingStartedSteps.map((step, index) => (
              <div
                key={step.number}
                data-index={index}
                className="knowledge-animate opacity-0 bg-yarn-base p-8 hover:bg-yarn-elevated transition-colors"
              >
                <span className="text-caption text-[rgba(255,255,255,0.35)] block mb-4">
                  {step.number}
                </span>
                <h3 className="text-heading-s text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-body-small text-[rgba(255,255,255,0.5)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-yarn-base py-16 lg:py-24">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <span className="eyebrow text-yarn-neon block mb-8">
            FREQUENTLY ASKED QUESTIONS
          </span>
          {faqs.map((faq, index) => (
            <FaqItem key={faq.question} faq={faq} index={index} />
          ))}
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="bg-yarn-surface py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <span className="eyebrow text-yarn-neon block mb-8">
            VIDEO TUTORIALS
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {videoTutorials.map((video, index) => (
              <div
                key={video.title}
                data-index={index}
                className="knowledge-animate opacity-0 bg-yarn-base p-6 hover:bg-yarn-elevated transition-colors cursor-pointer group"
              >
                {/* Thumbnail placeholder */}
                <div className="relative aspect-video bg-[rgba(255,255,255,0.03)] mb-4 flex items-center justify-center border border-[rgba(255,255,255,0.06)] group-hover:border-[rgba(255,255,255,0.12)] transition-colors">
                  <div className="w-12 h-12 rounded-full border-2 border-yarn-neon flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play
                      size={18}
                      className="text-yarn-neon ml-0.5"
                    />
                  </div>
                  <span className="absolute bottom-2 right-2 text-caption text-[rgba(255,255,255,0.6)] bg-yarn-base px-2 py-0.5">
                    {video.duration}
                  </span>
                </div>
                <span className="eyebrow text-yarn-neon block mb-2">
                  {video.category.toUpperCase()}
                </span>
                <h3 className="text-body-small text-white group-hover:brightness-110 transition-all">
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: 'rgba(204, 255, 0, 0.04)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <MessageCircle
            size={24}
            className="text-yarn-neon mx-auto mb-4"
          />
          <h2 className="font-display text-display-l text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[480px] mx-auto mb-8">
            Our support team is available for institutional customers. Reach
            out for personalized guidance on integration and operations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-primary flex items-center gap-2">
              <BookOpen size={14} />
              Read Documentation
            </button>
            <button className="btn-outline flex items-center gap-2">
              Contact Support
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
