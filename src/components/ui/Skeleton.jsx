
export default function Skeleton({ width = '100%', height = 16, className = '', rounded = false }) {
  const style = { width, height: typeof height === 'number' ? `${height}px` : height }
  return (
    <div
      className={`animate-pulse bg-[var(--bg-elevated)] ${rounded ? 'rounded-full' : 'rounded-[var(--radius-card)]'} ${className}`}
      style={style}
    />
  )
}
