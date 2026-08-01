import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ScrambleLink from './ScrambleLink'
import { usePageTransitionNavigate } from './PageTransition'

const navLinks = [
  { label: 'Platform', href: '/platform' },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Developers', href: '/developers' },
  { label: 'Pricing', href: '/pricing' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const transitionNavigate = usePageTransitionNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    transitionNavigate(href)
  }

  const handleLaunch = () => {
    transitionNavigate('/launch')
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <ScrambleLink
            to="/"
            className="text-sm font-medium tracking-[0.12em] text-white hover:text-yarn-neon transition-colors"
          >
            YARN
          </ScrambleLink>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <ScrambleLink
                key={link.label}
                to={link.href}
                className={`text-caption uppercase tracking-[0.08em] transition-colors ${
                  location.pathname === link.href
                    ? 'text-white'
                    : 'text-[rgba(255,255,255,0.6)] hover:text-white'
                }`}
              >
                {link.label}
              </ScrambleLink>
            ))}
          </div>

          {/* CTA - Launch App */}
          <div className="hidden lg:block">
            <button
              onClick={handleLaunch}
              className="bg-yarn-neon text-yarn-base text-caption uppercase tracking-widest font-medium px-5 py-2.5 rounded-sm hover:brightness-110 transition-all hover:shadow-[0_0_20px_rgba(204,255,0,0.3)]"
            >
              Launch App
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-yarn-base pt-16">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-heading-m text-white uppercase tracking-widest"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={handleLaunch}
              className="mt-8 bg-yarn-neon text-yarn-base text-caption uppercase tracking-widest font-medium px-8 py-3 rounded-sm"
            >
              Launch App
            </button>
          </div>
        </div>
      )}
    </>
  )
}
