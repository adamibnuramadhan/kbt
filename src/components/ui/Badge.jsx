import React from 'react'

const VARIANTS = {
  success: 'bg-[var(--success)]/15 text-[var(--success)] border border-[var(--success)]/30',
  warning: 'bg-[var(--warning)]/15 text-[var(--warning)] border border-[var(--warning)]/30',
  error: 'bg-[var(--error)]/15 text-[var(--error)] border border-[var(--error)]/30',
  info: 'bg-[var(--info)]/15 text-[var(--info)] border border-[var(--info)]/30',
  neutral: 'bg-[var(--border)]/10 text-[var(--text-secondary)] border border-[var(--border)]'
}

export default function Badge({ variant = 'neutral', size = 'md', children, className = '' }) {
  const sizes = { sm: 'px-2 py-0.5 text-[10px]', md: 'px-3 py-1 text-[11px]' }
  return (
    <span className={`inline-flex items-center justify-center rounded-full font-medium uppercase tracking-wider ${sizes[size]} ${VARIANTS[variant]} ${className}`}>
      {children}
    </span>
  )
}
 
