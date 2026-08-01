import { useState, useEffect } from 'react'
import { Cpu, Play, Pause, RotateCcw, ChevronDown, ChevronUp, CheckCircle, AlertCircle, Activity } from 'lucide-react'
import { engineConfigs } from '../data/demoData'

function formatConfigValue(key: string, value: any): string {
  if (key === 'signalWeights') {
    return Object.entries(value).map(([k, v]) => `${k}: ${(v as number) * 100}%`).join(' \u00b7 ')
  }
  if (key === 'tiers' && Array.isArray(value)) {
    return value.map((t: any) => `+${t.gain}% \u2192 ${t.harvestPercent}%`).join(' \u00b7 ')
  }
  if (key === 'frequency') return String(value)
  if (key === 'method') return String(value)
  if (key === 'model') return String(value)
  if (key === 'states') return (value as string[]).join(' \u00b7 ')
  if (typeof value === 'number') return `${value}%`
  return String(value)
}

function formatConfigLabel(key: string): string {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())
}

export default function Engines() {
  const [expanded, setExpanded] = useState<string | null>('conviction')
  const [engines, setEngines] = useState(engineConfigs)

  // Listen for global events from Command Palette
  useEffect(() => {
    const pauseAll = () => {
      setEngines((prev) => prev.map((e) => ({ ...e, status: 'paused' as const })))
    }
    const startAll = () => {
      setEngines((prev) => prev.map((e) => e.status === 'paused' ? { ...e, status: 'active' as const } : e))
    }
    window.addEventListener('pause-all-engines' as any, pauseAll)
    window.addEventListener('start-all-engines' as any, startAll)
    return () => {
      window.removeEventListener('pause-all-engines' as any, pauseAll)
      window.removeEventListener('start-all-engines' as any, startAll)
    }
  }, [])

  const toggleEngine = (id: string) => {
    setEngines((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status: e.status === 'active' ? 'paused' : 'active' } : e
      )
    )
    const engine = engines.find((e) => e.id === id)
    const newStatus = engine?.status === 'active' ? 'paused' : 'active'
    window.dispatchEvent(new CustomEvent('toast', {
      detail: { message: `${engine?.name} ${newStatus}`, type: newStatus === 'active' ? 'success' : 'warning' }
    }))
  }

  const resetEngine = (id: string) => {
    setEngines((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, accuracy: 0, lastRun: 'just now' } : e
      )
    )
    const engine = engines.find((e) => e.id === id)
    window.dispatchEvent(new CustomEvent('toast', {
      detail: { message: `${engine?.name} reset \u2014 accuracy cleared`, type: 'info' }
    }))
  }

  const activeCount = engines.filter((e) => e.status === 'active').length

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="eyebrow text-yarn-neon block mb-2">ENGINE CONTROL CENTER</span>
          <h1 className="font-display text-4xl text-white">8 Intelligence Engines</h1>
          <p className="text-body text-[rgba(255,255,255,0.6)] mt-2 max-w-[500px]">
            Each engine is independently calibrated, continuously monitored, and earns its influence through demonstrable performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-caption text-yarn-green">
            <CheckCircle size={12} /> {activeCount} active
          </span>
          {activeCount < 8 && (
            <span className="flex items-center gap-1.5 text-caption text-yarn-governance">
              <AlertCircle size={12} /> {8 - activeCount} paused
            </span>
          )}
          {/* Bulk actions */}
          <div className="flex gap-1 ml-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('start-all-engines'))}
              className="px-3 py-1.5 bg-[rgba(204,255,0,0.08)] text-caption text-yarn-neon hover:bg-[rgba(204,255,0,0.15)] transition-colors"
              title="Start all"
            >
              <Play size={12} />
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('pause-all-engines'))}
              className="px-3 py-1.5 bg-[rgba(255,107,53,0.08)] text-caption text-yarn-governance hover:bg-[rgba(255,107,53,0.15)] transition-colors"
              title="Pause all"
            >
              <Pause size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Engine List */}
      <div className="space-y-1">
        {engines.map((engine) => {
          const isExpanded = expanded === engine.id
          const isActive = engine.status === 'active'

          return (
            <div
              key={engine.id}
              className={`bg-yarn-surface transition-all ${isExpanded ? 'ring-1 ring-[rgba(204,255,0,0.12)]' : ''}`}
            >
              {/* Engine Header */}
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-yarn-elevated transition-colors"
                onClick={() => setExpanded(isExpanded ? null : engine.id)}
              >
                {/* Play/Pause */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleEngine(engine.id) }}
                  className={`w-8 h-8 flex items-center justify-center border transition-all shrink-0 ${
                    isActive
                      ? 'border-yarn-neon text-yarn-neon hover:bg-[rgba(204,255,0,0.1)]'
                      : 'border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.35)] hover:border-[rgba(255,255,255,0.25)]'
                  }`}
                >
                  {isActive ? <Pause size={14} /> : <Play size={14} />}
                </button>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <Cpu size={16} className={isActive ? 'text-yarn-neon' : 'text-[rgba(255,255,255,0.35)]'} />
                    <span className="text-heading-s text-white">{engine.name}</span>
                    <span className={`text-caption uppercase px-1.5 py-0.5 shrink-0 ${
                      isActive ? 'bg-[rgba(204,255,0,0.1)] text-yarn-neon' :
                      engine.status === 'calibrating' ? 'bg-[rgba(255,107,53,0.1)] text-yarn-governance' :
                      'bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.35)]'
                    }`}>
                      {engine.status}
                    </span>
                  </div>
                  <span className="text-body-small text-[rgba(255,255,255,0.5)] ml-7 block truncate">{engine.description}</span>
                </div>

                {/* Metrics */}
                <div className="hidden md:flex items-center gap-6 mr-4">
                  <div className="text-right">
                    <span className="text-data text-white">{engine.accuracy}%</span>
                    <span className="text-caption text-[rgba(255,255,255,0.35)] block">ACCURACY</span>
                  </div>
                  <div className="text-right">
                    <span className="text-caption text-[rgba(255,255,255,0.5)] block">v{engine.version}</span>
                    <span className="text-caption text-[rgba(255,255,255,0.35)]">{engine.lastRun}</span>
                  </div>
                </div>

                {isExpanded ? <ChevronUp size={16} className="text-[rgba(255,255,255,0.35)] shrink-0" /> : <ChevronDown size={16} className="text-[rgba(255,255,255,0.35)] shrink-0" />}
              </div>

              {/* Expanded */}
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-[rgba(255,255,255,0.06)] pt-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Configuration */}
                    <div>
                      <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase tracking-widest block mb-3">
                        Configuration
                      </span>
                      <div className="space-y-0">
                        {Object.entries(engine.params).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between py-2.5 border-b border-[rgba(255,255,255,0.04)]">
                            <span className="text-body-small text-[rgba(255,255,255,0.5)]">
                              {formatConfigLabel(key)}
                            </span>
                            <span className="text-body-small text-yarn-neon text-right max-w-[60%]">
                              {formatConfigValue(key, value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Live Output */}
                    <div>
                      <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase tracking-widest block mb-3">
                        Live Output
                      </span>
                      <div className="bg-yarn-base p-4 border border-[rgba(255,255,255,0.06)] space-y-2">
                        {[
                          { label: 'Status', value: isActive ? 'RUNNING' : 'PAUSED', color: isActive ? '#ccff00' : '#ff6b35' },
                          { label: 'Last Execution', value: engine.lastRun, color: '#ffffff' },
                          { label: 'Accuracy (30d)', value: `${engine.accuracy}%`, color: '#ccff00' },
                          { label: 'Signals Generated', value: engine.id === 'conviction' ? '284' : engine.id === 'risk' ? '1,247' : engine.id === 'harvest' ? '42' : '89', color: '#ffffff' },
                          { label: 'Avg Latency', value: engine.id === 'risk' ? '12ms' : engine.id === 'conviction' ? '45ms' : engine.id === 'regime' ? '180ms' : '30ms', color: '#00d4ff' },
                        ].map((row) => (
                          <div key={row.label} className="flex justify-between py-1">
                            <span className="text-body-small text-[rgba(255,255,255,0.5)]">{row.label}</span>
                            <span className="text-body-small" style={{ color: row.color }}>{row.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Health Metrics */}
                      <div className="mt-4 bg-yarn-base p-4 border border-[rgba(255,255,255,0.06)]">
                        <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase tracking-widest block mb-3">
                          Health
                        </span>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: 'Uptime', value: '99.97%', icon: Activity },
                            { label: 'p50 Latency', value: engine.id === 'risk' ? '12ms' : '30ms', icon: Activity },
                            { label: 'p95 Latency', value: engine.id === 'risk' ? '45ms' : '120ms', icon: Activity },
                            { label: 'Error Rate', value: '0.02%', icon: Activity },
                          ].map((h) => (
                            <div key={h.label} className="flex items-center gap-2">
                              <h.icon size={12} className="text-[rgba(255,255,255,0.2)]" />
                              <div>
                                <span className="text-caption text-white block">{h.value}</span>
                                <span className="text-caption text-[rgba(255,255,255,0.35)]">{h.label}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => toggleEngine(engine.id)}
                          className={`flex-1 py-2.5 text-caption uppercase tracking-widest transition-all ${
                            isActive
                              ? 'bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.1)]'
                              : 'btn-primary'
                          }`}
                        >
                          {isActive ? 'Pause Engine' : 'Start Engine'}
                        </button>
                        <button
                          onClick={() => resetEngine(engine.id)}
                          className="px-4 py-2.5 border border-[rgba(255,255,255,0.06)] text-caption text-[rgba(255,255,255,0.5)] hover:text-white hover:border-[rgba(255,255,255,0.12)] transition-all flex items-center gap-2"
                        >
                          <RotateCcw size={12} />
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
