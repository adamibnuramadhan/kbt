import React from 'react'

export default function Skeleton({ width = '100%', height = 16, className = '', rounded = false }) {
  const style = { width, height: typeof height === 'number' ? `${height}px` : height }
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-hover)] to-[var(--bg-card)] ${rounded ? 'rounded-full' : 'rounded'} ${className}`}
      style={style}
    />
  )
}
 
