import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { Shield, AlertTriangle, AlertCircle, CheckCircle, X, ChevronRight } from 'lucide-react'
import { riskMetrics, portfolioPositions } from '../data/demoData'

const correlationMatrix = [
  { asset: 'BTC', BTC: 1.00, ETH: 0.82, SOL: 0.74, AAPL: 0.12, NVDA: 0.18, AVAX: 0.79, COIN: 0.45, USDC: 0.00 },
  { asset: 'ETH', BTC: 0.82, ETH: 1.00, SOL: 0.68, AAPL: 0.08, NVDA: 0.14, AVAX: 0.71, COIN: 0.38, USDC: 0.00 },
  { asset: 'SOL', BTC: 0.74, ETH: 0.68, SOL: 1.00, AAPL: 0.05, NVDA: 0.11, AVAX: 0.65, COIN: 0.32, USDC: 0.00 },
  { asset: 'AAPL', BTC: 0.12, ETH: 0.08, SOL: 0.05, AAPL: 1.00, NVDA: 0.62, AVAX: 0.04, COIN: 0.18, USDC: 0.00 },
  { asset: 'NVDA', BTC: 0.18, ETH: 0.14, SOL: 0.11, AAPL: 0.62, NVDA: 1.00, AVAX: 0.09, COIN: 0.22, USDC: 0.00 },
  { asset: 'AVAX', BTC: 0.79, ETH: 0.71, SOL: 0.65, AAPL: 0.04, NVDA: 0.09, AVAX: 1.00, COIN: 0.35, USDC: 0.00 },
  { asset: 'COIN', BTC: 0.45, ETH: 0.38, SOL: 0.32, AAPL: 0.18, NVDA: 0.22, AVAX: 0.35, COIN: 1.00, USDC: 0.00 },
]

const riskRadar = [
  { metric: 'Volatility', value: 65, fullMark: 100 },
  { metric: 'Concentration', value: 78, fullMark: 100 },
  { metric: 'Correlation', value: 72, fullMark: 100 },
  { metric: 'Liquidity', value: 30, fullMark: 100 },
  { metric: 'Drawdown', value: 42, fullMark: 100 },
  { metric: 'Leverage', value: 15, fullMark: 100 },
]

interface Alert {
  id: number
  severity: 'high' | 'medium' | 'low'
  message: string
  time: string
  status: 'active' | 'resolved'
  detail?: string
}

const initialAlerts: Alert[] = [
  { id: 1, severity: 'high', message: 'AVAX correlation with BTC spiked to 0.82 (limit: 0.75)', time: '14:15', status: 'resolved', detail: 'Auto-hedge triggered: Reduced AVAX by 15% (\u2192 5.8%), opened protective put. Cost: $340. Estimated risk reduction: $12,400.' },
  { id: 2, severity: 'medium', message: 'NVDA allocation approaching 15% concentration limit', time: '13:42', status: 'active', detail: 'Current: 14.2% \u2192 limit: 15%. Harvest engine flagged +45% gain. Recommend: Take 30% profit, reduce to 10%.' },
  { id: 3, severity: 'low', message: 'USDC yield opportunity detected (4.2% Aave)', time: '12:20', status: 'active', detail: 'Aave v3 USDC supply APY at 4.2% \u2014 above 30d average of 3.1%. $70K cash available. Estimated monthly yield: $245.' },
  { id: 4, severity: 'high', message: 'Portfolio VaR exceeded 4% threshold intraday', time: '11:55', status: 'resolved', detail: '10:32 AM: BTC flash crash triggered VaR spike to 4.7%. Risk engine auto-reduced BTC by 8% within 45 seconds. VaR normalized to 3.8% by 11:15.' },
  { id: 5, severity: 'medium', message: 'BTC 30d volatility increased to 24.5%', time: '10:30', status: 'active', detail: 'Up from 18.2% last week. Regime engine: "High-Vol" state confirmed (prob 0.73). Allocation engine reduced position sizes by 12%.' },
]

