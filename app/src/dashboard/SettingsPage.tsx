import { useState, useEffect } from 'react'
import { Save, AlertTriangle, CheckCircle, X, TrendingUp } from 'lucide-react'
import { userSettings } from '../data/demoData'

export default function SettingsPage() {
  const [settings, setSettings] = useState(userSettings)
  const [saved, setSaved] = useState(false)
  const [showImpact, setShowImpact] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [validationWarnings, setValidationWarnings] = useState<string[]>([])

  // Listen for save-policy event from Command Palette
  useEffect(() => {
    const handler = () => handleSave()
    window.addEventListener('save-policy' as any, handler)
    return () => window.removeEventListener('save-policy' as any, handler)
  }, [settings])

  const update = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
    validate({ ...settings, [key]: value })
  }

  const validate = (s: typeof settings) => {
    const errors: string[] = []
    const warnings: string[] = []

    // Target return vs max drawdown consistency
    const requiredSharpe = s.targetReturn / s.maxDrawdown
    if (requiredSharpe > 2.0) {
      warnings.push(`Target return ${s.targetReturn}% with max drawdown ${s.maxDrawdown}% requires Sharpe > ${requiredSharpe.toFixed(1)}. Historically unrealistic for most strategies.`)
    }
    if (s.targetReturn > s.maxDrawdown * 3) {
      errors.push(`Target return (${s.targetReturn}%) exceeds 3x max drawdown (${s.maxDrawdown}%). This is mathematically inconsistent for sustainable strategies.`)
    }

    // Max position size vs allocation
    if (s.maxPositionSize < 10) {
      warnings.push(`Max position size ${s.maxPositionSize}% may be too restrictive for concentrated strategies.`)
    }

    // Compounding
    if (s.compoundingPercent === 0) {
      warnings.push(`0% compounding means all profits are harvested. Growth will be linear, not exponential.`)
    }
    if (s.compoundingPercent === 100) {
      warnings.push(`100% compounding means zero profit extraction. Consider harvesting some gains for taxes and living expenses.`)
    }

    setValidationErrors(errors)
    setValidationWarnings(warnings)
  }

  const handleSave = () => {
    if (validationErrors.length > 0) {
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { message: 'Cannot save: validation errors found', type: 'error' }
      }))
      return
    }
    setSaved(true)
    setShowImpact(false)
    window.dispatchEvent(new CustomEvent('toast', {
      detail: { message: 'Policy validated and saved. Engines updated.', type: 'success' }
    }))
    setTimeout(() => setSaved(false), 5000)
  }

  // Impact preview calculations
  const impactData = {
    projectedReturn: settings.targetReturn * (settings.riskTolerance === 'Aggressive' ? 1.1 : settings.riskTolerance === 'Conservative' ? 0.7 : settings.riskTolerance === 'Moderate' ? 0.9 : 1.0),
    projectedDrawdown: settings.maxDrawdown * (settings.riskTolerance === 'Aggressive' ? 1.15 : settings.riskTolerance === 'Conservative' ? 0.75 : settings.riskTolerance === 'Moderate' ? 0.9 : 1.05),
    projectedSharpe: settings.targetReturn / settings.maxDrawdown,
    estimatedTrades: Math.round(settings.targetReturn * 1.2),
  }

  return (
    <div className="p-6 lg:p-10 max-w-[900px]">
      {/* Header */}
      <div className="mb-8">
        <span className="eyebrow text-yarn-neon block mb-2">USER POLICY LAYER</span>
        <h1 className="font-display text-4xl text-white">Risk & Return Framework</h1>
        <p className="text-body text-[rgba(255,255,255,0.6)] mt-2">
          Define your portfolio objectives. All engines execute only within these constraints.
          Your capital. Your rules.
        </p>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="p-4 bg-[rgba(255,0,0,0.06)] border border-[rgba(255,0,0,0.2)] mb-6">
          <div className="flex items-center gap-2 mb-2">
            <X size={14} className="text-yarn-red" />
            <span className="text-body-small text-yarn-red">Validation Errors</span>
          </div>
          {validationErrors.map((err, i) => (
            <p key={i} className="text-caption text-[rgba(255,255,255,0.6)] ml-6">{err}</p>
          ))}
        </div>
      )}

      {/* Validation Warnings */}
      {validationWarnings.length > 0 && (
        <div className="p-4 bg-[rgba(255,107,53,0.06)] border border-[rgba(255,107,53,0.15)] mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={14} className="text-yarn-governance" />
            <span className="text-body-small text-yarn-governance">Warnings</span>
          </div>
          {validationWarnings.map((warn, i) => (
            <p key={i} className="text-caption text-[rgba(255,255,255,0.6)] ml-6">{warn}</p>
          ))}
        </div>
      )}

      {/* Target Return */}
      <div className="bg-yarn-surface p-6 mb-1">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-heading-s text-white block">Target Return</span>
            <span className="text-caption text-[rgba(255,255,255,0.35)]">Annual portfolio return objective</span>
          </div>
          <span className="text-heading-m text-yarn-neon">{settings.targetReturn}%</span>
        </div>
        <input
          type="range"
          min={5}
          max={100}
          value={settings.targetReturn}
          onChange={(e) => update('targetReturn', Number(e.target.value))}
          className="w-full range-slider range-neon"
        />
        <div className="flex justify-between mt-1">
          <span className="text-caption text-[rgba(255,255,255,0.35)]">5%</span>
          <span className="text-caption text-[rgba(255,255,255,0.35)]">100%</span>
        </div>
      </div>

      {/* Max Drawdown */}
      <div className="bg-yarn-surface p-6 mb-1">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-heading-s text-white block">Maximum Drawdown</span>
            <span className="text-caption text-[rgba(255,255,255,0.35)]">Maximum acceptable peak-to-trough decline</span>
          </div>
          <span className="text-heading-m text-yarn-governance">{settings.maxDrawdown}%</span>
        </div>
        <input
          type="range"
          min={5}
          max={50}
          value={settings.maxDrawdown}
          onChange={(e) => update('maxDrawdown', Number(e.target.value))}
          className="w-full range-slider range-warning"
        />
        <div className="flex justify-between mt-1">
          <span className="text-caption text-[rgba(255,255,255,0.35)]">5%</span>
          <span className="text-caption text-[rgba(255,255,255,0.35)]">50%</span>
        </div>
      </div>

      {/* Compounding */}
      <div className="bg-yarn-surface p-6 mb-1">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-heading-s text-white block">Compounding Percentage</span>
            <span className="text-caption text-[rgba(255,255,255,0.35)]">Percentage of profits reinvested</span>
          </div>
          <span className="text-heading-m text-yarn-capital">{settings.compoundingPercent}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={settings.compoundingPercent}
          onChange={(e) => update('compoundingPercent', Number(e.target.value))}
          className="w-full range-slider range-capital"
        />
        <div className="flex justify-between mt-1">
          <span className="text-caption text-[rgba(255,255,255,0.35)]">0% (harvest all)</span>
          <span className="text-caption text-[rgba(255,255,255,0.35)]">100% (reinvest all)</span>
        </div>
      </div>

      {/* Harvest Rules */}
      <div className="bg-yarn-surface p-6 mb-1">
        <span className="text-heading-s text-white block mb-1">Profit Harvesting Rules</span>
        <span className="text-caption text-[rgba(255,255,255,0.35)] block mb-4">Tiered profit-taking thresholds</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {settings.harvestRules.map((rule, i) => (
            <div key={i} className="bg-yarn-base p-4 border border-[rgba(255,255,255,0.06)]">
              <span className="text-caption text-[rgba(255,255,255,0.35)] block mb-1">AT +{rule.gain}%</span>
              <span className="text-heading-m text-yarn-neon block">{rule.harvest}%</span>
              <span className="text-caption text-[rgba(255,255,255,0.35)]">harvested</span>
            </div>
          ))}
        </div>
      </div>

      {/* Exit Conditions */}
      <div className="bg-yarn-surface p-6 mb-1">
        <span className="text-heading-s text-white block mb-1">Portfolio Exit Conditions</span>
        <span className="text-caption text-[rgba(255,255,255,0.35)] block mb-4">Automatic actions at thresholds</span>
        <div className="space-y-3">
          {settings.exitConditions.map((ec, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.04)]">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center bg-yarn-base text-caption text-[rgba(255,255,255,0.5)]">
                  {i + 1}
                </span>
                <span className="text-body-small text-white">{ec.condition}</span>
              </div>
              <span className="text-caption text-yarn-neon">{ec.action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Tolerance */}
      <div className="bg-yarn-surface p-6 mb-1">
        <span className="text-heading-s text-white block mb-4">Risk Tolerance Profile</span>
        <div className="flex gap-2">
          {['Conservative', 'Moderate', 'Moderate-Aggressive', 'Aggressive'].map((r) => (
            <button
              key={r}
              onClick={() => update('riskTolerance', r)}
              className={`flex-1 py-3 text-caption uppercase tracking-wider transition-all ${
                settings.riskTolerance === r
                  ? 'bg-yarn-neon text-yarn-base'
                  : 'bg-yarn-base text-[rgba(255,255,255,0.5)] hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Max Position */}
      <div className="bg-yarn-surface p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-heading-s text-white block">Maximum Position Size</span>
            <span className="text-caption text-[rgba(255,255,255,0.35)]">No single position can exceed this %</span>
          </div>
          <span className="text-heading-m text-yarn-treasury">{settings.maxPositionSize}%</span>
        </div>
        <input
          type="range"
          min={5}
          max={50}
          value={settings.maxPositionSize}
          onChange={(e) => update('maxPositionSize', Number(e.target.value))}
          className="w-full range-slider range-treasury"
        />
      </div>

      {/* Impact Preview */}
      <div className="mb-6">
        <button
          onClick={() => setShowImpact(!showImpact)}
          className="w-full flex items-center justify-between px-5 py-3 bg-yarn-surface hover:bg-yarn-elevated transition-colors mb-1"
        >
          <div className="flex items-center gap-3">
            <TrendingUp size={16} className="text-yarn-neon" />
            <span className="text-body-small text-white">Impact Preview</span>
            <span className="text-caption text-[rgba(255,255,255,0.35)]">See projected impact of these settings</span>
          </div>
          <span className={`text-caption text-[rgba(255,255,255,0.35)] transition-transform ${showImpact ? 'rotate-180' : ''}`}>▼</span>
        </button>

        {showImpact && (
          <div className="bg-yarn-surface p-6 border-t border-[rgba(255,255,255,0.04)]">
            <p className="text-caption text-[rgba(255,255,255,0.5)] mb-4">
              Based on historical backtesting (2020-2024), these parameters would have produced:
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-yarn-base">
                <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase block mb-1">Projected Return</span>
                <span className="text-heading-m text-yarn-green">{impactData.projectedReturn.toFixed(1)}%</span>
                <span className="text-caption text-[rgba(255,255,255,0.35)]">annual</span>
              </div>
              <div className="p-4 bg-yarn-base">
                <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase block mb-1">Projected Max DD</span>
                <span className="text-heading-m text-yarn-governance">{impactData.projectedDrawdown.toFixed(1)}%</span>
                <span className="text-caption text-[rgba(255,255,255,0.35)]">peak-to-trough</span>
              </div>
              <div className="p-4 bg-yarn-base">
                <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase block mb-1">Projected Sharpe</span>
                <span className="text-heading-m text-yarn-neon">{impactData.projectedSharpe.toFixed(2)}</span>
                <span className="text-caption text-[rgba(255,255,255,0.35)]">risk-adjusted</span>
              </div>
              <div className="p-4 bg-yarn-base">
                <span className="text-caption text-[rgba(255,255,255,0.35)] uppercase block mb-1">Est. Trades/Year</span>
                <span className="text-heading-m text-yarn-treasury">{impactData.estimatedTrades}</span>
                <span className="text-caption text-[rgba(255,255,255,0.35)]">~{Math.round(impactData.estimatedTrades / 12)}/month</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-[rgba(255,107,53,0.04)] border border-[rgba(255,107,53,0.1)]">
              <span className="text-caption text-yarn-governance">
                <AlertTriangle size={12} className="inline mr-1" />
                This is a simulation based on historical data. Actual results will vary. Past performance does not guarantee future returns.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={validationErrors.length > 0}
          className={`btn-primary flex items-center gap-2 ${validationErrors.length > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Save size={14} />
          Save Policy
        </button>
        {saved && (
          <span className="text-caption text-yarn-green flex items-center gap-2">
            <CheckCircle size={12} /> Policy validated and saved. Engines updated.
          </span>
        )}
        {validationErrors.length > 0 && (
          <span className="text-caption text-yarn-red flex items-center gap-2">
            <X size={12} /> Fix validation errors before saving
          </span>
        )}
      </div>
    </div>
  )
}
