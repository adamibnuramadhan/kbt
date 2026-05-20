import React, { createContext, useCallback, useContext, useState, useEffect } from 'react'

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
          <div key={toast.id} className={`flex items-start gap-3 rounded-md border border-[var(--border)] bg-[var(--bg-card)] p-3 shadow`}>
            <div className={`mt-0.5 h-3 w-3 rounded-full ${toast.variant === 'success' ? 'bg-[var(--success)]' : toast.variant === 'error' ? 'bg-[var(--error)]' : toast.variant === 'warning' ? 'bg-[var(--warning)]' : 'bg-[var(--info)]'}`} />
            <div className="flex-1 text-sm text-[var(--text)]">{toast.message}</div>
            <button onClick={() => removeToast(toast.id)} className="text-[var(--muted)]">✕</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export default ToastProvider
