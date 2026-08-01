export type NodeType = 'engine' | 'condition' | 'action' | 'data'

export interface WorkflowNode {
  id: string
  type: NodeType
  subType: string
  label: string
  description: string
  x: number
  y: number
  config: Record<string, any>
  inputs: number
  outputs: number
  color: string
}

export interface WorkflowEdge {
  id: string
  fromNode: string
  fromPort: number
  toNode: string
  toPort: number
}

export interface SavedWorkflow {
  id: string
  name: string
  description: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  status: 'draft' | 'active' | 'paused'
  createdAt: string
  updatedAt: string
}

export interface NodeTemplate {
  type: NodeType
  subType: string
  label: string
  description: string
  category: string
  inputs: number
  outputs: number
  color: string
  defaultConfig: Record<string, any>
  configFields: ConfigField[]
}

export interface ConfigField {
  key: string
  label: string
  type: 'number' | 'text' | 'select' | 'toggle' | 'range'
  defaultValue: any
  options?: string[]
  min?: number
  max?: number
  step?: number
  unit?: string
}

export const NODE_TEMPLATES: NodeTemplate[] = [
  // ENGINE NODES (green)
  {
    type: 'engine', subType: 'conviction', label: 'Conviction Engine',
    description: 'Score investment opportunities by confidence level',
    category: 'Engines', inputs: 1, outputs: 2, color: '#ccff00',
    defaultConfig: { minConfidence: 65, signalWeights: { momentum: 0.35, fundamentals: 0.25, sentiment: 0.20, onChain: 0.20 } },
    configFields: [
      { key: 'minConfidence', label: 'Min Confidence', type: 'range', defaultValue: 65, min: 0, max: 100, unit: '%' },
    ]
  },
  {
    type: 'engine', subType: 'allocation', label: 'Allocation Engine',
    description: 'Optimize position sizing using Kelly criterion',
    category: 'Engines', inputs: 1, outputs: 1, color: '#ccff00',
    defaultConfig: { method: 'Fractional Kelly (0.25x)', maxPositionSize: 25 },
    configFields: [
      { key: 'maxPositionSize', label: 'Max Position Size', type: 'range', defaultValue: 25, min: 5, max: 50, unit: '%' },
    ]
  },
  {
    type: 'engine', subType: 'risk', label: 'Risk Engine',
    description: 'Monitor VaR, CVaR, and concentration risk',
    category: 'Engines', inputs: 1, outputs: 2, color: '#ccff00',
    defaultConfig: { varConfidence: 95, maxCorrelation: 0.75 },
    configFields: [
      { key: 'varConfidence', label: 'VaR Confidence', type: 'range', defaultValue: 95, min: 80, max: 99, unit: '%' },
      { key: 'maxCorrelation', label: 'Max Correlation', type: 'range', defaultValue: 0.75, min: 0.3, max: 1, step: 0.05 },
    ]
  },
  {
    type: 'engine', subType: 'harvest', label: 'Harvest Engine',
    description: 'Determine optimal profit-taking timing',
    category: 'Engines', inputs: 1, outputs: 1, color: '#ccff00',
    defaultConfig: { trailingStop: 8 },
    configFields: [
      { key: 'trailingStop', label: 'Trailing Stop', type: 'range', defaultValue: 8, min: 1, max: 20, unit: '%' },
    ]
  },
  {
    type: 'engine', subType: 'regime', label: 'Regime Engine',
    description: 'Detect market conditions using HMM',
    category: 'Engines', inputs: 1, outputs: 4, color: '#ccff00',
    defaultConfig: { states: ['Bull', 'Bear', 'Sideways', 'High-Vol'] },
    configFields: []
  },
  // CONDITION NODES (blue)
  {
    type: 'condition', subType: 'if', label: 'IF / ELSE',
    description: 'Branch based on a condition',
    category: 'Conditions', inputs: 1, outputs: 2, color: '#00d4ff',
    defaultConfig: { condition: 'confidence > 80' },
    configFields: [
      { key: 'condition', label: 'Condition', type: 'select', defaultValue: 'confidence > 80', options: ['confidence > 80', 'confidence > 60', 'pnl > 10%', 'pnl < -5%', 'var > 4%', 'correlation > 0.75', 'rsi < 30', 'rsi > 70', 'price > ma20', 'custom'] },
    ]
  },
  {
    type: 'condition', subType: 'threshold', label: 'Threshold',
    description: 'Trigger when value crosses threshold',
    category: 'Conditions', inputs: 1, outputs: 2, color: '#00d4ff',
    defaultConfig: { threshold: 10, direction: 'above' },
    configFields: [
      { key: 'threshold', label: 'Threshold', type: 'number', defaultValue: 10 },
      { key: 'direction', label: 'Direction', type: 'select', defaultValue: 'above', options: ['above', 'below'] },
    ]
  },
  {
    type: 'condition', subType: 'timer', label: 'Timer',
    description: 'Wait for a specified duration',
    category: 'Conditions', inputs: 1, outputs: 1, color: '#00d4ff',
    defaultConfig: { duration: 24, unit: 'hours' },
    configFields: [
      { key: 'duration', label: 'Duration', type: 'number', defaultValue: 24 },
      { key: 'unit', label: 'Unit', type: 'select', defaultValue: 'hours', options: ['seconds', 'minutes', 'hours', 'days'] },
    ]
  },
  {
    type: 'condition', subType: 'schedule', label: 'Schedule',
    description: 'Run only at specific times',
    category: 'Conditions', inputs: 1, outputs: 1, color: '#00d4ff',
    defaultConfig: { time: '09:30', timezone: 'ET' },
    configFields: [
      { key: 'time', label: 'Time', type: 'text', defaultValue: '09:30' },
      { key: 'timezone', label: 'Timezone', type: 'select', defaultValue: 'ET', options: ['ET', 'UTC', 'CET', 'JST'] },
    ]
  },
  // ACTION NODES (red)
  {
    type: 'action', subType: 'buy', label: 'BUY',
    description: 'Execute a buy order',
    category: 'Actions', inputs: 1, outputs: 1, color: '#22c55e',
    defaultConfig: { asset: 'BTC', percentage: 5 },
    configFields: [
      { key: 'asset', label: 'Asset', type: 'select', defaultValue: 'BTC', options: ['BTC', 'ETH', 'SOL', 'AVAX', 'NVDA', 'AAPL', 'COIN', 'CUSTOM'] },
      { key: 'percentage', label: 'Allocation %', type: 'range', defaultValue: 5, min: 1, max: 25, unit: '%' },
    ]
  },
  {
    type: 'action', subType: 'sell', label: 'SELL',
    description: 'Execute a sell order',
    category: 'Actions', inputs: 1, outputs: 1, color: '#ef4444',
    defaultConfig: { asset: 'BTC', percentage: 50 },
    configFields: [
      { key: 'asset', label: 'Asset', type: 'select', defaultValue: 'BTC', options: ['BTC', 'ETH', 'SOL', 'AVAX', 'NVDA', 'AAPL', 'COIN', 'CUSTOM'] },
      { key: 'percentage', label: 'Sell %', type: 'range', defaultValue: 50, min: 10, max: 100, step: 10, unit: '%' },
    ]
  },
  {
    type: 'action', subType: 'alert', label: 'Send Alert',
    description: 'Send a notification',
    category: 'Actions', inputs: 1, outputs: 1, color: '#ffb800',
    defaultConfig: { channel: 'dashboard', message: 'Signal triggered' },
    configFields: [
      { key: 'channel', label: 'Channel', type: 'select', defaultValue: 'dashboard', options: ['dashboard', 'email', 'slack', 'webhook'] },
      { key: 'message', label: 'Message', type: 'text', defaultValue: 'Signal triggered' },
    ]
  },
  {
    type: 'action', subType: 'log', label: 'Log Evidence',
    description: 'Create an attestation record',
    category: 'Actions', inputs: 1, outputs: 1, color: '#a855f7',
    defaultConfig: { severity: 'info' },
    configFields: [
      { key: 'severity', label: 'Severity', type: 'select', defaultValue: 'info', options: ['info', 'warning', 'critical'] },
    ]
  },
  {
    type: 'action', subType: 'stop', label: 'STOP',
    description: 'Halt all execution',
    category: 'Actions', inputs: 1, outputs: 0, color: '#ff6b35',
    defaultConfig: {},
    configFields: []
  },
  // DATA NODES (gray)
  {
    type: 'data', subType: 'price', label: 'Price Feed',
    description: 'Real-time price data',
    category: 'Data', inputs: 0, outputs: 1, color: '#888888',
    defaultConfig: { asset: 'BTC', timeframe: '1m' },
    configFields: [
      { key: 'asset', label: 'Asset', type: 'select', defaultValue: 'BTC', options: ['BTC', 'ETH', 'SOL', 'AVAX', 'NVDA', 'AAPL', 'COIN', 'SPY'] },
      { key: 'timeframe', label: 'Timeframe', type: 'select', defaultValue: '1m', options: ['1s', '5s', '1m', '5m', '15m', '1h', '1d'] },
    ]
  },
  {
    type: 'data', subType: 'portfolio', label: 'Portfolio State',
    description: 'Current portfolio data',
    category: 'Data', inputs: 0, outputs: 1, color: '#888888',
    defaultConfig: { data: 'value' },
    configFields: [
      { key: 'data', label: 'Data Point', type: 'select', defaultValue: 'value', options: ['value', 'pnl', 'allocation', 'cash', 'var'] },
    ]
  },
]