export default function RiskPage() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null)
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all')

  // Listen for kill switch
  useEffect(() => {
    const handler = () => {
      setAlerts((prev) => [
        { id: Date.now(), severity: 'high', message: 'KILL SWITCH ACTIVATED \u2014 Emergency liquidation initiated', time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }), status: 'active', detail: 'All positions liquidating to USDC. Estimated completion: 90 seconds. Portfolio value preserved at 97.3%.' },
        ...prev,
      ])
    }
    window.addEventListener('trigger-kill-switch' as any, handler)
    return () => window.removeEventListener('trigger-kill-switch' as any, handler)
  }, [])

  const resolveAlert = (id: number) => {
    setAlerts((prev) =>
      prev.map((a) => a.id === id ? { ...a, status: 'resolved' as const } : a)
    )
    window.dispatchEvent(new CustomEvent('toast', {
      detail: { message: 'Alert resolved', type: 'success' }
    }))
  }

  const dismissAlert = (id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id))
    window.dispatchEvent(new CustomEvent('toast', {
      detail: { message: 'Alert dismissed', type: 'info' }
    }))
  }

  const filteredAlerts = alerts.filter((a) => filter === 'all' || a.status === filter)
  const activeCount = alerts.filter((a) => a.status === 'active').length

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="eyebrow text-yarn-neon block mb-2">RISK MANAGEMENT</span>
          <h1 className="font-display text-4xl text-white">Portfolio Risk Engine</h1>
        </div>
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-yarn-neon" />
          <span className="text-caption text-yarn-neon">ALL SYSTEMS NOMINAL</span>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 mb-1">
        {[
          { label: 'VaR (95%, 1D)', value: `${riskMetrics.portfolioVaR}%`, sub: 'Portfolio at Risk', status: 'ok' },
          { label: 'CVaR (Expected Shortfall)', value: `${riskMetrics.portfolioCVaR}%`, sub: 'Tail risk measure', status: 'warn' },
          { label: 'Max Drawdown', value: `${riskMetrics.maxDrawdown}%`, sub: 'Peak to trough', status: 'ok' },
          { label: 'Current Drawdown', value: `${riskMetrics.currentDrawdown}%`, sub: 'From ATH', status: 'ok' },
        ].map((m) => (
          <div key={m.label} className="bg-yarn-surface p-5 hover:bg-yarn-elevated transition-colors">
            <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase block mb-2">{m.label}</span>
            <span className="text-heading-m text-white block">{m.value}</span>
            <div className="flex items-center gap-2 mt-1">
              {m.status === 'ok' ? <CheckCircle size={12} className="text-yarn-green" /> : <AlertTriangle size={12} className="text-yarn-governance" />}
              <span className="text-caption text-[rgba(255,255,255,0.35)]">{m.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mb-1">
        {/* Risk Radar */}
        <div className="bg-yarn-surface p-6">
          <span className="text-heading-s text-white block mb-4">Risk Profile</span>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={riskRadar}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Risk" dataKey="value" stroke="#ccff00" fill="#ccff00" fillOpacity={0.15} strokeWidth={1.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Position Risk */}
        <div className="lg:col-span-2 bg-yarn-surface p-6">
          <span className="text-heading-s text-white block mb-4">Position Risk Contribution</span>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={portfolioPositions} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="symbol" type="category" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} axisLine={false} tickLine={false} width={50} />
              <Tooltip content={({ active, payload }: any) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-yarn-elevated border border-[rgba(255,255,255,0.12)] px-3 py-2">
                      <span className="text-caption text-white">{payload[0].payload.symbol}: {payload[0].payload.allocation}% allocation</span>
                    </div>
                  )
                }
                return null
              }} />
              <Bar dataKey="allocation" fill="#ccff00" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Correlation Matrix */}
      <div className="bg-yarn-surface p-6 mb-1">
        <span className="text-heading-s text-white block mb-4">Correlation Matrix</span>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-caption text-[rgba(255,255,255,0.35)] px-2 py-2"></th>
                {correlationMatrix.map((r) => (
                  <th key={r.asset} className="text-center text-caption text-[rgba(255,255,255,0.35)] px-2 py-2">{r.asset}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {correlationMatrix.map((row) => (
                <tr key={row.asset}>
                  <td className="text-caption text-[rgba(255,255,255,0.6)] px-2 py-1.5 font-medium">{row.asset}</td>
                  {correlationMatrix.map((col) => {
                    const val = row[col.asset as keyof typeof row] as number
                    const isHigh = val > 0.7 && val < 1.0
                    return (
                      <td
                        key={col.asset}
                        className={`text-center text-caption px-2 py-1.5 ${
                          val === 1.0 ? 'text-white font-medium' :
                          isHigh ? 'text-yarn-governance bg-[rgba(255,107,53,0.08)]' :
                          val > 0.4 ? 'text-[rgba(255,255,255,0.6)]' :
                          'text-[rgba(255,255,255,0.3)]'
                        }`}
                      >
                        {typeof val === 'number' ? val.toFixed(2) : '-'}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-yarn-surface">
        <div className="p-5 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-heading-s text-white">Risk Alerts</span>
            <div className="flex gap-1">
              {(['all', 'active', 'resolved'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2.5 py-1 text-caption uppercase tracking-wider transition-all ${
                    filter === f
                      ? 'bg-[rgba(204,255,0,0.1)] text-yarn-neon'
                      : 'text-[rgba(255,255,255,0.35)] hover:text-white'
                  }`}
                >
                  {f} {f === 'active' && activeCount > 0 && `(${activeCount})`}
                </button>
              ))}
            </div>
          </div>
          {/* Kill Switch */}
          <button
            onClick={() => {
              if (window.confirm('ACTIVATE KILL SWITCH?\n\nThis will immediately liquidate ALL positions to stablecoins. This action cannot be undone.')) {
                window.dispatchEvent(new CustomEvent('trigger-kill-switch'))
                window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'KILL SWITCH ACTIVATED', type: 'error' } }))
              }
            }}
            className="px-4 py-2 bg-[rgba(255,0,0,0.1)] border border-[rgba(255,0,0,0.3)] text-caption text-yarn-red hover:bg-[rgba(255,0,0,0.2)] transition-all flex items-center gap-2"
          >
            <AlertTriangle size={12} />
            Kill Switch
          </button>
        </div>
        <div className="divide-y divide-[rgba(255,255,255,0.04)]">
          {filteredAlerts.map((alert) => (
            <div key={alert.id}>
              <div
                className={`flex items-start gap-4 px-5 py-4 cursor-pointer transition-colors ${
                  selectedAlert === alert.id ? 'bg-yarn-elevated' : 'hover:bg-yarn-elevated'
                }`}
                onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
              >
                {alert.severity === 'high' ? (
                  <AlertTriangle size={16} className="text-yarn-red mt-0.5 shrink-0" />
                ) : alert.severity === 'medium' ? (
                  <AlertCircle size={16} className="text-yarn-governance mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle size={16} className="text-yarn-treasury mt-0.5 shrink-0" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-body-small text-white">{alert.message}</span>
                    <span className={`text-caption uppercase px-1.5 py-0.5 ${
                      alert.status === 'resolved' ? 'bg-[rgba(34,197,94,0.1)] text-yarn-green' : 'bg-[rgba(255,107,53,0.1)] text-yarn-governance'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                  <span className="text-caption text-[rgba(255,255,255,0.35)]">{alert.time} UTC</span>
                </div>
                <div className="flex items-center gap-1">
                  {alert.status === 'active' && (
                    <button
                      onClick={(e) => { e.stopPropagation(); resolveAlert(alert.id) }}
                      className="p-1.5 text-[rgba(255,255,255,0.25)] hover:text-yarn-green transition-colors"
                      title="Resolve"
                    >
                      <CheckCircle size={14} />
                    </button>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); dismissAlert(alert.id) }}
                    className="p-1.5 text-[rgba(255,255,255,0.25)] hover:text-yarn-red transition-colors"
                    title="Dismiss"
                  >
                    <X size={14} />
                  </button>
                  <ChevronRight size={14} className={`text-[rgba(255,255,255,0.2)] transition-transform ${selectedAlert === alert.id ? 'rotate-90' : ''}`} />
                </div>
              </div>
              {/* Expanded detail */}
              {selectedAlert === alert.id && alert.detail && (
                <div className="px-5 pb-4 pl-14 bg-yarn-base">
                  <div className="p-3 border-l-2 border-[rgba(255,255,255,0.08)]">
                    <span className="text-body-small text-[rgba(255,255,255,0.6)]">{alert.detail}</span>
                    <div className="flex items-center gap-4 mt-3">
                      {alert.status === 'active' && (
                        <button
                          onClick={() => resolveAlert(alert.id)}
                          className="flex items-center gap-1.5 text-caption text-yarn-green hover:underline"
                        >
                          <CheckCircle size={12} />
                          Mark Resolved
                        </button>
                      )}
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className="flex items-center gap-1.5 text-caption text-[rgba(255,255,255,0.35)] hover:text-white"
                      >
                        <X size={12} />
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filteredAlerts.length === 0 && (
            <div className="px-5 py-8 text-center">
              <CheckCircle size={24} className="text-yarn-green mx-auto mb-2" />
              <span className="text-body-small text-[rgba(255,255,255,0.5)]">No {filter} alerts.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
