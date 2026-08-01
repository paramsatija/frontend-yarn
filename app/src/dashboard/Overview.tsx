import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
} from 'recharts'
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Activity, Cpu, BarChart3, Eye } from 'lucide-react'
import { portfolioPositions, assetAllocation, riskMetrics, evidenceLog, pnlAttribution, portfolioHistory } from '../data/demoData'
import { formatCurrency, formatPercent, formatNumber, timeAgo } from '../lib/formatters'

const timeframes = [
  { label: '1D', data: portfolioHistory.slice(-2) },
  { label: '1W', data: portfolioHistory.slice(-3) },
  { label: '1M', data: portfolioHistory.slice(-4) },
  { label: '3M', data: portfolioHistory.slice(-5) },
  { label: 'YTD', data: portfolioHistory.slice(-6) },
  { label: '1Y', data: portfolioHistory },
  { label: 'MAX', data: portfolioHistory },
]

const benchmarks = [
  { key: 'none', label: 'No Benchmark', color: 'transparent' },
  { key: 'spy', label: 'S&P 500', color: '#00d4ff' },
  { key: 'btc', label: 'BTC', color: '#f7931a' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-yarn-elevated border border-[rgba(255,255,255,0.12)] px-4 py-3">
        <span className="text-caption text-[rgba(255,255,255,0.5)] block">{label}</span>
        {payload.map((p: any, i: number) => (
          <span key={i} className="text-data block" style={{ color: p.color || '#ccff00' }}>
            {p.name}: {formatCurrency(p.value)}
          </span>
        ))}
      </div>
    )
  }
  return null
}

