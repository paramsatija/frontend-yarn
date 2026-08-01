import { useEffect, useRef } from 'react'

interface DecryptOptions {
  finalTextColor?: string
  unresolvedTextColor?: string
  cycleInterval?: number
  cyclesPerCharacter?: number
  maxCycles?: number
  delay?: number
}

export function useDecrypt(
  text: string,
  options: DecryptOptions = {}
) {
  const elementRef = useRef<HTMLHeadingElement>(null)
  const hasTriggered = useRef(false)
  const livingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const {
    finalTextColor = '#ffffff',
    unresolvedTextColor = '#ccff00',
    // Faster defaults — shared by every decrypt headline across the site
    cycleInterval = 16,
    cyclesPerCharacter = 1,
    maxCycles = 6,
    delay = 0,
  } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

    const startLivingText = (el: HTMLHeadingElement) => {
      const originalText = text

      livingIntervalRef.current = setInterval(() => {
        // Pick 1-2 random letter positions (skip spaces)
        const letterPositions: number[] = []
        const validPositions = originalText
          .split('')
          .map((c, i) => (c === ' ' ? -1 : i))
          .filter((i) => i !== -1)

        if (validPositions.length === 0) return

        const count = 1 + Math.floor(Math.random() * 2) // 1 or 2 letters
        for (let i = 0; i < count; i++) {
          const randIdx = Math.floor(Math.random() * validPositions.length)
          letterPositions.push(validPositions[randIdx])
        }

        // Build HTML with flickering letters
        let html = ''
        for (let i = 0; i < originalText.length; i++) {
          if (originalText[i] === ' ') {
            html += ' '
          } else if (letterPositions.includes(i)) {
            const randomChar = chars[Math.floor(Math.random() * chars.length)]
            html += `<span class="decrypt-flicker" style="color:${unresolvedTextColor};text-shadow:0 0 12px ${unresolvedTextColor}">${randomChar}</span>`
          } else {
            html += `<span style="color:${finalTextColor}">${originalText[i]}</span>`
          }
        }
        el.innerHTML = html

        // Restore after a short flicker so the glitch stays snappy
        const restoreDelay = 40 + Math.random() * 30
        setTimeout(() => {
          if (!el.isConnected) return
          let restoreHtml = ''
          for (let i = 0; i < originalText.length; i++) {
            if (originalText[i] === ' ') {
              restoreHtml += ' '
            } else {
              restoreHtml += `<span style="color:${finalTextColor}">${originalText[i]}</span>`
            }
          }
          el.innerHTML = restoreHtml
        }, restoreDelay)
      }, 1800 + Math.random() * 1200) // Every 1.8-3 seconds
    }

    const startDecryption = () => {
      if (hasTriggered.current) return
      hasTriggered.current = true

      const originalText = text
      let cycleCount = 0

      const interval = setInterval(() => {
        cycleCount++
        let decryptedText = ''
        const revealUpTo = Math.floor(cycleCount / cyclesPerCharacter)

        for (let i = 0; i < originalText.length; i++) {
          if (originalText[i] === ' ') {
            decryptedText += ' '
          } else if (i < revealUpTo) {
            decryptedText += originalText[i]
          } else {
            decryptedText += chars[Math.floor(Math.random() * chars.length)]
          }
        }

        element.textContent = decryptedText

        // Color-code the characters using spans
        const childNodes = Array.from(element.childNodes)
        childNodes.forEach((node) => {
          if (node instanceof Text && node.textContent) {
            const fragment = document.createDocumentFragment()
            for (let i = 0; i < node.textContent.length; i++) {
              const span = document.createElement('span')
              span.textContent = node.textContent[i]
              if (node.textContent[i] === ' ') {
                span.style.color = finalTextColor
              } else {
                span.style.color = unresolvedTextColor
                span.style.textShadow = 'none'
              }
              fragment.appendChild(span)
            }
            element.replaceChild(fragment, node)
          }
        })

        if (cycleCount >= originalText.length * cyclesPerCharacter + maxCycles) {
          clearInterval(interval)
          setTimeout(() => {
            element.textContent = originalText
            element.style.color = finalTextColor
            // Start the living text effect after decrypt completes
            startLivingText(element)
          }, 80)
        }
      }, cycleInterval)

      return () => {
        clearInterval(interval)
        if (livingIntervalRef.current) {
          clearInterval(livingIntervalRef.current)
        }
      }
    }

    // Set up IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered.current) {
            if (delay > 0) {
              setTimeout(startDecryption, delay)
            } else {
              startDecryption()
            }
            observer.unobserve(element)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (livingIntervalRef.current) {
        clearInterval(livingIntervalRef.current)
      }
    }
  }, [text, finalTextColor, unresolvedTextColor, cycleInterval, cyclesPerCharacter, maxCycles, delay])

  return elementRef
}
