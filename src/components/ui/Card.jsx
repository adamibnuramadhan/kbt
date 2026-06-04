
export default function Card({ children, hover = false, className = '', noPadding = false, ...rest }) {
  return (
    <div
      className={`bg-[var(--bg-card)] rounded-[var(--radius-card)] ${noPadding ? '' : 'p-6'} ${hover ? 'transition-shadow duration-200 hover:shadow-[var(--shadow-card-hover)]' : ''} ${className}`}
      style={{ boxShadow: 'var(--shadow-card)' }}
      {...rest}
    >
      {children}
    </div>
  )
}
