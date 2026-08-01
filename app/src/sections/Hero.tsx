import { useEffect, useRef, useCallback } from 'react'
import { useDecrypt } from '../hooks/useDecrypt'

const TICKER_ITEMS = [
  'BTC/USD $67,231.04',
  'ETH/USD $3,412.88',
  'YARN Network: 2,847 Active Nodes',
  'Block Height: 18,492,103',
  'Avg Response: 12ms',
  'Evidence Generated Today: 17,421',
  'Capital Intelligence Jobs: 4,812',
  'Legal Evidence Analysed: 9,842',
  'AI Decisions Executed: 186,000+',
]

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)
  const zVelRef = useRef(2)

  const headlineRef = useDecrypt('The Operating System for Institutional Intelligence', {
    delay: 150,
  })

  // Starfield canvas effect
  const initStarfield = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const stars: { x: number; y: number; z: number; brightness: number }[] = []
    const STAR_COUNT = 3000

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * 2000,
        brightness: Math.random(),
      })
    }

    const animate = () => {
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, width, height)

      const centerX = width / 2 + (mouseRef.current.x - 0.5) * 30
      const centerY = height / 2 + (mouseRef.current.y - 0.5) * 30

      // Smooth z-velocity
      const targetZVel = 2 + scrollRef.current * 0.05
      zVelRef.current += (targetZVel - zVelRef.current) * 0.05
      const zVel = Math.min(zVelRef.current, 15)

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]
        star.z -= zVel

        if (star.z <= 0) {
          star.z = 2000
          star.x = (Math.random() - 0.5) * width * 2
          star.y = (Math.random() - 0.5) * height * 2
        }

        const scale = 1000 / star.z
        const sx = centerX + star.x * scale
        const sy = centerY + star.y * scale
        const size = (1 - star.z / 2000) * 2.5
        const alpha = (1 - star.z / 2000) * star.brightness

        // Warp streak effect when scrolling fast
        if (zVel > 5) {
          const prevScale = 1000 / (star.z + zVel * 2)
          const px = centerX + star.x * prevScale
          const py = centerY + star.y * prevScale

          const gradient = ctx.createLinearGradient(px, py, sx, sy)
          gradient.addColorStop(0, `rgba(100, 150, 255, 0)`)
          gradient.addColorStop(1, `rgba(200, 220, 255, ${alpha * 0.6})`)

          ctx.beginPath()
          ctx.moveTo(px, py)
          ctx.lineTo(sx, sy)
          ctx.strokeStyle = gradient
          ctx.lineWidth = size * 0.5
          ctx.stroke()
        }

        ctx.beginPath()
        ctx.arc(sx, sy, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / width
      mouseRef.current.y = e.clientY / height
    }

    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const cleanup = initStarfield()
    return cleanup
  }, [initStarfield])

  return (
    <section className="relative min-h-[100dvh] flex items-end overflow-hidden">
      {/* Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Content */}
      <div
        className="relative w-full px-6 lg:px-12 pb-16 lg:pb-24 max-w-[1400px] mx-auto"
        style={{ zIndex: 1 }}
      >
        <h1
          ref={headlineRef}
          className="font-display text-display-xl text-white max-w-[1000px]"
        >
          The Operating System for Institutional Intelligence
        </h1>

        <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[480px] mt-6">
          The verified data layer powering capital markets, legal systems, and
          enterprise infrastructure.
        </p>

        <div className="flex flex-col sm:flex-row items-start gap-4 mt-10">
          <button className="btn-primary">Explore the Ecosystem</button>
          <button className="btn-outline">Read Documentation</button>
        </div>

        {/* Live Ticker */}
        <div className="mt-12 overflow-hidden">
          <div className="ticker-animate flex whitespace-nowrap">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span
                key={i}
                className="text-caption text-[rgba(255,255,255,0.35)] mx-8"
              >
                {item}
                <span className="mx-4 text-[rgba(255,255,255,0.15)]">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
