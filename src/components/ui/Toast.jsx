import { createContext, useCallback, useContext, useState } from 'react'

const ToastContext = createContext(null)

let idCounter = 1

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ message, variant = 'info', duration = 4000 }) => {
    const id = `toast-${idCounter++}`
    setToasts((t) => [...t, { id, message, variant }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), duration)
    return id
  }, [])

  const removeToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <div key={toast.id} className="flex items-start gap-3 rounded-[var(--radius-card)] bg-[var(--bg-card)] p-3.5 shadow-[var(--shadow-float)]" style={{ border: '1px solid var(--border-strong)' }}>
            <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${toast.variant === 'success' ? 'bg-[var(--success)]' : toast.variant === 'error' ? 'bg-[var(--error)]' : toast.variant === 'warning' ? 'bg-[var(--warning)]' : 'bg-[var(--info)]'}`} />
            <div className="flex-1 text-[13px] text-[var(--text)]">{toast.message}</div>
            <button onClick={() => removeToast(toast.id)} className="text-[var(--muted)] hover:text-[var(--text-secondary)] transition-colors text-xs">✕</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export default ToastProvider
