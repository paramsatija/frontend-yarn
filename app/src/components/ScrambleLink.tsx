import { useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

interface ScrambleLinkProps {
  to: string
  children: string
  className?: string
  onClick?: () => void
}

export default function ScrambleLink({ to, children, className, onClick }: ScrambleLinkProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isScrambling = useRef(false)

  const scramble = useCallback(() => {
    if (isScrambling.current) return
    isScrambling.current = true

    const originalText = children
    const el = spanRef.current
    if (!el) return

    let frame = 0
    const totalFrames = 5 // ~100ms at 20ms interval

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      frame++
      const revealUpTo = Math.floor((frame / totalFrames) * originalText.length)

      let displayText = ''
      for (let i = 0; i < originalText.length; i++) {
        if (i < revealUpTo) {
          displayText += originalText[i]
        } else {
          displayText += chars[Math.floor(Math.random() * chars.length)]
        }
      }

      el.textContent = displayText

      if (frame >= totalFrames) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        el.textContent = originalText
        isScrambling.current = false
      }
    }, 20)
  }, [children])

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (spanRef.current) spanRef.current.textContent = children
    isScrambling.current = false
  }, [children])

  return (
    <Link
      to={to}
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      onClick={onClick}
    >
      <span ref={spanRef}>{children}</span>
    </Link>
  )
}
