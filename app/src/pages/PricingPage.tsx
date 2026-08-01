import { useEffect, useRef, useState } from 'react'
import { Check, ArrowRight, Zap } from 'lucide-react'
import { useDecrypt } from '../hooks/useDecrypt'

const tiers = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    description: 'Perfect for developers and small projects.',
    cta: 'Start Building',
    ctaStyle: 'outline' as const,
    features: [
      '10,000 requests/month',
      '5 price feeds',
      'Community support',
      'Standard latency',
      'Basic attestation',
      'API access',
    ],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$499',
    period: '/month',
    description: 'For growing institutions that need more.',
    cta: 'Upgrade',
    ctaStyle: 'primary' as const,
    features: [
      '1,000,000 requests/month',
      'All price feeds',
      'Priority support',
      '99.9% uptime SLA',
      'Full attestation suite',
      'Advanced analytics',
      'Custom webhooks',
      'Team management',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Dedicated infrastructure for large institutions.',
    cta: 'Contact Sales',
    ctaStyle: 'outline' as const,
    features: [
      'Unlimited requests',
      'All feeds + custom',
      'Dedicated support',
      '99.999% uptime SLA',
      'Full attestation suite',
      'Advanced analytics',
      'Custom integrations',
      'Dedicated infrastructure',
      'Onboarding assistance',
      'Custom contracts',
    ],
    highlighted: false,
  },
]

export default function PricingPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [requests, setRequests] = useState(500000)
  const headlineRef = useDecrypt('Transparent Pricing.', {})

  useEffect(() => {
    window.scrollTo(0, 0)

    const section = sectionRef.current
    if (!section) return

    const animatedElements = section.querySelectorAll('.pricing-animate')

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

  const calculatedPrice = Math.max(0, Math.round((requests / 1000000) * 499))

  return (
    <div ref={sectionRef}>
      {/* Hero */}
      <section className="min-h-[50vh] bg-yarn-base flex items-center justify-center pt-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 text-center">
          <span className="eyebrow text-yarn-neon block mb-6">
            PRICING
          </span>
          <h1
            ref={headlineRef}
            className="font-display text-display-xl text-white"
          >
            Transparent Pricing.
          </h1>
          <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[440px] mx-auto mt-6">
            Pay for verification, not vendor lock-in. Scale as you grow with
            no hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="bg-yarn-surface py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
            {tiers.map((tier, index) => (
              <div
                key={tier.name}
                data-index={index}
                className={`pricing-animate opacity-0 relative bg-yarn-base p-8 lg:p-10 ${
                  tier.highlighted ? 'lg:-mt-4 lg:mb-4' : ''
                }`}
              >
                {/* Highlight border */}
                {tier.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-yarn-neon" />
                )}

                {/* Recommended badge */}
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-yarn-neon text-yarn-base text-caption uppercase tracking-widest px-4 py-1 font-medium">
                      Recommended
                    </span>
                  </div>
                )}

                <span className="text-heading-m text-white block mb-2">
                  {tier.name}
                </span>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-display text-5xl text-white">
                    {tier.price}
                  </span>
                  <span className="text-body-small text-[rgba(255,255,255,0.5)]">
                    {tier.period}
                  </span>
                </div>
                <p className="text-body-small text-[rgba(255,255,255,0.5)] mb-8">
                  {tier.description}
                </p>

                <button
                  className={`w-full py-3.5 text-caption uppercase tracking-widest font-medium transition-all ${
                    tier.ctaStyle === 'primary'
                      ? 'btn-primary'
                      : 'btn-outline'
                  }`}
                >
                  {tier.cta}
                </button>

                <ul className="mt-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        size={14}
                        className="text-yarn-neon mt-1 shrink-0"
                      />
                      <span className="text-body-small text-[rgba(255,255,255,0.7)]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Calculator */}
      <section className="bg-yarn-base py-24 lg:py-32">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
          <span className="eyebrow text-yarn-neon block mb-4">
            CALCULATOR
          </span>
          <h2 className="font-display text-display-l text-white mb-4">
            Estimate your usage.
          </h2>
          <p className="text-body text-[rgba(255,255,255,0.6)] mb-12">
            Drag the slider to see how pricing scales with your usage.
          </p>

          <div
            data-index={0}
            className="pricing-animate opacity-0 bg-yarn-surface p-8 lg:p-12"
          >
            {/* Slider */}
            <div className="mb-8">
              <input
                type="range"
                min={10000}
                max={5000000}
                step={10000}
                value={requests}
                onChange={(e) => setRequests(Number(e.target.value))}
                className="w-full h-1 bg-[rgba(255,255,255,0.1)] appearance-none cursor-pointer accent-yarn-neon"
                style={{
                  accentColor: '#ccff00',
                } as React.CSSProperties}
              />
              <div className="flex justify-between mt-2">
                <span className="text-caption text-[rgba(255,255,255,0.35)]">
                  10K requests
                </span>
                <span className="text-caption text-[rgba(255,255,255,0.35)]">
                  5M requests
                </span>
              </div>
            </div>

            {/* Selected value */}
            <div className="mb-6">
              <span className="text-caption text-[rgba(255,255,255,0.5)] block mb-2">
                MONTHLY REQUESTS
              </span>
              <span className="text-heading-m text-white">
                {requests.toLocaleString()}
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-[rgba(255,255,255,0.06)] my-6" />

            {/* Estimated cost */}
            <div>
              <span className="text-caption text-[rgba(255,255,255,0.5)] block mb-2">
                ESTIMATED MONTHLY COST
              </span>
              <span className="font-display text-5xl text-yarn-neon">
                ${calculatedPrice.toLocaleString()}
              </span>
              {calculatedPrice === 0 && (
                <span className="text-body-small text-[rgba(255,255,255,0.5)] block mt-2">
                  Free tier — no credit card required
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* YRN Utility Note */}
      <section
        className="py-16 lg:py-24"
        style={{ backgroundColor: 'rgba(204, 255, 0, 0.04)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <Zap size={24} className="text-yarn-neon mx-auto mb-4" />
          <h2 className="font-display text-display-l text-white mb-4">
            Pay in YRN, save 20%.
          </h2>
          <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[480px] mx-auto mb-8">
            All pricing can be paid in YRN tokens at a 20% discount. YRN is
            platform infrastructure — not speculation.
          </p>
          <button className="btn-outline inline-flex items-center gap-2">
            Learn About YRN
            <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  )
}
