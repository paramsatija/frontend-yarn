import { useState, useRef, useCallback } from 'react'
import {
  Cpu, GitBranch, Zap, BarChart3,
  X, Trash2, Copy, Save, Move, MousePointer,
  ArrowRight, ZoomIn, ZoomOut, Maximize
} from 'lucide-react'
import type { WorkflowNode, WorkflowEdge, NodeTemplate } from '../types/workflow'
import { NODE_TEMPLATES } from '../types/workflow'

const GRID_SIZE = 20
const NODE_WIDTH = 180
const NODE_HEIGHT = 60

function snapToGrid(val: number) {
  return Math.round(val / GRID_SIZE) * GRID_SIZE
}

function generateId() {
  return Math.random().toString(36).substring(2, 9)
}

const iconMap: Record<string, any> = {
  engine: Cpu,
  condition: GitBranch,
  action: Zap,
  data: BarChart3,
}

interface WorkflowBuilderProps {
  initialNodes?: WorkflowNode[]
  initialEdges?: WorkflowEdge[]
  onSave?: (name: string, nodes: WorkflowNode[], edges: WorkflowEdge[]) => void
}

export default function WorkflowBuilder({ initialNodes = [], initialEdges = [], onSave }: WorkflowBuilderProps) {
  const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes)
  const [edges, setEdges] = useState<WorkflowEdge[]>(initialEdges)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [selectedPalette, setSelectedPalette] = useState<NodeTemplate | null>(null)
  const [connectingFrom, setConnectingFrom] = useState<{ nodeId: string; port: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [workflowName, setWorkflowName] = useState('Untitled Workflow')
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [activePaletteTab, setActivePaletteTab] = useState('Engines')
  const canvasRef = useRef<HTMLDivElement>(null)

  const categories = ['Engines', 'Conditions', 'Actions', 'Data']

  const getMousePos = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return { x: 0, y: 0 }
    return {
      x: (e.clientX - rect.left - offset.x) / scale,
      y: (e.clientY - rect.top - offset.y) / scale,
    }
  }, [offset, scale])

  // Click on canvas to place node
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (!selectedPalette || isDragging || isPanning) return
    if ((e.target as HTMLElement).closest('.workflow-node')) return

    const pos = getMousePos(e)
    const newNode: WorkflowNode = {
      id: generateId(),
      type: selectedPalette.type,
      subType: selectedPalette.subType,
      label: selectedPalette.label,
      description: selectedPalette.description,
      x: snapToGrid(pos.x - NODE_WIDTH / 2),
      y: snapToGrid(pos.y - NODE_HEIGHT / 2),
      config: { ...selectedPalette.defaultConfig },
      inputs: selectedPalette.inputs,
      outputs: selectedPalette.outputs,
      color: selectedPalette.color,
    }
    setNodes((prev) => [...prev, newNode])
    setSelectedPalette(null)
    window.dispatchEvent(new CustomEvent('toast', {
      detail: { message: `Added ${newNode.label} node`, type: 'success' }
    }))
  }, [selectedPalette, isDragging, isPanning, getMousePos])

  // Drag node
  const handleNodeMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation()
    const node = nodes.find((n) => n.id === nodeId)
    if (!node) return
    setSelectedNode(nodeId)

    if (selectedPalette) return // Don't drag if placing

    const pos = getMousePos(e)
    setDragOffset({ x: pos.x - node.x, y: pos.y - node.y })
    setIsDragging(true)

    const handleMove = (ev: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      const newPos = {
        x: (ev.clientX - rect.left - offset.x) / scale - dragOffset.x,
        y: (ev.clientY - rect.top - offset.y) / scale - dragOffset.y,
      }
      setNodes((prev) =>
        prev.map((n) =>
          n.id === nodeId
            ? { ...n, x: snapToGrid(newPos.x), y: snapToGrid(newPos.y) }
            : n
        )
      )
    }

    const handleUp = () => {
      setIsDragging(false)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
  }, [nodes, selectedPalette, getMousePos, offset, scale, dragOffset])

  // Pan canvas
  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    if (selectedPalette) return
    if ((e.target as HTMLElement).closest('.workflow-node')) return

    setIsPanning(true)
    setPanStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
    setSelectedNode(null)

    const handleMove = (ev: MouseEvent) => {
      setOffset({
        x: ev.clientX - panStart.x,
        y: ev.clientY - panStart.y,
      })
    }

    const handleUp = () => {
      setIsPanning(false)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
  }, [selectedPalette, offset, panStart])

  // Port click for connection
  const handlePortClick = useCallback((e: React.MouseEvent, nodeId: string, port: number, isOutput: boolean) => {
    e.stopPropagation()

    if (!connectingFrom) {
      if (isOutput) {
        setConnectingFrom({ nodeId, port })
      }
      return
    }

    if (!isOutput) {
      // Complete connection
      if (connectingFrom.nodeId === nodeId) {
        setConnectingFrom(null)
        return
      }
      const exists = edges.find(
        (ed) => ed.fromNode === connectingFrom.nodeId && ed.toNode === nodeId
      )
      if (exists) {
        setConnectingFrom(null)
        return
      }
      const newEdge: WorkflowEdge = {
        id: generateId(),
        fromNode: connectingFrom.nodeId,
        fromPort: connectingFrom.port,
        toNode: nodeId,
        toPort: port,
      }
      setEdges((prev) => [...prev, newEdge])
      setConnectingFrom(null)
      window.dispatchEvent(new CustomEvent('toast', {
        detail: { message: 'Connection created', type: 'success' }
      }))
    } else {
      setConnectingFrom({ nodeId, port })
    }
  }, [connectingFrom, edges])

  const deleteNode = (nodeId: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== nodeId))
    setEdges((prev) => prev.filter((e) => e.fromNode !== nodeId && e.toNode !== nodeId))
    setSelectedNode(null)
    window.dispatchEvent(new CustomEvent('toast', {
      detail: { message: 'Node deleted', type: 'warning' }
    }))
  }

  const duplicateNode = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId)
    if (!node) return
    const newNode: WorkflowNode = {
      ...node,
      id: generateId(),
      x: node.x + 30,
      y: node.y + 30,
    }
    setNodes((prev) => [...prev, newNode])
    window.dispatchEvent(new CustomEvent('toast', {
      detail: { message: `Duplicated ${node.label}`, type: 'success' }
    }))
  }

  const deleteEdge = (edgeId: string) => {
    setEdges((prev) => prev.filter((e) => e.id !== edgeId))
  }

  const updateNodeConfig = (nodeId: string, key: string, value: any) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === nodeId ? { ...n, config: { ...n.config, [key]: value } } : n
      )
    )
  }

  const getSelectedNode = () => nodes.find((n) => n.id === selectedNode)

  const getTemplateForNode = (node: WorkflowNode) =>
    NODE_TEMPLATES.find((t) => t.subType === node.subType && t.type === node.type)

  const handleSave = () => {
    if (onSave) onSave(workflowName, nodes, edges)
    setShowSaveDialog(false)
    window.dispatchEvent(new CustomEvent('toast', {
      detail: { message: `Workflow "${workflowName}" saved`, type: 'success' }
    }))
  }

  const handleZoom = (delta: number) => {
    setScale((prev) => Math.max(0.4, Math.min(2, prev + delta)))
  }

  const resetView = () => {
    setOffset({ x: 0, y: 0 })
    setScale(1)
  }

  const selected = getSelectedNode()
  const template = selected ? getTemplateForNode(selected) : null

  // Edge SVG path calculation
  const getEdgePath = (edge: WorkflowEdge) => {
    const from = nodes.find((n) => n.id === edge.fromNode)
    const to = nodes.find((n) => n.id === edge.toNode)
    if (!from || !to) return ''
    const x1 = from.x + NODE_WIDTH
    const y1 = from.y + NODE_HEIGHT / 2
    const x2 = to.x
    const y2 = to.y + NODE_HEIGHT / 2
    const midX = (x1 + x2) / 2
    return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Node Palette */}
      <div className="w-60 bg-yarn-surface border-r border-[rgba(255,255,255,0.06)] flex flex-col shrink-0">
        <div className="p-4 border-b border-[rgba(255,255,255,0.06)]">
          <span className="eyebrow text-yarn-neon block mb-1">NODE PALETTE</span>
          <span className="text-caption text-[rgba(255,255,255,0.35)]">
            {selectedPalette ? `Click canvas to place: ${selectedPalette.label}` : 'Select a node type, then click the canvas'}
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex border-b border-[rgba(255,255,255,0.06)]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActivePaletteTab(cat)}
              className={`flex-1 py-2 text-[10px] uppercase tracking-wider transition-colors ${
                activePaletteTab === cat
                  ? 'text-yarn-neon border-b border-yarn-neon'
                  : 'text-[rgba(255,255,255,0.35)] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Nodes */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {NODE_TEMPLATES.filter((t) => t.category === activePaletteTab).map((template) => {
            const isSelected = selectedPalette?.subType === template.subType
            const Icon = iconMap[template.type] || Cpu
            return (
              <button
                key={template.subType}
                onClick={() => setSelectedPalette(isSelected ? null : template)}
                className={`w-full flex items-center gap-3 p-3 text-left transition-all ${
                  isSelected
                    ? 'bg-[rgba(204,255,0,0.08)] border border-yarn-neon'
                    : 'bg-yarn-base border border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.12)]'
                }`}
              >
                <div
                  className="w-8 h-8 flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${template.color}15` }}
                >
                  <Icon size={14} style={{ color: template.color }} />
                </div>
                <div className="min-w-0">
                  <span className="text-body-small text-white block truncate">{template.label}</span>
                  <span className="text-caption text-[rgba(255,255,255,0.35)] truncate block">{template.description}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Canvas controls hint */}
        <div className="p-3 border-t border-[rgba(255,255,255,0.06)]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <MousePointer size={10} className="text-[rgba(255,255,255,0.2)]" />
              <span className="text-[10px] text-[rgba(255,255,255,0.3)]">Click node → select</span>
            </div>
            <div className="flex items-center gap-2">
              <Move size={10} className="text-[rgba(255,255,255,0.2)]" />
              <span className="text-[10px] text-[rgba(255,255,255,0.3)]">Drag node → move</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight size={10} className="text-[rgba(255,255,255,0.2)]" />
              <span className="text-[10px] text-[rgba(255,255,255,0.3)]">Click output → input → connect</span>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative overflow-hidden bg-yarn-base" ref={canvasRef}>
        {/* Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: `${GRID_SIZE * scale}px ${GRID_SIZE * scale}px`,
            transform: `translate(${offset.x % (GRID_SIZE * scale)}px, ${offset.y % (GRID_SIZE * scale)}px)`,
          }}
        />

        {/* SVG Layer for Edges */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`, transformOrigin: '0 0' }}
        >
          {edges.map((edge) => (
            <g key={edge.id}>
              <path
                d={getEdgePath(edge)}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={2}
                fill="none"
              />
              <path
                d={getEdgePath(edge)}
                stroke="transparent"
                strokeWidth={12}
                fill="none"
                className="pointer-events-auto cursor-pointer"
                onClick={() => deleteEdge(edge.id)}
              />
              <circle
                cx={nodes.find((n) => n.id === edge.toNode)?.x}
                cy={(nodes.find((n) => n.id === edge.toNode)?.y ?? 0) + NODE_HEIGHT / 2}
                r={3}
                fill="#ccff00"
              />
            </g>
          ))}
          {/* Connection line while dragging */}
          {connectingFrom && (() => {
            const from = nodes.find((n) => n.id === connectingFrom.nodeId)
            if (!from) return null
            return (
              <line
                x1={from.x + NODE_WIDTH}
                y1={from.y + NODE_HEIGHT / 2}
                x2={from.x + NODE_WIDTH + 100}
                y2={from.y + NODE_HEIGHT / 2}
                stroke="#ccff00"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            )
          })()}
        </svg>

        {/* Nodes Layer */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: '0 0',
          }}
          onClick={handleCanvasClick}
          onMouseDown={handleCanvasMouseDown}
        >
          {nodes.map((node) => (
            <div
              key={node.id}
              className={`workflow-node absolute cursor-move select-none ${
                selectedNode === node.id ? 'ring-2 ring-yarn-neon z-10' : ''
              } ${connectingFrom?.nodeId === node.id ? 'ring-2 ring-yarn-treasury' : ''}`}
              style={{
                left: node.x,
                top: node.y,
                width: NODE_WIDTH,
              }}
              onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
            >
              {/* Node Body */}
              <div
                className="bg-yarn-surface border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] transition-all"
              >
                <div className="flex items-center gap-2 px-3 py-2">
                  <div
                    className="w-6 h-6 flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${node.color}15` }}
                  >
                    {(() => { const Icon = iconMap[node.type] || Cpu; return <Icon size={12} style={{ color: node.color }} /> })()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-caption text-white truncate block">{node.label}</span>
                    <span className="text-[10px] text-[rgba(255,255,255,0.3)] truncate block">{node.subType}</span>
                  </div>
                </div>
              </div>

              {/* Input Ports */}
              {Array.from({ length: node.inputs }).map((_, i) => (
                <button
                  key={`in-${i}`}
                  className="absolute w-3 h-3 bg-yarn-base border border-[rgba(255,255,255,0.2)] hover:bg-yarn-neon hover:border-yarn-neon transition-colors"
                  style={{
                    left: -6,
                    top: NODE_HEIGHT / 2 - 6 + (i - (node.inputs - 1) / 2) * 16,
                  }}
                  onClick={(e) => handlePortClick(e, node.id, i, false)}
                  title="Input"
                />
              ))}

              {/* Output Ports */}
              {Array.from({ length: node.outputs }).map((_, i) => (
                <button
                  key={`out-${i}`}
                  className={`absolute w-3 h-3 border transition-colors ${
                    connectingFrom?.nodeId === node.id && connectingFrom.port === i
                      ? 'bg-yarn-treasury border-yarn-treasury'
                      : 'bg-yarn-base border-[rgba(255,255,255,0.2)] hover:bg-yarn-neon hover:border-yarn-neon'
                  }`}
                  style={{
                    right: -6,
                    top: NODE_HEIGHT / 2 - 6 + (i - (node.outputs - 1) / 2) * 16,
                  }}
                  onClick={(e) => handlePortClick(e, node.id, i, true)}
                  title="Output"
                />
              ))}

              {/* Delete button on selected */}
              {selectedNode === node.id && (
                <button
                  onClick={(e) => { e.stopPropagation(); deleteNode(node.id) }}
                  className="absolute -top-3 -right-3 w-5 h-5 bg-yarn-red flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                >
                  <X size={10} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Canvas Toolbar */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-yarn-elevated border border-[rgba(255,255,255,0.06)] px-2 py-1.5">
          <button onClick={() => handleZoom(0.1)} className="p-1.5 text-[rgba(255,255,255,0.35)] hover:text-white transition-colors">
            <ZoomIn size={14} />
          </button>
          <span className="text-caption text-[rgba(255,255,255,0.35)] px-2">{Math.round(scale * 100)}%</span>
          <button onClick={() => handleZoom(-0.1)} className="p-1.5 text-[rgba(255,255,255,0.35)] hover:text-white transition-colors">
            <ZoomOut size={14} />
          </button>
          <div className="w-px h-4 bg-[rgba(255,255,255,0.08)] mx-1" />
          <button onClick={resetView} className="p-1.5 text-[rgba(255,255,255,0.35)] hover:text-white transition-colors" title="Reset view">
            <Maximize size={14} />
          </button>
        </div>

        {/* Top Toolbar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="bg-yarn-elevated border border-[rgba(255,255,255,0.08)] px-3 py-1.5 text-body-small text-white focus:outline-none focus:border-yarn-neon"
            />
            <span className="text-caption text-[rgba(255,255,255,0.35)]">{nodes.length} nodes · {edges.length} connections</span>
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            {selectedPalette && (
              <button
                onClick={() => setSelectedPalette(null)}
                className="px-3 py-1.5 bg-[rgba(255,107,53,0.1)] border border-[rgba(255,107,53,0.2)] text-caption text-yarn-governance hover:bg-[rgba(255,107,53,0.2)] transition-colors"
              >
                Cancel Placement
              </button>
            )}
            <button
              onClick={() => {
                setNodes([])
                setEdges([])
                setSelectedNode(null)
                window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Canvas cleared', type: 'warning' } }))
              }}
              className="px-3 py-1.5 border border-[rgba(255,255,255,0.06)] text-caption text-[rgba(255,255,255,0.5)] hover:text-white hover:border-[rgba(255,255,255,0.15)] transition-all flex items-center gap-1.5"
            >
              <Trash2 size={12} />
              Clear
            </button>
            <button
              onClick={() => setShowSaveDialog(true)}
              className="btn-primary flex items-center gap-1.5 py-2 px-4"
            >
              <Save size={12} />
              Save Workflow
            </button>
          </div>
        </div>

        {/* Connecting indicator */}
        {connectingFrom && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-yarn-treasury text-yarn-base text-caption px-3 py-1.5 flex items-center gap-2">
            <ArrowRight size={12} />
            Click an input port to connect
            <button onClick={() => setConnectingFrom(null)} className="ml-2 hover:opacity-70">
              <X size={12} />
            </button>
          </div>
        )}
      </div>

      {/* Properties Panel */}
      {selected && template && (
        <div className="w-64 bg-yarn-surface border-l border-[rgba(255,255,255,0.06)] flex flex-col shrink-0">
          <div className="p-4 border-b border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 flex items-center justify-center" style={{ backgroundColor: `${selected.color}15` }}>
                {(() => { const Icon = iconMap[selected.type] || Cpu; return <Icon size={12} style={{ color: selected.color }} /> })()}
              </div>
              <span className="text-body-small text-white">{selected.label}</span>
            </div>
            <span className="text-caption text-[rgba(255,255,255,0.35)]">{selected.description}</span>
          </div>

          {/* Config Fields */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {template.configFields.length === 0 ? (
              <span className="text-caption text-[rgba(255,255,255,0.35)]">No configurable options.</span>
            ) : (
              template.configFields.map((field) => (
                <div key={field.key}>
                  <label className="text-caption text-[rgba(255,255,255,0.5)] block mb-1.5">
                    {field.label}
                    {field.unit && <span className="text-[rgba(255,255,255,0.25)] ml-1">({field.unit})</span>}
                  </label>
                  {field.type === 'range' && (
                    <div>
                      <input
                        type="range"
                        min={field.min}
                        max={field.max}
                        step={field.step || 1}
                        value={selected.config[field.key] ?? field.defaultValue}
                        onChange={(e) => updateNodeConfig(selected.id, field.key, Number(e.target.value))}
                        className="w-full range-slider"
                        style={{ accentColor: selected.color }}
                      />
                      <div className="flex justify-between mt-0.5">
                        <span className="text-[10px] text-[rgba(255,255,255,0.25)]">{field.min}</span>
                        <span className="text-caption text-yarn-neon">{selected.config[field.key] ?? field.defaultValue}{field.unit}</span>
                        <span className="text-[10px] text-[rgba(255,255,255,0.25)]">{field.max}</span>
                      </div>
                    </div>
                  )}
                  {field.type === 'select' && (
                    <select
                      value={selected.config[field.key] ?? field.defaultValue}
                      onChange={(e) => updateNodeConfig(selected.id, field.key, e.target.value)}
                      className="w-full bg-yarn-base border border-[rgba(255,255,255,0.06)] px-2 py-1.5 text-caption text-white focus:outline-none focus:border-yarn-neon"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                  {field.type === 'number' && (
                    <input
                      type="number"
                      value={selected.config[field.key] ?? field.defaultValue}
                      onChange={(e) => updateNodeConfig(selected.id, field.key, Number(e.target.value))}
                      className="w-full bg-yarn-base border border-[rgba(255,255,255,0.06)] px-2 py-1.5 text-caption text-white focus:outline-none focus:border-yarn-neon"
                    />
                  )}
                  {field.type === 'text' && (
                    <input
                      type="text"
                      value={selected.config[field.key] ?? field.defaultValue}
                      onChange={(e) => updateNodeConfig(selected.id, field.key, e.target.value)}
                      className="w-full bg-yarn-base border border-[rgba(255,255,255,0.06)] px-2 py-1.5 text-caption text-white focus:outline-none focus:border-yarn-neon"
                    />
                  )}
                  {field.type === 'toggle' && (
                    <button
                      onClick={() => updateNodeConfig(selected.id, field.key, !(selected.config[field.key] ?? field.defaultValue))}
                      className={`w-10 h-5 transition-colors ${
                        (selected.config[field.key] ?? field.defaultValue)
                          ? 'bg-yarn-neon'
                          : 'bg-[rgba(255,255,255,0.1)]'
                      }`}
                    >
                      <span
                        className={`block w-3 h-3 bg-white transition-transform ${
                          (selected.config[field.key] ?? field.defaultValue) ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Node Actions */}
          <div className="p-4 border-t border-[rgba(255,255,255,0.06)] space-y-2">
            <button
              onClick={() => duplicateNode(selected.id)}
              className="w-full flex items-center justify-center gap-2 py-2 border border-[rgba(255,255,255,0.06)] text-caption text-[rgba(255,255,255,0.5)] hover:text-white hover:border-[rgba(255,255,255,0.15)] transition-all"
            >
              <Copy size={12} />
              Duplicate Node
            </button>
            <button
              onClick={() => deleteNode(selected.id)}
              className="w-full flex items-center justify-center gap-2 py-2 bg-[rgba(255,0,0,0.05)] border border-[rgba(255,0,0,0.15)] text-caption text-yarn-red hover:bg-[rgba(255,0,0,0.1)] transition-all"
            >
              <Trash2 size={12} />
              Delete Node
            </button>
          </div>
        </div>
      )}

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center" onClick={() => setShowSaveDialog(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative bg-yarn-elevated border border-[rgba(255,255,255,0.08)] p-6 w-full max-w-[420px]" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-heading-s text-white mb-4">Save Workflow</h3>
            <div className="space-y-3 mb-6">
              <div>
                <label className="text-caption text-[rgba(255,255,255,0.5)] block mb-1">Workflow Name</label>
                <input
                  type="text"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  className="w-full bg-yarn-base border border-[rgba(255,255,255,0.06)] px-3 py-2 text-body-small text-white focus:outline-none focus:border-yarn-neon"
                />
              </div>
              <div className="flex items-center gap-4 text-caption text-[rgba(255,255,255,0.35)]">
                <span>{nodes.length} nodes</span>
                <span>{edges.length} connections</span>
                <span>{categories.filter((c) => nodes.some((n) => NODE_TEMPLATES.find((t) => t.subType === n.subType)?.category === c)).length} categories</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="flex-1 py-2.5 border border-[rgba(255,255,255,0.08)] text-caption text-[rgba(255,255,255,0.5)] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 btn-primary py-2.5"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
