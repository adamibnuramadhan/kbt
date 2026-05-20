import React from 'react'
import Card from '../ui/Card'
import { systemHealth } from '../../data/mockData'

export default function SystemHealth() {
  return (
    <Card>
      <div className="text-xs font-semibold uppercase text-[var(--muted)]">SYSTEM HEALTH</div>
      <div className="mt-3 space-y-3">
        <div>
          <div className="text-sm font-medium">GPS Connectivity</div>
          <div className="text-xs text-[var(--muted)]">{systemHealth.gpsConnectivity.value} — {systemHealth.gpsConnectivity.desc}</div>
        </div>
        <div>
          <div className="text-sm font-medium">Sensor Integrity</div>
          <div className="text-xs text-[var(--muted)]">{systemHealth.sensorIntegrity.value} — {systemHealth.sensorIntegrity.desc}</div>
        </div>
        <div>
          <div className="text-sm font-medium">Sync Latency</div>
          <div className="text-xs text-[var(--muted)]">{systemHealth.syncLatency.value} — {systemHealth.syncLatency.desc}</div>
        </div>
      </div>

      <div className="mt-4">
        <button className="w-full rounded bg-[var(--primary)] px-3 py-2 text-sm text-white">Run Full Diagnostics</button>
      </div>
    </Card>
  )
}
