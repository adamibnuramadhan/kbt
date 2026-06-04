
const VARIANTS = {
  success: 'bg-[var(--success)]/10 text-[var(--success)]',
  warning: 'bg-[var(--warning)]/10 text-[var(--warning)]',
  error: 'bg-[var(--error)]/10 text-[var(--error)]',
  info: 'bg-[var(--info)]/10 text-[var(--info)]',
  neutral: 'bg-[var(--bg-elevated)] text-[var(--text-secondary)]'
}

export default function Badge({ variant = 'neutral', size = 'md', children, className = '' }) {
  const sizes = { sm: 'px-2 py-0.5 text-[10px]', md: 'px-2.5 py-1 text-[11px]' }
  return (
    <span className={`inline-flex items-center justify-center rounded-[var(--radius-badge)] font-medium tracking-wide ${sizes[size]} ${VARIANTS[variant]} ${className}`}>
      {children}
    </span>
  )
}
