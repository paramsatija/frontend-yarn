import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    quote:
      'YARN replaced three separate data vendors with a single verified layer. The attestation trail alone saved our compliance team 200 hours per quarter.',
    name: 'Michael Chen',
    title: 'Head of Data Infrastructure',
    company: 'BlackRock',
  },
  {
    quote:
      'The real-time price feeds with cryptographic proofs gave our trading desks the confidence to execute at scale. Sub-50ms latency is a game changer.',
    name: 'Sarah Williams',
    title: 'Managing Director, Global Markets',
    company: 'PwC',
  },
  {
    quote:
      'We evaluated every major oracle provider. YARN was the only one that met our security requirements without compromising on performance.',
    name: 'James Rodriguez',
    title: 'CTO, Digital Assets',
    company: 'Deloitte',
  },
  {
    quote:
      'The legal intelligence module transformed our contract review process. What used to take weeks now takes hours, with full audit trails.',
    name: 'Emily Zhang',
    title: 'General Counsel',
    company: 'EY',
  },
  {
    quote:
      'Treasury reconciliation that used to require a team of five is now fully automated. YARN pays for itself in the first month.',
    name: 'David Park',
    title: 'CFO',
    company: 'KPMG',
  },
  {
    quote:
      'The governance tooling enabled us to conduct board-level votes on-chain with the same rigor as traditional processes. Remarkable.',
    name: 'Anna Kowalski',
    title: 'Head of Blockchain Strategy',
    company: 'Morgan Stanley',
  },
]

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const scrollAmount = el.clientWidth * 0.8
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
    setTimeout(checkScroll, 300)
  }

  return (
    <section className="bg-yarn-surface py-24 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 lg:mb-16">
          <div>
            <span className="eyebrow text-yarn-neon block mb-4">
              TESTIMONIALS
            </span>
            <h2 className="font-display text-display-l text-white">
              Trusted by Leaders.
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 flex items-center justify-center border border-[rgba(255,255,255,0.06)] transition-all ${
                canScrollLeft
                  ? 'hover:border-[rgba(255,255,255,0.12)] text-white'
                  : 'text-[rgba(255,255,255,0.2)] cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-10 h-10 flex items-center justify-center border border-[rgba(255,255,255,0.06)] transition-all ${
                canScrollRight
                  ? 'hover:border-[rgba(255,255,255,0.12)] text-white'
                  : 'text-[rgba(255,255,255,0.2)] cursor-not-allowed'
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="snap-start shrink-0 w-[85vw] sm:w-[45vw] lg:w-[calc(33.333%-16px)] bg-yarn-elevated p-8 lg:p-10 flex flex-col"
            >
              <Quote
                size={24}
                className="text-[rgba(255,255,255,0.1)] mb-6"
              />
              <p className="text-body text-white flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-8">
                <span className="text-heading-s text-white block">
                  {testimonial.name}
                </span>
                <span className="text-caption text-[rgba(255,255,255,0.35)]">
                  {testimonial.title}, {testimonial.company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
