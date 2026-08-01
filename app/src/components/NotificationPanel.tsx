import { useState } from 'react'
import { Bell, X, AlertTriangle, Info, CheckCircle } from 'lucide-react'

interface Notification {
  id: string
  type: 'alert' | 'info' | 'success' | 'warning'
  title: string
  message: string
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  { id: '1', type: 'alert', title: 'Risk Alert', message: 'NVDA allocation approaching 15% concentration limit', time: '2 min ago', read: false },
  { id: '2', type: 'warning', title: 'Engine Update', message: 'PER Engine completed calibration cycle', time: '15 min ago', read: false },
  { id: '3', type: 'success', title: 'Harvest Executed', message: 'Profit harvested on NVDA: +$21,300 (30%)', time: '32 min ago', read: false },
  { id: '4', type: 'info', title: 'Regime Detection', message: 'Bull regime confirmed with 87% probability', time: '1 hr ago', read: true },
  { id: '5', type: 'alert', title: 'Correlation Spike', message: 'AVAX-BTC correlation exceeded 0.75 threshold', time: '2 hr ago', read: true },
  { id: '6', type: 'success', title: 'Rebalance Complete', message: 'Portfolio rebalanced: SOL reduced by 2.1%', time: '3 hr ago', read: true },
]

interface NotificationPanelProps {
  onClose: () => void
}

export default function NotificationPanel({ onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const filtered = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications

  const iconMap = {
    alert: <AlertTriangle size={14} className="text-yarn-red shrink-0" />,
    warning: <AlertTriangle size={14} className="text-yarn-governance shrink-0" />,
    success: <CheckCircle size={14} className="text-yarn-green shrink-0" />,
    info: <Info size={14} className="text-yarn-treasury shrink-0" />,
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-[380px] bg-yarn-elevated border border-[rgba(255,255,255,0.08)] shadow-2xl z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-2">
          <Bell size={14} className="text-yarn-neon" />
          <span className="text-body-small text-white">Notifications</span>
          {unreadCount > 0 && (
            <span className="text-caption text-yarn-neon bg-[rgba(204,255,0,0.1)] px-1.5 py-0.5">{unreadCount}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={markAllRead} className="text-caption text-[rgba(255,255,255,0.4)] hover:text-white transition-colors">
            Mark all read
          </button>
          <button onClick={onClose} className="text-[rgba(255,255,255,0.3)] hover:text-white transition-colors">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-[rgba(255,255,255,0.06)]">
        {(['all', 'unread'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 text-caption uppercase tracking-wider transition-colors ${
              filter === f ? 'text-yarn-neon border-b border-yarn-neon' : 'text-[rgba(255,255,255,0.35)] hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="max-h-[360px] overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <span className="text-caption text-[rgba(255,255,255,0.35)]">No notifications.</span>
          </div>
        ) : (
          filtered.map((n) => (
            <button
              key={n.id}
              onClick={() => markRead(n.id)}
              className={`w-full flex items-start gap-3 px-4 py-3 transition-colors text-left ${
                n.read ? 'hover:bg-yarn-surface' : 'bg-[rgba(204,255,0,0.03)] hover:bg-[rgba(204,255,0,0.06)]'
              }`}
            >
              {iconMap[n.type]}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-body-small text-white">{n.title}</span>
                  {!n.read && <span className="w-1.5 h-1.5 bg-yarn-neon rounded-full shrink-0" />}
                </div>
                <span className="text-caption text-[rgba(255,255,255,0.5)] block mt-0.5">{n.message}</span>
                <span className="text-caption text-[rgba(255,255,255,0.25)] mt-1 block">{n.time}</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
