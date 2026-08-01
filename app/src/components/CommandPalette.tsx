import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Search, Cpu, Shield, FileText, Settings,
  GitBranch, ArrowRight, Command, TrendingUp, Bell, LogOut,
  Download, Pause, Play, Save, AlertTriangle
} from 'lucide-react'

interface CommandItem {
  id: string
  label: string
  shortcut?: string
  icon: any
  action: () => void
  category: string
}

interface CommandPaletteProps {
  onClose: () => void
}

export default function CommandPalette({ onClose }: CommandPaletteProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const isAppRoute = location.pathname.startsWith('/app')

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-overview', label: 'Go to Overview', shortcut: 'G O', icon: LayoutDashboard,
      action: () => { navigate('/app/dashboard'); onClose() }, category: 'Navigation'
    },
    {
      id: 'nav-screener', label: 'Go to Screener', shortcut: 'G S', icon: Search,
      action: () => { navigate('/app/screener'); onClose() }, category: 'Navigation'
    },
    {
      id: 'nav-engines', label: 'Go to Engines', shortcut: 'G E', icon: Cpu,
      action: () => { navigate('/app/engines'); onClose() }, category: 'Navigation'
    },
    {
      id: 'nav-risk', label: 'Go to Risk', shortcut: 'G R', icon: Shield,
      action: () => { navigate('/app/risk'); onClose() }, category: 'Navigation'
    },
    {
      id: 'nav-evidence', label: 'Go to Evidence', shortcut: 'G V', icon: FileText,
      action: () => { navigate('/app/evidence'); onClose() }, category: 'Navigation'
    },
    {
      id: 'nav-settings', label: 'Go to Settings', shortcut: 'G T', icon: Settings,
      action: () => { navigate('/app/settings'); onClose() }, category: 'Navigation'
    },
    {
      id: 'nav-workflows', label: 'Go to Workflows', shortcut: 'G W', icon: GitBranch,
      action: () => { navigate('/app/workflows'); onClose() }, category: 'Navigation'
    },
    {
      id: 'nav-launch', label: 'Exit to Launchpad', shortcut: '', icon: LogOut,
      action: () => { navigate('/launch'); onClose() }, category: 'Navigation'
    },
    // Actions
    {
      id: 'act-export', label: 'Export Evidence (CSV)', shortcut: '', icon: Download,
      action: () => { onClose(); window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Evidence export started...', type: 'success' } })) },
      category: 'Actions'
    },
    {
      id: 'act-pause-all', label: 'Pause All Engines', shortcut: '', icon: Pause,
      action: () => {
        window.dispatchEvent(new CustomEvent('pause-all-engines'))
        onClose()
        window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'All engines paused', type: 'warning' } }))
      },
      category: 'Actions'
    },
    {
      id: 'act-start-all', label: 'Start All Engines', shortcut: '', icon: Play,
      action: () => {
        window.dispatchEvent(new CustomEvent('start-all-engines'))
        onClose()
        window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'All engines started', type: 'success' } }))
      },
      category: 'Actions'
    },
    {
      id: 'act-save-policy', label: 'Save Risk Policy', shortcut: '', icon: Save,
      action: () => {
        window.dispatchEvent(new CustomEvent('save-policy'))
        onClose()
      },
      category: 'Actions'
    },
    {
      id: 'act-kill-switch', label: 'Trigger Kill Switch', shortcut: '', icon: AlertTriangle,
      action: () => {
        window.dispatchEvent(new CustomEvent('trigger-kill-switch'))
        onClose()
        window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'KILL SWITCH ACTIVATED — All positions liquidating', type: 'error' } }))
      },
      category: 'Actions'
    },
    // Portfolio
    {
      id: 'port-btc', label: 'View Bitcoin Position', shortcut: '', icon: TrendingUp,
      action: () => { navigate('/app/dashboard'); onClose() }, category: 'Portfolio'
    },
    {
      id: 'port-nvda', label: 'View NVIDIA Position', shortcut: '', icon: TrendingUp,
      action: () => { navigate('/app/dashboard'); onClose() }, category: 'Portfolio'
    },
    {
      id: 'port-alerts', label: 'View Risk Alerts', shortcut: '', icon: Bell,
      action: () => { navigate('/app/risk'); onClose() }, category: 'Portfolio'
    },
  ]

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  )

  const grouped = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = []
    acc[cmd.category].push(cmd)
    return acc
  }, {} as Record<string, CommandItem[]>)

  const flatList = Object.values(grouped).flat()

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, flatList.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      if (flatList[selectedIndex]) flatList[selectedIndex].action()
    }
  }, [flatList, selectedIndex, onClose])

  useEffect(() => {
    inputRef.current?.focus()
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  if (!isAppRoute) return null

  let globalIndex = 0

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-[640px] bg-yarn-elevated border border-[rgba(255,255,255,0.08)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
          <Command size={18} className="text-yarn-neon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search commands, pages, assets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-body text-white placeholder:text-[rgba(255,255,255,0.3)] focus:outline-none"
          />
          <span className="text-caption text-[rgba(255,255,255,0.25)] px-2 py-1 bg-yarn-surface">ESC</span>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {flatList.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <span className="text-body text-[rgba(255,255,255,0.35)]">No commands found.</span>
            </div>
          ) : (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <div className="px-5 py-2 sticky top-0 bg-yarn-elevated">
                  <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase tracking-widest">{category}</span>
                </div>
                {items.map((cmd) => {
                  const idx = globalIndex++
                  const isSelected = idx === selectedIndex
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center gap-3 px-5 py-2.5 transition-colors ${
                        isSelected ? 'bg-[rgba(204,255,0,0.08)]' : 'hover:bg-yarn-surface'
                      }`}
                    >
                      <cmd.icon size={16} className={isSelected ? 'text-yarn-neon' : 'text-[rgba(255,255,255,0.35)]'} />
                      <span className={`text-body-small flex-1 text-left ${isSelected ? 'text-white' : 'text-[rgba(255,255,255,0.7)]'}`}>
                        {cmd.label}
                      </span>
                      {cmd.shortcut && (
                        <span className="flex items-center gap-1">
                          {cmd.shortcut.split(' ').map((k, i) => (
                            <span key={i} className="text-caption text-[rgba(255,255,255,0.3)] px-1.5 py-0.5 bg-yarn-surface">{k}</span>
                          ))}
                        </span>
                      )}
                      {isSelected && <ArrowRight size={14} className="text-yarn-neon" />}
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-[rgba(255,255,255,0.06)] flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-[rgba(255,255,255,0.3)] px-1 py-0.5 bg-yarn-surface">↑↓</span>
            <span className="text-caption text-[rgba(255,255,255,0.25)]">Navigate</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-[rgba(255,255,255,0.3)] px-1 py-0.5 bg-yarn-surface">↵</span>
            <span className="text-caption text-[rgba(255,255,255,0.25)]">Select</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-[rgba(255,255,255,0.3)] px-1 py-0.5 bg-yarn-surface">ESC</span>
            <span className="text-caption text-[rgba(255,255,255,0.25)]">Close</span>
          </div>
        </div>
      </div>
    </div>
  )
}
