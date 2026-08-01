import { useState } from 'react'
import { GitBranch, Plus, Play, Pause, Copy, Trash2, BarChart3, Edit3, CheckCircle, X } from 'lucide-react'
import WorkflowBuilder from '../components/WorkflowBuilder'
import type { SavedWorkflow, WorkflowNode, WorkflowEdge } from '../types/workflow'

const initialWorkflows: SavedWorkflow[] = [
  {
    id: 'wf-1', name: 'Momentum Catch', description: 'Conviction detects momentum → Risk approves → Allocation sizes → Execute → Harvest',
    status: 'active', createdAt: '2025-07-01', updatedAt: '2025-07-14',
    nodes: [], edges: [],
  },
  {
    id: 'wf-2', name: 'BTC Dip Sniper', description: 'Buy BTC when RSI < 30 with position sizing and stop-loss',
    status: 'paused', createdAt: '2025-07-05', updatedAt: '2025-07-10',
    nodes: [], edges: [],
  },
  {
    id: 'wf-3', name: 'Risk-Off Hedger', description: 'When correlation spikes, reduce exposure and add protective puts',
    status: 'draft', createdAt: '2025-07-12', updatedAt: '2025-07-12',
    nodes: [], edges: [],
  },
]

export default function Workflows() {
  const [workflows, setWorkflows] = useState<SavedWorkflow[]>(initialWorkflows)
  const [mode, setMode] = useState<'list' | 'builder'>('list')
  const [editingWorkflow, setEditingWorkflow] = useState<SavedWorkflow | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const handleSaveWorkflow = (name: string, nodes: WorkflowNode[], edges: WorkflowEdge[]) => {
    if (editingWorkflow) {
      setWorkflows((prev) =>
        prev.map((w) =>
          w.id === editingWorkflow.id
            ? { ...w, name, nodes, edges, updatedAt: new Date().toISOString().split('T')[0] }
            : w
        )
      )
    } else {
      const newWorkflow: SavedWorkflow = {
        id: `wf-${Date.now()}`,
        name,
        description: 'Custom workflow',
        nodes,
        edges,
        status: 'draft',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      }
      setWorkflows((prev) => [...prev, newWorkflow])
    }
    setMode('list')
    setEditingWorkflow(null)
  }

  const handleNew = () => {
    setEditingWorkflow(null)
    setMode('builder')
  }

  const handleEdit = (wf: SavedWorkflow) => {
    setEditingWorkflow(wf)
    setMode('builder')
  }

  const handleDelete = (id: string) => {
    setWorkflows((prev) => prev.filter((w) => w.id !== id))
    setDeleteConfirm(null)
    window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Workflow deleted', type: 'warning' } }))
  }

  const toggleStatus = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w
        const next = w.status === 'active' ? 'paused' : w.status === 'paused' ? 'active' : 'active'
        return { ...w, status: next as any }
      })
    )
    const wf = workflows.find((w) => w.id === id)
    const newStatus = wf?.status === 'active' ? 'paused' : 'active'
    window.dispatchEvent(new CustomEvent('toast', { detail: { message: `Workflow ${newStatus}`, type: newStatus === 'active' ? 'success' : 'warning' } }))
  }

  const duplicate = (wf: SavedWorkflow) => {
    const newWf: SavedWorkflow = {
      ...wf,
      id: `wf-${Date.now()}`,
      name: `${wf.name} (Copy)`,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    }
    setWorkflows((prev) => [...prev, newWf])
    window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Workflow duplicated', type: 'success' } }))
  }

  if (mode === 'builder') {
    return (
      <div className="h-[calc(100vh-3.5rem)]">
        <WorkflowBuilder
          initialNodes={editingWorkflow?.nodes || []}
          initialEdges={editingWorkflow?.edges || []}
          onSave={handleSaveWorkflow}
        />
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="eyebrow text-yarn-neon">WORKFLOW BUILDER</span>
            <span className="text-caption text-[rgba(255,255,255,0.25)] px-1.5 py-0.5 bg-yarn-surface uppercase tracking-wider">Live</span>
          </div>
          <h1 className="font-display text-4xl text-white mb-2">Strategy Workflows</h1>
          <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[600px]">
            Create custom investment strategies by connecting engines, conditions, and actions on a visual canvas. No coding required.
          </p>
        </div>
        <button onClick={handleNew} className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          New Workflow
        </button>
      </div>

      {/* How It Works */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-8">
        {[
          { step: '1', title: 'Add Nodes', desc: 'Select engine, condition, action, or data nodes from the palette and click the canvas to place them.', icon: GitBranch, color: '#ccff00' },
          { step: '2', title: 'Connect', desc: 'Click an output port on one node, then click an input port on another. The flow determines execution order.', icon: BarChart3, color: '#00d4ff' },
          { step: '3', title: 'Configure & Run', desc: 'Select any node to edit its settings. Save your workflow and activate it to start live execution.', icon: CheckCircle, color: '#22c55e' },
        ].map((s) => (
          <div key={s.step} className="bg-yarn-surface p-5 flex items-start gap-4">
            <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{ backgroundColor: `${s.color}15` }}>
              <s.icon size={16} style={{ color: s.color }} />
            </div>
            <div>
              <span className="text-caption text-[rgba(255,255,255,0.35)] block mb-1">STEP {s.step}</span>
              <span className="text-body-small text-white block mb-1">{s.title}</span>
              <span className="text-caption text-[rgba(255,255,255,0.5)]">{s.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Workflows List */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-heading-s text-white">My Workflows</span>
        <span className="text-caption text-[rgba(255,255,255,0.35)]">{workflows.length} workflows</span>
      </div>

      {workflows.length === 0 ? (
        <div className="text-center py-20 bg-yarn-surface">
          <GitBranch size={40} className="text-[rgba(255,255,255,0.1)] mx-auto mb-4" />
          <p className="text-body text-[rgba(255,255,255,0.5)] mb-2">No workflows yet.</p>
          <button onClick={handleNew} className="btn-primary mt-4">Create Your First Workflow</button>
        </div>
      ) : (
        <div className="space-y-1">
          {workflows.map((wf) => (
            <div key={wf.id} className="bg-yarn-surface p-5 hover:bg-yarn-elevated transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center ${
                    wf.status === 'active' ? 'bg-[rgba(34,197,94,0.1)]' :
                    wf.status === 'paused' ? 'bg-[rgba(255,107,53,0.1)]' :
                    'bg-[rgba(255,255,255,0.06)]'
                  }`}>
                    <GitBranch size={18} className={
                      wf.status === 'active' ? 'text-yarn-green' :
                      wf.status === 'paused' ? 'text-yarn-governance' :
                      'text-[rgba(255,255,255,0.35)]'
                    } />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-heading-s text-white">{wf.name}</span>
                      <span className={`text-caption uppercase px-1.5 py-0.5 ${
                        wf.status === 'active' ? 'bg-[rgba(34,197,94,0.1)] text-yarn-green' :
                        wf.status === 'paused' ? 'bg-[rgba(255,107,53,0.1)] text-yarn-governance' :
                        'bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.35)]'
                      }`}>
                        {wf.status}
                      </span>
                    </div>
                    <span className="text-caption text-[rgba(255,255,255,0.5)] block mt-0.5">{wf.description}</span>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-caption text-[rgba(255,255,255,0.35)]">{wf.nodes.length} nodes</span>
                      <span className="text-caption text-[rgba(255,255,255,0.35)]">{wf.edges.length} connections</span>
                      <span className="text-caption text-[rgba(255,255,255,0.25)]">Updated {wf.updatedAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {wf.status !== 'draft' && (
                    <button
                      onClick={() => toggleStatus(wf.id)}
                      className={`p-2 transition-colors ${
                        wf.status === 'active'
                          ? 'text-yarn-governance hover:text-white'
                          : 'text-yarn-green hover:text-white'
                      }`}
                      title={wf.status === 'active' ? 'Pause' : 'Start'}
                    >
                      {wf.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(wf)}
                    className="p-2 text-[rgba(255,255,255,0.35)] hover:text-white transition-colors"
                    title="Edit"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => duplicate(wf)}
                    className="p-2 text-[rgba(255,255,255,0.35)] hover:text-white transition-colors"
                    title="Duplicate"
                  >
                    <Copy size={16} />
                  </button>
                  {deleteConfirm === wf.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(wf.id)}
                        className="p-1.5 bg-yarn-red text-white"
                      >
                        <CheckCircle size={12} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="p-1.5 bg-yarn-surface text-[rgba(255,255,255,0.5)]"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(wf.id)}
                      className="p-2 text-[rgba(255,255,255,0.35)] hover:text-yarn-red transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
