import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

let navigateCallback: ((to: string) => void) | null = null

export function usePageTransitionNavigate() {
  return (to: string) => {
    if (navigateCallback) {
      navigateCallback(to)
    }
  }
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState<'idle' | 'fadeOut' | 'fadeIn'>('idle')
  const pendingPath = useRef<string | null>(null)
  const isTransitioning = useRef(false)

  // Expose the transition navigate function
  useEffect(() => {
    navigateCallback = (to: string) => {
      if (isTransitioning.current) return
      if (to === location.pathname) return

      isTransitioning.current = true
      pendingPath.current = to
      setTransitionStage('fadeOut')
    }

    return () => {
      navigateCallback = null
    }
  }, [location.pathname])

  // Handle fade out complete → navigate → fade in
  useEffect(() => {
    if (transitionStage === 'fadeOut') {
      const timer = setTimeout(() => {
        if (pendingPath.current) {
          navigate(pendingPath.current)
          setDisplayLocation({ ...location, pathname: pendingPath.current })
          window.scrollTo(0, 0)
          setTransitionStage('fadeIn')
        }
      }, 350)
      return () => clearTimeout(timer)
    }

    if (transitionStage === 'fadeIn') {
      const timer = setTimeout(() => {
        setTransitionStage('idle')
        isTransitioning.current = false
        pendingPath.current = null
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [transitionStage, location, navigate])

  // Update display location when location changes normally (back/forward buttons)
  useEffect(() => {
    if (transitionStage === 'idle') {
      setDisplayLocation(location)
    }
  }, [location, transitionStage])

  return (
    <div className="relative">
      {/* Content */}
      <div
        className={`transition-opacity duration-300 ease-in-out ${
          transitionStage === 'fadeOut' ? 'opacity-0' : 'opacity-100'
        } ${transitionStage === 'fadeIn' ? 'opacity-100' : ''}`}
      >
        {children}
      </div>

      {/* Dark Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-yarn-base pointer-events-none transition-opacity duration-300 ease-in-out ${
          transitionStage === 'fadeOut'
            ? 'opacity-100'
            : transitionStage === 'fadeIn'
            ? 'opacity-0'
            : 'opacity-0'
        }`}
      />
    </div>
  )
}
