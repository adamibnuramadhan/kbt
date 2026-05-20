import React from 'react'

function Spinner({ className = 'h-4 w-4' }) {
  return (
    <svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth="3" strokeOpacity="0.2" />
      <path d="M22 12a10 10 0 00-10-10" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export default function Button({ variant = 'primary', size = 'md', loading = false, disabled = false, children, className = '', ...rest }) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-transform duration-200'
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  const variants = {
    primary: 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]',
    secondary: 'bg-[var(--bg-hover)] text-white hover:bg-[var(--border)]',
    ghost: 'bg-transparent border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]',
    danger: 'bg-[var(--error)] text-white hover:bg-[#c0392b]'
  }

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant] || variants.primary} ${disabled || loading ? 'opacity-60 pointer-events-none' : 'hover:-translate-y-0.5'} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Spinner className="mr-2 h-4 w-4" />}
      <span>{children}</span>
    </button>
  )
}
 
