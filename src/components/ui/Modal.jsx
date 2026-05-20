import { useEffect } from 'react'

const SIZE_CLASSES = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-5xl',
}

function Modal({ isOpen, onClose, title, subtitle, size = 'md', children }) {
  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-8 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className={`w-full ${SIZE_CLASSES[size] || SIZE_CLASSES.md} rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg-card)] shadow-2xl`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-6 py-4">
          <div>
            <h3 className="font-display text-xl text-[var(--text)]">{title}</h3>
            {subtitle && <p className="mt-1 text-sm text-[var(--muted)]">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="rounded-md bg-[var(--bg-hover)] px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-white">
            Close
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  )
}

export default Modal
