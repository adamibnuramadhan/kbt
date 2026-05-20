import React from 'react'
import Card from '../ui/Card'

export default function FleetMapStatic() {
  return (
    <Card noPadding>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-[var(--text-secondary)]">Fleet Status Map</div>
          <div className="text-xs text-[var(--muted)]">Legend</div>
        </div>
      </div>
      <div className="h-64 bg-[#0d1a26]">
        <svg viewBox="0 0 800 400" className="h-full w-full">
          <rect x="0" y="0" width="800" height="400" fill="#0d1a26" />
          <g stroke="#1e3a5f" strokeWidth="6">
            <path d="M40 60 L760 60" strokeOpacity="0.6" />
            <path d="M40 180 L760 180" strokeOpacity="0.6" />
            <path d="M40 300 L760 300" strokeOpacity="0.6" />
          </g>
          {/* markers */}
          <circle cx="280" cy="180" r="10" fill="#1abc9c">
            <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="480" cy="220" r="10" fill="#f39c12">
            <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
          </circle>
          <polygon points="580,300 590,320 570,320" fill="#e74c3c">
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
          </polygon>
        </svg>
      </div>
    </Card>
  )
}
