import { useEffect, useRef, useState, useCallback } from 'react'

const metrics = [
  { label: 'Evidence Generated Today', value: 17421, suffix: '', color: '#ccff00' },
  { label: 'Capital Intelligence Jobs', value: 4812, suffix: '', color: '#00ff9d' },
  { label: 'Legal Evidence Analysed', value: 9842, suffix: '', color: '#ffb800' },
  { label: 'Enterprise Workflows', value: 31527, suffix: '', color: '#a855f7' },
  { label: 'Governance Decisions', value: 218, suffix: '', color: '#ff6b35' },
  { label: 'Treasury Reconciliations', value: 12431, suffix: '', color: '#00d4ff' },
  { label: 'YRN Utility Consumed', value: 1.84, suffix: 'M YRN', color: '#ccff00', decimals: 2 },
  { label: 'AI Decisions Executed', value: 186000, suffix: '+', color: '#ccff00' },
]

function AnimatedCounter({
  target,
  suffix,
  decimals = 0,
  triggered,
  color,
}: {
  target: number
  suffix: string
  decimals?: number
  triggered: boolean
  color: string
}) {
  const [count, setCount] = useState(0)
  const [flickerActive, setFlickerActive] = useState(false)
  const countRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)
  const completedRef = useRef(false)
  const flickerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const duration = 2000

  const startFlicker = useCallback(() => {
    if (flickerIntervalRef.current) return

    flickerIntervalRef.current = setInterval(() => {
      // 30% chance to flicker on each interval
      if (Math.random() > 0.7) {
        setFlickerActive(true)
        setTimeout(() => setFlickerActive(false), 150)
      }
    }, 2000 + Math.random() * 3000)
  }, [])

  useEffect(() => {
    if (!triggered) return

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const currentValue = eased * target
      countRef.current = currentValue
      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        completedRef.current = true
        startFlicker()
      }
    }

    requestAnimationFrame(animate)

    return () => {
      if (flickerIntervalRef.current) {
        clearInterval(flickerIntervalRef.current)
      }
    }
  }, [triggered, target, startFlicker])

  const formatted = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()

  return (
    <span
      className="inline-block transition-all duration-150"
      style={{
        color: flickerActive ? 'rgba(255,255,255,0.3)' : color,
        textShadow: flickerActive ? `0 0 20px ${color}` : 'none',
        transform: flickerActive ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {formatted}
      {suffix}
    </span>
  )
}

export default function LiveMetrics() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTriggered(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-yarn-surface py-24 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="eyebrow text-yarn-neon block mb-4">
            LIVE ECOSYSTEM DASHBOARD
          </span>
          <h2 className="font-display text-display-l text-white">
            The Platform Is Alive.
          </h2>
          <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[480px] mx-auto mt-4">
            Every metric reinforces that YARN is an active institutional platform —
            continuously learning, continuously improving.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-yarn-base p-6 lg:p-8 group hover:bg-yarn-elevated transition-colors duration-300"
            >
              <span className="text-heading-m block mb-2">
                <AnimatedCounter
                  target={metric.value}
                  suffix={metric.suffix}
                  decimals={metric.decimals}
                  triggered={triggered}
                  color={metric.color}
                />
              </span>
              <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase tracking-widest">
                {metric.label}
              </span>

              {/* Animated pulse dot */}
              <div className="flex items-center gap-2 mt-4">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
                  style={{ backgroundColor: metric.color }}
                />
                <span className="text-caption text-[rgba(255,255,255,0.2)]">
                  LIVE
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
