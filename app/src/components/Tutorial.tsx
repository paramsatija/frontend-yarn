import { useState, useEffect, useCallback } from 'react'
import { X, ChevronRight, ChevronLeft, Play, CheckCircle, Cpu } from 'lucide-react'

interface TutorialStep {
  id: string
  title: string
  content: string
  highlight?: string // CSS selector for element to highlight
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right'
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to YARN Finance',
    content: 'This is your institutional-grade portfolio intelligence dashboard. Let me show you around in 60 seconds.',
    position: 'center',
  },
  {
    id: 'sidebar',
    title: 'Navigation Sidebar',
    content: 'Access all modules from here: Overview, Screener, Engines, Risk, Evidence, Settings, and Workflows. Each shows keyboard shortcuts.',
    highlight: 'aside',
    position: 'right',
  },
  {
    id: 'cmdk',
    title: 'Command Palette',
    content: 'Press Cmd+K (or Ctrl+K) anywhere to open the command palette. Search pages, execute actions, and navigate instantly.',
    highlight: 'header button',
    position: 'bottom',
  },
  {
    id: 'overview',
    title: 'Portfolio Overview',
    content: 'Your cockpit. See total value, P&L, active positions. Toggle benchmark overlays (S&P 500, BTC) and switch timeframes on the chart.',
    highlight: '.portfolio-chart',
    position: 'center',
  },
  {
    id: 'screener',
    title: 'G20 Screener',
    content: 'Find opportunities across 20 countries. Filter by signal type (CONFIRMED/MIXED). Every pick shows LightGBM vs Multi-Agent analysis.',
    highlight: '.screener-grid',
    position: 'center',
  },
  {
    id: 'engines',
    title: '8 Intelligence Engines',
    content: 'The brain of the system. Each engine specializes: Conviction, Allocation, Risk, Harvest, Regime, and more. Click to expand, toggle on/off.',
    highlight: '.engine-list',
    position: 'center',
  },
  {
    id: 'risk',
    title: 'Risk Management',
    content: 'Real-time VaR, CVaR, correlation matrix. Alerts trigger automatically. The Kill Switch can liquidate everything in an emergency.',
    highlight: '.risk-alerts',
    position: 'center',
  },
  {
    id: 'evidence',
    title: 'Evidence Trail',
    content: 'Every decision is cryptographically attested. Filter by engine or action, export to CSV. This is your audit trail.',
    highlight: '.evidence-table',
    position: 'center',
  },
  {
    id: 'settings',
    title: 'Risk Framework',
    content: 'Define your constraints: target return, max drawdown, compounding rules. The system validates your parameters and shows projected impact.',
    highlight: '.settings-panel',
    position: 'center',
  },
  {
    id: 'workflows',
    title: 'Workflow Builder',
    content: 'Create custom strategies by connecting engine nodes, conditions, and actions on a visual canvas. No coding required.',
    highlight: '.workflow-builder',
    position: 'center',
  },
  {
    id: 'done',
    title: 'You\'re Ready',
    content: 'That\'s the essentials. Press ? anytime for keyboard shortcuts. Happy building!',
    position: 'center',
  },
]

export function useTutorial() {
  const [showTutorial, setShowTutorial] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('yarn-tutorial-seen')
    if (!seen) {
      setShowTutorial(true)
    } else {
      setHasSeenTutorial(true)
    }
  }, [])

  const startTutorial = useCallback(() => {
    setCurrentStep(0)
    setShowTutorial(true)
  }, [])

  const dismissTutorial = useCallback(() => {
    setShowTutorial(false)
    localStorage.setItem('yarn-tutorial-seen', 'true')
    setHasSeenTutorial(true)
  }, [])

  const nextStep = useCallback(() => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      dismissTutorial()
    }
  }, [currentStep, dismissTutorial])

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  return {
    showTutorial,
    currentStep,
    hasSeenTutorial,
    startTutorial,
    dismissTutorial,
    nextStep,
    prevStep,
    step: tutorialSteps[currentStep],
    totalSteps: tutorialSteps.length,
  }
}

