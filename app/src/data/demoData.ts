// Portfolio positions
export const portfolioPositions = [
  { symbol: 'BTC', name: 'Bitcoin', allocation: 25.4, value: 254000, entry: 42500, current: 67231, pnl: 58.2, type: 'crypto' },
  { symbol: 'ETH', name: 'Ethereum', allocation: 18.7, value: 187000, entry: 2180, current: 3412, pnl: 56.5, type: 'crypto' },
  { symbol: 'SOL', name: 'Solana', allocation: 12.3, value: 123000, entry: 89, current: 142, pnl: 59.6, type: 'crypto' },
  { symbol: 'AAPL', name: 'Apple Inc.', allocation: 8.5, value: 85000, entry: 185, current: 227, pnl: 22.7, type: 'equity' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', allocation: 14.2, value: 142000, entry: 420, current: 135, pnl: 221.4, type: 'equity' },
  { symbol: 'AVAX', name: 'Avalanche', allocation: 6.8, value: 68000, entry: 22, current: 28.5, pnl: 29.5, type: 'crypto' },
  { symbol: 'COIN', name: 'Coinbase', allocation: 7.1, value: 71000, entry: 145, current: 218, pnl: 50.3, type: 'equity' },
  { symbol: 'USDC', name: 'USDC Cash', allocation: 7.0, value: 70000, entry: 1, current: 1, pnl: 0, type: 'stable' },
]

// Portfolio history (for chart)
export const portfolioHistory = [
  { date: 'Jan', value: 920000 },
  { date: 'Feb', value: 880000 },
  { date: 'Mar', value: 950000 },
  { date: 'Apr', value: 1020000 },
  { date: 'May', value: 980000 },
  { date: 'Jun', value: 1050000 },
  { date: 'Jul', value: 1000000 },
]

// Asset allocation (for pie chart)
export const assetAllocation = [
  { name: 'Crypto L1', value: 56.4, color: '#ccff00' },
  { name: 'Equities', value: 29.8, color: '#00ff9d' },
  { name: 'Cash', value: 7.0, color: '#00d4ff' },
  { name: 'Crypto L2', value: 6.8, color: '#a855f7' },
]

// Sector allocation
export const sectorAllocation = [
  { name: 'Technology', value: 42.5 },
  { name: 'Blockchain L1', value: 25.4 },
  { name: 'DeFi', value: 12.3 },
  { name: 'Semiconductors', value: 14.2 },
  { name: 'Cash', value: 5.6 },
]

// Stock screener picks (G20 style)
export const screenerPicks = [
  { symbol: '3436.T', name: 'SUMCO CORP', country: 'JP', sector: 'Technology', momentum: 139.1, conviction: 92, signal: 'STRONG BUY', agentVerdict: 'Underweight', final: 'MIXED', price: 5244 },
  { symbol: '002185.SZ', name: 'TIANSHUI HUATIAN', country: 'CN', sector: 'Technology', momentum: 104.8, conviction: 89, signal: 'STRONG BUY', agentVerdict: 'Hold', final: 'MIXED', price: 2193 },
  { symbol: '7735.T', name: 'SCREEN Holdings', country: 'JP', sector: 'Technology', momentum: 68.2, conviction: 85, signal: 'STRONG BUY', agentVerdict: 'Underweight', final: 'MIXED', price: 18150 },
  { symbol: '002156.SZ', name: 'TONGFU MICRO', country: 'CN', sector: 'Technology', momentum: 54.2, conviction: 84, signal: 'STRONG BUY', agentVerdict: 'Hold', final: 'MIXED', price: 1560 },
  { symbol: 'CGCL.NS', name: 'Capri Global', country: 'IN', sector: 'Financial', momentum: 38.7, conviction: 81, signal: 'STRONG BUY', agentVerdict: 'Hold', final: 'MIXED', price: 245 },
  { symbol: 'MPC', name: 'MARATHON PETROLEUM', country: 'US', sector: 'Energy', momentum: 33.6, conviction: 80, signal: 'STRONG BUY', agentVerdict: 'Hold', final: 'MIXED', price: 198 },
  { symbol: '000810.KS', name: 'Samsung Fire & Marine', country: 'KR', sector: 'Financial', momentum: 31.5, conviction: 82, signal: 'STRONG BUY', agentVerdict: 'Buy', final: 'CONFIRMED', price: 89200 },
  { symbol: '3086.T', name: 'J.FRONT RETAILING', country: 'JP', sector: 'Consumer', momentum: 25.7, conviction: 78, signal: 'STRONG BUY', agentVerdict: 'Hold', final: 'MIXED', price: 3420 },
  { symbol: 'EXE.TO', name: 'EXTENDICARE INC', country: 'CA', sector: 'Healthcare', momentum: 24.8, conviction: 77, signal: 'STRONG BUY', agentVerdict: 'Buy', final: 'CONFIRMED', price: 12.4 },
  { symbol: 'GGRM.JK', name: 'GUDANG GARAM', country: 'ID', sector: 'Consumer', momentum: 23.5, conviction: 76, signal: 'STRONG BUY', agentVerdict: 'Hold', final: 'MIXED', price: 42100 },
  { symbol: 'MRNA', name: 'MODERNA INC', country: 'US', sector: 'Healthcare', momentum: 23.5, conviction: 75, signal: 'STRONG BUY', agentVerdict: 'Hold', final: 'MIXED', price: 112 },
  { symbol: 'AETHER.NS', name: 'Aether Industries', country: 'IN', sector: 'Materials', momentum: 22.6, conviction: 74, signal: 'STRONG BUY', agentVerdict: 'Hold', final: 'MIXED', price: 890 },
]

// Risk metrics
export const riskMetrics = {
  portfolioVaR: 4.2,
  portfolioCVaR: 6.8,
  maxDrawdown: 8.4,
  currentDrawdown: 2.1,
  sharpeRatio: 2.14,
  sortinoRatio: 3.21,
  beta: 0.87,
  correlationSpy: 0.62,
  volatility30d: 18.5,
  volatility90d: 22.3,
}

// Engine configurations
export const engineConfigs = [
  {
    id: 'conviction',
    name: 'Conviction Engine',
    description: 'Scores investment opportunities by confidence level using multi-factor signals.',
    status: 'active',
    version: '2.1.4',
    accuracy: 75.7,
    lastRun: '2 min ago',
    params: {
      signalWeights: { momentum: 0.35, fundamentals: 0.25, sentiment: 0.20, onChain: 0.20 },
      minConfidence: 65,
      lookbackDays: 120,
    }
  },
  {
    id: 'allocation',
    name: 'Capital Allocation Engine',
    description: 'Optimizes position sizing using fractional Kelly criterion with risk constraints.',
    status: 'active',
    version: '1.8.2',
    accuracy: 82.3,
    lastRun: '5 min ago',
    params: {
      method: 'Fractional Kelly (0.25x)',
      maxPositionSize: 25,
      minPositionSize: 2,
      rebalanceThreshold: 5,
    }
  },
  {
    id: 'migration',
    name: 'Capital Migration Engine',
    description: 'Evaluates opportunity cost and manages capital reallocation between positions.',
    status: 'active',
    version: '1.5.1',
    accuracy: 71.2,
    lastRun: '12 min ago',
    params: {
      migrationThreshold: 3.5,
      maxMigrationPerDay: 15,
      transactionCostModel: 'Fixed + Slippage',
    }
  },
  {
    id: 'harvest',
    name: 'Dynamic Harvest Engine',
    description: 'Determines optimal profit-taking timing using tiered thresholds.',
    status: 'active',
    version: '2.0.3',
    accuracy: 68.9,
    lastRun: '8 min ago',
    params: {
      tiers: [
        { gain: 10, harvestPercent: 20 },
        { gain: 20, harvestPercent: 30 },
        { gain: 30, harvestPercent: 40 },
        { gain: 50, harvestPercent: 50 },
      ],
      trailingStop: 8,
    }
  },
  {
    id: 'per',
    name: 'PER Engine',
    description: 'Portfolio Expected Return estimation using Bayesian ensemble methods.',
    status: 'calibrating',
    version: '1.2.0',
    accuracy: 64.1,
    lastRun: '1 hr ago',
    params: {
      method: 'Bayesian Ensemble',
      confidenceInterval: 0.80,
      forecastHorizon: '30 days',
      regimes: 4,
    }
  },
  {
    id: 'compounding',
    name: 'Compounding Engine',
    description: 'Manages reinvestment schedule and compounding ratios.',
    status: 'active',
    version: '1.3.0',
    accuracy: 91.2,
    lastRun: '1 min ago',
    params: {
      reinvestPercent: 80,
      reservePercent: 20,
      frequency: 'Weekly',
      minimumReinvest: 1000,
    }
  },
  {
    id: 'risk',
    name: 'Portfolio Risk Engine',
    description: 'Monitors VaR, CVaR, correlation, and concentration risk in real-time.',
    status: 'active',
    version: '2.3.1',
    accuracy: 88.7,
    lastRun: '30 sec ago',
    params: {
      varConfidence: 95,
      varHoldingPeriod: '1 day',
      maxCorrelation: 0.75,
      concentrationLimit: 30,
    }
  },
  {
    id: 'regime',
    name: 'Market Regime Engine',
    description: 'Detects market conditions using Hidden Markov Model with 4 states.',
    status: 'active',
    version: '1.7.0',
    accuracy: 72.4,
    lastRun: '15 min ago',
    params: {
      model: 'HMM (4 states)',
      states: ['Bull', 'Bear', 'Sideways', 'High-Vol'],
      observationWindow: 60,
      retrainFrequency: 'Weekly',
    }
  },
]

// Evidence log
export const evidenceLog = [
  { id: 'EV-28471', timestamp: '2025-07-14 14:32:18', action: 'Position increased', asset: 'BTC', details: 'Conviction score 92 → increased allocation 22% → 25.4%', engine: 'Conviction + Allocation', hash: '0x8f3a...b2e1' },
  { id: 'EV-28470', timestamp: '2025-07-14 14:28:05', action: 'Profit harvested', asset: 'NVDA', details: '+45% gain reached → harvested 30% ($21,300)', engine: 'Harvest', hash: '0x7d2c...a4f3' },
  { id: 'EV-28469', timestamp: '2025-07-14 14:15:33', action: 'Rebalance executed', asset: 'Portfolio', details: 'SOL allocation exceeded 12% threshold → reduced 2.1%', engine: 'Migration', hash: '0x6e1b...93d2' },
  { id: 'EV-28468', timestamp: '2025-07-14 13:58:47', action: 'Risk alert', asset: 'AVAX', details: 'Correlation with BTC spiked to 0.82 → exposure reduced', engine: 'Risk', hash: '0x5a09...82c1' },
  { id: 'EV-28467', timestamp: '2025-07-14 13:42:12', action: 'Regime detected', asset: 'Market', details: 'Bull regime confirmed (prob 0.87) → increasing risk budget', engine: 'Regime', hash: '0x4f98...71b0' },
  { id: 'EV-28466', timestamp: '2025-07-14 13:21:55', action: 'Compounding', asset: 'Portfolio', details: 'Weekly reinvest: $4,200 allocated to top 3 conviction picks', engine: 'Compounding', hash: '0x3e87...60a9' },
  { id: 'EV-28465', timestamp: '2025-07-14 12:45:30', action: 'PER update', asset: 'ETH', details: 'Expected return revised: 18.2% → 22.1% (bull regime boost)', engine: 'PER', hash: '0x2d76...59f8' },
  { id: 'EV-28464', timestamp: '2025-07-14 12:12:08', action: 'New signal', asset: 'SOL', details: 'Multi-agent confirmed: STRONG BUY (3/3 signals aligned)', engine: 'Conviction', hash: '0x1c65...48e7' },
]

// User settings
export const userSettings = {
  targetReturn: 25,
  maxDrawdown: 15,
  compoundingPercent: 80,
  harvestRules: [
    { gain: 10, harvest: 20 },
    { gain: 20, harvest: 30 },
    { gain: 30, harvest: 40 },
    { gain: 50, harvest: 50 },
  ],
  exitConditions: [
    { condition: 'Target return reached', action: 'Harvest 50% + continue' },
    { condition: 'Max drawdown hit', action: 'Reduce exposure 50%' },
    { condition: 'Portfolio exit signal', action: 'Full exit to stablecoins' },
  ],
  riskTolerance: 'Moderate-Aggressive',
  maxPositionSize: 25,
  allocation: { crypto: 70, equities: 25, cash: 5 },
}

// P&L Attribution data
export const pnlAttribution = {
  byAsset: [
    { asset: 'BTC', contribution: 18.2 },
    { asset: 'ETH', contribution: 12.4 },
    { asset: 'NVDA', contribution: 15.8 },
    { asset: 'SOL', contribution: 8.1 },
    { asset: 'COIN', contribution: 3.2 },
    { asset: 'AAPL', contribution: 2.1 },
    { asset: 'AVAX', contribution: 1.8 },
    { asset: 'USDC', contribution: -0.1 },
  ],
  byEngine: [
    { engine: 'Conviction', contribution: 22.4 },
    { engine: 'Allocation', contribution: 8.1 },
    { engine: 'Harvest', contribution: 12.8 },
    { engine: 'Migration', contribution: 5.2 },
    { engine: 'Risk', contribution: 6.4 },
    { engine: 'Regime', contribution: 1.3 },
    { engine: 'Compounding', contribution: 0.8 },
    { engine: 'PER', contribution: -0.5 },
  ],
}

// App launcher tiles
export const appTiles = [
  { id: 'finance', name: 'Finance', subtitle: 'Portfolio Intelligence', icon: 'TrendingUp', status: 'active', color: '#ccff00' },
  { id: 'legal', name: 'Legal', subtitle: 'Contract Intelligence', icon: 'Scale', status: 'locked', color: '#ffb800' },
  { id: 'enterprise', name: 'Enterprise', subtitle: 'Workflow Automation', icon: 'Server', status: 'locked', color: '#a855f7' },
  { id: 'governance', name: 'Governance', subtitle: 'On-chain Voting', icon: 'Vote', status: 'locked', color: '#ff6b35' },
  { id: 'treasury', name: 'Treasury', subtitle: 'Cash Management', icon: 'Vault', status: 'locked', color: '#00d4ff' },
  { id: 'evidence', name: 'Evidence', subtitle: 'Attestation Trail', icon: 'FileCheck', status: 'locked', color: '#22c55e' },
]
