import React, { useState } from 'react'
import Badge from '../ui/Badge'
import EmptyState from '../ui/EmptyState'

function FuelGauge({ percent = 0 }) {
  const stroke = percent >= 50 ? 'var(--primary)' : percent >= 20 ? 'var(--warning)' : 'var(--error)'
  const r = 14
  const c = 2 * Math.PI * r
  const dash = (percent / 100) * c
  return (
    <svg width="40" height="40" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r={r} stroke="var(--border-strong)" strokeWidth="3" fill="transparent" />
      <circle cx="24" cy="24" r={r} stroke={stroke} strokeWidth="3" fill="transparent" strokeDasharray={`${dash} ${c - dash}`} strokeLinecap="round" transform="rotate(-90 24 24)" />
      <text x="24" y="28" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="var(--text-secondary)" textAnchor="middle">{percent}%</text>
    </svg>
  )
}

export default function VehicleTable({ vehicles = [], onRowClick = () => {}, onEditClick = () => {}, onDeleteClick = () => {} }) {
  const [search, setSearch] = useState('')

  const displayed = vehicles.filter((v) => `${v.id} ${v.driver} ${v.location}`.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-base text-[var(--text)]">Vehicle Roster</h2>
        <div className="flex items-center gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vehicles..."
            className="rounded-[var(--radius-button)] border border-[var(--border-strong)] bg-[var(--bg-primary)] px-3 py-1.5 text-[13px] text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--primary)]/40 transition-colors"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-[var(--radius-card)]" style={{ boxShadow: 'var(--shadow-card)' }}>
        {displayed.length === 0 ? (
          <div className="p-6 bg-[var(--bg-card)]">
            <EmptyState
              title="No vehicles found"
              description="Try a different search term or clear the current filter."
              actionLabel="Reset Search"
              onAction={() => setSearch('')}
            />
          </div>
        ) : (
          <table className="w-full table-fixed border-collapse bg-[var(--bg-card)]">
            <thead>
              <tr className="text-left text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]" style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="px-4 py-3">Vehicle ID</th>
                <th className="px-4 py-3">Driver</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Fuel</th>
                <th className="px-4 py-3">Efficiency</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayed.slice(0, 20).map((v, i) => (
                <tr
                  key={v.id}
                  onClick={() => onRowClick(v)}
                  className="cursor-pointer text-[13px] hover:bg-[var(--bg-hover)] transition-colors"
                  style={i < displayed.length - 1 ? { borderBottom: '1px solid var(--border)' } : {}}
                >
                  <td className="px-4 py-3 font-medium text-[var(--text)]">{v.id}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{v.driver}</td>
                  <td className="px-4 py-3 text-[var(--muted)] text-xs truncate">{v.location}</td>
                  <td className="px-4 py-3">
                    <FuelGauge percent={v.fuelLevel} />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--text-secondary)]">{v.efficiency} km/L</td>
                  <td className="px-4 py-3">
                    <Badge variant={v.status === 'moving' ? 'success' : v.status === 'offline' ? 'error' : 'warning'} size="sm">{v.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--muted)]">{v.lastUpdated}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onEditClick(v); }}
                        className="rounded-md px-2 py-1 text-[11px] text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--bg-hover)] transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onDeleteClick(v); }}
                        className="rounded-md px-2 py-1 text-[11px] text-[var(--muted)] hover:text-[var(--error)] hover:bg-[var(--error)]/5 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-[var(--muted)]">
        <div>Showing {displayed.length} of {vehicles.length} vehicles</div>
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 rounded-md border border-[var(--border)] hover:bg-[var(--bg-hover)] transition-colors">‹</button>
          <button className="px-2.5 py-1 rounded-md bg-[var(--primary-ghost)] text-[var(--primary)] text-xs font-medium">1</button>
          <button className="px-2 py-1 rounded-md border border-[var(--border)] hover:bg-[var(--bg-hover)] transition-colors">2</button>
          <button className="px-2 py-1 rounded-md border border-[var(--border)] hover:bg-[var(--bg-hover)] transition-colors">›</button>
        </div>
      </div>
    </div>
  )
}
