import { useState, useEffect } from 'react'
import { CheckCircle, AlertTriangle, AlertCircle, X, XCircle } from 'lucide-react'

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'warning' | 'error' | 'info'
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      const toast: ToastMessage = {
        id: Math.random().toString(36).substring(2, 9),
        message: detail.message,
        type: detail.type || 'info',
      }
      setToasts((prev) => [...prev, toast])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id))
      }, 4000)
    }
    window.addEventListener('toast' as any, handler)
    return () => window.removeEventListener('toast' as any, handler)
  }, [])

  const remove = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id))

  const iconMap = {
    success: <CheckCircle size={16} className="text-yarn-green shrink-0" />,
    warning: <AlertTriangle size={16} className="text-yarn-governance shrink-0" />,
    error: <XCircle size={16} className="text-yarn-red shrink-0" />,
    info: <AlertCircle size={16} className="text-yarn-treasury shrink-0" />,
  }

  const borderMap = {
    success: 'border-l-2 border-l-yarn-green',
    warning: 'border-l-2 border-l-yarn-governance',
    error: 'border-l-2 border-l-yarn-red',
    info: 'border-l-2 border-l-yarn-treasury',
  }

  return (
    <div className="fixed top-16 right-4 z-[90] flex flex-col gap-2 max-w-[400px]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`bg-yarn-elevated border border-[rgba(255,255,255,0.08)] ${borderMap[toast.type]} px-4 py-3 flex items-start gap-3 shadow-lg animate-in slide-in-from-right`}
        >
          {iconMap[toast.type]}
          <span className="text-body-small text-white flex-1">{toast.message}</span>
          <button onClick={() => remove(toast.id)} className="text-[rgba(255,255,255,0.3)] hover:text-white transition-colors shrink-0">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
