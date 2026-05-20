import React from 'react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { topVehicles } from '../../data/mockData'

export default function TopVehicles() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase text-[var(--muted)]">TOP EFFICIENT VEHICLES (KM/L)</div>
        <Badge variant="info" size="sm">THIS WEEK</Badge>
      </div>

      <div className="mt-4 space-y-4">
        {topVehicles.map((v) => (
          <div key={v.name}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-[var(--text)]">{v.name}</div>
                <div className="text-xs text-[var(--text-secondary)]">{v.model}</div>
              </div>
              <div className="font-mono text-sm text-[var(--primary)]">{v.efficiency} km/l</div>
            </div>
            <div className="mt-2 h-2 w-full rounded bg-[var(--border)]">
              <div style={{ width: `${(v.efficiency / v.maxEfficiency) * 100}%` }} className="h-2 rounded bg-[var(--primary)]"></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
