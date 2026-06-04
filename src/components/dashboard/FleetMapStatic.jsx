import React from 'react'
import Card from '../ui/Card'

export default function FleetMapStatic() {
  return (
    <Card noPadding>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[var(--muted)]">Fleet Status Map</div>
          <div className="flex items-center gap-4 text-[10px] text-[var(--muted)]">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--primary)]" />Active</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--warning)]" />Idle</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--error)]" />Alert</span>
          </div>
        </div>
      </div>
      <div className="h-64 bg-[var(--bg-primary)]" style={{ borderTop: '1px solid var(--border)' }}>
        <svg viewBox="0 0 800 400" className="h-full w-full">
          <rect x="0" y="0" width="800" height="400" fill="transparent" />
          {/* Grid lines */}
          <g stroke="var(--border)" strokeWidth="1">
            <line x1="0" y1="100" x2="800" y2="100" />
            <line x1="0" y1="200" x2="800" y2="200" />
            <line x1="0" y1="300" x2="800" y2="300" />
            <line x1="200" y1="0" x2="200" y2="400" />
            <line x1="400" y1="0" x2="400" y2="400" />
            <line x1="600" y1="0" x2="600" y2="400" />
          </g>
          {/* Vehicle markers */}
          <circle cx="280" cy="180" r="6" fill="var(--primary)" opacity="0.8">
            <animate attributeName="r" values="6;9;6" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.4;0.8" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="480" cy="220" r="6" fill="var(--warning)" opacity="0.8">
            <animate attributeName="r" values="6;9;6" dur="3s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.4;0.8" dur="3s" begin="0.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="580" cy="310" r="6" fill="var(--error)" opacity="0.8">
            <animate attributeName="r" values="6;9;6" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="150" cy="120" r="5" fill="var(--primary)" opacity="0.6" />
          <circle cx="650" cy="150" r="5" fill="var(--primary)" opacity="0.6" />
        </svg>
      </div>
    </Card>
  )
}
