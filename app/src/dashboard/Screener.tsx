import { useState } from 'react'
import { Search, Filter, ArrowUpRight, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { screenerPicks } from '../data/demoData'

export default function Screener() {
  const [search, setSearch] = useState('')
  const [filterSignal, setFilterSignal] = useState('ALL')

  const filtered = screenerPicks.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.symbol.toLowerCase().includes(search.toLowerCase())
    const matchesSignal = filterSignal === 'ALL' || p.final === filterSignal
    return matchesSearch && matchesSignal
  })

  const confirmed = screenerPicks.filter((p) => p.final === 'CONFIRMED').length
  const mixed = screenerPicks.filter((p) => p.final === 'MIXED').length

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="eyebrow text-yarn-neon block mb-2">G20 INTELLIGENCE SCREENER</span>
          <h1 className="font-display text-4xl text-white">Smart Money Signals</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-data text-yarn-green block">{confirmed}</span>
            <span className="text-caption text-[rgba(255,255,255,0.35)]">CONFIRMED</span>
          </div>
          <div className="text-right">
            <span className="text-data text-[rgba(255,255,255,0.5)] block">{mixed}</span>
            <span className="text-caption text-[rgba(255,255,255,0.35)]">MIXED</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.35)]" />
          <input
            type="text"
            placeholder="Search symbol or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-yarn-surface border border-[rgba(255,255,255,0.06)] py-2.5 pl-10 pr-4 text-body-small text-white placeholder:text-[rgba(255,255,255,0.35)] focus:outline-none focus:border-[rgba(255,255,255,0.12)]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-[rgba(255,255,255,0.35)]" />
          {['ALL', 'CONFIRMED', 'MIXED'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterSignal(f)}
              className={`px-3 py-1.5 text-caption uppercase tracking-wider transition-colors ${
                filterSignal === f
                  ? 'bg-yarn-neon text-yarn-base'
                  : 'bg-yarn-surface text-[rgba(255,255,255,0.5)] hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Signal Conflict Warning */}
      <div className="flex items-center gap-3 p-4 bg-[rgba(255,107,53,0.06)] border border-[rgba(255,107,53,0.15)] mb-6">
        <AlertTriangle size={16} className="text-yarn-governance shrink-0" />
        <span className="text-body-small text-[rgba(255,255,255,0.6)]">
          Multi-agent system contradicts LightGBM on {(mixed / screenerPicks.length * 100).toFixed(0)}% of picks.
          Only {confirmed} out of {screenerPicks.length} signals fully aligned.
        </span>
      </div>

      {/* Picks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
        {filtered.map((pick) => (
          <div
            key={pick.symbol}
            className="bg-yarn-surface p-5 hover:bg-yarn-elevated transition-all group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-caption text-[rgba(255,255,255,0.5)] uppercase w-8">{pick.country}</span>
                  <span className="text-heading-s text-white">{pick.name}</span>
                </div>
                <span className="text-caption text-[rgba(255,255,255,0.35)]">{pick.symbol} · {pick.sector}</span>
              </div>
              <div className="text-right">
                <span className={`text-caption uppercase px-2 py-1 ${
                  pick.final === 'CONFIRMED'
                    ? 'bg-[rgba(34,197,94,0.15)] text-yarn-green'
                    : 'bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.5)]'
                }`}>
                  {pick.final === 'CONFIRMED' ? (
                    <span className="flex items-center gap-1"><CheckCircle size={10} /> CONFIRMED</span>
                  ) : (
                    <span className="flex items-center gap-1"><XCircle size={10} /> MIXED</span>
                  )}
                </span>
              </div>
            </div>

            {/* Signal Bars */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-3">
                <span className="text-caption text-[rgba(255,255,255,0.35)] w-20">LightGBM</span>
                <div className="flex-1 h-1.5 bg-[rgba(255,255,255,0.06)]">
                  <div className="h-full bg-yarn-neon" style={{ width: `${pick.conviction}%` }} />
                </div>
                <span className="text-caption text-yarn-neon w-24 text-right">{pick.signal}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-caption text-[rgba(255,255,255,0.35)] w-20">Agents</span>
                <div className="flex-1 h-1.5 bg-[rgba(255,255,255,0.06)]">
                  <div
                    className="h-full"
                    style={{
                      width: `${pick.final === 'CONFIRMED' ? 100 : 40}%`,
                      backgroundColor: pick.final === 'CONFIRMED' ? '#22c55e' : '#ff6b35',
                    }}
                  />
                </div>
                <span className={`text-caption w-24 text-right ${pick.final === 'CONFIRMED' ? 'text-yarn-green' : 'text-yarn-governance'}`}>
                  {pick.agentVerdict}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-caption text-[rgba(255,255,255,0.35)] w-20">Momentum</span>
                <div className="flex-1 h-1.5 bg-[rgba(255,255,255,0.06)]">
                  <div className="h-full bg-yarn-capital" style={{ width: `${Math.min(pick.momentum, 100)}%` }} />
                </div>
                <span className="text-caption text-yarn-capital w-24 text-right">+{pick.momentum}%</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.06)]">
              <span className="text-data text-white">${pick.price.toLocaleString()}</span>
              <ArrowUpRight size={16} className="text-[rgba(255,255,255,0.2)] group-hover:text-white transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <Search size={32} className="text-[rgba(255,255,255,0.1)] mx-auto mb-4" />
          <span className="text-body text-[rgba(255,255,255,0.5)]">No picks match your filters.</span>
        </div>
      )}
    </div>
  )
}
