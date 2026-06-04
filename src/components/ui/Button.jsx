import React from 'react'

function Spinner({ className = 'h-4 w-4' }) {
  return (
    <svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth="3" strokeOpacity="0.15" />
      <path d="M22 12a10 10 0 00-10-10" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export default function Button({ variant = 'primary', size = 'md', loading = false, disabled = false, children, className = '', ...rest }) {
  const base = 'inline-flex items-center justify-center rounded-[var(--radius-button)] font-medium transition-all duration-150'
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-sm',
  }
  const variants = {
    primary: 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] shadow-[var(--shadow-button)]',
    secondary: 'bg-[var(--bg-elevated)] text-[var(--text)] hover:bg-[var(--border-strong)]',
    ghost: 'bg-transparent border border-[var(--border-strong)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text)]',
    danger: 'bg-[var(--error)] text-white hover:opacity-90 shadow-[var(--shadow-button)]'
  }

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant] || variants.primary} ${disabled || loading ? 'opacity-50 pointer-events-none' : ''} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Spinner className="mr-2 h-4 w-4" />}
      <span>{children}</span>
    </button>
  )
}
