import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Search, Cpu, Shield, FileText, Settings,
  GitBranch, ChevronLeft, ChevronRight, Activity, LogOut,
  Bell, Clock, Keyboard, GraduationCap,
} from 'lucide-react'
import CommandPalette from '../components/CommandPalette'
import NotificationPanel from '../components/NotificationPanel'
import ToastContainer from '../components/Toast'
import TutorialOverlay, { useTutorial } from '../components/Tutorial'

const navItems = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, path: '/app/dashboard', shortcut: 'G O' },
  { id: 'screener', label: 'Screener', icon: Search, path: '/app/screener', shortcut: 'G S' },
  { id: 'engines', label: 'Engines', icon: Cpu, path: '/app/engines', shortcut: 'G E' },
  { id: 'risk', label: 'Risk', icon: Shield, path: '/app/risk', shortcut: 'G R' },
  { id: 'evidence', label: 'Evidence', icon: FileText, path: '/app/evidence', shortcut: 'G V' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/app/settings', shortcut: 'G T' },
  { id: 'workflows', label: 'Workflows', icon: GitBranch, path: '/app/workflows', shortcut: 'G W' },
]

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showPalette, setShowPalette] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const tutorial = useTutorial()

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K for palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowPalette((prev) => !prev)
        setShowNotifications(false)
        return
      }

      // ? for shortcuts help
      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setShowShortcuts((prev) => !prev)
        return
      }

      // ESC to close overlays
      if (e.key === 'Escape') {
        setShowPalette(false)
        setShowNotifications(false)
        setShowShortcuts(false)
        return
      }

      // Only process nav shortcuts when no modal is open
      if (showPalette || showShortcuts) return

      // Navigation: G + key
      if (e.key === 'g' || e.key === 'G') {
        const nextHandler = (e2: KeyboardEvent) => {
          const keyMap: Record<string, string> = {
            'o': '/app/dashboard', 'O': '/app/dashboard',
            's': '/app/screener', 'S': '/app/screener',
            'e': '/app/engines', 'E': '/app/engines',
            'r': '/app/risk', 'R': '/app/risk',
            'v': '/app/evidence', 'V': '/app/evidence',
            't': '/app/settings', 'T': '/app/settings',
            'w': '/app/workflows', 'W': '/app/workflows',
          }
          if (keyMap[e2.key]) {
            e2.preventDefault()
            navigate(keyMap[e2.key])
          }
          window.removeEventListener('keydown', nextHandler)
        }
        window.addEventListener('keydown', nextHandler)
        setTimeout(() => window.removeEventListener('keydown', nextHandler), 1000)
        return
      }

      // Direct number keys 1-7 for tabs
      const numMap: Record<string, string> = {
        '1': '/app/dashboard', '2': '/app/screener', '3': '/app/engines',
        '4': '/app/risk', '5': '/app/evidence', '6': '/app/settings', '7': '/app/workflows',
      }
      if (numMap[e.key] && !e.metaKey && !e.ctrlKey && !e.altKey) {
        navigate(numMap[e.key])
        return
      }

      // B for sidebar toggle
      if (e.key === 'b' || e.key === 'B') {
        if (!e.metaKey && !e.ctrlKey && !e.altKey) {
          setCollapsed((prev) => !prev)
        }
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [navigate, showPalette, showShortcuts])

  const currentNav = navItems.find((n) => location.pathname === n.path)

  return (
    <div className="min-h-screen bg-yarn-base flex">
      {/* Toast notifications */}
      <ToastContainer />

      {/* Tutorial Overlay */}
      {tutorial.showTutorial && (
        <TutorialOverlay
          step={tutorial.step}
          currentStep={tutorial.currentStep}
          totalSteps={tutorial.totalSteps}
          onNext={tutorial.nextStep}
          onPrev={tutorial.prevStep}
          onDismiss={tutorial.dismissTutorial}
        />
      )}

      {/* Command Palette */}
      {showPalette && <CommandPalette onClose={() => setShowPalette(false)} />}

      {/* Keyboard shortcuts help */}
      {showShortcuts && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center" onClick={() => setShowShortcuts(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative bg-yarn-elevated border border-[rgba(255,255,255,0.08)] w-full max-w-[500px] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Keyboard size={16} className="text-yarn-neon" />
                <span className="text-heading-s text-white">Keyboard Shortcuts</span>
              </div>
              <button onClick={() => setShowShortcuts(false)} className="text-[rgba(255,255,255,0.3)] hover:text-white">
                <span className="text-caption">ESC</span>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase tracking-widest block mb-2">General</span>
                <div className="space-y-2">
                  {[
                    { keys: 'Cmd + K', desc: 'Command palette' },
                    { keys: 'B', desc: 'Toggle sidebar' },
                    { keys: '?', desc: 'This help' },
                    { keys: 'ESC', desc: 'Close modal / overlay' },
                  ].map((s) => (
                    <div key={s.keys} className="flex items-center justify-between py-1.5">
                      <span className="text-body-small text-[rgba(255,255,255,0.6)]">{s.desc}</span>
                      <span className="text-caption text-[rgba(255,255,255,0.5)] px-2 py-0.5 bg-yarn-surface font-mono">{s.keys}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase tracking-widest block mb-2">Navigation</span>
                <div className="space-y-2">
                  {[
                    { keys: 'G O', desc: 'Overview' },
                    { keys: 'G S', desc: 'Screener' },
                    { keys: 'G E', desc: 'Engines' },
                    { keys: 'G R', desc: 'Risk' },
                    { keys: 'G V', desc: 'Evidence' },
                    { keys: 'G T', desc: 'Settings' },
                    { keys: 'G W', desc: 'Workflows' },
                    { keys: '1-7', desc: 'Direct tab switch' },
                  ].map((s) => (
                    <div key={s.keys} className="flex items-center justify-between py-1.5">
                      <span className="text-body-small text-[rgba(255,255,255,0.6)]">{s.desc}</span>
                      <span className="text-caption text-[rgba(255,255,255,0.5)] px-2 py-0.5 bg-yarn-surface font-mono">{s.keys}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 bg-yarn-surface border-r border-[rgba(255,255,255,0.06)] z-30 transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-56'
        }`}
      >
        {/* Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-4 w-6 h-6 bg-yarn-elevated border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[rgba(255,255,255,0.35)] hover:text-white transition-colors z-40"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>

        {/* Finance Label */}
        {!collapsed && (
          <div className="px-4 py-4 border-b border-[rgba(255,255,255,0.06)]">
            <span className="eyebrow text-yarn-neon">FINANCE</span>
            <div className="flex items-center gap-2 mt-2">
              <Activity size={12} className="text-yarn-neon animate-pulse-glow" />
              <span className="text-caption text-[rgba(255,255,255,0.35)]">
                Live Feed Active
              </span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="py-4 border-b border-[rgba(255,255,255,0.06)] flex justify-center">
            <Activity size={14} className="text-yarn-neon animate-pulse-glow" />
          </div>
        )}

        {/* Nav Items */}
        <nav className="py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all ${
                  isActive
                    ? 'bg-[rgba(204,255,0,0.08)] border-l-2 border-yarn-neon'
                    : 'hover:bg-yarn-elevated border-l-2 border-transparent'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon
                  size={18}
                  className={isActive ? 'text-yarn-neon' : 'text-[rgba(255,255,255,0.35)]'}
                />
                {!collapsed && (
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <span
                      className={`text-body-small ${
                        isActive ? 'text-white' : 'text-[rgba(255,255,255,0.6)]'
                      }`}
                    >
                      {item.label}
                    </span>
                    {item.shortcut && (
                      <span className="text-[10px] text-[rgba(255,255,255,0.2)] font-mono">{item.shortcut}</span>
                    )}
                  </div>
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[rgba(255,255,255,0.06)]">
          {!collapsed && (
            <div className="px-4 py-3">
              <div className="flex items-center gap-2 text-caption text-[rgba(255,255,255,0.35)] mb-2">
                <Clock size={12} />
                {currentTime.toLocaleTimeString('en-US', { hour12: false })} UTC
              </div>
              <button
                onClick={() => setShowShortcuts(true)}
                className="flex items-center gap-2 text-caption text-[rgba(255,255,255,0.25)] hover:text-[rgba(255,255,255,0.5)] transition-colors mb-1"
              >
                <Keyboard size={12} />
                Shortcuts (?)
              </button>
              <button
                onClick={tutorial.startTutorial}
                className="flex items-center gap-2 text-caption text-[rgba(255,255,255,0.25)] hover:text-yarn-neon transition-colors"
              >
                <GraduationCap size={12} />
                {tutorial.hasSeenTutorial ? 'Restart Tutorial' : 'Start Tutorial'}
              </button>
            </div>
          )}
          <button
            onClick={() => navigate('/launch')}
            className={`w-full flex items-center gap-3 py-3 hover:bg-yarn-elevated transition-colors ${collapsed ? 'justify-center px-0' : 'px-4'}`}
          >
            <LogOut size={16} className="text-[rgba(255,255,255,0.35)]" />
            {!collapsed && (
              <span className="text-caption text-[rgba(255,255,255,0.5)]">
                Exit to Launchpad
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? 'ml-16' : 'ml-56'
        }`}
      >
        {/* App Header */}
        <header className="h-14 bg-yarn-surface border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-body-small text-white">
              {currentNav?.label || 'Dashboard'}
            </span>
            <span className="text-caption text-[rgba(255,255,255,0.2)]">|</span>
            <span className="text-caption text-[rgba(255,255,255,0.35)]">
              {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* Command Palette trigger */}
            <button
              onClick={() => setShowPalette(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-yarn-base border border-[rgba(255,255,255,0.06)] text-caption text-[rgba(255,255,255,0.35)] hover:text-white hover:border-[rgba(255,255,255,0.12)] transition-all"
            >
              <Search size={12} />
              <span>Search</span>
              <span className="text-[10px] text-[rgba(255,255,255,0.2)] px-1 bg-yarn-surface">⌘K</span>
            </button>

            {/* Bell with notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="relative text-[rgba(255,255,255,0.35)] hover:text-white transition-colors"
              >
                <Bell size={18} />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yarn-red rounded-full" />
              </button>
              {showNotifications && (
                <NotificationPanel onClose={() => setShowNotifications(false)} />
              )}
            </div>

            <div className="w-7 h-7 bg-yarn-neon flex items-center justify-center text-yarn-base text-caption font-medium">
              RM
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
