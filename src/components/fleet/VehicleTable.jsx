import React, { useState } from 'react'
import Badge from '../ui/Badge'
import EmptyState from '../ui/EmptyState'

function FuelGauge({ percent = 0 }) {
  const stroke = percent >= 50 ? 'var(--primary)' : percent >= 20 ? 'var(--warning)' : 'var(--error)'
  const r = 14
  const c = 2 * Math.PI * r
  const dash = (percent / 100) * c
  return (
    <svg width="48" height="48" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r={r} stroke="#404040" strokeWidth="4" fill="transparent" />
      <circle cx="24" cy="24" r={r} stroke={stroke} strokeWidth="4" fill="transparent" strokeDasharray={`${dash} ${c - dash}`} strokeLinecap="round" transform="rotate(-90 24 24)" />
      <text x="24" y="28" fontSize="10" fontFamily="JetBrains Mono" fill="var(--text-secondary)" textAnchor="middle">{percent}%</text>
    </svg>
  )
}

export default function VehicleTable({ vehicles = [], onRowClick = () => {} }) {
  const [search, setSearch] = useState('')

  const displayed = vehicles.filter((v) => `${v.id} ${v.driver} ${v.location}`.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg">Vehicle Roster</h2>
        <div className="flex items-center gap-2">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search vehicles..." className="rounded-md border border-[var(--border)] bg-[var(--bg-card)] px-3 py-2 text-sm text-[var(--text-secondary)]" />
          <button className="rounded-md bg-[var(--bg-hover)] px-3 py-2 text-sm text-[var(--text-secondary)]">Export Data</button>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-[var(--border)]">
        {displayed.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title="No vehicles found"
              description="Try a different search term or clear the current filter to see the full fleet roster."
              actionLabel="Reset Search"
              onAction={() => setSearch('')}
            />
          </div>
        ) : (
          <table className="w-full table-fixed border-collapse bg-[var(--bg-primary)]">
            <thead className="bg-[var(--bg-primary)]">
              <tr className="text-left text-xs text-[var(--muted)]">
                <th className="px-4 py-3">Vehicle ID</th>
                <th className="px-4 py-3">Driver</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Fuel Level</th>
                <th className="px-4 py-3">Efficiency</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {displayed.slice(0, 20).map((v) => (
                <tr key={v.id} onClick={() => onRowClick(v)} className="cursor-pointer hover:bg-[var(--bg-hover)]">
                  <td className="px-4 py-3">{v.id}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{v.driver}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{v.location}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <FuelGauge percent={v.fuelLevel} />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-[var(--text-secondary)]">{v.efficiency} km/L</td>
                  <td className="px-4 py-3">
                    <Badge variant={v.status === 'moving' ? 'success' : v.status === 'idle' ? 'warning' : 'neutral'}>{v.status.toUpperCase()}</Badge>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">{v.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-sm text-[var(--muted)]">
        <div>Showing {displayed.length} of {vehicles.length} vehicles</div>
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 rounded border border-[var(--border)]">‹</button>
          <button className="px-3 py-1 rounded bg-[var(--primary)] text-white">1</button>
          <button className="px-2 py-1 rounded border border-[var(--border)]">2</button>
          <button className="px-2 py-1 rounded border border-[var(--border)]">›</button>
        </div>
      </div>
    </div>
  )
}
