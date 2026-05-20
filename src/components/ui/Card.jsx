import React from 'react'

export default function Card({ children, hover = false, className = '', noPadding = false, ...rest }) {
  return (
    <div
      className={`bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] ${noPadding ? '' : 'p-6'} ${hover ? 'hover:border-[var(--primary-light)] transition-colors' : ''} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
 
