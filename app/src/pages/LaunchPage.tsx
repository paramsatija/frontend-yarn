import { useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  Scale,
  Server,
  Vote,
  Vault,
  FileCheck,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { appTiles } from '../data/demoData'

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Scale,
  Server,
  Vote,
  Vault,
  FileCheck,
}

export default function LaunchPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-yarn-base pt-16">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="eyebrow text-yarn-neon block mb-3">
              LAUNCHPAD
            </span>
            <h1 className="font-display text-display-l text-white">
              Choose your workspace.
            </h1>
            <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[480px] mt-3">
              Each module is a specialized intelligence environment.
              Select Finance to begin.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-caption text-[rgba(255,255,255,0.35)]">
            <Sparkles size={14} className="text-yarn-neon" />
            YARN Protocol v2.1.0
          </div>
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {appTiles.map((tile) => {
            const Icon = iconMap[tile.icon]
            const isActive = tile.status === 'active'

            return (
              <button
                key={tile.id}
                onClick={() => isActive && navigate('/app/dashboard')}
                disabled={!isActive}
                className={`relative bg-yarn-surface p-8 lg:p-10 text-left transition-all duration-300 group ${
                  isActive
                    ? 'hover:bg-yarn-elevated cursor-pointer'
                    : 'opacity-40 cursor-not-allowed'
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: tile.color }}
                  />
                )}

                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-12 h-12 flex items-center justify-center border"
                    style={{ borderColor: `${tile.color}30` }}
                  >
                    <Icon size={22} style={{ color: tile.color }} />
                  </div>
                  {!isActive && (
                    <Lock size={14} className="text-[rgba(255,255,255,0.2)]" />
                  )}
                  {isActive && (
                    <ArrowRight
                      size={16}
                      className="text-[rgba(255,255,255,0.35)] group-hover:text-white transition-colors"
                    />
                  )}
                </div>

                <span
                  className="eyebrow block mb-2"
                  style={{ color: tile.color }}
                >
                  {tile.name.toUpperCase()}
                </span>
                <span className="text-heading-s text-white block mb-1">
                  {tile.subtitle}
                </span>
                <span className="text-caption text-[rgba(255,255,255,0.35)]">
                  {isActive ? 'Operational' : 'Coming Q4 2025'}
                </span>

                {/* Hover glow */}
                {isActive && (
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 40px ${tile.color}08`,
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Footer note */}
        <div className="mt-12 p-6 bg-yarn-surface border border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 bg-yarn-neon animate-pulse-glow" />
            <span className="text-body-small text-[rgba(255,255,255,0.6)]">
              Finance module is active with live data feeds. All other modules
              are in development and will unlock based on your subscription tier.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
