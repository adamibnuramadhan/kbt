import React from 'react'
import Card from '../ui/Card'

export default function KPICard({ title, value, unit, change, changePositive = true, icon }) {
  return (
    <Card className="relative flex flex-col justify-between" hover>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-semibold uppercase text-[var(--muted)]">{title}</div>
          <div className="mt-3 flex items-baseline gap-2">
            <div className="font-display text-3xl font-bold text-[var(--primary)] font-mono">{value}</div>
            {unit && <div className="text-sm text-[var(--text-secondary)]">{unit}</div>}
          </div>
        </div>
        <div className="text-[24px] text-[var(--primary-light)] opacity-80">{icon}</div>
      </div>

      {change && (
        <div className="mt-4 text-sm" style={{ color: changePositive ? 'var(--primary)' : 'var(--error)' }}>
          {change}
        </div>
      )}
    </Card>
  )
}
