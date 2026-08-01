import { useEffect, useRef } from 'react'

export default function NetworkViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const isVisibleRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let time = 0

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        width = rect.width
        height = rect.height
        canvas.width = width * Math.min(window.devicePixelRatio, 1.5)
        canvas.height = height * Math.min(window.devicePixelRatio, 1.5)
        ctx.scale(Math.min(window.devicePixelRatio, 1.5), Math.min(window.devicePixelRatio, 1.5))
      }
    }

    resize()

    // Simplex-like noise function
    const noise = (x: number, y: number, t: number) => {
      return (
        Math.sin(x * 0.5 + t) * Math.cos(y * 0.3 + t * 0.7) * 0.5 +
        Math.sin(x * 0.8 - t * 0.5) * Math.sin(y * 0.6 + t * 0.3) * 0.3 +
        Math.cos(x * 0.2 + y * 0.4 + t * 0.8) * 0.2
      )
    }

    const animate = () => {
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, width, height)
      time += 0.008

      const cols = 80
      const rows = 40
      const cellW = width / cols
      const cellH = height / rows

      // Mouse influence
      const mx = mouseRef.current.x * width
      const my = mouseRef.current.y * height

      // Draw wireframe grid
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * cellW
          const y = row * cellH

          const distToMouse = Math.sqrt((x - mx) ** 2 + (y - my) ** 2)
          const mouseInfluence = Math.exp(-distToMouse * 0.003) * 30

          const n = noise(col * 0.15, row * 0.15, time)
          const z = n * 15 + mouseInfluence * Math.sin(time * 3 + distToMouse * 0.01)

          const brightness = 0.3 + (z + 15) / 60
          const alpha = brightness * 0.8

          // Neon green wireframe dots
          const size = 1 + brightness * 1.5

          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(204, 255, 0, ${alpha * 0.6})`
          ctx.fill()

          // Draw connecting lines
          if (col < cols - 1) {
            const nRight = noise((col + 1) * 0.15, row * 0.15, time)
            const zRight = nRight * 15 + mouseInfluence * Math.sin(time * 3 + distToMouse * 0.01)
            const brightnessRight = 0.3 + (zRight + 15) / 60
            const avgBrightness = (brightness + brightnessRight) / 2

            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo((col + 1) * cellW, y)
            ctx.strokeStyle = `rgba(204, 255, 0, ${avgBrightness * 0.15})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }

          if (row < rows - 1) {
            const nDown = noise(col * 0.15, (row + 1) * 0.15, time)
            const zDown = nDown * 15 + mouseInfluence * Math.sin(time * 3 + distToMouse * 0.01)
            const brightnessDown = 0.3 + (zDown + 15) / 60
            const avgBrightness = (brightness + brightnessDown) / 2

            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x, (row + 1) * cellH)
            ctx.strokeStyle = `rgba(204, 255, 0, ${avgBrightness * 0.15})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Scanline overlay
      for (let y = 0; y < height; y += 3) {
        ctx.fillStyle = `rgba(0, 0, 0, 0.08)`
        ctx.fillRect(0, y, width, 1)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = (e.clientX - rect.left) / rect.width
      mouseRef.current.y = (e.clientY - rect.top) / rect.height
    }

    const handleResize = () => {
      resize()
    }

    // IntersectionObserver for visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting
        })
      },
      { threshold: 0.1 }
    )

    if (canvas.parentElement) {
      observer.observe(canvas.parentElement)
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationRef.current)
      canvas.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [])

  return (
    <section className="relative bg-yarn-base min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Canvas Background */}
      <div className="absolute inset-0">
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-6">
        <span className="eyebrow text-[rgba(255,255,255,0.35)] block mb-8">
          LIVE NETWORK FEED
        </span>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          <div>
            <span className="text-data text-yarn-neon uppercase block">
              2,847 ACTIVE NODES
            </span>
          </div>
          <div>
            <span className="text-data text-yarn-neon uppercase block">
              12ms AVG LATENCY
            </span>
          </div>
          <div>
            <span className="text-data text-yarn-neon uppercase block">
              99.999% UPTIME
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