interface TutorialOverlayProps {
  step: TutorialStep
  currentStep: number
  totalSteps: number
  onNext: () => void
  onPrev: () => void
  onDismiss: () => void
}

export default function TutorialOverlay({ step, currentStep, totalSteps, onNext, onPrev, onDismiss }: TutorialOverlayProps) {
  const isFirst = currentStep === 0
  const isLast = currentStep === totalSteps - 1

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onDismiss} />

      {/* Content */}
      <div className="relative bg-yarn-elevated border border-[rgba(255,255,255,0.12)] w-full max-w-[460px] shadow-2xl">
        {/* Progress bar */}
        <div className="h-0.5 bg-[rgba(255,255,255,0.06)]">
          <div
            className="h-full bg-yarn-neon transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <span className="eyebrow text-yarn-neon">Onboarding {currentStep + 1}/{totalSteps}</span>
          <button onClick={onDismiss} className="text-[rgba(255,255,255,0.3)] hover:text-white transition-colors p-1">
            <X size={16} />
          </button>
        </div>

        {/* Step number indicator */}
        <div className="px-6 flex items-center gap-1 mb-4">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 transition-colors ${
                i <= currentStep ? 'bg-yarn-neon' : 'bg-[rgba(255,255,255,0.08)]'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <h3 className="text-heading-m text-white mb-3">{step.title}</h3>
          <p className="text-body text-[rgba(255,255,255,0.6)] leading-relaxed">{step.content}</p>

          {/* Tip box for certain steps */}
          {step.id === 'cmdk' && (
            <div className="mt-4 p-3 bg-[rgba(204,255,0,0.05)] border border-[rgba(204,255,0,0.1)] flex items-center gap-3">
              <kbd className="px-2 py-1 bg-yarn-surface text-caption text-yarn-neon font-mono border border-[rgba(204,255,0,0.2)]">⌘ K</kbd>
              <span className="text-caption text-[rgba(255,255,255,0.5)]">Try it now — it works everywhere</span>
            </div>
          )}

          {step.id === 'engines' && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {['Conviction', 'Allocation', 'Risk', 'Harvest'].map((e) => (
                <div key={e} className="p-2 bg-yarn-base border border-[rgba(255,255,255,0.06)] text-center">
                  <Cpu size={14} className="text-yarn-neon mx-auto mb-1" />
                  <span className="text-[10px] text-[rgba(255,255,255,0.5)]">{e}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className={`flex items-center gap-1 text-caption transition-colors ${
              isFirst ? 'text-[rgba(255,255,255,0.15)] cursor-not-allowed' : 'text-[rgba(255,255,255,0.4)] hover:text-white'
            }`}
          >
            <ChevronLeft size={14} />
            Back
          </button>

          {isLast ? (
            <button
              onClick={onNext}
              className="btn-primary flex items-center gap-2 py-2.5 px-5"
            >
              <CheckCircle size={14} />
              Get Started
            </button>
          ) : (
            <button
              onClick={onNext}
              className="btn-primary flex items-center gap-2 py-2.5 px-5"
            >
              {isFirst ? (
                <>
                  <Play size={14} />
                  Start Tour
                </>
              ) : (
                <>
                  Next
                  <ChevronRight size={14} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Inline help tooltip component
export function HelpTooltip({ title, children }: { title: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false)

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-yarn-elevated border border-[rgba(255,255,255,0.1)] p-3 shadow-xl z-50">
          <span className="text-caption text-yarn-neon block mb-1">{title}</span>
          <span className="text-[11px] text-[rgba(255,255,255,0.5)] leading-relaxed block">
            {children}
          </span>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-yarn-elevated border-r border-b border-[rgba(255,255,255,0.1)] rotate-45 -mt-1" />
        </div>
      )}
    </div>
  )
}