export default function Overview() {
  const [sortCol, setSortCol] = useState('value')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [timeframeIdx, setTimeframeIdx] = useState(5) // 1Y default
  const [benchmark, setBenchmark] = useState('none')
  const [showAttribution, setShowAttribution] = useState(false)

  const totalValue = portfolioPositions.reduce((s, p) => s + p.value, 0)
  const totalCost = portfolioPositions.reduce((s, p) => s + (p.value / (1 + p.pnl / 100)), 0)
  const totalPnL = totalValue - totalCost
  const totalPnLPercent = (totalPnL / totalCost) * 100

  const sortedPositions = [...portfolioPositions].sort((a, b) => {
    const aVal = a[sortCol as keyof typeof a] as number
    const bVal = b[sortCol as keyof typeof b] as number
    return sortDir === 'asc' ? aVal - bVal : bVal - aVal
  })

  const toggleSort = (col: string) => {
    if (sortCol === col) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('desc') }
  }

  const recentActivity = evidenceLog.slice(0, 5)

  // Chart data with benchmark overlay
  const currentTimeframe = timeframes[timeframeIdx]
  const chartData = currentTimeframe.data.map((d: any, i: number) => ({
    ...d,
    benchmark: benchmark === 'spy' ? d.value * (0.85 + i * 0.02) :
               benchmark === 'btc' ? d.value * (1.1 + i * 0.05) : null,
  }))

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="eyebrow text-yarn-neon block mb-2">PORTFOLIO OVERVIEW</span>
          <h1 className="font-display text-4xl lg:text-5xl text-white">{formatCurrency(totalValue)}</h1>
          <div className="flex items-center gap-2 mt-1">
            {totalPnL >= 0 ? (
              <ArrowUpRight size={16} className="text-yarn-green" />
            ) : (
              <ArrowDownRight size={16} className="text-yarn-red" />
            )}
            <span className={`text-data ${totalPnL >= 0 ? 'text-yarn-green' : 'text-yarn-red'}`}>
              {formatPercent(totalPnLPercent)} ({formatCurrency(totalPnL)})
            </span>
            <span className="text-caption text-[rgba(255,255,255,0.35)]">total unrealized</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-yarn-neon animate-pulse-glow" />
          <span className="text-caption text-[rgba(255,255,255,0.35)]">
            {new Date().toLocaleTimeString('en-US', { hour12: false })} UTC
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 mb-1">
        {[
          { label: 'Portfolio Value', value: formatCurrency(totalValue), change: '+12.4%', up: true },
          { label: 'Day P&L', value: '+$8,420', change: '+0.84%', up: true },
          { label: 'Active Positions', value: '8', change: '2 rebalancing', up: true },
          { label: 'Cash Reserve', value: formatCurrency(70000), change: '7.0% alloc', up: true },
        ].map((m) => (
          <div key={m.label} className="bg-yarn-surface p-5 hover:bg-yarn-elevated transition-colors group cursor-default">
            <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase block mb-2">{m.label}</span>
            <span className="text-heading-m text-white block">{m.value}</span>
            <div className="flex items-center gap-1 mt-1">
              {m.up ? <TrendingUp size={12} className="text-yarn-green" /> : <TrendingDown size={12} className="text-yarn-red" />}
              <span className={`text-caption ${m.up ? 'text-yarn-green' : 'text-yarn-red'}`}>{m.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts + Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mb-1">
        {/* Portfolio Chart */}
        <div className="lg:col-span-2 bg-yarn-surface p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-heading-s text-white">Portfolio Performance</span>
            <div className="flex items-center gap-3">
              {/* Benchmark Toggle */}
              <div className="flex items-center gap-1">
                <Eye size={12} className="text-[rgba(255,255,255,0.25)]" />
                {benchmarks.map((b) => (
                  <button
                    key={b.key}
                    onClick={() => setBenchmark(b.key)}
                    className={`px-2 py-1 text-caption transition-all ${
                      benchmark === b.key
                        ? 'bg-yarn-neon text-yarn-base'
                        : 'text-[rgba(255,255,255,0.35)] hover:text-white'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
              <div className="w-px h-4 bg-[rgba(255,255,255,0.1)]" />
              {/* Timeframe Selector */}
              <div className="flex items-center gap-0.5">
                {timeframes.map((tf, i) => (
                  <button
                    key={tf.label}
                    onClick={() => setTimeframeIdx(i)}
                    className={`px-2 py-1 text-caption transition-all ${
                      timeframeIdx === i
                        ? 'bg-[rgba(204,255,0,0.12)] text-yarn-neon'
                        : 'text-[rgba(255,255,255,0.35)] hover:text-white'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ccff00" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ccff00" stopOpacity={0} />
                </linearGradient>
                {benchmark !== 'none' && (
                  <linearGradient id="colorBench" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={benchmarks.find(b => b.key === benchmark)?.color} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={benchmarks.find(b => b.key === benchmark)?.color} stopOpacity={0} />
                  </linearGradient>
                )}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                domain={['dataMin - 50000', 'dataMax + 30000']}
                tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => formatCurrency(v)}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" name="Portfolio" stroke="#ccff00" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              {benchmark !== 'none' && (
                <Area type="monotone" dataKey="benchmark" name={benchmarks.find(b => b.key === benchmark)?.label} stroke={benchmarks.find(b => b.key === benchmark)?.color} strokeWidth={1.5} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorBench)" />
              )}
            </AreaChart>
          </ResponsiveContainer>
          {benchmark !== 'none' && (
            <div className="flex items-center gap-2 mt-2 justify-end">
              <span className="text-caption text-yarn-green">Alpha: +8.2%</span>
              <span className="text-caption text-[rgba(255,255,255,0.35)]">|</span>
              <span className="text-caption text-yarn-treasury">Beta: 0.87</span>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-yarn-surface p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-heading-s text-white">Engine Activity</span>
            <Cpu size={14} className="text-yarn-neon" />
          </div>
          <div className="space-y-3">
            {recentActivity.map((ev) => (
              <div key={ev.id} className="flex items-start gap-3 group">
                <span className="w-1.5 h-1.5 mt-1.5 shrink-0" style={{ backgroundColor: ev.engine.includes('Risk') ? '#ff6b35' : ev.engine.includes('Harvest') ? '#00ff9d' : '#ccff00' }} />
                <div className="flex-1 min-w-0">
                  <span className="text-body-small text-white block truncate">{ev.action}</span>
                  <span className="text-caption text-[rgba(255,255,255,0.35)]">{ev.asset} · {ev.engine}</span>
                </div>
                <span className="text-caption text-[rgba(255,255,255,0.25)] shrink-0">{timeAgo(new Date())}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* P&L Attribution Toggle */}
      <div className="mb-1">
        <button
          onClick={() => setShowAttribution(!showAttribution)}
          className="w-full flex items-center justify-between px-5 py-3 bg-yarn-surface hover:bg-yarn-elevated transition-colors"
        >
          <div className="flex items-center gap-3">
            <BarChart3 size={16} className="text-yarn-neon" />
            <span className="text-body-small text-white">P&L Attribution</span>
            <span className="text-caption text-[rgba(255,255,255,0.35)]">See what drove your returns</span>
          </div>
          <span className={`text-caption text-[rgba(255,255,255,0.35)] transition-transform ${showAttribution ? 'rotate-180' : ''}`}>▼</span>
        </button>

        {showAttribution && (
          <div className="bg-yarn-surface p-6 border-t border-[rgba(255,255,255,0.04)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* By Asset */}
              <div>
                <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase tracking-widest block mb-3">Contribution by Asset</span>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={pnlAttribution.byAsset} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                    <YAxis dataKey="asset" type="category" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} axisLine={false} tickLine={false} width={50} />
                    <Tooltip content={({ active, payload }: any) => {
                      if (active && payload?.length) {
                        return (
                          <div className="bg-yarn-elevated border border-[rgba(255,255,255,0.12)] px-3 py-2">
                            <span className="text-caption text-white">{payload[0].payload.asset}: {payload[0].value > 0 ? '+' : ''}{payload[0].value}% contribution</span>
                          </div>
                        )
                      }
                      return null
                    }} />
                    <Bar dataKey="contribution" fill="#ccff00" radius={[0, 2, 2, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* By Engine */}
              <div>
                <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase tracking-widest block mb-3">Contribution by Engine</span>
                <div className="space-y-2">
                  {pnlAttribution.byEngine.map((e) => (
                    <div key={e.engine} className="flex items-center gap-3">
                      <span className="text-caption text-[rgba(255,255,255,0.5)] w-24 shrink-0">{e.engine}</span>
                      <div className="flex-1 h-2 bg-[rgba(255,255,255,0.06)]">
                        <div
                          className="h-full transition-all"
                          style={{
                            width: `${Math.abs(e.contribution) / 0.4}%`,
                            backgroundColor: e.contribution >= 0 ? '#ccff00' : '#ff6b35',
                            marginLeft: e.contribution < 0 ? 'auto' : 0,
                            marginRight: e.contribution < 0 ? 0 : 'auto',
                          }}
                        />
                      </div>
                      <span className={`text-caption w-12 text-right ${e.contribution >= 0 ? 'text-yarn-green' : 'text-yarn-governance'}`}>
                        {e.contribution > 0 ? '+' : ''}{e.contribution}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Positions Table */}
      <div className="bg-yarn-surface mb-1">
        <div className="p-5 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
          <span className="text-heading-s text-white">Active Positions</span>
          <span className="text-caption text-[rgba(255,255,255,0.35)]">{portfolioPositions.length} positions · Click headers to sort</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                {[
                  { key: 'name', label: 'Asset' },
                  { key: 'allocation', label: 'Allocation' },
                  { key: 'value', label: 'Value' },
                  { key: 'current', label: 'Price' },
                  { key: 'pnl', label: 'P&L %' },
                ].map((h) => (
                  <th
                    key={h.key}
                    onClick={() => toggleSort(h.key)}
                    className="text-left text-caption text-[rgba(255,255,255,0.35)] uppercase px-5 py-3 font-normal tracking-widest cursor-pointer hover:text-white transition-colors select-none"
                  >
                    {h.label} {sortCol === h.key && (sortDir === 'asc' ? '↑' : '↓')}
                  </th>
                ))}
                <th className="text-left text-caption text-[rgba(255,255,255,0.35)] uppercase px-5 py-3 font-normal tracking-widest">Type</th>
              </tr>
            </thead>
            <tbody>
              {sortedPositions.map((pos) => (
                <tr key={pos.symbol} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-yarn-elevated transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="text-body-small text-white block">{pos.name}</span>
                    <span className="text-caption text-[rgba(255,255,255,0.35)]">{pos.symbol}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-[rgba(255,255,255,0.08)]">
                        <div className="h-full bg-yarn-neon" style={{ width: `${Math.min(pos.allocation / 30 * 100, 100)}%` }} />
                      </div>
                      <span className="text-data text-white">{pos.allocation.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-data text-white">{formatCurrency(pos.value)}</td>
                  <td className="px-5 py-3.5 text-data text-[rgba(255,255,255,0.5)]">${formatNumber(pos.current)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-data ${pos.pnl >= 0 ? 'text-yarn-green' : 'text-yarn-red'}`}>
                      {formatPercent(pos.pnl)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-caption uppercase px-1.5 py-0.5 ${
                      pos.type === 'crypto' ? 'bg-[rgba(204,255,0,0.1)] text-yarn-neon' :
                      pos.type === 'equity' ? 'bg-[rgba(0,255,157,0.1)] text-yarn-capital' :
                      'bg-[rgba(0,212,255,0.1)] text-yarn-treasury'
                    }`}>
                      {pos.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom: Allocation + Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
        {/* Asset Allocation */}
        <div className="bg-yarn-surface p-6">
          <span className="text-heading-s text-white block mb-4">Asset Allocation</span>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={assetAllocation} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" stroke="none">
                {assetAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={({ active, payload }: any) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-yarn-elevated border border-[rgba(255,255,255,0.12)] px-3 py-2">
                      <span className="text-caption text-white">{payload[0].name}: {payload[0].value}%</span>
                    </div>
                  )
                }
                return null
              }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {assetAllocation.map((a) => (
              <div key={a.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2" style={{ backgroundColor: a.color }} />
                <span className="text-caption text-[rgba(255,255,255,0.5)]">{a.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="lg:col-span-2 bg-yarn-surface p-6">
          <span className="text-heading-s text-white block mb-4">Risk Snapshot</span>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'VaR (95%)', value: `${riskMetrics.portfolioVaR}%`, color: '#ccff00', sub: '1-day' },
              { label: 'CVaR', value: `${riskMetrics.portfolioCVaR}%`, color: '#ffb800', sub: 'tail risk' },
              { label: 'Max DD', value: `${riskMetrics.maxDrawdown}%`, color: '#ff6b35', sub: 'historical' },
              { label: 'Sharpe', value: riskMetrics.sharpeRatio.toFixed(2), color: '#00ff9d', sub: 'risk-adj' },
              { label: 'Sortino', value: riskMetrics.sortinoRatio.toFixed(2), color: '#00d4ff', sub: 'downside' },
              { label: 'Beta', value: riskMetrics.beta.toFixed(2), color: '#a855f7', sub: 'vs SPY' },
            ].map((m) => (
              <div key={m.label} className="p-3 bg-yarn-base group hover:bg-yarn-elevated transition-colors">
                <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase block mb-1">{m.label}</span>
                <span className="text-heading-m block" style={{ color: m.color }}>{m.value}</span>
                <span className="text-caption text-[rgba(255,255,255,0.25)]">{m.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
