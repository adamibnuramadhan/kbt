import React from 'react'
import Card from '../ui/Card'

export default function FleetMap({ vehicles = [] }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="text-xs text-[var(--muted)] uppercase">LIVE FLEET TRACKING</div>
        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
          <span className="h-2 w-2 rounded-full bg-[var(--success)] animate-pulse" />
          Real-time GPS telemetry active
        </div>
      </div>

      <div className="mt-3 h-64 bg-[#060d14] p-3">
        <svg viewBox="0 0 800 400" className="h-full w-full">
          <rect width="800" height="400" fill="#060d14" />
          {/* grid */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={i * 40} y1={0} x2={i * 40} y2={400} stroke="#0a2540" strokeOpacity="0.4" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 40} x2={800} y2={i * 40} stroke="#0a2540" strokeOpacity="0.4" />
          ))}

          {/* markers */}
          {vehicles.slice(0, 6).map((v, idx) => (
            <g key={v.id} transform={`translate(${80 + idx * 100}, ${80 + (idx % 3) * 80})`}>
              <circle r="10" fill={v.fuelLevel > 80 ? '#1abc9c' : v.fuelLevel > 30 ? '#f39c12' : '#e74c3c'} />
              <text x="16" y="6" fill="#b0b0b0" fontSize="10">{v.id}</text>
            </g>
          ))}
        </svg>
      </div>
    </Card>
  )
}
