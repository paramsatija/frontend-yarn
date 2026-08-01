import { useState } from 'react'
import { Check, Copy, Search, Filter, Shield, Download, X } from 'lucide-react'
import { evidenceLog } from '../data/demoData'
import { truncateHash } from '../lib/formatters'

const engines = ['All Engines', 'Conviction', 'Allocation', 'Migration', 'Harvest', 'PER', 'Compounding', 'Risk', 'Regime']
const actions = ['All Actions', 'Position increased', 'Profit harvested', 'Rebalance executed', 'Risk alert', 'Regime detected', 'Compounding', 'PER update', 'New signal']

export default function EvidenceLog() {
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const [engineFilter, setEngineFilter] = useState('All Engines')
  const [actionFilter, setActionFilter] = useState('All Actions')
  const [showFilters, setShowFilters] = useState(false)
  const filtered = evidenceLog.filter((e) => {
    const matchesSearch =
      e.asset.toLowerCase().includes(search.toLowerCase()) ||
      e.action.toLowerCase().includes(search.toLowerCase()) ||
      e.engine.toLowerCase().includes(search.toLowerCase())
    const matchesEngine = engineFilter === 'All Engines' || e.engine.includes(engineFilter)
    const matchesAction = actionFilter === 'All Actions' || e.action === actionFilter
    return matchesSearch && matchesEngine && matchesAction
  })

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash)
    setCopied(hash)
    window.dispatchEvent(new CustomEvent('toast', {
      detail: { message: 'Attestation hash copied', type: 'success' }
    }))
    setTimeout(() => setCopied(null), 2000)
  }

  const handleExport = () => {
    const csv = [
      ['ID', 'Timestamp', 'Action', 'Asset', 'Details', 'Engine', 'Hash'].join(','),
      ...filtered.map((e) => [e.id, e.timestamp, e.action, e.asset, `"${e.details}"`, e.engine, e.hash].join(',')),
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `evidence-export-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    window.dispatchEvent(new CustomEvent('toast', {
      detail: { message: `Exported ${filtered.length} records to CSV`, type: 'success' }
    }))
  }

  const clearFilters = () => {
    setSearch('')
    setEngineFilter('All Engines')
    setActionFilter('All Actions')
    // date filter cleared
  }

  const hasFilters = search || engineFilter !== 'All Engines' || actionFilter !== 'All Actions'

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <span className="eyebrow text-yarn-neon block mb-2">EVIDENCE ENGINE</span>
        <h1 className="font-display text-4xl text-white">Attestation Trail</h1>
        <p className="text-body text-[rgba(255,255,255,0.6)] mt-2 max-w-[500px]">
          Every decision is cryptographically attested, timestamped, and stored.
          Immutable evidence of every engine action.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 mb-6">
        {[
          { label: 'Evidence Records', value: '28,471', color: '#ccff00' },
          { label: 'Today', value: '342', color: '#00ff9d' },
          { label: 'Engines Active', value: '8/8', color: '#00d4ff' },
          { label: 'Integrity', value: '100%', color: '#22c55e' },
        ].map((s) => (
          <div key={s.label} className="bg-yarn-surface p-4 hover:bg-yarn-elevated transition-colors">
            <span className="text-data block" style={{ color: s.color }}>{s.value}</span>
            <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.35)]" />
          <input
            type="text"
            placeholder="Search asset, action, or engine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-yarn-surface border border-[rgba(255,255,255,0.06)] py-2.5 pl-10 pr-4 text-body-small text-white placeholder:text-[rgba(255,255,255,0.35)] focus:outline-none focus:border-[rgba(255,255,255,0.12)]"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 border transition-all ${
              showFilters || hasFilters
                ? 'bg-[rgba(204,255,0,0.08)] border-[rgba(204,255,0,0.15)] text-yarn-neon'
                : 'bg-yarn-surface border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.5)] hover:text-white'
            }`}
          >
            <Filter size={14} />
            <span className="text-caption">Filter</span>
            {hasFilters && <span className="w-2 h-2 bg-yarn-neon rounded-full" />}
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-yarn-surface border border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.5)] hover:text-white transition-colors"
          >
            <Download size={14} />
            <span className="text-caption hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-yarn-surface p-4 mb-4 border border-[rgba(255,255,255,0.06)]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase tracking-widest block mb-2">Engine</span>
              <select
                value={engineFilter}
                onChange={(e) => setEngineFilter(e.target.value)}
                className="w-full bg-yarn-base border border-[rgba(255,255,255,0.06)] px-3 py-2 text-body-small text-white focus:outline-none focus:border-yarn-neon"
              >
                {engines.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase tracking-widest block mb-2">Action</span>
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="w-full bg-yarn-base border border-[rgba(255,255,255,0.06)] px-3 py-2 text-body-small text-white focus:outline-none focus:border-yarn-neon"
              >
                {actions.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 border border-[rgba(255,255,255,0.08)] text-caption text-[rgba(255,255,255,0.5)] hover:text-white transition-colors"
              >
                <X size={12} />
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-caption text-[rgba(255,255,255,0.35)]">
          Showing {filtered.length} of {evidenceLog.length} records
        </span>
      </div>

      {/* Evidence Table */}
      <div className="bg-yarn-surface">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                {['ID', 'Time', 'Action', 'Asset', 'Details', 'Engine', 'Attestation'].map((h) => (
                  <th key={h} className="text-left text-caption text-[rgba(255,255,255,0.35)] uppercase px-5 py-3 font-normal tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
              {filtered.map((ev) => (
                <tr key={ev.id} className="hover:bg-yarn-elevated transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-yarn-neon shrink-0" />
                      <span className="text-body-small text-yarn-neon font-mono">{ev.id}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-caption text-[rgba(255,255,255,0.5)] font-mono whitespace-nowrap">{ev.timestamp}</td>
                  <td className="px-5 py-4">
                    <span className="text-body-small text-white">{ev.action}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-data text-white">{ev.asset}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-body-small text-[rgba(255,255,255,0.6)] max-w-[280px] block">{ev.details}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-caption text-yarn-neon whitespace-nowrap">{ev.engine}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-caption text-[rgba(255,255,255,0.35)] font-mono">{truncateHash(ev.hash)}</span>
                      <button
                        onClick={() => handleCopy(ev.hash)}
                        className="text-[rgba(255,255,255,0.2)] hover:text-white transition-colors p-1"
                        title="Copy hash"
                      >
                        {copied === ev.hash ? <Check size={12} className="text-yarn-green" /> : <Copy size={12} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search size={24} className="text-[rgba(255,255,255,0.1)] mx-auto mb-2" />
            <span className="text-body-small text-[rgba(255,255,255,0.35)]">No records match your filters.</span>
          </div>
        )}
      </div>
    </div>
  )
}
