import React from 'react'
import Card from '../ui/Card'

export default function KPICard({ title, value, unit, change, changePositive = true, icon }) {
  return (
    <Card hover>
      <div className="text-[11px] font-medium uppercase tracking-wider text-[var(--muted)]">{title}</div>
      <div className="mt-4 flex items-baseline gap-1.5">
        <div className="font-display text-2xl text-[var(--text)] font-mono">{value}</div>
        {unit && <div className="text-xs text-[var(--muted)]">{unit}</div>}
      </div>
      {change && (
        <div className="mt-3 text-xs" style={{ color: changePositive ? 'var(--success)' : 'var(--error)' }}>
          {change}
        </div>
      )}
    </Card>
  )
}
